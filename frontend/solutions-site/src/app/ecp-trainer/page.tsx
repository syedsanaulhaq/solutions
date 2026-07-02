'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Loader2, Mic, PlayCircle, Send, Square, Volume2, VolumeX } from 'lucide-react';

const ECP_LOGO_URL = '/ecp/ecp-logo.png';

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

const AGENDA_STORAGE_KEY = 'ecpTrainerCustomAgendaV1';
const CALENDAR_PDF_URL_KEY = 'ecpTrainerCalendarPdfUrlV1';
const DEFAULT_CALENDAR_URL = '/ecp/ecp-training-calendar.pdf';

const START_MESSAGE: Message = {
  id: 1,
  role: 'assistant',
  text:
    'Welcome to Election Commission of Pakistan AI Trainer. Say "start onboarding" and I will guide a new employee through legal framework, electoral processes, technology, political finance, media outreach, inclusion, administration, and practical day-wise agenda readiness. You can also open the Training Calendar PDF from this first message.',
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
        title: 'ECP Official Workshop Snapshot',
        src: 'https://i.ytimg.com/vi/YMLenh-12lA/hqdefault.jpg',
      },
    ],
    videos: [
      {
        title: 'Official ECP Video Briefing',
        src: 'https://www.youtube-nocookie.com/embed/5ZTUmguQLmg',
      },
    ],
  },
  legal: {
    images: [
      {
        title: 'ECP Official Message Clip',
        src: 'https://i.ytimg.com/vi/2Q4_r3jlx9E/hqdefault.jpg',
      },
    ],
    videos: [
      {
        title: 'Official ECP Civic Message',
        src: 'https://www.youtube-nocookie.com/embed/2Q4_r3jlx9E',
      },
    ],
  },
  elections: {
    images: [
      {
        title: 'ECP Mock Polls Across Pakistan',
        src: 'https://i.ytimg.com/vi/rr4WxPpVkCY/hqdefault.jpg',
      },
    ],
    videos: [
      {
        title: 'ECP Mock Polls Training Video',
        src: 'https://www.youtube-nocookie.com/embed/rr4WxPpVkCY',
      },
    ],
  },
  technology: {
    images: [
      {
        title: 'Digital Innovation in Elections',
        src: 'https://i.ytimg.com/vi/m4V8n73S6BU/hqdefault.jpg',
      },
    ],
    videos: [
      {
        title: 'Digital Innovation Powering Electoral Integrity',
        src: 'https://www.youtube-nocookie.com/embed/m4V8n73S6BU',
      },
    ],
  },
  inclusion: {
    images: [
      {
        title: 'Female Voter Registration Drive',
        src: 'https://i.ytimg.com/vi/cib22sDnhDY/hqdefault.jpg',
      },
    ],
    videos: [
      {
        title: 'Women Parliamentary Caucus Collaboration',
        src: 'https://www.youtube-nocookie.com/embed/cib22sDnhDY',
      },
    ],
  },
  administration: {
    images: [
      {
        title: 'Official ECP Training Test Guidance',
        src: 'https://i.ytimg.com/vi/wf2b6vw3qb4/hqdefault.jpg',
      },
    ],
    videos: [
      {
        title: 'How to Fill OMR Sheets (ECP)',
        src: 'https://www.youtube-nocookie.com/embed/wf2b6vw3qb4',
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
  const [agendaText, setAgendaText] = useState('');
  const [agendaSummary, setAgendaSummary] = useState<string[]>([]);
  const [agendaStatus, setAgendaStatus] = useState('');
  const [isUploadingAgenda, setIsUploadingAgenda] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [calendarPdfUrl, setCalendarPdfUrl] = useState('');
  const [showCalendarModal, setShowCalendarModal] = useState(false);

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
        body: JSON.stringify({ message: text, history, agendaText }),
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
  }, [agendaText, input, isLoading, messages, speakText]);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(AGENDA_STORAGE_KEY) : null;
    const storedCalendar = typeof window !== 'undefined' ? window.localStorage.getItem(CALENDAR_PDF_URL_KEY) : null;
    if (stored) {
      setAgendaText(stored);
      setAgendaStatus('Custom agenda loaded from local storage.');
    }

    const normalizedCalendar = storedCalendar?.trim();
    if (!normalizedCalendar || normalizedCalendar === '/ecp/logo-only.png') {
      setCalendarPdfUrl(DEFAULT_CALENDAR_URL);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(CALENDAR_PDF_URL_KEY, DEFAULT_CALENDAR_URL);
      }
    } else {
      setCalendarPdfUrl(normalizedCalendar);
    }
  }, []);

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

  const uploadAgenda = useCallback(async (file: File) => {
    setAgendaStatus('Uploading and parsing agenda...');
    setIsUploadingAgenda(true);

    try {
      const form = new FormData();
      form.append('file', file);

      const response = await fetch('/api/ecp-trainer/agenda', {
        method: 'POST',
        body: form,
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || typeof data?.agendaText !== 'string') {
        setAgendaStatus(data?.error || 'Could not parse agenda file.');
        return;
      }

      setAgendaText(data.agendaText);
      setAgendaSummary(Array.isArray(data?.summary) ? data.summary : []);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(AGENDA_STORAGE_KEY, data.agendaText);
      }

      const clipped = data?.clipped ? ' (text clipped for performance)' : '';
      setAgendaStatus(`Agenda uploaded successfully${clipped}.`);
    } catch {
      setAgendaStatus('Failed to upload agenda. Please try again.');
    } finally {
      setIsUploadingAgenda(false);
    }
  }, []);

  const clearAgenda = useCallback(() => {
    setAgendaText('');
    setAgendaSummary([]);
    setAgendaStatus('Custom agenda cleared.');
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(AGENDA_STORAGE_KEY);
    }
  }, []);

  const stopListening = useCallback(() => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== 'inactive') {
      recorder.stop();
    } else {
      setListening(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#d9f1e6_0%,_#e8f7ef_35%,_#f6fbf8_70%)] dark:bg-slate-950 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        {showCalendarModal ? (
          <div className="fixed inset-0 z-[121] flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
            <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/40">
              <button
                onClick={() => setShowCalendarModal(false)}
                className="absolute right-3 top-3 z-10 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white hover:bg-white/20"
              >
                Close
              </button>
              <div className="border-b border-white/10 px-6 py-4">
                <p className="text-xs uppercase tracking-[0.24em] text-emerald-200">Training calendar</p>
                <h3 className="mt-1 text-lg font-semibold text-white">Election Commission of Pakistan Calendar PDF</h3>
              </div>
              <div className="bg-white">
                {calendarPdfUrl ? (
                  <iframe title="ECP Training Calendar PDF" src={calendarPdfUrl} className="h-[75vh] w-full" />
                ) : (
                  <div className="grid h-[40vh] place-items-center px-6 text-center text-slate-700">
                    <p>Please set a calendar PDF URL from the Admin Agenda Loader panel to open it here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}

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
                <p className="text-xs uppercase tracking-[0.24em] text-emerald-200">Training media</p>
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
          <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900 dark:bg-emerald-950/20">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">Admin Agenda Loader</p>
              <button
                type="button"
                onClick={() => setShowAdminPanel((v) => !v)}
                className="rounded-lg border border-emerald-300 px-2.5 py-1 text-xs font-medium text-emerald-800 hover:bg-emerald-100 dark:border-emerald-700 dark:text-emerald-200 dark:hover:bg-emerald-900/50"
              >
                {showAdminPanel ? 'Hide' : 'Show'}
              </button>
            </div>

            {showAdminPanel ? (
              <div className="mt-3 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <label className="inline-flex cursor-pointer items-center rounded-lg border border-emerald-300 bg-white px-3 py-1.5 text-xs font-medium text-emerald-800 hover:bg-emerald-100 dark:border-emerald-700 dark:bg-slate-900 dark:text-emerald-200 dark:hover:bg-emerald-900/40">
                    Upload .docx/.txt/.md
                    <input
                      type="file"
                      accept=".docx,.txt,.md"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          void uploadAgenda(file);
                        }
                        event.currentTarget.value = '';
                      }}
                      disabled={isUploadingAgenda}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={clearAgenda}
                    className="rounded-lg border border-emerald-300 px-3 py-1.5 text-xs font-medium text-emerald-800 hover:bg-emerald-100 dark:border-emerald-700 dark:text-emerald-200 dark:hover:bg-emerald-900/40"
                  >
                    Clear custom agenda
                  </button>
                </div>

                <textarea
                  value={agendaText}
                  onChange={(event) => setAgendaText(event.target.value)}
                  placeholder="Optional: paste full agenda text here..."
                  className="h-28 w-full rounded-xl border border-emerald-200 bg-white px-3 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 dark:border-emerald-800 dark:bg-slate-900 dark:text-slate-100"
                />

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.localStorage.setItem(AGENDA_STORAGE_KEY, agendaText);
                      }
                      setAgendaStatus('Agenda text saved for this browser.');
                    }}
                    className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
                  >
                    Save agenda text
                  </button>
                  <input
                    type="url"
                    value={calendarPdfUrl}
                    onChange={(event) => setCalendarPdfUrl(event.target.value)}
                    placeholder="https://.../ecp-training-calendar.pdf"
                    className="h-8 min-w-[260px] flex-1 rounded-lg border border-emerald-200 bg-white px-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 dark:border-emerald-800 dark:bg-slate-900 dark:text-slate-100"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        if (calendarPdfUrl.trim()) {
                          window.localStorage.setItem(CALENDAR_PDF_URL_KEY, calendarPdfUrl.trim());
                        } else {
                          window.localStorage.removeItem(CALENDAR_PDF_URL_KEY);
                        }
                      }
                      setAgendaStatus('Calendar PDF URL saved.');
                    }}
                    className="rounded-lg border border-emerald-300 px-3 py-1.5 text-xs font-medium text-emerald-800 hover:bg-emerald-100 dark:border-emerald-700 dark:text-emerald-200 dark:hover:bg-emerald-900/40"
                  >
                    Save PDF URL
                  </button>
                  {agendaText ? <span className="text-xs text-emerald-900 dark:text-emerald-200">Custom agenda active</span> : null}
                </div>

                {agendaSummary.length ? (
                  <div className="rounded-lg border border-emerald-200 bg-white p-2 text-xs text-slate-700 dark:border-emerald-800 dark:bg-slate-900 dark:text-slate-200">
                    {agendaSummary.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                ) : null}

                {agendaStatus ? <p className="text-xs text-emerald-900 dark:text-emerald-200">{agendaStatus}</p> : null}
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <img src={ECP_LOGO_URL} alt="Election Commission of Pakistan logo" className="h-12 w-12 object-contain" loading="lazy" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Election Commission of Pakistan AI Trainer</h1>
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
                        ? 'bg-emerald-600 text-white rounded-br-sm'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {msg.role === 'assistant' && msg.id === 1 ? (
                      <div className="mt-2">
                        <button
                          type="button"
                          onClick={() => setShowCalendarModal(true)}
                          className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200 dark:hover:bg-emerald-900/50"
                        >
                          Open Training Calendar (PDF)
                        </button>
                      </div>
                    ) : null}

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
                                  <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-emerald-600/30 via-slate-900/30 to-black/40 text-white">
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
                  <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-emerald-600 px-4 py-2 text-sm text-white">
                    <p className="inline-flex items-center gap-2">
                      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-300 animate-pulse" />
                      Recording voice... click mic again to send
                    </p>
                  </div>
                </div>
              ) : null}

              {isTranscribing ? (
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-emerald-600 px-4 py-2 text-sm text-white">
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
              className="h-11 flex-1 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              maxLength={1000}
              disabled={isLoading || isTranscribing || listening}
            />

            <button
              onClick={() => void sendMessage()}
              disabled={!input.trim() || isLoading || isTranscribing || listening}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Send"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>

          {speechError ? <p className="mt-2 text-sm text-red-600">{speechError}</p> : null}
          {isTranscribing ? <p className="mt-2 text-sm text-emerald-600">Uploading and transcribing your voice...</p> : null}

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Tip: Ask &quot;Check Day 5 agenda&quot; or &quot;Suggest extra activities&quot; for practical enhancements.
          </p>
        </div>
      </div>
    </div>
  );
}
