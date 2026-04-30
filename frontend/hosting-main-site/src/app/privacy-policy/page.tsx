import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'HostingOcean Privacy Policy — how we collect, use and protect your personal data.',
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
        <h1>Privacy Policy</h1>
        <p className="text-muted-foreground text-sm">Last updated: January 2025</p>

        <h2>1. Who We Are</h2>
        <p>
          HostingOcean Ltd (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a company registered in England and Wales.
          We operate the website <strong>hostingocean.co.uk</strong> and provide web hosting, VPS, dedicated server and domain registration services.
        </p>

        <h2>2. Information We Collect</h2>
        <p>We collect information you provide directly when you:</p>
        <ul>
          <li>Create an account or place an order</li>
          <li>Contact our support team</li>
          <li>Subscribe to our newsletter or marketing communications</li>
        </ul>
        <p>We also collect technical data automatically, including IP address, browser type, pages visited and referral source, using cookies and analytics tools.</p>

        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To provision and manage your hosting services</li>
          <li>To process payments and send invoices</li>
          <li>To provide customer support</li>
          <li>To send service-related notifications (e.g. renewal reminders, maintenance notices)</li>
          <li>To improve our website and services through anonymised analytics</li>
        </ul>

        <h2>4. Legal Basis for Processing</h2>
        <p>
          We process your personal data under the UK General Data Protection Regulation (UK GDPR) on the following lawful bases: performance of a contract, compliance with legal obligations, and legitimate interests.
        </p>

        <h2>5. Data Retention</h2>
        <p>
          We retain account data for the duration of your contract and for 6 years thereafter as required by UK tax and accounting law. Support communications are retained for 2 years.
        </p>

        <h2>6. Your Rights</h2>
        <p>Under UK GDPR you have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Request erasure (&ldquo;right to be forgotten&rdquo;)</li>
          <li>Object to processing</li>
          <li>Data portability</li>
        </ul>
        <p>
          To exercise any of these rights, email <a href="mailto:privacy@hostingocean.co.uk">privacy@hostingocean.co.uk</a>.
        </p>

        <h2>7. Third Parties</h2>
        <p>
          We use the following third-party processors: Stripe (payment processing), Google Analytics (website analytics), and Cloudflare (CDN/DDoS protection). All processors are contractually bound under appropriate data processing agreements.
        </p>

        <h2>8. Cookies</h2>
        <p>
          We use essential cookies for session management and optional analytics cookies. You may disable non-essential cookies in your browser settings at any time.
        </p>

        <h2>9. Contact</h2>
        <p>
          For privacy-related enquiries, contact our Data Controller at{' '}
          <a href="mailto:privacy@hostingocean.co.uk">privacy@hostingocean.co.uk</a> or write to:
          HostingOcean Ltd, England, United Kingdom.
        </p>
      </div>
    </section>
  );
}
