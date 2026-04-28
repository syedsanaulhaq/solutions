import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/integrations/hubspot
 *
 * Stub: Push a lead to HubSpot CRM.
 * Replace the body with actual HubSpot API calls when ready.
 *
 * Required env vars:
 *   HUBSPOT_ACCESS_TOKEN — private app token from HubSpot
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!accessToken) {
    // In production, return a neutral response so the main quote flow is not broken
    console.warn('[/api/integrations/hubspot] HUBSPOT_ACCESS_TOKEN not set — skipping sync');
    return NextResponse.json({ success: true, skipped: true, reason: 'not_configured' });
  }

  try {
    // ── HubSpot Create Contact ──────────────────────────────────────────────
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        properties: {
          firstname: String(body.name ?? '').split(' ')[0] ?? '',
          lastname: String(body.name ?? '').split(' ').slice(1).join(' ') ?? '',
          email: body.email,
          phone: body.phone ?? '',
          company: body.company ?? '',
          hs_lead_status: 'NEW',
          notes_last_updated: new Date().toISOString(),
          // Custom properties (must be created in HubSpot first)
          hs_content_membership_notes: `Service: ${body.service}\nBudget: ${body.budget}\n\n${body.description}`,
        },
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('[/api/integrations/hubspot] API error:', err);
      return NextResponse.json({ success: false, error: 'HubSpot API error', detail: err }, { status: 502 });
    }

    const data = await response.json() as { id: string };
    return NextResponse.json({ success: true, hubspotId: data.id });
  } catch (err) {
    console.error('[/api/integrations/hubspot] Unexpected error:', err);
    return NextResponse.json({ success: false, error: 'Integration error' }, { status: 500 });
  }
}
