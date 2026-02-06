import { Video } from '@/types';

export const videos: Video[] = [
  {
    id: 'vid-1',
    title: 'Every Style of Beer Explained',
    youtube_id: 'zcYUBRaEj2s',
    channel: 'WIRED',
    description: 'Craft beer expert breaks down every style of beer from lagers to lambics, explaining what makes each one unique.',
    category: 'education',
    duration: '24:18',
  },
  {
    id: 'vid-2',
    title: 'How Pilsner Beer Was Invented in Czech Republic',
    youtube_id: 'JvEasMJqSfU',
    channel: 'DW Documentary',
    description: 'The fascinating history of how Pilsner Urquell became the world\'s first golden lager in 1842.',
    category: 'education',
    duration: '42:26',
  },
  {
    id: 'vid-3',
    title: 'How to Homebrew with Fresh Hops',
    youtube_id: 'a70zI0jMaic',
    channel: 'Clawhammer Supply',
    description: 'Step-by-step guide to brewing beer with fresh hops straight from the vine during harvest season.',
    category: 'homebrew',
    duration: '15:42',
  },
  {
    id: 'vid-4',
    title: 'How Beer Saved the World',
    youtube_id: 'PdmOGSseRkI',
    channel: 'Discovery',
    description: 'Exploration of how beer influenced civilization, from ancient Egypt to the Industrial Revolution.',
    category: 'culture',
    duration: '44:00',
  },
  {
    id: 'vid-5',
    title: 'Inside the World\'s Largest Brewery',
    youtube_id: 'dsjFnKLLOR4',
    channel: 'Business Insider',
    description: 'A behind-the-scenes tour of massive brewing operations and how millions of gallons of beer are produced.',
    category: 'brewery-tour',
    duration: '12:33',
  },
  {
    id: 'vid-6',
    title: 'Beer Expert Reviews Cheap vs. Expensive Beers',
    youtube_id: 'MRiQtYOQfBk',
    channel: 'Epicurious',
    description: 'A certified Cicerone taste-tests beers at different price points to see if you really get what you pay for.',
    category: 'review',
    duration: '18:45',
  },
];

export function getVideosByCategory(category: string): Video[] {
  return videos.filter((v) => v.category === category);
}

export function getFeaturedVideos(count: number = 4): Video[] {
  return videos.slice(0, count);
}
