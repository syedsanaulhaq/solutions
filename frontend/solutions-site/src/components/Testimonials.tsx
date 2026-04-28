import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAllTestimonials } from '@/lib/testimonials';
import { TestimonialCard } from '@/components/TestimonialCard';
import { AnimatedFadeIn } from '@/components/AnimatedFadeIn';

interface TestimonialsSectionProps {
  /** Max number of testimonials to show. Defaults to 3. */
  limit?: number;
  /** Section background variant. */
  variant?: 'default' | 'muted';
  className?: string;
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
}

export function TestimonialsSection({
  limit = 3,
  variant = 'muted',
  className,
  title = 'What Our Clients Say',
  subtitle = 'Honest words from the organisations we have built for. Representative of real feedback — names and companies anonymised at client request.',
  showViewAll = true,
}: TestimonialsSectionProps) {
  const testimonials = getAllTestimonials().slice(0, limit);

  return (
    <section
      className={cn(
        'py-16 md:py-24',
        variant === 'muted' && 'bg-muted/40 dark:bg-muted/10',
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedFadeIn key={t.id} delay={i * 0.1} direction="up">
              <TestimonialCard testimonial={t} />
            </AnimatedFadeIn>
          ))}
        </div>

        {/* Footer row */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            All testimonials represent real client feedback. Full case studies available on request.
          </p>
          {showViewAll && (
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:underline shrink-0"
            >
              View all {getAllTestimonials().length} reviews <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
