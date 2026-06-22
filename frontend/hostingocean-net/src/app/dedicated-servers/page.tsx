import { PricingTables } from '@/components/PricingTables';
import { CTASection } from '@/components/CTASection';
import { getPlans } from '@/lib/pricing';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Dedicated Servers Pakistan — From Rs. 28,999/month',
  description:
    'Fully managed dedicated servers for Pakistani businesses. Maximum performance for high-traffic, mission-critical workloads. Starting from Rs. 28,999/month.',
  alternates: {
    canonical: 'https://hostingocean.net/dedicated-servers',
  },
};

export default async function DedicatedServersPage() {
  const plans = await getPlans();
  return (
    <>
      <section className="py-20 px-4 bg-gradient-to-b from-[#071a0b] to-[#0d2b14] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">
            Dedicated Servers
          </h1>
          <p className="text-lg text-green-100">
            Your own physical hardware — no sharing, no compromise. Fully managed dedicated servers for
            resource-intensive Pakistani businesses and enterprises.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-extrabold mb-3">Dedicated Server Plans</h2>
            <p className="text-muted-foreground">All plans include full management, 24/7 monitoring, and DDoS protection.</p>
          </div>
          <PricingTables type="dedicated" plans={plans} />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-extrabold text-center mb-10">What&rsquo;s Included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Full server management & monitoring',
              'Hardware replacement guarantee',
              'DDoS protection included',
              '24/7 Pakistan support',
              'Remote reboot & KVM access',
              'Custom OS installation',
              'Dedicated IP addresses',
              '99.9% uptime SLA',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2.5 p-4 rounded-lg border border-border bg-card">
                <span className="h-2 w-2 rounded-full bg-[#15803D] shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        dark
        heading="Need enterprise or custom hardware?"
        subheading="We can source custom server configurations to meet your exact specifications. Contact us for a tailored proposal."
        primaryLabel="Request a Custom Quote"
        primaryHref="/contact"
        secondaryLabel="View VPS Plans"
        secondaryHref="/vps-hosting"
      />
    </>
  );
}
