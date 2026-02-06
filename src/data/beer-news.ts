import { BeerNews } from '@/types';

export const beerNews: BeerNews[] = [
  {
    id: 'news-1',
    headline: 'Sierra Nevada Opens New East Coast Taproom in Asheville',
    summary: 'Sierra Nevada Brewing Co. has officially opened a brand-new taproom at their Mills River, NC facility, featuring 24 taps and a full kitchen with brewery-to-table dining.',
    category: 'opening',
    location: 'Asheville, NC',
    published_at: '2025-03-10',
    icon: '🏗️',
  },
  {
    id: 'news-2',
    headline: 'Dogfish Head Releases 120 Minute IPA Annual Limited Batch',
    summary: 'The legendary 120 Minute IPA is back for its annual limited release. At 15-20% ABV and 120 IBU, this hop monster remains one of the most sought-after IPAs in the craft world.',
    category: 'new-release',
    published_at: '2025-03-08',
    icon: '🍺',
  },
  {
    id: 'news-3',
    headline: 'Great American Beer Festival Announces 2025 Dates and New Categories',
    summary: 'GABF will return to Denver October 2-4 with expanded judging categories including a new "American Craft Lager" category, reflecting the growing lager trend.',
    category: 'event',
    location: 'Denver, CO',
    published_at: '2025-03-05',
    icon: '🎪',
  },
  {
    id: 'news-4',
    headline: 'Anchor Brewing Finds New Buyer, Plans Summer Reopening',
    summary: 'After shutting down operations last year, San Francisco\'s historic Anchor Brewing has been acquired by Hamdi Ulukaya. The brewery plans to resume production by summer 2025.',
    category: 'industry',
    location: 'San Francisco, CA',
    published_at: '2025-03-03',
    icon: '📰',
  },
  {
    id: 'news-5',
    headline: 'Bell\'s Two Hearted Ale Wins "Best Beer in America" for 5th Consecutive Year',
    summary: 'The American Homebrewers Association has once again named Bell\'s Two Hearted Ale as the best beer in America, marking an unprecedented fifth consecutive win.',
    category: 'award',
    published_at: '2025-02-28',
    icon: '🏆',
  },
  {
    id: 'news-6',
    headline: 'Spring Seasonal Roundup: 15 Beers to Look For This Season',
    summary: 'From bocks to maibocks, farmhouse ales to fruit-forward session IPAs — the spring seasonal lineup from craft breweries has something for every palate this year.',
    category: 'seasonal',
    published_at: '2025-02-25',
    icon: '🌸',
  },
  {
    id: 'news-7',
    headline: 'Portland Brewery Collective Announces Closure After 8 Years',
    summary: 'Beloved Portland brewery collective "Hopworks & Co." will close its doors on April 30, citing rising rent and supply chain challenges. The final weekend will feature a farewell festival.',
    category: 'closing',
    location: 'Portland, OR',
    published_at: '2025-02-20',
    icon: '😢',
  },
  {
    id: 'news-8',
    headline: 'New Study Links Moderate Beer Consumption to Gut Health Benefits',
    summary: 'Research published in the Journal of Agricultural and Food Chemistry found that lager beer, both alcoholic and non-alcoholic, may promote gut microbiome diversity when consumed in moderation.',
    category: 'industry',
    published_at: '2025-02-18',
    icon: '🔬',
  },
];

export function getLatestNews(count: number = 5): BeerNews[] {
  return [...beerNews]
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, count);
}

export function getNewsByCategory(category: string): BeerNews[] {
  return beerNews.filter((n) => n.category === category);
}

const categoryLabels: Record<string, string> = {
  'opening': 'Now Open',
  'closing': 'Closing',
  'new-release': 'New Release',
  'seasonal': 'Seasonal',
  'event': 'Event',
  'industry': 'Industry',
  'award': 'Award',
};

export function getNewsCategoryLabel(category: string): string {
  return categoryLabels[category] || category;
}

const categoryColors: Record<string, string> = {
  'opening': 'bg-green-500',
  'closing': 'bg-red-500',
  'new-release': 'bg-blue-500',
  'seasonal': 'bg-pink-500',
  'event': 'bg-purple-500',
  'industry': 'bg-amber-500',
  'award': 'bg-yellow-500',
};

export function getNewsCategoryColor(category: string): string {
  return categoryColors[category] || 'bg-gray-500';
}
