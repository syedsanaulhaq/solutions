import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'HostingOcean Terms of Service — the legal agreement governing use of our hosting services.',
};

export default function TermsOfServicePage() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
        <h1>Terms of Service</h1>
        <p className="text-muted-foreground text-sm">Last updated: January 2025</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By using HostingOcean services you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree, you must not use our services.
        </p>

        <h2>2. Services</h2>
        <p>
          HostingOcean Ltd provides web hosting, VPS, dedicated server, and domain registration services. All services are subject to our Acceptable Use Policy (AUP) and these Terms.
        </p>

        <h2>3. Account Responsibilities</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorised use.
        </p>

        <h2>4. Acceptable Use</h2>
        <p>You must not use our services to:</p>
        <ul>
          <li>Distribute spam, malware, or conduct phishing activities</li>
          <li>Infringe intellectual property rights</li>
          <li>Conduct DDoS attacks or other forms of cyber attack</li>
          <li>Store or distribute illegal content</li>
          <li>Violate any applicable UK or international law</li>
        </ul>

        <h2>5. Uptime SLA</h2>
        <p>
          We provide a 99.9% monthly uptime guarantee for shared hosting and VPS services. In the event we fail to meet this SLA, you will receive credit equal to 10× the pro-rata value of the downtime period.
        </p>

        <h2>6. Payment and Billing</h2>
        <p>
          Services are billed in advance. Invoices are due upon receipt. Failure to pay within 14 days of the due date may result in service suspension. Domain registration fees are non-refundable once the domain has been registered.
        </p>

        <h2>7. Refund Policy</h2>
        <p>
          We offer a 30-day money-back guarantee on shared hosting plans. VPS, dedicated servers and domain registrations are excluded from this guarantee.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by applicable law, HostingOcean Ltd shall not be liable for indirect, incidental, special or consequential damages arising from use of our services.
        </p>

        <h2>9. Termination</h2>
        <p>
          Either party may terminate services with 30 days&rsquo; written notice. We may terminate or suspend services immediately for violation of these Terms or the AUP without refund.
        </p>

        <h2>10. Governing Law</h2>
        <p>
          These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
        </p>

        <h2>11. Contact</h2>
        <p>
          For questions about these Terms, email{' '}
          <a href="mailto:legal@hostingocean.co.uk">legal@hostingocean.co.uk</a>.
        </p>
      </div>
    </section>
  );
}
