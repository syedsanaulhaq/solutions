import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const text = req.nextUrl.searchParams.get('q') || '';
  if (!text) return NextResponse.json({ error: 'Missing q' }, { status: 400 });

  const params = new URLSearchParams({
    ie: 'UTF-8',
    q: text.slice(0, 200),
    tl: 'ur',
    client: 'tw-ob',
  });

  try {
    const upstream = await fetch(
      `https://translate.googleapis.com/translate_tts?${params}`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Referer: 'https://translate.google.com/',
        },
        // 8-second timeout via AbortSignal
        signal: AbortSignal.timeout(8000),
      }
    );

    if (!upstream.ok) {
      return NextResponse.json({ error: 'upstream error' }, { status: 502 });
    }

    const buffer = await upstream.arrayBuffer();
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return NextResponse.json({ error: 'tts failed' }, { status: 500 });
  }
}
