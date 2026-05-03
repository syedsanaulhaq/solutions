import { HeroSection } from '@/sections/HeroSection';
import { PlansSection } from '@/sections/PlansSection';
import { FeaturesSection } from '@/sections/FeaturesSection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { CTASection } from '@/components/CTASection';
import { FAQSection } from '@/components/FAQSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HostingOcean — Reliable UK Web Hosting, VPS & Domains',
  description:
    'UK web hosting from £2.99/month. Free SSL, daily backups, cPanel, and 24/7 UK support. VPS, dedicated servers and domain registration also available.',
};

const homeFaqs = [
  {
    question: 'Where are your servers located?',
    answer:
      'All our servers are located in Tier-3 certified UK data centres, ensuring low latency for UK visitors and compliance with UK GDPR and data protection regulations.',
  },
  {
    question: 'Do I get a free domain with hosting?',
    answer:
      'Yes — all our web hosting plans include a free domain name for the first year. Choose from .co.uk, .uk, .com, and more.',
  },
  {
    question: 'Can I upgrade my plan later?',
    answer:
      'Absolutely. You can upgrade to any higher plan at any time from your client area. We apply a pro-rata adjustment, so you only pay the difference.',
  },
  {
    question: 'What control panel do you use?',
    answer:
      'We use the industry-standard cPanel for shared hosting, giving you full control over your websites, databases, email accounts, and more.',
  },
  {
    question: 'Do you offer a money-back guarantee?',
    answer:
      'Yes. We offer a 30-day money-back guarantee on all shared hosting plans. If you are not satisfied for any reason, contact our support team within 30 days for a full refund.',
  },
  {
    question: 'How do I migrate from another host?',
    answer:
      'We offer free website migration for all new customers on Business and Professional plans. Our team handles the full migration including files, databases and email — with zero downtime.',
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PlansSection />
      <FeaturesSection />
      <TestimonialsSection />
      <FAQSection items={homeFaqs} title="Common Questions" />
      <CTASection
        heading="Ready to Get Started?"
        subheading="Join thousands of UK businesses on hosting that just works. Plans from £2.99/month."
        primaryLabel="View All Plans"
        primaryHref="https://whmcs.hostingocean.co.uk/cart.php"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
