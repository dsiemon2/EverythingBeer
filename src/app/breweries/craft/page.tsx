import { getBreweryTypeData } from '@/data/brewery-types';
import { craftBreweries } from '@/data/curated-breweries';
import BreweryTypeLandingPage from '@/components/BreweryTypeLandingPage';

const typeData = getBreweryTypeData('craft')!;

export const metadata = {
  title: typeData.metaTitle,
  description: typeData.metaDescription,
};

export default function CraftBreweriesPage() {
  return <BreweryTypeLandingPage data={typeData} curatedBreweries={craftBreweries} />;
}
