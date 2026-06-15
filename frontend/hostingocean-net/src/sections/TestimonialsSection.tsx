import { TestimonialCarousel } from '@/components/TestimonialCarousel';

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Trusted by Businesses
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Don&rsquo;t take our word for it &mdash; hear from the businesses we work with.
          </p>
        </div>
        <TestimonialCarousel />
      </div>
    </section>
  );
}
