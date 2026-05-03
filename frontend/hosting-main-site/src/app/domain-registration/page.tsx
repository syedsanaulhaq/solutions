import { DomainSearchBar } from '@/components/DomainSearchBar';
import { CTASection } from '@/components/CTASection';
import domainPricing from '@/data/domain-pricing.json';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Domain Registration — Search & Register UK Domains',
  description:
    'Register .co.uk, .com, .uk and hundreds of other domain extensions. Competitive UK pricing with free DNS management and WHOIS privacy.',
};

export default function DomainRegistrationPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#0F172A] to-[#1e2d4a] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-[#38BDF8]/30 bg-[#38BDF8]/10 text-[#38BDF8] text-xs font-semibold mb-6 uppercase tracking-wide">
            Domain Registration
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5">
            Find Your Perfect{' '}
            <span className="text-[#38BDF8]">Domain Name</span>
          </h1>
          <p className="text-lg text-slate-300 mb-8">
            Register .co.uk from £5.99/year. Free DNS management, email forwarding and WHOIS privacy included.
          </p>
          <DomainSearchBar />
        </div>
      </section>

      {/* Pricing table */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-center mb-10">
            Domain Pricing
          </h2>

          {/* Popular TLDs */}
          <h3 className="text-lg font-semibold mb-4">Popular Extensions</h3>
          <div className="rounded-xl border border-border overflow-hidden mb-8">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Extension</th>
                  <th className="px-4 py-3 text-right font-semibold">Register</th>
                  <th className="px-4 py-3 text-right font-semibold">Renew</th>
                  <th className="px-4 py-3 text-right font-semibold">Transfer</th>
                  <th className="px-4 py-3 text-right font-semibold"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {domainPricing.popular.map((d) => (
                  <tr key={d.tld} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-[#2563EB]">{d.tld}</td>
                    <td className="px-4 py-3 text-right">£{d.registration.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">£{d.renewal.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">£{d.transfer.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">
                      <a
                        href={`https://whmcs.hostingocean.co.uk/cart.php?a=add&domain=register&query=${encodeURIComponent(d.tld)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-[#2563EB] hover:underline"
                      >
                        Register
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Business TLDs */}
          <h3 className="text-lg font-semibold mb-4">Business Extensions</h3>
          <div className="rounded-xl border border-border overflow-hidden mb-8">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Extension</th>
                  <th className="px-4 py-3 text-right font-semibold">Register</th>
                  <th className="px-4 py-3 text-right font-semibold">Renew</th>
                  <th className="px-4 py-3 text-right font-semibold">Transfer</th>
                  <th className="px-4 py-3 text-right font-semibold"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {domainPricing.business.map((d) => (
                  <tr key={d.tld} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-[#2563EB]">{d.tld}</td>
                    <td className="px-4 py-3 text-right">£{d.registration.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">£{d.renewal.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">£{d.transfer.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right">
                      <a
                        href={`https://whmcs.hostingocean.co.uk/cart.php?a=add&domain=register&query=${encodeURIComponent(d.tld)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-[#2563EB] hover:underline"
                      >
                        Register
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CTASection
        heading="Got a Domain? Add Hosting."
        subheading="Pair your domain with UK web hosting from £2.99/month."
        primaryLabel="View Hosting Plans"
        primaryHref="/web-hosting"
        secondaryLabel="Register a Domain"
        secondaryHref="https://whmcs.hostingocean.co.uk/cart.php?a=add&domain=register"
      />
    </>
  );
}
