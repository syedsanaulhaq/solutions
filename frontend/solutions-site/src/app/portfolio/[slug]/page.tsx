import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, Calendar, Building2 } from 'lucide-react';
import {
  getProjectBySlug,
  getAllProjects,
  CATEGORY_STYLES,
  formatProjectDate,
} from '@/lib/portfolio';
import { Button } from '@/components/ui/button';

interface Props {
  params: { slug: string };
}

/* ── Static routes ── */
export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

/* ── Metadata ── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} | Portfolio`,
    description: project.description.slice(0, 160),
  };
}

/* ── Page ── */
export default function PortfolioProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const styles = CATEGORY_STYLES[project.category];

  return (
    <>
      {/* ─────────────── Dark hero ─────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-slate-800 text-white pt-20 pb-16 md:pt-28 md:pb-20">
        {/* Decorative blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-[#2563EB]/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#38BDF8]/10 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-10 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Portfolio
          </Link>

          {/* Category accent strip */}
          <div className={`h-1 w-16 rounded-full mb-6 ${styles?.cardStrip ?? 'bg-[#2563EB]'}`} />

          {/* Category badge */}
          <div className="mb-5">
            <span
              className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${styles?.heroBadge ?? 'bg-slate-700 text-slate-300 border border-slate-600'}`}
            >
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6 text-white">
            {project.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <Building2 className="h-4 w-4 shrink-0" />
              {project.industry}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 shrink-0" />
              {formatProjectDate(project.createdAt)}
            </span>
          </div>
        </div>
      </section>

      {/* ─────────────── Body ─────────────── */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            {/* ── Main content ── */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">About this project</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {project.description}
                </p>
              </div>

              {/* Outcomes */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-5">Key outcomes</h2>
                <ul className="space-y-4">
                  {project.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[#2563EB] mt-0.5 shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Images (if any) */}
              {project.images.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-5">Project screenshots</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.images.map((src, i) => (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        key={i}
                        src={src}
                        alt={`${project.title} screenshot ${i + 1}`}
                        className="rounded-xl border border-border w-full object-cover aspect-video"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-6">
              {/* Category */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Category
                </p>
                <span
                  className={`inline-block text-sm font-medium px-3 py-1.5 rounded-full ${styles?.badge ?? 'bg-muted text-muted-foreground'}`}
                >
                  {project.category}
                </span>
              </div>

              {/* Technologies */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Technologies used
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA card */}
              <div className="rounded-2xl border border-border bg-muted/40 p-5">
                <p className="font-semibold mb-1">Like what you see?</p>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  Tell us about your project and we will put together a free proposal.
                </p>
                <Link href="/get-a-quote">
                  <Button className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white gap-2">
                    Get a Quote <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Free · No commitment
                </p>
              </div>

              {/* Back link */}
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                All case studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── Bottom CTA ─────────────── */}
      <section className="bg-[#0F172A] text-white py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to build something like this?</h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            We scope, architect, and deliver — fixed price, no surprises.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-a-quote">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-500/20 gap-2"
              >
                Start a Project <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-slate-600 text-white bg-transparent hover:bg-slate-700 hover:text-white"
              >
                Back to Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
