import { NextRequest, NextResponse } from 'next/server';
import { ECP_VOTER_KNOWLEDGE } from '@/data/ecpVoterKnowledge';
import { getRelevantEcpKnowledge } from '@/lib/ecpKnowledgeRetriever';

const SYSTEM_PROMPT = `You are Election Commission of Pakistan AI Trainer, a professional voice-first training assistant.

Your job is to explain official ECP processes in simple, structured, practical language.

Core guidance domains:
1) Voter registration, verification, and 8300 process
2) Electoral rolls and voter facilitation channels
3) General elections, local government elections, senate elections, and by-elections
4) Election laws and procedural compliance
5) Delimitation process and representation/proposal handling
6) Political parties, election symbols, and code of conduct references
7) Notifications, orders/judgements, and cause list usage

Behavior rules:
- Stay non-partisan, neutral, and institution-focused.
- Give step-by-step procedural guidance.
- Do not invent deadlines, forms, legal clauses, or district-level office details.
- If exact detail is missing, direct users to the official ECP source URL.

Response format rules:
- Keep replies short and voice-friendly: 4 to 8 bullets max.
- Use clear, professional English suitable for citizens and newly joined officers.
- Maintain a formal and respectful tone.
- Do not use slang, informal phrasing, or contractions.
- End with one coaching or follow-up question.`;

type Provider = 'openai' | 'groq' | 'deepseek';

interface ProviderConfig {
  url: string;
  defaultModel: string;
}

const PROVIDERS: Record<Provider, ProviderConfig> = {
  openai: {
    url: 'https://api.openai.com/v1/chat/completions',
    defaultModel: 'gpt-4o-mini',
  },
  groq: {
    url: 'https://api.groq.com/openai/v1/chat/completions',
    defaultModel: 'llama-3.3-70b-versatile',
  },
  deepseek: {
    url: 'https://api.deepseek.com/v1/chat/completions',
    defaultModel: 'deepseek-chat',
  },
};

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

function buildSystemPrompt(language: 'en' | 'ur', query: string): string {
  const relevantCorpus = getRelevantEcpKnowledge(query, 10);
  const withEcpKnowledge = `${SYSTEM_PROMPT}\n\nStatic ECP guidance baseline:\n${ECP_VOTER_KNOWLEDGE}\n\nRelevant extracted content from ecp.gov.pk corpus for this query:\n${relevantCorpus}\n\nWhen answering, prioritize these official ECP sources. If user asks for exact local office detail not present here, direct them to the relevant ECP page and District Election Commissioner office.`;

  if (language === 'ur') {
    return `${withEcpKnowledge}\n\nIMPORTANT: The user has selected Urdu language. You MUST respond entirely in Urdu (اردو). Use clear, simple Urdu suitable for newly joined government officers. Keep the same structured format (bullets, coaching question at the end) but in Urdu script only. Do NOT respond in English.`;
  }
  return withEcpKnowledge;
}

const FALLBACK_REPLY =
  'I am having trouble connecting right now. Please continue with your training schedule and try again in a moment.';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { message, history, language } = body as { message?: unknown; history?: unknown; language?: unknown };

    if (typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message must be a non-empty string' }, { status: 400 });
    }

    if (message.length > 1000) {
      return NextResponse.json({ error: 'Message exceeds maximum length of 1000 characters' }, { status: 400 });
    }

    const safeLanguage = language === 'ur' ? 'ur' : 'en';

    const apiKey = process.env.AI_API_KEY;
    const providerName = (process.env.AI_PROVIDER ?? 'openai') as Provider;
    const modelOverride = process.env.AI_MODEL;

    if (!apiKey || apiKey === 'your_key_here') {
      return NextResponse.json({ reply: FALLBACK_REPLY });
    }

    const provider = PROVIDERS[providerName] ?? PROVIDERS.openai;
    const model = modelOverride ?? provider.defaultModel;

    const safeHistory: ChatMessage[] = Array.isArray(history)
      ? (history as unknown[])
          .filter((m): m is ChatMessage => {
            if (typeof m !== 'object' || m === null) return false;
            const msg = m as Record<string, unknown>;
            return (
              (msg.role === 'user' || msg.role === 'assistant') &&
              typeof msg.content === 'string' &&
              msg.content.length > 0 &&
              msg.content.length <= 2000
            );
          })
          .slice(-8)
      : [];

    const chatMessages = [
      { role: 'system', content: buildSystemPrompt(safeLanguage, message.trim()) },
      ...safeHistory,
      { role: 'user', content: message.trim() },
    ];

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 29_000);

    try {
      const response = await fetch(provider.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: chatMessages,
          max_tokens: 600,
          temperature: 0.5,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errText = await response.text();
        console.error(`[ecp-trainer] Provider ${providerName} returned ${response.status}:`, errText);
        return NextResponse.json({ reply: FALLBACK_REPLY });
      }

      const data = await response.json();
      const content: unknown = data?.choices?.[0]?.message?.content;
      const aiReply = typeof content === 'string' && content.trim() ? content.trim() : FALLBACK_REPLY;

      return NextResponse.json({ reply: aiReply });
    } catch (fetchErr) {
      clearTimeout(timeoutId);
      console.error('[ecp-trainer] Fetch error:', fetchErr);
      return NextResponse.json({ reply: FALLBACK_REPLY });
    }
  } catch (err) {
    console.error('[ecp-trainer] Unexpected error:', err);
    return NextResponse.json({ reply: FALLBACK_REPLY });
  }
}
