import type { EquipmentItem } from '@/types';

export const equipmentItems: EquipmentItem[] = [
  // ─── Starter Tier ─────────────────────────────────────────
  // Brewing
  {
    name: 'Brew Kettle (3-5 gallon)',
    description: 'A large stockpot for boiling wort. For extract brewing, a 3-5 gallon kettle works for partial boils. Stainless steel or aluminum both work fine.',
    tier: 'starter',
    category: 'brewing',
    priceRange: '$30-60',
    essential: true,
  },
  {
    name: 'Large Spoon or Paddle',
    description: 'A long-handled stainless steel or food-grade plastic spoon for stirring the boil. Needs to reach the bottom of your kettle.',
    tier: 'starter',
    category: 'brewing',
    priceRange: '$5-15',
    essential: true,
  },
  // Fermentation
  {
    name: 'Fermenting Bucket (6.5 gallon)',
    description: 'A food-grade plastic bucket with a tight-fitting lid and a hole for an airlock. This is where your beer will ferment for 1-2 weeks.',
    tier: 'starter',
    category: 'fermentation',
    priceRange: '$15-25',
    essential: true,
  },
  {
    name: 'Airlock & Stopper',
    description: 'A small device filled with sanitizer that lets CO2 escape during fermentation while keeping oxygen and bacteria out. Three-piece airlocks are easiest to clean.',
    tier: 'starter',
    category: 'fermentation',
    priceRange: '$2-5',
    essential: true,
  },
  // Bottling
  {
    name: 'Bottles (48-54 per batch)',
    description: '12 oz pry-off bottles (not twist-off). You can buy new or reuse commercial bottles. Brown glass is best for protecting beer from light.',
    tier: 'starter',
    category: 'bottling',
    priceRange: '$15-30',
    essential: true,
  },
  {
    name: 'Bottle Capper',
    description: 'A hand-held or bench-mounted device for crimping metal caps onto bottles. Wing cappers are cheapest; bench cappers are easier to use.',
    tier: 'starter',
    category: 'bottling',
    priceRange: '$15-25',
    essential: true,
  },
  {
    name: 'Bottle Caps',
    description: 'Standard 26mm crown caps. Buy oxygen-absorbing caps for better shelf life. A 5-gallon batch needs about 50 caps.',
    tier: 'starter',
    category: 'bottling',
    priceRange: '$3-8',
    essential: true,
  },
  {
    name: 'Siphon & Tubing',
    description: 'A racking cane and food-grade tubing for transferring beer from fermenter to bottles without disturbing sediment.',
    tier: 'starter',
    category: 'bottling',
    priceRange: '$8-15',
    essential: true,
  },
  // Measurement
  {
    name: 'Hydrometer',
    description: 'A glass instrument that measures the specific gravity (density) of your wort/beer. Essential for calculating ABV and knowing when fermentation is complete.',
    tier: 'starter',
    category: 'measurement',
    priceRange: '$8-15',
    essential: true,
  },
  {
    name: 'Thermometer',
    description: 'A reliable thermometer for checking mash temperatures, cooling wort, and monitoring fermentation. Digital or dial-type both work.',
    tier: 'starter',
    category: 'measurement',
    priceRange: '$5-15',
    essential: true,
  },
  // Cleaning
  {
    name: 'Sanitizer (Star San or similar)',
    description: 'A no-rinse acid-based sanitizer. Everything that touches your beer after the boil must be sanitized. Star San is the industry standard.',
    tier: 'starter',
    category: 'cleaning',
    priceRange: '$10-15',
    essential: true,
  },
  {
    name: 'Bottle Brush',
    description: 'A long-handled brush for scrubbing the inside of bottles and carboys. Nylon bristles are best to avoid scratching.',
    tier: 'starter',
    category: 'cleaning',
    priceRange: '$3-8',
    essential: true,
  },

  // ─── Intermediate Tier ────────────────────────────────────
  // Brewing
  {
    name: 'Brew Kettle (8-10 gallon)',
    description: 'A larger kettle allows full-volume boils for 5-gallon batches, improving hop utilization and reducing the need to top off with water.',
    tier: 'intermediate',
    category: 'brewing',
    priceRange: '$60-120',
    essential: true,
  },
  {
    name: 'Wort Chiller (Immersion)',
    description: 'A copper or stainless steel coil that connects to a garden hose. Rapidly cools boiling wort to pitching temperature in 15-20 minutes instead of an ice bath.',
    tier: 'intermediate',
    category: 'brewing',
    priceRange: '$50-80',
    essential: true,
  },
  {
    name: 'Propane Burner',
    description: 'An outdoor propane burner for heating larger kettles. Much faster than a stovetop and lets you brew outdoors. Banjo-style burners are most popular.',
    tier: 'intermediate',
    category: 'brewing',
    priceRange: '$40-80',
    essential: false,
  },
  // Fermentation
  {
    name: 'Glass Carboy (6-6.5 gallon)',
    description: 'A glass vessel for secondary fermentation. Provides a better seal than plastic and lets you see the beer clearly. Heavy — handle with care.',
    tier: 'intermediate',
    category: 'fermentation',
    priceRange: '$30-50',
    essential: false,
  },
  {
    name: 'Fermentation Temperature Control',
    description: 'A temperature controller (like an Inkbird) paired with a mini fridge or chest freezer. Consistent fermentation temperature is the single biggest quality improvement.',
    tier: 'intermediate',
    category: 'fermentation',
    priceRange: '$35-60 (controller only)',
    essential: true,
  },
  {
    name: 'Blow-Off Tube',
    description: 'A large-diameter tube that replaces the airlock during vigorous fermentation. Prevents messy blow-offs with high-gravity or aggressive yeast strains.',
    tier: 'intermediate',
    category: 'fermentation',
    priceRange: '$3-8',
    essential: false,
  },
  // Bottling
  {
    name: 'Auto-Siphon',
    description: 'A spring-loaded siphon that starts flow with a simple pump action. Much easier and more sanitary than mouth-starting a regular siphon.',
    tier: 'intermediate',
    category: 'bottling',
    priceRange: '$12-20',
    essential: true,
  },
  {
    name: 'Bottling Bucket with Spigot',
    description: 'A 6.5-gallon bucket with a built-in spigot at the bottom. Used for mixing priming sugar evenly before bottling. Gravity-fed filling is much cleaner.',
    tier: 'intermediate',
    category: 'bottling',
    priceRange: '$15-25',
    essential: true,
  },
  {
    name: 'Bottle Filler Wand',
    description: 'A spring-tipped tube that attaches to your siphon. Press the tip on the bottle bottom to fill, lift to stop. Reduces oxidation and mess.',
    tier: 'intermediate',
    category: 'bottling',
    priceRange: '$5-10',
    essential: true,
  },
  // Measurement
  {
    name: 'Refractometer',
    description: 'Measures specific gravity using just a few drops of wort. Much faster and easier than a hydrometer during the brew day. Requires correction factor for post-fermentation readings.',
    tier: 'intermediate',
    category: 'measurement',
    priceRange: '$20-40',
    essential: false,
  },
  // Cleaning
  {
    name: 'PBW (Powdered Brewery Wash)',
    description: 'A powerful alkaline cleaner designed specifically for brewing equipment. Removes stubborn residue that regular soap can\'t. Soak, rinse, then sanitize.',
    tier: 'intermediate',
    category: 'cleaning',
    priceRange: '$10-20',
    essential: true,
  },

  // ─── Advanced Tier ────────────────────────────────────────
  // Brewing (All-Grain)
  {
    name: 'Mash Tun (10-15 gallon cooler)',
    description: 'An insulated cooler converted with a false bottom or braided stainless steel hose for mashing grains. Maintains temperature for 60+ minute mashes.',
    tier: 'advanced',
    category: 'brewing',
    priceRange: '$50-100 (DIY) / $100-200 (pre-built)',
    essential: true,
  },
  {
    name: 'Hot Liquor Tank',
    description: 'A second large kettle or cooler for heating sparge water. Having dedicated vessels for each step streamlines all-grain brew days.',
    tier: 'advanced',
    category: 'brewing',
    priceRange: '$40-80',
    essential: false,
  },
  {
    name: 'Grain Mill',
    description: 'A two-roller mill for crushing your own malted barley. Freshly crushed grain gives better efficiency and flavor than pre-crushed grain from the store.',
    tier: 'advanced',
    category: 'brewing',
    priceRange: '$80-150',
    essential: false,
  },
  {
    name: 'Counterflow or Plate Chiller',
    description: 'Advanced wort chillers that cool wort inline as it flows from kettle to fermenter. Faster and more water-efficient than immersion chillers.',
    tier: 'advanced',
    category: 'brewing',
    priceRange: '$80-150',
    essential: false,
  },
  {
    name: 'Brew Pump',
    description: 'A food-grade pump for transferring hot liquids between vessels. Essential for recirculating mash (HERMS/RIMS) and moving wort without lifting.',
    tier: 'advanced',
    category: 'brewing',
    priceRange: '$60-120',
    essential: false,
  },
  // Fermentation
  {
    name: 'Conical Fermenter (SS Brewtech, etc.)',
    description: 'Professional-style stainless steel fermenters with cone bottoms for yeast harvesting, dump valves, and temperature control ports.',
    tier: 'advanced',
    category: 'fermentation',
    priceRange: '$200-600',
    essential: false,
  },
  {
    name: 'Glycol Chiller System',
    description: 'A dedicated cooling system for precise fermentation temperature control. Used with jacketed fermenters for exact temperature within ±1°F.',
    tier: 'advanced',
    category: 'fermentation',
    priceRange: '$300-800',
    essential: false,
  },
  // Kegging
  {
    name: 'Corny Keg (5 gallon)',
    description: 'A stainless steel keg used for force-carbonating and serving homebrew. Available in ball-lock and pin-lock varieties. Much easier than bottling.',
    tier: 'advanced',
    category: 'kegging',
    priceRange: '$40-80 (used) / $80-150 (new)',
    essential: true,
  },
  {
    name: 'CO2 Tank & Regulator',
    description: 'A 5-20 lb CO2 tank with a dual-gauge regulator for force carbonation and dispensing. A 5 lb tank carbonates about 6-8 kegs.',
    tier: 'advanced',
    category: 'kegging',
    priceRange: '$80-150',
    essential: true,
  },
  {
    name: 'Kegerator or Keezer',
    description: 'A converted refrigerator or chest freezer for storing and dispensing kegs with tap handles. The ultimate homebrew setup.',
    tier: 'advanced',
    category: 'kegging',
    priceRange: '$150-400 (DIY) / $400-1000+ (pre-built)',
    essential: false,
  },
  {
    name: 'Draft Lines, Disconnects & Faucets',
    description: 'Liquid and gas disconnects, beverage tubing, and stainless faucets for a complete draft system. Ball-lock disconnects are most common.',
    tier: 'advanced',
    category: 'kegging',
    priceRange: '$30-80',
    essential: true,
  },
  // Measurement
  {
    name: 'pH Meter',
    description: 'A digital pH meter for measuring mash pH. All-grain brewers should target a mash pH of 5.2-5.4 for optimal enzyme activity and flavor.',
    tier: 'advanced',
    category: 'measurement',
    priceRange: '$30-80',
    essential: true,
  },
  {
    name: 'Digital Scale (precision)',
    description: 'A precision digital scale (0.1g resolution) for measuring hops, salts, and water chemistry additions accurately.',
    tier: 'advanced',
    category: 'measurement',
    priceRange: '$15-40',
    essential: true,
  },
];

// ─── Helper Functions ───────────────────────────────────────

export function getEquipmentByTier(tier: EquipmentItem['tier']): EquipmentItem[] {
  return equipmentItems.filter((item) => item.tier === tier);
}

export function getEssentialEquipment(tier: EquipmentItem['tier']): EquipmentItem[] {
  return equipmentItems.filter((item) => item.tier === tier && item.essential);
}

export function getOptionalEquipment(tier: EquipmentItem['tier']): EquipmentItem[] {
  return equipmentItems.filter((item) => item.tier === tier && !item.essential);
}

export function getAllEquipment(): EquipmentItem[] {
  return equipmentItems;
}

export function getEquipmentByCategory(category: EquipmentItem['category']): EquipmentItem[] {
  return equipmentItems.filter((item) => item.category === category);
}

export interface TierSummary {
  tier: EquipmentItem['tier'];
  label: string;
  description: string;
  totalPriceRange: string;
  essentialCount: number;
  optionalCount: number;
}

export const tierSummaries: TierSummary[] = [
  {
    tier: 'starter',
    label: 'Starter Kit',
    description: 'Everything you need to brew your first batch of extract beer at home. Start here if you\'re brand new to homebrewing.',
    totalPriceRange: '$80-150',
    essentialCount: getEssentialEquipment('starter').length,
    optionalCount: getOptionalEquipment('starter').length,
  },
  {
    tier: 'intermediate',
    label: 'Intermediate Upgrade',
    description: 'Level up your brewing with better temperature control, easier bottling, and full-volume boils. These upgrades make the biggest difference in beer quality.',
    totalPriceRange: '$150-400',
    essentialCount: getEssentialEquipment('intermediate').length,
    optionalCount: getOptionalEquipment('intermediate').length,
  },
  {
    tier: 'advanced',
    label: 'Advanced / All-Grain',
    description: 'Go all-grain for complete control over your recipes. Add kegging to skip bottling day forever. This is where brewing becomes truly your own.',
    totalPriceRange: '$400-800+',
    essentialCount: getEssentialEquipment('advanced').length,
    optionalCount: getOptionalEquipment('advanced').length,
  },
];
