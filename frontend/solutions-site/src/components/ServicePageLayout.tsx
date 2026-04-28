import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ServiceFAQ } from '@/components/ServiceFAQ';
import { PricingCTA } from '@/components/PricingCTA';
import { faqSchema } from '@/lib/schemas';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ServicePageLayoutProps {
  hero: {
    badge: string;
    title: string;
    titleAccent?: string;
    subtitle: string;
  };
  overview: string;
  features: Feature[];
  techStack: string[];
  faq?: FAQItem[];
  cta: {
    title: string;
    subtitle: string;
  };
}

export function ServicePageLayout({
  hero,
  overview,
  features,
  techStack,
  faq,
  cta,
}: ServicePageLayoutProps) {
  const faqJsonLd = faq && faq.length > 0 ? faqSchema(faq) : null;
  return (
    <>
      {/* FAQ JSON-LD */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Hero
        badge={hero.badge}
        title={hero.title}
        titleAccent={hero.titleAccent}
        subtitle={hero.subtitle}
        cta1={{ label: 'Get a Quote', href: '/contact' }}
        cta2={{ label: 'View All Services', href: '/services' }}
      />

      {/* Overview */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-muted-foreground leading-relaxed">{overview}</p>
        </div>
      </Section>

      {/* Features */}
      <Section title="What We Deliver" variant="muted">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex gap-3.5 p-5 rounded-xl bg-background border border-border/50 shadow-sm"
            >
              <CheckCircle2 className="h-5 w-5 text-[#2563EB] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Tech Stack */}
      <Section title="Technologies We Use" subtitle="We use modern, battle-tested tools to build your solution.">
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {techStack.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-sm px-4 py-2 rounded-lg font-medium"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </Section>

      {/* Pricing CTA */}
      <Section variant="muted">
        <div className="max-w-2xl mx-auto">
          <PricingCTA />
        </div>
      </Section>

      {/* FAQ */}
      {faq && faq.length > 0 && (
        <Section title="Frequently Asked Questions" variant="default">
          <ServiceFAQ items={faq} title="" />
        </Section>
      )}

      {/* CTA */}
      <Section variant="dark">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{cta.title}</h2>
          <p className="text-slate-300 mb-8 text-lg leading-relaxed">{cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-500/20"
              >
                Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-slate-600 text-white bg-transparent hover:bg-slate-700 hover:text-white"
              >
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
