import { NextRequest, NextResponse } from 'next/server';

interface GroqError {
  error?: {
    message?: string;
  };
}

export async function GET(req: NextRequest) {
  const text = (req.nextUrl.searchParams.get('q') || '').trim();
  if (!text) {
    return NextResponse.json({ error: 'Missing q' }, { status: 400 });
  }

  const groqKey = process.env.GROQ_API_KEY || process.env.AI_API_KEY;
  if (!groqKey) {
    return NextResponse.json({ error: 'No TTS key configured' }, { status: 503 });
  }

  try {
    const upstream = await fetch('https://api.groq.com/openai/v1/audio/speech', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${groqKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'playai-tts',
        input: text.slice(0, 1200),
        voice: 'Fritz-PlayAI',
        response_format: 'mp3',
      }),
      signal: AbortSignal.timeout(12_000),
    });

    if (!upstream.ok) {
      const errBody = (await upstream.json().catch(() => null)) as GroqError | null;
      const message = errBody?.error?.message || 'upstream error';
      return NextResponse.json({ error: message }, { status: 502 });
    }

    const audio = await upstream.arrayBuffer();
    return new NextResponse(audio, {
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
