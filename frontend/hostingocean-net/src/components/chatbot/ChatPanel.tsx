'use client';

import { Bot, Minimize2, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import type { Message } from './MessageBubble';
import type { RefObject } from 'react';

const QUICK_ACTIONS = [
  { label: 'View Hosting Plans', href: '/web-hosting' },
  { label: 'Domain Registration', href: '/domain-registration' },
  { label: 'Get a Quote', href: '/contact' },
  { label: 'Check VPS Pricing', href: '/vps-hosting' },
] as const;

const SUGGESTIONS = [
  'View Hosting Plans',
  'VPS Pricing',
  'Free SSL Info',
  'Get a Quote',
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
      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-4 py-3.5 border-b border-border bg-[#071a0b] rounded-t-2xl shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#15803D]">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">HostingOcean Assistant</p>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              <p className="text-xs text-green-300">Online</p>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="h-7 w-7 inline-flex items-center justify-center rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <Minimize2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Quick actions */}
      <div className="flex gap-1.5 p-3 border-b border-border overflow-x-auto shrink-0">
        {QUICK_ACTIONS.map((a) => (
          <a
            key={a.label}
            href={a.href}
            className="inline-flex items-center gap-1 shrink-0 px-2.5 py-1 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-[#15803D]/50 transition-colors"
          >
            {a.label}
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}

        {isLoading && (
          <div className="flex items-end gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#15803D] text-white">
              <Bot className="h-3.5 w-3.5" />
            </div>
            <div className="bg-muted rounded-2xl rounded-bl-sm px-3.5 py-2.5">
              <span className="flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
              </span>
            </div>
          </div>
        )}

        {showSuggestions && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground text-center">Quick questions:</p>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => onSuggestion(s)}
                  className="px-2.5 py-1 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-[#15803D]/50 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
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
