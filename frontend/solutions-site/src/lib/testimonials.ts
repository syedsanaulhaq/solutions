import rawData from '../../data/testimonials.json';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  avatarColour: string;
  rating: number;
  message: string;
  projectSlug?: string;
  projectTitle?: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
export function getAllTestimonials(): Testimonial[] {
  return rawData as Testimonial[];
}

export function getTestimonialById(id: string): Testimonial | undefined {
  return (rawData as Testimonial[]).find((t) => t.id === id);
}

export function getTestimonialsByRating(rating: number): Testimonial[] {
  return (rawData as Testimonial[]).filter((t) => t.rating === rating);
}

export function getTestimonialsForProject(slug: string): Testimonial[] {
  return (rawData as Testimonial[]).filter((t) => t.projectSlug === slug);
}

export function getUniqueRatings(): number[] {
  const seen = new Set<number>();
  const ratings: number[] = [];
  for (const t of rawData as Testimonial[]) {
    if (!seen.has(t.rating)) {
      seen.add(t.rating);
      ratings.push(t.rating);
    }
  }
  return ratings.sort((a, b) => b - a);
}

export function getUniqueProjectSlugs(): { slug: string; title: string }[] {
  const seen = new Set<string>();
  const result: { slug: string; title: string }[] = [];
  for (const t of rawData as Testimonial[]) {
    if (t.projectSlug && !seen.has(t.projectSlug)) {
      seen.add(t.projectSlug);
      result.push({ slug: t.projectSlug, title: t.projectTitle ?? t.projectSlug });
    }
  }
  return result;
}
