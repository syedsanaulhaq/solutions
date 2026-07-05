'use client';

import { FormEvent, useMemo, useRef, useState } from 'react';
import { Loader2, Send, Upload } from 'lucide-react';

interface Message {
  id: number;
  role: 'assistant' | 'user';
  text: string;
}

const START_MESSAGE: Message = {
  id: 1,
  role: 'assistant',
  text: 'Welcome. Upload a .docx, .txt, or .md file (or paste text), then ask questions. I will answer only from your uploaded content.',
};

export default function ContentUploaderAiPage() {
  const [messages, setMessages] = useState<Message[]>([START_MESSAGE]);
  const [input, setInput] = useState('');
  const [contentText, setContentText] = useState('');
  const [status, setStatus] = useState('No content loaded yet.');
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const nextIdRef = useRef(2);

  const history = useMemo(
    () =>
      messages.slice(-10).map((m) => ({
        role: m.role,
        content: m.text,
      })),
    [messages]
  );

  const onUploadFile = async (file: File) => {
    setIsUploading(true);
    setStatus('Uploading and extracting content...');

    try {
      const form = new FormData();
      form.append('file', file);

      const response = await fetch('/api/content-uploader-ai/upload', {
        method: 'POST',
        body: form,
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || typeof data?.contentText !== 'string') {
        setStatus(typeof data?.error === 'string' ? data.error : 'Failed to parse file.');
        return;
      }

      setContentText(data.contentText);
      setStatus(
        `Content ready (${data?.chars ?? data.contentText.length} chars${
          data?.clipped ? ', clipped to max size' : ''
        }).`
      );
    } catch {
      setStatus('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const onAsk = async (event: FormEvent) => {
    event.preventDefault();
    const question = input.trim();
    if (!question || isLoading) return;

    if (!contentText.trim()) {
      setStatus('Please upload a file or paste content before asking questions.');
      return;
    }

    const userMessage: Message = { id: nextIdRef.current++, role: 'user', text: question };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/content-uploader-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: question,
          history,
          contentText,
        }),
      });

      const data = await response.json().catch(() => ({}));
      const reply = typeof data?.reply === 'string' && data.reply.trim() ? data.reply : 'I could not answer right now.';

      setMessages((prev) => [...prev, { id: nextIdRef.current++, role: 'assistant', text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: nextIdRef.current++, role: 'assistant', text: 'I could not answer right now.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Standalone Tool</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">Content Upload AI</h1>
          <p className="mt-2 text-sm text-slate-600">Upload content and chat against that content only.</p>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
              <Upload className="h-4 w-4" />
              Upload .docx/.txt/.md
              <input
                type="file"
                className="hidden"
                accept=".docx,.txt,.md"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void onUploadFile(file);
                }}
              />
            </label>
            <span className="text-sm text-slate-600">{isUploading ? 'Processing file...' : status}</span>
          </div>

          <textarea
            value={contentText}
            onChange={(event) => setContentText(event.target.value)}
            placeholder="Or paste content here..."
            className="mt-4 h-40 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none ring-slate-300 focus:ring"
          />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="max-h-[50vh] overflow-y-auto p-5">
            <div className="space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    message.role === 'assistant'
                      ? 'bg-slate-100 text-slate-800'
                      : 'ml-auto bg-slate-900 text-white'
                  }`}
                >
                  {message.text}
                </div>
              ))}
              {isLoading ? (
                <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
                  <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
                </div>
              ) : null}
            </div>
          </div>

          <form onSubmit={onAsk} className="border-t border-slate-200 p-4">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask a question from uploaded content..."
                className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none ring-slate-300 focus:ring"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-4 text-white disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
