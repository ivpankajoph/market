import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LocationPage } from "@/components/location-page";
import { ServiceDetailPage } from "@/components/service-detail-page";
import { getLocationState, stateRouteParams } from "@/data";
import { buyerMarkets, getBuyerMarket } from "@/lib/markets";
import { countryAlternates } from "@/lib/seo";
import {
  customClearancePageTitle,
  getService,
  isCustomClearanceService,
  serviceDisplayName,
  services,
} from "@/lib/services";
import { routePath } from "@/url";

type CountryServicePageProps = {
  params: Promise<{ country: string; slug: string }>;
};

export function generateStaticParams() {
  const serviceRouteParams = buyerMarkets.flatMap((market) =>
    services.map((service) => ({ country: market.slug, slug: service.slug })),
  );

  return [...serviceRouteParams, ...stateRouteParams];
}

export async function generateMetadata({ params }: CountryServicePageProps): Promise<Metadata> {
  const { country, slug } = await params;
  const market = getBuyerMarket(country);
  const service = getService(slug);
  const state = getLocationState(country, slug);

  if (!market || (!service && !state)) return { title: "Page not found | Chinaindiasourcing" };

  if (state) {
    return {
      title: `Sourcing Services in ${state.name}, ${market.name} | Chinaindiasourcing`,
      description: `China and India sourcing support for buyers in ${state.name}, ${market.locationName}, including supplier research, verification, procurement, and logistics coordination.`,
      alternates: countryAlternates(
        routePath.state(market.slug, state.slug),
        (alternateMarket) => routePath.market(alternateMarket.slug),
      ),
    };
  }

  const marketTitle = market.slug === "us" ? "USA" : market.name;
  const displayServiceName = serviceDisplayName(service!.name);

  return {
    title: isCustomClearanceService(service!.name)
      ? customClearancePageTitle(service!.origin, marketTitle)
      : `${service!.name} for ${market.name} Buyers | Chinaindiasourcing`,
    description: `${displayServiceName} connecting ${service!.origin} with buyers in ${market.locationName}. Explore documentation, customs-clearance checkpoints, quotations, quality controls, and delivery coordination.`,
    alternates: countryAlternates(
      routePath.marketService(market.slug, service!.slug),
      (alternateMarket) =>
        routePath.marketService(alternateMarket.slug, service!.slug),
    ),
  };
}

export default async function CountryServicePage({ params }: CountryServicePageProps) {
  const { country, slug } = await params;
  const market = getBuyerMarket(country);
  const service = getService(slug);
  const state = getLocationState(country, slug);

  if (!market || (!service && !state)) notFound();

  if (state) return <LocationPage market={market} state={state} />;

  return <ServiceDetailPage market={market} service={service!} />;
}
