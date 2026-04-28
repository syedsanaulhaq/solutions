import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { timingSafeEqual, createHash } from 'crypto';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface QuoteLead {
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

// ---------------------------------------------------------------------------
// Storage
// ---------------------------------------------------------------------------
const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json');

async function readLeads(): Promise<QuoteLead[]> {
  try {
    const raw = await fs.readFile(LEADS_FILE, 'utf-8');
    return JSON.parse(raw) as QuoteLead[];
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Auth helper — timing-safe comparison to prevent timing attacks
// ---------------------------------------------------------------------------
function safeCompare(a: string, b: string): boolean {
  const ha = createHash('sha256').update(a).digest();
  const hb = createHash('sha256').update(b).digest();
  return timingSafeEqual(ha, hb);
}

// ---------------------------------------------------------------------------
// GET /api/admin/leads
// ---------------------------------------------------------------------------
export async function GET(req: NextRequest) {
  const adminPassword = process.env.ADMIN_DASH_PASSWORD;

  // Fail closed: if env var is not set, treat as misconfigured
  if (!adminPassword) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const authHeader = req.headers.get('authorization') ?? '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!token || !safeCompare(token, adminPassword)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Optional query-param filters
  const { searchParams } = new URL(req.url);
  const service = searchParams.get('service');
  const budget = searchParams.get('budget');
  const source = searchParams.get('source');

  let leads = await readLeads();

  if (service) leads = leads.filter((l) => l.service === service);
  if (budget) leads = leads.filter((l) => l.budget === budget);
  if (source) leads = leads.filter((l) => l.source === source);

  // Newest first
  leads = leads.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return NextResponse.json({ leads, total: leads.length });
}
