import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetailPage } from "@/components/service-detail-page";
import { buyerMarkets, getBuyerMarket } from "@/lib/markets";
import { getService, services } from "@/lib/services";

type CountryServicePageProps = {
  params: Promise<{ country: string; slug: string }>;
};

export function generateStaticParams() {
  return buyerMarkets.flatMap((market) =>
    services.map((service) => ({ country: market.slug, slug: service.slug })),
  );
}

export async function generateMetadata({ params }: CountryServicePageProps): Promise<Metadata> {
  const { country, slug } = await params;
  const market = getBuyerMarket(country);
  const service = getService(slug);

  if (!market || !service) return { title: "Service not found | SellersLogin Market" };

  return {
    title: `${service.name} for ${market.name} Buyers | SellersLogin Market`,
    description: `${service.name} support for buyers in ${market.locationName} who need a clearer, more coordinated way to source internationally.`,
  };
}

export default async function CountryServicePage({ params }: CountryServicePageProps) {
  const { country, slug } = await params;
  const market = getBuyerMarket(country);
  const service = getService(slug);

  if (!market || !service) notFound();

  return <ServiceDetailPage market={market} service={service} />;
}
