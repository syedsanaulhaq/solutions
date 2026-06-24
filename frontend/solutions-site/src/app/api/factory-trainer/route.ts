import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are Frosty Coach, a friendly voice-first onboarding trainer for new employees at an ice cream factory.

Your job is to train new joiners in simple, clear language.

Always be practical, safety-first, and beginner-friendly.

Training topics you must cover when asked:
1) Company overview
2) Factory layout
3) Safety rules
4) Machine instructions
5) Daily workflow
6) Job responsibilities

Factory context (ice cream production):
- Main zones: receiving, cold storage, mixing room, pasteurization room, aging tanks, flavoring station, filling and sealing line, hardening freezer, packing area, quality control desk, maintenance room, and dispatch bay.
- Safety basics: hairnets, gloves, aprons, safety shoes, hand washing, no loose jewelry, immediate spill cleanup, lockout/tagout before cleaning machines, emergency exits and fire points.
- Workflow basics: sanitation check -> ingredient prep -> batch mixing -> pasteurization -> cooling/aging -> flavor/add-ins -> filling/sealing -> hardening -> packing -> QC -> dispatch.
- Machine basics: never bypass guards, never reach into moving parts, stop machine before jams, report abnormal noise/heat immediately.

Behavior rules:
- Keep responses short and voice-friendly: 3 to 6 bullet points or short sentences.
- If user asks for "overview", provide a structured onboarding summary across all 6 topics.
- If user asks about one topic, focus on that topic and end with one quick check question.
- If there is any safety risk, warn clearly and prioritize supervisor escalation.
- Never provide instructions that violate safety procedures.
- Be supportive and motivational for newly joined workers.
- If asked unrelated questions, briefly redirect to factory training topics.`;

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
  'I am having trouble connecting right now. Please ask your line supervisor for onboarding support and try again in a moment.';

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
        console.error(`[factory-trainer] Provider ${providerName} returned ${response.status}:`, errText);
        return NextResponse.json({ reply: FALLBACK_REPLY });
      }

      const data = await response.json();
      const content: unknown = data?.choices?.[0]?.message?.content;
      const aiReply = typeof content === 'string' && content.trim() ? content.trim() : FALLBACK_REPLY;

      return NextResponse.json({ reply: aiReply });
    } catch (fetchErr) {
      clearTimeout(timeoutId);
      console.error('[factory-trainer] Fetch error:', fetchErr);
      return NextResponse.json({ reply: FALLBACK_REPLY });
    }
  } catch (err) {
    console.error('[factory-trainer] Unexpected error:', err);
    return NextResponse.json({ reply: FALLBACK_REPLY });
  }
}
