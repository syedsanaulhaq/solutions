import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';
import {
  getAllTestimonials,
  getUniqueRatings,
  getUniqueProjectSlugs,
} from '@/lib/testimonials';
import { TestimonialsListing } from '@/components/TestimonialsListing';

export const metadata: Metadata = buildMetadata({
  title: 'Client Testimonials | HostingOcean Solutions',
  description:
    'Read honest reviews from the organisations we have built custom LMS platforms, AI chatbots, dashboards, APIs, and automation systems for.',
  keywords: ['client reviews', 'testimonials', 'software development reviews'],
  path: '/testimonials',
});

export default function TestimonialsPage() {
  const testimonials = getAllTestimonials();
  const ratings = getUniqueRatings();
  const projects = getUniqueProjectSlugs();

  const avgRating =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;
  const fiveStarCount = testimonials.filter((t) => t.rating === 5).length;

  return (
    <>
      {/* ── Hero ── */}
      <Hero
        badge="Client Reviews"
        title="What our clients"
        titleAccent="actually say."
        subtitle="Honest feedback from the organisations we have built for — from compliance LMS platforms and AI chatbots to logistics portals and recruitment automation. Names anonymised unless permission given."
        cta1={{ label: 'Start a Project', href: '/get-a-quote' }}
        cta2={{ label: 'View Our Work', href: '/portfolio' }}
      />

      {/* ── Trust strip ── */}
      <Section id="stats" variant="muted">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-center">
          <div className="rounded-2xl border border-border/60 bg-background p-6">
            <div className="flex justify-center mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-2xl font-extrabold text-foreground">
              {avgRating.toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Average rating</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-background p-6">
            <p className="text-3xl font-extrabold text-[#2563EB]">{testimonials.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Total reviews</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-background p-6">
            <p className="text-3xl font-extrabold text-[#2563EB]">{fiveStarCount}</p>
            <p className="text-xs text-muted-foreground mt-1">5-star reviews</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-background p-6">
            <p className="text-3xl font-extrabold text-[#2563EB]">
              {Math.round((fiveStarCount / testimonials.length) * 100)}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">Rated 5 stars</p>
          </div>
        </div>
      </Section>

      {/* ── All testimonials ── */}
      <Section id="reviews">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <Badge className="mb-4 bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20 hover:bg-[#2563EB]/20">
            All Reviews
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {testimonials.length} reviews from real clients
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Filter by project or rating, or search for a specific keyword. Every review is
            linked to a real project — use &ldquo;View case study&rdquo; to see the full outcomes.
          </p>
        </div>

        <TestimonialsListing
          testimonials={testimonials}
          projects={projects}
          ratings={ratings}
        />
      </Section>

      {/* ── CTA ── */}
      <Section id="cta" variant="dark">
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 mx-auto mb-5">
            <ArrowRight className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to be our next success story?
          </h2>
          <p className="text-slate-300 mb-3 text-lg leading-relaxed">
            Tell us about your project and we will put together a free, no-obligation proposal
            within one business day.
          </p>
          <p className="text-slate-400 text-sm mb-8">
            Free proposal · No commitment · Typically within one business day
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-a-quote">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#1d4ed8] shadow-lg shadow-blue-500/20 text-base px-8"
              >
                Get a Free Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-slate-600 text-white bg-transparent hover:bg-slate-700 hover:text-white"
              >
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
