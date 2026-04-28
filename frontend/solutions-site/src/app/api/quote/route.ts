import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

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
