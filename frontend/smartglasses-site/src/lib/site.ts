/**
 * Central site configuration.
 * Edit these values to change contact details across the whole site.
 */
export const site = {
  name: 'SmartGlasses',
  tagline: 'Smart Glasses, Imported for Pakistan',
  description:
    'Bluetooth audio glasses, photochromic smart lenses and camera glasses — imported and delivered across Pakistan with Cash on Delivery and a 7-day replacement warranty.',
  url: 'https://smartglasses.hostingocean.net',

  // Contact
  whatsappNumber: '923339141680', // international format, no +, no spaces
  whatsappDisplay: '0333 9141680',
  email: 'order@smartglasses.hostingocean.net',
  city: 'Bahria Town, Rawalpindi',

  // Social (optional — leave empty to hide)
  instagram: '',
  facebook: '',
} as const;

/**
 * Build a WhatsApp click-to-chat link with an optional pre-filled message.
 */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * WhatsApp link pre-filled to order a specific product.
 */
export function orderLink(productName: string, price?: number) {
  const priceText = price ? ` (Rs. ${price.toLocaleString('en-PK')})` : '';
  return whatsappLink(
    `Hi ${site.name}! I want to order: ${productName}${priceText}. Please share details and delivery time.`,
  );
}
