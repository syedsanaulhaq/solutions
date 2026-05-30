import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { scoreLead } from '@/lib/leads';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface QuoteLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget: string;
  description: string;
  source: 'form' | 'chatbot';
  createdAt: string;
  score: number;
  tier: 'hot' | 'warm' | 'cool';
  tags: string[];
}

interface RequestBody {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget: string;
  description: string;
  source?: 'form' | 'chatbot';
}

// ---------------------------------------------------------------------------
// File storage helpers
// ---------------------------------------------------------------------------
const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

async function readLeads(): Promise<QuoteLead[]> {
  try {
    const raw = await fs.readFile(LEADS_FILE, 'utf-8');
    return JSON.parse(raw) as QuoteLead[];
  } catch {
    return [];
  }
}

async function writeLeads(leads: QuoteLead[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
}

// ---------------------------------------------------------------------------
// Email notification helper
// ---------------------------------------------------------------------------
function row(label: string, value: string | undefined): string {
  if (!value) return '';
  return `
    <tr>
      <td style="padding:8px 12px;font-weight:600;color:#374151;background:#f9fafb;border:1px solid #e5e7eb;white-space:nowrap;vertical-align:top">${label}</td>
      <td style="padding:8px 12px;color:#111827;border:1px solid #e5e7eb">${value.replace(/\n/g, '<br>')}</td>
    </tr>`;
}

async function sendLeadEmail(lead: QuoteLead): Promise<void> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_NOTIFY_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !LEAD_NOTIFY_EMAIL) return;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    ...(SMTP_PASS ? { auth: { user: SMTP_USER, pass: SMTP_PASS } } : {}),
    tls: { rejectUnauthorized: false },
  });

  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head>
        </td></tr>
        <tr><td style="padding:28px 32px">
          <p style="margin:0 0 16px;color:#374151;font-size:14px">A new lead was submitted via the <strong>${lead.source === 'chatbot' ? 'AI chatbot' : 'Get a Quote form'}</strong>.</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px">
            ${row('Lead ID', lead.id)}
            ${row('Name', lead.name)}
            ${row('Email', lead.email)}
            ${row('Phone', lead.phone)}
            ${row('Company', lead.company)}
            ${row('Service', lead.service)}
            ${row('Budget', lead.budget)}
            ${row('Description', lead.description)}
            ${row('Source', lead.source)}
            ${row('Submitted', new Date(lead.createdAt).toLocaleString('en-GB', { timeZone: 'Europe/London', dateStyle: 'full', timeStyle: 'short' }))}
          </table>
        </td></tr>
        <tr><td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb">
          <p style="margin:0;font-size:12px;color:#6b7280">This notification was sent automatically. Do not reply.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const text = [
    'New Quote Request — HostingOcean Solutions',
    '==========================================',
    `Lead ID:     ${lead.id}`,
    `Name:        ${lead.name}`,
    `Email:       ${lead.email}`,
    `Phone:       ${lead.phone ?? '—'}`,
    `Company:     ${lead.company ?? '—'}`,
    `Service:     ${lead.service}`,
    `Budget:      ${lead.budget}`,
    `Source:      ${lead.source}`,
    `Submitted:   ${lead.createdAt}`,
    '',
    'Description:',
    lead.description,
  ].join('\n');

  await transporter.sendMail({
    from: `"HostingOcean Solutions" <${SMTP_USER}>`,
    to: LEAD_NOTIFY_EMAIL,
    subject: 'New Lead from HostingOcean Solutions',
    text,
    html,
  });
}

// ---------------------------------------------------------------------------
// Auto-reply to the lead
// ---------------------------------------------------------------------------
async function sendAutoReply(name: string, email: string, service: string): Promise<void> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER) return;

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    ...(SMTP_PASS ? { auth: { user: SMTP_USER, pass: SMTP_PASS } } : {}),
    tls: { rejectUnauthorized: false },
  });

  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f3f4f6">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1)">
        <tr><td style="background:#0F172A;padding:28px 32px">
          <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#38BDF8">HostingOcean Solutions</p>
          <h1 style="margin:6px 0 0;font-size:22px;font-weight:700;color:#ffffff">We received your request</h1>
        </td></tr>
        <tr><td style="padding:28px 32px">
          <p style="margin:0 0 16px;color:#374151;font-size:15px">Hi ${name},</p>
          <p style="margin:0 0 16px;color:#374151;font-size:15px">
            Thank you for getting in touch! We have received your enquiry about <strong>${service}</strong> and a member of our team will review it and get back to you within one business day.
          </p>
          <p style="margin:0 0 16px;color:#374151;font-size:15px">
            While you wait, you might find these resources helpful:
          </p>
          <ul style="margin:0 0 16px;padding-left:20px;color:#374151;font-size:14px">
            <li style="margin-bottom:8px"><a href="https://solutions.hostingocean.net/pricing-calculator" style="color:#2563EB">Try our Pricing Calculator</a> — get an instant budget estimate for your project</li>
            <li style="margin-bottom:8px"><a href="https://solutions.hostingocean.net/portfolio" style="color:#2563EB">View our Portfolio</a> — see examples of projects we have delivered</li>
            <li style="margin-bottom:8px"><a href="https://solutions.hostingocean.net/blog" style="color:#2563EB">Read our Blog</a> — technical guides and case studies</li>
          </ul>
          <p style="margin:0 0 8px;color:#374151;font-size:15px">Best regards,</p>
          <p style="margin:0;color:#374151;font-size:15px;font-weight:600">The HostingOcean Solutions Team</p>
        </td></tr>
        <tr><td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb">
          <p style="margin:0;font-size:12px;color:#6b7280">
            <a href="https://solutions.hostingocean.net" style="color:#2563EB">solutions.hostingocean.net</a> · 
            This is an automated message. Please do not reply to this email.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  await transporter.sendMail({
    from: `"HostingOcean Solutions" <${SMTP_USER}>`,
    to: email,
    subject: 'We received your enquiry — HostingOcean Solutions',
    text: `Hi ${name},\n\nThank you for getting in touch! We have received your enquiry about ${service} and will get back to you within one business day.\n\nBest regards,\nThe HostingOcean Solutions Team\nhttps://solutions.hostingocean.co.uk`,
    html,
  });
}

// ---------------------------------------------------------------------------
// Input helpers
// ---------------------------------------------------------------------------
function sanitiseString(value: unknown, maxLen = 500): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLen);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ---------------------------------------------------------------------------
// POST /api/quote
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  let body: RequestBody;

  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const name = sanitiseString(body.name, 100);
  const email = sanitiseString(body.email, 200);
  const service = sanitiseString(body.service, 100);
  const budget = sanitiseString(body.budget, 100);
  const description = sanitiseString(body.description, 2000);

  if (!name) return NextResponse.json({ success: false, error: 'name is required' }, { status: 400 });
  if (!email || !isValidEmail(email))
    return NextResponse.json({ success: false, error: 'valid email is required' }, { status: 400 });
  if (!service) return NextResponse.json({ success: false, error: 'service is required' }, { status: 400 });
  if (!budget) return NextResponse.json({ success: false, error: 'budget is required' }, { status: 400 });
  if (!description) return NextResponse.json({ success: false, error: 'description is required' }, { status: 400 });

  const { score, tier, tags } = scoreLead({ service, budget, description });

  const lead: QuoteLead = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    email,
    phone: sanitiseString(body.phone ?? '', 30) || undefined,
    company: sanitiseString(body.company ?? '', 150) || undefined,
    service,
    budget,
    description,
    source: body.source === 'chatbot' ? 'chatbot' : 'form',
    createdAt: new Date().toISOString(),
    score,
    tier,
    tags,
  };

  try {
    const leads = await readLeads();
    leads.push(lead);
    await writeLeads(leads);
  } catch (err) {
    console.error('[/api/quote] Failed to save lead:', err);
    return NextResponse.json({ success: false, error: 'Failed to save lead' }, { status: 500 });
  }

  console.log(`[/api/quote] New lead received — ${lead.id}`);
  console.log(`  Name:    ${lead.name}`);
  console.log(`  Email:   ${lead.email}`);
  console.log(`  Company: ${lead.company ?? '—'}`);
  console.log(`  Service: ${lead.service}`);
  console.log(`  Budget:  ${lead.budget}`);
  console.log(`  Source:  ${lead.source}`);

  sendLeadEmail(lead).catch((err) =>
    console.error('[/api/quote] Email notification failed:', err)
  );

  sendAutoReply(name, email, service).catch((err) =>
    console.error('[/api/quote] Auto-reply failed:', err)
  );

  return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
}
