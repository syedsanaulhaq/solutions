import { NextRequest, NextResponse } from 'next/server';
import { readLeads } from '@/lib/leads';

// ---------------------------------------------------------------------------
// Auth helper
// ---------------------------------------------------------------------------
function isAuthorised(req: NextRequest): boolean {
  const adminPass = process.env.ADMIN_DASH_PASSWORD;
  if (!adminPass) return false;

  // Accept password via query string or Authorization header
  const qp = req.nextUrl.searchParams.get('password');
  if (qp === adminPass) return true;

  const authHeader = req.headers.get('authorization') ?? '';
  const token = authHeader.replace(/^Bearer\s+/i, '');
  return token === adminPass;
}

// ---------------------------------------------------------------------------
// GET /api/admin/leads
// ---------------------------------------------------------------------------
export async function GET(req: NextRequest) {
  if (!isAuthorised(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorised' }, { status: 401 });
  }

  let leads = await readLeads();
  const params = req.nextUrl.searchParams;

  // Optional filters
  const service = params.get('service');
  const budget = params.get('budget');
  const source = params.get('source');
  const search = params.get('search')?.toLowerCase().trim();

  if (service) leads = leads.filter((l) => l.service === service);
  if (budget) leads = leads.filter((l) => l.budget === budget);
  if (source) leads = leads.filter((l) => l.source === source);
  if (search) {
    leads = leads.filter(
      (l) =>
        l.name.toLowerCase().includes(search) ||
        l.email.toLowerCase().includes(search) ||
        (l.company ?? '').toLowerCase().includes(search)
    );
  }

  // Most recent first
  leads = [...leads].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return NextResponse.json({ success: true, total: leads.length, leads });
}
