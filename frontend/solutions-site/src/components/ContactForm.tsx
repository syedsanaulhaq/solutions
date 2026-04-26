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
import { CheckCircle2 } from 'lucide-react';

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
      <div className="flex flex-col items-center text-center py-16 gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="text-2xl font-bold">Message received!</h3>
        <p className="text-muted-foreground max-w-sm">
          Thank you for reaching out. A member of our team will be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" name="name" placeholder="Jane Smith" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input id="email" name="email" type="email" placeholder="jane@company.com" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company / Organisation</Label>
        <Input id="company" name="company" placeholder="Acme Ltd" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="budget">Budget Range</Label>
        <Select name="budget">
          <SelectTrigger id="budget">
            <SelectValue placeholder="Select a budget range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="under-5k">Under £5,000</SelectItem>
            <SelectItem value="5k-15k">£5,000 – £15,000</SelectItem>
            <SelectItem value="15k-50k">£15,000 – £50,000</SelectItem>
            <SelectItem value="50k-plus">£50,000+</SelectItem>
            <SelectItem value="not-sure">Not sure yet</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="project">Project Details *</Label>
        <Textarea
          id="project"
          name="project"
          placeholder="Tell us about your project — what you need, your timeline, and any specific requirements..."
          className="min-h-[140px] resize-none"
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-[#2563EB] hover:bg-[#1d4ed8]"
        size="lg"
        disabled={loading}
      >
        {loading ? 'Sending…' : 'Send Message'}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By submitting this form you agree to our{' '}
        <a href="/privacy" className="underline underline-offset-2 hover:text-foreground">
          Privacy Policy
        </a>
        . We typically respond within one business day.
      </p>
    </form>
  );
}
