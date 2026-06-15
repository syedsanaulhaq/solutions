'use client';

import Link from 'next/link';
import { Layers, MapPin, Mail, ArrowRight } from 'lucide-react';
import { NewsletterSignup } from '@/components/NewsletterSignup';

const serviceLinks = [
  { label: 'LMS Development', href: '/lms-development' },
  { label: 'AI Chatbot Development', href: '/ai-chatbots' },
  { label: 'React Development', href: '/react-development' },
  { label: 'Node.js APIs', href: '/node-api-development' },
  { label: 'Automation & Integrations', href: '/automation' },
  { label: 'All Services', href: '/services' },
  { label: 'Web Hosting ↗', href: 'https://www.hostingocean.co.uk', external: true },
];

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Docs', href: '/docs' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
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
              Custom LMS, AI chatbots, React &amp; Node.js development, and business automation &mdash; built by expert engineers for modern businesses worldwide.
            </p>
            <div className="space-y-2 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Pakistan &middot; Registered Company</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <a href="mailto:info@hostingocean.net" className="hover:text-white transition-colors">
                  info@hostingocean.net
                </a>
              </div>
            </div>
            {/* CTA */}
            <button
              onClick={() => typeof window !== 'undefined' && window.dispatchEvent(new CustomEvent('open-quote-modal'))}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#38BDF8] hover:text-white transition-colors mt-2"
            >
              Get a free quote <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
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

        <div className="mt-10 border-t border-slate-800 pt-10">
          <div className="max-w-lg">
            <NewsletterSignup
              source="footer"
              heading="Get technical updates"
              subheading="Guides, case studies, and product news. No spam."
            />
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-slate-500">
            &copy; 2026 HostingOcean Solutions. All rights reserved.
          </p>
          <p className="text-xs text-slate-700">
            solutions.hostingocean.net &middot; Built with Next.js 14 &amp; TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
