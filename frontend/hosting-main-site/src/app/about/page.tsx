import { CTASection } from '@/components/CTASection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About HostingOcean — UK Web Hosting Since 2014',
  description:
    'Learn about HostingOcean — a UK-based web hosting provider with over 10 years of experience serving businesses across the UK.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#0F172A] to-[#1e2d4a] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">
            About HostingOcean
          </h1>
          <p className="text-lg text-slate-300">
            UK-based web hosting built on a foundation of reliability, transparency and genuine customer care.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
          <h2>Our Story</h2>
          <p>
            HostingOcean was founded with a single purpose: to give UK businesses hosting that they can rely on, backed by support from people who actually know what they&rsquo;re talking about.
          </p>
          <p>
            Over the past decade we&rsquo;ve grown from a small managed hosting operation into a full-service provider offering shared hosting, VPS, dedicated servers and domain registration — all from UK-based infrastructure and supported by a UK-based team.
          </p>

          <h2>Our Values</h2>
          <ul>
            <li><strong>Transparency:</strong> Clear pricing, no hidden renewal fees, no lock-in contracts.</li>
            <li><strong>Reliability:</strong> 99.9% uptime SLA backed by Tier-3 UK data centres.</li>
            <li><strong>Support:</strong> Real humans, based in the UK, available 24 hours a day, 7 days a week.</li>
            <li><strong>Security:</strong> DDoS protection, free SSL, and daily automated backups on every plan.</li>
          </ul>

          <h2>UK-Based Infrastructure</h2>
          <p>
            Every server we operate is physically located in UK Tier-3 certified data centres. This means your data never leaves UK jurisdiction, making GDPR compliance straightforward for your business.
          </p>

          <h2>Solutions Partner</h2>
          <p>
            Beyond hosting, our sister brand{' '}
            <a href="https://solutions.hostingocean.co.uk" target="_blank" rel="noopener noreferrer">
              HostingOcean Solutions
            </a>{' '}
            offers custom software development, LMS platforms, AI chatbots, and automation services for businesses that need more than infrastructure.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-secondary/5 dark:bg-secondary/20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { value: '10+', label: 'Years in Business' },
              { value: '5,000+', label: 'Customers Served' },
              { value: '99.9%', label: 'Uptime SLA' },
              { value: '24/7', label: 'UK Support' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#2563EB] mb-2">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Ready to Host with Us?"
        subheading="Join thousands of UK businesses on infrastructure you can trust."
        primaryLabel="View Hosting Plans"
        primaryHref="/web-hosting"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
