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
    name: 'Ahmed Raza',
    role: 'Founder',
    company: 'TechKarachi Solutions',
    body: "HostingOcean has been a game changer for our agency. Rock-solid uptime, blazing fast servers, and the support team actually responds within minutes. Best hosting in Pakistan!",
    rating: 5,
  },
  {
    name: 'Fatima Malik',
    role: 'E-commerce Owner',
    company: 'StylePK Store',
    body: "Moved our WooCommerce store to HostingOcean and our page load times dropped dramatically. Sales have improved and we haven't had a single downtime since switching.",
    rating: 5,
  },
  {
    name: 'Usman Tariq',
    role: 'WordPress Developer',
    company: 'Freelance',
    body: "I manage 15+ client sites and HostingOcean makes it effortless. cPanel is clean, daily backups run without fail, and the PKR pricing is honestly the best value out there.",
    rating: 5,
  },
  {
    name: 'Sara Khan',
    role: 'IT Manager',
    company: 'Lahore Tech Hub',
    body: "Our VPS performance is outstanding. We run multiple Node.js applications with zero issues. Migrating from a UK provider to HostingOcean.net was the right decision.",
    rating: 5,
  },
  {
    name: 'Bilal Hussain',
    role: 'Director',
    company: 'IslamabadWeb Agency',
    body: "Professional, responsive, and genuinely helpful. They migrated our entire portfolio of client sites in under 3 hours. Excellent value in PKR with no hidden charges.",
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
        className="absolute left-0 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[#15803D] transition-colors"
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
        <p className="font-semibold text-sm">{t.name}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
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
              i === current ? 'w-5 bg-[#15803D]' : 'w-1.5 bg-border hover:bg-[#15803D]/40'
            }`}
          />
        ))}
      </div>

      <button
        onClick={next}
        aria-label="Next testimonial"
        className="absolute right-0 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[#15803D] transition-colors"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
