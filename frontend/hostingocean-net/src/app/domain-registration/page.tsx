import { DomainSearchBar } from '@/components/DomainSearchBar';
import { CTASection } from '@/components/CTASection';
import domainPricing from '@/data/domain-pricing.json';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Domain Registration Pakistan — .pk, .com.pk & More',
  description:
    'Register .pk, .com.pk, .net.pk domains and international TLDs. Fast registration and DNS management.',
};

function PriceTable({ title, items }: { title: string; items: typeof domainPricing.popular }) {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="bg-[#15803D]/5 border-b border-border px-5 py-3">
        <h3 className="font-semibold text-sm">{title}</h3>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-muted/40">
          <tr>
            <th className="text-left px-5 py-2.5 font-medium text-muted-foreground">TLD</th>
            <th className="text-right px-5 py-2.5 font-medium text-muted-foreground">Registration</th>
            <th className="text-right px-5 py-2.5 font-medium text-muted-foreground">Renewal</th>
            <th className="text-right px-5 py-2.5 font-medium text-muted-foreground">Transfer</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {items.map((d) => (
            <tr key={d.tld} className="hover:bg-accent/40 transition-colors">
              <td className="px-5 py-3 font-semibold text-[#15803D]">{d.tld}</td>
              <td className="px-5 py-3 text-right">Rs. {d.registration.toLocaleString('en-PK')}</td>
              <td className="px-5 py-3 text-right text-muted-foreground">Rs. {d.renewal.toLocaleString('en-PK')}</td>
              <td className="px-5 py-3 text-right text-muted-foreground">Rs. {d.transfer.toLocaleString('en-PK')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DomainRegistrationPage() {
  return (
    <>
      <section className="py-20 px-4 bg-gradient-to-b from-[#071a0b] to-[#0d2b14] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">
            Domain Registration
          </h1>
          <p className="text-lg text-green-100 mb-10">
            Secure your Pakistani domain name today. Register .pk, .com.pk, .net.pk and international TLDs.
            Free with qualifying hosting plans.
          </p>
          <DomainSearchBar />
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          <PriceTable title="Popular Pakistani & International Domains" items={domainPricing.popular} />
          <PriceTable title="Business Domains" items={domainPricing.business} />
          <PriceTable title="Creative Domains" items={domainPricing.creative} />
        </div>
      </section>

      <CTASection
          heading="Register your domain today"
          subheading="Search and register .pk, .com.pk and international domain names quickly and securely."
        primaryLabel="View Hosting Plans"
        primaryHref="/web-hosting"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}
