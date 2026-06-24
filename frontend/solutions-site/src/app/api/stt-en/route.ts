import { NextRequest, NextResponse } from 'next/server';

interface GroqTranscriptionReply {
  text?: string;
  error?: {
    message?: string;
  };
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

    const upstreamForm = new FormData();
    upstreamForm.append('file', file, file.name || 'voice.webm');
    upstreamForm.append('model', 'whisper-large-v3-turbo');
    upstreamForm.append('response_format', 'json');
    upstreamForm.append('language', 'en');

    const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: upstreamForm,
      signal: AbortSignal.timeout(25_000),
    });

    const payload = (await response.json().catch(() => ({}))) as GroqTranscriptionReply;

    if (!response.ok) {
      return NextResponse.json(
        { error: payload?.error?.message || 'Transcription failed' },
        { status: 502 }
      );
    }

    const text = typeof payload.text === 'string' ? payload.text.trim() : '';
    return NextResponse.json({ text });
  } catch {
    return NextResponse.json({ error: 'Unable to process voice upload' }, { status: 500 });
  }
}
