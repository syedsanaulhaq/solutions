import { NextRequest, NextResponse } from 'next/server';

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
  const elevenLabsKey = process.env.ELEVENLABS_API_KEY;
  const urduVoiceId = process.env.ELEVENLABS_URDU_VOICE_ID || process.env.ELEVENLABS_VOICE_ID;

  // 1) Primary: ElevenLabs multilingual neural voice for Urdu.
  // Set ELEVENLABS_URDU_VOICE_ID to a Pakistani Urdu voice profile.
  if (elevenLabsKey && urduVoiceId) {
    try {
      const upstream = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${urduVoiceId}`, {
        method: 'POST',
        headers: {
          'xi-api-key': elevenLabsKey,
          'Content-Type': 'application/json',
          Accept: 'audio/mpeg',
        },
        body: JSON.stringify({
          text: input,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.48,
            similarity_boost: 0.82,
            style: 0.25,
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
      console.warn('[tts-ur] ElevenLabs fallback trigger:', elErr?.detail?.message || upstream.status);
    } catch {
      console.warn('[tts-ur] ElevenLabs request failed, trying fallback provider');
    }
  }

  // 2) Fallback: Google Translate TTS.
  const params = new URLSearchParams({
    ie: 'UTF-8',
    q: input.slice(0, 200),
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
