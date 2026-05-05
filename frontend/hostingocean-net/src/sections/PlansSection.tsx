import Link from 'next/link';
import { HostingPlanCard } from '@/components/HostingPlanCard';
import plans from '@/data/hosting-plans.json';

export function PlansSection() {
  return (
    <section className="py-20 px-4" id="plans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Web Hosting Plans
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            All plans include a free SSL certificate, daily backups, and 24/7 support.
            Prices in Pakistani Rupees &mdash; no hidden fees, cancel any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {plans.webHosting.map((plan) => (
            <HostingPlanCard key={plan.id} {...plan} />
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link href="/vps-hosting" className="text-[#15803D] hover:underline font-medium">
            Looking for VPS hosting? &rarr;
          </Link>
          <Link href="/dedicated-servers" className="text-[#15803D] hover:underline font-medium">
            Need a dedicated server? &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
