import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/integrations/notion
 *
 * Stub: Create a page in a Notion database for each new lead.
 * Replace the body with actual Notion API calls when ready.
 *
 * Required env vars:
 *   NOTION_TOKEN        — Notion integration secret
 *   NOTION_DATABASE_ID  — Target database ID
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const notionToken = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!notionToken || !databaseId) {
    console.warn('[/api/integrations/notion] NOTION_TOKEN or NOTION_DATABASE_ID not set — skipping sync');
    return NextResponse.json({ success: true, skipped: true, reason: 'not_configured' });
  }

  try {
    // ── Notion Create Page ──────────────────────────────────────────────────
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${notionToken}`,
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties: {
          Name: {
            title: [{ text: { content: String(body.name ?? 'Unknown') } }],
          },
          Email: { email: body.email },
          Service: {
            select: { name: String(body.service ?? 'Unknown') },
          },
          Budget: {
            select: { name: String(body.budget ?? 'Unknown') },
          },
          Status: {
            select: { name: 'New' },
          },
          Source: {
            select: { name: String(body.source ?? 'form') },
          },
          Score: {
            number: typeof body.score === 'number' ? body.score : 0,
          },
          Tier: {
            select: { name: String(body.tier ?? 'cool') },
          },
          'Created At': {
            date: { start: new Date().toISOString() },
          },
        },
        children: [
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: { content: String(body.description ?? '') },
                },
              ],
            },
          },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('[/api/integrations/notion] API error:', err);
      return NextResponse.json({ success: false, error: 'Notion API error', detail: err }, { status: 502 });
    }

    const data = await response.json() as { id: string };
    return NextResponse.json({ success: true, notionPageId: data.id });
  } catch (err) {
    console.error('[/api/integrations/notion] Unexpected error:', err);
    return NextResponse.json({ success: false, error: 'Integration error' }, { status: 500 });
  }
}
