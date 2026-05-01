/**
 * WHMCS direct link helpers.
 * All user-facing actions are direct HTTPS links — no API calls required for navigation.
 * For API operations (domain check, order status), use the API routes in /app/api/.
 */

const BASE = process.env.NEXT_PUBLIC_WHMCS_URL || 'https://hostingocean.co.uk';

export const whmcs = {
  /** Client area homepage */
  clientArea: `${BASE}/clientarea.php`,

  /** Active services list */
  services: `${BASE}/clientarea.php?action=services`,

  /** Manage domains */
  domains: `${BASE}/clientarea.php?action=domains`,

  /** Billing / invoices */
  invoices: `${BASE}/clientarea.php?action=invoices`,

  /** Open a support ticket */
  submitTicket: `${BASE}/submitticket.php`,

  /** View support tickets */
  tickets: `${BASE}/supporttickets.php`,

  /** Knowledge base */
  knowledgebase: `${BASE}/knowledgebase.php`,

  /** Announcements */
  announcements: `${BASE}/announcements.php`,

  /** Shopping cart */
  cart: `${BASE}/cart.php`,

  /** Order specific product by PID */
  orderProduct: (pid: number) => `${BASE}/cart.php?a=add&pid=${pid}`,

  /** Domain registration search */
  registerDomain: (query?: string) =>
    query
      ? `${BASE}/cart.php?a=add&domain=register&query=${encodeURIComponent(query)}`
      : `${BASE}/cart.php?a=add&domain=register`,

  /** Domain transfer */
  transferDomain: (query?: string) =>
    query
      ? `${BASE}/cart.php?a=add&domain=transfer&query=${encodeURIComponent(query)}`
      : `${BASE}/cart.php?a=add&domain=transfer`,
};
