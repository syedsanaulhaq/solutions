import { CheckCircle2 } from 'lucide-react';

const reasons = [
  'Business-focused technical support',
  'Custom solutions, not one-size-fits-all',
  'Reliable infrastructure you can count on',
  'Clear, responsive communication',
  'Built for long-term growth',
];

const whoWeHelp = [
  'Businesses that need professional hosting',
  'Organisations that want a secure online presence',
  'Teams that need custom portals or internal systems',
  'Companies that need technical support they can actually rely on',
];

export function WhyChooseSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Why Choose */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Why Choose Hostingocean
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We&rsquo;re not just a hosting company. We&rsquo;re a technical partner that understands
              what businesses actually need.
            </p>
            <ul className="space-y-4">
              {reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#15803D] mt-0.5 shrink-0" />
                  <span className="text-base font-medium">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Who We Help */}
          <div className="bg-[#15803D]/5 dark:bg-[#15803D]/10 border border-[#15803D]/15 rounded-2xl p-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Who We Help
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We work with businesses that need real, practical solutions — not generic packages.
            </p>
            <ul className="space-y-4">
              {whoWeHelp.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#15803D] mt-0.5 shrink-0" />
                  <span className="text-base text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-8 border-t border-[#15803D]/15">
              <a
                href="/contact"
                className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold rounded-lg bg-[#15803D] text-white hover:bg-[#166534] transition-colors shadow-md shadow-[#15803D]/20"
              >
                Let&rsquo;s Talk About Your Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
