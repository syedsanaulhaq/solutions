'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HostingPlanCardProps {
  name: string;
  pricePKR: number;
  priceGBP: number;
  description: string;
  features: string[];
  popular?: boolean;
  billingCycle?: string;
  whmcsId?: number;
}

const WHMCS_URL = 'https://whmcs.hostingocean.net';

export function HostingPlanCard({
  name,
  pricePKR,
  priceGBP,
  description,
  features,
  popular = false,
  billingCycle = 'month',
  whmcsId,
}: HostingPlanCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl border p-6 flex flex-col gap-5 transition-all duration-200',
        popular
          ? 'border-[#15803D] bg-[#15803D]/5 shadow-lg shadow-[#15803D]/10 dark:bg-[#15803D]/10'
          : 'border-border bg-card hover:border-[#15803D]/50 hover:shadow-md'
      )}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-[#15803D] text-white shadow">
          Most Popular
        </span>
      )}

      <div>
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>

      <div className="flex flex-col gap-0.5">
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-semibold text-muted-foreground">Rs.</span>
          <span className="text-3xl font-extrabold">{pricePKR.toLocaleString('en-PK')}</span>
          <span className="text-sm text-muted-foreground">/{billingCycle}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          ≈ £{priceGBP.toFixed(2)}/{billingCycle}
        </div>
      </div>

      <ul className="flex-1 space-y-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <Check className="h-4 w-4 text-[#15803D] shrink-0 mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href={whmcsId ? `${WHMCS_URL}/cart.php?a=add&pid=${whmcsId}` : `${WHMCS_URL}/cart.php`}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'w-full text-center py-2.5 rounded-lg text-sm font-semibold transition-colors block',
          popular
            ? 'bg-[#15803D] text-white hover:bg-[#166534]'
            : 'border border-[#15803D] text-[#15803D] hover:bg-[#15803D] hover:text-white'
        )}
      >
        Order Now
      </a>
    </div>
  );
}
