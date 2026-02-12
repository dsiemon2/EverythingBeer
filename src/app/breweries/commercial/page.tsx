import { getBreweryTypeData } from '@/data/brewery-types';
import { commercialBreweries } from '@/data/curated-breweries';
import BreweryTypeLandingPage from '@/components/BreweryTypeLandingPage';

const typeData = getBreweryTypeData('commercial')!;

export const metadata = {
  title: typeData.metaTitle,
  description: typeData.metaDescription,
};

export default function CommercialBreweriesPage() {
  return <BreweryTypeLandingPage data={typeData} curatedBreweries={commercialBreweries} />;
}
