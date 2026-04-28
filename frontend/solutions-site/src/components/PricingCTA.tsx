import Link from 'next/link';
import { Calculator, ArrowRight } from 'lucide-react';

/**
 * Inline CTA component for blog posts — nudges readers to try the pricing calculator
 * or get a quote. Server component (no client state needed).
 */
export function PricingCTA() {
  return (
    <div className="rounded-xl border border-[#2563EB]/20 bg-gradient-to-br from-[#2563EB]/5 to-[#38BDF8]/5 p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2563EB]/10">
          <Calculator className="h-5 w-5 text-[#2563EB]" aria-hidden="true" />
        </div>
        <div>
          <p className="font-semibold text-foreground dark:text-white mb-1">
            Estimate your project cost
          </p>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Use our interactive pricing calculator to get a ballpark figure for your project — no commitment required.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/pricing-calculator"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] hover:text-[#1d4ed8] transition-colors"
            >
              Open calculator <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/get-a-quote"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Get a detailed quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
