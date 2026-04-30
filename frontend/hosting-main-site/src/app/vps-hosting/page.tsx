import { VPSPlanCard } from '@/components/VPSPlanCard';
import { FeatureGrid } from '@/components/FeatureGrid';
import { FAQSection } from '@/components/FAQSection';
import { CTASection } from '@/components/CTASection';
import plans from '@/data/hosting-plans.json';
import { Cpu, Shield, Globe, Lock, Zap, Wrench } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VPS Hosting — UK Virtual Private Servers from £9.99/mo',
  description:
    'UK VPS hosting with full root access, SSD storage, Linux or Windows, and 24/7 support. Scale resources instantly with no hardware contracts.',
};

const vpsFeatures = [
  { icon: Cpu, title: 'Dedicated vCPU Cores', description: 'Guaranteed CPU allocation — no noisy neighbours.' },
  { icon: Zap, title: 'SSD NVMe Storage', description: 'High-speed NVMe storage for databases and I/O-intensive apps.' },
  { icon: Globe, title: 'Full Root Access', description: 'Complete control over your server environment via SSH.' },
  { icon: Lock, title: 'DDoS Protection', description: 'Enterprise-grade mitigation included at no extra cost.' },
  { icon: Shield, title: 'Daily Snapshots', description: 'Automated daily snapshots with 7-day retention.' },
  { icon: Wrench, title: 'Managed Option', description: 'Add fully managed support — OS updates, monitoring, patching.' },
];

const faqs = [
  { question: 'What operating systems are available?', answer: 'We offer Ubuntu LTS (20.04, 22.04), Debian, CentOS Stream, AlmaLinux, Rocky Linux and Windows Server 2019/2022.' },
  { question: 'Can I upgrade my VPS plan?', answer: 'Yes. You can upgrade CPU, RAM and storage at any time from your client area with minimal downtime during the resize operation.' },
  { question: 'Do I get a dedicated IP address?', answer: 'Every VPS plan includes one dedicated IPv4 address. Additional IPs are available for a small monthly fee.' },
  { question: 'Is managed support available?', answer: 'Yes. Our managed VPS add-on covers OS patching, security hardening, monitoring with alerts, and 24/7 proactive response.' },
  { question: 'What control panels can I install?', answer: 'Popular choices include cPanel/WHM, Plesk, DirectAdmin and Webmin. We can assist with installation on request.' },
];

export default function VPSHostingPage() {
  return (
    <>
      <section className="py-20 px-4 bg-gradient-to-b from-[#0F172A] to-[#1e2d4a] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10 text-[#38BDF8] text-xs font-semibold mb-6 uppercase tracking-wide">
            Virtual Private Servers
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">
            UK VPS Hosting from{' '}
            <span className="text-[#38BDF8]">£9.99/month</span>
          </h1>
          <p className="text-lg text-slate-300 mb-8">
            Dedicated resources, full root access, Linux or Windows — scale instantly as your business grows.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.vpsHosting.map((plan) => (
              <VPSPlanCard key={plan.id} {...plan} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-secondary/5 dark:bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-center mb-10">
            VPS Features
          </h2>
          <FeatureGrid features={vpsFeatures} columns={3} />
        </div>
      </section>

      <FAQSection items={faqs} title="VPS Hosting FAQ" />
      <CTASection
        heading="Ready to Scale Your Infrastructure?"
        subheading="VPS plans from £9.99/month. Deploy in minutes, scale as you grow."
        primaryLabel="Order a VPS"
        primaryHref="https://my.hostingocean.co.uk/cart.php"
        secondaryLabel="Talk to Sales"
        secondaryHref="/contact"
      />
    </>
  );
}
