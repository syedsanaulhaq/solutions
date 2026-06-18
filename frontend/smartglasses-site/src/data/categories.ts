export type Category = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  emoji: string;
  featured?: boolean;
};

/**
 * Product categories. "smart-glasses" is the flagship category.
 * Edit names/descriptions freely — slugs are used in URLs.
 */
export const categories: Category[] = [
  {
    slug: 'smart-glasses',
    name: 'Smart Glasses',
    shortName: 'Smart',
    description:
      'Bluetooth audio, camera and AR glasses. Imported tech you can wear — calls, music and video, hands-free.',
    emoji: '🕶️',
    featured: true,
  },
  {
    slug: 'sunglasses',
    name: 'Sunglasses',
    shortName: 'Sunglasses',
    description: 'UV-protection styles for every face — aviators, wayfarers, round and oversized.',
    emoji: '😎',
    featured: true,
  },
  {
    slug: 'eyeglasses',
    name: 'Eyeglasses & Frames',
    shortName: 'Frames',
    description: 'Lightweight, stylish optical frames ready for your prescription lenses.',
    emoji: '👓',
    featured: true,
  },
  {
    slug: 'blue-light',
    name: 'Blue-Light & Computer',
    shortName: 'Blue-Light',
    description: 'Reduce eye strain from screens. Perfect for office, study and gaming.',
    emoji: '💻',
    featured: true,
  },
  {
    slug: 'sports',
    name: 'Sports Glasses',
    shortName: 'Sports',
    description: 'Sweat-resistant, secure-fit eyewear for running, cycling and outdoor sport.',
    emoji: '🚴',
  },
  {
    slug: 'reading',
    name: 'Reading Glasses',
    shortName: 'Reading',
    description: 'Comfortable magnification readers in classic and foldable designs.',
    emoji: '📖',
  },
  {
    slug: 'kids',
    name: 'Kids Glasses',
    shortName: 'Kids',
    description: 'Flexible, durable and fun eyewear made for children.',
    emoji: '🧒',
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
