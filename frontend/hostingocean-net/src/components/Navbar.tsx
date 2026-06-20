'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { ModeToggle } from '@/components/ModeToggle';
import { cn } from '@/lib/utils';

const hostingLinks = [
  { label: 'Web Hosting', href: '/web-hosting' },
  { label: 'VPS Hosting', href: '/vps-hosting' },
  { label: 'Dedicated Servers', href: '/dedicated-servers' },
  { label: 'Domain Registration', href: '/domain-registration' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hostingOpen, setHostingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setHostingOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const openModal = () => setRegisterOpen(true);
    window.addEventListener('open-register-modal', openModal);
    return () => window.removeEventListener('open-register-modal', openModal);
  }, []);

  return (
    <>
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-200',
        scrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#15803D] text-white" aria-hidden="true">
            <Globe className="h-4 w-4" />
          </div>
          <span className="text-foreground">Hosting</span>
          <span className="text-[#15803D]">Ocean</span>
          <span className="text-xs font-medium bg-[#15803D]/10 text-[#15803D] px-1.5 py-0.5 rounded border border-[#15803D]/20 ml-0.5">.net</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <Link href="/" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
            Home
          </Link>
          {/* Hosting dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setHostingOpen((o) => !o)}
              aria-expanded={hostingOpen}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
            >
              Hosting
              <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-150', hostingOpen && 'rotate-180')} />
            </button>
            {hostingOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-52 rounded-xl shadow-xl p-1.5 z-50" style={{ backgroundColor: 'white', border: '1px solid #e2e8f0' }}>
                {hostingLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setHostingOpen(false)}
                    className="block px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                    style={{ color: '#1a2e1a' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = '#f0fdf4'; (e.currentTarget as HTMLElement).style.color = '#15803D'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = ''; (e.currentTarget as HTMLElement).style.color = '#1a2e1a'; }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/about" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
            About
          </Link>
          <Link href="/blog" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
            Blog
          </Link>
          <Link href="/contact" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
            Contact
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          <a
            href="https://whmcs.hostingocean.net/clientarea.php"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg border border-[#15803D]/30 text-[#166534] hover:bg-[#15803D]/10 transition-colors"
          >
            Client Area
          </a>
          <button
            onClick={() => setRegisterOpen(true)}
            className="hidden md:inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-[#15803D] text-white hover:bg-[#166534] transition-colors shadow-sm"
          >
            Get Started
          </button>
          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            className="md:hidden h-9 w-9 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-1">
          <Link href="/" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors">Home</Link>
          {hostingLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/about" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors">About</Link>
          <Link href="/blog" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors">Blog</Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors">Contact</Link>
          <a
            href="https://whmcs.hostingocean.net/clientarea.php"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
          >
            Client Area
          </a>
          <div className="pt-2">
            <button
              onClick={() => { setMobileOpen(false); setRegisterOpen(true); }}
              className="block w-full text-center px-4 py-2.5 text-sm font-semibold rounded-lg bg-[#15803D] text-white hover:bg-[#166534] transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>

      {/* Register Modal */}
      {registerOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setRegisterOpen(false); }}
        >
          <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl" style={{ height: '85vh' }}>
            {/* Modal header bar */}
            <div
              className="flex items-center justify-between px-5 py-3"
              style={{ background: 'linear-gradient(135deg, #071a0b 0%, #0d2b14 100%)' }}
            >
              <span className="text-white font-semibold text-sm tracking-wide">Create Your Account — Hosting Ocean</span>
              <button
                onClick={() => setRegisterOpen(false)}
                aria-label="Close"
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {/* iframe */}
            <iframe
              src="https://whmcs.hostingocean.co.uk/go-register.php?currency=2"
              title="Create Account"
              className="w-full h-full border-0"
              style={{ height: 'calc(85vh - 48px)' }}
            />
          </div>
        </div>
      )}
    </>
  );
}
