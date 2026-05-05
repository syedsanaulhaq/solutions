import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { domain } = await req.json();

    if (!domain || typeof domain !== 'string' || domain.length > 200) {
      return NextResponse.json({ error: 'Invalid domain.' }, { status: 400 });
    }

    // Sanitise: allow alphanumeric, dots, hyphens only
    const sanitised = domain.trim().toLowerCase().replace(/[^a-z0-9.\-]/g, '');
    if (!sanitised.includes('.')) {
      return NextResponse.json({ error: 'Invalid domain format.' }, { status: 400 });
    }

    // Redirect user to contact page for domain enquiries (no WHMCS integration)
    return NextResponse.json({
      domain: sanitised,
      available: null,
      message: 'Please contact us to check availability and register your domain.',
      contactUrl: `/contact?domain=${encodeURIComponent(sanitised)}`,
    });
  } catch (err) {
    console.error('Domain check error:', err);
    return NextResponse.json({ error: 'Failed to check domain.' }, { status: 500 });
  }
}
