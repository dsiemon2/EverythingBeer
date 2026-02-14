import { PintSizedPost } from '@/types';

// Homebrew Edition — Pint-Sized Posts
// ============================================================
// These are homebrewing-specific facts shown in the sidebar
// of all /homebrew pages. Same rotation logic as the main PSPs:
// - Sidebar shows recent facts from the last 30 days
// - Falls back to the most recent N facts if not enough recent
// ============================================================

export const homebrewPintSizedPosts: PintSizedPost[] = [
  {
    id: 'hb-psp-20',
    fact: 'Dry yeast can be stored at room temperature for months, but liquid yeast needs refrigeration and has a much shorter shelf life — always check the date.',
    category: 'did-you-know',
    icon: '🧫',
    created_at: '2026-02-13',
  },
  {
    id: 'hb-psp-19',
    fact: 'The ideal fermentation temperature for most ales is 64–72°F. Even a 5°F swing can produce off-flavors like banana esters or fusel alcohols.',
    category: 'science',
    icon: '🌡️',
    created_at: '2026-02-12',
  },
  {
    id: 'hb-psp-18',
    fact: 'Star San sanitizer works on contact in just 30 seconds — and no, you do NOT need to rinse it off. "Don\'t fear the foam" is the homebrewer\'s motto.',
    category: 'did-you-know',
    icon: '🧼',
    created_at: '2026-02-11',
  },
  {
    id: 'hb-psp-17',
    fact: 'A stuck fermentation usually means your yeast is stressed — under-pitching, wrong temperature, or low oxygen at pitch time are the most common culprits.',
    category: 'science',
    icon: '⚠️',
    created_at: '2026-02-10',
  },
  {
    id: 'hb-psp-16',
    fact: 'BIAB (Brew In A Bag) lets you do all-grain brewing with just one pot and a mesh bag — no fancy mash tun required.',
    category: 'did-you-know',
    icon: '🎒',
    created_at: '2026-02-09',
  },
  {
    id: 'hb-psp-15',
    fact: 'Cascade hops were released in 1972 and literally launched the American craft beer revolution. They remain the most-used hop variety in the US.',
    category: 'history',
    icon: '🌿',
    created_at: '2026-02-08',
  },
  {
    id: 'hb-psp-14',
    fact: 'Your first homebrew will cost roughly $2–4 per six-pack after the initial equipment investment. By your third batch, you\'re saving real money.',
    category: 'stats',
    icon: '💰',
    created_at: '2026-02-07',
  },
  {
    id: 'hb-psp-13',
    fact: 'Secondary fermentation in a separate vessel is mostly a myth for beginners — modern yeast is clean enough that you can leave beer on the primary yeast cake for weeks.',
    category: 'did-you-know',
    icon: '🧪',
    created_at: '2026-02-06',
  },
  {
    id: 'hb-psp-12',
    fact: 'The #1 upgrade that improves homebrew quality isn\'t a better kettle — it\'s fermentation temperature control. A $20 swamp cooler beats a $200 pot upgrade every time.',
    category: 'did-you-know',
    icon: '🏆',
    created_at: '2026-02-05',
  },
  {
    id: 'hb-psp-11',
    fact: 'Extract brewing isn\'t "cheating." Many award-winning homebrews are made with extract. The key is fresh, quality extract and proper technique.',
    category: 'culture',
    icon: '🥇',
    created_at: '2026-02-04',
  },
  {
    id: 'hb-psp-10',
    fact: 'Hops added at 60 minutes contribute bitterness. At 15 minutes, flavor. At flameout or dry hop, aroma. Timing changes everything.',
    category: 'science',
    icon: '⏱️',
    created_at: '2026-02-03',
  },
  {
    id: 'hb-psp-9',
    fact: 'Charlie Papazian\'s "The Complete Joy of Homebrewing" (1984) is considered the bible of homebrewing and has sold over a million copies.',
    category: 'history',
    icon: '📚',
    created_at: '2026-02-02',
  },
  {
    id: 'hb-psp-8',
    fact: 'The most common off-flavor in homebrew is acetaldehyde — a green apple taste caused by bottling too early before the yeast has fully cleaned up.',
    category: 'science',
    icon: '🍏',
    created_at: '2026-02-01',
  },
  {
    id: 'hb-psp-7',
    fact: 'Priming sugar for bottle conditioning: about ¾ cup of corn sugar for a 5-gallon batch gives you ~2.5 volumes of CO2 — perfect for most ales.',
    category: 'did-you-know',
    icon: '🫧',
    created_at: '2026-01-30',
  },
  {
    id: 'hb-psp-6',
    fact: 'In 1978, President Jimmy Carter signed H.R. 1337, legalizing homebrewing at the federal level for the first time since Prohibition. Thanks, Jimmy.',
    category: 'history',
    icon: '🇺🇸',
    created_at: '2026-01-28',
  },
  {
    id: 'hb-psp-5',
    fact: 'An OG of 1.048 means your wort has 48 "gravity points" of dissolved sugar per gallon — each point of sugar creates roughly 0.13% ABV when fermented.',
    category: 'science',
    icon: '🔢',
    created_at: '2026-01-26',
  },
  {
    id: 'hb-psp-4',
    fact: 'The American Homebrewers Association has over 46,000 members and estimates there are 1.1 million homebrewers in the US alone.',
    category: 'stats',
    icon: '📊',
    created_at: '2026-01-24',
  },
  {
    id: 'hb-psp-3',
    fact: 'Cold crashing (chilling your fermenter to near-freezing) for 24-48 hours before bottling dramatically improves clarity — no fining agents needed.',
    category: 'did-you-know',
    icon: '❄️',
    created_at: '2026-01-22',
  },
  {
    id: 'hb-psp-2',
    fact: 'Oxygen is your friend during wort aeration (before pitching yeast) but your enemy after fermentation starts. Post-fermentation oxygen exposure causes stale, cardboard flavors.',
    category: 'science',
    icon: '💨',
    created_at: '2026-01-20',
  },
  {
    id: 'hb-psp-1',
    fact: 'The world\'s oldest continuously operating brewery, Weihenstephan in Germany (founded 1040 AD), started as a monastery homebrew operation by Benedictine monks.',
    category: 'history',
    icon: '⛪',
    created_at: '2026-01-18',
  },
];

// ============================================================
// Helper functions (mirrors main PSP helpers)
// ============================================================

export function getRecentHomebrewFacts(days: number = 30): PintSizedPost[] {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const cutoffStr = cutoff.toISOString().split('T')[0];

  const recent = homebrewPintSizedPosts.filter((p) => p.created_at >= cutoffStr);

  if (recent.length < 4) {
    return homebrewPintSizedPosts.slice(0, Math.max(4, recent.length));
  }

  return recent;
}

export function getRandomHomebrewFacts(count: number = 3, days: number = 30): PintSizedPost[] {
  const recent = getRecentHomebrewFacts(days);
  const shuffled = [...recent].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getAllHomebrewFacts(): PintSizedPost[] {
  return [...homebrewPintSizedPosts].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}
