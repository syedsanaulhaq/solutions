import { HeroSection } from '@/sections/HeroSection';
import { FeaturesSection } from '@/sections/FeaturesSection';
import { WhyChooseSection } from '@/sections/WhyChooseSection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { CTASection } from '@/components/CTASection';
import { FAQSection } from '@/components/FAQSection';
import Link from 'next/link';
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

      {/* Hosting Services — explicit in-body links for SEO crawlability */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-3">
            Hosting Plans for Every Business
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto text-sm">
            Whether you need a fast shared hosting plan, a KVM VPS, or a fully managed dedicated
            server — we have options priced in PKR with no hidden fees.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                href: '/web-hosting',
                label: 'Web Hosting Pakistan',
                price: 'From Rs. 599/month',
                desc: 'Shared hosting with free SSL, daily backups, cPanel, and 24/7 Pakistan support.',
              },
              {
                href: '/vps-hosting',
                label: 'VPS Hosting Pakistan',
                price: 'From Rs. 2,672/month',
                desc: 'KVM-based VPS with full root access, SSD storage, and dedicated resources.',
              },
              {
                href: '/dedicated-servers',
                label: 'Dedicated Servers Pakistan',
                price: 'From Rs. 28,999/month',
                desc: 'Your own physical hardware — fully managed, DDoS protected, 99.9% uptime SLA.',
              },
            ].map(({ href, label, price, desc }) => (
              <Link
                key={href}
                href={href}
                className="rounded-2xl border border-border bg-card p-6 hover:border-[#15803D]/50 hover:shadow-md transition-all duration-200 flex flex-col gap-3"
              >
                <h3 className="font-bold text-base">{label}</h3>
                <p className="text-sm font-semibold text-[#15803D]">{price}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-[#15803D]">
                  View plans →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
