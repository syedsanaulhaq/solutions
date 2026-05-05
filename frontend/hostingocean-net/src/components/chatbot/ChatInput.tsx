'use client';

import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { RefObject } from 'react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  disabled: boolean;
  inputRef: RefObject<HTMLInputElement>;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  onKeyDown,
  disabled,
  inputRef,
}: ChatInputProps) {
  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="flex items-center gap-2 p-3 border-t border-border shrink-0">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        disabled={disabled}
        maxLength={1000}
        placeholder={disabled ? 'Waiting for response…' : 'Ask about hosting, domains, VPS…'}
        className="flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#15803D] transition-shadow placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Type a message"
      />
      <button
        onClick={onSend}
        disabled={!canSend}
        aria-label="Send message"
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all',
          canSend
            ? 'bg-[#15803D] text-white hover:bg-[#166534] shadow-md shadow-green-500/30'
            : 'bg-muted text-muted-foreground cursor-not-allowed'
        )}
      >
        <Send className="h-4 w-4" />
      </button>
    </div>
  );
}
