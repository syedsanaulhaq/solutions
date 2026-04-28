'use client';

import { useState, useEffect, useMemo } from 'react';
import { Eye, Download, X, Search, LogOut, ShieldCheck } from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  budget: string;
  description: string;
  source: 'form' | 'chatbot';
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Constants — must match GetAQuoteForm.tsx exactly so filters align with data
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
  'Under \u00a35,000',
  '\u00a35,000 \u2013 \u00a315,000',
  '\u00a315,000 \u2013 \u00a330,000',
  '\u00a330,000 \u2013 \u00a360,000',
  '\u00a360,000+',
  'Not Sure Yet',
];

const SESSION_KEY = 'admin_dash_token';

// ---------------------------------------------------------------------------
// Helpers (defined outside component — no hook dependencies)
// ---------------------------------------------------------------------------
async function loadLeads(password: string): Promise<Lead[] | null> {
  const res = await fetch('/api/admin/leads', {
    headers: { Authorization: `Bearer ${password}` },
  });
  if (res.status === 401) return null;
  if (!res.ok) throw new Error('Server error');
  const data = (await res.json()) as { leads: Lead[] };
  return data.leads;
}

function exportToCSV(leads: Lead[]): void {
  const headers = [
    'ID', 'Name', 'Email', 'Phone', 'Company',
    'Service', 'Budget', 'Source', 'Created At', 'Description',
  ];
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const rows = leads.map((l) =>
    [
      l.id, l.name, l.email, l.phone ?? '', l.company ?? '',
      l.service, l.budget, l.source, l.createdAt, l.description,
    ]
      .map((v) => esc(String(v)))
      .join(','),
  );
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function AdminLeadsPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [fetchError, setFetchError] = useState('');

  // Filters
  const [search, setSearch] = useState('');
  const [filterService, setFilterService] = useState('');
  const [filterBudget, setFilterBudget] = useState('');
  const [filterSource, setFilterSource] = useState('');

  // Modal
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Restore session on mount
  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (!saved) return;
    setLoading(true);
    loadLeads(saved)
      .then((data) => {
        if (data === null) {
          sessionStorage.removeItem(SESSION_KEY);
          return;
        }
        setLeads(data);
        setAuthed(true);
      })
      .catch(() => {
        setFetchError('Failed to load leads. Please refresh and try again.');
        sessionStorage.removeItem(SESSION_KEY);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError('');
    setLoading(true);
    try {
      const data = await loadLeads(password);
      if (data === null) {
        setAuthError('Incorrect password. Please try again.');
        return;
      }
      sessionStorage.setItem(SESSION_KEY, password);
      setLeads(data);
      setAuthed(true);
    } catch {
      setAuthError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setLeads([]);
    setPassword('');
    setSearch('');
    setFilterService('');
    setFilterBudget('');
    setFilterSource('');
    setSelectedLead(null);
  }

  const filtered = useMemo(
    () =>
      leads.filter((l) => {
        if (filterService && l.service !== filterService) return false;
        if (filterBudget && l.budget !== filterBudget) return false;
        if (filterSource && l.source !== filterSource) return false;
        if (search) {
          const q = search.toLowerCase();
          return (
            l.name.toLowerCase().includes(q) ||
            l.email.toLowerCase().includes(q) ||
            (l.company ?? '').toLowerCase().includes(q)
          );
        }
        return true;
      }),
    [leads, filterService, filterBudget, filterSource, search],
  );

  const hasFilters = Boolean(search || filterService || filterBudget || filterSource);

  // ── Loading (session restore in progress) ──
  if (loading && !authed) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-muted-foreground text-sm animate-pulse">Checking session&hellip;</p>
      </div>
    );
  }

  // ── Password gate ──
  if (!authed) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-[#2563EB]/10 mb-4">
                <ShieldCheck className="h-7 w-7 text-[#2563EB]" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Enter the admin password to continue.
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-foreground mb-1.5"
                  htmlFor="admin-pw"
                >
                  Password
                </label>
                <input
                  id="admin-pw"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  autoFocus
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                />
              </div>
              {authError && (
                <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 rounded-lg px-3 py-2">
                  {authError}
                </p>
              )}
              <button
                type="submit"
                disabled={loading || !password}
                className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] disabled:opacity-50 text-white font-semibold rounded-lg py-2.5 text-sm transition-colors"
              >
                {loading ? 'Checking\u2026' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ── Dashboard ──
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leads Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {filtered.length} lead{filtered.length !== 1 ? 's' : ''} shown
            {hasFilters ? ' (filtered)' : ` of ${leads.length} total`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => exportToCSV(filtered)}
            disabled={filtered.length === 0}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold rounded-lg px-4 py-2 text-sm transition-colors"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 border border-border text-foreground hover:bg-muted rounded-lg px-4 py-2 text-sm transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Leads', value: leads.length },
          { label: 'Form Leads', value: leads.filter((l) => l.source === 'form').length },
          { label: 'Chatbot Leads', value: leads.filter((l) => l.source === 'chatbot').length },
          { label: 'Showing', value: filtered.length },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl px-4 py-3">
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground mt-0.5">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search name, email, company&hellip;"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
          />
        </div>
        <select
          value={filterService}
          onChange={(e) => setFilterService(e.target.value)}
          aria-label="Filter by service"
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#2563EB] min-w-[180px]"
        >
          <option value="">All Services</option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={filterBudget}
          onChange={(e) => setFilterBudget(e.target.value)}
          aria-label="Filter by budget"
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#2563EB] min-w-[160px]"
        >
          <option value="">All Budgets</option>
          {BUDGETS.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        <select
          value={filterSource}
          onChange={(e) => setFilterSource(e.target.value)}
          aria-label="Filter by source"
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[#2563EB] min-w-[130px]"
        >
          <option value="">All Sources</option>
          <option value="form">Form</option>
          <option value="chatbot">Chatbot</option>
        </select>
        {hasFilters && (
          <button
            onClick={() => {
              setSearch('');
              setFilterService('');
              setFilterBudget('');
              setFilterSource('');
            }}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-2"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Fetch error */}
      {fetchError && (
        <p className="text-sm text-red-500 mb-4">{fetchError}</p>
      )}

      {/* Table / empty state */}
      {filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-xl py-20 text-center text-muted-foreground">
          {hasFilters ? 'No leads match the current filters.' : 'No leads yet.'}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap">Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap">Email</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap">Phone</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap">Company</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap">Service</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap">Budget</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap">Source</th>
                  <th className="text-left px-4 py-3 font-semibold text-muted-foreground whitespace-nowrap">Date</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => (
                  <tr
                    key={lead.id}
                    className={`border-b border-border last:border-0 hover:bg-muted/30 transition-colors${i % 2 !== 0 ? ' bg-muted/10' : ''}`}
                  >
                    <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{lead.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{lead.email}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{lead.phone ?? '\u2014'}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{lead.company ?? '\u2014'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="inline-block bg-[#2563EB]/10 text-[#2563EB] text-xs font-medium rounded-full px-2.5 py-0.5">
                        {lead.service}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{lead.budget}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`inline-block text-xs font-medium rounded-full px-2.5 py-0.5 ${
                          lead.source === 'chatbot'
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        }`}
                      >
                        {lead.source}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap text-xs">{fmtDate(lead.createdAt)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2563EB] hover:text-[#1d4ed8] transition-colors"
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
        </div>
      )}

      {/* View Details modal */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Lead details"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="bg-card border border-border rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card z-10">
              <h2 className="text-lg font-bold text-foreground">Lead Details</h2>
              <button
                onClick={() => setSelectedLead(null)}
                className="rounded-lg p-1.5 hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {(
                [
                  ['Name', selectedLead.name],
                  ['Email', selectedLead.email],
                  ['Phone', selectedLead.phone ?? '\u2014'],
                  ['Company', selectedLead.company ?? '\u2014'],
                  ['Service', selectedLead.service],
                  ['Budget', selectedLead.budget],
                  ['Source', selectedLead.source],
                  ['Submitted', fmtDate(selectedLead.createdAt)],
                  ['Lead ID', selectedLead.id],
                ] as [string, string][]
              ).map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                    {label}
                  </p>
                  <p className="text-sm text-foreground">{value}</p>
                </div>
              ))}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Description
                </p>
                <p className="text-sm text-foreground whitespace-pre-wrap bg-muted/50 rounded-lg p-3">
                  {selectedLead.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
