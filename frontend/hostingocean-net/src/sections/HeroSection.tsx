import { ArrowRight, Shield, Clock, MessageSquare } from 'lucide-react';

const stats = [
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '24/7', label: 'Responsive Support' },
  { value: '500+', label: 'Businesses Served' },
  { value: '10+', label: 'Years Experience' },
];

const trust = [
  { icon: Shield, label: 'Secure & reliable infrastructure' },
  { icon: Clock, label: 'Fast setup, zero hassle' },
  { icon: MessageSquare, label: 'Clear, responsive communication' },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#071a0b] via-[#0d2b14] to-[#071a0b] text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#15803D]/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#4ade80]/10 blur-3xl" />
        <div className="absolute top-1/2 right-8 -translate-y-1/2 w-64 h-64 rounded-full border border-white/5 opacity-30" />
        <div className="absolute top-1/2 right-16 -translate-y-1/2 w-48 h-48 rounded-full border border-white/5 opacity-20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#4ade80]/30 bg-[#4ade80]/10 text-[#4ade80] text-xs font-semibold mb-6 tracking-wide uppercase">
            Hosting &amp; Custom Web Systems for Businesses
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Reliable hosting and custom web systems for{' '}
            <span className="text-[#4ade80]">growing businesses.</span>
          </h1>
          <p className="text-lg sm:text-xl text-green-100 leading-relaxed mb-4">
            We help businesses in Pakistan and beyond with secure web hosting, web portals, and
            custom development solutions built for performance and long-term support.
          </p>
          <p className="text-base text-green-300 leading-relaxed mb-8">
            Fast setup. Responsive support. Practical technical solutions for businesses that need
            more than just hosting.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#15803D] text-white text-sm font-semibold rounded-lg hover:bg-[#166534] transition-colors shadow-lg shadow-[#15803D]/25"
            >
              Request a Free Consultation
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Get a Custom Quote
            </a>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 mb-14">
          {trust.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-green-200">
              <Icon className="h-4 w-4 text-[#4ade80]" />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-extrabold text-white">{value}</p>
              <p className="text-sm text-green-300 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
