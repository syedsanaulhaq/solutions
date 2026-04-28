'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, X, ArrowRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/lib/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  return (
    <div className={cn('flex gap-0.5', size === 'md' && 'gap-1')}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            size === 'sm' ? 'h-3.5 w-3.5' : 'h-5 w-5',
            star <= rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-muted text-muted-foreground/30',
          )}
        />
      ))}
    </div>
  );
}

export function TestimonialCard({ testimonial: t }: TestimonialCardProps) {
  const [open, setOpen] = useState(false);
  const PREVIEW_LENGTH = 180;
  const isLong = t.message.length > PREVIEW_LENGTH;
  const preview = isLong ? t.message.slice(0, PREVIEW_LENGTH).trimEnd() + '…' : t.message;

  return (
    <>
      {/* ── Card ── */}
      <div className="relative flex flex-col p-7 rounded-2xl border border-border/60 bg-background hover:shadow-lg transition-shadow duration-300 h-full">
        {/* Quote decoration */}
        <Quote className="h-8 w-8 text-[#2563EB]/15 mb-3 shrink-0" />

        {/* Stars */}
        <div className="mb-3">
          <StarRating rating={t.rating} />
        </div>

        {/* Message preview */}
        <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
          &ldquo;{preview}&rdquo;
        </p>

        {/* Read more */}
        {isLong && (
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] hover:underline mb-5 self-start"
          >
            Read more <ArrowRight className="h-3 w-3" />
          </button>
        )}

        {/* Divider */}
        <div className="pt-4 border-t border-border/50 mt-auto">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div
              className={cn(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white text-sm font-bold',
                t.avatarColour,
              )}
            >
              {t.avatar}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-none mb-0.5 truncate">{t.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {t.role} · {t.company}
              </p>
            </div>
          </div>

          {/* Case study link */}
          {t.projectSlug && (
            <Link
              href={`/portfolio/${t.projectSlug}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2563EB] hover:underline mt-3"
            >
              View case study <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>

      {/* ── Modal ── */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl border border-border bg-background p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Stars */}
            <div className="mb-4">
              <StarRating rating={t.rating} size="md" />
            </div>

            {/* Full message */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              &ldquo;{t.message}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-5 border-t border-border/50">
              <div
                className={cn(
                  'flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white text-sm font-bold',
                  t.avatarColour,
                )}
              >
                {t.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold leading-none mb-0.5">{t.name}</p>
                <p className="text-xs text-muted-foreground">
                  {t.role} · {t.company}
                </p>
              </div>
            </div>

            {/* Case study link */}
            {t.projectSlug && (
              <div className="mt-5">
                <Link
                  href={`/portfolio/${t.projectSlug}`}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:underline"
                >
                  View full case study <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
