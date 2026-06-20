import Image from 'next/image';
import Link from 'next/link';

export default function BoldMagThemePage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(160deg,#ff4d9d,#ffb703_45%,#61dafb)] text-slate-950" style={{ fontFamily: 'Trebuchet MS, Verdana, sans-serif' }}>
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-[2rem] border-4 border-slate-950 bg-white p-8 shadow-[10px_10px_0px_#111827]">
            <p className="inline-block rounded-full bg-slate-950 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white">Playful Pop</p>
            <h1 className="mt-4 text-5xl font-black leading-tight">Color. Energy. Conversions.</h1>
            <p className="mt-4 text-slate-700">
              A loud, fresh, social-media-friendly storefront style for younger audiences and impulse buyers.
            </p>
            <div className="mt-8 flex gap-3">
              <button className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white">View Drop</button>
              <Link href="/designs" className="rounded-full border-2 border-slate-950 px-5 py-3 text-sm font-semibold">Back</Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {['/products/glass-02.svg', '/products/glass-08.svg', '/products/glass-16.svg', '/products/glass-21.svg'].map((img) => (
              <div key={img} className="relative h-44 overflow-hidden rounded-2xl border-4 border-slate-950 bg-white shadow-[6px_6px_0px_#111827]">
                <Image src={img} alt="Campaign product" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
