import { NextRequest, NextResponse } from 'next/server';

interface GroqTranscriptionReply {
  text?: string;
  error?: {
    message?: string;
  };
}

async function transcribeWithGroq(file: File, apiKey: string, language?: string) {
  const upstreamForm = new FormData();
  upstreamForm.append('file', file, file.name || 'voice.webm');
  upstreamForm.append('model', 'whisper-large-v3-turbo');
  upstreamForm.append('response_format', 'json');
  if (language) {
    upstreamForm.append('language', language);
  }

  const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: upstreamForm,
    signal: AbortSignal.timeout(60_000),
  });

  const payload = (await response.json().catch(() => ({}))) as GroqTranscriptionReply;
  return { response, payload };
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Audio file is required' }, { status: 400 });
    }

    if (file.size === 0) {
      return NextResponse.json({ error: 'Audio file is empty' }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY || process.env.AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Transcription service is not configured' }, { status: 503 });
    }

    let { response, payload } = await transcribeWithGroq(file, apiKey, 'en');

    if (!response.ok) {
      // Retry once without forced language for better compatibility with some mobile audio encodings.
      const retry = await transcribeWithGroq(file, apiKey);
      response = retry.response;
      payload = retry.payload;
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: payload?.error?.message || 'Transcription failed' },
        { status: 502 }
      );
    }

    let text = typeof payload.text === 'string' ? payload.text.trim() : '';
    if (!text) {
      const retry = await transcribeWithGroq(file, apiKey);
      if (retry.response.ok) {
        text = typeof retry.payload.text === 'string' ? retry.payload.text.trim() : '';
      }
    }

    if (!text) {
      return NextResponse.json({ error: 'Transcription returned empty text. Please speak closer to the mic and try again.' }, { status: 422 });
    }

    return NextResponse.json({ text });
  } catch {
    return NextResponse.json({ error: 'Unable to process voice upload' }, { status: 500 });
  }
}
