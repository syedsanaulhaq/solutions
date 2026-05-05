import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — HostingOcean.net',
  description: 'HostingOcean.net terms of service — the rules and conditions governing use of our hosting services.',
};

export default function TermsOfServicePage() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
        <h1>Terms of Service</h1>
        <p className="text-muted-foreground text-sm">Last updated: May 2026</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By using HostingOcean.net services, you agree to these Terms of Service. If you do not agree, please do not use our services.
        </p>

        <h2>2. Services</h2>
        <p>
          HostingOcean.net provides web hosting, VPS hosting, dedicated server, and domain registration services as described
          on our website. Service specifications may change with reasonable notice.
        </p>

        <h2>3. Account Responsibilities</h2>
        <ul>
          <li>You are responsible for maintaining the security of your account credentials</li>
          <li>You must provide accurate registration information</li>
          <li>You are responsible for all activity under your account</li>
          <li>You must promptly notify us of any unauthorised account access</li>
        </ul>

        <h2>4. Acceptable Use</h2>
        <p>You agree not to use our services to:</p>
        <ul>
          <li>Host illegal content under Pakistani or international law</li>
          <li>Send spam or unsolicited commercial email</li>
          <li>Conduct phishing, fraud, or cybercrime activities</li>
          <li>Mine cryptocurrency without prior written consent</li>
          <li>Perform DDoS attacks or other malicious activity</li>
          <li>Violate third-party intellectual property rights</li>
        </ul>

        <h2>5. Payment Terms</h2>
        <p>
          Services are billed in Pakistani Rupees (PKR). Invoices are due on the billing date. Failure to pay may result
          in service suspension after 7 days and termination after 14 days.
        </p>

        <h2>6. Refund Policy</h2>
        <p>
          Web hosting services carry a 30-day money-back guarantee. VPS and dedicated servers are non-refundable after setup.
          Domain registrations and renewals are non-refundable.
        </p>

        <h2>7. Uptime SLA</h2>
        <p>
          We guarantee 99.9% network uptime. Downtime caused by scheduled maintenance, customer actions, or force majeure events
          is excluded from SLA calculations.
        </p>

        <h2>8. Termination</h2>
        <p>
          We reserve the right to suspend or terminate services for violation of these terms, non-payment, or activities
          that threaten our infrastructure or other customers.
        </p>

        <h2>9. Limitation of Liability</h2>
        <p>
          Our liability is limited to the value of your monthly service fee. We are not liable for indirect, consequential,
          or loss-of-business damages.
        </p>

        <h2>10. Contact</h2>
        <p>
          For questions about these terms, contact us at{' '}
          <a href="mailto:info@hostingocean.net">info@hostingocean.net</a>.
        </p>
      </div>
    </section>
  );
}
