'use client';

import { cn } from '@/lib/utils';
import { Check, Cpu, MemoryStick, HardDrive, Network, Globe } from 'lucide-react';

interface VPSSpecs {
  cpu: string;
  ram: string;
  storage: string;
  bandwidth: string;
  os?: string;
  ip?: string;
}

interface VPSPlanCardProps {
  name: string;
  pricePKR: number;
  priceGBP: number;
  description: string;
  specs: VPSSpecs;
  features?: string[];
  popular?: boolean;
}

const specIcons: Partial<Record<keyof VPSSpecs, React.ReactNode>> = {
  cpu: <Cpu className="h-3.5 w-3.5" />,
  ram: <MemoryStick className="h-3.5 w-3.5" />,
  storage: <HardDrive className="h-3.5 w-3.5" />,
  bandwidth: <Network className="h-3.5 w-3.5" />,
  os: <Globe className="h-3.5 w-3.5" />,
  ip: <Globe className="h-3.5 w-3.5" />,
};

// Specs keys that are shown with icons — rest goes to features list
const MAIN_SPEC_KEYS: (keyof VPSSpecs)[] = ['cpu', 'ram', 'storage', 'bandwidth'];

export function VPSPlanCard({ name, pricePKR, priceGBP, description, specs, features = [], popular = false }: VPSPlanCardProps) {
  // Features not already captured in the main specs (avoid duplication)
  const mainSpecValues = MAIN_SPEC_KEYS.map((k) => specs[k]).filter(Boolean);
  const extraFeatures = features.filter(
    (f) => !mainSpecValues.some((v) => v && f.toLowerCase().includes(v.toLowerCase().split(' ')[0]))
  );

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
          Best Value
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
          <span className="text-sm text-muted-foreground">/month</span>
        </div>
        <div className="text-xs text-muted-foreground">
          ≈ £{priceGBP.toFixed(2)}/month
        </div>
      </div>

      {/* Primary specs with icons */}
      <div className="grid grid-cols-1 gap-2">
        {MAIN_SPEC_KEYS.filter((k) => specs[k]).map((key) => (
          <div key={key} className="flex items-center gap-2.5 text-sm">
            <span className="text-[#15803D]">{specIcons[key]}</span>
            <span className="text-muted-foreground">{specs[key]}</span>
          </div>
        ))}
        {specs.os && (
          <div className="flex items-center gap-2.5 text-sm">
            <span className="text-[#15803D]">{specIcons.os}</span>
            <span className="text-muted-foreground">{specs.os}</span>
          </div>
        )}
        {specs.ip && (
          <div className="flex items-center gap-2.5 text-sm">
            <span className="text-[#15803D]">{specIcons.ip}</span>
            <span className="text-muted-foreground">{specs.ip}</span>
          </div>
        )}
      </div>

      {/* Additional features from WHMCS description */}
      {extraFeatures.length > 0 && (
        <ul className="space-y-1.5">
          {extraFeatures.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-[#15803D] shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{f}</span>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => window.dispatchEvent(new Event('open-register-modal'))}
        className={cn(
          'mt-auto w-full text-center py-2.5 rounded-lg text-sm font-semibold transition-colors',
          popular
            ? 'bg-[#15803D] text-white hover:bg-[#166534]'
            : 'border border-[#15803D] text-[#15803D] hover:bg-[#15803D] hover:text-white'
        )}
      >
        Order Now
      </button>
    </div>
  );
}

