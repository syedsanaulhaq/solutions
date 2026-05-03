import { NextRequest, NextResponse } from 'next/server';

/**
 * Domain availability check proxy.
 * Forwards the domain query to WHMCS API and returns the result.
 * Falls back to redirecting to WHMCS cart if API credentials are not set.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'domain parameter is required' }, { status: 400 });
  }

  const apiUrl = process.env.WHMCS_API_URL;
  const identifier = process.env.WHMCS_API_IDENTIFIER;
  const secret = process.env.WHMCS_API_SECRET;

  // If WHMCS API credentials are not set, return a redirect URL
  if (!apiUrl || !identifier || !secret) {
    const whmcsBase = process.env.NEXT_PUBLIC_WHMCS_URL || 'https://whmcs.hostingocean.co.uk';
    return NextResponse.json({
      available: null,
      redirectUrl: `${whmcsBase}/cart.php?a=add&domain=register&query=${encodeURIComponent(domain)}`,
    });
  }

  try {
    const body = new URLSearchParams({
      action: 'DomainWhois',
      identifier,
      secret,
      domain,
      responsetype: 'json',
    });

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error(`WHMCS API responded with ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Domain check error:', err);
    return NextResponse.json({ error: 'Domain check unavailable' }, { status: 503 });
  }
}
