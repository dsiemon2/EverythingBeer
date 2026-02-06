import { Author } from '@/types';

export const authors: Author[] = [
  {
    id: 'porter',
    name: 'Porter',
    bio: 'The official mascot and head taste-tester at EverythingBeer. Porter has been sniffing out the best brews since puppyhood and brings a nose for quality to every review.',
    avatar_url: null,
    role: 'Chief Beer Dog',
  },
  {
    id: 'staff',
    name: 'EverythingBeer Staff',
    bio: 'The editorial team behind EverythingBeer. We live, breathe, and (responsibly) drink beer so you can make informed choices at the tap.',
    avatar_url: null,
    role: 'Staff Writers',
  },
  {
    id: 'brewmaster-brian',
    name: 'Brewmaster Brian',
    bio: 'A certified Cicerone with over 15 years in the craft beer industry. Brian has brewed professionally at three craft breweries and judged at the Great American Beer Festival.',
    avatar_url: null,
    role: 'Beer Expert',
  },
];

export function getAuthorById(id: string): Author | undefined {
  return authors.find((a) => a.id === id);
}
