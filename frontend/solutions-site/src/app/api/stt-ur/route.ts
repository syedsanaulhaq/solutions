import { NextRequest, NextResponse } from 'next/server';

interface GroqTranscriptionReply {
  text?: string;
  error?: { message?: string };
}

interface OpenAITranscriptionReply {
  text?: string;
  error?: { message?: string };
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
    headers: { Authorization: `Bearer ${apiKey}` },
    body: upstreamForm,
    signal: AbortSignal.timeout(60_000),
  });

  const payload = (await response.json().catch(() => ({}))) as GroqTranscriptionReply;
  return { response, payload };
}

async function transcribeWithOpenAI(file: File, apiKey: string, language?: string) {
  const upstreamForm = new FormData();
  upstreamForm.append('file', file, file.name || 'voice.webm');
  upstreamForm.append('model', 'whisper-1');
  upstreamForm.append('response_format', 'json');
  if (language) {
    upstreamForm.append('language', language);
  }

  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: upstreamForm,
    signal: AbortSignal.timeout(60_000),
  });

  const payload = (await response.json().catch(() => ({}))) as OpenAITranscriptionReply;
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

    const groqApiKey = process.env.GROQ_API_KEY || process.env.AI_API_KEY;
    const openAIApiKey = process.env.OPENAI_API_KEY;

    if (!groqApiKey && !openAIApiKey) {
      return NextResponse.json({ error: 'Transcription service is not configured' }, { status: 503 });
    }

    let response: Response | null = null;
    let errorMessage = 'Transcription failed';
    let text = '';

    if (groqApiKey) {
      let groqResult = await transcribeWithGroq(file, groqApiKey, 'ur');

      if (!groqResult.response.ok) {
        // Retry once without forced language for better compatibility with some mobile audio encodings.
        groqResult = await transcribeWithGroq(file, groqApiKey);
      }

      response = groqResult.response;
      errorMessage = groqResult.payload?.error?.message || errorMessage;
      text = typeof groqResult.payload?.text === 'string' ? groqResult.payload.text.trim() : '';

      if (response.ok && !text) {
        const retry = await transcribeWithGroq(file, groqApiKey);
        if (retry.response.ok) {
          text = typeof retry.payload.text === 'string' ? retry.payload.text.trim() : '';
        } else {
          errorMessage = retry.payload?.error?.message || errorMessage;
        }
      }
    }

    if (!text && openAIApiKey) {
      const openAIResult = await transcribeWithOpenAI(file, openAIApiKey, 'ur');
      response = openAIResult.response;
      errorMessage = openAIResult.payload?.error?.message || errorMessage;
      if (openAIResult.response.ok) {
        text = typeof openAIResult.payload?.text === 'string' ? openAIResult.payload.text.trim() : '';
      }
    }

    if (!response || !response.ok) {
      const quotaHit = /limit|quota|billing|aspd|rate/i.test(errorMessage);
      const error = quotaHit
        ? (openAIApiKey
            ? 'Daily voice transcription quota is exhausted. Please try later or verify backup transcription provider credits.'
            : 'Daily voice transcription quota is exhausted and backup provider is not configured. Set OPENAI_API_KEY to enable fallback.')
        : errorMessage;
      return NextResponse.json({ error }, { status: 502 });
    }

    if (!text) {
      return NextResponse.json({ error: 'Transcription returned empty text. Please speak closer to the mic and try again.' }, { status: 422 });
    }

    return NextResponse.json({ text });
  } catch {
    return NextResponse.json({ error: 'Unable to process voice upload' }, { status: 500 });
  }
}
