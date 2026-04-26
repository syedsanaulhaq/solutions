import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { Section } from '@/components/Section';
import { buildMetadata } from '@/lib/seo';
import { Mail, MapPin, Clock, Phone } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us',
  description:
    'Get in touch with HostingOcean Solutions. Tell us about your project and receive a no-obligation proposal within one business day.',
  path: '/contact',
});

const contactDetails = [
  {
    icon: <Mail className="h-5 w-5 text-[#2563EB]" />,
    label: 'Email',
    value: 'info@solutions.hostingocean.co.uk',
    href: 'mailto:info@solutions.hostingocean.co.uk',
  },
  {
    icon: <MapPin className="h-5 w-5 text-[#2563EB]" />,
    label: 'Location',
    value: 'United Kingdom',
    href: null,
  },
  {
    icon: <Clock className="h-5 w-5 text-[#2563EB]" />,
    label: 'Response time',
    value: 'Within 1 business day',
    href: null,
  },
  {
    icon: <Phone className="h-5 w-5 text-[#2563EB]" />,
    label: 'Prefer to talk?',
    value: 'Request a call in your message',
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <div className="bg-gradient-to-br from-[#0F172A] to-slate-800 py-20 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#38BDF8] font-semibold text-sm uppercase tracking-wider mb-3">
            Get in touch
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
            Let&apos;s build something together
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Tell us about your project and we&apos;ll come back with a no-obligation proposal —
            including architecture, timeline, and fixed-price quote — within one business day.
          </p>
        </div>
      </div>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">

          {/* Contact details */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-2">HostingOcean Solutions</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A UK-registered software development company delivering custom LMS platforms,
                AI chatbots, React applications, and Node.js APIs.
              </p>
            </div>

            <div className="space-y-5">
              {contactDetails.map(({ icon, label, value, href }) => (
                <div key={label} className="flex gap-3.5">
                  <div className="mt-0.5 shrink-0">{icon}</div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium hover:text-[#2563EB] transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-[#2563EB]/5 border border-[#2563EB]/20 p-5">
              <p className="text-sm font-semibold text-[#2563EB] mb-1">No obligation</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All enquiries are handled in confidence. We&apos;ll assess your requirements
                and send a detailed proposal — no commitment required.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2 rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Send us a message</h2>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
