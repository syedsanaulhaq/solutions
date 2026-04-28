'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  CheckSquare,
  Truck,
  BookOpen,
  LogOut,
  ShieldCheck,
  ExternalLink,
  AlertCircle,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import teamNotesData from '@/data/team-notes.json';
import tasksData from '@/data/tasks.json';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface TeamNote {
  id: string;
  author: string;
  category: string;
  content: string;
  date: string;
}

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'high' | 'medium' | 'low';
  assignee: string;
  due: string;
  notes: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const SESSION_KEY = 'admin_dash_token';

const DOCS = [
  {
    id: 'onboarding',
    title: 'Onboarding Guide',
    description: 'Getting started — access, local setup, standards, first week checklist.',
    icon: <BookOpen className="h-5 w-5" />,
    href: '/docs/internal/onboarding',
  },
  {
    id: 'delivery',
    title: 'Delivery Process',
    description: 'Six-phase client delivery: discovery, design, build, QA, deploy, handoff.',
    icon: <Truck className="h-5 w-5" />,
    href: '/docs/internal/delivery-process',
  },
  {
    id: 'qa',
    title: 'QA Checklist',
    description: 'Pre-launch checklist: functionality, cross-browser, performance, SEO, security.',
    icon: <CheckSquare className="h-5 w-5" />,
    href: '/docs/internal/qa-checklist',
  },
  {
    id: 'deployment',
    title: 'Deployment Guide',
    description: 'How to deploy to the production VPS — environment setup, commands, rollback.',
    icon: <FileText className="h-5 w-5" />,
    href: '/docs/internal/deployment-guide',
  },
];

const teamNotes: TeamNote[] = teamNotesData as TeamNote[];
const tasks: Task[] = tasksData as Task[];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function categoryColour(cat: string): string {
  const map: Record<string, string> = {
    product: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    ops: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    dev: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
    marketing: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  };
  return map[cat] ?? 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
}

function priorityBadge(priority: Task['priority']) {
  const map = {
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    low: 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300',
  };
  return map[priority];
}

function statusIcon(status: Task['status']) {
  if (status === 'done')
    return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
  if (status === 'in-progress')
    return <Clock className="h-4 w-4 text-amber-500 animate-pulse" />;
  return <AlertCircle className="h-4 w-4 text-slate-400" />;
}

function statusLabel(status: Task['status']): string {
  return status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function AdminInternalPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ── restore session ──
  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) {
      setAuthed(true);
    } else {
      setAuthed(false);
    }
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/leads', {
      headers: { Authorization: `Bearer ${password}` },
    });
    setLoading(false);
    if (res.status === 401) {
      setError('Invalid password. Please try again.');
      return;
    }
    sessionStorage.setItem(SESSION_KEY, password);
    setAuthed(true);
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setPassword('');
  }

  // ── loading state ──
  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#2563EB] border-t-transparent" />
      </div>
    );
  }

  // ── login form ──
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-[#2563EB] text-white mb-4">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold">Internal Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">Admin access required</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-border bg-muted/30 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2563EB]"
              autoFocus
              required
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full rounded-xl bg-[#2563EB] text-white py-2.5 text-sm font-semibold hover:bg-[#1d4ed8] transition-colors disabled:opacity-50"
            >
              {loading ? 'Checking…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── authenticated dashboard ──
  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const inProgressTasks = tasks.filter((t) => t.status === 'in-progress');
  const doneTasks = tasks.filter((t) => t.status === 'done');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#2563EB]" />
            <span className="font-semibold text-sm">Internal Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/leads" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Leads →
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-red-500 transition-colors"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

        {/* ── Internal Docs ── */}
        <section>
          <h2 className="text-xl font-bold mb-1">Internal Docs</h2>
          <p className="text-sm text-muted-foreground mb-5">Team documentation for onboarding, delivery, QA, and deployment.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DOCS.map((doc) => (
              <a
                key={doc.id}
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-3 p-5 rounded-2xl border border-border hover:border-[#2563EB]/40 bg-card hover:bg-muted/30 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB]/10 text-[#2563EB]">
                    {doc.icon}
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{doc.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{doc.description}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── Task Board ── */}
        <section>
          <h2 className="text-xl font-bold mb-1">Task Board</h2>
          <p className="text-sm text-muted-foreground mb-5">
            {inProgressTasks.length} in progress · {todoTasks.length} to do · {doneTasks.length} done
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Task</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Priority</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Assignee</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Due</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, i) => (
                  <tr
                    key={task.id}
                    className={`border-b border-border last:border-0 ${task.status === 'done' ? 'opacity-60' : ''} ${i % 2 === 0 ? '' : 'bg-muted/10'}`}
                    title={task.notes}
                  >
                    <td className="px-4 py-3">
                      <span className={task.status === 'done' ? 'line-through text-muted-foreground' : ''}>
                        {task.title}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1.5">
                        {statusIcon(task.status)}
                        <span className="text-xs">{statusLabel(task.status)}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${priorityBadge(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{task.assignee}</td>
                    <td className="px-4 py-3 text-muted-foreground">{formatDate(task.due)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Team Notes ── */}
        <section>
          <h2 className="text-xl font-bold mb-1">Team Notes</h2>
          <p className="text-sm text-muted-foreground mb-5">Observations, decisions, and reminders from the team.</p>
          <div className="space-y-3">
            {teamNotes.slice().reverse().map((note) => (
              <div key={note.id} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{note.author}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${categoryColour(note.category)}`}>
                      {note.category}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{formatDate(note.date)}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{note.content}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
