import { VPSPlanCard } from '@/components/VPSPlanCard';
import { FeatureGrid } from '@/components/FeatureGrid';
import { FAQSection } from '@/components/FAQSection';
import { CTASection } from '@/components/CTASection';
import plans from '@/data/hosting-plans.json';
import { Server, Shield, Globe, Zap, Network, Wrench } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dedicated Servers — UK Bare Metal from £79.99/mo',
  description:
    'UK dedicated servers with no shared resources. Full hardware ownership, unmetered bandwidth, RAID storage and 24/7 UK management.',
};

const dsFeatures = [
  { icon: Server, title: 'Dedicated Hardware', description: 'No virtualisation — 100% of the server resources are yours.' },
  { icon: Zap, title: 'High-Performance CPUs', description: 'Intel Xeon processors with ECC RAM for mission-critical workloads.' },
  { icon: Network, title: 'Unmetered Bandwidth', description: '100 Mbps or 1 Gbps uplink with truly unmetered traffic.' },
  { icon: Globe, title: 'Multiple IP Addresses', description: 'Dedicated IPs included; additional IPs available on request.' },
  { icon: Shield, title: 'RAID Storage', description: 'Hardware RAID 1 or RAID 10 for data redundancy and durability.' },
  { icon: Wrench, title: 'Fully Managed', description: 'OS updates, monitoring, 24/7 proactive support included.' },
];

const faqs = [
  { question: 'How long does provisioning take?', answer: 'Standard dedicated servers are provisioned within 24–72 hours. Custom configurations may take slightly longer.' },
  { question: 'Can I choose my operating system?', answer: 'Yes. We support all major Linux distributions and Windows Server. Custom OS installations are available on request.' },
  { question: 'What does "unmetered bandwidth" mean?', answer: 'You can use as much data transfer as you need on your allocated port speed (100 Mbps or 1 Gbps) without incurring extra bandwidth charges.' },
  { question: 'Do you offer IPMI/KVM access?', answer: 'Yes. IPMI/KVM over IP is available on all dedicated server plans for out-of-band management and remote OS reinstalls.' },
  { question: 'Can I order a custom spec server?', answer: 'Absolutely. Contact our sales team and we will configure a server to your exact specifications.' },
];

export default function DedicatedServersPage() {
  return (
    <>
      <section className="py-20 px-4 bg-gradient-to-b from-[#0F172A] to-[#1e2d4a] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10 text-[#38BDF8] text-xs font-semibold mb-6 uppercase tracking-wide">
            Bare Metal Dedicated Servers
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">
            Dedicated Servers from{' '}
            <span className="text-[#38BDF8]">£79.99/month</span>
          </h1>
          <p className="text-lg text-slate-300 mb-8">
            Complete hardware isolation, unmetered bandwidth, and fully managed UK support.
            Built for enterprises, agencies, and high-traffic applications.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {plans.dedicatedServers.map((plan) => (
              <VPSPlanCard
                key={plan.id}
                name={plan.name}
                price={plan.price}
                description={plan.description}
                specs={plan.specs}
                popular={plan.popular}
                whmcsPid={plan.whmcsPid}
              />
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Need a custom spec?{' '}
            <a href="/contact" className="text-[#2563EB] hover:underline font-medium">
              Contact our sales team
            </a>{' '}
            for a tailored quote.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-secondary/5 dark:bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-center mb-10">
            Dedicated Server Features
          </h2>
          <FeatureGrid features={dsFeatures} columns={3} />
        </div>
      </section>

      <FAQSection items={faqs} title="Dedicated Server FAQ" />
      <CTASection
        heading="Need Maximum Power?"
        subheading="Talk to our team about the right dedicated server for your business."
        primaryLabel="Order a Dedicated Server"
        primaryHref="https://my.hostingocean.co.uk/cart.php"
        secondaryLabel="Request Custom Quote"
        secondaryHref="/contact"
      />
    </>
  );
}
