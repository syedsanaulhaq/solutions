import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { Section } from '@/components/Section';
import { buildMetadata } from '@/lib/seo';
import {
  Mail, MapPin, Clock, MessageSquare, FileText,
  CheckCircle2, Shield, Users, Star, ArrowRight,
  BookOpen, Bot, Code2, Server, Workflow,
} from 'lucide-react';

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
    label: 'Based in',
    value: 'United Kingdom',
    href: null,
  },
  {
    icon: <Clock className="h-5 w-5 text-[#2563EB]" />,
    label: 'Office hours',
    value: 'Mon–Fri, 09:00–17:00 GMT',
    href: null,
  },
];

const services = [
  { icon: <BookOpen className="h-4 w-4" />, label: 'LMS Development', href: '/lms-development' },
  { icon: <Bot className="h-4 w-4" />, label: 'AI Chatbot Development', href: '/ai-chatbots' },
  { icon: <Code2 className="h-4 w-4" />, label: 'React / Next.js Development', href: '/react-development' },
  { icon: <Server className="h-4 w-4" />, label: 'Node.js API Development', href: '/node-api-development' },
  { icon: <Workflow className="h-4 w-4" />, label: 'Automation & Integrations', href: '/automation' },
];

const trustItems = [
  { icon: <Shield className="h-4 w-4 text-[#2563EB]" />, text: 'UK-registered company' },
  { icon: <Star className="h-4 w-4 text-[#2563EB]" />, text: '50+ projects delivered' },
  { icon: <Users className="h-4 w-4 text-[#2563EB]" />, text: 'Senior engineers only' },
  { icon: <CheckCircle2 className="h-4 w-4 text-[#2563EB]" />, text: 'No commitment required' },
];

const steps = [
  {
    icon: <MessageSquare className="h-5 w-5 text-[#2563EB]" />,
    step: '01',
    title: 'You send your brief',
    description: 'Tell us what you need — even rough notes are fine. The form takes 3 minutes. We read every submission carefully before responding.',
  },
  {
    icon: <FileText className="h-5 w-5 text-[#2563EB]" />,
    step: '02',
    title: 'We send a written proposal',
    description: 'Within one business day you receive a detailed proposal — scope, architecture approach, milestone timeline, and a fixed-price quote.',
  },
  {
    icon: <CheckCircle2 className="h-5 w-5 text-[#2563EB]" />,
    step: '03',
    title: 'We get to work',
    description: 'Once you are happy with the proposal and terms, we kick off. You have a dedicated point of contact from day one to go-live.',
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-slate-800 py-20 text-white text-center relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-[400px] w-[400px] rounded-full bg-[#2563EB]/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#38BDF8]/10 blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#38BDF8] font-semibold text-sm uppercase tracking-wider mb-3">
            Get in touch
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
            Let&apos;s build something together
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed max-w-xl mx-auto">
            Tell us about your project and we&apos;ll send back a no-obligation proposal —
            including scope, architecture, and a fixed-price quote — within one business day.
          </p>
        </div>
      </div>

      {/* ── Contact section ── */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-6xl mx-auto">

          {/* ── Sidebar ── */}
          <aside className="lg:col-span-2 space-y-7">

            {/* Company intro */}
            <div>
              <h2 className="text-lg font-bold mb-2">HostingOcean Solutions</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A UK-based software development company. We build custom LMS platforms,
                AI chatbots, React applications, Node.js APIs, and automation systems for
                businesses across education, enterprise, and technology.
              </p>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3">
              {trustItems.map(({ icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2.5 rounded-lg border border-border/60 bg-muted/30 px-3.5 py-3"
                >
                  <span className="shrink-0">{icon}</span>
                  <span className="text-xs font-medium leading-snug">{text}</span>
                </div>
              ))}
            </div>

            {/* Contact details */}
            <div className="space-y-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Contact details
              </p>
              {contactDetails.map(({ icon, label, value, href }) => (
                <div key={label} className="flex gap-3.5">
                  <div className="mt-0.5 shrink-0">{icon}</div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
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

            {/* Response time promise */}
            <div className="rounded-xl bg-[#2563EB]/5 border border-[#2563EB]/20 p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#2563EB] shrink-0" />
                <p className="text-sm font-semibold text-[#2563EB]">Response within 24 hours</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every enquiry is reviewed by a senior engineer — not a salesperson. You
                receive a genuine technical assessment of your project, not a templated reply.
              </p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB] mt-0.5 shrink-0" /> Written proposal with scope and timeline</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB] mt-0.5 shrink-0" /> Fixed-price quote — no hourly billing surprises</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-[#2563EB] mt-0.5 shrink-0" /> No commitment required to receive it</li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                What we build
              </p>
              <ul className="space-y-2">
                {services.map(({ icon, label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-[#2563EB] transition-colors group"
                    >
                      <span className="text-muted-foreground group-hover:text-[#2563EB] transition-colors">{icon}</span>
                      {label}
                      <ArrowRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* ── Contact form ── */}
          <div className="lg:col-span-3 rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-1">Send us your brief</h2>
            <p className="text-sm text-muted-foreground mb-7">
              The more detail you share, the more precise our proposal will be. Rough notes are fine.
            </p>
            <ContactForm />
          </div>
        </div>
      </Section>

      {/* ── What happens next ── */}
      <Section variant="muted" title="What happens next?" subtitle="A simple, transparent process. No chasing, no sales calls, no surprises.">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {steps.map((s) => (
            <div key={s.step} className="rounded-2xl border border-border/60 bg-background p-6 shadow-sm relative overflow-hidden">
              <span className="absolute -top-3 -right-2 text-6xl font-extrabold text-[#2563EB]/6 leading-none select-none">
                {s.step}
              </span>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2563EB]/10">
                  {s.icon}
                </div>
                <span className="text-xs font-bold text-[#2563EB] tracking-widest uppercase">Step {s.step}</span>
              </div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}


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
