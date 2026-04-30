import { HostingPlanCard } from '@/components/HostingPlanCard';
import { FeatureGrid } from '@/components/FeatureGrid';
import { FAQSection } from '@/components/FAQSection';
import { CTASection } from '@/components/CTASection';
import plans from '@/data/hosting-plans.json';
import { Shield, Zap, Headphones, RefreshCcw, Globe, Wrench } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Hosting Plans — UK Shared Hosting from £2.99/mo',
  description:
    'Affordable UK web hosting with free SSL, cPanel, daily backups and 24/7 support. Perfect for WordPress, WooCommerce and business websites.',
};

const webFeatures = [
  { icon: Zap, title: 'NVMe SSD Storage', description: 'Up to 10× faster than standard SSD, ensuring snappy load times.' },
  { icon: Shield, title: 'Free SSL Certificate', description: 'Auto-renewing Let's Encrypt SSL included on every plan.' },
  { icon: RefreshCcw, title: 'Daily Backups', description: '30-day backup history with one-click restore.' },
  { icon: Globe, title: 'UK Data Centres', description: 'GDPR-compliant Tier-3 UK infrastructure.' },
  { icon: Headphones, title: '24/7 UK Support', description: 'Real humans, based in the UK, always available.' },
  { icon: Wrench, title: 'Free Migration', description: 'We move your site across for free on Business & Pro plans.' },
];

const faqs = [
  { question: 'What CMS does the Starter plan support?', answer: 'All plans support WordPress, Joomla, Drupal and any PHP-based CMS via one-click installer in cPanel.' },
  { question: 'Is PHP version configurable?', answer: 'Yes — cPanel\'s MultiPHP Manager lets you set any PHP version from 7.4 to 8.3 per domain.' },
  { question: 'Can I host multiple websites?', answer: 'The Business and Professional plans support unlimited addon domains, letting you host multiple sites under one account.' },
  { question: 'How does the free domain work?', answer: 'You choose any eligible domain (.co.uk, .uk, .com, .net, .org) during signup and it is registered free for the first year. Standard renewal rates apply from year two.' },
  { question: 'Is there a monthly billing option?', answer: 'Yes. All plans are available monthly, quarterly, semi-annually or annually. Annual billing offers the best value.' },
];

export default function WebHostingPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#0F172A] to-[#1e2d4a] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10 text-[#38BDF8] text-xs font-semibold mb-6 uppercase tracking-wide">
            Shared Web Hosting
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">
            UK Web Hosting from{' '}
            <span className="text-[#38BDF8]">£2.99/month</span>
          </h1>
          <p className="text-lg text-slate-300 mb-8">
            cPanel hosting with free SSL, daily backups and 24/7 UK support.
            Perfect for personal sites, WordPress, and growing businesses.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.webHosting.map((plan) => (
              <HostingPlanCard key={plan.id} {...plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-secondary/5 dark:bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-center mb-10">
            What's Included on Every Plan
          </h2>
          <FeatureGrid features={webFeatures} columns={3} />
        </div>
      </section>

      <FAQSection items={faqs} title="Web Hosting FAQ" />
      <CTASection
        heading="Get Your Website Online Today"
        subheading="Join thousands of UK businesses. Plans from £2.99/month with a free domain."
        primaryLabel="Choose a Plan"
        primaryHref="https://my.hostingocean.co.uk/cart.php"
        secondaryLabel="Contact Sales"
        secondaryHref="/contact"
      />
    </>
  );
}
