// Beer images - local stock photos and AI-generated images
// All images stored in public/images/stock/ and public/images/ai/

const BASE = '/everythingbeer/images';

// Helper to build local image paths
function stockImg(filename: string): string {
  return `${BASE}/stock/${filename}`;
}

function aiImg(filename: string): string {
  return `${BASE}/ai/${filename}`;
}

function rootImg(filename: string): string {
  return `${BASE}/${filename}`;
}

// ============================================================
// Beer images by style category
// ============================================================
export const beerImages = {
  // Light lagers and pilsners
  light: [
    stockImg('beer-1218742.jpg'),
    stockImg('beer-203855.jpg'),
    stockImg('beer-554619.jpg'),
    stockImg('alcohol-21488.jpg'),
  ],
  // IPAs and pale ales (amber/gold)
  ipa: [
    stockImg('beer-2019929.jpg'),
    stockImg('beer-1605826.jpg'),
    stockImg('ale-2029499.png'),
    stockImg('beer-2218900.jpg'),
    stockImg('beer-1607001.jpg'),
  ],
  // Amber ales and lagers
  amber: [
    stockImg('alcohol-21938.jpg'),
    stockImg('beer-2449887.jpg'),
    stockImg('beer-3445988.jpg'),
    stockImg('beer-428121.jpg'),
  ],
  // Dark beers (stouts, porters)
  dark: [
    stockImg('alcohol-3797764.jpg'),
    stockImg('alcohol-3814913.jpg'),
    stockImg('beer-3065711.jpg'),
    stockImg('beer-3573276.jpg'),
  ],
  // Wheat beers
  wheat: [
    stockImg('beer-1218742.jpg'),
    stockImg('beer-554619.jpg'),
    stockImg('beer-203855.jpg'),
  ],
  // Belgian ales
  belgian: [
    stockImg('beer-2449887.jpg'),
    stockImg('beer-2218900.jpg'),
    stockImg('beer-428121.jpg'),
    stockImg('beer-1605826.jpg'),
  ],
  // Sour beers
  sour: [
    stockImg('beer-1482748.png'),
    stockImg('beer-1777934.png'),
    stockImg('beer-203855.jpg'),
  ],
  // Default/generic
  default: [
    stockImg('beer-2019929.jpg'),
    stockImg('beer-1605826.jpg'),
    stockImg('beer-3445988.jpg'),
    stockImg('beer-554619.jpg'),
    stockImg('beer-428121.jpg'),
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
  'guinness-draught': stockImg('alcohol-3797764.jpg'),
  'bud-light': stockImg('beer-203855.jpg'),
  'miller-lite': stockImg('beer-554619.jpg'),
  'coors-light': stockImg('beer-1218742.jpg'),
  'corona-extra': stockImg('beer-1218742.jpg'),
  'modelo-especial': stockImg('beer-203855.jpg'),
  'heineken': stockImg('beer-554619.jpg'),
  'stella-artois': stockImg('beer-2449887.jpg'),
  'blue-moon': stockImg('beer-1482748.png'),
  'budweiser': stockImg('beer-203855.jpg'),
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

// ============================================================
// Brewery images - Hybrid system
// 1. Curated breweries get individual images from /images/breweries/curated/
// 2. API breweries get type-based images from /images/breweries/{type}/
// 3. Fallback to generic brewery images
//
// SEO image naming convention:
//   Curated:  {brewery-name}-{city}-{state-or-country}.jpg
//   Example:  sierra-nevada-brewing-chico-california.jpg
//   Type pools: descriptive keyword names
//   Example:  craft-microbrewery-taproom-interior.jpg
// ============================================================

function breweryImg(path: string): string {
  return `${BASE}/breweries/${path}`;
}

// Curated brewery images - map brewery ID to specific image file
// When you add an image for a curated brewery, add the mapping here
// Image should be placed in public/images/breweries/curated/
const curatedBreweryImages: Record<string, string> = {
  // Commercial breweries - add images as they become available
  // 'curated-anheuser-busch': breweryImg('curated/anheuser-busch-st-louis-missouri.jpg'),
  // 'curated-molson-coors': breweryImg('curated/molson-coors-chicago-illinois.jpg'),
  // 'curated-heineken': breweryImg('curated/heineken-amsterdam-netherlands.jpg'),
  // 'curated-constellation-brands': breweryImg('curated/constellation-brands-victor-new-york.jpg'),
  // 'curated-pabst': breweryImg('curated/pabst-brewing-company-los-angeles-california.jpg'),
  // 'curated-guinness': breweryImg('curated/guinness-st-james-gate-dublin-ireland.jpg'),
  // 'curated-carlsberg': breweryImg('curated/carlsberg-brewery-copenhagen-denmark.jpg'),
  // 'curated-asahi': breweryImg('curated/asahi-brewery-tokyo-japan.jpg'),
  // Craft breweries - add images as they become available
  // 'curated-sierra-nevada': breweryImg('curated/sierra-nevada-brewing-chico-california.jpg'),
  // 'curated-dogfish-head': breweryImg('curated/dogfish-head-brewery-milton-delaware.jpg'),
  // 'curated-stone-brewing': breweryImg('curated/stone-brewing-escondido-california.jpg'),
  // 'curated-bells': breweryImg('curated/bells-brewery-galesburg-michigan.jpg'),
  // 'curated-founders': breweryImg('curated/founders-brewing-grand-rapids-michigan.jpg'),
  // 'curated-lagunitas': breweryImg('curated/lagunitas-brewing-petaluma-california.jpg'),
  // 'curated-deschutes': breweryImg('curated/deschutes-brewery-bend-oregon.jpg'),
  // 'curated-new-belgium': breweryImg('curated/new-belgium-brewing-fort-collins-colorado.jpg'),
  // 'curated-oskar-blues': breweryImg('curated/oskar-blues-brewery-longmont-colorado.jpg'),
  // 'curated-treehouse': breweryImg('curated/tree-house-brewing-charlton-massachusetts.jpg'),
  // 'curated-russian-river': breweryImg('curated/russian-river-brewing-santa-rosa-california.jpg'),
  // 'curated-allagash': breweryImg('curated/allagash-brewing-portland-maine.jpg'),
};

// Type-based brewery image pools
// Images in public/images/breweries/{type}/
const breweryTypeImages: Record<string, string[]> = {
  large: [
    breweryImg('large/factory-1.jpg'),
    breweryImg('large/industrial-1.jpg'),
    breweryImg('large/brewery-1.jpg'),
    breweryImg('large/kegs-1.jpg'),
  ],
  micro: [
    breweryImg('micro/brewery-1.jpg'),
    breweryImg('micro/taproom-1.jpg'),
    breweryImg('micro/barrels-1.jpg'),
    breweryImg('micro/bottles-1.jpg'),
  ],
  brewpub: [
    breweryImg('brewpub/bar-1.jpg'),
    breweryImg('brewpub/pub-1.jpg'),
    breweryImg('brewpub/dining-1.jpg'),
  ],
  regional: [
    breweryImg('regional/brewery-1.jpg'),
    breweryImg('regional/production-1.jpg'),
    breweryImg('regional/kegs-1.jpg'),
    breweryImg('regional/facility-1.jpg'),
  ],
};

// Fallback pool for types without their own folder (nano, planning, contract, etc.)
const breweryFallbackImages = [
  aiImg('brewery_1.jpg'),
  aiImg('brewery_2.jpg'),
  stockImg('buildings-1245953.jpg'),
  stockImg('factory-1518504.jpg'),
  stockImg('beer-barrel-956322.jpg'),
  stockImg('beer-bottles-3151245.jpg'),
  stockImg('beer-kegs_m1duPN-SBI-300617966.jpg'),
  stockImg('brew-1031484.jpg'),
];

// Get image for a brewery - checks curated first, then type pool, then fallback
export function getBreweryImage(breweryId: string, breweryType?: string): string {
  // 1. Check for curated brewery-specific image
  if (curatedBreweryImages[breweryId]) {
    return curatedBreweryImages[breweryId];
  }

  // 2. Check for type-based image pool
  const typePool = breweryType ? breweryTypeImages[breweryType] : null;
  if (typePool && typePool.length > 0) {
    const hash = breweryId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return typePool[hash % typePool.length];
  }

  // 3. Fallback to generic brewery images
  const hash = breweryId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return breweryFallbackImages[hash % breweryFallbackImages.length];
}

// Generate SEO-friendly alt text for brewery images
export function getBreweryImageAlt(breweryName: string, city?: string, state?: string, country?: string): string {
  const location = [city, state, country].filter(Boolean).join(', ');
  if (location) {
    return `${breweryName} brewery in ${location}`;
  }
  return `${breweryName} brewery`;
}

// ============================================================
// Guide images by category
// ============================================================
export const guideImages: Record<string, string> = {
  education: stockImg('beer-2019929.jpg'),
  pairing: stockImg('beer-3634581.jpg'),
  seasonal: stockImg('beer-1218742.jpg'),
  comparison: stockImg('beers-1283566.jpg'),
  beginner: stockImg('beer-2449887.jpg'),
  default: stockImg('beer-2019929.jpg'),
};

export function getGuideImage(category: string, guideId: string): string {
  // Specific guide images
  const specificImages: Record<string, string> = {
    'beer-styles-explained': stockImg('beers-1283566.jpg'),
    'best-beers-for-beginners': stockImg('beer-2449887.jpg'),
    'beer-and-pizza-pairing': stockImg('beer-3634581.jpg'),
    'understanding-abv-ibu-srm': stockImg('beer-2019929.jpg'),
    'summer-beers-guide': stockImg('beer-1218742.jpg'),
    'domestic-lagers-compared': stockImg('beer-203855.jpg'),
  };

  if (specificImages[guideId]) {
    return specificImages[guideId];
  }

  return guideImages[category] || guideImages.default;
}

// ============================================================
// Blog post images by category
// ============================================================
export const blogImages: Record<string, string> = {
  news: stockImg('beer-advertising-2712521.jpg'),
  reviews: stockImg('beers-1283566.jpg'),
  culture: stockImg('beer-3634581.jpg'),
  events: stockImg('Oktoberfest Frauline.jpg'),
  opinion: stockImg('beer-2449887.jpg'),
  industry: stockImg('factory-1518504.jpg'),
  education: stockImg('beer-2019929.jpg'),
  default: stockImg('beer-2019929.jpg'),
};

export function getBlogImage(category: string, postId: string): string {
  const specificImages: Record<string, string> = {
    'rise-of-craft-lagers': stockImg('beer-203855.jpg'),
    'home-brewing-getting-started': stockImg('brew-1031484.jpg'),
    'best-beer-festivals-2025': stockImg('Oktoberfest Frauline.jpg'),
    'ipa-vs-pale-ale-showdown': stockImg('beers-1283566.jpg'),
    'hops-the-flower-behind-the-flavor': stockImg('hops-1678583.jpg'),
    'reinheitsgebot-german-purity-law': rootImg('reinheitsgebot.jpg'),
    'how-beer-shaped-the-world': stockImg('beer-barrel-956322.jpg'),
    'the-history-of-beer': stockImg('beer-3634581.jpg'),
  };

  if (specificImages[postId]) {
    return specificImages[postId];
  }

  return blogImages[category] || blogImages.default;
}

// ============================================================
// News images by category
// ============================================================
export const newsImages: Record<string, string> = {
  opening: aiImg('brewery_1.jpg'),
  closing: stockImg('buildings-1245953.jpg'),
  'new-release': stockImg('beer-bottles-3151245.jpg'),
  seasonal: stockImg('beer-1218742.jpg'),
  event: stockImg('Oktoberfest Frauline.jpg'),
  industry: stockImg('factory-1518504.jpg'),
  award: stockImg('beer-3445988.jpg'),
  default: stockImg('beer-2019929.jpg'),
};

export function getNewsImage(category: string): string {
  return newsImages[category] || newsImages.default;
}

// ============================================================
// Hero featured image (large)
// ============================================================
export function getHeroImage(): string {
  return rootImg('beer-site-background.jpg');
}

// ============================================================
// Style images by category
// ============================================================
export const styleImages: Record<string, string[]> = {
  'IPA': [
    stockImg('beer-2019929.jpg'),
    stockImg('beer-1605826.jpg'),
    stockImg('ale-2029499.png'),
  ],
  'Pale Ale': [
    stockImg('beer-2218900.jpg'),
    stockImg('beer-1607001.jpg'),
  ],
  'Lager': [
    stockImg('beer-1218742.jpg'),
    stockImg('beer-203855.jpg'),
    stockImg('beer-554619.jpg'),
  ],
  'Stout': [
    stockImg('alcohol-3797764.jpg'),
    stockImg('alcohol-3814913.jpg'),
  ],
  'Porter': [
    stockImg('beer-3065711.jpg'),
    stockImg('beer-3573276.jpg'),
  ],
  'Wheat Beer': [
    stockImg('beer-1482748.png'),
    stockImg('beer-1777934.png'),
  ],
  'Belgian Ale': [
    stockImg('beer-2449887.jpg'),
    stockImg('beer-428121.jpg'),
  ],
  'Sour': [
    stockImg('beer-1482748.png'),
    stockImg('beer-1777934.png'),
  ],
  'Specialty': [
    stockImg('beer-3445988.jpg'),
    stockImg('beer-3634581.jpg'),
  ],
  'default': [
    stockImg('beer-2019929.jpg'),
    stockImg('beer-1605826.jpg'),
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
