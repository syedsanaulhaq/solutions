import { cn } from '@/lib/utils';
import { Cpu, MemoryStick, HardDrive, Network, Globe } from 'lucide-react';

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
  price: number;
  description: string;
  specs: VPSSpecs;
  popular?: boolean;
  whmcsPid: number;
}

const WHMCS = process.env.NEXT_PUBLIC_WHMCS_URL || 'https://whmcs.hostingocean.co.uk';

const specIcons: Partial<Record<keyof VPSSpecs, React.ReactNode>> = {
  cpu: <Cpu className="h-3.5 w-3.5" />,
  ram: <MemoryStick className="h-3.5 w-3.5" />,
  storage: <HardDrive className="h-3.5 w-3.5" />,
  bandwidth: <Network className="h-3.5 w-3.5" />,
  os: <Globe className="h-3.5 w-3.5" />,
  ip: <Globe className="h-3.5 w-3.5" />,
};

export function VPSPlanCard({ name, price, description, specs, popular = false, whmcsPid }: VPSPlanCardProps) {
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
          Best Value
        </span>
      )}

      <div>
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-extrabold">£{price.toFixed(2)}</span>
        <span className="text-sm text-muted-foreground">/month</span>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {(Object.entries(specs) as [keyof VPSSpecs, string][]).map(([key, val]) => (
          <div key={key} className="flex items-center gap-2.5 text-sm">
            <span className="text-[#2563EB]">{specIcons[key]}</span>
            <span className="text-muted-foreground capitalize">{key}:</span>
            <span className="font-medium">{val}</span>
          </div>
        ))}
      </div>

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
        Order {name}
      </a>
    </div>
  );
}
