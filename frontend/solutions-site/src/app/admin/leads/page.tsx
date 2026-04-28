'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Download, X, Eye, RefreshCw, LogOut, Layers, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { QuoteLead } from '@/lib/leads';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const SERVICES = [
  'LMS Development',
  'AI Chatbot Development',
  'React / Next.js Development',
  'Node.js API Development',
  'Automation & Integrations',
  'Other / Not Sure Yet',
];

const BUDGETS = [
  'Under £5,000',
  '£5,000 – £15,000',
  '£15,000 – £30,000',
  '£30,000 – £60,000',
  '£60,000+',
  'Not Sure Yet',
];

const SESSION_KEY = 'admin_auth';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function fmt(iso: string): string {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function exportCSV(leads: QuoteLead[]) {
  const cols: (keyof QuoteLead)[] = [
    'id', 'name', 'email', 'phone', 'company', 'service', 'budget', 'source', 'createdAt', 'description',
  ];
  const escape = (v: string | undefined) => `"${(v ?? '').replace(/"/g, '""')}"`;
  const rows = [
    cols.join(','),
    ...leads.map((l) => cols.map((c) => escape(l[c] as string | undefined)).join(',')),
  ];
  const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** Password gate */
function LoginScreen({ onAuth }: { onAuth: (pw: string) => void }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/leads?password=${encodeURIComponent(pw)}`);
      if (res.ok) {
        sessionStorage.setItem(SESSION_KEY, pw);
        onAuth(pw);
      } else {
        setError('Incorrect password.');
      }
    } catch {
      setError('Could not connect. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563EB] mb-4">
            <Layers className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Enter your admin password to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="admin-pw" className="text-sm font-medium text-slate-300">Password</label>
            <input
              id="admin-pw"
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              autoFocus
              className="w-full rounded-lg border border-slate-600 bg-slate-900 text-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2563EB] transition-shadow placeholder:text-slate-500"
              placeholder="••••••••"
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={!pw || loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] disabled:opacity-50 text-white font-medium py-2.5 text-sm transition-colors"
          >
            {loading ? (
              <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

/** Lead detail modal */
function LeadModal({ lead, onClose }: { lead: QuoteLead; onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const Field = ({ label, value }: { label: string; value?: string }) =>
    value ? (
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">{label}</p>
        <p className="text-sm text-slate-100 whitespace-pre-wrap break-words">{value}</p>
      </div>
    ) : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <div>
            <h2 className="text-base font-bold text-white">{lead.name}</h2>
            <p className="text-xs text-slate-400">{lead.id}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name" value={lead.name} />
            <Field label="Email" value={lead.email} />
            <Field label="Phone" value={lead.phone} />
            <Field label="Company" value={lead.company} />
            <Field label="Service" value={lead.service} />
            <Field label="Budget" value={lead.budget} />
            <Field label="Source" value={lead.source} />
            <Field label="Submitted" value={fmt(lead.createdAt)} />
          </div>
          <div className="pt-2 border-t border-slate-700">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Project Description</p>
            <p className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">{lead.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Source badge
// ---------------------------------------------------------------------------
function SourceBadge({ source }: { source: 'form' | 'chatbot' }) {
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold',
      source === 'form'
        ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
        : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
    )}>
      {source}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Sort state
// ---------------------------------------------------------------------------
type SortKey = 'createdAt' | 'name' | 'service' | 'budget';
type SortDir = 'asc' | 'desc';

// ---------------------------------------------------------------------------
// Main dashboard
// ---------------------------------------------------------------------------
function Dashboard({ password, onLogout }: { password: string; onLogout: () => void }) {
  const [leads, setLeads] = useState<QuoteLead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [search, setSearch] = useState('');
  const [filterService, setFilterService] = useState('');
  const [filterBudget, setFilterBudget] = useState('');
  const [filterSource, setFilterSource] = useState('');

  // Sort
  const [sortKey, setSortKey] = useState<SortKey>('createdAt');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  // Modal
  const [selected, setSelected] = useState<QuoteLead | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const qs = new URLSearchParams({ password });
      if (search) qs.set('search', search);
      if (filterService) qs.set('service', filterService);
      if (filterBudget) qs.set('budget', filterBudget);
      if (filterSource) qs.set('source', filterSource);

      const res = await fetch(`/api/admin/leads?${qs}`);
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json() as { success: boolean; total: number; leads: QuoteLead[] };
      setLeads(data.leads);
      setTotal(data.total);
    } catch {
      setError('Failed to load leads.');
    } finally {
      setLoading(false);
    }
  }, [password, search, filterService, filterBudget, filterSource]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  // Client-side sort
  const sorted = [...leads].sort((a, b) => {
    let va: string = a[sortKey] ?? '';
    let vb: string = b[sortKey] ?? '';
    if (sortKey === 'createdAt') {
      const diff = new Date(va).getTime() - new Date(vb).getTime();
      return sortDir === 'asc' ? diff : -diff;
    }
    va = va.toLowerCase();
    vb = vb.toLowerCase();
    return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
  });

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <ChevronUp className="h-3 w-3 opacity-30" />;
    return sortDir === 'asc'
      ? <ChevronUp className="h-3 w-3 text-[#38BDF8]" />
      : <ChevronDown className="h-3 w-3 text-[#38BDF8]" />;
  }

  function clearFilters() {
    setSearch('');
    setFilterService('');
    setFilterBudget('');
    setFilterSource('');
  }

  const hasFilters = search || filterService || filterBudget || filterSource;

  const selectClass = "rounded-lg border border-slate-600 bg-slate-800 text-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2563EB] transition-shadow";

  return (
    <div className="min-h-screen text-slate-100">
      {/* ── Top bar ── */}
      <header className="border-b border-slate-700/60 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#2563EB]">
              <Layers className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-sm">Admin Dashboard</span>
            <span className="hidden sm:inline text-xs text-slate-500">/ Leads</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-slate-400">
              {total} lead{total !== 1 ? 's' : ''}
            </span>
            <button
              onClick={() => exportCSV(sorted)}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors font-medium"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
            <button
              onClick={fetchLeads}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Refresh"
            >
              <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
            </button>
            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 space-y-4">
        {/* ── Stats bar ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Leads', value: total },
            { label: 'From Form', value: leads.filter(l => l.source === 'form').length },
            { label: 'From Chatbot', value: leads.filter(l => l.source === 'chatbot').length },
            { label: 'This Month', value: leads.filter(l => new Date(l.createdAt).getMonth() === new Date().getMonth()).length },
          ].map(({ label, value }) => (
            <div key={label} className="bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3">
              <p className="text-xs text-slate-400">{label}</p>
              <p className="text-2xl font-bold text-white mt-0.5">{value}</p>
            </div>
          ))}
        </div>

        {/* ── Filters ── */}
        <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, company…"
              className="w-full rounded-lg border border-slate-600 bg-slate-800 text-slate-200 pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2563EB] transition-shadow placeholder:text-slate-500"
            />
          </div>

          {/* Service filter */}
          <select value={filterService} onChange={(e) => setFilterService(e.target.value)} className={selectClass}>
            <option value="">All Services</option>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          {/* Budget filter */}
          <select value={filterBudget} onChange={(e) => setFilterBudget(e.target.value)} className={selectClass}>
            <option value="">All Budgets</option>
            {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
          </select>

          {/* Source filter */}
          <select value={filterSource} onChange={(e) => setFilterSource(e.target.value)} className={selectClass}>
            <option value="">All Sources</option>
            <option value="form">Form</option>
            <option value="chatbot">Chatbot</option>
          </select>

          {/* Clear filters */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="h-3.5 w-3.5" /> Clear
            </button>
          )}
        </div>

        {/* ── Table ── */}
        {error ? (
          <div className="rounded-xl bg-red-900/30 border border-red-700/40 px-4 py-3 text-sm text-red-300">{error}</div>
        ) : loading ? (
          <div className="flex items-center justify-center py-24 text-slate-400 text-sm gap-2">
            <span className="h-5 w-5 rounded-full border-2 border-slate-600 border-t-[#2563EB] animate-spin" />
            Loading leads…
          </div>
        ) : sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-2">
            <Search className="h-8 w-8 opacity-30" />
            <p className="text-sm">No leads found{hasFilters ? ' matching your filters' : ''}.</p>
          </div>
        ) : (
          <div className="rounded-xl border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-800/80 border-b border-slate-700">
                    {(
                      [
                        { key: 'name' as SortKey, label: 'Name' },
                        { key: null, label: 'Email' },
                        { key: null, label: 'Phone' },
                        { key: null, label: 'Company' },
                        { key: 'service' as SortKey, label: 'Service' },
                        { key: 'budget' as SortKey, label: 'Budget' },
                        { key: null, label: 'Source' },
                        { key: 'createdAt' as SortKey, label: 'Submitted' },
                        { key: null, label: '' },
                      ] as { key: SortKey | null; label: string }[]
                    ).map(({ key, label }) => (
                      <th
                        key={label || 'action'}
                        className={cn(
                          'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap',
                          key && 'cursor-pointer select-none hover:text-white transition-colors'
                        )}
                        onClick={() => key && toggleSort(key)}
                      >
                        <span className="flex items-center gap-1">
                          {label}
                          {key && <SortIcon col={key} />}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {sorted.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-700/30 transition-colors group">
                      <td className="px-4 py-3 font-medium text-white whitespace-nowrap">{lead.name}</td>
                      <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{lead.email}</td>
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{lead.phone ?? '—'}</td>
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{lead.company ?? '—'}</td>
                      <td className="px-4 py-3 text-slate-300 whitespace-nowrap max-w-[160px] truncate">{lead.service}</td>
                      <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{lead.budget}</td>
                      <td className="px-4 py-3"><SourceBadge source={lead.source} /></td>
                      <td className="px-4 py-3 text-slate-400 whitespace-nowrap text-xs">{fmt(lead.createdAt)}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelected(lead)}
                          className="flex items-center gap-1 text-xs text-slate-400 hover:text-[#38BDF8] transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2.5 border-t border-slate-700 bg-slate-800/40 text-xs text-slate-500">
              Showing {sorted.length} of {total} lead{total !== 1 ? 's' : ''}
            </div>
          </div>
        )}
      </main>

      {/* Lead detail modal */}
      {selected && <LeadModal lead={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page entry — auth gate
// ---------------------------------------------------------------------------
export default function AdminLeadsPage() {
  const [password, setPassword] = useState<string | null>(null);

  // Restore session
  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) setPassword(saved);
  }, []);

  function handleAuth(pw: string) { setPassword(pw); }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setPassword(null);
  }

  if (!password) return <LoginScreen onAuth={handleAuth} />;
  return <Dashboard password={password} onLogout={handleLogout} />;
}
