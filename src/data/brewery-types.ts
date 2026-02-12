export interface BreweryTypeStat {
  label: string;
  value: string;
  icon: string; // Lucide icon name
}

export interface RelatedArticle {
  slug: string;
  title: string;
}

export interface BreweryTypeData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  definitionTitle: string;
  definitionContent: string;
  openBreweryDbTypes: string[];
  hasApiData: boolean;
  stats: BreweryTypeStat[];
  relatedArticles: RelatedArticle[];
  metaTitle: string;
  metaDescription: string;
}

export const breweryTypes: BreweryTypeData[] = [
  {
    slug: 'commercial',
    name: 'Commercial Breweries',
    tagline: 'The Global Giants of Beer',
    description: 'These are the brewing powerhouses that produce the world\'s most recognized beer brands. From Anheuser-Busch InBev to Heineken, commercial breweries operate on a massive scale, distributing their products across continents and shaping the global beer market.',
    definitionTitle: 'What Makes a Commercial Brewery?',
    definitionContent: `A commercial brewery, often classified as a "large" brewery, is defined as one that produces over **6 million barrels of beer per year**. These are typically multinational corporations with operations spanning multiple countries, massive production facilities, and global distribution networks.

Commercial breweries are distinguished by their scale of operation, significant market share, and brand recognition. They often own multiple beer brands across different styles and price points. Many have expanded through mergers and acquisitions, consolidating smaller brands under corporate umbrellas.

Key characteristics include:
- **Production volume** exceeding 6 million barrels annually
- **Global or national distribution** networks
- **Multiple brand portfolios** spanning various styles and demographics
- **Publicly traded** or owned by large holding companies
- **Significant market share** in their operating regions
- **Advanced automation** and production technology`,
    openBreweryDbTypes: ['large'],
    hasApiData: true,
    stats: [
      { label: 'Major Brewing Companies Worldwide', value: '~50', icon: 'globe' },
      { label: 'Global Beer Market Share', value: '65-70%', icon: 'pie-chart' },
      { label: 'Top Producer: AB InBev Annual Output', value: '500M+ Barrels', icon: 'factory' },
      { label: 'Countries with Large Breweries', value: '50+', icon: 'map' },
      { label: 'Average Brands Per Company', value: '50-100+', icon: 'layers' },
      { label: 'Industry Revenue (Global)', value: '$600B+', icon: 'dollar-sign' },
    ],
    relatedArticles: [
      { slug: 'the-history-of-beer', title: 'The History of Beer' },
      { slug: 'how-beer-shaped-the-world', title: 'How Beer Shaped the World' },
      { slug: 'reinheitsgebot-german-purity-law', title: 'The Reinheitsgebot: The German Purity Law' },
    ],
    metaTitle: 'Commercial Breweries - Major Beer Producers | EverythingBeer',
    metaDescription: 'Explore the world\'s largest commercial breweries. Learn what defines a commercial brewery, browse major producers like AB InBev, Heineken, and Molson Coors, and discover industry stats.',
  },
  {
    slug: 'craft',
    name: 'Craft Breweries',
    tagline: 'Independent, Artisanal, Innovative',
    description: 'Craft breweries are the heart and soul of the modern beer revolution. These independent breweries prioritize quality, flavor, and brewing innovation over mass production, creating everything from hop-forward IPAs to complex barrel-aged stouts.',
    definitionTitle: 'What Makes a Craft Brewery?',
    definitionContent: `According to the **Brewers Association**, a craft brewery must meet three criteria:

**Small:** Annual production of less than **6 million barrels** of beer. This threshold has been adjusted over the years as the industry has grown, but it ensures craft breweries remain relatively small compared to multinational producers.

**Independent:** Less than **25% of the brewery** is owned or controlled by a beverage alcohol industry member that is not itself a craft brewer. This independence ensures that craft breweries maintain their creative freedom and aren't beholden to corporate interests.

**Traditional:** The majority of the brewery's total beverage alcohol volume must be in beers whose flavor derives from **traditional or innovative brewing ingredients** and their fermentation. This distinguishes craft brewers from companies that produce flavored malt beverages or "alcopops."

The craft beer movement has transformed the American beer landscape since the late 1970s when homebrewing was legalized. What started with pioneers like Sierra Nevada, Anchor Brewing, and Sam Adams has grown into a thriving industry of nearly 10,000 craft breweries nationwide.`,
    openBreweryDbTypes: ['micro', 'regional'],
    hasApiData: true,
    stats: [
      { label: 'Craft Breweries in the US', value: '9,500+', icon: 'building-2' },
      { label: 'US Beer Market Share (Volume)', value: '~13%', icon: 'pie-chart' },
      { label: 'US Beer Market Share (Revenue)', value: '~25%', icon: 'dollar-sign' },
      { label: 'Jobs Created by Craft Brewing', value: '550,000+', icon: 'users' },
      { label: 'Economic Impact (Annual)', value: '$82B+', icon: 'trending-up' },
      { label: 'Growth Rate (Year over Year)', value: '~5%', icon: 'bar-chart' },
    ],
    relatedArticles: [
      { slug: 'rise-of-craft-lagers', title: 'The Rise of Craft Lagers' },
      { slug: 'ipa-vs-pale-ale-showdown', title: 'IPA vs. Pale Ale: The Ultimate Showdown' },
      { slug: 'hops-the-flower-behind-the-flavor', title: 'Hops: The Flower Behind the Flavor' },
    ],
    metaTitle: 'Craft Breweries - Independent & Artisanal | EverythingBeer',
    metaDescription: 'Discover craft breweries — small, independent, and traditional brewers pushing the boundaries of beer. Browse notable craft breweries, industry stats, and the craft beer movement.',
  },
  {
    slug: 'micro',
    name: 'Microbreweries',
    tagline: 'Small Batch, Big Flavor',
    description: 'Microbreweries are the small-scale innovators of the beer world. With annual production under 15,000 barrels, these breweries focus on quality over quantity, often experimenting with unique ingredients and brewing techniques that larger operations can\'t risk.',
    definitionTitle: 'What Makes a Microbrewery?',
    definitionContent: `A microbrewery is defined as a brewery that produces **fewer than 15,000 barrels of beer per year**. The term originated in the 1970s in the United Kingdom to describe the new wave of small breweries that emerged alongside the Campaign for Real Ale (CAMRA) movement.

In the United States, microbreweries are further distinguished by their distribution model: at least **75% of their beer is sold off-site** through traditional distribution channels (retailers, bars, restaurants), as opposed to being sold directly from a taproom.

What sets microbreweries apart:
- **Production cap** of 15,000 barrels annually (roughly 465,000 gallons)
- **Off-site sales** make up the majority of their revenue
- **Specialized focus** on specific beer styles or brewing techniques
- **Local identity** deeply connected to their community
- **Innovation hub** where experimental recipes are born
- **Personal touch** — many are founder-operated with small teams

Microbreweries are often where the most exciting beer trends start. Hazy IPAs, pastry stouts, and fruited sours all gained traction in the microbrewery scene before being adopted by larger craft producers.`,
    openBreweryDbTypes: ['micro'],
    hasApiData: true,
    stats: [
      { label: 'Microbreweries in the US', value: '2,000+', icon: 'building-2' },
      { label: 'Max Annual Production', value: '15,000 Barrels', icon: 'bar-chart' },
      { label: 'Average Team Size', value: '5-15 People', icon: 'users' },
      { label: 'States with 100+ Micros', value: '10+', icon: 'map' },
      { label: 'New Micros Opening Yearly', value: '300+', icon: 'trending-up' },
      { label: 'Average Beers on Tap', value: '8-16', icon: 'beer' },
    ],
    relatedArticles: [
      { slug: 'rise-of-craft-lagers', title: 'The Rise of Craft Lagers' },
      { slug: 'home-brewing-getting-started', title: 'Home Brewing 101: Getting Started' },
      { slug: 'hops-the-flower-behind-the-flavor', title: 'Hops: The Flower Behind the Flavor' },
    ],
    metaTitle: 'Microbreweries - Small Batch Producers | EverythingBeer',
    metaDescription: 'Explore microbreweries — small batch producers making under 15,000 barrels per year. Find microbreweries near you, learn what defines a microbrewery, and discover notable names.',
  },
  {
    slug: 'regional',
    name: 'Regional Breweries',
    tagline: 'Large-Scale Craft Excellence',
    description: 'Regional breweries bridge the gap between small craft operations and massive commercial producers. With production between 15,000 and 6 million barrels, these breweries have scaled their operations while maintaining the quality and character that made them successful.',
    definitionTitle: 'What Makes a Regional Brewery?',
    definitionContent: `A regional brewery produces between **15,000 and 6,000,000 barrels of beer per year**. These are the breweries that have successfully scaled beyond microbrewery status while retaining their craft identity and commitment to quality.

Regional breweries represent some of the most beloved names in American craft beer. Companies like Sierra Nevada, New Belgium, and Deschutes started as tiny operations and grew into regional powerhouses through consistent quality and smart business decisions.

Key characteristics include:
- **Production range** of 15,000 to 6 million barrels annually
- **Multi-state or national distribution** while maintaining quality
- **Established brand recognition** beyond their local market
- **Significant employment** — often 100+ employees
- **Major economic contributors** to their local communities
- **Innovation capacity** with resources for R&D and experimentation
- **Industry leadership** in sustainability, community involvement, and beer culture

Many regional breweries have become landmarks in their cities. Their taprooms and brewery tours attract tens of thousands of visitors annually, contributing significantly to local tourism economies.`,
    openBreweryDbTypes: ['regional'],
    hasApiData: true,
    stats: [
      { label: 'Regional Breweries in the US', value: '~200', icon: 'building-2' },
      { label: 'Production Range', value: '15K-6M Barrels', icon: 'bar-chart' },
      { label: 'Average Annual Revenue', value: '$10M-$500M', icon: 'dollar-sign' },
      { label: 'Average Employees', value: '100-1,000+', icon: 'users' },
      { label: 'Top State: California', value: '30+ Regionals', icon: 'map' },
      { label: 'Tourism Impact (Annual Visitors)', value: 'Millions', icon: 'trending-up' },
    ],
    relatedArticles: [
      { slug: 'rise-of-craft-lagers', title: 'The Rise of Craft Lagers' },
      { slug: 'how-beer-shaped-the-world', title: 'How Beer Shaped the World' },
      { slug: 'ipa-vs-pale-ale-showdown', title: 'IPA vs. Pale Ale: The Ultimate Showdown' },
    ],
    metaTitle: 'Regional Breweries - Large Craft Producers | EverythingBeer',
    metaDescription: 'Discover regional breweries producing 15,000 to 6 million barrels per year. Browse iconic names like Sierra Nevada and New Belgium, and explore regional brewery stats.',
  },
  {
    slug: 'homebrew',
    name: 'Homebrewing',
    tagline: 'Brew Your Own, Your Way',
    description: 'Homebrewing is where passion meets the pint glass. Whether you\'re making your first extract batch or perfecting an all-grain recipe, brewing beer at home connects you to thousands of years of brewing tradition — and a vibrant community of fellow homebrewers.',
    definitionTitle: 'What is Homebrewing?',
    definitionContent: `Homebrewing is the practice of **brewing beer at home for personal consumption**, not for commercial sale. It was legalized at the federal level in the United States in **1978** when President Jimmy Carter signed H.R. 1337, removing federal restrictions on home beer and wine making.

Today, homebrewing is legal in all 50 US states (Mississippi was the last to legalize it in 2013). Federal law allows each adult in a household to brew up to **100 gallons per year** (200 gallons for households with two or more adults).

Homebrewing comes in several forms:
- **Extract brewing** — The simplest method, using pre-made malt extract. Great for beginners and can produce excellent beer with minimal equipment ($75-$150 to start).
- **Partial mash** — A hybrid approach combining malt extract with some grain mashing for more control over flavor.
- **All-grain brewing** — The most hands-on method, starting from raw malted grains. Gives complete control over the recipe but requires more equipment and time.
- **Brew-in-a-bag (BIAB)** — A simplified all-grain method that uses a mesh bag to combine mashing and lautering in a single vessel.

The homebrewing community is one of the most welcoming in the beer world. Local homebrew clubs, competitions, and online forums provide endless opportunities to learn, share recipes, and improve your craft.`,
    openBreweryDbTypes: [],
    hasApiData: false,
    stats: [
      { label: 'US Homebrewers', value: '1.2M+', icon: 'users' },
      { label: 'Average Batches Per Year', value: '10-12', icon: 'bar-chart' },
      { label: 'Starter Kit Cost', value: '$75-$150', icon: 'dollar-sign' },
      { label: 'Most Brewed Style', value: 'Pale Ale / IPA', icon: 'beer' },
      { label: 'Homebrew Clubs in the US', value: '1,000+', icon: 'map' },
      { label: 'Legalized Federally', value: '1978', icon: 'calendar' },
    ],
    relatedArticles: [
      { slug: 'home-brewing-getting-started', title: 'Home Brewing 101: Getting Started' },
      { slug: 'hops-the-flower-behind-the-flavor', title: 'Hops: The Flower Behind the Flavor' },
      { slug: 'the-history-of-beer', title: 'The History of Beer' },
    ],
    metaTitle: 'Homebrewing - Brew Your Own Beer | EverythingBeer',
    metaDescription: 'Everything you need to know about homebrewing. Learn how to brew beer at home, get started with extract or all-grain brewing, find resources, and join the homebrew community.',
  },
];

export function getBreweryTypeData(slug: string): BreweryTypeData | undefined {
  return breweryTypes.find((t) => t.slug === slug);
}
