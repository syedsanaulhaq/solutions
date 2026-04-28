import rawData from '../../data/docs.json';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface Doc {
  id: string;
  slug: string;
  title: string;
  category: string;
  order: number;
  excerpt: string;
  content: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
export function getAllDocs(): Doc[] {
  return (rawData as Doc[]).sort((a, b) => {
    const catCmp = a.category.localeCompare(b.category);
    if (catCmp !== 0) return catCmp;
    return a.order - b.order;
  });
}

export function getDocBySlug(slug: string): Doc | undefined {
  return (rawData as Doc[]).find((d) => d.slug === slug);
}

export function getDocsByCategory(category: string): Doc[] {
  return getAllDocs().filter((d) => d.category === category);
}

export function getUniqueDocCategories(): string[] {
  const seen = new Set<string>();
  const cats: string[] = [];
  for (const d of rawData as Doc[]) {
    if (!seen.has(d.category)) {
      seen.add(d.category);
      cats.push(d.category);
    }
  }
  return cats.sort();
}

export function getCategoryOrder(): string[] {
  return ['Getting Started', 'Working With Us', 'LMS Development', 'AI Chatbots', 'Automation'];
}
