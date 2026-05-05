'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
}

export function FAQSection({ items, title = 'Frequently Asked Questions' }: FAQSectionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {title && (
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-center mb-10">
            {title}
          </h2>
        )}
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium hover:bg-accent transition-colors gap-4"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200', open === i && 'rotate-180')}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
