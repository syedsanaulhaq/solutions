import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { type QuoteLead, readLeads, writeLeads } from '@/lib/leads';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
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

  // Skip silently if any SMTP config is missing
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !LEAD_NOTIFY_EMAIL) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f3f4f6">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1)">

        <!-- Header -->
        <tr>
          <td style="background:#0F172A;padding:28px 32px">
            <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#38BDF8">HostingOcean Solutions</p>
            <h1 style="margin:6px 0 0;font-size:22px;font-weight:700;color:#ffffff">New Quote Request</h1>
          </td>
        </tr>

        <!-- Lead details -->
        <tr>
          <td style="padding:28px 32px">
            <p style="margin:0 0 16px;color:#374151;font-size:14px">
              A new lead was submitted via the <strong>${lead.source === 'chatbot' ? 'AI chatbot' : 'Get a Quote form'}</strong>.
            </p>
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
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #e5e7eb">
            <p style="margin:0;font-size:12px;color:#6b7280">
              This notification was sent automatically by solutions.hostingocean.co.uk. Do not reply to this email.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

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

  // Validate required fields
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
  };

  // 1 — Persist to JSON file (never fails the response)
  try {
    const leads = await readLeads();
    leads.push(lead);
    await writeLeads(leads);
  } catch (err) {
    console.error('[/api/quote] Failed to save lead:', err);
    return NextResponse.json({ success: false, error: 'Failed to save lead' }, { status: 500 });
  }

  // 2 — Console confirmation
  console.log(`[/api/quote] New lead received — ${lead.id}`);
  console.log(`  Name:    ${lead.name}`);
  console.log(`  Email:   ${lead.email}`);
  console.log(`  Company: ${lead.company ?? '—'}`);
  console.log(`  Service: ${lead.service}`);
  console.log(`  Budget:  ${lead.budget}`);
  console.log(`  Source:  ${lead.source}`);

  // 3 — Email notification (fire-and-forget, never blocks or breaks the response)
  sendLeadEmail(lead).catch((err) =>
    console.error('[/api/quote] Email notification failed:', err)
  );

  return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
}


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
// Helpers
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

  // Validate required fields
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
  };

  try {
    const leads = await readLeads();
    leads.push(lead);
    await writeLeads(leads);
  } catch (err) {
    console.error('[/api/quote] Failed to save lead:', err);
    return NextResponse.json({ success: false, error: 'Failed to save lead' }, { status: 500 });
  }

  // Console confirmation (email integration later)
  console.log(`[/api/quote] New lead received — ${lead.id}`);
  console.log(`  Name:    ${lead.name}`);
  console.log(`  Email:   ${lead.email}`);
  console.log(`  Company: ${lead.company ?? '—'}`);
  console.log(`  Service: ${lead.service}`);
  console.log(`  Budget:  ${lead.budget}`);
  console.log(`  Source:  ${lead.source}`);

  return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
}
