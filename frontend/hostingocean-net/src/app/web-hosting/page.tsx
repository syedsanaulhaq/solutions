import { PricingTables } from '@/components/PricingTables';
import { CTASection } from '@/components/CTASection';
import { FAQSection } from '@/components/FAQSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Hosting Pakistan — From Rs. 999/month',
  description:
    'Affordable web hosting in Pakistan from Rs. 999/month. Free SSL, daily backups, cPanel, 1-click WordPress, and free .pk domain for the first year.',
};

const faqs = [
  {
    question: 'What is included with every hosting plan?',
    answer: 'Every plan includes a free SSL certificate, daily automated backups, cPanel control panel, 1-click WordPress installer, and 24/7 Pakistan support.',
  },
  {
    question: 'Do I get a free .pk domain?',
    answer: 'Yes — all web hosting plans include a free .pk or .com.pk domain name for the first year.',
  },
  {
    question: 'Can I host multiple websites?',
    answer: 'The Business and Professional plans support unlimited websites. The Starter plan supports one website.',
  },
  {
    question: 'What control panel do you use?',
    answer: 'We use cPanel — the industry standard control panel, making it easy to manage your hosting, emails, databases, and files.',
  },
];

export default function WebHostingPage() {
  return (
    <>
      <section className="py-20 px-4 bg-gradient-to-b from-[#071a0b] to-[#0d2b14] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">
            Web Hosting Pakistan
          </h1>
          <p className="text-lg text-green-100">
            Fast, reliable web hosting for Pakistani businesses. Free SSL, daily backups, cPanel and 24/7 support.
            Prices in PKR — no hidden charges.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <PricingTables type="web" />
        </div>
      </section>

      <FAQSection items={faqs} title="Web Hosting FAQ" />

      <CTASection
        heading="Not sure which plan is right for you?"
        subheading="Contact our team and we'll help you choose the perfect hosting plan for your needs."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Compare All Plans"
        secondaryHref="#"
      />
    </>
  );
}
