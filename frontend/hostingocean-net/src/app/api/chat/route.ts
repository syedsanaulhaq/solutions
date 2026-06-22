import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const SYSTEM_PROMPT = `You are a helpful customer support assistant for HostingOcean.net — Pakistan's trusted web hosting provider.

About HostingOcean.net:
- Pakistan-based registered web hosting business (Karachi / Bahria Town, Rawalpindi)
- Sister company of HostingOcean.co.uk (UK)
- Website: www.hostingocean.net
- Email: info@hostingocean.net
- Phone & WhatsApp: +92 333 9141680
- Client Area: https://whmcs.hostingocean.net/clientarea.php
- Support: 24/7, English & Urdu
- All prices in Pakistani Rupees (PKR)

Services & Pricing:
- Web Hosting: Rs. 599/mo (Starter — 2GB SSD, 1 site), Rs. 999/mo (Business — 5GB SSD, 5 sites), Rs. 1,799/mo (Professional — 10GB SSD, 20 sites)
- VPS Hosting: from Rs. 5,499/mo
- Dedicated Servers: from Rs. 28,999/mo
- Domain Registration: .pk from Rs. 1,999/yr, .com.pk from Rs. 1,499/yr, .com from Rs. 3,499/yr

All web hosting plans include:
- Free SSL certificate
- Daily automated backups
- cPanel control panel
- 1-click WordPress installer
- 24/7 Pakistan support

Policies:
- 30-day money-back guarantee on shared hosting (excludes VPS, dedicated, and domain registrations)
- Refunds processed within 14 days of approval
- Orders can be cancelled before provisioning by contacting support
- Full policy at: https://hostingocean.net/refund-return-policy

Instructions:
- Be friendly, professional, and helpful
- Greet users with "Assalam-o-Alaikum!" if they greet you
- For purchases or sign-ups, direct users to the /contact page
- Existing customers can manage their account at https://whmcs.hostingocean.net/clientarea.php
- Answer questions about hosting, domains, server management, WordPress
- If you cannot answer a question or the user needs direct help, always say: "Please contact us directly — WhatsApp/call: +92 333 9141680 or email info@hostingocean.net"
- Keep responses concise and relevant`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== 'string' || message.length > 2000) {
      return NextResponse.json({ error: 'Invalid message.' }, { status: 400 });
    }

    const apiKey = process.env.AI_API_KEY;
    const baseURL = getBaseURL(process.env.AI_PROVIDER ?? 'openai');
    const model = process.env.AI_MODEL ?? 'gpt-4o-mini';

    if (!apiKey) {
      return NextResponse.json({ reply: 'Assalam-o-Alaikum! I\'m here to help with your hosting questions. For immediate assistance, WhatsApp or call us at +92 333 9141680 or email info@hostingocean.net.' });
    }

    const client = new OpenAI({ apiKey, baseURL });

    const messages: OpenAI.ChatCompletionMessageParam[] = [
      { role: 'system', content: SYSTEM_PROMPT },
    ];

    if (Array.isArray(history)) {
      for (const h of history.slice(-10)) {
        if (h.role === 'user' || h.role === 'assistant') {
          messages.push({ role: h.role, content: String(h.content).substring(0, 2000) });
        }
      }
    }

    messages.push({ role: 'user', content: message });

    const completion = await client.chat.completions.create({ model, messages, max_tokens: 500 });

    const reply = completion.choices[0]?.message?.content ?? 'Sorry, I could not generate a response. Please WhatsApp or call us at +92 333 9141680, or email info@hostingocean.net.';

    return NextResponse.json({ reply });
  } catch (err) {
    console.error('Chat API error:', err);
    return NextResponse.json({ reply: 'Sorry, something went wrong. For immediate help, WhatsApp or call +92 333 9141680 or email info@hostingocean.net.' });
  }
}

function getBaseURL(provider: string): string | undefined {
  switch (provider) {
    case 'groq': return 'https://api.groq.com/openai/v1';
    case 'deepseek': return 'https://api.deepseek.com/v1';
    default: return undefined;
  }
}
