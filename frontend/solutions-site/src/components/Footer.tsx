import Link from 'next/link';
import { Layers, MapPin, Mail } from 'lucide-react';

const serviceLinks = [
  { label: 'LMS Development', href: '/lms-development' },
  { label: 'React Development', href: '/react-development' },
  { label: 'Node.js APIs', href: '/node-api-development' },
  { label: 'AI Chatbots', href: '/ai-chatbots' },
  { label: 'Automation', href: '/automation' },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#0F172A] text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#2563EB] text-white">
                <Layers className="h-4 w-4" />
              </div>
              <span className="font-bold text-lg text-white">HostingOcean Solutions</span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Custom LMS, AI, and Web Development — Built for Modern Businesses.
              We deliver scalable, intelligent digital systems for clients worldwide.
            </p>
            <div className="space-y-2 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span>United Kingdom · Registered Company</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <a href="mailto:hello@hostingocean.co.uk" className="hover:text-white transition-colors">
                  hello@hostingocean.co.uk
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'All Services', href: '/services' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} HostingOcean Solutions. All rights reserved.
          </p>
          <p className="text-xs text-slate-700">
            solutions.hostingocean.co.uk · Built with Next.js 14 &amp; TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
