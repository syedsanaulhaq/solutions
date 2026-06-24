'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { Bot, Mic, MicOff, PlayCircle, Send, Volume2, VolumeX } from 'lucide-react';

interface MediaItem {
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
    'Welcome to Ice Cream Factory Training. I am your voice trainer. Say "start onboarding" and I will guide you through company overview, layout, safety, machines, daily workflow, and job responsibilities.',
};

const QUICK_TOPICS = [
  'Start onboarding',
  'Company overview',
  'Factory layout',
  'Safety rules',
  'Machine instructions',
  'Daily workflow',
  'Job responsibilities',
];

const ERROR_REPLY = 'I could not connect right now. Please try again.';

const TRAINING_MEDIA_LIBRARY: Record<string, ReplyMedia> = {
  overview: {
    images: [
      {
        title: 'Factory Overview',
        src: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    videos: [
      {
        title: 'Welcome Walkthrough',
        src: 'https://player.vimeo.com/external/523774138.sd.mp4?s=6f6739f76ce9aaf6b4922d3ec45ca94954d4f7c2&profile_id=164&oauth2_token_id=57447761',
      },
    ],
  },
  layout: {
    images: [
      {
        title: 'Production Layout',
        src: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    videos: [
      {
        title: 'Factory Floor Orientation',
        src: 'https://player.vimeo.com/external/449627919.sd.mp4?s=6b3168458d7311ca4fb22d2ff8ae9e06a9e0ebc3&profile_id=164&oauth2_token_id=57447761',
      },
    ],
  },
  safety: {
    images: [
      {
        title: 'PPE and Hygiene',
        src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    videos: [
      {
        title: 'Safety and PPE Reminder',
        src: 'https://player.vimeo.com/external/449627919.sd.mp4?s=6b3168458d7311ca4fb22d2ff8ae9e06a9e0ebc3&profile_id=164&oauth2_token_id=57447761',
      },
    ],
  },
  machine: {
    images: [
      {
        title: 'Machine Checkpoints',
        src: 'https://images.unsplash.com/photo-1581092160613-7ddc8a8f9a63?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    videos: [
      {
        title: 'Machine Operation Basics',
        src: 'https://player.vimeo.com/external/523774138.sd.mp4?s=6f6739f76ce9aaf6b4922d3ec45ca94954d4f7c2&profile_id=164&oauth2_token_id=57447761',
      },
    ],
  },
  workflow: {
    images: [
      {
        title: 'Daily Workflow Board',
        src: 'https://images.unsplash.com/photo-1582719368393-bb71ca45dbb9?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    videos: [
      {
        title: 'Packing Line Awareness',
        src: 'https://player.vimeo.com/external/523774138.sd.mp4?s=6f6739f76ce9aaf6b4922d3ec45ca94954d4f7c2&profile_id=164&oauth2_token_id=57447761',
      },
    ],
  },
  role: {
    images: [
      {
        title: 'Team Responsibilities',
        src: 'https://images.unsplash.com/photo-1571689936114-b16146a5c2e9?auto=format&fit=crop&w=1200&q=80',
      },
    ],
    videos: [
      {
        title: 'Shift Role Briefing',
        src: 'https://player.vimeo.com/external/449627919.sd.mp4?s=6b3168458d7311ca4fb22d2ff8ae9e06a9e0ebc3&profile_id=164&oauth2_token_id=57447761',
      },
    ],
  },
};

function mediaForReply(text: string): ReplyMedia | undefined {
  const lower = text.toLowerCase();

  if (lower.includes('safety') || lower.includes('ppe') || lower.includes('hygiene') || lower.includes('emergency')) {
    return TRAINING_MEDIA_LIBRARY.safety;
  }
  if (lower.includes('machine') || lower.includes('equipment') || lower.includes('jam') || lower.includes('lockout')) {
    return TRAINING_MEDIA_LIBRARY.machine;
  }
  if (lower.includes('layout') || lower.includes('zone') || lower.includes('floor') || lower.includes('station')) {
    return TRAINING_MEDIA_LIBRARY.layout;
  }
  if (lower.includes('workflow') || lower.includes('daily') || lower.includes('shift') || lower.includes('process')) {
    return TRAINING_MEDIA_LIBRARY.workflow;
  }
  if (lower.includes('responsibilit') || lower.includes('role') || lower.includes('duty')) {
    return TRAINING_MEDIA_LIBRARY.role;
  }
  if (lower.includes('overview') || lower.includes('company') || lower.includes('welcome') || lower.includes('onboarding')) {
    return TRAINING_MEDIA_LIBRARY.overview;
  }

  return undefined;
}

type BrowserSpeechRecognition = {
  new (): {
    lang: string;
    interimResults: boolean;
    maxAlternatives: number;
    onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
    onerror: ((event: { error: string }) => void) | null;
    onend: (() => void) | null;
    start: () => void;
    stop: () => void;
  };
};

function getSpeechRecognitionCtor(): BrowserSpeechRecognition | null {
  if (typeof window === 'undefined') return null;
  const win = window as typeof window & {
    SpeechRecognition?: BrowserSpeechRecognition;
    webkitSpeechRecognition?: BrowserSpeechRecognition;
  };
  return win.SpeechRecognition ?? win.webkitSpeechRecognition ?? null;
}

export default function FactoryTrainerPage() {
  const [messages, setMessages] = useState<Message[]>([START_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [speechError, setSpeechError] = useState('');
  const [voiceMode, setVoiceMode] = useState<'neural' | 'browser'>('browser');

  const nextIdRef = useRef(2);
  const recognitionRef = useRef<InstanceType<BrowserSpeechRecognition> | null>(null);
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
      const res = await fetch('/api/factory-trainer', {
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
        return [...prev, assistantMessage];
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
        return [...prev, assistantMessage];
      });
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, speakText]);

  const startListening = useCallback(() => {
    setSpeechError('');
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) {
      setSpeechError('Voice input is not supported in this browser. Use Chrome or Edge.');
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    const recognition = new Ctor();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript?.trim() ?? '';
      if (transcript) {
        setInput(transcript);
      }
    };

    recognition.onerror = (event) => {
      setSpeechError(`Microphone error: ${event.error}`);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
    setListening(true);
    stopAudio();
    recognition.start();
  }, [stopAudio]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setListening(false);
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#dbeafe_0%,_#eff6ff_35%,_#f8fafc_70%)] dark:bg-slate-950 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Ice Cream Factory AI Trainer</h1>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Voice onboarding assistant for new factory employees
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
                              <figure key={item.title} className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950">
                                <img src={item.src} alt={item.title} className="h-28 w-full object-cover" loading="lazy" />
                                <figcaption className="px-2 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300">
                                  {item.title}
                                </figcaption>
                              </figure>
                            ))}
                          </div>
                        ) : null}

                        {msg.media.videos.length ? (
                          <div className="grid gap-2">
                            {msg.media.videos.map((item) => (
                              <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-950">
                                <video className="h-28 w-full rounded-lg object-cover" controls preload="metadata" muted playsInline>
                                  <source src={item.src} type="video/mp4" />
                                </video>
                                <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 dark:text-slate-300">
                                  <PlayCircle className="h-3 w-3" />
                                  {item.title}
                                </p>
                              </div>
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
                    Trainer is preparing your guidance...
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
              aria-label={listening ? 'Stop voice input' : 'Start voice input'}
            >
              {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
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
              placeholder="Ask about safety, machines, workflow, or responsibilities"
              className="h-11 flex-1 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              maxLength={1000}
              disabled={isLoading}
            />

            <button
              onClick={() => void sendMessage()}
              disabled={!input.trim() || isLoading}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Send"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>

          {speechError ? <p className="mt-2 text-sm text-red-600">{speechError}</p> : null}

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Tip: Ask &quot;Start onboarding&quot; for a full voice-based orientation for new employees.
          </p>
        </div>
      </div>
    </div>
  );
}
