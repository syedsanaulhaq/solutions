import { NextRequest, NextResponse } from 'next/server';

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

const FALLBACK_REPLY = 'I could not process this request right now. Please try again in a moment.';

function buildPrompt(knowledge: string): string {
  return [
    'You are Content Upload AI Assistant.',
    'You can ONLY answer from the uploaded content provided below.',
    'If the answer is not present in the uploaded content, reply exactly: "I cannot find that in the uploaded content."',
    'Keep answers concise with short bullet points when useful.',
    'Do not fabricate facts.',
    '',
    'Uploaded content starts:',
    knowledge,
    'Uploaded content ends.',
  ].join('\n');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { message, history, contentText } = body as {
      message?: unknown;
      history?: unknown;
      contentText?: unknown;
    };

    if (typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message must be a non-empty string' }, { status: 400 });
    }

    if (typeof contentText !== 'string' || !contentText.trim()) {
      return NextResponse.json({ error: 'Upload or paste content first.' }, { status: 400 });
    }

    const safeContent = contentText.replace(/\s+/g, ' ').trim().slice(0, 60000);

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

    const messages = [
      { role: 'system', content: buildPrompt(safeContent) },
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
          messages,
          max_tokens: 600,
          temperature: 0.2,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errText = await response.text();
        console.error(`[content-uploader-ai] Provider ${providerName} returned ${response.status}:`, errText);
        return NextResponse.json({ reply: FALLBACK_REPLY });
      }

      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content;
      const reply = typeof content === 'string' && content.trim() ? content.trim() : FALLBACK_REPLY;
      return NextResponse.json({ reply });
    } catch (fetchErr) {
      clearTimeout(timeoutId);
      console.error('[content-uploader-ai] Fetch error:', fetchErr);
      return NextResponse.json({ reply: FALLBACK_REPLY });
    }
  } catch (error) {
    console.error('[content-uploader-ai] Unexpected error:', error);
    return NextResponse.json({ reply: FALLBACK_REPLY });
  }
}
