import { FeatureGrid } from '@/components/FeatureGrid';
import {
  Shield,
  Zap,
  Headphones,
  RefreshCcw,
  Globe,
  Lock,
  Server,
  BarChart3,
  Wrench,
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning-Fast NVMe Storage',
    description: 'NVMe SSD drives deliver up to 10× faster read/write speeds — keep your Pakistani visitors happy.',
  },
  {
    icon: Shield,
    title: 'Free SSL on Every Plan',
    description: "Let's Encrypt SSL certificates auto-renewed — every site secured by default at no extra cost.",
  },
  {
    icon: Headphones,
    title: '24/7 Pakistan Support',
    description: 'Reach our expert team any time via ticket, live chat or WhatsApp — we speak your language.',
  },
  {
    icon: RefreshCcw,
    title: 'Daily Automated Backups',
    description: 'We back up your data every day with 30-day retention. Restore with one click when needed.',
  },
  {
    icon: Globe,
    title: 'Pakistan-Optimised Network',
    description: 'Low-latency routing optimised for Pakistani ISPs — fast loading for your local audience.',
  },
  {
    icon: Lock,
    title: 'DDoS Protection',
    description: 'Enterprise-grade DDoS mitigation included on all plans at no extra cost — always on.',
  },
  {
    icon: Server,
    title: '99.9% Uptime SLA',
    description: 'We guarantee 99.9% uptime. If we miss it, you get credit — automatically applied.',
  },
  {
    icon: BarChart3,
    title: 'cPanel Control Panel',
    description: 'Industry-leading cPanel makes managing your hosting intuitive and powerful. No learning curve.',
  },
  {
    icon: Wrench,
    title: 'Free Website Migration',
    description: 'Moving from another host? Our team migrates your site for free with zero downtime.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Everything You Need to Succeed Online
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Built for Pakistani businesses — from startups in Karachi to enterprises in Islamabad.
          </p>
        </div>
        <FeatureGrid features={features} columns={3} />
      </div>
    </section>
  );
}
