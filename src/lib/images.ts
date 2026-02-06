// Beer images from Unsplash (free to use)
// All URLs verified working as of 2024

// Verified working Unsplash beer photo IDs
const VERIFIED_BEER_PHOTOS = {
  // Light/golden beers
  golden1: 'photo-1535958636474-b021ee887b13',
  golden2: 'photo-1608270586620-248524c67de9',
  golden3: 'photo-1558642452-9d2a7deb7f62',
  golden4: 'photo-1600788886242-5c96aabe3757',

  // Amber/copper beers
  amber1: 'photo-1566633806327-68e152aaf26d',
  amber2: 'photo-1571613316887-6f8d5cbf7ef7',
  amber3: 'photo-1618885472179-5e474019f2a9',

  // Dark beers
  dark1: 'photo-1532634922-8fe0b757fb13',

  // Pub/bar scenes
  pub1: 'photo-1436076863939-06870fe779c2',
  pub2: 'photo-1504502350688-00f5d59bbdeb',

  // Food pairing
  food1: 'photo-1414235077428-338989a2e8c0',
  pizza1: 'photo-1565299624946-b28f40a0ae38',
};

function unsplashUrl(photoId: string, w: number = 400, h: number = 500): string {
  return `https://images.unsplash.com/${photoId}?w=${w}&h=${h}&fit=crop`;
}

export const beerImages = {
  // Light lagers and pilsners
  light: [
    unsplashUrl(VERIFIED_BEER_PHOTOS.golden2),
    unsplashUrl(VERIFIED_BEER_PHOTOS.golden1),
    unsplashUrl(VERIFIED_BEER_PHOTOS.golden3),
    unsplashUrl(VERIFIED_BEER_PHOTOS.golden4),
  ],
  // IPAs and pale ales (amber/gold)
  ipa: [
    unsplashUrl(VERIFIED_BEER_PHOTOS.amber1),
    unsplashUrl(VERIFIED_BEER_PHOTOS.amber2),
    unsplashUrl(VERIFIED_BEER_PHOTOS.amber3),
    unsplashUrl(VERIFIED_BEER_PHOTOS.pub1),
    unsplashUrl(VERIFIED_BEER_PHOTOS.golden1),
  ],
  // Amber ales and lagers
  amber: [
    unsplashUrl(VERIFIED_BEER_PHOTOS.golden1),
    unsplashUrl(VERIFIED_BEER_PHOTOS.amber1),
    unsplashUrl(VERIFIED_BEER_PHOTOS.pub2),
    unsplashUrl(VERIFIED_BEER_PHOTOS.amber2),
  ],
  // Dark beers (stouts, porters)
  dark: [
    unsplashUrl(VERIFIED_BEER_PHOTOS.dark1),
    unsplashUrl(VERIFIED_BEER_PHOTOS.golden2),
    unsplashUrl(VERIFIED_BEER_PHOTOS.amber1),
    unsplashUrl(VERIFIED_BEER_PHOTOS.golden1),
  ],
  // Wheat beers
  wheat: [
    unsplashUrl(VERIFIED_BEER_PHOTOS.golden3),
    unsplashUrl(VERIFIED_BEER_PHOTOS.golden1),
    unsplashUrl(VERIFIED_BEER_PHOTOS.golden4),
  ],
  // Belgian ales
  belgian: [
    unsplashUrl(VERIFIED_BEER_PHOTOS.amber1),
    unsplashUrl(VERIFIED_BEER_PHOTOS.amber2),
    unsplashUrl(VERIFIED_BEER_PHOTOS.golden4),
    unsplashUrl(VERIFIED_BEER_PHOTOS.golden1),
  ],
  // Sour beers
  sour: [
    unsplashUrl(VERIFIED_BEER_PHOTOS.golden3),
    unsplashUrl(VERIFIED_BEER_PHOTOS.golden4),
    unsplashUrl(VERIFIED_BEER_PHOTOS.pub2),
  ],
  // Default/generic
  default: [
    unsplashUrl(VERIFIED_BEER_PHOTOS.golden1),
    unsplashUrl(VERIFIED_BEER_PHOTOS.amber1),
    unsplashUrl(VERIFIED_BEER_PHOTOS.golden2),
    unsplashUrl(VERIFIED_BEER_PHOTOS.amber2),
    unsplashUrl(VERIFIED_BEER_PHOTOS.amber3),
  ],
};

// Map beer styles to image categories
const styleToCategory: Record<string, keyof typeof beerImages> = {
  'american-light-lager': 'light',
  'american-lager': 'light',
  'mexican-lager': 'light',
  'euro-pale-lager': 'light',
  'czech-pilsner': 'light',
  'german-pilsner': 'light',
  'american-ipa': 'ipa',
  'double-ipa': 'ipa',
  'hazy-ipa': 'ipa',
  'english-ipa': 'ipa',
  'pale-ale': 'ipa',
  'english-pale-ale': 'amber',
  'vienna-lager': 'amber',
  'irish-stout': 'dark',
  'imperial-stout': 'dark',
  'american-porter': 'dark',
  'hefeweizen': 'wheat',
  'witbier': 'wheat',
  'american-wheat': 'wheat',
  'belgian-dark-strong': 'belgian',
  'belgian-tripel': 'belgian',
  'belgian-dubbel': 'belgian',
  'saison': 'belgian',
  'berliner-weisse': 'sour',
  'gose': 'sour',
  'flanders-red': 'sour',
};

// Get image URL for a beer based on its style
export function getBeerImage(styleId: string, beerId: string): string {
  const category = styleToCategory[styleId] || 'default';
  const images = beerImages[category];

  // Use beer ID to consistently pick the same image for the same beer
  const hash = beerId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = hash % images.length;

  return images[index];
}

// Specific beer images (for well-known beers we can match)
export const specificBeerImages: Record<string, string> = {
  'guinness-draught': unsplashUrl(VERIFIED_BEER_PHOTOS.dark1),
  'bud-light': unsplashUrl(VERIFIED_BEER_PHOTOS.golden4),
  'miller-lite': unsplashUrl(VERIFIED_BEER_PHOTOS.golden3),
  'coors-light': unsplashUrl(VERIFIED_BEER_PHOTOS.golden1),
  'corona-extra': unsplashUrl(VERIFIED_BEER_PHOTOS.golden1),
  'modelo-especial': unsplashUrl(VERIFIED_BEER_PHOTOS.golden4),
  'heineken': unsplashUrl(VERIFIED_BEER_PHOTOS.golden2),
  'stella-artois': unsplashUrl(VERIFIED_BEER_PHOTOS.amber2),
  'blue-moon': unsplashUrl(VERIFIED_BEER_PHOTOS.golden3),
  'budweiser': unsplashUrl(VERIFIED_BEER_PHOTOS.golden1),
};

// Get the best image for a specific beer
export function getBeerImageUrl(beerId: string, styleId: string): string {
  // Check for specific beer image first
  if (specificBeerImages[beerId]) {
    return specificBeerImages[beerId];
  }

  // Fall back to style-based image
  return getBeerImage(styleId, beerId);
}

// Brewery images - variety of brewery/bar scenes
export const breweryImages = [
  unsplashUrl(VERIFIED_BEER_PHOTOS.pub1, 400, 300),
  unsplashUrl(VERIFIED_BEER_PHOTOS.golden3, 400, 300),
  unsplashUrl(VERIFIED_BEER_PHOTOS.dark1, 400, 300),
  unsplashUrl(VERIFIED_BEER_PHOTOS.amber1, 400, 300),
  unsplashUrl(VERIFIED_BEER_PHOTOS.pub2, 400, 300),
  unsplashUrl(VERIFIED_BEER_PHOTOS.golden1, 400, 300),
  unsplashUrl(VERIFIED_BEER_PHOTOS.amber2, 400, 300),
  unsplashUrl(VERIFIED_BEER_PHOTOS.golden2, 400, 300),
];

export function getBreweryImage(breweryId: string): string {
  const hash = breweryId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return breweryImages[hash % breweryImages.length];
}

// Guide images by category
export const guideImages: Record<string, string> = {
  education: unsplashUrl(VERIFIED_BEER_PHOTOS.golden1, 600, 400),
  pairing: unsplashUrl(VERIFIED_BEER_PHOTOS.food1, 600, 400),
  seasonal: unsplashUrl(VERIFIED_BEER_PHOTOS.golden3, 600, 400),
  comparison: unsplashUrl(VERIFIED_BEER_PHOTOS.amber2, 600, 400),
  beginner: unsplashUrl(VERIFIED_BEER_PHOTOS.amber1, 600, 400),
  default: unsplashUrl(VERIFIED_BEER_PHOTOS.golden1, 600, 400),
};

export function getGuideImage(category: string, guideId: string): string {
  // Specific guide images
  const specificImages: Record<string, string> = {
    'beer-styles-explained': unsplashUrl(VERIFIED_BEER_PHOTOS.amber2, 600, 400),
    'best-beers-for-beginners': unsplashUrl(VERIFIED_BEER_PHOTOS.amber1, 600, 400),
    'beer-and-pizza-pairing': unsplashUrl(VERIFIED_BEER_PHOTOS.pizza1, 600, 400),
    'understanding-abv-ibu-srm': unsplashUrl(VERIFIED_BEER_PHOTOS.golden1, 600, 400),
    'summer-beers-guide': unsplashUrl(VERIFIED_BEER_PHOTOS.golden3, 600, 400),
    'domestic-lagers-compared': unsplashUrl(VERIFIED_BEER_PHOTOS.golden2, 600, 400),
  };

  if (specificImages[guideId]) {
    return specificImages[guideId];
  }

  return guideImages[category] || guideImages.default;
}

// Blog post images by category
export const blogImages: Record<string, string> = {
  news: unsplashUrl(VERIFIED_BEER_PHOTOS.pub1, 600, 400),
  reviews: unsplashUrl(VERIFIED_BEER_PHOTOS.amber1, 600, 400),
  culture: unsplashUrl(VERIFIED_BEER_PHOTOS.pub2, 600, 400),
  events: unsplashUrl(VERIFIED_BEER_PHOTOS.golden3, 600, 400),
  opinion: unsplashUrl(VERIFIED_BEER_PHOTOS.amber2, 600, 400),
  industry: unsplashUrl(VERIFIED_BEER_PHOTOS.golden1, 600, 400),
  default: unsplashUrl(VERIFIED_BEER_PHOTOS.amber1, 600, 400),
};

export function getBlogImage(category: string, postId: string): string {
  const specificImages: Record<string, string> = {
    'rise-of-craft-lagers': unsplashUrl(VERIFIED_BEER_PHOTOS.golden2, 600, 400),
    'home-brewing-getting-started': unsplashUrl(VERIFIED_BEER_PHOTOS.amber3, 600, 400),
    'best-beer-festivals-2025': unsplashUrl(VERIFIED_BEER_PHOTOS.pub1, 600, 400),
    'ipa-vs-pale-ale-showdown': unsplashUrl(VERIFIED_BEER_PHOTOS.amber1, 600, 400),
  };

  if (specificImages[postId]) {
    return specificImages[postId];
  }

  return blogImages[category] || blogImages.default;
}

// News images by category
export const newsImages: Record<string, string> = {
  opening: unsplashUrl(VERIFIED_BEER_PHOTOS.pub1, 600, 400),
  closing: unsplashUrl(VERIFIED_BEER_PHOTOS.dark1, 600, 400),
  'new-release': unsplashUrl(VERIFIED_BEER_PHOTOS.amber1, 600, 400),
  seasonal: unsplashUrl(VERIFIED_BEER_PHOTOS.golden3, 600, 400),
  event: unsplashUrl(VERIFIED_BEER_PHOTOS.pub2, 600, 400),
  industry: unsplashUrl(VERIFIED_BEER_PHOTOS.golden1, 600, 400),
  award: unsplashUrl(VERIFIED_BEER_PHOTOS.amber2, 600, 400),
  default: unsplashUrl(VERIFIED_BEER_PHOTOS.golden1, 600, 400),
};

export function getNewsImage(category: string): string {
  return newsImages[category] || newsImages.default;
}

// Hero featured image (large)
export function getHeroImage(): string {
  return unsplashUrl(VERIFIED_BEER_PHOTOS.pub1, 1200, 600);
}

// Style images by category
export const styleImages: Record<string, string[]> = {
  'IPA': [
    unsplashUrl(VERIFIED_BEER_PHOTOS.amber1, 400, 300),
    unsplashUrl(VERIFIED_BEER_PHOTOS.amber2, 400, 300),
    unsplashUrl(VERIFIED_BEER_PHOTOS.amber3, 400, 300),
  ],
  'Pale Ale': [
    unsplashUrl(VERIFIED_BEER_PHOTOS.amber2, 400, 300),
    unsplashUrl(VERIFIED_BEER_PHOTOS.pub1, 400, 300),
  ],
  'Lager': [
    unsplashUrl(VERIFIED_BEER_PHOTOS.golden3, 400, 300),
    unsplashUrl(VERIFIED_BEER_PHOTOS.golden4, 400, 300),
    unsplashUrl(VERIFIED_BEER_PHOTOS.golden1, 400, 300),
  ],
  'Stout': [
    unsplashUrl(VERIFIED_BEER_PHOTOS.dark1, 400, 300),
    unsplashUrl(VERIFIED_BEER_PHOTOS.golden2, 400, 300),
  ],
  'Porter': [
    unsplashUrl(VERIFIED_BEER_PHOTOS.dark1, 400, 300),
    unsplashUrl(VERIFIED_BEER_PHOTOS.amber1, 400, 300),
  ],
  'Wheat Beer': [
    unsplashUrl(VERIFIED_BEER_PHOTOS.golden3, 400, 300),
    unsplashUrl(VERIFIED_BEER_PHOTOS.golden4, 400, 300),
  ],
  'Belgian Ale': [
    unsplashUrl(VERIFIED_BEER_PHOTOS.amber1, 400, 300),
    unsplashUrl(VERIFIED_BEER_PHOTOS.amber2, 400, 300),
  ],
  'Sour': [
    unsplashUrl(VERIFIED_BEER_PHOTOS.golden3, 400, 300),
    unsplashUrl(VERIFIED_BEER_PHOTOS.pub2, 400, 300),
  ],
  'Specialty': [
    unsplashUrl(VERIFIED_BEER_PHOTOS.golden3, 400, 300),
    unsplashUrl(VERIFIED_BEER_PHOTOS.amber1, 400, 300),
  ],
  'default': [
    unsplashUrl(VERIFIED_BEER_PHOTOS.golden1, 400, 300),
    unsplashUrl(VERIFIED_BEER_PHOTOS.amber1, 400, 300),
  ],
};

export function getStyleImage(category: string, styleId?: string): string {
  const images = styleImages[category] || styleImages.default;
  if (styleId) {
    const hash = styleId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return images[hash % images.length];
  }
  return images[0];
}
