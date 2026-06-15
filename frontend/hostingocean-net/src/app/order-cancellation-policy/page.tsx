import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Cancellation Policy — HostingOcean.net',
  description: 'HostingOcean.net order cancellation policy for pre-provisioning and active services.',
};

export default function OrderCancellationPolicyPage() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
        <h1>Order Cancellation Policy</h1>
        <p className="text-muted-foreground text-sm">Last updated: June 2026</p>

        <h2>1. Cancellation Before Provisioning</h2>
        <p>
          You may request order cancellation before service provisioning or domain registration.
          If no provisioning has started, the order may be cancelled and processed under our refund policy.
        </p>

        <h2>2. Cancellation After Provisioning</h2>
        <p>
          After a hosting service is provisioned, you may still request account cancellation at any time.
          Refund eligibility for cancelled services is determined under our <a href="/refund-return-policy">Refund and Return Policy</a>.
        </p>

        <h2>3. Domain and Third-Party Services</h2>
        <p>
          Orders that include domain registration, domain transfer, SSL issuance, or other third-party services cannot be cancelled once submitted to the upstream provider.
        </p>

        <h2>4. How to Request Cancellation</h2>
        <p>
          Send your cancellation request from your registered account email to <a href="mailto:info@hostingocean.net">info@hostingocean.net</a>{' '}
          or call <a href="tel:+923339141680">+92 333 9141680</a>.
          Include your full name, service details, and preferred cancellation date.
        </p>

        <h2>5. Effective Date</h2>
        <p>
          Cancellation requests are considered effective once acknowledged by our team.
          You remain responsible for charges accrued up to the effective cancellation time.
        </p>
      </div>
    </section>
  );
}