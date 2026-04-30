'use client';

import { Bot, User, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Message {
  id: number;
  role: 'assistant' | 'user';
  text: string;
  error?: boolean;
}

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={cn(
        'flex items-end gap-2',
        isAssistant ? 'flex-row' : 'flex-row-reverse'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white',
          isAssistant
            ? message.error
              ? 'bg-red-500'
              : 'bg-[#2563EB]'
            : 'bg-slate-500'
        )}
      >
        {isAssistant ? (
          message.error ? (
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
          'max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words',
          isAssistant
            ? message.error
              ? 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 rounded-bl-sm'
              : 'bg-muted text-foreground rounded-bl-sm'
            : 'bg-[#2563EB] text-white rounded-br-sm'
        )}
      >
        {message.text}
      </div>
    </div>
  );
}
