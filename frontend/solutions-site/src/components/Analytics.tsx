'use client';

import Script from 'next/script';

/**
 * Analytics component — loads Plausible and/or GA4 depending on env vars.
 * Injected once in the root layout as a client component.
 *
 * Required env vars (set in .env.local):
 *   NEXT_PUBLIC_PLAUSIBLE_DOMAIN  — e.g. solutions.hostingocean.co.uk
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID — e.g. G-XXXXXXXXXX
 *   NEXT_PUBLIC_CLARITY_PROJECT_ID — e.g. abc123xyz
 */

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export function Analytics() {
  return (
    <>
      {/* ── Plausible Analytics ─────────────────────────── */}
      {plausibleDomain && (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.tagged-events.js"
          strategy="afterInteractive"
        />
      )}

      {/* ── Google Analytics 4 ──────────────────────────── */}
      {gaMeasurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {/* ── Microsoft Clarity ───────────────────────────── */}
      {clarityProjectId && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window,document,"clarity","script","${clarityProjectId}");
          `}
        </Script>
      )}
    </>
  );
}
