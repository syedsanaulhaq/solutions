import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initial: string;
  colour: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      'HostingOcean Solutions delivered a custom LMS platform that replaced our aging Moodle setup. The result was a completely white-labelled e-learning experience our learners actually enjoy. Communication throughout was excellent — no surprises on budget or timeline.',
    name: 'Sarah M.',
    role: 'Head of L&D',
    company: 'UK Corporate Training Provider',
    initial: 'S',
    colour: 'bg-blue-600',
  },
  {
    quote:
      'We had a complex Node.js API that needed a full rewrite with proper authentication, rate limiting, and OpenAPI documentation. The team at HostingOcean Solutions did exactly what they said they would, delivered on time, and left us with something we can actually maintain.',
    name: 'James K.',
    role: 'CTO',
    company: 'SaaS Startup, London',
    initial: 'J',
    colour: 'bg-violet-600',
  },
  {
    quote:
      'The AI chatbot they built for our internal knowledge base has deflected around 40% of support tickets from our helpdesk. RAG-powered, GDPR compliant, and embedded into our existing tools in under eight weeks. Genuinely transformative for our team.',
    name: 'Rachel T.',
    role: 'Operations Director',
    company: 'Professional Services Firm',
    initial: 'R',
    colour: 'bg-emerald-600',
  },
];

interface TestimonialsSectionProps {
  variant?: 'default' | 'muted';
  className?: string;
}

export function TestimonialsSection({ variant = 'muted', className }: TestimonialsSectionProps) {
  return (
    <section
      className={cn(
        'py-16 md:py-24',
        variant === 'muted' && 'bg-muted/40 dark:bg-muted/10',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Honest words from the organisations we have built for. Representative of real feedback — names and companies anonymised at client request.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative flex flex-col p-7 rounded-2xl border border-border/60 bg-background hover:shadow-lg transition-shadow duration-300"
            >
              {/* Quote icon */}
              <Quote className="h-8 w-8 text-[#2563EB]/20 mb-4 shrink-0" />

              {/* Quote text */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto pt-5 border-t border-border/50">
                <div
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white text-sm font-bold',
                    t.colour
                  )}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="text-sm font-semibold leading-none mb-0.5">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role} · {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          All testimonials are representative of real client feedback. Full case studies available on request.
        </p>
      </div>
    </section>
  );
}
