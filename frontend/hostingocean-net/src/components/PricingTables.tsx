import { HostingPlanCard } from '@/components/HostingPlanCard';
import { VPSPlanCard } from '@/components/VPSPlanCard';
import type { PlansData } from '@/lib/pricing';

interface PricingTablesProps {
  type: 'web' | 'vps' | 'dedicated';
  plans: PlansData;
}

export function PricingTables({ type, plans }: PricingTablesProps) {
  if (type === 'vps') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.vpsHosting.map((plan) => (
          <VPSPlanCard key={plan.id} {...plan} />
        ))}
      </div>
    );
  }

  if (type === 'dedicated') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.dedicatedServers.map((plan) => (
          <VPSPlanCard
            key={plan.id}
            name={plan.name}
            pricePKR={plan.pricePKR}
            priceGBP={plan.priceGBP}
            description={plan.description}
            specs={plan.specs}
            popular={plan.popular}
            whmcsId={plan.whmcsId}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.webHosting.map((plan) => (
        <HostingPlanCard key={plan.id} {...plan} />
      ))}
    </div>
  );
}

