import type { Metadata } from 'next';
import { BadgeInfo, BookMarked, FileText, Handshake, ShieldCheck, Scale, ScrollText, TriangleAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service — HostingOcean.net',
  description: 'HostingOcean.net terms of service — the rules and conditions governing use of our hosting services.',
};

const sections = [
  {
    id: 'acceptance',
    title: '1. Introduction',
    icon: BadgeInfo,
    content: [
      'HostingOcean.net is owned and operated by HostingOcean.net, a registered business in Pakistan. Our registered office and principal place of business are in Bahria Town, Rawalpindi, Pakistan.',
      'We offer this website, including all information, tools, products and services available from this website, to you conditioned upon your acceptance of all terms, conditions, policies and notices stated here.',
      'If you have any problems placing your order on our website, or require support after placing an order through our website, please contact us at info@hostingocean.net or call +92 333 9141680.',
    ],
  },
  {
    id: 'applicability',
    title: '2. Applicability and Updates',
    icon: ScrollText,
    bullets: [
      'By visiting our site and/or purchasing something from us, you engage in our Service and agree to be bound by these Terms and Conditions and the policies referenced here.',
      'These Terms and Conditions apply to all users of the site, including browsers, vendors, customers, merchants and contributors of content.',
      'You represent that you are of legal age to form a binding contract and are not barred from receiving products or services under the laws of Pakistan or another applicable jurisdiction.',
      'We may update these Terms and Conditions from time to time, and each time you place an order on our website you agree to the latest version in effect at that time.',
    ],
  },
  {
    id: 'usage',
    title: '3. Terms of Usage',
    icon: ShieldCheck,
    bullets: [
      'Use this website or its content for any unlawful purpose.',
      'Solicit others to perform or participate in any unlawful acts.',
      'Violate international, federal, provincial or state laws, regulations and rules.',
      'Infringe upon our intellectual property rights or the intellectual property rights of others.',
      'Harass, abuse, insult, harm, defame, slander, disparage, intimidate or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin or disability.',
      'Submit false or misleading information.',
      'Upload or transmit viruses or malicious code that may affect the website, related websites or the internet.',
      'Collect or track the personal information of others or spam, phish, pharm, pretext, spider, crawl or scrape.',
      'Use the service for any obscene or immoral purpose.',
    ],
    closing:
      'We reserve the right to terminate your use of the Service or any related website for violating any prohibited use.',
  },
  {
    id: 'ip',
    title: '4. Intellectual Property',
    icon: BookMarked,
    content: [
      'This website and its related software and content, including images and designs, are the intellectual property of HostingOcean.net and are exclusively owned by us.',
      'The structure, organization and code of the website and its related software contain valuable trade secrets and confidential information of HostingOcean.net.',
      'Except as expressly stated here, these Terms and Conditions do not grant you any intellectual property rights in the website or its related software, and all rights are reserved by HostingOcean.net.',
    ],
  },
  {
    id: 'liability',
    title: '5. Indemnity and Limitation of Liability',
    icon: Handshake,
    bullets: [
      'You agree to indemnify, defend and hold harmless HostingOcean.net and its parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees from claims arising from your breach of these Terms or your violation of any law or third-party rights.',
      'We do not guarantee the accuracy, timeliness, performance, completeness or suitability of information and materials on this website for any particular purpose, and we expressly exclude liability for inaccuracies or errors to the fullest extent permitted by law.',
      'Your use of any information or materials on this website is entirely at your own risk, and it is your responsibility to ensure that the products, services or information meet your needs.',
      'To the extent permitted by law, we disclaim all warranties, whether express or implied, including the implied warranties of merchantability, fitness for a particular purpose, title and non-infringement.',
      'We reserve the right to not process an order you place on our website if we no longer hold stock, cannot ship to your location, the goods or services are unavailable, or for any reason outside our control.',
    ],
  },
  {
    id: 'termination',
    title: '6. Termination',
    icon: TriangleAlert,
    content: [
      'We may immediately change or terminate your access to our products, services, this website or any online membership with us, with or without notice, at any time and without liability to you or any third party.',
      'We reserve the right to terminate your access if you have provided false or misleading registration information, interfered with other users or administration of our services, acted upon a request by law enforcement or governmental authorities, or otherwise violated these Terms and Conditions.',
    ],
  },
  {
    id: 'severability',
    title: '7. Severability and Waiver',
    icon: FileText,
    content: [
      'If any portion of these terms is found to be unenforceable, the unenforceable portion will be deemed amended to the minimum extent necessary to make it enforceable, and if it cannot be made enforceable it will be severed while the remaining portion stays in full force and effect.',
      'If we fail to enforce any of these terms, it will not be considered a waiver.',
      'Any amendment to or waiver of these terms must be made in writing and signed by us.',
    ],
  },
  {
    id: 'law',
    title: '8. Governing Law',
    icon: Scale,
    content: [
      'Our Terms and Conditions are governed by the laws of the Islamic Republic of Pakistan.',
      'You agree that the courts of Rawalpindi, Pakistan, including any consumer court with jurisdiction, will have exclusive jurisdiction in any dispute you have with us.',
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <main className="bg-gradient-to-b from-slate-50 via-white to-emerald-50/30 dark:from-slate-950 dark:via-slate-950 dark:to-emerald-950/20">
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.14),_transparent_34%),radial-gradient(circle_at_20%_20%,_rgba(34,197,94,0.08),_transparent_28%)]" />
        <div className="relative max-w-5xl mx-auto">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr] items-end">
            <div>
              <span className="inline-flex items-center rounded-full border border-emerald-200 bg-white/80 px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur dark:border-emerald-900/40 dark:bg-slate-900/70 dark:text-emerald-300">
                HostingOcean.net Legal Terms
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-slate-950 dark:text-white">
                Terms of Service
              </h1>
              <p className="mt-4 max-w-2xl text-base sm:text-lg leading-7 text-slate-600 dark:text-slate-300">
                Clear, professional terms for HostingOcean.net customers. These terms define how our hosting, VPS, dedicated server
                and domain services work, along with your rights and our responsibilities.
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-200/80 bg-white/90 p-5 shadow-lg shadow-emerald-950/5 backdrop-blur dark:border-emerald-900/40 dark:bg-slate-900/80">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
                  <p className="text-emerald-700 dark:text-emerald-300 font-semibold">Business</p>
                  <p className="mt-1 text-slate-700 dark:text-slate-200">Registered in Pakistan</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
                  <p className="text-slate-500 dark:text-slate-400 font-semibold">Support</p>
                  <p className="mt-1 text-slate-700 dark:text-slate-200">24/7 Pakistan Time</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
                  <p className="text-slate-500 dark:text-slate-400 font-semibold">Email</p>
                  <p className="mt-1 text-slate-700 dark:text-slate-200">info@hostingocean.net</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50">
                  <p className="text-slate-500 dark:text-slate-400 font-semibold">Phone</p>
                  <p className="mt-1 text-slate-700 dark:text-slate-200">+92 333 9141680</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-8">
            {[
              { label: 'Company', value: 'HostingOcean.net' },
              { label: 'Jurisdiction', value: 'Bahria Town, Rawalpindi, Pakistan' },
              { label: 'Support', value: 'info@hostingocean.net' },
              { label: 'Phone', value: '+92 333 9141680' },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">{item.label}</p>
                <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <article key={section.id} className="rounded-3xl border border-border bg-white/90 p-6 shadow-sm backdrop-blur dark:bg-slate-950/70">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-700 dark:text-emerald-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl font-bold text-slate-950 dark:text-white">{section.title}</h2>
                      <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        {section.content?.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                        {section.bullets ? (
                          <ul className="grid gap-2 pl-5">
                            {section.bullets.map((bullet) => (
                              <li key={bullet} className="list-disc">
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        {section.closing ? (
                          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/20 dark:text-amber-100">
                            {section.closing}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            <article className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm dark:border-emerald-900/60 dark:bg-emerald-950/20">
              <h2 className="text-xl font-bold text-emerald-950 dark:text-white">Need clarification?</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-emerald-900/80 dark:text-emerald-100/80">
                If you have a question about these Terms, or need help before placing an order, email info@hostingocean.net or call
                +92 333 9141680. We aim to keep the terms readable, practical and aligned with the service you actually receive.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
