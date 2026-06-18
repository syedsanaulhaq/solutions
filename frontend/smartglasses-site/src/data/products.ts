export type Product = {
  slug: string;
  name: string;
  categorySlug: string;
  price: number;        // selling price in PKR
  oldPrice?: number;    // optional "was" price for a discount badge
  badge?: string;       // e.g. "Best Seller", "New"
  emoji: string;        // visual placeholder (swap for real images later)
  shortDescription: string;
  description: string;
  features: string[];
  image?: string;
  inStock: boolean;
  featured?: boolean;   // shown on the homepage "Featured" row
};

/**
 * PLACEHOLDER CATALOG — edit prices, names and features to match real stock.
 * Product visuals are mapped in productImageBySlug below.
 */
export const products: Product[] = [
  // ─── Smart Glasses ──────────────────────────────────────────────
  {
    slug: 'bluetooth-audio-glasses',
    name: 'Bluetooth Audio Glasses',
    categorySlug: 'smart-glasses',
    price: 4990,
    oldPrice: 6500,
    badge: 'Best Seller',
    emoji: '🕶️',
    shortDescription: 'Open-ear speakers built into the frame. Calls and music without earbuds.',
    description:
      'Listen to music and take calls straight from your glasses with built-in open-ear speakers. Bluetooth 5.3 keeps a stable connection while the lightweight frame stays comfortable all day. UV-protection lenses make them great indoors and out.',
    features: [
      'Bluetooth 5.3 wireless',
      'Open-ear stereo speakers',
      'Built-in mic for calls',
      'Up to 6 hours playback',
      'UV-protection lenses',
      'USB-C charging',
    ],
    inStock: true,
    featured: true,
  },
  {
    slug: 'hd-camera-glasses',
    name: 'HD Camera Glasses',
    categorySlug: 'smart-glasses',
    price: 8990,
    badge: 'Premium',
    emoji: '📸',
    shortDescription: 'Capture point-of-view photos and 1080p video hands-free.',
    description:
      'Record life from your point of view. A discreet built-in camera shoots 1080p video and crisp photos with a single tap, storing everything on 32GB of expandable memory. Perfect for travel, vlogging and capturing moments hands-free.',
    features: [
      '1080p HD video capture',
      'One-tap photo button',
      '32GB storage (expandable)',
      'USB-C fast charging',
      'Discreet lens design',
      'Photo + video modes',
    ],
    inStock: true,
    featured: true,
  },
  {
    slug: 'sport-bluetooth-glasses',
    name: 'Sport Bluetooth Glasses',
    categorySlug: 'smart-glasses',
    price: 5490,
    emoji: '🏃',
    shortDescription: 'Sweat-resistant audio glasses for running and cycling.',
    description:
      'Stay aware of traffic while you train. Open-ear audio lets you hear your surroundings, while the IPX5 sweat-resistant build and non-slip grip keep them secure through any workout. Polarized sport lenses cut glare on the road.',
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
    slug: 'translation-smart-glasses',
    name: 'AI Translation Glasses',
    categorySlug: 'smart-glasses',
    price: 14990,
    badge: 'Coming Soon',
    emoji: '🤖',
    shortDescription: 'Real-time voice translation with an in-lens display.',
    description:
      'The future of eyewear. Real-time voice translation appears on a micro display inside the lens, with a built-in voice assistant and all-day battery. Reserve yours now on pre-order and be first to get it when stock lands.',
    features: [
      'Real-time voice translation',
      'In-lens micro display',
      'Voice assistant support',
      'All-day battery',
      'Pre-order now, ships soon',
    ],
    inStock: false,
  },

  // ─── Sunglasses ─────────────────────────────────────────────────
  {
    slug: 'classic-aviator-sunglasses',
    name: 'Classic Aviator Sunglasses',
    categorySlug: 'sunglasses',
    price: 1990,
    oldPrice: 2990,
    badge: 'Best Seller',
    emoji: '😎',
    shortDescription: 'Timeless metal aviators with full UV400 protection.',
    description:
      'A style that never goes out of fashion. Lightweight metal frame, comfortable nose pads and UV400 lenses that block 100% of harmful rays. Suits almost every face shape.',
    features: ['UV400 protection', 'Lightweight metal frame', 'Spring hinges', 'Unisex classic style'],
    inStock: true,
    featured: true,
  },
  {
    slug: 'polarized-wayfarer-sunglasses',
    name: 'Polarized Wayfarer',
    categorySlug: 'sunglasses',
    price: 2490,
    emoji: '🕶️',
    shortDescription: 'Glare-cutting polarized lenses in an iconic frame.',
    description:
      'Polarized lenses cut glare from roads, water and screens for sharper, more comfortable vision. The durable acetate wayfarer frame is a modern classic.',
    features: ['Polarized anti-glare lenses', 'UV400 protection', 'Durable acetate frame', 'Includes case & cloth'],
    inStock: true,
  },
  {
    slug: 'oversized-fashion-sunglasses',
    name: 'Oversized Fashion Sunglasses',
    categorySlug: 'sunglasses',
    price: 1790,
    badge: 'New',
    emoji: '🥸',
    shortDescription: 'Bold oversized frames for maximum style and coverage.',
    description:
      'Make a statement and protect more of your face. Oversized gradient lenses with full UV protection and a lightweight, comfortable fit.',
    features: ['Oversized gradient lenses', 'UV400 protection', 'Lightweight comfort fit', 'On-trend design'],
    inStock: true,
  },
  {
    slug: 'retro-round-sunglasses',
    name: 'Retro Round Sunglasses',
    categorySlug: 'sunglasses',
    price: 1590,
    emoji: '🟡',
    shortDescription: 'Vintage round frames with a modern finish.',
    description:
      'Channel a retro vibe with slim round metal frames and tinted UV-protection lenses. Light, stylish and easy to wear every day.',
    features: ['UV400 protection', 'Slim round metal frame', 'Tinted lenses', 'Vintage-inspired look'],
    inStock: true,
  },

  // ─── Eyeglasses & Frames ───────────────────────────────────────
  {
    slug: 'titanium-rimless-frame',
    name: 'Titanium Rimless Frame',
    categorySlug: 'eyeglasses',
    price: 3490,
    badge: 'Premium',
    emoji: '👓',
    shortDescription: 'Ultra-light rimless titanium — barely-there comfort.',
    description:
      'Premium rimless titanium frame that is incredibly light and corrosion-resistant. Ready to fit with your prescription lenses for an almost invisible look.',
    features: ['Titanium rimless build', 'Extremely lightweight', 'Prescription-ready', 'Hypoallergenic'],
    inStock: true,
    featured: true,
  },
  {
    slug: 'acetate-rectangle-frame',
    name: 'Acetate Rectangle Frame',
    categorySlug: 'eyeglasses',
    price: 2290,
    emoji: '🤓',
    shortDescription: 'Smart rectangular frames for a sharp, professional look.',
    description:
      'A versatile acetate frame with a clean rectangular shape that works for office and everyday wear. Sturdy hinges and a comfortable fit, ready for your lenses.',
    features: ['Durable acetate frame', 'Spring hinges', 'Prescription-ready', 'Unisex professional style'],
    inStock: true,
  },
  {
    slug: 'cat-eye-frame',
    name: 'Cat-Eye Frame',
    categorySlug: 'eyeglasses',
    price: 1990,
    emoji: '🐱',
    shortDescription: 'Elegant cat-eye shape that flatters and stands out.',
    description:
      'A chic cat-eye frame that adds character to any look. Lightweight and comfortable, ready to take your prescription lenses.',
    features: ['Stylish cat-eye shape', 'Lightweight frame', 'Prescription-ready', 'Comfortable fit'],
    inStock: true,
  },
  {
    slug: 'clear-round-frame',
    name: 'Clear Round Frame',
    categorySlug: 'eyeglasses',
    price: 1690,
    badge: 'New',
    emoji: '⭕',
    shortDescription: 'Transparent round frames for a trendy minimalist look.',
    description:
      'On-trend transparent round frame that pairs with any outfit. Light, durable and prescription-ready.',
    features: ['Transparent round frame', 'Lightweight & durable', 'Prescription-ready', 'Trendy minimalist style'],
    inStock: true,
  },

  // ─── Blue-Light & Computer ─────────────────────────────────────
  {
    slug: 'blue-light-computer-glasses',
    name: 'Blue-Light Computer Glasses',
    categorySlug: 'blue-light',
    price: 1490,
    oldPrice: 1990,
    badge: 'Best Seller',
    emoji: '💻',
    shortDescription: 'Reduce eye strain from long screen hours.',
    description:
      'Block harmful blue light and reduce eye fatigue during long days at the screen. Lightweight anti-reflective lenses make office, study and gaming more comfortable.',
    features: ['Blocks harmful blue light', 'Reduces eye fatigue', 'Anti-reflective coating', 'Lightweight frame'],
    inStock: true,
    featured: true,
  },
  {
    slug: 'gaming-blue-light-glasses',
    name: 'Gaming Blue-Light Glasses',
    categorySlug: 'blue-light',
    price: 1790,
    emoji: '🎮',
    shortDescription: 'Stay sharp through long gaming sessions.',
    description:
      'Designed for gamers — enhanced blue-light filtering and anti-glare lenses reduce fatigue so you can play longer in comfort. Lightweight wrap fit stays put during intense sessions.',
    features: ['Enhanced blue-light filter', 'Anti-glare lenses', 'Lightweight wrap fit', 'Reduces eye fatigue'],
    inStock: true,
  },
  {
    slug: 'photochromic-smart-lenses',
    name: 'Photochromic Smart Lenses',
    categorySlug: 'blue-light',
    price: 2990,
    oldPrice: 3990,
    badge: 'Smart',
    emoji: '🥽',
    shortDescription: 'Lenses that auto-darken outdoors and clear indoors.',
    description:
      'One pair for day and night. The lenses automatically darken in sunlight and turn clear indoors, with a built-in blue-light filter for screen time. Lightweight TR90 frame.',
    features: ['Auto light-adjusting lenses', 'Blue-light filter', 'Lightweight TR90 frame', 'Anti-glare coating'],
    inStock: true,
  },

  // ─── Sports ────────────────────────────────────────────────────
  {
    slug: 'polarized-sport-wrap',
    name: 'Polarized Sport Wrap',
    categorySlug: 'sports',
    price: 2790,
    badge: 'New',
    emoji: '🏅',
    shortDescription: 'Wraparound polarized glasses for outdoor sport.',
    description:
      'A secure wraparound fit with polarized lenses that cut glare on bright days. Sweat-resistant and lightweight for running, hiking and field sports.',
    features: ['Polarized wrap lenses', 'Secure sport fit', 'Sweat resistant', 'UV400 protection'],
    inStock: true,
  },
  {
    slug: 'cycling-photochromic-glasses',
    name: 'Cycling Photochromic Glasses',
    categorySlug: 'sports',
    price: 3290,
    emoji: '🚴',
    shortDescription: 'Auto-tinting lenses that adapt as you ride.',
    description:
      'Photochromic lenses adjust to changing light so you see clearly from sunrise rides to shaded trails. Lightweight, vented and secure for long distances.',
    features: ['Photochromic auto-tint', 'Vented anti-fog lenses', 'Secure non-slip fit', 'Ultra-light frame'],
    inStock: true,
  },
  {
    slug: 'swimming-anti-fog-goggles',
    name: 'Anti-Fog Swimming Goggles',
    categorySlug: 'sports',
    price: 1290,
    emoji: '🏊',
    shortDescription: 'Leak-proof, anti-fog goggles for the pool.',
    description:
      'Crystal-clear anti-fog lenses with a comfortable leak-proof seal and adjustable strap. UV-protected for indoor and outdoor swimming.',
    features: ['Anti-fog coated lenses', 'Leak-proof silicone seal', 'Adjustable strap', 'UV protection'],
    inStock: true,
  },

  // ─── Reading ───────────────────────────────────────────────────
  {
    slug: 'classic-reading-glasses',
    name: 'Classic Reading Glasses',
    categorySlug: 'reading',
    price: 990,
    badge: 'Value',
    emoji: '📖',
    shortDescription: 'Comfortable everyday readers in multiple strengths.',
    description:
      'Affordable, comfortable reading glasses available in a range of magnification strengths. Lightweight frame with spring hinges for an easy fit.',
    features: ['Multiple strengths (+1.0 to +3.0)', 'Lightweight frame', 'Spring hinges', 'Clear optical lenses'],
    inStock: true,
  },
  {
    slug: 'foldable-reading-glasses',
    name: 'Foldable Reading Glasses',
    categorySlug: 'reading',
    price: 1290,
    emoji: '📚',
    shortDescription: 'Compact folding readers that fit in any pocket.',
    description:
      'Fold down small enough for a pocket or purse and come with a slim carry case. Great for travel and reading on the go.',
    features: ['Compact folding design', 'Includes slim case', 'Multiple strengths', 'Lightweight & durable'],
    inStock: true,
  },
  {
    slug: 'blue-light-readers',
    name: 'Blue-Light Readers',
    categorySlug: 'reading',
    price: 1490,
    emoji: '🔎',
    shortDescription: 'Reading magnification plus blue-light protection.',
    description:
      'Two benefits in one — reading magnification with a blue-light filter, ideal for reading on phones, tablets and e-readers.',
    features: ['Reading magnification', 'Blue-light filter', 'Anti-reflective coating', 'Lightweight frame'],
    inStock: true,
  },

  // ─── Kids ──────────────────────────────────────────────────────
  {
    slug: 'kids-flexible-frame',
    name: 'Kids Flexible Frame',
    categorySlug: 'kids',
    price: 1190,
    badge: 'New',
    emoji: '🧒',
    shortDescription: 'Bendy, near-unbreakable frames made for children.',
    description:
      'Super-flexible frames that bend without breaking — perfect for active kids. Comfortable, lightweight and prescription-ready.',
    features: ['Flexible bend-resistant frame', 'Lightweight & comfortable', 'Prescription-ready', 'Fun colours'],
    inStock: true,
  },
  {
    slug: 'kids-sunglasses-uv',
    name: 'Kids UV Sunglasses',
    categorySlug: 'kids',
    price: 990,
    emoji: '🌈',
    shortDescription: 'Bright, durable sunglasses with full UV protection.',
    description:
      'Protect little eyes outdoors with UV400 lenses in fun, durable frames designed to survive playtime.',
    features: ['UV400 protection', 'Durable kid-proof frame', 'Comfortable soft fit', 'Bright colours'],
    inStock: true,
  },
  {
    slug: 'kids-blue-light-glasses',
    name: 'Kids Blue-Light Glasses',
    categorySlug: 'kids',
    price: 1290,
    emoji: '📱',
    shortDescription: 'Screen-time protection for kids and students.',
    description:
      'Reduce eye strain from tablets, phones and online classes with kid-sized blue-light glasses. Light, flexible and comfortable for all-day wear.',
    features: ['Blocks harmful blue light', 'Kid-sized flexible frame', 'Anti-glare lenses', 'Comfortable all-day fit'],
    inStock: true,
  },
];

const productImageBySlug: Partial<Record<string, string>> = {
  'bluetooth-audio-glasses': '/products/glass-01.svg',
  'hd-camera-glasses': '/products/glass-02.svg',
  'sport-bluetooth-glasses': '/products/glass-03.svg',
  'translation-smart-glasses': '/products/glass-04.svg',
  'classic-aviator-sunglasses': '/products/glass-05.svg',
  'polarized-wayfarer-sunglasses': '/products/glass-06.svg',
  'oversized-fashion-sunglasses': '/products/glass-07.svg',
  'retro-round-sunglasses': '/products/glass-08.svg',
  'titanium-rimless-frame': '/products/glass-09.svg',
  'acetate-rectangle-frame': '/products/glass-10.svg',
  'cat-eye-frame': '/products/glass-11.svg',
  'clear-round-frame': '/products/glass-12.svg',
  'blue-light-computer-glasses': '/products/glass-13.svg',
  'gaming-blue-light-glasses': '/products/glass-14.svg',
  'photochromic-smart-lenses': '/products/glass-15.svg',
  'polarized-sport-wrap': '/products/glass-16.svg',
  'cycling-photochromic-glasses': '/products/glass-17.svg',
  'swimming-anti-fog-goggles': '/products/glass-18.svg',
  'classic-reading-glasses': '/products/glass-19.svg',
  'foldable-reading-glasses': '/products/glass-20.svg',
  'blue-light-readers': '/products/glass-21.svg',
  'kids-flexible-frame': '/products/glass-22.svg',
};

for (const product of products) {
  if (productImageBySlug[product.slug]) {
    product.image = productImageBySlug[product.slug];
  }
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(categorySlug: string) {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function featuredProducts() {
  return products.filter((p) => p.featured);
}
