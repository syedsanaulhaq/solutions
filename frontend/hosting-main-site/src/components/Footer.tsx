import Link from 'next/link';
import { Globe, Twitter, Facebook, Linkedin, Mail, Phone } from 'lucide-react';

const WHMCS = process.env.NEXT_PUBLIC_WHMCS_URL || 'https://whmcs.hostingocean.co.uk';

const hosting = [
  { label: 'Web Hosting', href: '/web-hosting' },
  { label: 'VPS Hosting', href: '/vps-hosting' },
  { label: 'Dedicated Servers', href: '/dedicated-servers' },
  { label: 'Domain Registration', href: '/domain-registration' },
];

const company = [
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Solutions Partner', href: 'https://solutions.hostingocean.co.uk', external: true },
];

const support = [
  { label: 'Client Area', href: `${WHMCS}/clientarea.php`, external: true },
  { label: 'Open a Ticket', href: `${WHMCS}/submitticket.php`, external: true },
  { label: 'Knowledge Base', href: `${WHMCS}/knowledgebase.php`, external: true },
  { label: 'Announcements', href: `${WHMCS}/announcements.php`, external: true },
];

const legal = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
  { label: 'Refund & Returns', href: '/refund-return-policy' },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-secondary/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-lg mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#2563EB] text-white" aria-hidden="true">
                <Globe className="h-4 w-4" />
              </div>
              <span className="text-foreground">Hosting</span>
              <span className="text-[#2563EB]">Ocean</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Reliable UK web hosting, VPS, dedicated servers and domain registration. 24/7 UK-based support you can trust.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Mail className="h-4 w-4 shrink-0" />
              <a href="mailto:info@hostingocean.co.uk" className="hover:text-foreground transition-colors">info@hostingocean.co.uk</a>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://twitter.com/hostingocean" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://facebook.com/hostingocean" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com/company/hostingocean" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Hosting */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Hosting</h3>
            <ul className="space-y-2.5">
              {hosting.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2.5">
              {company.map((l) => (
                <li key={l.href}>
                  {l.external ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Support</h3>
            <ul className="space-y-2.5">
              {support.map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} HostingOcean Ltd. Registered in England &amp; Wales. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {legal.map((l) => (
              <Link key={l.href} href={l.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
