import type { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { CTASection } from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Privacy Policy | HostingOcean Solutions',
  description:
    'Privacy Policy for HostingOcean Solutions. Learn how we collect, use, and protect your personal data in accordance with UK GDPR.',
};

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xl font-bold mt-10 mb-3 text-foreground">{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>;
}
function UL({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-inside space-y-1.5 text-muted-foreground mb-4 ml-2">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <Hero
        badge="Legal"
        title="Privacy Policy"
        titleAccent=""
        subtitle="How HostingOcean Solutions collects, uses, and protects your personal data."
      />

      <Section variant="default">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-muted-foreground mb-10">Last updated: April 2026</p>

          <H2>1. Who We Are</H2>
          <P>
            HostingOcean Solutions is the software development division of HostingOcean, a globally operating technology company. For privacy enquiries, contact us at{' '}
            <a href="mailto:info@solutions.hostingocean.net" className="text-[#2563EB] hover:underline">info@solutions.hostingocean.net</a>.
          </P>

          <H2>2. What Data We Collect</H2>
          <P>We may collect the following personal data when you use our website or contact us:</P>
          <UL items={[
            'Name and email address (when you submit an enquiry or quote request)',
            'Company name and role (optional, provided voluntarily)',
            'Project details (provided in contact or quote forms)',
            'IP address and browser information (via server logs and analytics)',
            'Cookie identifiers (see Section 6)',
          ]} />

          <H2>3. How We Use Your Data</H2>
          <P>We use your personal data to respond to enquiries, provide project proposals, fulfil contractual obligations, and improve our services through aggregated analytics. We do not sell, rent, or share your personal data with third parties for marketing purposes.</P>

          <H2>4. Legal Basis for Processing</H2>
          <P>Under applicable data protection law, we process your data on the bases of legitimate interests (responding to enquiries), contract performance (project engagements), and consent (where you have opted in to communications).</P>

          <H2>5. Data Retention</H2>
          <P>Enquiry data is retained for up to 24 months. Client project data is retained for the duration of the engagement plus six years (regulatory compliance). You may request deletion at any time where retention is not legally required.</P>

          <H2>6. Cookies</H2>
          <P>This website uses minimal cookies — primarily a theme preference cookie (dark/light mode) which contains no personal data. If we add analytics or marketing cookies in future, we will update this policy and obtain consent where required.</P>

          <H2>7. Your Rights</H2>
          <P>
            You have the right to access, correct, or delete your data; object to processing; and withdraw consent. To exercise these rights, contact{' '}
            <a href="mailto:info@solutions.hostingocean.net" className="text-[#2563EB] hover:underline">info@solutions.hostingocean.net</a>.
          </P>

          <H2>8. Data Security</H2>
          <P>We take appropriate technical and organisational measures to protect your personal data. Our infrastructure is hosted in secure data centres and access is restricted to authorised personnel.</P>

          <H2>9. Third-Party Services</H2>
          <P>Our website may use third-party services (such as Google Fonts or hosting infrastructure). We only use services that comply with applicable data protection standards.</P>

          <H2>10. Changes to This Policy</H2>
          <P>We may update this Privacy Policy from time to time. Material changes will be noted on this page with an updated date.</P>

          <H2>11. Contact</H2>
          <P>
            For any questions about this policy or your personal data, contact us at{' '}
            <a href="mailto:info@solutions.hostingocean.net" className="text-[#2563EB] hover:underline">info@solutions.hostingocean.net</a>.
          </P>
        </div>
      </Section>

      <CTASection
        title="Questions about your data?"
        subtitle="We are happy to answer any questions about how we handle your information."
        primary={{ label: 'Contact Us', href: '/contact' }}
        secondary={{ label: 'Learn About Us', href: '/about' }}
        variant="muted"
      />
    </>
  );
}
