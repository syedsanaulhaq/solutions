import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { CTASection } from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Terms of Service | HostingOcean Solutions',
  description:
    'Terms of Service for HostingOcean Solutions. Standard terms governing use of our website and software development services.',
};

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold mt-10 mb-3 text-foreground">{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>;
}

export default function TermsPage() {
  return (
    <>
      <Hero
        badge="Legal"
        title="Terms of Service"
        titleAccent=""
        subtitle="Standard terms governing use of our website and software development services."
      />

      <Section variant="default">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-muted-foreground mb-10">Last updated: April 2026</p>

          <H2>1. Acceptance of Terms</H2>
          <P>By accessing or using the HostingOcean Solutions website (solutions.hostingocean.co.uk) or engaging our services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.</P>

          <H2>2. Services</H2>
          <P>HostingOcean Solutions provides custom software development services including LMS development, AI chatbot development, React and Next.js development, Node.js API development, and business process automation. Specific terms for each engagement are governed by a separate written agreement.</P>

          <H2>3. Website Use</H2>
          <P>You may use our website for lawful purposes only. You must not use the website to transmit harmful, unlawful, or deceptive content, or attempt to gain unauthorised access to any part of our systems.</P>

          <H2>4. Intellectual Property</H2>
          <P>All content on this website â€” including text, graphics, logos, and code â€” is the property of HostingOcean Solutions or its licensors, protected by UK and international copyright law. You may not reproduce or distribute any content without written permission.</P>
          <P>For client projects, intellectual property ownership is governed by the specific project agreement. Standard terms transfer full IP ownership to the client upon final payment.</P>

          <H2>5. Disclaimers</H2>
          <P>This website and its content are provided &ldquo;as is&rdquo; without warranties of any kind. We do not guarantee that the website will be error-free or uninterrupted. Any information on this website is provided for general informational purposes only and does not constitute professional advice.</P>

          <H2>6. Limitation of Liability</H2>
          <P>To the fullest extent permitted by UK law, HostingOcean Solutions shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website. Liability for project engagements is governed by the separate project agreement.</P>

          <H2>7. Links to Third-Party Sites</H2>
          <P>Our website may contain links to third-party websites. We are not responsible for the content or privacy practices of those sites. Links do not constitute endorsement.</P>

          <H2>8. Governing Law</H2>
          <P>These terms are governed by the laws of England and Wales. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.</P>

          <H2>9. Changes to These Terms</H2>
          <P>We may update these Terms of Service from time to time. Changes will be posted on this page with an updated date. Continued use of our website after changes constitutes acceptance.</P>

          <H2>10. Contact</H2>
          <P>For any questions about these terms, contact us at{' '}
            <a href="mailto:info@solutions.hostingocean.co.uk" className="text-[#2563EB] hover:underline">info@solutions.hostingocean.co.uk</a>.
          </P>
        </div>
      </Section>

      <CTASection
        title="Ready to start a project?"
        subtitle="Get in touch for a no-obligation proposal. We respond within one business day."
        primary={{ label: 'Get a Free Quote' }}
        secondary={{ label: 'Contact Us', href: '/contact' }}
        variant="muted"
      />
    </>
  );
}
