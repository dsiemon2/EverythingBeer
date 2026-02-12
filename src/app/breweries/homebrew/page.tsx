import { getBreweryTypeData } from '@/data/brewery-types';
import BreweryTypeLandingPage from '@/components/BreweryTypeLandingPage';

const typeData = getBreweryTypeData('homebrew')!;

export const metadata = {
  title: typeData.metaTitle,
  description: typeData.metaDescription,
};

export default function HomebrewPage() {
  return <BreweryTypeLandingPage data={typeData} />;
}
