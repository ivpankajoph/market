import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LocationPage } from "@/components/location-page";
import { ServiceDetailPage } from "@/components/service-detail-page";
import { cityRouteParams, getLocationCity, getLocationState } from "@/data";
import { getBuyerMarket } from "@/lib/markets";
import { countryAlternates } from "@/lib/seo";
import { getService } from "@/lib/services";
import { routePath } from "@/url";

type CityPageProps = {
  params: Promise<{ country: string; slug: string; city: string }>;
};

export function generateStaticParams() {
  const locationCityRouteParams = cityRouteParams.map(
    ({ country, state, city }) => ({ country, slug: state, city }),
  );

  // Regional service combinations remain available through dynamic generation.
  // Pre-rendering every state × service pair would create tens of thousands of
  // pages and make routine production builds unnecessarily expensive.
  return locationCityRouteParams;
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { country, slug: stateSlug, city: citySlug } = await params;
  const market = getBuyerMarket(country);
  const state = getLocationState(country, stateSlug);
  const city = getLocationCity(country, stateSlug, citySlug);
  const service = getService(citySlug);

  if (!market || !state || (!city && !service)) return { title: "Page not found | Chinaindiasourcing" };

  if (service) {
    return {
      title: `${service.name} in ${state.name}, ${market.name} | Chinaindiasourcing`,
      description: `${service.name} connecting ${service.origin} suppliers with buyers in ${state.name}, ${market.locationName}. Explore quotations, quality checkpoints, documentation, and delivery coordination.`,
      alternates: countryAlternates(
        routePath.regionalService(market.slug, state.slug, service.slug),
        (alternateMarket) =>
          routePath.marketService(alternateMarket.slug, service.slug),
      ),
    };
  }

  return {
    title: `Sourcing Services in ${city!.name}, ${state.name} | Chinaindiasourcing`,
    description: `China and India sourcing support for buyers in ${city!.name}, ${state.name}, ${market.locationName}, from supplier research to logistics coordination.`,
    alternates: countryAlternates(
      routePath.city(market.slug, state.slug, city!.slug),
      (alternateMarket) => routePath.market(alternateMarket.slug),
    ),
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
