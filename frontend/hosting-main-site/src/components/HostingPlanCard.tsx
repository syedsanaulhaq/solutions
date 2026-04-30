import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HostingPlanCardProps {
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  whmcsPid: number;
  billingCycle?: string;
}

const WHMCS = process.env.NEXT_PUBLIC_WHMCS_URL || 'https://my.hostingocean.co.uk';

export function HostingPlanCard({
  name,
  price,
  description,
  features,
  popular = false,
  whmcsPid,
  billingCycle = 'month',
}: HostingPlanCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl border p-6 flex flex-col gap-5 transition-all duration-200',
        popular
          ? 'border-[#2563EB] bg-[#2563EB]/5 shadow-lg shadow-[#2563EB]/10 dark:bg-[#2563EB]/10'
          : 'border-border bg-card hover:border-[#2563EB]/50 hover:shadow-md'
      )}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-[#2563EB] text-white shadow">
          Most Popular
        </span>
      )}

      <div>
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-extrabold">£{price.toFixed(2)}</span>
        <span className="text-sm text-muted-foreground">/{billingCycle}</span>
      </div>

      <ul className="flex-1 space-y-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <Check className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href={`${WHMCS}/cart.php?a=add&pid=${whmcsPid}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'mt-2 w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors',
          popular
            ? 'bg-[#2563EB] text-white hover:bg-[#1d4ed8] shadow'
            : 'border border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white'
        )}
      >
        Get {name}
      </a>
    </div>
  );
}
