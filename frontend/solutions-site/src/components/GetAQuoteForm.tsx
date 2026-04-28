'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  User,
  Briefcase,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const SERVICES = [
  'LMS Development',
  'AI Chatbot Development',
  'React / Next.js Development',
  'Node.js API Development',
  'Automation & Integrations',
  'Other / Not Sure Yet',
];

const BUDGETS = [
  'Under £5,000',
  '£5,000 – £15,000',
  '£15,000 – £30,000',
  '£30,000 – £60,000',
  '£60,000+',
  'Not Sure Yet',
];

const STEPS = [
  { id: 1, label: 'Your Details', icon: User },
  { id: 2, label: 'Project Info', icon: Briefcase },
  { id: 3, label: 'Description', icon: FileText },
];

// ---------------------------------------------------------------------------
// Form state
// ---------------------------------------------------------------------------
interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  description: string;
}

interface Errors {
  name?: string;
  email?: string;
  service?: string;
  budget?: string;
  description?: string;
}

const INITIAL: FormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  budget: '',
  description: '',
};

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------
function validateStep(step: number, data: FormData): Errors {
  const errors: Errors = {};
  if (step === 1) {
    if (!data.name.trim()) errors.name = 'Full name is required.';
    if (!data.email.trim()) errors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errors.email = 'Please enter a valid email address.';
  }
  if (step === 2) {
    if (!data.service) errors.service = 'Please select a service.';
    if (!data.budget) errors.budget = 'Please select a budget range.';
  }
  if (step === 3) {
    if (!data.description.trim()) errors.description = 'Please describe your project.';
    else if (data.description.trim().length < 20)
      errors.description = 'Please provide at least 20 characters.';
  }
  return errors;
}

// ---------------------------------------------------------------------------
// Step components
// ---------------------------------------------------------------------------
function Step1({
  data,
  errors,
  onChange,
}: {
  data: FormData;
  errors: Errors;
  onChange: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="gaq-name">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="gaq-name"
            value={data.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Jane Smith"
            className={cn(errors.name && 'border-red-500 focus-visible:ring-red-500')}
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="gaq-email">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="gaq-email"
            type="email"
            value={data.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="jane@company.com"
            className={cn(errors.email && 'border-red-500 focus-visible:ring-red-500')}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="gaq-phone">Phone Number</Label>
          <Input
            id="gaq-phone"
            type="tel"
            value={data.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="+44 7700 900000"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="gaq-company">Company / Organisation</Label>
          <Input
            id="gaq-company"
            value={data.company}
            onChange={(e) => onChange('company', e.target.value)}
            placeholder="Acme Ltd"
          />
        </div>
      </div>
    </div>
  );
}

function Step2({
  data,
  errors,
  onChange,
}: {
  data: FormData;
  errors: Errors;
  onChange: (field: keyof FormData, value: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="gaq-service">
          Service Required <span className="text-red-500">*</span>
        </Label>
        <select
          id="gaq-service"
          value={data.service}
          onChange={(e) => onChange('service', e.target.value)}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            errors.service && 'border-red-500 focus:ring-red-500'
          )}
        >
          <option value="" disabled>
            Select a service…
          </option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.service && <p className="text-xs text-red-500">{errors.service}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="gaq-budget">
          Budget Range <span className="text-red-500">*</span>
        </Label>
        <select
          id="gaq-budget"
          value={data.budget}
          onChange={(e) => onChange('budget', e.target.value)}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            errors.budget && 'border-red-500 focus:ring-red-500'
          )}
        >
          <option value="" disabled>
            Select a budget range…
          </option>
          {BUDGETS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        {errors.budget && <p className="text-xs text-red-500">{errors.budget}</p>}
      </div>
    </div>
  );
}

function Step3({
  data,
  errors,
  onChange,
}: {
  data: FormData;
  errors: Errors;
  onChange: (field: keyof FormData, value: string) => void;
}) {
  const charCount = data.description.length;
  return (
    <div className="space-y-1.5">
      <Label htmlFor="gaq-description">
        Project Description <span className="text-red-500">*</span>
      </Label>
      <Textarea
        id="gaq-description"
        value={data.description}
        onChange={(e) => onChange('description', e.target.value)}
        placeholder="Tell us what you're trying to build — your goals, timeline, any technical requirements, and the problem you're solving."
        rows={7}
        maxLength={2000}
        className={cn(
          'resize-none',
          errors.description && 'border-red-500 focus-visible:ring-red-500'
        )}
      />
      <div className="flex items-center justify-between">
        {errors.description ? (
          <p className="text-xs text-red-500">{errors.description}</p>
        ) : (
          <span />
        )}
        <span className="text-xs text-muted-foreground ml-auto">{charCount} / 2000</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Success screen
// ---------------------------------------------------------------------------
function SuccessScreen() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 ring-4 ring-emerald-500/20">
        <CheckCircle2 className="h-10 w-10 text-emerald-500" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Quote Request Submitted!</h2>
        <p className="text-muted-foreground max-w-sm">
          Thanks for reaching out. We&apos;ll review your project details and get back to you within one
          business day with a clear, no-obligation proposal.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
        <Link href="/services">
          <Button className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white">Explore Services</Button>
        </Link>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main multi-step form
// ---------------------------------------------------------------------------
export function GetAQuoteForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function onChange(field: keyof FormData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
    // Clear error on change
    if (errors[field as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleNext() {
    const errs = validateStep(step, data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep((s) => s + 1);
  }

  function handleBack() {
    setErrors({});
    setStep((s) => s - 1);
  }

  async function handleSubmit() {
    const errs = validateStep(3, data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'form' }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error ?? 'Submission failed');
      }

      setSuccess(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) return <SuccessScreen />;

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Step indicator */}
      <div className="flex items-center justify-between mb-8">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const isActive = step === s.id;
          const isDone = step > s.id;
          return (
            <div key={s.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors',
                    isDone
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : isActive
                      ? 'bg-[#2563EB] border-[#2563EB] text-white'
                      : 'border-muted-foreground/30 text-muted-foreground'
                  )}
                >
                  {isDone ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </div>
                <span
                  className={cn(
                    'text-xs font-medium whitespace-nowrap',
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-2 mb-5 rounded-full transition-colors',
                    isDone ? 'bg-emerald-500' : 'bg-muted-foreground/20'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB] mb-1">
            Step {step} of {STEPS.length}
          </p>
          <h2 className="text-xl font-bold">{STEPS[step - 1].label}</h2>
        </div>

        {step === 1 && <Step1 data={data} errors={errors} onChange={onChange} />}
        {step === 2 && <Step2 data={data} errors={errors} onChange={onChange} />}
        {step === 3 && <Step3 data={data} errors={errors} onChange={onChange} />}

        {submitError && (
          <p className="mt-4 text-sm text-red-500 bg-red-50 dark:bg-red-950/20 rounded-lg px-4 py-2.5">
            {submitError}
          </p>
        )}

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          {step > 1 ? (
            <Button variant="ghost" onClick={handleBack} disabled={submitting}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          ) : (
            <Link href="/">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </Link>
          )}

          {step < STEPS.length ? (
            <Button
              onClick={handleNext}
              className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white min-w-[140px]"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Submitting…
                </span>
              ) : (
                <>
                  Submit Request
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
