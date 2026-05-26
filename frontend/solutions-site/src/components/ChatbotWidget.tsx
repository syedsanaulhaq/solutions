'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Message {
  id: number;
  role: 'assistant' | 'user';
  text: string;
  error?: boolean;
}

interface ApiHistory {
  role: 'user' | 'assistant';
  content: string;
}

// ---------------------------------------------------------------------------
// Quote-intent detection
// ---------------------------------------------------------------------------
const QUOTE_TRIGGERS = [
  'get a quote',
  'get quote',
  'request a quote',
  'pricing',
  'how much',
  'cost',
  'price',
  'start a project',
  'start project',
  'contact sales',
  'hire you',
  'work with you',
  'need a developer',
  'build for me',
];

function hasQuoteIntent(text: string): boolean {
  const lower = text.toLowerCase();
  return QUOTE_TRIGGERS.some((trigger) => lower.includes(trigger));
}

async function submitChatbotLead(message: string): Promise<void> {
  try {
    await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Chatbot Enquiry',
        email: 'chatbot@enquiry.internal',
        service: 'Not specified',
        budget: 'Not specified',
        description: message,
        source: 'chatbot',
      }),
    });
  } catch {
    // Fire-and-forget — never block the chat UX
  }
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: 'assistant',
    text: "Hi! I'm the HostingOcean AI Assistant. How can I help you today? I can answer questions about our services, pricing, or help you get started with a project.",
  },
];

const SUGGESTIONS = ['Pricing', 'LMS Development', 'AI Chatbot', 'Get a Quote'];

const ERROR_REPLY =
  "Sorry, I couldn't get a response right now. Please try again or contact us at info@hostingocean.net.";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(2);

  // Focus input and clear unread when panel opens
  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, open]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { id: nextId.current++, role: 'user', text };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    // Fire-and-forget lead capture for quote-intent messages
    if (hasQuoteIntent(text)) {
      submitChatbotLead(text);
    }

    // Build history for the API: all messages except the new user message, capped at 6
    const history: ApiHistory[] = updatedMessages
      .slice(0, -1)
      .slice(-6)
      .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.text }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });

      const data = await res.json();
      const reply: string = data?.reply || ERROR_REPLY;

      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, role: 'assistant', text: reply, error: !res.ok },
      ]);
      if (!open) setUnread((n) => n + 1);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, role: 'assistant', text: ERROR_REPLY, error: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, open]);

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function handleSuggestion(suggestion: string) {
    setInput(suggestion);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  return (
    <>
      {/* ── Chat panel ── */}
      <div
        className={cn(
          'fixed bottom-24 right-4 sm:right-6 z-[99] w-[calc(100vw-2rem)] sm:w-96 max-h-[70vh] flex flex-col',
          'bg-background border border-border rounded-2xl shadow-2xl shadow-black/20',
          'transition-all duration-300 ease-in-out origin-bottom-right',
          open
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        )}
        aria-hidden={!open}
        role="dialog"
        aria-label="HostingOcean AI chat"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-4 py-3.5 border-b border-border bg-[#0F172A] rounded-t-2xl shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2563EB]">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-none">HostingOcean AI</p>
              <p className="text-xs text-slate-400 mt-0.5">
                {isLoading ? 'Thinking…' : 'Always here to help'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Minimise chat"
          >
            <Minimize2 className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex items-end gap-2',
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              {/* Avatar */}
              <div
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white',
                  msg.role === 'assistant'
                    ? msg.error
                      ? 'bg-red-500'
                      : 'bg-[#2563EB]'
                    : 'bg-slate-600'
                )}
              >
                {msg.role === 'assistant' ? (
                  msg.error ? (
                    <AlertCircle className="h-3.5 w-3.5" />
                  ) : (
                    <Bot className="h-3.5 w-3.5" />
                  )
                ) : (
                  <User className="h-3.5 w-3.5" />
                )}
              </div>

              {/* Bubble */}
              <div
                className={cn(
                  'max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                  msg.role === 'assistant'
                    ? msg.error
                      ? 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 rounded-bl-sm'
                      : 'bg-muted text-foreground rounded-bl-sm'
                    : 'bg-[#2563EB] text-white rounded-br-sm'
                )}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing / loading indicator */}
          {isLoading && (
            <div className="flex items-end gap-2">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white">
                <Bot className="h-3.5 w-3.5" />
              </div>
              <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1 items-center h-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick-start suggestions — only shown before user sends a message */}
        {messages.length <= 1 && !isLoading && (
          <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSuggestion(s)}
                className="text-xs px-2.5 py-1 rounded-full border border-border bg-muted hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input row */}
        <div className="flex items-center gap-2 p-3 border-t border-border shrink-0">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={isLoading}
            maxLength={1000}
            placeholder={isLoading ? 'Waiting for response…' : 'Type a message…'}
            className="flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2563EB] transition-shadow placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all',
              input.trim() && !isLoading
                ? 'bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-md shadow-blue-500/30'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            )}
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Floating action button ── */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'fixed bottom-5 right-4 sm:right-6 z-[100]',
          'flex h-14 w-14 items-center justify-center rounded-full',
          'bg-[#2563EB] text-white shadow-lg shadow-blue-500/40',
          'transition-all duration-300 hover:bg-[#1d4ed8] hover:scale-110 active:scale-95',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2'
        )}
        aria-label={open ? 'Close chat' : 'Open chat assistant'}
      >
        <div
          className={cn(
            'transition-all duration-300',
            open ? 'rotate-90 scale-90' : 'rotate-0 scale-100'
          )}
        >
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </div>

        {/* Unread badge */}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unread}
          </span>
        )}

        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-[#2563EB] animate-ping opacity-20" />
        )}
      </button>
    </>
  );
}

