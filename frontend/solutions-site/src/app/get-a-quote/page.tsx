import type { Metadata } from 'next';
import Link from 'next/link';
import { Layers, CheckCircle2 } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { GetAQuoteForm } from '@/components/GetAQuoteForm';

export const metadata: Metadata = buildMetadata({
  title: 'Get a Free Quote',
  description:
    "Tell us about your project and we'll get back within one business day with a clear, no-obligation proposal tailored to your needs.",
  path: '/get-a-quote',
  ogImage: '/opengraph-image',
});

const TRUST_POINTS = [
  'Free, no-obligation proposal',
  'Response within one business day',
  'Fixed-price projects — no billing surprises',
  'Dedicated project manager from day one',
];

export default function GetAQuotePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* ── Hero banner ── */}
      <section className="bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-slate-800 text-white py-16 md:py-20 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#2563EB]/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#38BDF8]/10 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 opacity-70 hover:opacity-100 transition-opacity text-sm text-slate-300">
            <Layers className="h-4 w-4 text-[#2563EB]" />
            HostingOcean Solutions
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Get a <span className="text-[#38BDF8]">Free Quote</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-xl mx-auto">
            Tell us about your project and we&apos;ll come back with a clear, tailored proposal —
            no commitment required.
          </p>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {TRUST_POINTS.map((point) => (
              <span key={point} className="flex items-center gap-1.5 text-sm text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                {point}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form section ── */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GetAQuoteForm />
        </div>
      </section>
    </main>
  );
}
