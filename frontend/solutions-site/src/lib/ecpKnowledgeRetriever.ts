import corpus from '@/data/ecpSiteCorpus.json';

interface CorpusEntry {
  id: number;
  url: string;
  title: string;
  content: string;
}

const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'to', 'for', 'of', 'in', 'on', 'at', 'is', 'are', 'be', 'with', 'by', 'from',
  'what', 'how', 'when', 'where', 'who', 'which', 'can', 'could', 'should', 'would', 'please', 'about', 'tell',
  'me', 'my', 'your', 'their', 'this', 'that', 'these', 'those', 'it', 'as', 'if', 'do', 'does', 'did', 'i', 'we',
  'you', 'he', 'she', 'they', 'them', 'our', 'us', 'not', 'than', 'then', 'also', 'into', 'up', 'down', 'over',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF\s]/gi, ' ')
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 1 && !STOPWORDS.has(w));
}

function scoreEntry(entry: CorpusEntry, queryTokens: string[], rawQuery: string): number {
  const haystack = `${entry.title} ${entry.content}`.toLowerCase();
  let score = 0;

  for (const token of queryTokens) {
    const directHits = haystack.split(token).length - 1;
    if (directHits > 0) {
      score += directHits * 2;
    }
    if (entry.url.toLowerCase().includes(token)) {
      score += 2;
    }
  }

  const normalizedQuery = rawQuery.toLowerCase().trim();
  if (normalizedQuery && haystack.includes(normalizedQuery)) {
    score += 8;
  }

  return score;
}

export function getRelevantEcpKnowledge(query: string, maxChunks = 10): string {
  const queryTokens = tokenize(query).slice(0, 20);
  const entries = corpus as CorpusEntry[];

  if (!entries.length) {
    return 'No ECP corpus entries are available.';
  }

  const ranked = entries
    .map((entry) => ({
      entry,
      score: scoreEntry(entry, queryTokens, query),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxChunks);

  const selected = ranked.length
    ? ranked.map((item) => item.entry)
    : entries.slice(0, Math.min(maxChunks, entries.length));

  return selected
    .map((entry, index) => {
      return [
        `Source ${index + 1}: ${entry.title}`,
        `URL: ${entry.url}`,
        `Content: ${entry.content}`,
      ].join('\n');
    })
    .join('\n\n');
}
