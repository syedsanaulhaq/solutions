import { PricingTables } from '@/components/PricingTables';
import { CTASection } from '@/components/CTASection';
import { FAQSection } from '@/components/FAQSection';
import { getPlans } from '@/lib/pricing';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'VPS Hosting Pakistan — From Rs. 5,499/month',
  description:
    'High-performance VPS hosting for Pakistani businesses. KVM-based, full root access, SSD storage. Starting from Rs. 5,499/month.',
};

const faqs = [
  {
    question: 'What is VPS hosting?',
    answer: 'VPS (Virtual Private Server) hosting gives you dedicated resources — CPU, RAM, and storage — on a shared physical server. It\'s faster and more customisable than shared hosting.',
  },
  {
    question: 'Do I get full root access?',
    answer: 'Yes — all our VPS plans come with full root access, so you can install any software, configure the server as you need, and have complete control.',
  },
  {
    question: 'Which operating systems are supported?',
    answer: 'We support all major Linux distributions (Ubuntu, CentOS, Debian, AlmaLinux) and Windows Server. You can choose your OS when ordering.',
  },
  {
    question: 'Is VPS hosting managed or unmanaged?',
    answer: 'Our standard VPS plans are unmanaged (you control the server). However, we offer managed add-ons if you need our team to handle server administration for you.',
  },
];

export default async function VPSHostingPage() {
  const plans = await getPlans();
  return (
    <>
      <section className="py-20 px-4 bg-gradient-to-b from-[#071a0b] to-[#0d2b14] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">
            VPS Hosting Pakistan
          </h1>
          <p className="text-lg text-green-100">
            Dedicated resources, full root access, and SSD storage. Ideal for growing apps, WooCommerce stores, and high-traffic sites.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <PricingTables type="vps" plans={plans} />
        </div>
      </section>

      <FAQSection items={faqs} title="VPS Hosting FAQ" />

      <CTASection
        heading="Need a custom VPS configuration?"
        subheading="We can build a custom VPS plan to fit your exact requirements. Contact us for a personalised quote."
        primaryLabel="Request a Custom Quote"
        primaryHref="/contact"
      />
    </>
  );
}
