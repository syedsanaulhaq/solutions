'use client';

import { useState, useTransition } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { trackNewsletterSignup } from '@/lib/analytics';

interface NewsletterSignupProps {
  source?: string;
  variant?: 'inline' | 'card';
  heading?: string;
  subheading?: string;
}

/**
 * NewsletterSignup — reusable email capture component.
 * Calls POST /api/newsletter and tracks the event.
 *
 * @param source   — analytics source label (e.g. 'footer', 'blog-sidebar')
 * @param variant  — 'card' renders a bordered box; 'inline' renders a flat row
 */
export function NewsletterSignup({
  source = 'unknown',
  variant = 'card',
  heading = 'Stay up to date',
  subheading = 'Technical guides, case studies, and product updates. No spam, unsubscribe any time.',
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);

    startTransition(async () => {
      try {
        const res = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim(), source }),
        });
        if (!res.ok) throw new Error('Subscription failed');
        trackNewsletterSignup(source);
        setSubmitted(true);
      } catch {
        setError('Something went wrong. Please try again.');
      }
    });
  }

  if (submitted) {
    return (
      <div className={variant === 'card' ? 'rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 p-6 text-center' : 'flex items-center gap-3'}>
        <CheckCircle2 className="h-6 w-6 text-emerald-500 mx-auto mb-2" />
        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
          You&apos;re subscribed — thank you!
        </p>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-sm">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
        />
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-1.5 bg-[#2563EB] hover:bg-[#1d4ed8] disabled:opacity-60 text-white font-semibold rounded-lg px-4 py-2 text-sm transition-colors whitespace-nowrap"
        >
          {isPending ? 'Subscribing…' : 'Subscribe'} <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </form>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
          <Mail className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm">{heading}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{subheading}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
        />
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-1.5 bg-[#2563EB] hover:bg-[#1d4ed8] disabled:opacity-60 text-white font-semibold rounded-lg px-5 py-2.5 text-sm transition-colors whitespace-nowrap"
        >
          {isPending ? 'Subscribing…' : 'Get updates'} <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </form>
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
      <p className="text-xs text-muted-foreground mt-3">
        No spam, ever. Unsubscribe in one click.
      </p>
    </div>
  );
}
