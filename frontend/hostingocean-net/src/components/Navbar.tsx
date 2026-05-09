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

  return (
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
              <div className="absolute top-full left-0 mt-1.5 w-52 bg-white dark:bg-[#0f1a10] border border-border rounded-xl shadow-xl p-1.5 z-50">
                {hostingLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setHostingOpen(false)}
                    className="block px-3 py-2 text-sm text-foreground hover:text-[#15803D] hover:bg-[#15803D]/8 rounded-lg transition-colors"
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
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-[#15803D] text-white hover:bg-[#166534] transition-colors shadow-sm"
          >
            Get Started
          </Link>
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
          <div className="pt-2">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center px-4 py-2.5 text-sm font-semibold rounded-lg bg-[#15803D] text-white hover:bg-[#166534] transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
