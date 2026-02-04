import type { Guide } from '@/types';

export const guides: Guide[] = [
  {
    id: 'beer-styles-explained',
    slug: 'beer-styles-explained',
    title: 'Beer Styles Explained: IPA vs Pale Ale vs Pilsner',
    excerpt: 'Confused by all the beer styles? Learn the key differences between popular styles like IPA, Pale Ale, and Pilsner to make better choices.',
    content: `
# Beer Styles Explained: IPA vs Pale Ale vs Pilsner

If you've ever stood in the beer aisle feeling overwhelmed by the sheer variety of styles, you're not alone. Let's break down three of the most popular styles and help you understand what makes each one unique.

## IPA (India Pale Ale)

**What it is:** A hop-forward ale known for bold, bitter flavors and strong hop aromas.

**Flavor Profile:** Citrus, pine, tropical fruits, floral notes
**ABV Range:** 5.5-7.5% (higher for Double IPAs)
**Bitterness:** High (40-70+ IBU)

IPAs were originally brewed in England with extra hops to survive the long journey to India. Today, American IPAs showcase bold, citrusy New World hops.

**Best for:** Hop lovers, those who enjoy bold flavors

---

## Pale Ale

**What it is:** A balanced ale with noticeable hop character but more malt backbone than an IPA.

**Flavor Profile:** Caramel malt, moderate citrus, floral hops
**ABV Range:** 4.5-6.2%
**Bitterness:** Moderate (30-50 IBU)

Pale Ales are more approachable than IPAs while still showcasing hop character. They're the gateway to craft beer for many people.

**Best for:** Those new to craft beer, anyone seeking balance

---

## Pilsner

**What it is:** A crisp, refreshing lager with a clean malt character and moderate hop bitterness.

**Flavor Profile:** Clean, bready malt, spicy or floral hops, crisp finish
**ABV Range:** 4.2-5.8%
**Bitterness:** Low to Moderate (22-45 IBU)

Pilsners are bottom-fermented at cold temperatures, resulting in a clean, crisp character. Czech and German Pilsners differ slightly, with Czech versions being richer and German versions being drier.

**Best for:** Hot weather, food pairing, lager lovers

---

## Quick Comparison

| Style | ABV | IBU | Best Season |
|-------|-----|-----|-------------|
| IPA | 5.5-7.5% | 40-70 | Any |
| Pale Ale | 4.5-6.2% | 30-50 | Any |
| Pilsner | 4.2-5.8% | 22-45 | Summer |
    `,
    category: 'education',
    featured_image: null,
    tags: ['styles', 'IPA', 'pale ale', 'pilsner', 'beginners'],
    read_time: 5,
    created_at: '2024-01-15',
    updated_at: '2024-01-15',
  },
  {
    id: 'best-beers-for-beginners',
    slug: 'best-beers-for-beginners',
    title: 'Best Beers for Beginners (By Flavor Profile)',
    excerpt: 'New to craft beer? Find your perfect entry point based on flavors you already love.',
    content: `
# Best Beers for Beginners (By Flavor Profile)

Starting your craft beer journey? The key is finding beers that match flavors you already enjoy. Here's your personalized roadmap.

## If You Like Sweet/Fruity Flavors

**Try: Hefeweizen or Witbier**

These wheat beers are approachable, with banana (Hefeweizen) or citrus and spice (Witbier) notes. Low bitterness and refreshing character.

**Starter Beers:**
- Blue Moon Belgian White
- Weihenstephaner Hefeweissbier

---

## If You Like Coffee

**Try: Stout or Porter**

Dark beers often have roasted, coffee-like flavors without being bitter in the "hoppy" way.

**Starter Beers:**
- Guinness Draught (lighter, creamy)
- Founders Porter (more robust)

---

## If You Like Nothing Too Strong

**Try: Session Beers or Light Lagers**

Session beers are lower in alcohol (under 5%) but still flavorful.

**Starter Beers:**
- Sierra Nevada Pale Ale
- Pilsner Urquell

---

## If You Like Citrus/Tropical Fruits

**Try: American Pale Ale or Hazy IPA**

Modern hops create incredible fruit flavors naturally, no fruit added.

**Starter Beers:**
- Sierra Nevada Pale Ale
- Bell's Two Hearted Ale

---

## General Tips for Beer Beginners

1. **Start with lower ABV** - Higher alcohol can overwhelm
2. **Drink beer fresh** - IPAs especially lose flavor over time
3. **Proper temperature matters** - Colder isn't always better
4. **Try flights** - Sample multiple styles at once
5. **Take notes** - Track what you like and why
    `,
    category: 'beginner',
    featured_image: null,
    tags: ['beginners', 'guide', 'recommendations'],
    read_time: 4,
    created_at: '2024-01-20',
    updated_at: '2024-01-20',
  },
  {
    id: 'beer-and-pizza-pairing',
    slug: 'beer-and-pizza-pairing',
    title: 'The Ultimate Beer & Pizza Pairing Guide',
    excerpt: 'Match your favorite pizza with the perfect beer. From pepperoni to margherita, we\'ve got you covered.',
    content: `
# The Ultimate Beer & Pizza Pairing Guide

Pizza and beer is a classic combination, but matching the right beer to your pizza can elevate both to new heights.

## Pepperoni Pizza

**Best Beer: American Amber Ale or Vienna Lager**

The caramel malt character complements the spicy, greasy pepperoni while cutting through the richness.

---

## Margherita Pizza

**Best Beer: Pilsner or Witbier**

The delicate flavors of fresh mozzarella, tomato, and basil need a lighter beer that won't overpower them.

---

## BBQ Chicken Pizza

**Best Beer: American Pale Ale or IPA**

The hoppy bitterness cuts through the sweet BBQ sauce while citrus notes complement the chicken.

---

## Meat Lovers Pizza

**Best Beer: Porter or Brown Ale**

Rich, malty beers with hints of chocolate and caramel stand up to the heavy meat flavors.

---

## Veggie Pizza

**Best Beer: Saison or Wheat Beer**

Light, refreshing beers with subtle spice complement the fresh vegetable flavors.

---

## White Pizza (No Tomato Sauce)

**Best Beer: Belgian Tripel or Witbier**

The creamy, garlicky cheese pairs beautifully with fruity Belgian yeast character.

---

## Quick Pairing Chart

| Pizza Style | Beer Style | Why It Works |
|-------------|------------|--------------|
| Pepperoni | Amber Ale | Malt meets meat |
| Margherita | Pilsner | Clean and fresh |
| BBQ Chicken | IPA | Hops cut sweetness |
| Meat Lovers | Porter | Rich meets rich |
| Veggie | Saison | Light and complementary |
    `,
    category: 'pairing',
    featured_image: null,
    tags: ['pairing', 'pizza', 'food'],
    read_time: 4,
    created_at: '2024-01-25',
    updated_at: '2024-01-25',
  },
  {
    id: 'understanding-abv-ibu-srm',
    slug: 'understanding-abv-ibu-srm',
    title: 'How to Read ABV, IBU, and SRM: Beer Labels Decoded',
    excerpt: 'Learn what those numbers on beer labels actually mean and how they affect your drinking experience.',
    content: `
# How to Read ABV, IBU, and SRM: Beer Labels Decoded

Those mysterious numbers on craft beer labels aren't just for beer geeks—they can help you choose beers you'll love.

## ABV (Alcohol By Volume)

**What it measures:** The percentage of alcohol in the beer.

**Ranges:**
- Session (< 5%): Easy drinking, good for extended sessions
- Standard (5-7%): Most common range
- Strong (7-10%): Sip and savor
- Imperial (10%+): Proceed with caution

**Pro tip:** Higher ABV often means more body and sweetness, as unfermented sugars contribute to both.

---

## IBU (International Bitterness Units)

**What it measures:** The level of bitterness from hops.

**Ranges:**
- Low (0-20): Light lagers, wheat beers
- Moderate (20-40): Pale ales, amber ales
- High (40-60): IPAs, some stouts
- Very High (60+): Double IPAs, hop bombs

**Important:** IBU doesn't tell the whole story. A 60 IBU beer with lots of malt can taste less bitter than a 40 IBU beer with less malt.

---

## SRM (Standard Reference Method)

**What it measures:** The color of the beer.

**Scale:**
- 1-4: Pale straw to gold (Pilsners, light lagers)
- 5-10: Gold to amber (Pale ales, IPAs)
- 10-20: Amber to brown (Ambers, brown ales)
- 20-30: Brown to dark brown (Porters)
- 30+: Black (Stouts)

**Note:** Color doesn't indicate flavor! A black lager can be lighter in flavor than a golden Belgian tripel.

---

## Putting It All Together

When you see a beer with:
- **5.5% ABV, 45 IBU, 8 SRM** → Expect a gold-colored, moderately bitter pale ale
- **8% ABV, 80 IBU, 6 SRM** → Expect a strong, very bitter double IPA
- **4.2% ABV, 35 IBU, 40 SRM** → Expect a dry, roasty Irish stout
    `,
    category: 'education',
    featured_image: null,
    tags: ['education', 'labels', 'ABV', 'IBU', 'SRM'],
    read_time: 5,
    created_at: '2024-02-01',
    updated_at: '2024-02-01',
  },
  {
    id: 'summer-beers-guide',
    slug: 'summer-beers-guide',
    title: 'Best Summer Beers: Stay Cool and Refreshed',
    excerpt: 'Beat the heat with these refreshing beer styles perfect for hot summer days.',
    content: `
# Best Summer Beers: Stay Cool and Refreshed

When temperatures rise, reach for these crisp, refreshing styles that won't weigh you down.

## Top Summer Styles

### 1. Pilsner
The quintessential summer beer. Crisp, clean, and endlessly drinkable.
**Recommendation:** Pilsner Urquell

### 2. Wheat Beer
Light body with refreshing citrus or banana notes.
**Recommendation:** Weihenstephaner Hefeweissbier

### 3. Gose
Slightly sour and salty—incredibly refreshing.
**Recommendation:** Anderson Valley The Kimmie, The Yink & The Holy Gose

### 4. Session IPA
All the hop flavor, less alcohol.
**Recommendation:** Founders All Day IPA

### 5. Blonde Ale
Approachable, balanced, and crowd-pleasing.
**Recommendation:** Firestone Walker 805

---

## Summer Drinking Tips

1. **Colder is better** - Summer beers should be served cold (38-45°F)
2. **Stay hydrated** - Alternate with water in the heat
3. **Lower ABV** - Save the imperial stouts for winter
4. **Frosted glass controversy** - Purists say no, but hey, it's summer
    `,
    category: 'seasonal',
    featured_image: null,
    tags: ['summer', 'seasonal', 'refreshing'],
    read_time: 3,
    created_at: '2024-02-10',
    updated_at: '2024-02-10',
  },
  {
    id: 'domestic-lagers-compared',
    slug: 'domestic-lagers-compared',
    title: 'Domestic Macro Lagers Compared: Taste, Calories, and ABV',
    excerpt: 'An honest comparison of America\'s most popular beers. Which one is right for you?',
    content: `
# Domestic Macro Lagers Compared

Let's break down America's most popular beers with honest comparisons.

## The Big Three Light Beers

### Bud Light
- **ABV:** 4.2%
- **Calories:** 110
- **Carbs:** 6.6g
- **Taste:** Very light, slightly sweet, clean finish

### Miller Lite
- **ABV:** 4.2%
- **Calories:** 96
- **Carbs:** 3.2g
- **Taste:** Slightly more hop character, drier finish

### Coors Light
- **ABV:** 4.2%
- **Calories:** 102
- **Carbs:** 5g
- **Taste:** Very clean, subtle sweetness, smooth

---

## Regular Strength Lagers

### Budweiser
- **ABV:** 5.0%
- **Calories:** 145
- **Carbs:** 10.6g
- **Taste:** More body than Bud Light, slight sweetness

### Miller High Life
- **ABV:** 4.6%
- **Calories:** 141
- **Carbs:** 13.1g
- **Taste:** "The Champagne of Beers" - slight corn sweetness

### Coors Banquet
- **ABV:** 5.0%
- **Calories:** 147
- **Carbs:** 11.7g
- **Taste:** Fuller bodied, slight malt sweetness

---

## Import Alternatives

### Corona Extra
- **ABV:** 4.6%
- **Calories:** 148
- **Taste:** Light, slightly sweet, pairs well with lime

### Modelo Especial
- **ABV:** 4.4%
- **Calories:** 143
- **Taste:** Fuller flavor, more malt character

### Heineken
- **ABV:** 5.0%
- **Calories:** 142
- **Taste:** Slightly skunky (the green bottle), bitter finish
    `,
    category: 'comparison',
    featured_image: null,
    tags: ['comparison', 'lager', 'commercial', 'calories'],
    read_time: 4,
    created_at: '2024-02-15',
    updated_at: '2024-02-15',
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function getGuidesByCategory(category: string): Guide[] {
  return guides.filter((guide) => guide.category === category);
}

export function getFeaturedGuides(count: number = 3): Guide[] {
  return guides.slice(0, count);
}
