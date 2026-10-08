export type BuyerMarket = {
  slug: string;
  name: string;
  locationName: string;
  mapSrc: string;
};

export const buyerMarkets: BuyerMarket[] = [
  { slug: "us", name: "United States", locationName: "the United States", mapSrc: "/maps/usa.svg" },
  { slug: "china", name: "China", locationName: "China", mapSrc: "/maps/china.svg" },
  { slug: "india", name: "India", locationName: "India", mapSrc: "/maps/india.svg" },
  { slug: "australia", name: "Australia", locationName: "Australia", mapSrc: "/maps/australia.svg" },
  { slug: "germany", name: "Germany", locationName: "Germany", mapSrc: "/maps/germany.svg" },
  { slug: "uk", name: "United Kingdom", locationName: "the United Kingdom", mapSrc: "/maps/uk.svg" },
  { slug: "uae", name: "United Arab Emirates", locationName: "the United Arab Emirates", mapSrc: "/maps/uae.svg" },
  { slug: "new-zealand", name: "New Zealand", locationName: "New Zealand", mapSrc: "/maps/new-zealand.svg" },
  { slug: "canada", name: "Canada", locationName: "Canada", mapSrc: "/maps/canada.svg" },
  { slug: "south-africa", name: "South Africa", locationName: "South Africa", mapSrc: "/maps/south-africa.svg" },
];

export const unitedStatesMarket = buyerMarkets.find((market) => market.slug === "us")!;

export function getBuyerMarket(slug: string) {
  return buyerMarkets.find((market) => market.slug === slug);
}
