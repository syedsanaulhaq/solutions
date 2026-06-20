import Image from 'next/image';
import Link from 'next/link';

const rows = ['/products/glass-04.svg', '/products/glass-07.svg', '/products/glass-13.svg', '/products/glass-18.svg'];

export default function MarketProThemePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border bg-gradient-to-r from-amber-500/20 via-transparent to-transparent">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <p className="text-sm font-semibold">Market Pro Theme</p>
          <Link href="/designs" className="rounded-md border border-border px-3 py-1.5 text-sm">Back</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 rounded-2xl border border-border bg-card p-4">
          <div className="grid gap-3 sm:grid-cols-4">
            {['COD', '2-4 Day Delivery', '7 Day Replace', 'Bank Transfer'].map((x) => (
              <div key={x} className="rounded-lg border border-border bg-secondary/40 px-3 py-2 text-center text-sm font-semibold">{x}</div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rows.map((img, i) => (
            <div key={img} className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="relative h-40 bg-secondary/40">
                <Image src={img} alt={`Catalog ${i + 1}`} fill className="object-cover" />
              </div>
              <div className="p-4">
                <p className="line-clamp-1 font-semibold">SmartGlasses Product {i + 1}</p>
                <p className="mt-1 text-sm text-muted-foreground">High conversion, practical ecommerce layout.</p>
                <p className="mt-3 text-base font-bold">Rs. {(2490 + i * 500).toLocaleString()}</p>
                <button className="mt-3 w-full rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">Add To Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
