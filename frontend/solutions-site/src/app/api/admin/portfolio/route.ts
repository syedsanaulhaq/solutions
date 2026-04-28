import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { timingSafeEqual, createHash, randomUUID } from 'crypto';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  industry: string;
  description: string;
  outcomes: string[];
  technologies: string[];
  images: string[];
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Storage
// ---------------------------------------------------------------------------
const DATA_FILE = path.join(process.cwd(), 'data', 'portfolio.json');

async function readItems(): Promise<PortfolioItem[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw) as PortfolioItem[];
  } catch {
    return [];
  }
}

async function writeItems(items: PortfolioItem[]): Promise<void> {
  const tmp = DATA_FILE + '.tmp';
  await fs.writeFile(tmp, JSON.stringify(items, null, 2), 'utf-8');
  await fs.rename(tmp, DATA_FILE);
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------
function safeCompare(a: string, b: string): boolean {
  const ha = createHash('sha256').update(a).digest();
  const hb = createHash('sha256').update(b).digest();
  return timingSafeEqual(ha, hb);
}

function getToken(req: NextRequest): string {
  const authHeader = req.headers.get('authorization') ?? '';
  return authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
}

function isAuthorized(req: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_DASH_PASSWORD;
  if (!adminPassword) return false;
  const token = getToken(req);
  return token.length > 0 && safeCompare(token, adminPassword);
}

// ---------------------------------------------------------------------------
// Slug helper
// ---------------------------------------------------------------------------
function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// ---------------------------------------------------------------------------
// GET /api/admin/portfolio
// ---------------------------------------------------------------------------
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const items = await readItems();
  return NextResponse.json({ items, total: items.length });
}

// ---------------------------------------------------------------------------
// POST /api/admin/portfolio  (create)
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: Partial<PortfolioItem>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body.title || typeof body.title !== 'string') {
    return NextResponse.json({ error: 'title is required' }, { status: 400 });
  }

  const items = await readItems();
  const newItem: PortfolioItem = {
    id: randomUUID(),
    title: body.title.trim(),
    slug: body.slug?.trim() || toSlug(body.title.trim()),
    category: body.category?.trim() || '',
    industry: body.industry?.trim() || '',
    description: body.description?.trim() || '',
    outcomes: Array.isArray(body.outcomes) ? body.outcomes.map(String) : [],
    technologies: Array.isArray(body.technologies) ? body.technologies.map(String) : [],
    images: Array.isArray(body.images) ? body.images.map(String) : [],
    createdAt: new Date().toISOString().slice(0, 10),
  };

  items.push(newItem);
  await writeItems(items);

  return NextResponse.json({ item: newItem }, { status: 201 });
}

// ---------------------------------------------------------------------------
// PUT /api/admin/portfolio  (update by ?id=)
// ---------------------------------------------------------------------------
export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = new URL(req.url).searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'id query param is required' }, { status: 400 });
  }

  let body: Partial<PortfolioItem>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const items = await readItems();
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const updated: PortfolioItem = {
    ...items[idx],
    ...(body.title !== undefined && { title: String(body.title).trim() }),
    ...(body.slug !== undefined && { slug: String(body.slug).trim() }),
    ...(body.category !== undefined && { category: String(body.category).trim() }),
    ...(body.industry !== undefined && { industry: String(body.industry).trim() }),
    ...(body.description !== undefined && { description: String(body.description).trim() }),
    ...(Array.isArray(body.outcomes) && { outcomes: body.outcomes.map(String) }),
    ...(Array.isArray(body.technologies) && { technologies: body.technologies.map(String) }),
    ...(Array.isArray(body.images) && { images: body.images.map(String) }),
  };

  items[idx] = updated;
  await writeItems(items);

  return NextResponse.json({ item: updated });
}

// ---------------------------------------------------------------------------
// DELETE /api/admin/portfolio  (delete by ?id=)
// ---------------------------------------------------------------------------
export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = new URL(req.url).searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'id query param is required' }, { status: 400 });
  }

  const items = await readItems();
  const filtered = items.filter((i) => i.id !== id);
  if (filtered.length === items.length) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await writeItems(filtered);
  return NextResponse.json({ success: true });
}
