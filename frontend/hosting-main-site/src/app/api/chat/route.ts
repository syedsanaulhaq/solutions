import { NextRequest, NextResponse } from 'next/server';

// ---------------------------------------------------------------------------
// System prompt — HostingOcean AI Assistant persona
// ---------------------------------------------------------------------------
const SYSTEM_PROMPT = `You are the AI assistant for HostingOcean, a UK-based web hosting provider.

ABOUT US:
- We provide fast, reliable web hosting, VPS, dedicated servers, and domain registration
- All servers are located in Tier-3 certified UK data centres
- Contact: support@hostingocean.co.uk
- Website: www.hostingocean.co.uk
- Client Area: https://my.hostingocean.co.uk/clientarea.php

OUR SERVICES:
1. Web Hosting — Shared cPanel hosting from £2.99/month. Includes free SSL, daily backups, and a free domain name for the first year. Three plans: Starter (£2.99), Business (£5.99), Professional (£9.99).
2. VPS Hosting — KVM-based VPS servers with full root access, dedicated resources, and SSD storage. Starting from £12.99/month.
3. Dedicated Servers — Fully managed dedicated servers for high-traffic or resource-intensive workloads. Pricing on request.
4. Domain Registration — Register .co.uk, .uk, .com, .net, .org and hundreds of other TLDs. Free with qualifying hosting plans.
5. SSL Certificates — Free Let's Encrypt SSL on all hosting plans; premium SSL certificates also available.

KEY FEATURES:
- 99.9% uptime SLA
- 24/7 UK-based expert support
- Free website migration for Business and Professional plans
- cPanel control panel on all shared hosting plans
- One-click WordPress, Joomla, and Drupal installs
- 30-day money-back guarantee on shared hosting

IMPORTANT LINKS:
- View / order hosting plans: https://my.hostingocean.co.uk/cart.php
- Client area login: https://my.hostingocean.co.uk/clientarea.php
- Open a support ticket: https://my.hostingocean.co.uk/submitticket.php
- Domain search / registration: https://www.hostingocean.co.uk/domain-registration
- Knowledge base: https://my.hostingocean.co.uk/knowledgebase.php
- Web hosting plans: https://www.hostingocean.co.uk/web-hosting
- VPS hosting: https://www.hostingocean.co.uk/vps-hosting
- Dedicated servers: https://www.hostingocean.co.uk/dedicated-servers

BEHAVIOUR GUIDELINES:
- Be professional, warm, and concise — you represent HostingOcean
- Always provide relevant links from the IMPORTANT LINKS section when answering navigational questions
- When discussing pricing, give accurate figures from the plans listed above
- For billing, invoice, or account-specific queries, direct users to the client area or support ticket
- For technical hosting issues, direct users to the support ticket system or knowledge base
- Keep responses under 150 words unless the topic genuinely requires more detail
- Do not speculate about features or pricing not listed above; instead, direct users to check the website or contact support
- Do not speak negatively about other hosting providers
- If asked about something unrelated to hosting, domains, or web services, politely redirect to how HostingOcean can help`;

// ---------------------------------------------------------------------------
// Provider configuration — OpenAI-compatible chat completions API
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
  "I'm having trouble connecting right now. For immediate help, please visit our support portal at https://my.hostingocean.co.uk/submitticket.php or email support@hostingocean.co.uk — we respond within one business day.";

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
      return NextResponse.json(
        { error: 'Message exceeds maximum length of 1000 characters' },
        { status: 400 }
      );
    }

    const apiKey = process.env.AI_API_KEY;
    const providerName = (process.env.AI_PROVIDER ?? 'openai') as Provider;
    const modelOverride = process.env.AI_MODEL;

    // Graceful fallback when no API key configured
    if (!apiKey || apiKey === 'your_key_here') {
      return NextResponse.json({ reply: FALLBACK_REPLY });
    }

    const provider = PROVIDERS[providerName] ?? PROVIDERS.openai;
    const model = modelOverride ?? provider.defaultModel;

    // Sanitise and cap conversation history to 6 turns
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

    // 29-second timeout — keeps within Vercel/Edge 30s limit
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
        console.error(
          `[chat/route] Provider ${providerName} returned ${response.status}:`,
          errText
        );
        return NextResponse.json({ reply: FALLBACK_REPLY });
      }

      const data = await response.json();
      const content: unknown = data?.choices?.[0]?.message?.content;
      aiReply =
        typeof content === 'string' && content.trim() ? content.trim() : FALLBACK_REPLY;
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
