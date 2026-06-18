export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;        // selling price in PKR
  oldPrice?: number;    // optional "was" price for a discount badge
  badge?: string;       // e.g. "Best Seller", "New"
  emoji: string;        // simple visual placeholder (swap for real images later)
  shortDescription: string;
  features: string[];
  inStock: boolean;
};

/**
 * PLACEHOLDER PRODUCTS — edit prices, names and features to match your real stock.
 * To use real photos later: add images to /public/products and replace the
 * `emoji` field usage in ProductCard with a Next <Image>.
 */
export const products: Product[] = [
  {
    slug: 'bluetooth-audio-glasses',
    name: 'Bluetooth Audio Glasses',
    category: 'Audio',
    price: 4990,
    oldPrice: 6500,
    badge: 'Best Seller',
    emoji: '🕶️',
    shortDescription:
      'Open-ear speakers built into the frame. Take calls and play music without earbuds.',
    features: [
      'Bluetooth 5.3 wireless',
      'Open-ear stereo speakers',
      'Built-in mic for calls',
      'Up to 6 hours playback',
      'UV-protection lenses',
    ],
    inStock: true,
  },
  {
    slug: 'photochromic-smart-lenses',
    name: 'Photochromic Smart Lenses',
    category: 'Lifestyle',
    price: 2990,
    oldPrice: 3990,
    badge: 'New',
    emoji: '🥽',
    shortDescription:
      'Lenses that auto-darken in sunlight and clear up indoors. Day-to-night in one pair.',
    features: [
      'Auto light-adjusting lenses',
      'Blue-light filter for screens',
      'Lightweight TR90 frame',
      'Anti-glare coating',
      'Unisex design',
    ],
    inStock: true,
  },
  {
    slug: 'hd-camera-glasses',
    name: 'HD Camera Glasses',
    category: 'Camera',
    price: 8990,
    badge: 'Premium',
    emoji: '📸',
    shortDescription:
      'Capture point-of-view photos and 1080p video hands-free, straight from your glasses.',
    features: [
      '1080p HD video capture',
      'One-tap photo button',
      '32GB storage (expandable)',
      'USB-C fast charging',
      'Discreet lens design',
    ],
    inStock: true,
  },
  {
    slug: 'sport-bluetooth-glasses',
    name: 'Sport Bluetooth Glasses',
    category: 'Audio',
    price: 5490,
    emoji: '🏃',
    shortDescription:
      'Sweat-resistant audio glasses for running and cycling. Stay aware of traffic while you ride.',
    features: [
      'IPX5 sweat & splash resistant',
      'Open-ear safe listening',
      'Secure non-slip grip',
      'Up to 7 hours battery',
      'Polarized sport lenses',
    ],
    inStock: true,
  },
  {
    slug: 'blue-light-computer-glasses',
    name: 'Blue-Light Computer Glasses',
    category: 'Lifestyle',
    price: 1490,
    oldPrice: 1990,
    emoji: '💻',
    shortDescription:
      'Reduce eye strain from long screen hours. Perfect for office, gaming and study.',
    features: [
      'Blocks harmful blue light',
      'Reduces eye fatigue',
      'Anti-reflective coating',
      'Lightweight flexible frame',
      'Stylish unisex look',
    ],
    inStock: true,
  },
  {
    slug: 'translation-smart-glasses',
    name: 'AI Translation Glasses',
    category: 'Smart',
    price: 14990,
    badge: 'Coming Soon',
    emoji: '🤖',
    shortDescription:
      'Real-time voice translation and a display in your lens. The future, available on pre-order.',
    features: [
      'Real-time voice translation',
      'In-lens micro display',
      'Voice assistant support',
      'All-day battery',
      'Pre-order now, ships soon',
    ],
    inStock: false,
  },
];
