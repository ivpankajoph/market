import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Check,
  ChevronRight,
  MapPin,
  MapPinned,
  Search,
} from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SourcePageIntro } from "@/components/source-page-intro";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { LocationCity, LocationState } from "@/data";
import type { BuyerMarket } from "@/lib/markets";
import { services } from "@/lib/services";
import { routePath } from "@/url";

type LocationPageProps = {
  market: BuyerMarket;
  state: LocationState;
  city?: LocationCity;
};

const highlights = [
  "Supplier discovery and quotation comparison",
  "Product, factory, and quality coordination",
  "Freight and delivery planning",
  "One clear workflow from brief to shipment",
];

export function LocationPage({ market, state, city }: LocationPageProps) {
  const placeName = city ? `${city.name}, ${state.name}` : state.name;
  const areaLabel = city ? "City sourcing support" : "Regional sourcing support";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SourcePageIntro title={`Sourcing Services in ${placeName}`} />

      <section className="relative overflow-hidden border-b border-border/50 bg-blue-50/50 dark:bg-blue-950/10">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-24 -top-24 size-80 rounded-full bg-cyan-300/25 blur-3xl dark:bg-cyan-700/10" />
          <div className="absolute -right-20 bottom-0 size-96 rounded-full bg-indigo-300/25 blur-3xl dark:bg-indigo-700/10" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-7 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-start lg:px-8">
          <div>
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
              <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
              <ChevronRight className="size-4" aria-hidden="true" />
              {city ? (
                <>
                  <Link href={routePath.state(market.slug, state.slug)} className="transition-colors hover:text-foreground">{state.name}</Link>
                  <ChevronRight className="size-4" aria-hidden="true" />
                  <span aria-current="page">{city.name}</span>
                </>
              ) : (
                <span aria-current="page">{state.name}</span>
              )}
            </nav>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{areaLabel}</Badge>
              <Badge variant="outline" className="bg-background/70">
                <MapPin className="size-3.5" aria-hidden="true" />
                {market.name}
              </Badge>
            </div>

            <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Sourcing Services in {placeName}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
              Find and coordinate China and India sourcing support for buyers in {placeName}, {market.locationName}.
            </p>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
              Share your product, quantity, target cost, quality expectations, and delivery destination. The workflow connects supplier research, verification, procurement, and logistics in one place.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <a href="https://web.sellerslogin.com/buyers" target="_blank" rel="noopener noreferrer"><Search aria-hidden="true" />Post a requirement</a>
              </Button>
              {!city && state.cities.length > 0 && (
                <Button size="lg" variant="outline" asChild>
                  <a href="#cities"><Building2 aria-hidden="true" />View cities</a>
                </Button>
              )}
            </div>
          </div>

          <div className="relative py-2 lg:pl-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">
                  Built for buyers in {placeName}
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">Local sourcing coordination</h2>
              </div>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-blue-200/80 bg-background/50 text-blue-700 backdrop-blur-sm dark:border-blue-800/60 dark:text-blue-300">
                <MapPinned className="size-5" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-4 flex h-[260px] items-center justify-center sm:h-[330px] lg:h-[360px]">
              <Image
                src={market.mapSrc}
                alt={`Map of ${market.name}`}
                width={960}
                height={594}
                className="max-h-full w-full object-contain opacity-90 drop-shadow-[0_18px_24px_rgba(15,23,42,0.12)] dark:brightness-110"
              />
            </div>
            <div className="mt-3 grid grid-cols-3 border-y border-blue-200/70 py-3 text-center text-sm dark:border-blue-800/50">
              <div><strong className="block text-lg text-foreground">Local</strong><span className="text-muted-foreground">Coordination</span></div>
              <div className="border-x border-blue-200/70 dark:border-blue-800/50"><strong className="block text-xl text-foreground">1</strong><span className="text-muted-foreground">Clear workflow</span></div>
              <div><strong className="block text-xl text-foreground">2</strong><span className="text-muted-foreground">Markets linked</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/50 py-10 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <Badge variant="outline">What we coordinate</Badge>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">A practical sourcing route for {placeName}</h2>
            <p className="mt-3 leading-7 text-muted-foreground">Use the service that matches your current sourcing stage, from early supplier research to final delivery planning.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((highlight) => (
              <Card key={highlight} className="border-border/50 bg-blue-50/60 shadow-none dark:bg-blue-950/20">
                <CardContent className="flex items-start gap-3 px-5">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-background"><Check className="size-4" aria-hidden="true" /></span>
                  <p className="leading-6">{highlight}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {!city && (
        <section id="cities" className="scroll-mt-16 bg-sky-50/35 py-10 dark:bg-sky-950/10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Badge variant="secondary">Cities in {state.name}</Badge>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Browse city sourcing pages</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {state.cities.map((item) => (
                <Link
                  key={item.slug}
                  href={routePath.city(market.slug, state.slug, item.slug)}
                  className="group flex items-center justify-between rounded-xl border border-border/60 bg-background px-5 py-4 transition-colors hover:border-blue-300 hover:bg-blue-50/60 dark:hover:border-blue-800 dark:hover:bg-blue-950/20"
                >
                  <span className="flex items-center gap-3 font-medium"><Building2 className="size-4 text-blue-700 dark:text-blue-300" aria-hidden="true" />{item.name}</span>
                  <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {city && state.cities.length > 1 && (
        <section className="bg-sky-50/35 py-10 dark:bg-sky-950/10 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Badge variant="secondary">More in {state.name}</Badge>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Nearby city pages</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {state.cities.filter((item) => item.slug !== city.slug).map((item) => (
                <Button key={item.slug} variant="outline" asChild>
                  <Link href={routePath.city(market.slug, state.slug, item.slug)}>{item.name}</Link>
                </Button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Badge variant="outline">Available services</Badge>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Choose a sourcing service</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={routePath.regionalService(market.slug, state.slug, service.slug)}
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
