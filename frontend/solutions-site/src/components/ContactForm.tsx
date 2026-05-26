'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // TODO: replace with actual form submission (e.g., Resend, Formspree, or backend API)
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center py-16 gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-2">Message received</h3>
          <p className="text-muted-foreground max-w-sm leading-relaxed">
            Thank you for reaching out. A member of our team will review your brief and
            send a written proposal within one business day.
          </p>
        </div>
        <div className="mt-2 rounded-xl bg-muted/50 border border-border/60 px-6 py-4 text-sm text-muted-foreground max-w-sm text-left space-y-2">
          <p className="font-semibold text-foreground text-sm">What to expect:</p>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-[#2563EB] mt-0.5 shrink-0" /> A written proposal with scope and timeline</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-[#2563EB] mt-0.5 shrink-0" /> A fixed-price quote — no hourly surprises</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-[#2563EB] mt-0.5 shrink-0" /> No commitment required to receive it</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Row 1: name + email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="name">Full name <span className="text-rose-500">*</span></Label>
          <Input id="name" name="name" placeholder="Jane Smith" required autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Work email <span className="text-rose-500">*</span></Label>
          <Input id="email" name="email" type="email" placeholder="jane@company.com" required autoComplete="email" />
        </div>
      </div>

      {/* Row 2: company + phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="company">Company / Organisation</Label>
          <Input id="company" name="company" placeholder="Acme Ltd" autoComplete="organization" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone <span className="text-xs text-muted-foreground font-normal">(optional)</span></Label>
          <Input id="phone" name="phone" type="tel" placeholder="+44 7700 000000" autoComplete="tel" />
        </div>
      </div>

      {/* Row 3: service + budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="service">Service required <span className="text-rose-500">*</span></Label>
          <Select name="service" required>
            <SelectTrigger id="service">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lms">LMS Development</SelectItem>
              <SelectItem value="ai-chatbot">AI Chatbot Development</SelectItem>
              <SelectItem value="react">React / Next.js Development</SelectItem>
              <SelectItem value="node-api">Node.js API Development</SelectItem>
              <SelectItem value="automation">Automation &amp; Integrations</SelectItem>
              <SelectItem value="multiple">Multiple services</SelectItem>
              <SelectItem value="not-sure">Not sure yet</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget">Budget range</Label>
          <Select name="budget">
            <SelectTrigger id="budget">
              <SelectValue placeholder="Select a range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under-5k">Under $5,000</SelectItem>
              <SelectItem value="5k-15k">$5,000 – $15,000</SelectItem>
              <SelectItem value="15k-30k">$15,000 – $30,000</SelectItem>
              <SelectItem value="30k-50k">$30,000 – $50,000</SelectItem>
              <SelectItem value="50k-plus">$50,000+</SelectItem>
              <SelectItem value="not-sure">Not sure yet</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Row 4: timeline */}
      <div className="space-y-2">
        <Label htmlFor="timeline">Ideal start / deadline</Label>
        <Select name="timeline">
          <SelectTrigger id="timeline">
            <SelectValue placeholder="When do you need this?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asap">As soon as possible</SelectItem>
            <SelectItem value="1-month">Within 1 month</SelectItem>
            <SelectItem value="1-3-months">1–3 months</SelectItem>
            <SelectItem value="3-6-months">3–6 months</SelectItem>
            <SelectItem value="flexible">Flexible / no hard deadline</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Row 5: project brief */}
      <div className="space-y-2">
        <Label htmlFor="project">
          Project brief <span className="text-rose-500">*</span>
          <span className="text-xs text-muted-foreground font-normal ml-1">— the more detail, the better our proposal</span>
        </Label>
        <Textarea
          id="project"
          name="project"
          placeholder="Describe what you need — your users, what the system should do, any existing tech stack, and what success looks like. Even rough notes are fine."
          className="min-h-[160px] resize-none"
          required
        />
      </div>

      {/* Row 6: how did you hear */}
      <div className="space-y-2">
        <Label htmlFor="source">How did you hear about us? <span className="text-xs text-muted-foreground font-normal">(optional)</span></Label>
        <Select name="source">
          <SelectTrigger id="source">
            <SelectValue placeholder="Select one" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="google">Google search</SelectItem>
            <SelectItem value="linkedin">LinkedIn</SelectItem>
            <SelectItem value="referral">Referral from someone I know</SelectItem>
            <SelectItem value="hostingocean">HostingOcean hosting account</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-base h-12"
        size="lg"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Sending…
          </span>
        ) : (
          <span className="flex items-center gap-2">
            Send enquiry <ArrowRight className="h-4 w-4" />
          </span>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center leading-relaxed">
        By submitting this form you agree to our{' '}
        <a href="/privacy" className="underline underline-offset-2 hover:text-foreground">
          Privacy Policy
        </a>
        . We respond within one business day — no sales calls, no obligation.
      </p>
    </form>
  );
}
