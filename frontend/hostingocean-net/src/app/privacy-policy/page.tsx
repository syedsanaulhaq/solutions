import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — HostingOcean.net',
  description: 'HostingOcean.net privacy policy — how we collect, use and protect your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground text-sm">Last updated: May 2026</p>

        <h2>1. Who We Are</h2>
        <p>
          HostingOcean.net is a registered web hosting business in Pakistan. Our registered email is info@hostingocean.net.
        </p>

        <h2>2. Data We Collect</h2>
        <p>We may collect:</p>
        <ul>
          <li>Name, email address, and phone number when you contact us or sign up</li>
          <li>Payment information (processed securely by our payment partners)</li>
          <li>Website usage data via analytics tools (anonymised)</li>
          <li>IP address and browser information for security and fraud prevention</li>
        </ul>

        <h2>3. How We Use Your Data</h2>
        <ul>
          <li>To provide and manage your hosting services</li>
          <li>To respond to support enquiries</li>
          <li>To send service-related notifications</li>
          <li>To improve our services and website</li>
          <li>To comply with legal obligations</li>
        </ul>

        <h2>4. Data Sharing</h2>
        <p>
          We do not sell your personal data to third parties. We may share data with trusted service providers
          (e.g., payment processors, server infrastructure) who process data on our behalf under confidentiality agreements.
        </p>

        <h2>5. Cookies</h2>
        <p>
          We use essential cookies to operate the website and optional analytics cookies to understand how visitors use our site.
          You can disable non-essential cookies in your browser settings.
        </p>

        <h2>6. Data Retention</h2>
        <p>
          We retain your data for as long as your account is active or as needed to provide services. You may request deletion
          of your data at any time by contacting info@hostingocean.net.
        </p>

        <h2>7. Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal data. Contact us at info@hostingocean.net.</p>

        <h2>8. Contact</h2>
        <p>
          For privacy-related enquiries, email us at{' '}
          <a href="mailto:info@hostingocean.net">info@hostingocean.net</a>.
        </p>
      </div>
    </section>
  );
}
