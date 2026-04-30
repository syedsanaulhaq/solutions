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
    description: 'NVMe SSD drives deliver up to 10× faster read/write speeds than standard HDDs.',
  },
  {
    icon: Shield,
    title: 'Free SSL on Every Plan',
    description: "Let's Encrypt SSL certificates auto-renewed — every site secured by default.",
  },
  {
    icon: Headphones,
    title: '24/7 UK Support',
    description: 'Reach our UK-based team any time via ticket, live chat or phone.',
  },
  {
    icon: RefreshCcw,
    title: 'Daily Automated Backups',
    description: 'We back up your data every day, with 30-day retention. Restore with one click.',
  },
  {
    icon: Globe,
    title: 'UK Data Centres',
    description: 'All servers hosted in Tier-3 UK data centres for GDPR compliance and low latency.',
  },
  {
    icon: Lock,
    title: 'DDoS Protection',
    description: 'Enterprise-grade DDoS mitigation included on all plans at no extra cost.',
  },
  {
    icon: Server,
    title: '99.9% Uptime SLA',
    description: 'We guarantee 99.9% uptime. If we miss it, you get credit — automatically.',
  },
  {
    icon: BarChart3,
    title: 'cPanel Control Panel',
    description: 'Industry-leading cPanel makes managing your hosting intuitive and powerful.',
  },
  {
    icon: Wrench,
    title: 'Free Website Migration',
    description: 'Moving from another host? Our team migrates your site for free, with zero downtime.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-secondary/5 dark:bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Everything You Need to Succeed Online
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Industry-leading infrastructure, enterprise-grade security, and UK-based support — all included.
          </p>
        </div>
        <FeatureGrid features={features} columns={3} />
      </div>
    </section>
  );
}
