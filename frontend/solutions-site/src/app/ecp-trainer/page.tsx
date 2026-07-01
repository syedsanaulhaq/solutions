'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Bot, Loader2, Mic, PlayCircle, Send, Square, Volume2, VolumeX } from 'lucide-react';

interface MediaItem {
  title: string;
  src: string;
}

type MediaKind = 'image' | 'video';

interface ViewerState {
  kind: MediaKind;
  title: string;
  src: string;
}

interface ReplyMedia {
  images: MediaItem[];
  videos: MediaItem[];
}

interface Message {
  id: number;
  role: 'assistant' | 'user';
  text: string;
  media?: ReplyMedia;
}

interface ApiHistory {
  role: 'assistant' | 'user';
  content: string;
}

const START_MESSAGE: Message = {
  id: 1,
  role: 'assistant',
  text:
    'Welcome to Election Commission of Pakistan PST-2026 Training Assistant. Say "start onboarding" and I will guide a new employee through legal framework, electoral processes, technology, political finance, media outreach, inclusion, administration, and practical day-wise agenda readiness.',
};

const QUICK_TOPICS = [
  'Start onboarding',
  'Day 1 orientation',
  'Legal framework',
  'Voter registration',
  'General elections',
  'EDR and technology',
  'Suggest extra activities',
];

const ERROR_REPLY = 'I could not connect right now. Please try again.';

const TRAINING_MEDIA_LIBRARY: Record<string, ReplyMedia> = {
  overview: {
    images: [
      {
        title: 'Institutional Orientation',
        src: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    videos: [
      {
        title: 'Public Sector Orientation',
        src: 'https://www.youtube-nocookie.com/embed?listType=search&list=public%20sector%20orientation%20pakistan',
      },
    ],
  },
  legal: {
    images: [
      {
        title: 'Constitution and Rule of Law',
        src: 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    videos: [
      {
        title: 'Election Law Briefing',
        src: 'https://www.youtube-nocookie.com/embed?listType=search&list=election%20law%20overview',
      },
    ],
  },
  elections: {
    images: [
      {
        title: 'Polling and Election Operations',
        src: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    videos: [
      {
        title: 'Polling Process Training',
        src: 'https://www.youtube-nocookie.com/embed?listType=search&list=polling%20process%20training',
      },
    ],
  },
  technology: {
    images: [
      {
        title: 'Election Technology Systems',
        src: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    videos: [
      {
        title: 'Digital Elections Management',
        src: 'https://www.youtube-nocookie.com/embed?listType=search&list=election%20management%20system%20training',
      },
    ],
  },
  inclusion: {
    images: [
      {
        title: 'Inclusive Electoral Participation',
        src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    videos: [
      {
        title: 'Gender and Inclusion in Elections',
        src: 'https://www.youtube-nocookie.com/embed?listType=search&list=gender%20inclusive%20elections',
      },
    ],
  },
  administration: {
    images: [
      {
        title: 'Public Administration and Governance',
        src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    videos: [
      {
        title: 'Public Service Leadership Skills',
        src: 'https://www.youtube-nocookie.com/embed?listType=search&list=public%20service%20leadership%20training',
      },
    ],
  },
};

function mediaForReply(text: string): ReplyMedia | undefined {
  const lower = text.toLowerCase();

  if (lower.includes('legal') || lower.includes('constitution') || lower.includes('elections act') || lower.includes('writ')) {
    return TRAINING_MEDIA_LIBRARY.legal;
  }
  if (lower.includes('general election') || lower.includes('poll') || lower.includes('dro') || lower.includes('ro') || lower.includes('delimitation')) {
    return TRAINING_MEDIA_LIBRARY.elections;
  }
  if (lower.includes('technology') || lower.includes('ems') || lower.includes('evm') || lower.includes('digital')) {
    return TRAINING_MEDIA_LIBRARY.technology;
  }
  if (lower.includes('gender') || lower.includes('inclusion') || lower.includes('disability') || lower.includes('harassment')) {
    return TRAINING_MEDIA_LIBRARY.inclusion;
  }
  if (lower.includes('secretariat') || lower.includes('hr') || lower.includes('procurement') || lower.includes('leadership')) {
    return TRAINING_MEDIA_LIBRARY.administration;
  }
  if (lower.includes('overview') || lower.includes('agenda') || lower.includes('orientation') || lower.includes('onboarding')) {
    return TRAINING_MEDIA_LIBRARY.overview;
  }

  return undefined;
}

export default function EcpTrainerPage() {
  const [messages, setMessages] = useState<Message[]>([START_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [speechError, setSpeechError] = useState('');
  const [voiceMode, setVoiceMode] = useState<'neural' | 'browser'>('browser');
  const [viewer, setViewer] = useState<ViewerState | null>(null);

  const nextIdRef = useRef(2);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const micStreamRef = useRef<MediaStream | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const speechSessionRef = useRef(0);

  const canUseSpeech = useMemo(() => typeof window !== 'undefined' && 'speechSynthesis' in window, []);

  const stopAudio = useCallback(() => {
    speechSessionRef.current += 1;
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const splitForSpeech = useCallback((text: string): string[] => {
    const normalized = text.replace(/\s+/g, ' ').trim();
    if (!normalized) return [];

    const sentenceLike = normalized
      .split(/(?<=[.!?])\s+/)
      .map((part) => part.trim())
      .filter(Boolean);

    const chunks: string[] = [];
    let current = '';

    for (const part of sentenceLike) {
      const next = current ? `${current} ${part}` : part;
      if (next.length <= 220) {
        current = next;
      } else {
        if (current) chunks.push(current);
        if (part.length <= 220) {
          current = part;
        } else {
          const words = part.split(' ');
          let buffer = '';
          for (const word of words) {
            const candidate = buffer ? `${buffer} ${word}` : word;
            if (candidate.length <= 220) {
              buffer = candidate;
            } else {
              if (buffer) chunks.push(buffer);
              buffer = word;
            }
          }
          current = buffer;
        }
      }
    }

    if (current) chunks.push(current);
    return chunks;
  }, []);

  const playNeuralChunk = useCallback(async (chunk: string, session: number): Promise<boolean> => {
    try {
      const response = await fetch(`/api/tts-en?q=${encodeURIComponent(chunk)}`);
      if (!response.ok) return false;

      const blob = await response.blob();
      if (blob.size <= 1000) return false;

      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      currentAudioRef.current = audio;
      setVoiceMode('neural');

      const ok = await new Promise<boolean>((resolve) => {
        audio.onended = () => {
          URL.revokeObjectURL(url);
          currentAudioRef.current = null;
          resolve(true);
        };
        audio.onerror = () => {
          URL.revokeObjectURL(url);
          currentAudioRef.current = null;
          resolve(false);
        };
        audio.play().catch(() => {
          URL.revokeObjectURL(url);
          currentAudioRef.current = null;
          resolve(false);
        });
      });

      return session === speechSessionRef.current ? ok : false;
    } catch {
      return false;
    }
  }, []);

  const playBrowserChunk = useCallback((chunk: string, session: number) => {
    return new Promise<void>((resolve) => {
      if (!canUseSpeech || session !== speechSessionRef.current) {
        resolve();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(chunk);
      utterance.rate = 0.94;
      utterance.pitch = 0.98;
      utterance.lang = 'en-US';

      const preferredNames = ['Google US English', 'Microsoft Guy Online (Natural)', 'Samantha', 'Daniel'];
      const voices = window.speechSynthesis.getVoices();
      const preferred =
        preferredNames.map((name) => voices.find((v) => v.name.includes(name))).find(Boolean) ||
        voices.find((v) => v.lang === 'en-US') ||
        voices.find((v) => v.lang.startsWith('en'));

      if (preferred) utterance.voice = preferred;
      setVoiceMode('browser');

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      window.speechSynthesis.speak(utterance);
    });
  }, [canUseSpeech]);

  const speakText = useCallback(async (text: string) => {
    if (!autoSpeak) return;
    stopAudio();

    const session = speechSessionRef.current;
    const chunks = splitForSpeech(text);

    for (const chunk of chunks) {
      if (!autoSpeak || session !== speechSessionRef.current) return;
      const neuralOk = await playNeuralChunk(chunk, session);
      if (!neuralOk) {
        await playBrowserChunk(chunk, session);
      }
    }
  }, [autoSpeak, playBrowserChunk, playNeuralChunk, splitForSpeech, stopAudio]);

  const sendMessage = useCallback(async (rawText?: string) => {
    const text = (rawText ?? input).trim();
    if (!text || isLoading) return;

    const userMessage: Message = { id: nextIdRef.current++, role: 'user', text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    const history: ApiHistory[] = updatedMessages
      .slice(0, -1)
      .slice(-8)
      .map((msg) => ({ role: msg.role, content: msg.text }));

    try {
      const res = await fetch('/api/ecp-trainer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });

      const data = await res.json();
      const reply: string = data?.reply || ERROR_REPLY;

      setMessages((prev) => {
        const assistantMessage: Message = {
          id: nextIdRef.current++,
          role: 'assistant',
          text: reply,
          media: mediaForReply(reply),
        };
        return [...prev.map((message) => (message.role === 'assistant' ? { ...message, media: undefined } : message)), assistantMessage];
      });

      speakText(reply);
    } catch {
      setMessages((prev) => {
        const assistantMessage: Message = {
          id: nextIdRef.current++,
          role: 'assistant',
          text: ERROR_REPLY,
          media: TRAINING_MEDIA_LIBRARY.overview,
        };
        return [...prev.map((message) => (message.role === 'assistant' ? { ...message, media: undefined } : message)), assistantMessage];
      });
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, speakText]);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop());
        micStreamRef.current = null;
      }
      stopAudio();
    };
  }, [stopAudio]);

  const startListening = useCallback(() => {
    setSpeechError('');
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || typeof MediaRecorder === 'undefined') {
      setSpeechError('Voice recording is not supported in this browser. Use Chrome or Edge over HTTPS.');
      return;
    }

    stopAudio();

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        micStreamRef.current = stream;
        audioChunksRef.current = [];

        const mimeType = ['audio/webm', 'audio/ogg', 'audio/mp4'].find((type) => MediaRecorder.isTypeSupported(type));
        const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        recorder.onerror = () => {
          setSpeechError('Microphone recording failed. Please try again.');
          setListening(false);
        };

        recorder.onstop = async () => {
          setListening(false);
          setIsTranscribing(true);

          if (micStreamRef.current) {
            micStreamRef.current.getTracks().forEach((track) => track.stop());
            micStreamRef.current = null;
          }

          if (!audioChunksRef.current.length) {
            setSpeechError('No voice captured. Please try again.');
            setIsTranscribing(false);
            return;
          }

          try {
            const blobType = recorder.mimeType || 'audio/webm';
            const extension = blobType.includes('ogg') ? 'ogg' : blobType.includes('mp4') ? 'mp4' : 'webm';
            const audioBlob = new Blob(audioChunksRef.current, { type: blobType });

            const formData = new FormData();
            formData.append('file', audioBlob, `voice.${extension}`);

            const response = await fetch('/api/stt-en', {
              method: 'POST',
              body: formData,
            });

            const data = await response.json().catch(() => ({}));
            const transcript = typeof data?.text === 'string' ? data.text.trim() : '';

            if (!response.ok || !transcript) {
              setSpeechError('Could not transcribe voice. Please try again.');
            } else {
              setSpeechError('');
              setInput(transcript);
              void sendMessage(transcript);
            }
          } catch {
            setSpeechError('Voice upload failed. Please try again.');
          } finally {
            audioChunksRef.current = [];
            mediaRecorderRef.current = null;
            setIsTranscribing(false);
          }
        };

        mediaRecorderRef.current = recorder;
        setListening(true);
        recorder.start();
      })
      .catch((error: Error & { name?: string }) => {
        const code = error?.name || 'UnknownError';
        if (code === 'NotAllowedError' || code === 'PermissionDeniedError') {
          setSpeechError('Microphone permission denied. Please allow mic access and try again.');
        } else if (code === 'NotFoundError') {
          setSpeechError('No microphone found. Connect a microphone and try again.');
        } else {
          setSpeechError('Unable to access microphone. Please try again.');
        }
      });
  }, [sendMessage, stopAudio]);

  const stopListening = useCallback(() => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== 'inactive') {
      recorder.stop();
    } else {
      setListening(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#dbeafe_0%,_#eff6ff_35%,_#f8fafc_70%)] dark:bg-slate-950 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        {viewer ? (
          <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/40">
              <button
                onClick={() => setViewer(null)}
                className="absolute right-3 top-3 z-10 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white hover:bg-white/20"
              >
                Close
              </button>
              <div className="border-b border-white/10 px-6 py-4">
                <p className="text-xs uppercase tracking-[0.24em] text-blue-200">Training media</p>
                <h3 className="mt-1 text-lg font-semibold text-white">{viewer.title}</h3>
              </div>
              <div className="bg-black">
                {viewer.kind === 'image' ? (
                  <img src={viewer.src} alt={viewer.title} className="max-h-[75vh] w-full object-contain" />
                ) : (
                  <iframe
                    src={viewer.src}
                    title={viewer.title}
                    className="h-[75vh] w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          </div>
        ) : null}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">ECP PST-2026 AI Trainer</h1>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Voice onboarding assistant for new Election Commission Pakistan employees
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Voice engine: {voiceMode === 'neural' ? 'Neural voice (same style as your other demos)' : 'Browser fallback voice'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setAutoSpeak((v) => !v)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {autoSpeak ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              {autoSpeak ? 'Voice On' : 'Voice Off'}
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {QUICK_TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => {
                  setInput(topic);
                }}
                className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                {topic}
              </button>
            ))}
          </div>

          <div className="mt-5 h-[460px] overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
            <div className="space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {msg.role === 'assistant' && msg.media ? (
                      <div className="mt-3 space-y-2">
                        {msg.media.images.length ? (
                          <div className="grid gap-2 md:grid-cols-2">
                            {msg.media.images.map((item) => (
                              <button
                                key={item.title}
                                type="button"
                                onClick={() => setViewer({ kind: 'image', title: item.title, src: item.src })}
                                className="overflow-hidden rounded-xl border border-slate-200 bg-white text-left transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-950"
                              >
                                <img src={item.src} alt={item.title} className="h-28 w-full object-cover" loading="lazy" />
                                <figcaption className="px-2 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300">
                                  {item.title}
                                </figcaption>
                              </button>
                            ))}
                          </div>
                        ) : null}

                        {msg.media.videos.length ? (
                          <div className="grid gap-2">
                            {msg.media.videos.map((item) => (
                              <button
                                key={item.title}
                                type="button"
                                onClick={() => setViewer({ kind: 'video', title: item.title, src: item.src })}
                                className="rounded-xl border border-slate-200 bg-white p-2 text-left transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-950"
                              >
                                <div className="relative h-28 overflow-hidden rounded-lg bg-slate-900">
                                  <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-blue-600/30 via-slate-900/30 to-black/40 text-white">
                                    <div className="rounded-full bg-white/15 px-4 py-2 text-xs font-semibold backdrop-blur">
                                      Click to open video
                                    </div>
                                  </div>
                                  <div className="absolute inset-x-0 bottom-0 bg-black/55 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80">
                                    YouTube preview
                                  </div>
                                </div>
                                <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 dark:text-slate-300">
                                  <PlayCircle className="h-3 w-3" />
                                  {item.title}
                                </p>
                              </button>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}

              {isLoading ? (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                    Trainer is preparing your agenda-based guidance...
                  </div>
                </div>
              ) : null}

              {listening ? (
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-blue-600 px-4 py-2 text-sm text-white">
                    <p className="inline-flex items-center gap-2">
                      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-300 animate-pulse" />
                      Recording voice... click mic again to send
                    </p>
                  </div>
                </div>
              ) : null}

              {isTranscribing ? (
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-blue-600 px-4 py-2 text-sm text-white">
                    <p className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Uploading and transcribing your voice...
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={listening ? stopListening : startListening}
              className={`flex h-11 w-11 items-center justify-center rounded-xl text-white ${
                listening ? 'bg-red-500 hover:bg-red-600' : 'bg-slate-700 hover:bg-slate-800'
              }`}
              aria-label={listening ? 'Stop voice recording' : 'Start voice recording'}
              disabled={isLoading || isTranscribing}
            >
              {listening ? <Square className="h-4 w-4" /> : <Mic className="h-5 w-5" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  void sendMessage();
                }
              }}
              placeholder={
                listening
                  ? 'Recording... click mic again to finish'
                  : isTranscribing
                    ? 'Transcribing your voice...'
                    : 'Ask about legal framework, elections, technology, or a specific day'
              }
              className="h-11 flex-1 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              maxLength={1000}
              disabled={isLoading || isTranscribing || listening}
            />

            <button
              onClick={() => void sendMessage()}
              disabled={!input.trim() || isLoading || isTranscribing || listening}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Send"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>

          {speechError ? <p className="mt-2 text-sm text-red-600">{speechError}</p> : null}
          {isTranscribing ? <p className="mt-2 text-sm text-blue-600">Uploading and transcribing your voice...</p> : null}

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Tip: Ask &quot;Check Day 5 agenda&quot; or &quot;Suggest extra activities&quot; for practical enhancements.
          </p>
        </div>
      </div>
    </div>
  );
}
