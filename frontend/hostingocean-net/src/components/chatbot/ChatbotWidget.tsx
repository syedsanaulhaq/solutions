'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatPanel } from './ChatPanel';
import type { Message } from './MessageBubble';

interface ApiHistory {
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: 'assistant',
    text: "Assalam-o-Alaikum! I'm the HostingOcean.net AI Assistant. How can I help you today? I can answer questions about our hosting plans, domains, VPS, dedicated servers, or help you get started.",
  },
];

const ERROR_REPLY =
  "Sorry, I couldn't get a response right now. Please try again or contact us at info@hostingocean.net.";

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [unread, setUnread] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(2);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const addMessage = (role: Message['role'], text: string, error = false) => {
    setMessages((prev) => [...prev, { id: nextId.current++, role, text, error }]);
  };

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      addMessage('user', trimmed);
      setInput('');
      setIsLoading(true);

      const history: ApiHistory[] = messages
        .filter((m) => !m.error)
        .map((m) => ({ role: m.role, content: m.text }));

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmed, history }),
        });

        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        addMessage('assistant', data.reply || ERROR_REPLY);

        if (!open) setUnread((n) => n + 1);
      } catch {
        addMessage('assistant', ERROR_REPLY, true);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, open]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      <ChatPanel
        open={open}
        messages={messages}
        isLoading={isLoading}
        input={input}
        messagesEndRef={messagesEndRef}
        inputRef={inputRef}
        onClose={() => setOpen(false)}
        onInputChange={setInput}
        onSend={() => sendMessage(input)}
        onKeyDown={handleKeyDown}
        onSuggestion={(s) => sendMessage(s)}
      />

      {/* FAB */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className={cn(
          'fixed bottom-6 right-4 sm:right-6 z-[100]',
          'h-14 w-14 rounded-full shadow-lg shadow-black/30',
          'flex items-center justify-center transition-all duration-300',
          'bg-[#15803D] text-white hover:bg-[#166534]',
          open && 'rotate-90'
        )}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-6 w-6" />}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>
    </>
  );
}
