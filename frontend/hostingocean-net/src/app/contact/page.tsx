'use client';

import { useState } from 'react';
import { Clock3, Headphones, Mail, MapPin, Phone, Send } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="bg-[radial-gradient(circle_at_top,_rgba(21,128,61,0.14),_transparent_36%),linear-gradient(180deg,_#f8fafc_0%,_#ffffff_48%,_#ecfdf5_100%)] dark:from-slate-950 dark:via-slate-950 dark:to-emerald-950/20">
      <section className="relative overflow-hidden px-4 py-20">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(21,128,61,0.12),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(5,150,105,0.12),transparent_24%)]" />
        <div className="relative max-w-6xl mx-auto grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-white/80 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur dark:border-emerald-900/40 dark:bg-slate-900/70 dark:text-emerald-300">
              Contact HostingOcean.net
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white">
                Talk to a real support team.
              </h1>
              <p className="max-w-2xl text-base sm:text-lg leading-8 text-slate-600 dark:text-slate-300">
                Get help with hosting, domains, VPS or billing. We keep the process simple, responsive and easy to trust.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: Mail, title: 'Email', text: 'info@hostingocean.net' },
                { icon: Phone, title: 'Phone', text: '+92 333 9141680' },
                { icon: Clock3, title: 'Response', text: '24/7 PKT support' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-2xl border border-border bg-white/85 p-4 shadow-sm backdrop-blur dark:bg-slate-950/70">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-700 dark:text-emerald-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{item.title}</p>
                        <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{item.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-200/80 bg-white/90 p-6 shadow-xl shadow-emerald-950/5 backdrop-blur dark:border-emerald-900/40 dark:bg-slate-950/80">
            <div className="flex items-center justify-between gap-4 border-b border-border pb-5">
              <div>
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Registered Business</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Bahria Town, Rawalpindi, Pakistan</p>
              </div>
              <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
                Ready to help
              </div>
            </div>

            <div className="mt-5 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/60">
                <MapPin className="h-4 w-4 text-emerald-700 dark:text-emerald-300" />
                <span>Registered shop address: Bahria Town, Rawalpindi, Pakistan</span>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/60">
                <Mail className="h-4 w-4 text-emerald-700 dark:text-emerald-300" />
                <a href="mailto:info@hostingocean.net" className="hover:text-foreground transition-colors">info@hostingocean.net</a>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/60">
                <Phone className="h-4 w-4 text-emerald-700 dark:text-emerald-300" />
                <a href="tel:+923339141680" className="hover:text-foreground transition-colors">+92 333 9141680</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8 items-start">
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-white/90 p-6 shadow-sm backdrop-blur dark:bg-slate-950/70">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-700 dark:text-emerald-300">
                  <Headphones className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-950 dark:text-white">Support Hours</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">When our team is available</p>
                </div>
              </div>
              <div className="grid gap-3 text-sm text-slate-600 dark:text-slate-300">
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/60">24/7 Pakistan Time (PKT)</div>
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/60">English &amp; Urdu support available</div>
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/60">Sales, billing and support handled by the same team</div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-white/90 p-6 shadow-sm backdrop-blur dark:bg-slate-950/70">
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">Need help fast?</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                If your enquiry is about a billing issue, migration or downtime, put that in the subject line so we can route it quickly.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {['Web Hosting Enquiry', 'VPS Hosting Enquiry', 'Dedicated Server Enquiry', 'Billing Enquiry'].map((item) => (
                  <div key={item} className="rounded-2xl border border-border bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 dark:bg-slate-900/60 dark:text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            {status === 'success' ? (
              <div className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm dark:border-emerald-900/40 dark:bg-emerald-950/20">
                <h2 className="text-2xl font-bold text-emerald-900 dark:text-white">Message sent</h2>
                <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-100/80">Thanks for reaching out. We’ll respond as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-[2rem] border border-border bg-white/90 p-6 shadow-sm backdrop-blur dark:bg-slate-950/70">
                <div className="flex items-center gap-3 border-b border-border pb-5 mb-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-700 dark:text-emerald-300">
                    <Send className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-950 dark:text-white">Send a message</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">We usually reply within a few hours.</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1.5">Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full rounded-xl border border-input bg-background px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#15803D] transition-shadow"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-input bg-background px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#15803D] transition-shadow"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1.5">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-input bg-background px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#15803D] transition-shadow"
                    >
                      <option value="">Select a subject…</option>
                      <option value="Web Hosting Enquiry">Web Hosting Enquiry</option>
                      <option value="VPS Hosting Enquiry">VPS Hosting Enquiry</option>
                      <option value="Dedicated Server Enquiry">Dedicated Server Enquiry</option>
                      <option value="Domain Registration">Domain Registration</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Billing Enquiry">Billing Enquiry</option>
                      <option value="Website Migration">Website Migration</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1.5">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help…"
                      className="w-full rounded-xl border border-input bg-background px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-[#15803D] transition-shadow resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-sm text-destructive">Something went wrong. Please try again or email info@hostingocean.net</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full inline-flex items-center justify-center rounded-xl bg-[#15803D] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#166534] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === 'loading' ? 'Sending…' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
