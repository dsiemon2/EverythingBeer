import { PintSizedPost } from '@/types';

// Pint-Sized Posts — fun beer facts
// ============================================================
// ROTATION LOGIC:
// - Homepage ticker & sidebar show only facts from the last 30 days
// - Full /pint-sized-posts page shows ALL facts (newest first)
// - Facts with article_slug link back to the source blog post
//
// TO ADD NEW FACTS:
// 1. Add to the top of this array (newest first)
// 2. Use today's date for created_at
// 3. If extracted from a blog post, include article_slug and article_title
// 4. Facts older than 30 days auto-rotate off the homepage
// ============================================================

export const pintSizedPosts: PintSizedPost[] = [
  // ---- Recent facts (extracted from blog articles) ----
  {
    id: 'psp-30',
    fact: 'IPAs pack 40-70+ IBUs (bitterness units) compared to Pale Ales\' 30-50 — making IPAs significantly more bitter and hop-forward.',
    category: 'science',
    icon: '🔥',
    created_at: '2026-02-11',
    article_slug: 'ipa-vs-pale-ale-showdown',
    article_title: 'IPA vs. Pale Ale: The Ultimate Side-by-Side Showdown',
  },
  {
    id: 'psp-29',
    fact: 'The legend that extra hops were added to Pale Ale for its voyage to British troops in India is debated by historians, but the result is undeniable — the IPA became America\'s most popular craft beer style.',
    category: 'history',
    icon: '🇬🇧',
    created_at: '2026-02-10',
    article_slug: 'ipa-vs-pale-ale-showdown',
    article_title: 'IPA vs. Pale Ale: The Ultimate Side-by-Side Showdown',
  },
  {
    id: 'psp-28',
    fact: 'Oktoberfest in Munich draws six million visitors across 14 massive beer tents — making it the world\'s largest beer festival.',
    category: 'stats',
    icon: '🎪',
    created_at: '2026-02-08',
    article_slug: 'best-beer-festivals-2025',
    article_title: 'The 10 Best Beer Festivals Worth Traveling For in 2025',
  },
  {
    id: 'psp-27',
    fact: 'The Great American Beer Festival in Denver features over 2,000 breweries pouring 4,000+ beers in a single weekend — making it the largest ticketed beer fest in the US.',
    category: 'stats',
    icon: '🎉',
    created_at: '2026-02-06',
    article_slug: 'best-beer-festivals-2025',
    article_title: 'The 10 Best Beer Festivals Worth Traveling For in 2025',
  },
  {
    id: 'psp-26',
    fact: 'The #1 killer of homebrew is infection — that\'s why sanitization is so critical that home brewers say "if in doubt, sanitize it again."',
    category: 'did-you-know',
    icon: '🧼',
    created_at: '2026-02-04',
    article_slug: 'home-brewing-getting-started',
    article_title: 'Home Brewing 101: Everything You Need to Get Started',
  },
  {
    id: 'psp-25',
    fact: 'You can get a complete home brewing starter kit for just $75-150 — making craft beer at home is more accessible and affordable than ever.',
    category: 'stats',
    icon: '💰',
    created_at: '2026-02-02',
    article_slug: 'home-brewing-getting-started',
    article_title: 'Home Brewing 101: Everything You Need to Get Started',
  },
  {
    id: 'psp-24',
    fact: 'Craft lagers take 4-8 weeks to lager compared to just 2-3 weeks for mass-produced macro lagers — the longer process means there\'s nowhere to hide off-flavors.',
    category: 'science',
    icon: '⏱️',
    created_at: '2026-01-30',
    article_slug: 'rise-of-craft-lagers',
    article_title: 'The Rise of Craft Lagers: Why Breweries Are Going Back to Basics',
  },
  {
    id: 'psp-23',
    fact: 'Craft lager sales have grown over 20% year-over-year while hazy IPA growth has plateaued — breweries are increasingly going back to basics.',
    category: 'stats',
    icon: '📊',
    created_at: '2026-01-28',
    article_slug: 'rise-of-craft-lagers',
    article_title: 'The Rise of Craft Lagers: Why Breweries Are Going Back to Basics',
  },
  {
    id: 'psp-22',
    fact: 'By the 15th century, hopped beer completely replaced unhopped ales — a brewing revolution driven by hops\' natural preservative qualities.',
    category: 'history',
    icon: '📈',
    created_at: '2026-01-26',
    article_slug: 'hops-the-flower-behind-the-flavor',
    article_title: 'Hops: The Flower Behind the Flavor of Beer',
  },
  {
    id: 'psp-21',
    fact: 'Before hops became standard, beer was flavored with "gruit" — a blend of rosemary, yarrow, and coriander. Hops didn\'t become a regular ingredient until centuries after their discovery.',
    category: 'history',
    icon: '🌸',
    created_at: '2026-01-24',
    article_slug: 'hops-the-flower-behind-the-flavor',
    article_title: 'Hops: The Flower Behind the Flavor of Beer',
  },
  {
    id: 'psp-20',
    fact: 'In 1987, the European Court of Justice ruled the German Purity Law violated free trade, yet many German brewers voluntarily follow it as a mark of tradition and quality.',
    category: 'did-you-know',
    icon: '🇩🇪',
    created_at: '2026-01-22',
    article_slug: 'reinheitsgebot-german-purity-law',
    article_title: 'The Reinheitsgebot: The German Purity Law That Shaped Beer Forever',
  },
  {
    id: 'psp-19',
    fact: 'The German Purity Law (1516) originally listed only three ingredients: barley, hops, and water. Yeast wasn\'t mentioned because its role in fermentation wasn\'t yet understood.',
    category: 'history',
    icon: '⚖️',
    created_at: '2026-01-20',
    article_slug: 'reinheitsgebot-german-purity-law',
    article_title: 'The Reinheitsgebot: The German Purity Law That Shaped Beer Forever',
  },
  {
    id: 'psp-18',
    fact: 'The Reinheitsgebot was partly designed to keep beer affordable for poor people and prevent brewers from competing with bakers for wheat and rye.',
    category: 'culture',
    icon: '🍞',
    created_at: '2026-01-18',
    article_slug: 'reinheitsgebot-german-purity-law',
    article_title: 'The Reinheitsgebot: The German Purity Law That Shaped Beer Forever',
  },
  {
    id: 'psp-17',
    fact: 'Louis Pasteur\'s groundbreaking germ theory — which paved the way for vaccines — came from studying beer fermentation and discovering bacteria and yeast cells.',
    category: 'science',
    icon: '🔬',
    created_at: '2026-01-16',
    article_slug: 'how-beer-shaped-the-world',
    article_title: 'How Beer Shaped the World',
  },
  {
    id: 'psp-16',
    fact: 'The Mayflower was supposed to land in Virginia but stopped at Plymouth so the settlers could brew more beer when supplies ran out.',
    category: 'history',
    icon: '⛵',
    created_at: '2026-01-14',
    article_slug: 'how-beer-shaped-the-world',
    article_title: 'How Beer Shaped the World',
  },
  {
    id: 'psp-15',
    fact: 'The agricultural revolution may have started because of beer, not bread — archaeological evidence shows beer existed before bread, meaning civilization might literally be built on beer.',
    category: 'history',
    icon: '🌾',
    created_at: '2026-01-13',
    article_slug: 'how-beer-shaped-the-world',
    article_title: 'How Beer Shaped the World',
  },
  {
    id: 'psp-14',
    fact: 'The word "bridal" comes from "bride ale" — medieval wedding feasts where village women called "brewsters" brewed special batches for the celebration.',
    category: 'history',
    icon: '👰',
    created_at: '2026-01-12',
    article_slug: 'the-history-of-beer',
    article_title: 'The History of Beer',
  },
  {
    id: 'psp-13',
    fact: 'In 1086, monks at St. Paul\'s in London brewed nearly 70,000 gallons of ale. Some monks even believed mixing mortar with ale instead of water made stronger church walls!',
    category: 'did-you-know',
    icon: '⛪',
    created_at: '2026-01-11',
    article_slug: 'the-history-of-beer',
    article_title: 'The History of Beer',
  },

  // ---- Original facts (archive) ----
  {
    id: 'psp-12',
    fact: 'President Obama was the first sitting president to brew beer at the White House. The "White House Honey Ale" used honey from the South Lawn beehives in its recipe.',
    source: 'White House Archives',
    category: 'culture',
    icon: '🇺🇸',
    created_at: '2025-03-10',
  },
  {
    id: 'psp-11',
    fact: 'The world\'s strongest beer clocks in at 67.5% ABV — stronger than most whiskeys. It\'s made by freeze-distilling, a technique that removes water to concentrate the alcohol.',
    source: 'Guinness World Records',
    category: 'stats',
    icon: '💪',
    created_at: '2025-03-05',
  },
  {
    id: 'psp-10',
    fact: 'In medieval Europe, beer was often safer to drink than water because the boiling process during brewing killed harmful bacteria. It was a dietary staple for adults and children alike.',
    category: 'history',
    icon: '🏰',
    created_at: '2025-03-01',
  },
  {
    id: 'psp-9',
    fact: 'Yeast is technically a living organism — a single-celled fungus. During fermentation, yeast eats sugar and produces alcohol and CO2 as byproducts. Every beer you drink is yeast poop.',
    category: 'science',
    icon: '🔬',
    created_at: '2025-02-22',
  },
  {
    id: 'psp-8',
    fact: 'The longest hangover in recorded history lasted 4 weeks after a Scotsman consumed 60 pints of beer. Doctors noted the hangover as the longest medically verified case.',
    category: 'did-you-know',
    icon: '🤕',
    created_at: '2025-02-18',
  },
  {
    id: 'psp-7',
    fact: 'Ancient Egyptian workers who built the pyramids were paid in beer — about 4 liters per day. Beer was considered safer to drink than water and provided essential nutrients.',
    source: 'National Geographic',
    category: 'history',
    icon: '🏛️',
    created_at: '2025-02-14',
  },
  {
    id: 'psp-6',
    fact: 'The "study of beer" is called zythology, derived from the Greek words "zythos" (beer) and "logos" (study). A person who studies beer is called a zythologist.',
    category: 'did-you-know',
    icon: '🎓',
    created_at: '2025-02-10',
  },
  {
    id: 'psp-5',
    fact: 'The Czech Republic leads the world in beer consumption per capita, with residents drinking an average of about 140 liters per person per year. That\'s roughly a beer a day per adult.',
    source: 'World Health Organization',
    category: 'stats',
    icon: '🍺',
    created_at: '2025-02-05',
  },
  {
    id: 'psp-4',
    fact: 'Hops are in the same plant family as cannabis (Cannabaceae). Both plants produce aromatic compounds called terpenes, which contribute to their distinctive aromas.',
    category: 'science',
    icon: '🌿',
    created_at: '2025-02-01',
  },
  {
    id: 'psp-3',
    fact: 'A beer wave of 388,000 gallons flooded the streets of London in 1814 when a huge vat ruptured at Meux & Company Brewery. The wave destroyed two homes and a pub.',
    source: 'History.com',
    category: 'history',
    icon: '🌊',
    created_at: '2025-01-22',
  },
  {
    id: 'psp-2',
    fact: 'Cenosillicaphobia is the fear of an empty beer glass. While not an officially recognized phobia, it has become a popular term among beer enthusiasts worldwide.',
    category: 'culture',
    icon: '😱',
    created_at: '2025-01-18',
  },
  {
    id: 'psp-1',
    fact: 'The oldest known recipe in the world is for beer. A 4,000-year-old Sumerian poem honoring the goddess of brewing, Ninkasi, contains the earliest surviving beer recipe.',
    source: 'Smithsonian Magazine',
    category: 'history',
    icon: '📜',
    created_at: '2025-01-15',
  },
];

// ============================================================
// Helper functions
// ============================================================

// Get facts from the last N days (default 30)
// Used by homepage ticker and sidebar
export function getRecentFacts(days: number = 30): PintSizedPost[] {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const cutoffStr = cutoff.toISOString().split('T')[0];

  const recent = pintSizedPosts.filter((p) => p.created_at >= cutoffStr);

  // If fewer than 6 recent facts, pull the most recent ones regardless of age
  // This ensures the homepage always has content
  if (recent.length < 6) {
    return pintSizedPosts.slice(0, Math.max(6, recent.length));
  }

  return recent;
}

// Get random facts from the recent pool (for homepage sidebar)
export function getRandomRecentFacts(count: number = 4, days: number = 30): PintSizedPost[] {
  const recent = getRecentFacts(days);
  const shuffled = [...recent].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Get ALL facts sorted newest first (for the full archive page)
export function getAllFacts(): PintSizedPost[] {
  return [...pintSizedPosts].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

// Legacy function — now uses recent facts instead of all facts
export function getRandomFacts(count: number = 4): PintSizedPost[] {
  return getRandomRecentFacts(count);
}

export function getFactsByCategory(category: string): PintSizedPost[] {
  return pintSizedPosts.filter((p) => p.category === category);
}
