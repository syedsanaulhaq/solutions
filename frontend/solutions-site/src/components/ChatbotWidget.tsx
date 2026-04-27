'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  role: 'assistant' | 'user';
  text: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: 'assistant',
    text: "Hi! I'm the HostingOcean AI Assistant. How can I help you today? I can answer questions about our services, pricing, or help you get started with a project.",
  },
];

const AUTO_REPLIES: Record<string, string> = {
  lms: "We build fully custom LMS platforms — Moodle-based or bespoke — tailored for corporate training, e-learning businesses, and educational institutions. Would you like to know more or get a free quote?",
  chatbot: "Our AI chatbot development service covers RAG-based assistants, customer support bots, and internal knowledge tools. We integrate with your existing data. Want to discuss your use case?",
  price: "Our pricing depends on the project scope. We offer fixed-price proposals after a free scoping call. You can also check our Pricing page for indicative ranges. Want to get a quote?",
  pricing: "Our pricing depends on the project scope. We offer fixed-price proposals after a free scoping call. You can also check our Pricing page for indicative ranges. Want to get a quote?",
  cost: "Our pricing depends on the project scope. We offer fixed-price proposals after a free scoping call. You can also check our Pricing page for indicative ranges. Want to get a quote?",
  react: "We specialise in React and Next.js development — from marketing sites to complex SPAs and web apps. All our frontends are TypeScript-first and fully responsive.",
  node: "We build scalable Node.js REST and GraphQL APIs, including authentication, database design, and cloud deployment. What are you looking to build?",
  automation: "We automate workflows using tools like n8n, Zapier, or custom Node.js scripts — connecting your CRM, email, invoicing, and more. What processes would you like to automate?",
  quote: "You can get a free, no-obligation quote by clicking the 'Get a Free Quote' button in the navigation, or by visiting our Contact page. We respond within one business day.",
  contact: "You can reach us at info@solutions.hostingocean.co.uk or via the Contact page. We're based in the UK and respond within one business day.",
  hello: "Hello! Great to hear from you. What can I help you with today — services, pricing, or something else?",
  hi: "Hi there! What can I help you with today?",
  hey: "Hey! What can I help you with today?",
};

function getAutoReply(text: string): string {
  const lower = text.toLowerCase();
  for (const [key, reply] of Object.entries(AUTO_REPLIES)) {
    if (lower.includes(key)) return reply;
  }
  return "Thanks for your message! For a detailed answer, please visit our Contact page or email us at info@solutions.hostingocean.co.uk. We respond within one business day.";
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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

  function sendMessage() {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { id: nextId.current++, role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = getAutoReply(text);
      setMessages((prev) => [...prev, { id: nextId.current++, role: 'assistant', text: reply }]);
      setIsTyping(false);
      if (!open) setUnread((n) => n + 1);
    }, 900 + Math.random() * 600);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* Chat panel */}
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
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-4 py-3.5 border-b border-border bg-[#0F172A] rounded-t-2xl shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2563EB]">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-none">HostingOcean AI</p>
              <p className="text-xs text-slate-400 mt-0.5">Always here to help</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Minimise chat"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
          </div>
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
                  msg.role === 'assistant' ? 'bg-[#2563EB]' : 'bg-slate-600'
                )}
              >
                {msg.role === 'assistant' ? (
                  <Bot className="h-3.5 w-3.5" />
                ) : (
                  <User className="h-3.5 w-3.5" />
                )}
              </div>
              {/* Bubble */}
              <div
                className={cn(
                  'max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                  msg.role === 'assistant'
                    ? 'bg-muted text-foreground rounded-bl-sm'
                    : 'bg-[#2563EB] text-white rounded-br-sm'
                )}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
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

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
            {['Pricing', 'LMS Development', 'AI Chatbot', 'Get a Quote'].map((s) => (
              <button
                key={s}
                onClick={() => { setInput(s); setTimeout(() => inputRef.current?.focus(), 0); }}
                className="text-xs px-2.5 py-1 rounded-full border border-border bg-muted hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="flex items-center gap-2 p-3 border-t border-border shrink-0">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type a message…"
            className="flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2563EB] transition-shadow placeholder:text-muted-foreground"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className={cn(
              'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all',
              input.trim()
                ? 'bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow-md shadow-blue-500/30'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            )}
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* FAB toggle button */}
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
        <div className={cn('transition-all duration-300', open ? 'rotate-90 scale-90' : 'rotate-0 scale-100')}>
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </div>
        {/* Unread badge */}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unread}
          </span>
        )}
        {/* Pulse ring when closed */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-[#2563EB] animate-ping opacity-20" />
        )}
      </button>
    </>
  );
}
