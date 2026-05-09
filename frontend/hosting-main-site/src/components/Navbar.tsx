'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { ModeToggle } from '@/components/ModeToggle';
import { cn } from '@/lib/utils';

const WHMCS = process.env.NEXT_PUBLIC_WHMCS_URL || 'https://whmcs.hostingocean.co.uk';

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
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setHostingOpen(false);
      }
    }
    if (hostingOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [hostingOpen]);

  return (
    <>
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-all duration-200',
        scrolled
          ? 'border-border/60 bg-background/98 shadow-sm backdrop-blur'
          : 'border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-lg shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            aria-label="HostingOcean home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#2563EB] text-white" aria-hidden="true">
              <Globe className="h-4 w-4" />
            </div>
            <span className="text-foreground hidden sm:inline">Hosting</span>
            <span className="text-[#2563EB] hidden sm:inline">Ocean</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            <Link href="/" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent">
              Home
            </Link>

            {/* Hosting dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setHostingOpen((o) => !o)}
                aria-expanded={hostingOpen}
                aria-haspopup="true"
                className={cn(
                  'flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  hostingOpen && 'text-foreground bg-accent'
                )}
              >
                Hosting
                <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', hostingOpen && 'rotate-180')} />
              </button>
              {hostingOpen && (
                <div className="absolute top-full left-0 w-52 rounded-lg border bg-popover p-1 shadow-lg mt-1">
                  {hostingLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setHostingOpen(false)}
                      className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/about" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent">
              About
            </Link>
            <Link href="/blog" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent">
              Blog
            </Link>
            <Link href="/contact" className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent">
              Contact
            </Link>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <ModeToggle />
            <a
              href={`${WHMCS}/clientarea.php`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
            >
              Client Login
            </a>
            <button
              onClick={() => setRegisterOpen(true)}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-md bg-[#2563EB] text-white hover:bg-[#1d4ed8] transition-colors shadow-sm"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ModeToggle />
            <button
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/40 bg-background px-4 pt-2 pb-4">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            <Link href="/" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-sm font-medium rounded-md hover:bg-accent transition-colors">Home</Link>
            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Hosting</div>
            {hostingLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="px-6 py-2 text-sm rounded-md hover:bg-accent transition-colors">
                {link.label}
              </Link>
            ))}
            <Link href="/about" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-sm font-medium rounded-md hover:bg-accent transition-colors">About</Link>
            <Link href="/blog" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-sm font-medium rounded-md hover:bg-accent transition-colors">Blog</Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-sm font-medium rounded-md hover:bg-accent transition-colors">Contact</Link>
            <div className="mt-3 flex flex-col gap-2">
              <a
                href={`${WHMCS}/clientarea.php`}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2.5 text-sm font-medium text-center border border-border rounded-md hover:bg-accent transition-colors"
              >
                Client Login
              </a>
              <button
                onClick={() => { setMobileOpen(false); setRegisterOpen(true); }}
                className="block px-3 py-2.5 text-sm font-semibold text-center bg-[#2563EB] text-white rounded-md hover:bg-[#1d4ed8] transition-colors"
              >
                Get Started
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>

      {/* Register Modal — GBP default (currency=3) */}
      {registerOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setRegisterOpen(false); }}
        >
          <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl" style={{ height: '85vh' }}>
            <div
              className="flex items-center justify-between px-5 py-3"
              style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 100%)' }}
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
            <iframe
              src={`${WHMCS}/go-register.php?currency=3`}
              title="Create Account"
              className="w-full border-0"
              style={{ height: 'calc(85vh - 48px)' }}
            />
          </div>
        </div>
      )}
    </>
  );
}
