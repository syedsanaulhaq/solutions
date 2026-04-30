'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatPanel } from './ChatPanel';
import type { Message } from './MessageBubble';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface ApiHistory {
  role: 'user' | 'assistant';
  content: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: 'assistant',
    text: "Hi! I'm the HostingOcean AI Assistant. How can I help you today? I can answer questions about our hosting plans, domains, VPS, dedicated servers, or help you get started.",
  },
];

const ERROR_REPLY =
  "Sorry, I couldn't get a response right now. Please try again or contact our support team at support@hostingocean.co.uk.";

// ---------------------------------------------------------------------------
// ChatbotWidget
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

  // Focus input and clear unread badge when panel opens
  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  // Auto-scroll to newest message
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

    // Build capped history for the API (exclude the new user message)
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
      <ChatPanel
        open={open}
        messages={messages}
        isLoading={isLoading}
        input={input}
        messagesEndRef={messagesEndRef}
        inputRef={inputRef}
        onClose={() => setOpen(false)}
        onInputChange={setInput}
        onSend={sendMessage}
        onKeyDown={handleKey}
        onSuggestion={handleSuggestion}
      />

      {/* ── Floating action button ── */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close AI chat assistant' : 'Open AI chat assistant'}
        className={cn(
          'fixed bottom-5 right-4 sm:right-6 z-[100]',
          'flex h-14 w-14 items-center justify-center rounded-full',
          'bg-[#2563EB] text-white shadow-lg shadow-blue-500/40',
          'transition-all duration-300 hover:bg-[#1d4ed8] hover:scale-110 active:scale-95',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2'
        )}
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
            {unread > 9 ? '9+' : unread}
          </span>
        )}

        {/* Pulse ring (shown when closed) */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-[#2563EB] animate-ping opacity-20 pointer-events-none" />
        )}
      </button>
    </>
  );
}
