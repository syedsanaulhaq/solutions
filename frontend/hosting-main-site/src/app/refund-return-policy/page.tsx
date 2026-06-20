import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund and Return Policy',
  description: 'HostingOcean Refund and Return Policy — refund timing, cancellation rules and eligibility.',
};

export default function RefundReturnPolicyPage() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
        <h1>Refund and Return Policy</h1>
        <p className="text-muted-foreground text-sm">Last updated: January 2025</p>

        <h2>1. Eligibility</h2>
        <p>
          Refunds are available for shared hosting plans under our 30-day money-back guarantee, provided the service has not been provisioned and the domain has not been registered.
          VPS, dedicated servers and domain registrations are excluded once provisioned or registered.
        </p>

        <h2>2. Order Cancellation</h2>
        <p>
          You may request cancellation before service provisioning or domain registration by emailing <a href="mailto:hello@hostingocean.co.uk">hello@hostingocean.co.uk</a> or by opening a support ticket through our client area.
        </p>

        <h2>3. Refund Turnaround Time</h2>
        <p>
          Approved refunds are processed within 14 days of approval and returned to the original payment method where possible.
        </p>

        <h2>4. Non-Refundable Items</h2>
        <p>
          Domain registrations, renewals, add-ons, and services that have already been provisioned are non-refundable unless required by law.
        </p>

        <h2>5. Contact</h2>
        <p>
          For refund or cancellation questions, email <a href="mailto:hello@hostingocean.co.uk">hello@hostingocean.co.uk</a>.
        </p>
      </div>
    </section>
  );
}