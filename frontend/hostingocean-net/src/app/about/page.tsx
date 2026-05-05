import { CTASection } from '@/components/CTASection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About HostingOcean.net — Pakistan Web Hosting Since 2014',
  description:
    'Learn about HostingOcean — a registered Pakistani web hosting business with over 10 years of experience serving businesses across Pakistan.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#071a0b] to-[#0d2b14] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">
            About HostingOcean.net
          </h1>
          <p className="text-lg text-green-100">
            Pakistan&rsquo;s trusted web hosting provider — built on reliability, transparency and genuine customer care.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
          <h2>Our Story</h2>
          <p>
            HostingOcean was founded with a single purpose: to give Pakistani businesses hosting they can rely on,
            backed by support from people who actually know what they&rsquo;re talking about.
          </p>
          <p>
            We started small, helping local businesses get online in Karachi and Lahore. Over time, our reputation for
            honest service, fair pricing in PKR, and genuine technical expertise helped us grow into one of Pakistan&rsquo;s
            most trusted hosting providers.
          </p>
          <p>
            Today we serve thousands of customers across Pakistan — from bloggers and freelancers to growing SMEs and
            enterprise-level clients. Every customer matters to us, regardless of the size of their plan.
          </p>

          <h2>Why Choose HostingOcean.net?</h2>
          <ul>
            <li><strong>Pakistani-first pricing</strong> — all plans billed in PKR with no hidden forex surprises</li>
            <li><strong>Local support</strong> — our team speaks English and Urdu, available 24/7</li>
            <li><strong>10+ years experience</strong> — we&rsquo;ve seen it all and built our infrastructure accordingly</li>
            <li><strong>Registered business</strong> — fully registered and operating legally in Pakistan</li>
            <li><strong>Transparent policies</strong> — clear terms, fair refunds, no surprise charges</li>
          </ul>

          <h2>Our Mission</h2>
          <p>
            To make professional web hosting accessible to every Pakistani business — from solo entrepreneurs
            in Multan to tech startups in Islamabad. We believe a great online presence should not cost a fortune,
            especially when you&rsquo;re paying in Pakistani Rupees.
          </p>

          <h2>Sister Company</h2>
          <p>
            HostingOcean.net is part of the HostingOcean group. Our UK partner,{' '}
            <a href="https://www.hostingocean.co.uk" target="_blank" rel="noopener noreferrer">
              HostingOcean.co.uk
            </a>
            , serves businesses in the United Kingdom with the same values and standards.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-extrabold text-center mb-10">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: 'Reliability', desc: 'We maintain 99.9% uptime and proactively monitor all services around the clock.' },
              { title: 'Transparency', desc: 'What you see is what you pay. No hidden fees, no surprise renewals, no excuses.' },
              { title: 'Community', desc: 'We invest in Pakistan\'s digital future — offering affordable hosting to help local businesses grow.' },
            ].map((v) => (
              <div key={v.title} className="p-6 rounded-xl border border-border bg-card text-center">
                <h3 className="font-bold mb-2 text-[#15803D]">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Ready to get started?"
        subheading="Join thousands of Pakistani businesses already hosting with us."
        primaryLabel="View Hosting Plans"
        primaryHref="/web-hosting"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
