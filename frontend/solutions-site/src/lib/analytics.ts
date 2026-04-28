/**
 * Client-side analytics event tracking utilities.
 * Works with Plausible, GA4, or any custom analytics provider.
 * Safe to call server-side (no-ops if window is unavailable).
 */

// ---------------------------------------------------------------------------
// Plausible helper (replaces window.plausible if available)
// ---------------------------------------------------------------------------
type PlausibleFn = (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;

function getPlausible(): PlausibleFn | null {
  if (typeof window === 'undefined') return null;
  return (window as unknown as { plausible?: PlausibleFn }).plausible ?? null;
}

// ---------------------------------------------------------------------------
// GA4 gtag helper
// ---------------------------------------------------------------------------
type GtagFn = (command: string, eventName: string, params?: Record<string, unknown>) => void;

function getGtag(): GtagFn | null {
  if (typeof window === 'undefined') return null;
  return (window as unknown as { gtag?: GtagFn }).gtag ?? null;
}

// ---------------------------------------------------------------------------
// Generic track function — fires both Plausible and GA4 if present
// ---------------------------------------------------------------------------
export function track(
  eventName: string,
  props: Record<string, string | number | boolean> = {},
): void {
  try {
    getPlausible()?.(eventName, { props });
    getGtag()?.('event', eventName, props);
  } catch {
    // Never throw — analytics must not break the app
  }
}

// ---------------------------------------------------------------------------
// Pre-defined event helpers
// ---------------------------------------------------------------------------

/** Quote form submitted */
export function trackQuoteSubmit(service: string, budget: string): void {
  track('quote_submit', { service, budget });
}

/** Pricing calculator opened */
export function trackCalculatorOpen(): void {
  track('calculator_open');
}

/** Pricing calculator completed (result shown) */
export function trackCalculatorResult(service: string, complexity: string): void {
  track('calculator_result', { service, complexity });
}

/** CTA button clicked */
export function trackCTAClick(label: string, location: string): void {
  track('cta_click', { label, location });
}

/** Blog article reading completion (fired when user reaches bottom of article) */
export function trackBlogRead(slug: string, category: string): void {
  track('blog_read', { slug, category });
}

/** Newsletter signup submitted */
export function trackNewsletterSignup(source: string): void {
  track('newsletter_signup', { source });
}

/** Outbound link clicked */
export function trackOutboundLink(url: string): void {
  track('outbound_click', { url });
}

/** Social share button clicked */
export function trackSocialShare(platform: string, contentType: string): void {
  track('social_share', { platform, content_type: contentType });
}
