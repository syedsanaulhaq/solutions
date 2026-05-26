'use client';

import { useState, useEffect, useRef } from 'react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

/* ── Types ── */
interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
}

const services = [
  'LMS Development',
  'AI Chatbot Development',
  'React / Next.js Development',
  'Node.js API Development',
  'Automation & Integrations',
  'Other / Not Sure Yet',
];

const budgets = [
  'Under $800',
  '$800 – $2,500',
  '$2,500 – $8,000',
  '$8,000 – $15,000',
  '$15,000+',
  'Not Sure Yet',
];

/* ── QuoteForm (standalone, embeddable) ── */
export function QuoteForm({ className }: { className?: string }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // In production replace with a real API call / form service
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={cn('flex flex-col items-center justify-center gap-4 py-12 text-center', className)}>
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
          <CheckCircle2 className="h-8 w-8 text-emerald-500" />
        </div>
        <h3 className="text-xl font-bold">Thanks — we&apos;ll be in touch!</h3>
        <p className="text-muted-foreground max-w-xs text-sm">
          We aim to respond within one business day with a clear, no-obligation proposal.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-4', className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="qf-name">Full Name *</Label>
          <Input id="qf-name" name="name" placeholder="Jane Smith" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="qf-email">Work Email *</Label>
          <Input id="qf-email" name="email" type="email" placeholder="jane@company.com" required />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="qf-company">Company / Organisation</Label>
        <Input id="qf-company" name="company" placeholder="Acme Ltd" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="qf-service">Service Required *</Label>
        <select
          id="qf-service"
          name="service"
          required
          defaultValue=""
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="" disabled>Select a service…</option>
          {services.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="qf-details">Project Details *</Label>
        <Textarea
          id="qf-details"
          name="details"
          placeholder="Tell us what you're trying to build, your timeline, and any technical context that would help."
          rows={4}
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="qf-budget">Budget Range</Label>
        <select
          id="qf-budget"
          name="budget"
          defaultValue=""
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="" disabled>Select a budget range…</option>
          {budgets.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>
      <Button type="submit" className="w-full bg-[#2563EB] hover:bg-[#1d4ed8]">
        Send Enquiry <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        No commitment required. We respond within one business day.
      </p>
    </form>
  );
}

/* ── QuoteModal (dialog wrapper) ── */
export function QuoteModal({ open, onClose }: QuoteModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

      {/* Dialog */}
      <div className="relative w-full max-w-xl bg-background border border-border rounded-2xl shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] animate-slide-up">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">Get a Free Quote</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Tell us about your project — we&apos;ll respond within one business day.
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 shrink-0 p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <QuoteForm />
      </div>
    </div>
  );
}

/* ── QuoteButton (triggers modal via global event) ── */
export function QuoteButton({
  className,
  size = 'default',
  label = 'Get a Quote',
  variant = 'primary',
}: {
  className?: string;
  size?: 'default' | 'sm' | 'lg';
  label?: string;
  variant?: 'primary' | 'outline';
}) {
  function open() {
    window.dispatchEvent(new CustomEvent('open-quote-modal'));
  }
  return (
    <Button
      size={size}
      onClick={open}
      className={cn(
        variant === 'primary' && 'bg-[#2563EB] hover:bg-[#1d4ed8]',
        variant === 'outline' && 'border border-slate-600 text-white bg-transparent hover:bg-slate-700',
        className
      )}
    >
      {label} {variant === 'primary' && <ArrowRight className="ml-2 h-4 w-4" />}
    </Button>
  );
}
