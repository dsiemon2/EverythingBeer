import { PintSizedPost } from '@/types';

export const pintSizedPosts: PintSizedPost[] = [
  {
    id: 'psp-1',
    fact: 'The oldest known recipe in the world is for beer. A 4,000-year-old Sumerian poem honoring the goddess of brewing, Ninkasi, contains the earliest surviving beer recipe.',
    source: 'Smithsonian Magazine',
    category: 'history',
    icon: '📜',
    created_at: '2025-01-15',
  },
  {
    id: 'psp-2',
    fact: 'Cenosillicaphobia is the fear of an empty beer glass. While not an officially recognized phobia, it has become a popular term among beer enthusiasts worldwide.',
    category: 'culture',
    icon: '😱',
    created_at: '2025-01-18',
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
    id: 'psp-4',
    fact: 'Hops are in the same plant family as cannabis (Cannabaceae). Both plants produce aromatic compounds called terpenes, which contribute to their distinctive aromas.',
    category: 'science',
    icon: '🌿',
    created_at: '2025-02-01',
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
    id: 'psp-6',
    fact: 'The "study of beer" is called zythology, derived from the Greek words "zythos" (beer) and "logos" (study). A person who studies beer is called a zythologist.',
    category: 'did-you-know',
    icon: '🎓',
    created_at: '2025-02-10',
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
    id: 'psp-8',
    fact: 'The longest hangover in recorded history lasted 4 weeks after a Scotsman consumed 60 pints of beer. Doctors noted the hangover as the longest medically verified case.',
    category: 'did-you-know',
    icon: '🤕',
    created_at: '2025-02-18',
  },
  {
    id: 'psp-9',
    fact: 'Yeast is technically a living organism — a single-celled fungus. During fermentation, yeast eats sugar and produces alcohol and CO2 as byproducts. Every beer you drink is yeast poop.',
    category: 'science',
    icon: '🔬',
    created_at: '2025-02-22',
  },
  {
    id: 'psp-10',
    fact: 'In medieval Europe, beer was often safer to drink than water because the boiling process during brewing killed harmful bacteria. It was a dietary staple for adults and children alike.',
    category: 'history',
    icon: '🏰',
    created_at: '2025-03-01',
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
    id: 'psp-12',
    fact: 'President Obama was the first sitting president to brew beer at the White House. The "White House Honey Ale" used honey from the South Lawn beehives in its recipe.',
    source: 'White House Archives',
    category: 'culture',
    icon: '🇺🇸',
    created_at: '2025-03-10',
  },
];

export function getRandomFacts(count: number = 4): PintSizedPost[] {
  const shuffled = [...pintSizedPosts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getFactsByCategory(category: string): PintSizedPost[] {
  return pintSizedPosts.filter((p) => p.category === category);
}
