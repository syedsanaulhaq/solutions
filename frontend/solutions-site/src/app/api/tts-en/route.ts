import { NextRequest, NextResponse } from 'next/server';

interface GroqError {
  error?: {
    message?: string;
  };
}

interface ElevenLabsError {
  detail?: {
    message?: string;
  };
}

export async function GET(req: NextRequest) {
  const text = (req.nextUrl.searchParams.get('q') || '').trim();
  if (!text) {
    return NextResponse.json({ error: 'Missing q' }, { status: 400 });
  }

  const input = text.slice(0, 1200);
  const groqKey = process.env.GROQ_API_KEY;
  const elevenLabsKey = process.env.ELEVENLABS_API_KEY;
  const elevenLabsVoice = process.env.ELEVENLABS_VOICE_ID || 'pNInz6obpgDQGcFmaJgB';

  // 1) Primary: Groq PlayAI TTS (same voice style as demo flows)
  if (groqKey) {
    try {
      const upstream = await fetch('https://api.groq.com/openai/v1/audio/speech', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${groqKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'playai-tts',
          input,
          voice: 'Fritz-PlayAI',
          response_format: 'mp3',
        }),
        signal: AbortSignal.timeout(12_000),
      });

      if (upstream.ok) {
        const audio = await upstream.arrayBuffer();
        return new NextResponse(audio, {
          status: 200,
          headers: {
            'Content-Type': 'audio/mpeg',
            'Cache-Control': 'no-store',
          },
        });
      }

      const groqErr = (await upstream.json().catch(() => null)) as GroqError | null;
      console.warn('[tts-en] Groq fallback trigger:', groqErr?.error?.message || upstream.status);
    } catch {
      console.warn('[tts-en] Groq request failed, trying fallback provider');
    }
  }

  // 2) Secondary: ElevenLabs neural voice
  if (elevenLabsKey) {
    try {
      const upstream = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${elevenLabsVoice}`, {
        method: 'POST',
        headers: {
          'xi-api-key': elevenLabsKey,
          'Content-Type': 'application/json',
          Accept: 'audio/mpeg',
        },
        body: JSON.stringify({
          text: input,
          model_id: 'eleven_turbo_v2_5',
          voice_settings: {
            stability: 0.45,
            similarity_boost: 0.8,
            style: 0.3,
            use_speaker_boost: true,
          },
        }),
        signal: AbortSignal.timeout(12_000),
      });

      if (upstream.ok) {
        const audio = await upstream.arrayBuffer();
        return new NextResponse(audio, {
          status: 200,
          headers: {
            'Content-Type': 'audio/mpeg',
            'Cache-Control': 'no-store',
          },
        });
      }

      const elErr = (await upstream.json().catch(() => null)) as ElevenLabsError | null;
      console.warn('[tts-en] ElevenLabs fallback trigger:', elErr?.detail?.message || upstream.status);
    } catch {
      console.warn('[tts-en] ElevenLabs request failed, trying final fallback');
    }
  }

  // 3) Final fallback: Google Translate TTS (no key required)
  try {
    const params = new URLSearchParams({
      ie: 'UTF-8',
      q: input.slice(0, 200),
      tl: 'en',
      client: 'tw-ob',
    });

    const upstream = await fetch(`https://translate.googleapis.com/translate_tts?${params}`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Referer: 'https://translate.google.com/',
      },
      signal: AbortSignal.timeout(8_000),
    });

    if (!upstream.ok) {
      return NextResponse.json({ error: 'upstream error' }, { status: 502 });
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
