'use client';

import { useState, useEffect } from 'react';
import {
  ShieldCheck,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  Star,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  avatarColour: string;
  rating: number;
  message: string;
  projectSlug?: string;
  projectTitle?: string;
  createdAt: string;
}

type FormData = Omit<Testimonial, 'id' | 'createdAt'>;

const SESSION_KEY = 'admin_dash_token';

const EMPTY_FORM: FormData = {
  name: '',
  role: '',
  company: '',
  avatar: '',
  avatarColour: 'bg-blue-600',
  rating: 5,
  message: '',
  projectSlug: '',
  projectTitle: '',
};

const AVATAR_COLOURS = [
  { label: 'Blue', value: 'bg-blue-600' },
  { label: 'Violet', value: 'bg-violet-600' },
  { label: 'Emerald', value: 'bg-emerald-600' },
  { label: 'Orange', value: 'bg-orange-600' },
  { label: 'Rose', value: 'bg-rose-600' },
  { label: 'Sky', value: 'bg-sky-600' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function authHeaders(password: string) {
  return { Authorization: `Bearer ${password}`, 'Content-Type': 'application/json' };
}

async function apiRequest(
  method: string,
  url: string,
  password: string,
  body?: object,
): Promise<Response> {
  return fetch(url, {
    method,
    headers: authHeaders(password),
    body: body ? JSON.stringify(body) : undefined,
  });
}

// ---------------------------------------------------------------------------
// Login screen
// ---------------------------------------------------------------------------
function LoginScreen({ onLogin }: { onLogin: (pw: string) => void }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/admin/testimonials', {
      headers: { Authorization: `Bearer ${pw}` },
    });
    if (res.status === 401) {
      setError('Incorrect password.');
    } else if (res.ok) {
      sessionStorage.setItem(SESSION_KEY, pw);
      onLogin(pw);
    } else {
      setError('Server error. Please try again.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-800 p-8 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="h-12 w-12 rounded-full bg-[#2563EB] flex items-center justify-center">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
        </div>
        <h1 className="text-center text-xl font-bold text-white mb-6">Testimonials Admin</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Admin password"
            required
            className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-2.5 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-lg bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold py-2.5 text-sm transition-colors"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Modal form
// ---------------------------------------------------------------------------
function ItemModal({
  initial,
  onSave,
  onClose,
  loading,
}: {
  initial: FormData & { id?: string };
  onSave: (data: FormData & { id?: string }) => void;
  onClose: () => void;
  loading: boolean;
}) {
  const [form, setForm] = useState<FormData & { id?: string }>(initial);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    // auto-set avatar initial if empty
    const avatar =
      form.avatar.trim() || (form.name.trim().charAt(0).toUpperCase() ?? 'A');
    onSave({ ...form, avatar });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-800 shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-bold text-lg">
            {form.id ? 'Edit testimonial' : 'Add testimonial'}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Role</label>
              <input
                type="text"
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Company</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Avatar initial (auto if blank)
              </label>
              <input
                type="text"
                maxLength={2}
                value={form.avatar}
                onChange={(e) => setForm((f) => ({ ...f, avatar: e.target.value }))}
                placeholder="S"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Avatar colour</label>
              <select
                value={form.avatarColour}
                onChange={(e) => setForm((f) => ({ ...f, avatarColour: e.target.value }))}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                {AVATAR_COLOURS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Rating (1–5)</label>
              <select
                value={form.rating}
                onChange={(e) => setForm((f) => ({ ...f, rating: Number(e.target.value) }))}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} star{n !== 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Message *</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              required
              rows={4}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Project slug</label>
              <input
                type="text"
                value={form.projectSlug ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, projectSlug: e.target.value }))}
                placeholder="my-project-slug"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Project title</label>
              <input
                type="text"
                value={form.projectTitle ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, projectTitle: e.target.value }))}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg border border-border hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-sm bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold rounded-lg transition-colors disabled:opacity-60"
            >
              {loading ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main dashboard
// ---------------------------------------------------------------------------
function Dashboard({ password }: { password: string }) {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [modal, setModal] = useState<(FormData & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  async function loadItems() {
    setLoading(true);
    try {
      const res = await apiRequest('GET', '/api/admin/testimonials', password);
      if (!res.ok) throw new Error('Failed');
      const data = (await res.json()) as { items: Testimonial[] };
      setItems(data.items);
    } catch {
      setError('Failed to load testimonials.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSave(data: FormData & { id?: string }) {
    setSaving(true);
    try {
      if (data.id) {
        const res = await apiRequest(
          'PUT',
          `/api/admin/testimonials?id=${data.id}`,
          password,
          data,
        );
        if (!res.ok) throw new Error('Failed');
        showToast('Testimonial updated.');
      } else {
        const res = await apiRequest('POST', '/api/admin/testimonials', password, data);
        if (!res.ok) throw new Error('Failed');
        showToast('Testimonial added.');
      }
      setModal(null);
      await loadItems();
    } catch {
      setError('Save failed. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const res = await apiRequest(
        'DELETE',
        `/api/admin/testimonials?id=${id}`,
        password,
      );
      if (!res.ok) throw new Error('Failed');
      showToast('Testimonial deleted.');
      setDeleteConfirm(null);
      await loadItems();
    } catch {
      setError('Delete failed.');
    }
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-[#38BDF8]" />
          <h1 className="font-bold text-lg">Testimonials Admin</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setModal({ ...EMPTY_FORM })}
            className="flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add testimonial
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem(SESSION_KEY);
              window.location.reload();
            }}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>

      <div className="p-6">
        {toast && (
          <div className="flex items-center gap-2 mb-4 bg-emerald-800/50 border border-emerald-700 text-emerald-200 rounded-lg px-4 py-3 text-sm">
            <CheckCircle2 className="h-4 w-4" />
            {toast}
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 mb-4 bg-red-800/50 border border-red-700 text-red-200 rounded-lg px-4 py-3 text-sm">
            <AlertCircle className="h-4 w-4" />
            {error}
            <button onClick={() => setError('')} className="ml-auto">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {loading ? (
          <p className="text-slate-400 text-sm">Loading…</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-700">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-800 border-b border-slate-700">
                <tr>
                  {['Name', 'Company', 'Rating', 'Preview', 'Created', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-slate-700/50 hover:bg-slate-800/60">
                    <td className="px-4 py-3 font-medium">{item.name}</td>
                    <td className="px-4 py-3 text-slate-300">{item.company}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-amber-400">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        {item.rating}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 max-w-[200px] truncate">
                      {item.message.slice(0, 60)}…
                    </td>
                    <td className="px-4 py-3 text-slate-400">{item.createdAt}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            setModal({
                              id: item.id,
                              name: item.name,
                              role: item.role,
                              company: item.company,
                              avatar: item.avatar,
                              avatarColour: item.avatarColour,
                              rating: item.rating,
                              message: item.message,
                              projectSlug: item.projectSlug,
                              projectTitle: item.projectTitle,
                            })
                          }
                          className="p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        {deleteConfirm === item.id ? (
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-red-400">Confirm?</span>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-xs text-red-400 hover:text-red-300 font-medium"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="text-xs text-slate-400 hover:text-white"
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(item.id)}
                            className="p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {items.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-sm">
                No testimonials yet.{' '}
                <button
                  onClick={() => setModal({ ...EMPTY_FORM })}
                  className="text-[#2563EB] hover:underline"
                >
                  Add the first one.
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {modal && (
        <ItemModal
          initial={modal}
          onSave={handleSave}
          onClose={() => setModal(null)}
          loading={saving}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function AdminTestimonialsPage() {
  const [password, setPassword] = useState<string | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) setPassword(saved);
  }, []);

  if (!password) {
    return <LoginScreen onLogin={setPassword} />;
  }

  return <Dashboard password={password} />;
}
