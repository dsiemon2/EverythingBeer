import { Video } from '@/types';

export const videos: Video[] = [
  {
    id: 'vid-1',
    title: 'Every Style of Beer Explained',
    youtube_id: 'P75SvA344QI',
    channel: 'WIRED',
    description: 'Craft beer expert breaks down every style of beer from lagers to lambics, explaining what makes each one unique.',
    category: 'education',
    duration: '24:18',
  },
  {
    id: 'vid-2',
    title: 'How Pils Beer Was Invented in the Czech Republic',
    youtube_id: 'SFxJSfKgMDE',
    channel: 'DW Food',
    description: 'The fascinating history of how Pilsner Urquell became the world\'s first golden lager in 1842.',
    category: 'education',
    duration: '42:26',
  },
  {
    id: 'vid-3',
    title: 'How to Homebrew with Fresh Hops',
    youtube_id: 'N96tS_PV6U4',
    channel: 'NorthernBrewerTV',
    description: 'Step-by-step guide to brewing beer with fresh hops straight from the vine during harvest season.',
    category: 'homebrew',
    duration: '15:42',
  },
  {
    id: 'vid-4',
    title: 'How Beer Saved the World',
    youtube_id: 'aV36ytSgC3o',
    channel: 'Discovery',
    description: 'Exploration of how beer influenced civilization, from ancient Egypt to the Industrial Revolution.',
    category: 'culture',
    duration: '44:00',
  },
];

export function getVideosByCategory(category: string): Video[] {
  return videos.filter((v) => v.category === category);
}

export function getFeaturedVideos(count: number = 4): Video[] {
  return videos.slice(0, count);
}
