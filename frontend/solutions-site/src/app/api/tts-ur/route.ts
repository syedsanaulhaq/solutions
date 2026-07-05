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
  const azureSpeechKey = process.env.AZURE_SPEECH_KEY;
  const azureSpeechRegion = process.env.AZURE_SPEECH_REGION;
  const azureUrduVoice = process.env.AZURE_SPEECH_URDU_VOICE || 'ur-PK-UzmaNeural';
  const elevenLabsKey = process.env.ELEVENLABS_API_KEY;
  const urduVoiceId = process.env.ELEVENLABS_URDU_VOICE_ID || process.env.ELEVENLABS_VOICE_ID;

  const escaped = input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

  // 1) Primary: Azure Speech ur-PK neural voice.
  if (azureSpeechKey && azureSpeechRegion) {
    try {
      const ssml = `<speak version="1.0" xml:lang="ur-PK"><voice name="${azureUrduVoice}">${escaped}</voice></speak>`;
      const upstream = await fetch(`https://${azureSpeechRegion}.tts.speech.microsoft.com/cognitiveservices/v1`, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': azureSpeechKey,
          'Content-Type': 'application/ssml+xml',
          'X-Microsoft-OutputFormat': 'audio-16khz-32kbitrate-mono-mp3',
          'User-Agent': 'hostingocean-solutions-site',
        },
        body: ssml,
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

      const azErrText = await upstream.text().catch(() => '');
      console.warn('[tts-ur] Azure fallback trigger:', azErrText || upstream.status);
    } catch {
      console.warn('[tts-ur] Azure request failed, trying fallback provider');
    }
  }

  // 2) Secondary: ElevenLabs multilingual neural voice for Urdu.
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

  // 3) Fallback: Google Translate TTS.
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
