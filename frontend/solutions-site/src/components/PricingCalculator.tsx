'use client';

import { useState, useMemo } from 'react';
import {
  SERVICES,
  COMPLEXITY,
  TIMELINES,
  ADDONS,
  computeEstimate,
  formatGBP,
  type ServiceType,
  type ComplexityType,
  type TimelineType,
  type AddonType,
} from '@/lib/pricing';
import {
  CheckCircle2,
  ArrowRight,
  Calculator,
  Info,
  Zap,
  Clock,
  Building2,
} from 'lucide-react';
import Link from 'next/link';

// ---------------------------------------------------------------------------
// Step indicator
// ---------------------------------------------------------------------------
function StepBadge({ num, label, active }: { num: number; label: string; active: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${active ? 'text-[#2563EB]' : 'text-muted-foreground'}`}>
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
          active ? 'bg-[#2563EB] text-white' : 'bg-muted text-muted-foreground'
        }`}
      >
        {num}
      </div>
      <span className="text-sm font-medium hidden sm:block">{label}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Selection card
// ---------------------------------------------------------------------------
function SelectCard({
  label,
  description,
  selected,
  onClick,
}: {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
        selected
          ? 'border-[#2563EB] bg-[#2563EB]/5'
          : 'border-border/60 bg-background hover:border-[#2563EB]/40 hover:bg-muted/40'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 h-4 w-4 shrink-0 rounded-full border-2 flex items-center justify-center ${
            selected ? 'border-[#2563EB] bg-[#2563EB]' : 'border-muted-foreground'
          }`}
        >
          {selected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
        </div>
        <div>
          <p className={`font-medium text-sm ${selected ? 'text-[#2563EB]' : 'text-foreground'}`}>{label}</p>
          {description && <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{description}</p>}
        </div>
      </div>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Checkbox card (for add-ons)
// ---------------------------------------------------------------------------
function CheckboxCard({
  label,
  costLabel,
  selected,
  onClick,
}: {
  label: string;
  costLabel: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
        selected
          ? 'border-[#2563EB] bg-[#2563EB]/5'
          : 'border-border/60 bg-background hover:border-[#2563EB]/40 hover:bg-muted/40'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 h-4 w-4 shrink-0 rounded flex items-center justify-center border-2 ${
            selected ? 'border-[#2563EB] bg-[#2563EB]' : 'border-muted-foreground'
          }`}
        >
          {selected && (
            <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 12 12">
              <path d="M1 6l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <div>
          <p className={`font-medium text-sm ${selected ? 'text-[#2563EB]' : 'text-foreground'}`}>{label}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{costLabel}</p>
        </div>
      </div>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export function PricingCalculator() {
  const [service, setService] = useState<ServiceType | null>(null);
  const [complexity, setComplexity] = useState<ComplexityType | null>(null);
  const [timeline, setTimeline] = useState<TimelineType>('standard');
  const [addons, setAddons] = useState<AddonType[]>([]);
  const [step, setStep] = useState(1);

  const estimate = useMemo(() => {
    if (!service || !complexity) return null;
    return computeEstimate(service, complexity, timeline, addons);
  }, [service, complexity, timeline, addons]);

  function toggleAddon(addon: AddonType) {
    setAddons((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon],
    );
  }

  function buildQuoteUrl() {
    if (!service || !complexity) return '/get-a-quote';
    const sLabel = SERVICES.find((s) => s.value === service)?.label ?? '';
    const params = new URLSearchParams({ service: sLabel });
    return `/get-a-quote?${params.toString()}`;
  }

  const timelineIcon = {
    standard: <Clock className="h-4 w-4" />,
    fast: <Zap className="h-4 w-4" />,
    asap: <Building2 className="h-4 w-4" />,
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step indicators */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
        {[
          { num: 1, label: 'Service type' },
          { num: 2, label: 'Complexity' },
          { num: 3, label: 'Timeline & Add-ons' },
          { num: 4, label: 'Estimate' },
        ].map((s, i) => (
          <div key={s.num} className="flex items-center gap-2">
            <StepBadge num={s.num} label={s.label} active={step >= s.num} />
            {i < 3 && <div className={`h-px w-4 sm:w-8 ${step > s.num ? 'bg-[#2563EB]' : 'bg-border'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Service */}
      {step >= 1 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-1">What are you looking to build?</h3>
          <p className="text-sm text-muted-foreground mb-4">Select the primary service type.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SERVICES.map((s) => (
              <SelectCard
                key={s.value}
                label={s.label}
                selected={service === s.value}
                onClick={() => {
                  setService(s.value as ServiceType);
                  if (step < 2) setStep(2);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Complexity */}
      {step >= 2 && service && (
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-1">How complex is your project?</h3>
          <p className="text-sm text-muted-foreground mb-4">Choose the option that best describes your requirements.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COMPLEXITY.map((c) => (
              <SelectCard
                key={c.value}
                label={c.label.split(' — ')[0]}
                description={c.label.split(' — ')[1]}
                selected={complexity === c.value}
                onClick={() => {
                  setComplexity(c.value as ComplexityType);
                  if (step < 3) setStep(3);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Timeline + Add-ons */}
      {step >= 3 && complexity && (
        <div className="mb-8 space-y-6">
          <div>
            <h3 className="text-lg font-bold mb-1">What is your timeline?</h3>
            <p className="text-sm text-muted-foreground mb-4">Faster timelines require additional resource allocation.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {TIMELINES.map((t) => (
                <SelectCard
                  key={t.value}
                  label={t.label.split(' (')[0]}
                  description={t.label.match(/\(([^)]+)\)/)?.[1]}
                  selected={timeline === t.value}
                  onClick={() => {
                    setTimeline(t.value as TimelineType);
                    setStep(4);
                  }}
                />
              ))}
            </div>
          </div>

          {step >= 4 && (
            <div>
              <h3 className="text-lg font-bold mb-1">Optional add-ons</h3>
              <p className="text-sm text-muted-foreground mb-4">Select any ongoing services or extras you need.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ADDONS.map((a) => (
                  <CheckboxCard
                    key={a.value}
                    label={a.label}
                    costLabel={
                      'monthlyCost' in a
                        ? `£${(a as { value: string; label: string; monthlyCost: number }).monthlyCost.toLocaleString()}/month`
                        : `£${(a as { value: string; label: string; oneOffCost: number }).oneOffCost.toLocaleString()} one-off`
                    }
                    selected={addons.includes(a.value as AddonType)}
                    onClick={() => toggleAddon(a.value as AddonType)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Result panel */}
      {estimate && step >= 4 && (
        <div className="rounded-2xl border-2 border-[#2563EB] bg-[#2563EB]/5 p-7">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB] text-white">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#2563EB] uppercase tracking-wide">Estimated Project Cost</p>
              <p className="text-3xl font-extrabold text-foreground">
                {formatGBP(estimate.low)} – {formatGBP(estimate.high)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {/* Breakdown */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Included in this build
              </p>
              <ul className="space-y-2">
                {estimate.breakdown.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[#2563EB] mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Timeline + add-ons */}
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Timeline</p>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span className="text-[#2563EB]">{timelineIcon[timeline]}</span>
                  {estimate.timelineLabel}
                </div>
              </div>
              {estimate.addOnCosts.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Add-ons</p>
                  <ul className="space-y-1.5">
                    {estimate.addOnCosts.map((a) => (
                      <li key={a.label} className="flex items-center justify-between text-sm gap-3">
                        <span className="text-muted-foreground">{a.label}</span>
                        <span className="font-medium text-foreground whitespace-nowrap">+ {a.cost}</span>
                      </li>
                    ))}
                  </ul>
                  {estimate.totalMonthly > 0 && (
                    <p className="text-xs text-muted-foreground mt-2">
                      + £{estimate.totalMonthly.toLocaleString()}/month ongoing
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex gap-3 bg-white/60 dark:bg-white/5 rounded-lg p-3 mb-5">
            <Info className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">{estimate.disclaimer}</p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={buildQuoteUrl()}
              className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold rounded-lg px-6 py-3 text-sm transition-colors"
            >
              Request a detailed quote <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => {
                setService(null);
                setComplexity(null);
                setTimeline('standard');
                setAddons([]);
                setStep(1);
              }}
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground hover:bg-muted rounded-lg px-6 py-3 text-sm transition-colors"
            >
              Reset calculator
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
