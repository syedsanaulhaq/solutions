import { DomainSearchBar } from '@/components/DomainSearchBar';
import { ArrowRight, Shield, Server, Headphones } from 'lucide-react';

const WHMCS = process.env.NEXT_PUBLIC_WHMCS_URL || 'https://whmcs.hostingocean.co.uk';

const stats = [
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '24/7', label: 'UK Support' },
  { value: '5,000+', label: 'Customers' },
  { value: '10+', label: 'Years Experience' },
];

const trust = [
  { icon: Shield, label: 'Free SSL on all plans' },
  { icon: Server, label: 'UK-based data centres' },
  { icon: Headphones, label: '24/7 expert support' },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1e2d4a] to-[#0F172A] text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#2563EB]/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#38BDF8]/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10 text-[#38BDF8] text-xs font-semibold mb-6 tracking-wide uppercase">
            UK-Based Hosting &mdash; Built for Performance
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Hosting that&nbsp;
            <span className="text-[#38BDF8]">just works.</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8">
            Fast, reliable UK web hosting, VPS servers, dedicated servers and domain registration.
            Starting from <strong className="text-white">£2.99/month</strong> with a free SSL certificate included.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href={`${WHMCS}/cart.php`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white text-sm font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors shadow-lg shadow-[#2563EB]/25"
            >
              Get Started Today
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/web-hosting"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              View Hosting Plans
            </a>
          </div>

          {/* Domain search */}
          <DomainSearchBar />
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12 mt-8">
          {trust.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-slate-300">
              <Icon className="h-4 w-4 text-[#38BDF8]" />
              {label}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto mt-8 pt-8 border-t border-white/10">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">{value}</div>
              <div className="text-xs text-slate-400">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
