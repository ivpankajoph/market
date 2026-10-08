import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ServicesWorldMap } from "@/components/services-world-map";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { unitedStatesMarket } from "@/lib/markets";
import { serviceDisplayName, servicesByCountry, serviceSlug } from "@/lib/services";
import { routePath } from "@/url";

export const metadata: Metadata = {
  title: "Find Sourcing Agents by Country for U.S. Buyers | ChinaIndiaSourcing",
  description:
    "Browse independent sourcing agents and trade-service providers in China, India, and 16 other origin countries for products imported to the United States.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-border/50 bg-blue-50/45 py-5 dark:bg-blue-950/10 sm:py-6">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-24 -top-28 size-96 rounded-full bg-cyan-300/25 blur-3xl dark:bg-cyan-700/10" />
          <div className="absolute -right-24 bottom-0 size-96 rounded-full bg-indigo-300/25 blur-3xl dark:bg-indigo-700/10" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-[0.76fr_1.24fr] lg:items-center lg:gap-0 lg:px-8">
          <div>
            <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Find sourcing partners in 18 countries
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Built for U.S. buyers: choose where you want to source, then compare independent agents and providers for supplier research, inspection, procurement, freight, and delivery support.
            </p>
          </div>
          <ServicesWorldMap />
        </div>
      </section>

      <section className="bg-slate-50/45 py-10 dark:bg-slate-950/20 sm:py-14">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:px-8 xl:grid-cols-2">
          {servicesByCountry.map((country, countryIndex) => (
            <Card
              id={country.slug}
              key={country.slug}
              className={`scroll-mt-24 border-border/50 shadow-none ${
                countryIndex % 3 === 0
                  ? "bg-blue-50/65 dark:bg-blue-950/15"
                  : countryIndex % 3 === 1
                    ? "bg-cyan-50/65 dark:bg-cyan-950/15"
                    : "bg-indigo-50/65 dark:bg-indigo-950/15"
              }`}
            >
              <CardHeader className="border-b border-border/50">
                <div className="flex items-center justify-between gap-4">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <img
                      src={`https://flagcdn.com/w80/${country.flagCode}.png`}
                      alt={`${country.name} flag`}
                      width={40}
                      height={27}
                      className="h-[27px] w-10 shrink-0 rounded-[3px] border border-black/10 object-cover shadow-sm"
                    />
                    Source products from {country.name}
                  </CardTitle>
                  <Badge variant="outline" className="shrink-0 bg-background/60">{country.serviceNames.length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-x-5 gap-y-1 px-5 sm:grid-cols-2 sm:px-6">
                {country.serviceNames.map((serviceName) => (
                  <Link
                    key={serviceName}
                    href={routePath.marketService(unitedStatesMarket.slug, serviceSlug(serviceName))}
                    className="group flex items-start justify-between gap-3 border-b border-border/40 py-3 text-sm font-medium leading-5 transition-colors hover:text-blue-700 dark:hover:text-cyan-300"
                  >
                    <span>{serviceDisplayName(serviceName)}</span>
                    <ArrowRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-border/50 py-10 sm:py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Not sure which partner your U.S. business needs?</h2>
            <p className="mt-2 text-muted-foreground">Share the product, origin country, quantity, target budget, and U.S. delivery destination so relevant independent providers can respond.</p>
          </div>
          <Button size="lg" asChild>
            <Link href={routePath.buyers}><Search aria-hidden="true" />Post a requirement</Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
