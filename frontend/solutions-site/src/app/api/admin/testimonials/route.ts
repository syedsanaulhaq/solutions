import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { timingSafeEqual, createHash, randomUUID } from 'crypto';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  avatarColour: string;
  rating: number;
  message: string;
  projectSlug?: string;
  projectTitle?: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Storage
// ---------------------------------------------------------------------------
const DATA_FILE = path.join(process.cwd(), 'data', 'testimonials.json');

async function readItems(): Promise<Testimonial[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw) as Testimonial[];
  } catch {
    return [];
  }
}

async function writeItems(items: Testimonial[]): Promise<void> {
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

function isAuthorized(req: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_DASH_PASSWORD;
  if (!adminPassword) return false;
  const authHeader = req.headers.get('authorization') ?? '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  return token.length > 0 && safeCompare(token, adminPassword);
}

// ---------------------------------------------------------------------------
// GET /api/admin/testimonials
// ---------------------------------------------------------------------------
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const items = await readItems();
  const sorted = items.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  return NextResponse.json({ items: sorted, total: sorted.length });
}

// ---------------------------------------------------------------------------
// POST /api/admin/testimonials  (create)
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: Partial<Testimonial>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body.name || !body.message) {
    return NextResponse.json({ error: 'name and message are required' }, { status: 400 });
  }

  const items = await readItems();
  const newItem: Testimonial = {
    id: body.id || ('t' + randomUUID().slice(0, 8)),
    name: String(body.name).trim(),
    role: String(body.role ?? '').trim(),
    company: String(body.company ?? '').trim(),
    avatar: String(body.avatar ?? body.name.trim().charAt(0).toUpperCase()),
    avatarColour: String(body.avatarColour ?? 'bg-blue-600'),
    rating: typeof body.rating === 'number' ? Math.min(5, Math.max(1, body.rating)) : 5,
    message: String(body.message).trim(),
    projectSlug: body.projectSlug ? String(body.projectSlug).trim() : undefined,
    projectTitle: body.projectTitle ? String(body.projectTitle).trim() : undefined,
    createdAt: new Date().toISOString().slice(0, 10),
  };

  items.push(newItem);
  await writeItems(items);

  return NextResponse.json({ item: newItem }, { status: 201 });
}

// ---------------------------------------------------------------------------
// PUT /api/admin/testimonials  (update by ?id=)
// ---------------------------------------------------------------------------
export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = new URL(req.url).searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'id query param is required' }, { status: 400 });
  }

  let body: Partial<Testimonial>;
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

  const updated: Testimonial = {
    ...items[idx],
    ...(body.name !== undefined && { name: String(body.name).trim() }),
    ...(body.role !== undefined && { role: String(body.role).trim() }),
    ...(body.company !== undefined && { company: String(body.company).trim() }),
    ...(body.avatar !== undefined && { avatar: String(body.avatar).trim() }),
    ...(body.avatarColour !== undefined && { avatarColour: String(body.avatarColour).trim() }),
    ...(typeof body.rating === 'number' && { rating: Math.min(5, Math.max(1, body.rating)) }),
    ...(body.message !== undefined && { message: String(body.message).trim() }),
    ...(body.projectSlug !== undefined && { projectSlug: String(body.projectSlug).trim() }),
    ...(body.projectTitle !== undefined && { projectTitle: String(body.projectTitle).trim() }),
  };

  items[idx] = updated;
  await writeItems(items);

  return NextResponse.json({ item: updated });
}

// ---------------------------------------------------------------------------
// DELETE /api/admin/testimonials  (delete by ?id=)
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
