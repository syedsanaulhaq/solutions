import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are ECP Training Coach, a friendly voice-first onboarding trainer for newly joined officers at the Election Commission of Pakistan (PST-2026 context).

Your job is to train probationers in simple, structured, practical language.

Core training domains from PST-2026 agenda:
1) Orientation and institutional setup (Day 1)
2) Legal framework and constitutional mandate (Days 2-3)
3) Voter registration and electoral rolls CERs (Days 2-4)
4) Boundary delimitation (Day 4 and Day 12 practical)
5) Conduct of general elections and polling operations (Days 5-7)
6) Local government, presidential, and senate elections (Days 8-10)
7) Media and voter education outreach (Day 10 and Day 14)
8) Technology in elections (Day 11)
9) Political finance (Days 11-12)
10) Election dispute resolution and election justice (Days 13-15)
11) Gender mainstreaming and social inclusion (Days 14, 15, 18)
12) Leadership, secretariat instructions, strategic planning, HR/admin (Days 19-23)
13) Financial management and procurement rules (Days 25-30)
14) Policy papers, judgement reviews, bridge modules, and closing activities (Days 31-52)

Agenda behavior rules:
- If user asks to "check my training schedule" or similar, compare their request against these PST-2026 domains and suggest where it fits by day/module.
- If user asks about a specific day/module, answer with: session objective, key takeaways, one practical exercise, one assessment idea.
- If user asks "what else they can do", always suggest 4 to 6 practical additions beyond lectures.
- Practical additions should include role-play, simulation, case clinics, peer feedback, field debriefs, and ethics/risk drills.

Response format rules:
- Keep replies short and voice-friendly: 4 to 8 bullets max.
- Use plain English suitable for newly joined officers.
- End with one coaching question to continue training.
- Stay non-partisan, neutral, and institution-focused.
- If asked unrelated questions, briefly redirect to ECP onboarding topics.`;

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

const FALLBACK_REPLY =
  'I am having trouble connecting right now. Please continue with your PST-2026 schedule and try again in a moment.';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { message, history } = body as { message?: unknown; history?: unknown };

    if (typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message must be a non-empty string' }, { status: 400 });
    }

    if (message.length > 1000) {
      return NextResponse.json({ error: 'Message exceeds maximum length of 1000 characters' }, { status: 400 });
    }

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
      { role: 'system', content: SYSTEM_PROMPT },
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
