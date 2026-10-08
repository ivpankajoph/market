import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SourcePageIntro } from "@/components/source-page-intro";
import { Badge } from "@/components/ui/badge";
import { buyerMarkets, getBuyerMarket } from "@/lib/markets";
import { countryAlternates } from "@/lib/seo";
import { services } from "@/lib/services";
import { routePath } from "@/url";

type MarketPageProps = {
  params: Promise<{ country: string }>;
};

export function generateStaticParams() {
  return buyerMarkets.map((market) => ({ country: market.slug }));
}

export async function generateMetadata({ params }: MarketPageProps): Promise<Metadata> {
  const { country } = await params;
  const market = getBuyerMarket(country);
  if (!market) return { title: "Page not found | Chinaindiasourcing" };

  return {
    title: `Find Global Sourcing Agents for ${market.name} Buyers | ChinaIndiaSourcing`,
    description: `Connect with independent sourcing agents and trade-service providers in China, India, and other origin countries for products delivered to ${market.locationName}.`,
    alternates: countryAlternates(
      routePath.market(market.slug),
      (alternateMarket) => routePath.market(alternateMarket.slug),
    ),
  };
}

export default async function MarketPage({ params }: MarketPageProps) {
  const { country } = await params;
  const market = getBuyerMarket(country);
  if (!market) notFound();
  const isUnitedStates = market.slug === "us";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SourcePageIntro title={isUnitedStates ? "Find Global Sourcing Agents for U.S. Buyers" : `Find Sourcing Agents for Buyers in ${market.name}`} />

      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge variant="outline">Origin-country services for {market.name}</Badge>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Choose where and how you want to source</h2>
          <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">Every listing below identifies the country where the independent agent or provider operates and is tailored to buyers importing into {market.locationName}.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={routePath.marketService(market.slug, service.slug)}
                className="group flex items-center justify-between rounded-xl border border-border/60 px-5 py-4 transition-colors hover:border-cyan-300 hover:bg-cyan-50/50 dark:hover:border-cyan-800 dark:hover:bg-cyan-950/20"
              >
                <span className="font-medium">{service.name}</span>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter marketName={market.locationName} marketSlug={market.slug} />
    </main>
  );
}
