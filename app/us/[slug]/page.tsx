import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetailPage } from "@/components/service-detail-page";
import { unitedStatesMarket } from "@/lib/markets";
import { getService, services } from "@/lib/services";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return { title: "Service not found | SellersLogin Market" };

  return {
    title: `${service.name} for US Buyers | SellersLogin Market`,
    description: `${service.name} support for buyers in the United States who need a clearer, more coordinated way to source internationally.`,
  };
}

export default async function UnitedStatesServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  return <ServiceDetailPage market={unitedStatesMarket} service={service} />;
}
