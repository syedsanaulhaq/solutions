/**
 * Central site configuration.
 * Edit these values to change contact details across the whole site.
 */
export const site = {
  name: 'SmartGlasses',
  tagline: 'Smart Glasses & Eyewear, Imported for Pakistan',
  description:
    'Smart glasses, sunglasses, frames, blue-light, sports, reading and kids eyewear — imported and delivered across Pakistan with Cash on Delivery, Bank Transfer and a 7-day replacement warranty.',
  url: 'https://smartglasses.hostingocean.net',

  // Contact
  whatsappNumber: '923339141680', // international format, no +, no spaces
  whatsappDisplay: '0333 9141680',
  email: 'order@smartglasses.hostingocean.net',
  city: 'Bahria Town, Rawalpindi',

  // Social (optional — leave empty to hide)
  instagram: '',
  facebook: '',

  // Free shipping threshold (PKR). Set to 0 to always charge shipping.
  freeShippingOver: 3000,
  shippingFlatRate: 200,
} as const;

/**
 * Demo video shown on the homepage.
 * - Set `youtubeId` to a YouTube video ID to embed it (e.g. 'dQw4w9WgXcQ'),
 *   OR set `mp4Url` to a self-hosted file in /public (e.g. '/videos/demo.mp4').
 * - If both are empty, an attractive placeholder is shown instead.
 */
export const demoVideo = {
  youtubeId: '',
  mp4Url: '',
  poster: '', // optional poster image for the mp4, e.g. '/videos/demo-poster.jpg'
  heading: 'See the Smart Glasses in Action',
  subheading: 'Watch how our Bluetooth audio glasses let you take calls and play music hands-free.',
} as const;

/**
 * Bank transfer details shown at checkout.
 * EDIT THESE with your real account. Drop the QR image at /public/payment-qr.png
 * (or change `qrImage` below). Leave `qrImage` as '' to hide the QR.
 */
export const bankTransfer = {
  bankName: 'Meezan Bank',
  accountTitle: 'Hosting Ocean',
  accountNumber: '08020103613868',
  iban: 'PK32MEZN0008020103613868',
  swift: 'MEZNPKKA',
  qrImage: '/payment-qr.png',       // drop your QR here; '' hides it
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

/** Shipping cost for a given subtotal (PKR). */
export function shippingFor(subtotal: number) {
  if (subtotal <= 0) return 0;
  if (site.freeShippingOver && subtotal >= site.freeShippingOver) return 0;
  return site.shippingFlatRate;
}
