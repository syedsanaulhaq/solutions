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
}

const specIcons: Partial<Record<keyof VPSSpecs, React.ReactNode>> = {
  cpu: <Cpu className="h-3.5 w-3.5" />,
  ram: <MemoryStick className="h-3.5 w-3.5" />,
  storage: <HardDrive className="h-3.5 w-3.5" />,
  bandwidth: <Network className="h-3.5 w-3.5" />,
  os: <Globe className="h-3.5 w-3.5" />,
  ip: <Globe className="h-3.5 w-3.5" />,
};

export function VPSPlanCard({ name, price, description, specs, popular = false }: VPSPlanCardProps) {
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

      <div className="flex items-baseline gap-1">
        <span className="text-sm font-semibold text-muted-foreground">Rs.</span>
        <span className="text-3xl font-extrabold">{price.toLocaleString('en-PK')}</span>
        <span className="text-sm text-muted-foreground">/month</span>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {(Object.entries(specs) as [keyof VPSSpecs, string][]).map(([key, val]) => (
          <div key={key} className="flex items-center gap-2.5 text-sm">
            <span className="text-[#15803D]">{specIcons[key]}</span>
            <span className="text-muted-foreground">{val}</span>
          </div>
        ))}
      </div>

      <a
        href={`/contact?plan=${encodeURIComponent(name)}`}
        className={cn(
          'mt-auto w-full text-center py-2.5 rounded-lg text-sm font-semibold transition-colors',
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
