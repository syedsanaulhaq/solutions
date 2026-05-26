import { NextRequest, NextResponse } from 'next/server';

// ---------------------------------------------------------------------------
// System prompt — defines the assistant's persona and knowledge base
// ---------------------------------------------------------------------------
const SYSTEM_PROMPT = `You are the AI assistant for HostingOcean Solutions, a global software development agency.

ABOUT US:
- We build custom digital solutions for businesses of all sizes
- Based in Pakistan
- Contact: info@hostingocean.net
- Website: solutions.hostingocean.co.uk

OUR SERVICES:
1. LMS Development — Custom Learning Management Systems (Moodle-based or fully bespoke), for corporate training, e-learning businesses, and educational institutions
2. AI Chatbot Development — RAG-based AI assistants, customer support bots, internal knowledge tools, integrated with the client's own data and knowledge base
3. React / Next.js Development — TypeScript-first marketing sites, single-page apps, and complex web applications; fully responsive and SEO-optimised
4. Node.js API Development — Scalable REST and GraphQL APIs, authentication systems, database design, and cloud deployment
5. Business Automation — Workflow automation using n8n, Zapier, or custom Node.js scripts; connects CRM, email, invoicing, and more
6. Web Hosting & VPS — Managed web hosting, VPS solutions, and domain registration through the HostingOcean platform
7. Full-Stack Projects — End-to-end custom software development from design through to deployment and ongoing support

PRICING:
- We offer fixed-price proposals after a free scoping call — no hourly billing surprises
- Pricing depends on project scope, complexity, and timeline
- Clients can visit /pricing for indicative package ranges
- To get an accurate quote, the best route is a free consultation call

BEHAVIOUR GUIDELINES:
- Be professional, warm, and concise — you represent the company
- Answer questions about our services accurately; never invent services we do not offer
- When unsure about specific pricing, timelines, or technical scope, recommend a free consultation rather than guessing
- Proactively offer to connect the user with a free quote when the conversation is moving toward a project (mention /contact or "Get a Free Quote" in the navigation)
- Ask one clarifying question at a time when more context would help you give better advice
- Keep responses under 150 words unless the topic genuinely requires more detail
- Do not speak negatively about competitors
- If asked about something completely unrelated to web development or digital services, politely and briefly acknowledge it, then redirect to how you can help with their digital needs`;

// ---------------------------------------------------------------------------
// Provider configuration — all use the OpenAI-compatible chat completions API
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const FALLBACK_REPLY =
  "I'm having a bit of trouble connecting right now. For immediate help, please email us at info@hostingocean.net or visit our Contact page — we respond within one business day.";

// ---------------------------------------------------------------------------
// POST /api/chat
// Body: { message: string, history: ChatMessage[] }
// Response: { reply: string }
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { message, history } = body as { message?: unknown; history?: unknown };

    // Validate message
    if (typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message must be a non-empty string' }, { status: 400 });
    }
    if (message.length > 1000) {
      return NextResponse.json({ error: 'Message exceeds maximum length of 1000 characters' }, { status: 400 });
    }

    const apiKey = process.env.AI_API_KEY;
    const providerName = (process.env.AI_PROVIDER ?? 'openai') as Provider;
    const modelOverride = process.env.AI_MODEL;

    // Graceful fallback when no API key is configured
    if (!apiKey || apiKey === 'your_key_here') {
      return NextResponse.json({ reply: FALLBACK_REPLY });
    }

    const provider = PROVIDERS[providerName] ?? PROVIDERS.openai;
    const model = modelOverride ?? provider.defaultModel;

    // Sanitise and cap conversation history
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
          .slice(-6)
      : [];

    const chatMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...safeHistory,
      { role: 'user', content: message.trim() },
    ];

    // 29-second timeout — keeps us under Vercel/Edge 30s limit
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 29_000);

    let aiReply: string;
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
          max_tokens: 500,
          temperature: 0.7,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errText = await response.text();
        console.error(`[chat/route] Provider ${providerName} returned ${response.status}:`, errText);
        return NextResponse.json({ reply: FALLBACK_REPLY });
      }

      const data = await response.json();
      const content: unknown = data?.choices?.[0]?.message?.content;
      aiReply = typeof content === 'string' && content.trim() ? content.trim() : FALLBACK_REPLY;
    } catch (fetchErr) {
      clearTimeout(timeoutId);
      console.error('[chat/route] Fetch error:', fetchErr);
      return NextResponse.json({ reply: FALLBACK_REPLY });
    }

    return NextResponse.json({ reply: aiReply });
  } catch (err) {
    console.error('[chat/route] Unexpected error:', err);
    return NextResponse.json({ reply: FALLBACK_REPLY });
  }
}
