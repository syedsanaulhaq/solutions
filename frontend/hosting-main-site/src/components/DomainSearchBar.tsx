'use client';

import { useState, useRef } from 'react';
import { Search } from 'lucide-react';

const WHMCS = process.env.NEXT_PUBLIC_WHMCS_URL || 'https://whmcs.hostingocean.co.uk';

export function DomainSearchBar() {
  const [domain, setDomain] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = domain.trim();
    if (!q) return;
    window.open(`${WHMCS}/cart.php?a=add&domain=register&query=${encodeURIComponent(q)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex gap-0 rounded-xl border border-border bg-background shadow-md overflow-hidden focus-within:ring-2 focus-within:ring-[#2563EB] focus-within:border-[#2563EB] transition-all">
        <input
          ref={inputRef}
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Search for your perfect domain name…"
          aria-label="Domain name"
          className="flex-1 px-4 py-3.5 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-3.5 bg-[#2563EB] text-white text-sm font-semibold hover:bg-[#1d4ed8] transition-colors"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          Search
        </button>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-2">
        Enter a domain name (e.g. mybusiness.co.uk) to check availability
      </p>
    </form>
  );
}
