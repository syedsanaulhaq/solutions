'use client';

import { useState } from 'react';
import { Mail, Headphones, Globe } from 'lucide-react';

const WHMCS = process.env.NEXT_PUBLIC_WHMCS_URL || 'https://whmcs.hostingocean.co.uk';
const CONTACT_PHONE = '+92 333 9141680';
const REGISTERED_ADDRESS = 'APRT 206 2ND FLOOR PLAZA 68 CIVIC From Date : 01 JAN 2026 CENTER PH 4 BAHRIA TOWN RWP-';

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
      <section className="py-20 px-4 bg-gradient-to-b from-[#0F172A] to-[#1e2d4a] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">Contact Us</h1>
          <p className="text-lg text-slate-300">
            Get in touch with our UK team. We typically respond within 2 hours during business hours.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Contact info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-[#2563EB] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <a href="mailto:hello@hostingocean.co.uk" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      hello@hostingocean.co.uk
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Headphones className="h-5 w-5 text-[#2563EB] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Contact Number</p>
                    <a href={`tel:${CONTACT_PHONE.replace(/\s+/g, '')}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {CONTACT_PHONE}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-[#2563EB] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Support Ticket</p>
                    <a
                      href={`${WHMCS}/submitticket.php`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Open a support ticket →
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-[#2563EB] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Client Area</p>
                    <a
                      href="https://my.hostingocean.co.uk/clientarea.php"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Access your client dashboard →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border p-4 bg-card text-sm">
              <p className="font-semibold mb-1">Support Hours</p>
              <p className="text-muted-foreground">Ticket and live chat support is available 24/7. Sales and billing enquiries are handled Monday–Friday, 9am–6pm UK time.</p>
            </div>

            <div className="rounded-xl border border-border p-4 bg-card text-sm">
              <p className="font-semibold mb-1">Registered Business</p>
              <p className="text-muted-foreground">HostingOcean Ltd, {REGISTERED_ADDRESS}. For legal or billing enquiries, email hello@hostingocean.co.uk.</p>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            {status === 'success' ? (
              <div className="rounded-xl border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 p-6 text-center">
                <p className="text-green-700 dark:text-green-300 font-semibold">Message sent!</p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">We&rsquo;ll get back to you within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1.5">Name</label>
                    <input
                      id="name" name="name" type="text" required
                      value={form.name} onChange={handleChange}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label>
                    <input
                      id="email" name="email" type="email" required
                      value={form.email} onChange={handleChange}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1.5">Subject</label>
                  <select
                    id="subject" name="subject" required
                    value={form.subject} onChange={handleChange}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors"
                  >
                    <option value="">Select a subject…</option>
                    <option value="sales">Sales enquiry</option>
                    <option value="billing">Billing question</option>
                    <option value="technical">Technical support</option>
                    <option value="migration">Website migration</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1.5">Message</label>
                  <textarea
                    id="message" name="message" required rows={6}
                    value={form.message} onChange={handleChange}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                {status === 'error' && (
                  <p className="text-sm text-red-500">Something went wrong. Please try again or email us directly.</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#2563EB] text-white text-sm font-semibold rounded-lg hover:bg-[#1d4ed8] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
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
