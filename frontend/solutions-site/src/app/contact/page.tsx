import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { Section } from '@/components/Section';
import { buildMetadata } from '@/lib/seo';
import { Mail, MapPin, Clock, Phone, FileText, MessageSquare, CheckCircle2 } from 'lucide-react';

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
    label: 'Business hours',
    value: 'Mon–Fri, 09:00–17:00 GMT',
    href: null,
  },
  {
    icon: <Phone className="h-5 w-5 text-[#2563EB]" />,
    label: 'Prefer to talk?',
    value: 'Request a call in your message',
    href: null,
  },
];

const services = [
  { label: 'LMS Development', href: '/lms-development' },
  { label: 'AI Chatbots', href: '/ai-chatbots' },
  { label: 'React Development', href: '/react-development' },
  { label: 'Node.js API Development', href: '/node-api-development' },
  { label: 'Automation & Integrations', href: '/automation' },
];

const steps = [
  {
    icon: <MessageSquare className="h-5 w-5 text-[#2563EB]" />,
    step: '01',
    title: 'You send your brief',
    description: 'Tell us what you need — even rough notes are fine. We read every submission carefully.',
  },
  {
    icon: <FileText className="h-5 w-5 text-[#2563EB]" />,
    step: '02',
    title: 'We send a proposal',
    description: 'Within one business day you receive a written proposal — scope, architecture, timeline, and a fixed price.',
  },
  {
    icon: <CheckCircle2 className="h-5 w-5 text-[#2563EB]" />,
    step: '03',
    title: 'We get to work',
    description: 'Once agreed, we kick off immediately. You have a dedicated point of contact throughout the project.',
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ── */}
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
            including architecture, timeline, and a fixed-price quote — within one business day.
          </p>
        </div>
      </div>

      {/* ── Contact section ── */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">

          {/* Sidebar */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-2">HostingOcean Solutions</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A UK-based software development company delivering custom LMS platforms,
                AI chatbots, React applications, Node.js APIs, and automation systems.
              </p>
            </div>

            {/* Contact details */}
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

            {/* No obligation callout */}
            <div className="rounded-xl bg-[#2563EB]/5 border border-[#2563EB]/20 p-5">
              <p className="text-sm font-semibold text-[#2563EB] mb-1">No obligation</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All enquiries are handled in confidence. We&apos;ll assess your requirements
                and send a detailed proposal — no commitment required.
              </p>
            </div>

            {/* Services links */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                What we do
              </p>
              <ul className="space-y-2">
                {services.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-[#2563EB] transition-colors"
                    >
                      → {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2 rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-1">Send us a message</h2>
            <p className="text-sm text-muted-foreground mb-6">
              The more detail you share, the more accurate our proposal will be.
            </p>
            <ContactForm />
          </div>
        </div>
      </Section>

      {/* ── What happens next ── */}
      <Section variant="muted" title="What happens next?" subtitle="Simple, transparent, no chasing required.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {steps.map((s) => (
            <div key={s.step} className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-extrabold text-[#2563EB]/20 leading-none">{s.step}</span>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2563EB]/10">
                  {s.icon}
                </div>
              </div>
              <h3 className="font-semibold mb-1.5">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
