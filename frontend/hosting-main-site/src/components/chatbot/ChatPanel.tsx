'use client';

import { Bot, Minimize2, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import type { Message } from './MessageBubble';
import type { RefObject } from 'react';

// ---------------------------------------------------------------------------
// Quick action links — direct WHMCS / internal navigation
// ---------------------------------------------------------------------------
const WHMCS = process.env.NEXT_PUBLIC_WHMCS_URL || 'https://my.hostingocean.co.uk';

const QUICK_ACTIONS = [
  { label: 'Login to Client Area', href: `${WHMCS}/clientarea.php` },
  { label: 'Open Support Ticket', href: `${WHMCS}/submitticket.php` },
  { label: 'Order Hosting', href: `${WHMCS}/cart.php` },
  { label: 'Check Domain Availability', href: '/domain-registration' },
] as const;

// ---------------------------------------------------------------------------
// Text suggestions — pre-fill the AI input
// ---------------------------------------------------------------------------
const SUGGESTIONS = [
  'View Hosting Plans',
  'VPS Pricing',
  'Free SSL Info',
  'Get Support',
];

interface ChatPanelProps {
  open: boolean;
  messages: Message[];
  isLoading: boolean;
  input: string;
  messagesEndRef: RefObject<HTMLDivElement>;
  inputRef: RefObject<HTMLInputElement>;
  onClose: () => void;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSuggestion: (text: string) => void;
}

export function ChatPanel({
  open,
  messages,
  isLoading,
  input,
  messagesEndRef,
  inputRef,
  onClose,
  onInputChange,
  onSend,
  onKeyDown,
  onSuggestion,
}: ChatPanelProps) {
  const showSuggestions = messages.length <= 1 && !isLoading;

  return (
    <div
      className={cn(
        'fixed bottom-24 right-4 sm:right-6 z-[99]',
        'w-[calc(100vw-2rem)] sm:w-96 max-h-[70vh]',
        'flex flex-col',
        'bg-background border border-border rounded-2xl shadow-2xl shadow-black/20',
        'transition-all duration-300 ease-in-out origin-bottom-right',
        open
          ? 'opacity-100 scale-100 pointer-events-auto'
          : 'opacity-0 scale-95 pointer-events-none'
      )}
      role="dialog"
      aria-label="HostingOcean AI Assistant chat"
      aria-hidden={!open}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-3 px-4 py-3.5 border-b border-border bg-[#0F172A] rounded-t-2xl shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2563EB]">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-none">
              HostingOcean AI Assistant
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              {isLoading ? 'Thinking…' : 'Always here to help'}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Minimise chat"
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <Minimize2 className="h-4 w-4" />
        </button>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* Typing indicator */}
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

      {/* ── Suggestions (shown before first user message) ── */}
      {showSuggestions && (
        <div className="px-4 pt-1 pb-2 flex flex-wrap gap-1.5 shrink-0">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => onSuggestion(s)}
              className="text-xs px-2.5 py-1 rounded-full border border-border bg-muted hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* ── Quick-action links (shown before first user message) ── */}
      {showSuggestions && (
        <div className="px-4 pb-3 shrink-0">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1.5 font-medium">
            Quick Actions
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {QUICK_ACTIONS.map(({ label, href }) => {
              const isExternal = href.startsWith('http');
              return (
                <a
                  key={label}
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="flex items-center justify-between gap-1.5 text-[11px] px-2.5 py-1.5 rounded-lg border border-[#2563EB]/30 bg-[#2563EB]/5 hover:bg-[#2563EB]/10 text-[#2563EB] dark:text-[#38BDF8] transition-colors font-medium"
                >
                  <span className="truncate">{label}</span>
                  <ExternalLink className="h-2.5 w-2.5 shrink-0 opacity-70" />
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Input row ── */}
      <ChatInput
        value={input}
        onChange={onInputChange}
        onSend={onSend}
        onKeyDown={onKeyDown}
        disabled={isLoading}
        inputRef={inputRef}
      />
    </div>
  );
}
