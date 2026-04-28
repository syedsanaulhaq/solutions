import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * POST /api/newsletter
 *
 * Accepts { email, source } and appends the subscriber to
 * data/newsletter-subscribers.json.
 *
 * In production, replace the file-storage logic with a
 * proper email service (Mailchimp, ConvertKit, Resend Audiences, etc.).
 */

interface Subscriber {
  email: string;
  source: string;
  subscribedAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const SUBS_FILE = path.join(DATA_DIR, 'newsletter-subscribers.json');

async function readSubs(): Promise<Subscriber[]> {
  try {
    const raw = await fs.readFile(SUBS_FILE, 'utf-8');
    return JSON.parse(raw) as Subscriber[];
  } catch {
    return [];
  }
}

async function writeSubs(subs: Subscriber[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(SUBS_FILE, JSON.stringify(subs, null, 2), 'utf-8');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: { email?: unknown; source?: unknown };
  try {
    body = (await req.json()) as { email?: unknown; source?: unknown };
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const source = typeof body.source === 'string' ? body.source.slice(0, 100) : 'unknown';

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ success: false, error: 'valid email is required' }, { status: 400 });
  }

  try {
    const subs = await readSubs();

    // Idempotent — do not create duplicates
    if (subs.some((s) => s.email === email)) {
      return NextResponse.json({ success: true, message: 'Already subscribed' });
    }

    subs.push({ email, source, subscribedAt: new Date().toISOString() });
    await writeSubs(subs);
  } catch (err) {
    console.error('[/api/newsletter] Failed to save subscriber:', err);
    return NextResponse.json({ success: false, error: 'Failed to save subscriber' }, { status: 500 });
  }

  return NextResponse.json(
    { success: true, message: 'Thank you for subscribing!' },
    { status: 201 },
  );
}
