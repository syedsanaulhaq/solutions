import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { Section } from '@/components/Section';
import { PricingCalculator } from '@/components/PricingCalculator';
import { ArrowRight, Calculator, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = buildMetadata({
  title: 'Pricing Calculator',
  description:
    'Estimate the cost of your custom software project instantly. Configure your service type, complexity, timeline, and add-ons to get a ballpark figure.',
  keywords: ['pricing calculator', 'software cost estimate', 'project budget', 'web development cost UK'],
  path: '/pricing-calculator',
});

const NOTES = [
  'All estimates are ballpark figures based on similar past projects.',
  'Final pricing is agreed after a scoping call and written brief.',
  'VAT is not included in any displayed figures.',
  'We do not require up-front payment — typically milestone-based.',
];

export default function PricingCalculatorPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-slate-800 text-white py-20 md:py-28">
        <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#2563EB]/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#38BDF8]/10 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 text-sm font-medium text-[#93C5FD]">
            <Calculator className="h-4 w-4" />
            Pricing Calculator
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Estimate your{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#38BDF8]">
              project cost
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            Answer a few questions about your project and get a ballpark cost estimate in seconds.
            No email required — just a starting point for the conversation.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
            {['No sign-up required', 'Instant estimate', 'Senior engineers'].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#38BDF8]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <Section>
        <PricingCalculator />
      </Section>

      {/* Important notes */}
      <Section variant="muted">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-4">Important notes about these estimates</h2>
          <ul className="text-left space-y-3 mb-8">
            {NOTES.map((note) => (
              <li key={note} className="flex items-start gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-[#2563EB] mt-0.5 shrink-0" />
                {note}
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground mb-6">
            Need a more precise quote? Submit a brief through our quote form and we will get back
            to you within one business day.
          </p>
          <Link
            href="/get-a-quote"
            className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors"
          >
            Request a detailed quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}
