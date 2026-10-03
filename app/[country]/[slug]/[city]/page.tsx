import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LocationPage } from "@/components/location-page";
import { cityRouteParams, getLocationCity, getLocationState } from "@/data";
import { getBuyerMarket } from "@/lib/markets";

type CityPageProps = {
  params: Promise<{ country: string; slug: string; city: string }>;
};

export function generateStaticParams() {
  return cityRouteParams.map(({ country, state, city }) => ({ country, slug: state, city }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { country, slug: stateSlug, city: citySlug } = await params;
  const market = getBuyerMarket(country);
  const state = getLocationState(country, stateSlug);
  const city = getLocationCity(country, stateSlug, citySlug);

  if (!market || !state || !city) return { title: "Page not found | SellersLogin Market" };

  return {
    title: `Sourcing Services in ${city.name}, ${state.name} | SellersLogin Market`,
    description: `China and India sourcing support for buyers in ${city.name}, ${state.name}, ${market.locationName}, from supplier research to logistics coordination.`,
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { country, slug: stateSlug, city: citySlug } = await params;
  const market = getBuyerMarket(country);
  const state = getLocationState(country, stateSlug);
  const city = getLocationCity(country, stateSlug, citySlug);

  if (!market || !state || !city) notFound();

  return <LocationPage market={market} state={state} city={city} />;
}
