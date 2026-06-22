import { HeroSection } from '@/sections/HeroSection';
import { FeaturesSection } from '@/sections/FeaturesSection';
import { WhyChooseSection } from '@/sections/WhyChooseSection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { CTASection } from '@/components/CTASection';
import { FAQSection } from '@/components/FAQSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HostingOcean — Web Hosting, VPS & Dedicated Servers in Pakistan',
  description:
    'Secure web hosting, VPS servers, dedicated servers, and domain registration for businesses in Pakistan. Fast setup, responsive support, and reliable long-term performance.',
  alternates: {
    canonical: 'https://hostingocean.net',
  },
};

const homeFaqs = [
  {
    question: 'What kind of businesses do you work with?',
    answer:
      'We work with businesses of all sizes — from startups to established organisations. Our clients include eCommerce stores, NGOs, service businesses, and companies that need custom internal portals or web systems.',
  },
  {
    question: 'What is the difference between web hosting and a web portal?',
    answer:
      'Web hosting is the infrastructure that keeps your website online. A web portal is a custom-built platform — such as a client portal, staff dashboard, or booking system — tailored to how your business operates.',
  },
  {
    question: 'How does custom development work?',
    answer:
      'We start with a free consultation to understand your requirements. From there we scope the project, agree on a timeline and cost, then build and deploy your solution with ongoing support included.',
  },
  {
    question: 'Do you offer support after the project is delivered?',
    answer:
      'Yes. We provide long-term technical support for everything we build. You will have a direct point of contact, not a generic support ticket queue.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Simply book a free call or send us a message via the contact page. We will get back to you within one business day to discuss your requirements.',
  },
  {
    question: 'Do you serve businesses outside Pakistan?',
    answer:
      'Yes — while we are based in Pakistan, we work with clients globally. Our infrastructure and development services are not limited by geography.',
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <FAQSection items={homeFaqs} />
      <CTASection
        dark
        heading="Have a project in mind?"
        subheading="Let's talk about the right hosting or development solution for your business."
        primaryLabel="Book a Free Call"
        primaryHref="/contact"
        secondaryLabel="Get a Custom Quote"
        secondaryHref="/contact"
      />
    </>
  );
}
