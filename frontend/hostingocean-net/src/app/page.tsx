import { HeroSection } from '@/sections/HeroSection';
import { PlansSection } from '@/sections/PlansSection';
import { FeaturesSection } from '@/sections/FeaturesSection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { CTASection } from '@/components/CTASection';
import { FAQSection } from '@/components/FAQSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HostingOcean.net — Pakistan Web Hosting, VPS & Domains',
  description:
    'Pakistan\'s most trusted web hosting from Rs. 999/month. Free SSL, daily backups, cPanel, and 24/7 Pakistan support. VPS, dedicated servers and .pk domain registration also available.',
};

const homeFaqs = [
  {
    question: 'Where are your servers located?',
    answer:
      'Our servers are hosted in high-availability data centres with low-latency routing optimised for Pakistani ISPs. This ensures fast loading times for visitors across Karachi, Lahore, Islamabad and all of Pakistan.',
  },
  {
    question: 'Do I get a free domain with hosting?',
    answer:
      'Yes — all our web hosting plans include a free .pk or .com.pk domain name for the first year. Choose from .pk, .com.pk, .net.pk, .org.pk and more.',
  },
  {
    question: 'Can I upgrade my plan later?',
    answer:
      'Absolutely. You can upgrade to any higher plan at any time. We apply a pro-rata adjustment, so you only pay the difference for the remaining billing period.',
  },
  {
    question: 'Do you offer a money-back guarantee?',
    answer:
      'Yes — we offer a 30-day money-back guarantee on all shared web hosting plans. If you\'re not satisfied, contact us within 30 days for a full refund.',
  },
  {
    question: 'Is your support available in Urdu?',
    answer:
      'Yes! Our support team can assist you in both English and Urdu. Reach us via ticket, live chat, email or WhatsApp — 24/7.',
  },
  {
    question: 'Can I host a WordPress website?',
    answer:
      'Yes — all our hosting plans include a 1-click WordPress installer via Softaculous. WordPress sites run beautifully on our SSD-powered hosting infrastructure.',
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PlansSection />
      <FeaturesSection />
      <TestimonialsSection />
      <FAQSection items={homeFaqs} />
      <CTASection
        dark
        heading="Ready to launch your Pakistani business online?"
        subheading="Join thousands of Pakistani businesses who trust HostingOcean.net for fast, reliable hosting."
        primaryLabel="Get Started Today"
        primaryHref="/web-hosting"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
