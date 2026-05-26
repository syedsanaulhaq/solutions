import { CheckCircle2, Clock, Zap, Building2, Info } from 'lucide-react';
import {
  SERVICES,
  COMPLEXITY,
  TIMELINES,
  computeEstimate,
  formatUSD,
  type ServiceType,
  type ComplexityType,
  type TimelineType,
  type AddonType,
} from '@/lib/pricing';

interface PricingBreakdownProps {
  service: ServiceType;
  complexity: ComplexityType;
  timeline?: TimelineType;
  addons?: AddonType[];
}

const timelineIcon: Record<TimelineType, React.ReactNode> = {
  standard: <Clock className="h-4 w-4" />,
  fast: <Zap className="h-4 w-4" />,
  asap: <Building2 className="h-4 w-4" />,
};

/**
 * PricingBreakdown — server component that renders a static estimate panel.
 * Useful for service pages, solutions pages, or any server-rendered context
 * where the selections are already known.
 */
export function PricingBreakdown({
  service,
  complexity,
  timeline = 'standard',
  addons = [],
}: PricingBreakdownProps) {
  const estimate = computeEstimate(service, complexity, timeline, addons);

  const serviceLabel = SERVICES.find((s) => s.value === service)?.label ?? service;
  const complexityLabel = COMPLEXITY.find((c) => c.value === complexity)?.label.split(' — ')[0] ?? complexity;
  const timelineLabel = TIMELINES.find((t) => t.value === timeline)?.label ?? timeline;

  return (
    <div className="rounded-2xl border border-[#2563EB]/30 bg-[#2563EB]/5 p-6">
      {/* Summary row */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold bg-[#2563EB] text-white rounded-full px-2.5 py-0.5">
          {serviceLabel}
        </span>
        <span className="text-xs font-medium bg-muted text-muted-foreground rounded-full px-2.5 py-0.5">
          {complexityLabel}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-medium bg-muted text-muted-foreground rounded-full px-2.5 py-0.5">
          {timelineIcon[timeline]}
          {timelineLabel}
        </span>
      </div>

      {/* Price range */}
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
        Estimated Project Cost
      </p>
      <p className="text-3xl font-extrabold text-foreground mb-5">
        {formatUSD(estimate.low)} &ndash; {formatUSD(estimate.high)}
      </p>

      {/* Breakdown */}
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
        Included
      </p>
      <ul className="space-y-2 mb-5">
        {estimate.breakdown.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm">
            <CheckCircle2 className="h-4 w-4 text-[#2563EB] mt-0.5 shrink-0" />
            <span className="text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>

      {/* Add-on costs */}
      {estimate.addOnCosts.length > 0 && (
        <>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Add-ons
          </p>
          <ul className="space-y-1.5 mb-5">
            {estimate.addOnCosts.map((a) => (
              <li key={a.label} className="flex items-center justify-between text-sm gap-3">
                <span className="text-muted-foreground">{a.label}</span>
                <span className="font-medium text-foreground whitespace-nowrap">+ {a.cost}</span>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Disclaimer */}
      <div className="flex gap-3 bg-white/50 dark:bg-white/5 rounded-lg p-3">
        <Info className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">{estimate.disclaimer}</p>
      </div>
    </div>
  );
}
