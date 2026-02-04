export interface Beer {
  id: string;
  name: string;
  brewery_id: string;
  brewery_name: string;
  style_id: string;
  style_name: string;
  is_craft: boolean;
  is_commercial: boolean;
  is_trending?: boolean;
  country_of_origin: string;
  abv: number | null;
  ibu: number | null;
  srm: number | null;
  description: string | null;
  availability: 'year-round' | 'seasonal' | 'limited' | null;
  tags: string[];
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Brewery {
  id: string;
  name: string;
  brewery_type: string;
  street: string | null;
  city: string;
  state: string;
  state_province: string;
  postal_code: string;
  country: string;
  longitude: number | null;
  latitude: number | null;
  phone: string | null;
  website_url: string | null;
  address_1: string | null;
  address_2: string | null;
  address_3: string | null;
}

export interface Style {
  id: string;
  system: string;
  code: string;
  name: string;
  description: string;
  parent_style_id: string | null;
  category: string;
  abv_min: number | null;
  abv_max: number | null;
  ibu_min: number | null;
  ibu_max: number | null;
  srm_min: number | null;
  srm_max: number | null;
  og_min: number | null;
  og_max: number | null;
  fg_min: number | null;
  fg_max: number | null;
}

export interface Comparison {
  id: string;
  slug: string;
  beer_a: Beer;
  beer_b: Beer;
  summary: string;
  winner: string | null;
  criteria: {
    flavor: { a: number; b: number };
    aroma: { a: number; b: number };
    mouthfeel: { a: number; b: number };
    appearance: { a: number; b: number };
    value: { a: number; b: number };
  };
}

export interface Guide {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'education' | 'pairing' | 'seasonal' | 'comparison' | 'beginner';
  featured_image: string | null;
  tags: string[];
  read_time: number;
  created_at: string;
  updated_at: string;
}

export interface BeerSimilarity {
  beer_id: string;
  similar_beer_id: string;
  similar_beer: Beer;
  score: number;
  reason: {
    style_match: number;
    tag_overlap: number;
    abv_delta: number;
  };
}

export interface SearchFilters {
  q?: string;
  style?: string;
  abv_min?: number;
  abv_max?: number;
  ibu_min?: number;
  ibu_max?: number;
  country?: string;
  tag?: string;
  availability?: string;
  is_craft?: boolean;
}
