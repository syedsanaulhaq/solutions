'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Loader2, Mic, PlayCircle, Send, Square, Volume2, VolumeX } from 'lucide-react';

declare global {
  interface Window {
    AndroidSpeech?: {
      startListening: (languageCode: string) => void;
      stopListening: () => void;
    };
  }
}

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

interface NativeSpeechEventDetail {
  type?: 'result' | 'error';
  text?: string;
  error?: string;
}

const CALENDAR_PDF_URL_KEY = 'ecpTrainerCalendarPdfUrlV1';
const DEFAULT_CALENDAR_URL = '/ecp/ecp-training-calendar.pdf';

const START_MESSAGE: Message = {
  id: 1,
  role: 'assistant',
  text:
    'Welcome to Election Commission of Pakistan AI Trainer. Say "start onboarding" and I will guide a new employee through legal framework, electoral processes, voter services, technology, political finance, and public information channels. You can also open the Training Calendar PDF from this first message.',
};

const QUICK_TOPICS = [
  'Start onboarding',
  'Voter registration',
  'Legal framework',
  'General elections',
  'Delimitation',
  'Notifications and orders',
];

const ERROR_REPLY = 'I could not connect right now. Please try again.';

const QUICK_TOPICS_UR = [
  'آغاز کریں',
  'ووٹر رجسٹریشن',
  'قانونی ڈھانچہ',
  'عام انتخابات',
  'حلقہ بندی',
  'نوٹیفکیشنز اور آرڈرز',
];

const START_MESSAGE_UR_TEXT =
  'الیکشن کمیشن آف پاکستان اے آئی ٹرینر میں خوش آمدید۹ “آغاز کریں” کہیں اور میں آپ کو قانونی ڈھانچے، انتخابی عمل، ٹیکنالوجی، میڈیا، صنفی شمول، انتظامیہ اور روزانہ کے ایجنڈے کے بارے میں رہنمائی کروں گا۹ آپ اس پیغام سے تربیتی کیلینڈر پی ڈی ایف بھی کھول سکتے ہیں۹';

const UI_TEXT = {
  en: {
    adminLoader: 'Admin Agenda Loader',
    show: 'Show',
    hide: 'Hide',
    uploadAgenda: 'Upload .docx/.txt/.md',
    clearAgenda: 'Clear custom agenda',
    agendaPlaceholder: 'Optional: paste full agenda text here...',
    saveAgenda: 'Save agenda text',
    pdfPlaceholder: 'https://.../ecp-training-calendar.pdf',
    savePdfUrl: 'Save PDF URL',
    customAgendaActive: 'Custom agenda active',
    heading: 'ECP AI Trainer',
    subheading: 'Voice onboarding assistant for new Election Commission Pakistan employees',
    voiceEnginePrefix: 'Voice engine:',
    neuralVoice: 'Neural voice (same style as your other demos)',
    browserVoice: 'Browser fallback voice',
    voiceOn: 'Voice On',
    voiceOff: 'Voice Off',
    urduVersion: 'اردو ورژن',
    calendarTitle: 'Training calendar',
    calendarHeading: 'Election Commission of Pakistan Calendar PDF',
    openInNewTab: 'Open in new tab',
    pdfUnavailable: 'PDF preview is unavailable in this browser.',
    openPdfNewTab: 'Open PDF in new tab',
    setPdfUrl: 'Please set a calendar PDF URL from the Admin Agenda Loader panel to open it here.',
    trainingMedia: 'Training media',
    close: 'Close',
    openTrainingCalendar: 'Open Training Calendar (PDF)',
    preparing: 'Trainer is preparing your agenda-based guidance...',
    recording: 'Recording voice... click mic again to send',
    transcribing: 'Uploading and transcribing your voice...',
    recordingPlaceholder: 'Recording... click mic again to finish',
    transcribingPlaceholder: 'Transcribing your voice...',
    inputPlaceholder: 'Ask about legal framework, elections, technology, or a specific day',
    sendAria: 'Send',
    startVoice: 'Start voice recording',
    stopVoice: 'Stop voice recording',
    tip: 'Tip: Ask about voter registration, election laws, delimitation, or latest notifications for practical guidance.',
    pdfSaved: 'Calendar PDF URL saved.',
    noVoiceCaptured: 'No voice captured. Please try again.',
    voiceFailed: 'Voice upload failed. Please try again.',
    transcriptionFailed: 'Could not transcribe voice. Please try again.',
    micFailed: 'Microphone recording failed. Please try again.',
    micPermission: 'Microphone permission denied. Please allow mic access and try again.',
    noMic: 'No microphone found. Connect a microphone and try again.',
    micAccess: 'Unable to access microphone. Please try again.',
    unsupportedVoice: 'Voice recording is not supported in this browser. Use Chrome or Edge over HTTPS.',
  },
  ur: {
    adminLoader: 'ایڈمن ایجنڈا لوڈر',
    show: 'کھولیں',
    hide: 'چھپائیں',
    uploadAgenda: '‏.docx/.txt/.md اپ لوڈ کریں',
    clearAgenda: 'کسٹم ایجنڈا صاف کریں',
    agendaPlaceholder: 'اختیاری: مکمل ایجنڈا یہاں پیسٹ کریں...',
    saveAgenda: 'ایجنڈا متن محفوظ کریں',
    pdfPlaceholder: 'https://.../ecp-training-calendar.pdf',
    savePdfUrl: 'پی ڈی ایف یو آر ایل محفوظ کریں',
    customAgendaActive: 'کسٹم ایجنڈا فعال ہے',
    heading: 'ECP AI Trainer',
    subheading: 'Voice onboarding assistant for new Election Commission Pakistan employees',
    voiceEnginePrefix: 'وائس انجن:',
    neuralVoice: 'نیورل آواز',
    browserVoice: 'براؤزر متبادل آواز',
    voiceOn: 'آواز آن',
    voiceOff: 'آواز آف',
    urduVersion: 'انگریزی ورژن',
    calendarTitle: 'تربیتی کیلینڈر',
    calendarHeading: 'الیکشن کمیشن آف پاکستان کیلینڈر پی ڈی ایف',
    openInNewTab: 'نئے ٹیب میں کھولیں',
    pdfUnavailable: 'اس براؤزر میں پی ڈی ایف پیش نظارہ دستیاب نہیں۔',
    openPdfNewTab: 'پی ڈی ایف نئے ٹیب میں کھولیں',
    setPdfUrl: 'اسے یہاں کھولنے کے لیے ایڈمن ایجنڈا لوڈر پینل سے کیلینڈر پی ڈی ایف یو آر ایل سیٹ کریں۔',
    trainingMedia: 'تربیتی میڈیا',
    close: 'بند کریں',
    openTrainingCalendar: 'تربیتی کیلینڈر (PDF) کھولیں',
    preparing: 'ٹرینر آپ کی ایجنڈا بنیاد رہنمائی تیار کر رہا ہے...',
    recording: 'آواز ریکارڈ ہو رہی ہے... بھیجنے کے لیے مائیک دوبارہ دبائیں',
    transcribing: 'آپ کی آواز اپ لوڈ اور متن میں تبدیل کی جا رہی ہے...',
    recordingPlaceholder: 'ریکارڈنگ جاری ہے... ختم کرنے کے لیے مائیک دوبارہ دبائیں',
    transcribingPlaceholder: 'آپ کی آواز کو متن میں بدلا جا رہا ہے...',
    inputPlaceholder: 'قانونی ڈھانچے، انتخابات، ٹیکنالوجی یا کسی مخصوص دن کے بارے میں پوچھیں',
    sendAria: 'بھیجیں',
    startVoice: 'آواز ریکارڈنگ شروع کریں',
    stopVoice: 'آواز ریکارڈنگ بند کریں',
    tip: 'مشورہ: عملی رہنمائی کے لیے ووٹر رجسٹریشن، انتخابی قوانین، حلقہ بندی یا تازہ نوٹیفکیشنز کے بارے میں پوچھیں۔',
    pdfSaved: 'کیلینڈر پی ڈی ایف یو آر ایل محفوظ کر دیا گیا۔',
    noVoiceCaptured: 'کوئی آواز ریکارڈ نہیں ہوئی۔ دوبارہ کوشش کریں۔',
    voiceFailed: 'آواز اپ لوڈ ناکام ہو گئی۔ دوبارہ کوشش کریں۔',
    transcriptionFailed: 'آواز کو متن میں تبدیل نہیں کیا جا سکا۔ دوبارہ کوشش کریں۔',
    micFailed: 'مائیکروفون ریکارڈنگ ناکام ہو گئی۔ دوبارہ کوشش کریں۔',
    micPermission: 'مائیکروفون کی اجازت نہیں ملی۔ براہ کرم اجازت دیں اور دوبارہ کوشش کریں۔',
    noMic: 'کوئی مائیکروفون نہیں ملا۔ مائیکروفون جوڑیں اور دوبارہ کوشش کریں۔',
    micAccess: 'مائیکروفون تک رسائی نہیں ہو سکی۔ دوبارہ کوشش کریں۔',
    unsupportedVoice: 'اس براؤزر میں صوتی ریکارڈنگ دستیاب نہیں۔ براہ کرم HTTPS پر Chrome یا Edge استعمال کریں۔',
  },
} as const;

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

function mediaForReply(userQuestion: string): ReplyMedia | undefined {
  const lower = userQuestion.toLowerCase();

  if (/\bday\s*5\b/.test(lower) || lower.includes('edr') || lower.includes('ems') || lower.includes('evm')) {
    return TRAINING_MEDIA_LIBRARY.technology;
  }
  if (/\bday\s*4\b/.test(lower)) {
    return TRAINING_MEDIA_LIBRARY.administration;
  }
  if (/\bday\s*3\b/.test(lower)) {
    return TRAINING_MEDIA_LIBRARY.elections;
  }
  if (/\bday\s*2\b/.test(lower)) {
    return TRAINING_MEDIA_LIBRARY.legal;
  }
  if (/\bday\s*1\b/.test(lower) || /\bday\s+one\b/.test(lower)) {
    return TRAINING_MEDIA_LIBRARY.overview;
  }
  if (/\bday\b/.test(lower) && (lower.includes('agenda') || lower.includes('orientation') || lower.includes('onboarding') || lower.includes('training'))) {
    return TRAINING_MEDIA_LIBRARY.overview;
  }

  return undefined;
}

export default function EcpTrainerPage({ forcedLang = 'en' }: { forcedLang?: 'en' | 'ur' }) {
  const [messages, setMessages] = useState<Message[]>([START_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [speechError, setSpeechError] = useState('');
  const [voiceMode, setVoiceMode] = useState<'neural' | 'browser'>('browser');
  const [viewer, setViewer] = useState<ViewerState | null>(null);
  const [calendarPdfUrl, setCalendarPdfUrl] = useState('');
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const lang = forcedLang;
  const langRef = useRef<'en' | 'ur'>(forcedLang);
  const ui = UI_TEXT[lang];
  const urduPageStyle =
    lang === 'ur'
      ? {
          fontFamily: "'Noto Nastaliq Urdu', 'Noto Sans', serif",
          lineHeight: '2.35',
        }
      : undefined;

  const nextIdRef = useRef(2);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const micStreamRef = useRef<MediaStream | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const speechSessionRef = useRef(0);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const silenceIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    langRef.current = lang;
    if (lang === 'ur' && typeof document !== 'undefined') {
      const id = 'noto-nastaliq-font';
      if (!document.getElementById(id)) {
        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap';
        document.head.appendChild(link);
      }
    }
  }, [lang]);

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
    const cleaned = text
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/^#{1,6}\s*/gm, '')
      .replace(/^[\*\-]\s+/gm, '')
      .replace(/\*/g, '')
      .replace(/`{1,3}[^`]*`{1,3}/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    const normalized = cleaned.replace(/\s+/g, ' ').trim();
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
      const ttsEndpoint = langRef.current === 'ur' ? '/api/tts-ur' : '/api/tts-en';
      const response = await fetch(`${ttsEndpoint}?q=${encodeURIComponent(chunk)}`);
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
      utterance.lang = langRef.current === 'ur' ? 'ur-PK' : 'en-US';

      const voices = window.speechSynthesis.getVoices();
      const preferred =
        langRef.current === 'ur'
          ? voices.find((v) => v.lang.toLowerCase().startsWith('ur'))
          : ['Google US English', 'Microsoft Guy Online (Natural)', 'Samantha', 'Daniel']
              .map((name) => voices.find((v) => v.name.includes(name)))
              .find(Boolean) ||
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
        body: JSON.stringify({ message: text, history, language: langRef.current }),
      });

      const data = await res.json();
      const reply: string = data?.reply || ERROR_REPLY;

      setMessages((prev) => {
        const assistantMessage: Message = {
          id: nextIdRef.current++,
          role: 'assistant',
          text: reply,
          media: mediaForReply(text),
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
    const storedCalendar = typeof window !== 'undefined' ? window.localStorage.getItem(CALENDAR_PDF_URL_KEY) : null;
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
      if (typeof window !== 'undefined' && window.AndroidSpeech?.stopListening) {
        window.AndroidSpeech.stopListening();
      }
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop());
        micStreamRef.current = null;
      }
      if (silenceIntervalRef.current) {
        clearInterval(silenceIntervalRef.current);
        silenceIntervalRef.current = null;
      }
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
      if (audioContextRef.current) {
        void audioContextRef.current.close();
        audioContextRef.current = null;
      }
      stopAudio();
    };
  }, [stopAudio]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleNativeSpeech = (event: Event) => {
      const detail = (event as CustomEvent<NativeSpeechEventDetail>).detail;
      if (!detail?.type) {
        return;
      }

      setListening(false);

      if (detail.type === 'error') {
        setSpeechError(detail.error?.trim() || UI_TEXT[langRef.current].transcriptionFailed);
        return;
      }

      const transcript = detail.text?.trim() || '';
      if (!transcript) {
        setSpeechError(UI_TEXT[langRef.current].noVoiceCaptured);
        return;
      }

      setSpeechError('');
      setInput(transcript);
      void sendMessage(transcript);
    };

    window.addEventListener('ecp-native-speech', handleNativeSpeech as EventListener);
    return () => window.removeEventListener('ecp-native-speech', handleNativeSpeech as EventListener);
  }, [sendMessage]);

  const startListening = useCallback(() => {
    setSpeechError('');

    const nativeSpeech = typeof window !== 'undefined' ? window.AndroidSpeech : undefined;
    const shouldUseNativeSpeech = /android/i.test(navigator.userAgent) && typeof nativeSpeech?.startListening === 'function';

    if (shouldUseNativeSpeech) {
      stopAudio();
      setListening(true);
      nativeSpeech.startListening(langRef.current === 'ur' ? 'ur-PK' : 'en-US');
      return;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || typeof MediaRecorder === 'undefined') {
      setSpeechError(UI_TEXT[langRef.current].unsupportedVoice);
      return;
    }

    stopAudio();

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        micStreamRef.current = stream;
        audioChunksRef.current = [];

        const isAndroid = /android/i.test(navigator.userAgent);
        const preferredTypes = isAndroid
          ? ['audio/mp4', 'audio/webm', 'audio/ogg']
          : ['audio/webm', 'audio/ogg', 'audio/mp4'];
        const mimeType = preferredTypes.find((type) => MediaRecorder.isTypeSupported(type));
        const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        recorder.onerror = () => {
          setSpeechError(UI_TEXT[langRef.current].micFailed);
          setListening(false);
        };

        recorder.onstop = async () => {
          setListening(false);
          setIsTranscribing(true);

          if (silenceIntervalRef.current) {
            clearInterval(silenceIntervalRef.current);
            silenceIntervalRef.current = null;
          }
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = null;
          }
          if (audioContextRef.current) {
            void audioContextRef.current.close();
            audioContextRef.current = null;
          }

          if (micStreamRef.current) {
            micStreamRef.current.getTracks().forEach((track) => track.stop());
            micStreamRef.current = null;
          }

          if (!audioChunksRef.current.length) {
            setSpeechError(UI_TEXT[langRef.current].noVoiceCaptured);
            setIsTranscribing(false);
            return;
          }

          try {
            const blobType = recorder.mimeType || 'audio/webm';
            const extension = blobType.includes('ogg') ? 'ogg' : blobType.includes('mp4') ? 'mp4' : 'webm';
            const audioBlob = new Blob(audioChunksRef.current, { type: blobType });

            const formData = new FormData();
            formData.append('file', audioBlob, `voice.${extension}`);

            const sttEndpoint = langRef.current === 'ur' ? '/api/stt-ur' : '/api/stt-en';
            const response = await fetch(sttEndpoint, {
              method: 'POST',
              body: formData,
            });

            const data = await response.json().catch(() => ({}));
            const transcript = typeof data?.text === 'string' ? data.text.trim() : '';

            if (!response.ok || !transcript) {
              setSpeechError(
                typeof data?.error === 'string' && data.error.trim()
                  ? data.error
                  : UI_TEXT[langRef.current].transcriptionFailed
              );
            } else {
              setSpeechError('');
              setInput(transcript);
              void sendMessage(transcript);
            }
          } catch {
            setSpeechError(UI_TEXT[langRef.current].voiceFailed);
          } finally {
            audioChunksRef.current = [];
            mediaRecorderRef.current = null;
            setIsTranscribing(false);
          }
        };

        mediaRecorderRef.current = recorder;
        setListening(true);
        recorder.start();

        try {
          const audioCtx = new AudioContext();
          audioContextRef.current = audioCtx;
          void audioCtx.resume();
          const source = audioCtx.createMediaStreamSource(stream);
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 512;
          source.connect(analyser);
          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          let hasSpeech = false;
          const silenceThreshold = 12;
          const silenceMs = 3000;

          silenceIntervalRef.current = setInterval(() => {
            if (mediaRecorderRef.current?.state !== 'recording') {
              if (silenceIntervalRef.current) clearInterval(silenceIntervalRef.current);
              return;
            }
            analyser.getByteTimeDomainData(dataArray);
            let sumSq = 0;
            for (let i = 0; i < dataArray.length; i++) {
              const normalized = (dataArray[i] - 128) / 128;
              sumSq += normalized * normalized;
            }
            const rms = Math.sqrt(sumSq / dataArray.length) * 100;

            if (rms > silenceThreshold) {
              hasSpeech = true;
              if (silenceTimerRef.current) {
                clearTimeout(silenceTimerRef.current);
                silenceTimerRef.current = null;
              }
            } else if (hasSpeech && !silenceTimerRef.current) {
              silenceTimerRef.current = setTimeout(() => {
                if (mediaRecorderRef.current?.state === 'recording') mediaRecorderRef.current.stop();
                if (silenceIntervalRef.current) clearInterval(silenceIntervalRef.current);
              }, silenceMs);
            }
          }, 200);
        } catch {
          // AudioContext unavailable; manual stop still works
        }
      })
      .catch((error: Error & { name?: string }) => {
        const code = error?.name || 'UnknownError';
        if (code === 'NotAllowedError' || code === 'PermissionDeniedError') {
          setSpeechError(UI_TEXT[langRef.current].micPermission);
        } else if (code === 'NotFoundError') {
          setSpeechError(UI_TEXT[langRef.current].noMic);
        } else {
          setSpeechError(UI_TEXT[langRef.current].micAccess);
        }
      });
  }, [sendMessage, stopAudio]);

  const stopListening = useCallback(() => {
    if (typeof window !== 'undefined' && window.AndroidSpeech?.stopListening && /android/i.test(navigator.userAgent)) {
      window.AndroidSpeech.stopListening();
      setListening(false);
      return;
    }

    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== 'inactive') {
      recorder.stop();
    } else {
      setListening(false);
    }
  }, []);

  return (
    <div
      className="h-[100dvh] w-full overflow-hidden bg-slate-950 md:min-h-[100dvh] md:h-auto md:bg-[radial-gradient(circle_at_top,_#d9f1e6_0%,_#e8f7ef_35%,_#f6fbf8_70%)] px-0 py-0 [padding-top:env(safe-area-inset-top)] [padding-bottom:env(safe-area-inset-bottom)] md:px-4 md:py-10"
      dir={lang === 'ur' ? 'rtl' : 'ltr'}
      style={urduPageStyle}
    >
      <div className="mx-auto h-full w-full max-w-4xl">
        {showCalendarModal ? (
          <div className="fixed inset-0 z-[121] flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
            <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/40">
              <button
                onClick={() => setShowCalendarModal(false)}
                className="absolute right-3 top-3 z-10 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white hover:bg-white/20"
              >
                {ui.close}
              </button>
              <div className="border-b border-white/10 px-6 py-4">
                <p className="text-xs uppercase tracking-[0.24em] text-emerald-200">{ui.calendarTitle}</p>
                <h3 className="mt-1 text-lg font-semibold text-white">{ui.calendarHeading}</h3>
                {calendarPdfUrl ? (
                  <a
                    href={calendarPdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block rounded-md border border-white/20 px-2.5 py-1 text-xs font-medium text-white/90 hover:bg-white/10"
                  >
                    {ui.openInNewTab}
                  </a>
                ) : null}
              </div>
              <div className="bg-white">
                {calendarPdfUrl ? (
                  <object data={`${calendarPdfUrl}#toolbar=1&navpanes=0`} type="application/pdf" className="h-[75vh] w-full">
                    <div className="grid h-[40vh] place-items-center px-6 text-center text-slate-700">
                      <p className="mb-3">{ui.pdfUnavailable}</p>
                      <a
                        href={calendarPdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                      >
                        {ui.openPdfNewTab}
                      </a>
                    </div>
                  </object>
                ) : (
                  <div className="grid h-[40vh] place-items-center px-6 text-center text-slate-700">
                    <p>{ui.setPdfUrl}</p>
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
                {ui.close}
              </button>
              <div className="border-b border-white/10 px-6 py-4">
                <p className="text-xs uppercase tracking-[0.24em] text-emerald-200">{ui.trainingMedia}</p>
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

        <div className="flex h-full min-h-0 flex-col rounded-none border-0 bg-[#07122b] p-3 shadow-none md:min-h-0 md:h-auto md:rounded-3xl md:border md:border-slate-200 md:bg-white md:p-6 md:shadow-sm md:dark:border-slate-800 md:dark:bg-slate-900">

          <div className="flex flex-wrap items-center justify-between gap-3" dir="ltr">
            <div className="flex items-center gap-3" dir="ltr">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl p-1 md:h-14 md:w-14 md:rounded-2xl">
                <img src={ECP_LOGO_URL} alt="Election Commission of Pakistan logo" className="h-9 w-9 object-contain md:h-12 md:w-12" loading="lazy" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-white md:text-2xl md:text-slate-900 md:dark:text-white">{ui.heading}</h1>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {ui.voiceEnginePrefix} {voiceMode === 'neural' ? ui.neuralVoice : ui.browserVoice}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2" dir="ltr">
              <button
                onClick={() => setAutoSpeak((v) => !v)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 md:px-3 md:text-sm"
              >
                {autoSpeak ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                {autoSpeak ? ui.voiceOn : ui.voiceOff}
              </button>
              <a
                href={lang === 'ur' ? '/ecp-trainer' : '/ecp-trainer-ur'}
                className="inline-flex items-center gap-1.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 px-2.5 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50 md:px-3 md:text-sm"
              >
                {ui.urduVersion}
              </a>
            </div>
          </div>

          <div className="mt-5 hidden flex-wrap gap-2 md:flex" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
            {(lang === 'ur' ? QUICK_TOPICS_UR : QUICK_TOPICS).map((topic) => (
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

          <div className="mt-3 grid grid-cols-2 gap-2 md:hidden" dir={lang === 'ur' ? 'rtl' : 'ltr'}>
            {(lang === 'ur' ? QUICK_TOPICS_UR : QUICK_TOPICS).slice(0, 4).map((topic) => (
              <button
                key={topic}
                onClick={() => {
                  setInput(topic);
                }}
                className="rounded-lg border border-slate-300/60 bg-slate-900/60 px-2 py-1.5 text-[11px] font-medium text-slate-100"
              >
                {topic}
              </button>
            ))}
          </div>

          <div className="mt-3 flex-1 min-h-0 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950 md:mt-5 md:h-[460px] md:flex-none md:p-4" dir={lang === 'ur' ? 'rtl' : 'ltr'} style={lang === 'ur' ? { fontFamily: "'Noto Nastaliq Urdu', 'Noto Sans', serif", fontSize: '1rem', lineHeight: '2.5' } : undefined}>
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
                    <p>{msg.id === 1 && lang === 'ur' ? START_MESSAGE_UR_TEXT : msg.text}</p>

                    {msg.role === 'assistant' && msg.id === 1 ? (
                      <div className="mt-2">
                        <a
                          href={calendarPdfUrl || '/ecp/ecp-training-calendar.pdf'}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200 dark:hover:bg-emerald-900/50"
                        >
                          {ui.openTrainingCalendar}
                        </a>
                      </div>
                    ) : null}

                    {msg.role === 'assistant' && msg.media ? (
                      <div className="mt-3 space-y-2">
                        {msg.media.images.length ? (
                          <div className="hidden gap-2 md:grid md:grid-cols-2">
                            {msg.media.images.map((item) => (
                              <button
                                key={item.title}
                                type="button"
                                onClick={() => setViewer({ kind: 'image', title: item.title, src: item.src })}
                                className="overflow-hidden rounded-xl border border-slate-200 bg-white text-left transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-950"
                              >
                                <img src={item.src} alt={item.title} className="w-full aspect-[4/3] object-cover" loading="lazy" />
                                <figcaption className="px-2 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300">
                                  {item.title}
                                </figcaption>
                              </button>
                            ))}
                          </div>
                        ) : null}

                        {msg.media.videos.length ? (
                          <div className="hidden gap-2 md:grid">
                            {msg.media.videos.map((item) => (
                              <button
                                key={item.title}
                                type="button"
                                onClick={() => setViewer({ kind: 'video', title: item.title, src: item.src })}
                                className="rounded-xl border border-slate-200 bg-white p-2 text-left transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-950"
                              >
                                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-900">
                                  <img
                                    src={`https://img.youtube.com/vi/${item.src.split('/embed/').pop()?.split('?')[0] ?? ''}/hqdefault.jpg`}
                                    alt={item.title}
                                    className="absolute inset-0 h-full w-full object-cover"
                                    loading="lazy"
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition hover:bg-black/20">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 shadow-lg">
                                      <PlayCircle className="h-6 w-6 text-white" />
                                    </div>
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
                    {ui.preparing}
                  </div>
                </div>
              ) : null}

              {listening ? (
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-emerald-600 px-4 py-2 text-sm text-white">
                    <p className="inline-flex items-center gap-2">
                      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-300 animate-pulse" />
                      {ui.recording}
                    </p>
                  </div>
                </div>
              ) : null}

              {isTranscribing ? (
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-emerald-600 px-4 py-2 text-sm text-white">
                    <p className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {ui.transcribing}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2 md:mt-4">
            <button
              onClick={listening ? stopListening : startListening}
              className={`flex h-11 w-11 items-center justify-center rounded-xl text-white ${
                listening ? 'bg-red-500 hover:bg-red-600' : 'bg-slate-700 hover:bg-slate-800'
              }`}
              aria-label={listening ? ui.stopVoice : ui.startVoice}
              disabled={isLoading || isTranscribing}
            >
              {listening ? <Square className="h-4 w-4" /> : <Mic className="h-5 w-5" />}
            </button>

            <input
              dir={lang === 'ur' ? 'rtl' : 'ltr'}
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
                  ? ui.recordingPlaceholder
                  : isTranscribing
                    ? ui.transcribingPlaceholder
                    : ui.inputPlaceholder
              }
              className="h-11 flex-1 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              maxLength={1000}
              disabled={isLoading || isTranscribing || listening}
            />

            <button
              onClick={() => void sendMessage()}
              disabled={!input.trim() || isLoading || isTranscribing || listening}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={ui.sendAria}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>

          {speechError ? <p className="mt-2 text-sm text-red-600">{speechError}</p> : null}
          {isTranscribing ? <p className="mt-2 text-sm text-emerald-600">{ui.transcribing}</p> : null}

          <p className="mt-2 hidden text-xs text-slate-500 dark:text-slate-400 md:block">
            {ui.tip}
          </p>
        </div>
      </div>
    </div>
  );
}
