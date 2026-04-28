'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Layers } from 'lucide-react';
import { ModeToggle } from '@/components/ModeToggle';
import { cn } from '@/lib/utils';

const serviceLinks = [
  { label: 'All Services', href: '/services' },
  { label: 'LMS Development', href: '/lms-development' },
  { label: 'React Development', href: '/react-development' },
  { label: 'Node.js APIs', href: '/node-api-development' },
  { label: 'AI Chatbots', href: '/ai-chatbots' },
  { label: 'Automation', href: '/automation' },
  { label: 'Web Hosting ↗', href: 'https://www.hostingocean.co.uk' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    if (servicesOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [servicesOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#2563EB] text-white">
              <Layers className="h-4 w-4" />
            </div>
            <span className="text-foreground hidden sm:inline">HostingOcean</span>
            <span className="text-[#2563EB] hidden sm:inline">Solutions</span>
          </Link>

          {/* ── Desktop navigation ── */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
            >
              Home
            </Link>

            {/* Services dropdown — click to open, click outside to close */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setServicesOpen((o) => !o)}
                className={cn(
                  'flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent',
                  servicesOpen && 'text-foreground bg-accent'
                )}
              >
                Services
                <ChevronDown
                  className={cn('h-4 w-4 transition-transform duration-200', servicesOpen && 'rotate-180')}
                />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 w-56 rounded-lg border bg-popover p-1 shadow-lg">
                  {serviceLinks.map((link, i) => (
                    <div key={link.href}>
                      {i === 1 && <div className="my-1 h-px bg-border" />}
                      {link.href.startsWith('http') ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            'block px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors',
                            i === 0 ? 'font-medium' : 'text-muted-foreground'
                          )}
                          onClick={() => setServicesOpen(false)}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className={cn(
                            'block px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors',
                            i === 0 ? 'font-medium' : 'text-muted-foreground'
                          )}
                          onClick={() => setServicesOpen(false)}
                        >
                          {link.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <a
              href="https://www.hostingocean.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
            >
              Web Hosting ↗
            </a>

            <Link
              href="/blog"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
            >
              Contact
            </Link>
          </nav>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Link
              href="/get-a-quote"
              className="hidden md:inline-flex items-center gap-1.5 rounded-md bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-sm font-medium h-9 px-4 transition-colors"
            >
              Get a Quote
            </Link>
            <button
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="px-4 py-4 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <div className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Services
            </div>
            {serviceLinks.map((link) =>
              link.href.startsWith('http') ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-sm rounded-md hover:bg-accent text-muted-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-sm rounded-md hover:bg-accent text-muted-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              href="/blog"
              className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
              onClick={() => setMobileOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-3 pb-1">
              <Link
                href="/get-a-quote"
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-sm font-medium h-10 px-4 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Get a Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
