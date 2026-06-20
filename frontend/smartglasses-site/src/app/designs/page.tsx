import Link from 'next/link';

const themes = [
  {
    slug: 'luxe',
    title: 'Luxe Black',
    subtitle: 'Premium editorial storefront',
    color: 'from-zinc-900 via-zinc-800 to-zinc-900',
  },
  {
    slug: 'neon-tech',
    title: 'Neon Tech',
    subtitle: 'Futuristic smart-glasses vibe',
    color: 'from-cyan-950 via-slate-950 to-blue-950',
  },
  {
    slug: 'market-pro',
    title: 'Market Pro',
    subtitle: 'High-conversion marketplace style',
    color: 'from-amber-900/40 via-orange-900/20 to-zinc-900',
  },
  {
    slug: 'bold-mag',
    title: 'Bold Magazine',
    subtitle: 'Modern campaign-style brand layout',
    color: 'from-fuchsia-950/40 via-violet-950/20 to-slate-950',
  },
];

export default function ThemesIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <p className="text-center text-xs uppercase tracking-[0.2em] text-primary">Theme Gallery</p>
      <h1 className="mt-3 text-center text-4xl font-black tracking-tight sm:text-5xl">Pick A Real Theme</h1>
      <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
        Open each demo theme and choose the one you want. I will apply your selected design to the full store.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {themes.map((theme) => (
          <Link
            key={theme.slug}
            href={`/designs/${theme.slug}`}
            className="group overflow-hidden rounded-3xl border border-border/70 bg-card shadow-xl shadow-black/20"
          >
            <div className={`h-40 bg-gradient-to-br ${theme.color}`} />
            <div className="p-6">
              <h2 className="text-2xl font-extrabold group-hover:text-primary">{theme.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{theme.subtitle}</p>
              <p className="mt-4 text-sm font-semibold text-primary">Open demo {'->'}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 text-center text-sm text-muted-foreground">
        Live store stays unchanged until you approve one design.
      </div>
    </div>
  );
}
