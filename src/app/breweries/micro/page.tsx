import { getBreweryTypeData } from '@/data/brewery-types';
import { getCuratedMicroBreweries } from '@/data/curated-breweries';
import BreweryTypeLandingPage from '@/components/BreweryTypeLandingPage';

const typeData = getBreweryTypeData('micro')!;

export const metadata = {
  title: typeData.metaTitle,
  description: typeData.metaDescription,
};

export default function MicrobreweriesPage() {
  return <BreweryTypeLandingPage data={typeData} curatedBreweries={getCuratedMicroBreweries()} />;
}
