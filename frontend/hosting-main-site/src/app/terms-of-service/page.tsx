import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'HostingOcean Terms of Service — the legal agreement governing use of our hosting services.',
};

export default function TermsOfServicePage() {
  const registeredAddress = 'APRT 206 2ND FLOOR PLAZA 68 CIVIC From Date : 01 JAN 2026 CENTER PH 4 BAHRIA TOWN RWP-';

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

        <h2>3. Company Information</h2>
        <p>
          HostingOcean Ltd is registered in Pakistan. Our registered business name is HostingOcean Ltd, our registered business address is <strong>{registeredAddress}</strong>, and our operating website is <strong>www.hostingocean.co.uk</strong>. For customer support and billing enquiries, please email <a href="mailto:hello@hostingocean.co.uk">hello@hostingocean.co.uk</a> or open a ticket through our client area.
        </p>

        <h2>4. Account Responsibilities</h2>
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
          Services are billed in advance. Invoices are due upon receipt. Failure to pay within 14 days of the due date may result in service suspension. We reserve the right to suspend or terminate services for overdue accounts.
        </p>

        <h2>7. Order Cancellation and Refunds</h2>
        <p>
          Orders are accepted when your payment is authorised and we issue a confirmation email. You may request cancellation before service provisioning or domain registration by contacting support at <a href="mailto:hello@hostingocean.co.uk">hello@hostingocean.co.uk</a> or via our client area.
        </p>
        <p>
          We offer a 30-day money-back guarantee on shared hosting plans, provided the service has not been provisioned or the domain registered. Refunds are processed within 14 days of approval. VPS, dedicated servers and domain registrations are excluded from this guarantee once the service or domain has been provisioned or registered. For the full refund and return policy, please see our <a href="/refund-return-policy">Refund and Return Policy</a>.
        </p>

        <h2>8. Limitation of Liability</h2>
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

        <h2>10. Governing Law and Dispute Resolution</h2>
        <p>
          These Terms are governed by the laws of the Islamic Republic of Pakistan. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Rawalpindi, Pakistan.
        </p>

        <h2>11. Contact</h2>
        <p>
          For questions about these Terms, email <a href="mailto:hello@hostingocean.co.uk">hello@hostingocean.co.uk</a> or open a support ticket at <a href="https://my.hostingocean.co.uk/submitticket.php" target="_blank" rel="noreferrer">my.hostingocean.co.uk</a>.
        </p>
      </div>
    </section>
  );
}
