import type { Metadata } from 'next';
import { BadgeInfo, HandCoins, Mail, Phone, ShieldAlert, WalletCards } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refund and Return Policy — HostingOcean.net',
  description: 'HostingOcean.net refund and return policy with eligibility and refund processing turnaround time.',
};

const sections = [
  {
    id: 'eligibility',
    title: '1. Refund Eligibility',
    icon: BadgeInfo,
    content: [
      'Shared hosting plans are covered by our 30-day money-back guarantee from the original purchase date, subject to this policy.',
      'VPS, dedicated servers, domain registrations, renewals, setup fees, and third-party add-ons are non-refundable once provisioned.',
    ],
  },
  {
    id: 'turnaround',
    title: '2. Refund Processing Turnaround Time',
    icon: WalletCards,
    content: [
      'Once a refund request is approved, we process the refund within 7 to 14 business days.',
      'Refunds are issued to the original payment method where possible. Banking and payment gateway timelines may vary beyond our control.',
    ],
  },
  {
    id: 'request',
    title: '3. How to Request a Refund',
    icon: HandCoins,
    content: [
      'To request a refund, email info@hostingocean.net or contact us at +92 333 9141680 with your account email, order details, and reason for the request.',
    ],
  },
  {
    id: 'non-refundable',
    title: '4. Non-Refundable Cases',
    icon: ShieldAlert,
    bullets: [
      'Domain names already registered or renewed.',
      'Services that have been fully provisioned and consumed.',
      'Custom development, migration, or one-time professional service fees.',
      'Suspensions or terminations due to Terms of Service violations.',
    ],
  },
];

export default function RefundReturnPolicyPage() {
  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-emerald-50/30 dark:from-slate-950 dark:via-slate-950 dark:to-emerald-950/20">
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.14),_transparent_34%),radial-gradient(circle_at_20%_20%,_rgba(34,197,94,0.08),_transparent_28%)]" />
        <div className="relative max-w-5xl mx-auto">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr] items-end">
            <div>
              <span className="inline-flex items-center rounded-full border border-emerald-200 bg-white/80 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur dark:border-emerald-900/40 dark:bg-slate-900/70 dark:text-emerald-300">
                HostingOcean.net Legal Terms
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white">
                Refund and Return Policy
              </h1>
              <p className="mt-4 max-w-2xl text-base sm:text-lg leading-7 text-slate-600 dark:text-slate-300">
                Clear information on refund eligibility, timelines and non-refundable cases for HostingOcean.net services.
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-200/80 bg-white/90 p-5 shadow-lg shadow-emerald-950/5 backdrop-blur dark:border-emerald-900/40 dark:bg-slate-900/80">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
                  <p className="text-emerald-700 dark:text-emerald-300 font-semibold">Coverage</p>
                  <p className="mt-1 text-slate-700 dark:text-slate-200">30-day guarantee</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
                  <p className="text-slate-500 dark:text-slate-400 font-semibold">Turnaround</p>
                  <p className="mt-1 text-slate-700 dark:text-slate-200">7-14 business days</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
                  <p className="text-slate-500 dark:text-slate-400 font-semibold">Email</p>
                  <p className="mt-1 text-slate-700 dark:text-slate-200">info@hostingocean.net</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
                  <p className="text-slate-500 dark:text-slate-400 font-semibold">Phone</p>
                  <p className="mt-1 text-slate-700 dark:text-slate-200">+92 333 9141680</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-8">
            {[
              { label: 'Guarantee', value: '30 Days' },
              { label: 'Processing', value: '7-14 Business Days' },
              { label: 'Support', value: 'info@hostingocean.net' },
              { label: 'Phone', value: '+92 333 9141680' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">{item.label}</p>
                <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <article key={section.id} className="rounded-3xl border border-border bg-white/90 p-6 shadow-sm backdrop-blur dark:bg-slate-950/70">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-700 dark:text-emerald-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl font-bold text-slate-950 dark:text-white">{section.title}</h2>
                      <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        {section.content?.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                        {section.bullets ? (
                          <ul className="grid gap-2 pl-5">
                            {section.bullets.map((bullet) => (
                              <li key={bullet} className="list-disc">
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            <article className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm dark:border-emerald-900/60 dark:bg-emerald-950/20">
              <h2 className="text-xl font-bold text-emerald-950 dark:text-white">Need refund support?</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-emerald-900/80 dark:text-emerald-100/80">
                For refund or payment questions, email info@hostingocean.net or call +92 333 9141680. Please include your order details
                and account email so our team can process your request quickly.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm font-medium">
                <a href="mailto:info@hostingocean.net" className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-white px-4 py-2 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-700 dark:bg-slate-900 dark:text-emerald-200">
                  <Mail className="h-4 w-4" />
                  info@hostingocean.net
                </a>
                <a href="tel:+923339141680" className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-white px-4 py-2 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-700 dark:bg-slate-900 dark:text-emerald-200">
                  <Phone className="h-4 w-4" />
                  +92 333 9141680
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}