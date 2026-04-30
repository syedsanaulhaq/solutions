import { HostingPlanCard } from '@/components/HostingPlanCard';
import { VPSPlanCard } from '@/components/VPSPlanCard';
import plans from '@/data/hosting-plans.json';

interface PricingTablesProps {
  type: 'web' | 'vps' | 'dedicated';
}

export function PricingTables({ type }: PricingTablesProps) {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {plans.dedicatedServers.map((plan) => (
          <VPSPlanCard key={plan.id} name={plan.name} price={plan.price} description={plan.description} specs={plan.specs} popular={plan.popular} whmcsPid={plan.whmcsPid} />
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
