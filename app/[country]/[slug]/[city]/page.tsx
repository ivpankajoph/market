import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LocationPage } from "@/components/location-page";
import { ServiceDetailPage } from "@/components/service-detail-page";
import { cityRouteParams, getLocationCity, getLocationState } from "@/data";
import { getBuyerMarket } from "@/lib/markets";
import { getService } from "@/lib/services";
import { regionalServiceRouteParams } from "@/url";

type CityPageProps = {
  params: Promise<{ country: string; slug: string; city: string }>;
};

export function generateStaticParams() {
  const locationCityRouteParams = cityRouteParams.map(
    ({ country, state, city }) => ({ country, slug: state, city }),
  );

  return [...locationCityRouteParams, ...regionalServiceRouteParams];
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { country, slug: stateSlug, city: citySlug } = await params;
  const market = getBuyerMarket(country);
  const state = getLocationState(country, stateSlug);
  const city = getLocationCity(country, stateSlug, citySlug);
  const service = getService(citySlug);

  if (!market || !state || (!city && !service)) return { title: "Page not found | SellersLogin Market" };

  if (service) {
    return {
      title: `${service.name} in ${state.name}, ${market.name} | SellersLogin Market`,
      description: `${service.name} support for buyers in ${state.name}, ${market.locationName}, with coordinated sourcing, verification, procurement, and logistics support.`,
    };
  }

  return {
    title: `Sourcing Services in ${city!.name}, ${state.name} | SellersLogin Market`,
    description: `China and India sourcing support for buyers in ${city!.name}, ${state.name}, ${market.locationName}, from supplier research to logistics coordination.`,
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { country, slug: stateSlug, city: citySlug } = await params;
  const market = getBuyerMarket(country);
  const state = getLocationState(country, stateSlug);
  const city = getLocationCity(country, stateSlug, citySlug);
  const service = getService(citySlug);

  if (!market || !state || (!city && !service)) notFound();

  if (service) return <ServiceDetailPage market={market} service={service} regionName={state.name} />;

  return <LocationPage market={market} state={state} city={city!} />;
}
