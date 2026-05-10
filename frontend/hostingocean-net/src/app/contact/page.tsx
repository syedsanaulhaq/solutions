'use client';

import { useState } from 'react';
import { Mail, Headphones, Phone } from 'lucide-react';

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
    <>
      <section className="py-20 px-4 bg-gradient-to-b from-[#071a0b] to-[#0d2b14] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">Contact Us</h1>
          <p className="text-lg text-green-100">
            Get in touch — we&rsquo;re happy to help with hosting, domains, VPS, or anything else.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-lg bg-[#15803D]/10 text-[#15803D] flex items-center justify-center">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">Email</h3>
              </div>
              <a href="mailto:info@hostingocean.net" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                info@hostingocean.net
              </a>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-lg bg-[#15803D]/10 text-[#15803D] flex items-center justify-center">
                  <Phone className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">Phone / WhatsApp</h3>
              </div>
              <a href="tel:+923399141680" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                +92 339 914 1680
              </a>
              <p className="text-xs text-muted-foreground mt-1">Available 24/7 (PKT)</p>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-lg bg-[#15803D]/10 text-[#15803D] flex items-center justify-center">
                  <Headphones className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">Support Hours</h3>
              </div>
              <p className="text-sm text-muted-foreground">24/7 Pakistan Time (PKT)</p>
              <p className="text-xs text-muted-foreground mt-1">English &amp; Urdu support available</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {status === 'success' ? (
              <div className="rounded-xl border border-[#15803D]/40 bg-[#15803D]/5 p-8 text-center">
                <h2 className="text-xl font-bold mb-2 text-[#15803D]">Message Sent!</h2>
                <p className="text-muted-foreground">Thanks for getting in touch. We&rsquo;ll respond within a few hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
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
                      className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#15803D] transition-shadow"
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
                      className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#15803D] transition-shadow"
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
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#15803D] transition-shadow"
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
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help…"
                    className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#15803D] transition-shadow resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-destructive">Something went wrong. Please try again or email us at info@hostingocean.net</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 px-6 rounded-lg bg-[#15803D] text-white text-sm font-semibold hover:bg-[#166534] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
