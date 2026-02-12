import { getBreweryTypeData } from '@/data/brewery-types';
import { getCuratedRegionalBreweries } from '@/data/curated-breweries';
import BreweryTypeLandingPage from '@/components/BreweryTypeLandingPage';

const typeData = getBreweryTypeData('regional')!;

export const metadata = {
  title: typeData.metaTitle,
  description: typeData.metaDescription,
};

export default function RegionalBreweriesPage() {
  return <BreweryTypeLandingPage data={typeData} curatedBreweries={getCuratedRegionalBreweries()} />;
}
