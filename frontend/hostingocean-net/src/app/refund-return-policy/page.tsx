import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund and Return Policy — HostingOcean.net',
  description: 'HostingOcean.net refund and return policy with eligibility and refund processing turnaround time.',
};

export default function RefundReturnPolicyPage() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
        <h1>Refund and Return Policy</h1>
        <p className="text-muted-foreground text-sm">Last updated: June 2026</p>

        <h2>1. Refund Eligibility</h2>
        <p>
          Shared hosting plans are covered by our 30-day money-back guarantee from the original purchase date, subject to this policy.
          VPS, dedicated servers, domain registrations, renewals, setup fees, and third-party add-ons are non-refundable once provisioned.
        </p>

        <h2>2. Refund Processing Turnaround Time</h2>
        <p>
          Once a refund request is approved, we process the refund within <strong>7 to 14 business days</strong>.
          Refunds are issued to the original payment method where possible.
          Banking and payment gateway timelines may vary beyond our control.
        </p>

        <h2>3. How to Request a Refund</h2>
        <p>
          To request a refund, email <a href="mailto:info@hostingocean.net">info@hostingocean.net</a> or contact us at{' '}
          <a href="tel:+923339141680">+92 333 9141680</a> with your account email, order details, and reason for the request.
        </p>

        <h2>4. Non-Refundable Cases</h2>
        <ul>
          <li>Domain names already registered or renewed</li>
          <li>Services that have been fully provisioned and consumed</li>
          <li>Custom development, migration, or one-time professional service fees</li>
          <li>Suspensions or terminations due to Terms of Service violations</li>
        </ul>
      </div>
    </section>
  );
}