'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  body: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Thompson',
    role: 'Founder',
    company: 'Bloom Digital Agency',
    body: "Switched to HostingOcean 18 months ago and haven't looked back. Uptime is rock-solid and the support team actually knows what they're talking about.",
    rating: 5,
  },
  {
    name: 'James Whitfield',
    role: 'CTO',
    company: 'Nexbridge Ltd',
    body: 'Our VPS performance is outstanding. We run three Node.js apps concurrently with zero issues. UK data centre makes GDPR compliance straightforward.',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    role: 'WordPress Developer',
    company: 'Freelance',
    body: "Managing client sites has never been easier. The cPanel setup is clean, backups run daily without fail, and I've not had a single downtime complaint.",
    rating: 5,
  },
  {
    name: 'Mark Reynolds',
    role: 'E-commerce Manager',
    company: 'StyleHaus UK',
    body: "Moved our WooCommerce store to HostingOcean's Business plan. Page load times dropped by 40% compared to our previous host. Conversions are up too.",
    rating: 5,
  },
  {
    name: 'Natalie Cross',
    role: 'Director',
    company: 'Cross Consulting',
    body: 'Professional, responsive, and genuinely helpful. They helped us migrate an old cPanel account in under 2 hours. Excellent value for money.',
    rating: 5,
  },
];

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <div className="relative max-w-2xl mx-auto text-center px-10">
      <button
        onClick={prev}
        aria-label="Previous testimonial"
        className="absolute left-0 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[#2563EB] transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div className="flex justify-center gap-0.5 mb-4">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
      </div>

      <blockquote className="text-lg font-medium leading-relaxed mb-5">
        &ldquo;{t.body}&rdquo;
      </blockquote>

      <div>
        <p className="font-semibold">{t.name}</p>
        <p className="text-sm text-muted-foreground">
          {t.role}, {t.company}
        </p>
      </div>

      <div className="flex justify-center gap-1.5 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              i === current ? 'w-6 bg-[#2563EB]' : 'w-1.5 bg-border hover:bg-muted-foreground'
            }`}
          />
        ))}
      </div>

      <button
        onClick={next}
        aria-label="Next testimonial"
        className="absolute right-0 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[#2563EB] transition-colors"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
