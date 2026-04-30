/**
 * Analytics event tracking for HostingOcean main site.
 * Calls window.gtag() for GA4 when available.
 */

type EventName =
  | 'cta_click'
  | 'plan_view'
  | 'plan_order_click'
  | 'domain_search'
  | 'contact_submit'
  | 'blog_read'
  | 'outbound_link'
  | 'page_scroll_depth';

interface EventParams {
  category?: string;
  label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
}

export function track(event: EventName, params: EventParams = {}) {
  if (typeof window === 'undefined') return;
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', event, {
      event_category: params.category ?? 'engagement',
      event_label: params.label,
      value: params.value,
      ...params,
    });
  }
}

export const trackCTAClick = (label: string) =>
  track('cta_click', { category: 'conversion', label });

export const trackPlanView = (planName: string) =>
  track('plan_view', { category: 'hosting', label: planName });

export const trackPlanOrder = (planName: string, price: number) =>
  track('plan_order_click', { category: 'conversion', label: planName, value: price });

export const trackDomainSearch = (query: string) =>
  track('domain_search', { category: 'domains', label: query });

export const trackContactSubmit = (subject: string) =>
  track('contact_submit', { category: 'lead', label: subject });

export const trackBlogRead = (title: string) =>
  track('blog_read', { category: 'content', label: title });

export const trackOutboundLink = (url: string) =>
  track('outbound_link', { category: 'outbound', label: url });
