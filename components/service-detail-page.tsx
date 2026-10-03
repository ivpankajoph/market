import {
  Check,
  ClipboardCheck,
  FileCheck2,
  Globe2,
  MapPinned,
  PackageSearch,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Tags,
} from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BuyerMarket } from "@/lib/markets";
import type { SourcingService } from "@/lib/services";

type ServiceDetailPageProps = {
  market: BuyerMarket;
  service: SourcingService;
};

function localizeServiceText(text: string, market: BuyerMarket) {
  return text
    .replaceAll("US buyers", `buyers in ${market.locationName}`)
    .replaceAll("US businesses", `businesses in ${market.locationName}`)
    .replaceAll("the United States", market.locationName)
    .replaceAll("US delivery location", `delivery location in ${market.locationName}`)
    .replaceAll("US delivery handoff", `${market.name} delivery handoff`)
    .replaceAll("US destination", `destination in ${market.locationName}`);
}

export function ServiceDetailPage({ market, service }: ServiceDetailPageProps) {
  const isChina = service.origin === "China";
  const overview = localizeServiceText(service.overview, market);
  const briefDetails = [
    {
      icon: FileCheck2,
      title: "Product specification",
      description: "Materials, dimensions, packaging, certifications, and reference files.",
    },
    {
      icon: PackageSearch,
      title: "Order target",
      description: "Expected quantity, preferred MOQ, sample needs, and reorder plans.",
    },
    {
      icon: Tags,
      title: "Commercial range",
      description: "Target unit cost, total budget, payment expectations, and key terms.",
    },
    {
      icon: Route,
      title: "Delivery plan",
      description: `Required date, destination in ${market.locationName}, shipping preference, and final-mile needs.`,
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-2 font-semibold tracking-tight" aria-label="SellersLogin Market home">
            <span className="flex size-8 items-center justify-center rounded-md border bg-card"><Globe2 className="size-4" aria-hidden="true" /></span>
            <span>SellersLogin Market</span>
          </a>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild><a href="/#services">All services</a></Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-border/50 bg-blue-50/50 dark:bg-blue-950/10">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-24 -top-24 size-80 rounded-full bg-cyan-300/25 blur-3xl dark:bg-cyan-700/10" />
          <div className="absolute -right-20 bottom-0 size-96 rounded-full bg-indigo-300/25 blur-3xl dark:bg-indigo-700/10" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-7 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-start lg:px-8">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{market.name} sourcing support</Badge>
              <Badge variant="outline" className="bg-background/70">
                <img src={isChina ? "/flags/china.png" : "/flags/india.png"} alt="" width={24} height={16} className="h-4 w-6 rounded-[2px] object-cover" />
                {service.origin}
              </Badge>
            </div>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{service.name}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">{service.name} support for buyers in {market.locationName} who need a clearer, more coordinated way to source internationally.</p>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">{overview}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild><a href="/#support"><Search aria-hidden="true" />Post a requirement</a></Button>
              <Button size="lg" variant="outline" asChild><a href="#process"><ClipboardCheck aria-hidden="true" />See the process</a></Button>
            </div>
          </div>

          <div className="relative py-2 lg:pl-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">Built for buyers in {market.locationName}</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">Countrywide sourcing coordination</h2>
              </div>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-blue-200/80 bg-background/50 text-blue-700 backdrop-blur-sm dark:border-blue-800/60 dark:text-blue-300"><MapPinned className="size-5" aria-hidden="true" /></span>
            </div>
            <div className="mt-4 flex h-[260px] items-center justify-center sm:h-[330px] lg:h-[360px]">
              <img src={market.mapSrc} alt={`Map of ${market.name}`} width={960} height={594} className="max-h-full w-full object-contain opacity-90 drop-shadow-[0_18px_24px_rgba(15,23,42,0.12)] dark:brightness-110" />
            </div>
            <div className="mt-3 grid grid-cols-3 border-y border-blue-200/70 py-3 text-center text-sm dark:border-blue-800/50">
              <div><strong className="block text-lg text-foreground">Countrywide</strong><span className="text-muted-foreground">Coordination</span></div>
              <div className="border-x border-blue-200/70 dark:border-blue-800/50"><strong className="block text-xl text-foreground">1</strong><span className="text-muted-foreground">Clear workflow</span></div>
              <div><strong className="block text-xl text-foreground">2</strong><span className="text-muted-foreground">Markets linked</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/50 bg-background py-9 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div>
              <Badge variant="outline">A stronger starting brief</Badge>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Share the details that shape the right sourcing plan</h2>
              <p className="mt-3 max-w-xl leading-7 text-muted-foreground">You do not need a finished technical pack to begin. A clear starting brief helps us focus supplier conversations, compare realistic options, and identify open questions early.</p>
            </div>
            <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {briefDetails.map(({ icon: Icon, title, description }) => (
                <div key={title} className="flex gap-4 border-t border-border/70 pt-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"><Icon className="size-5" aria-hidden="true" /></span>
                  <div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl"><Badge variant="outline">Service scope</Badge><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">What this service can cover</h2></div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.includes.map((item, index) => (
              <Card key={item} className={`border-border/50 shadow-none ${index % 3 === 0 ? "bg-blue-50/70 dark:bg-blue-950/20" : index % 3 === 1 ? "bg-cyan-50/70 dark:bg-cyan-950/20" : "bg-indigo-50/70 dark:bg-indigo-950/20"}`}>
                <CardContent className="flex items-start gap-3 px-5"><span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-background"><Check className="size-4" aria-hidden="true" /></span><p className="leading-6">{localizeServiceText(item, market)}</p></CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-16 border-y border-border/50 bg-sky-50/40 py-10 dark:bg-sky-950/10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl"><Badge variant="secondary">How it works</Badge><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A clear path from brief to execution</h2></div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, index) => (
              <Card key={step.title} className="h-full border-border/50 bg-background/80 shadow-none">
                <CardHeader><div className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{String(index + 1).padStart(2, "0")}</div><CardTitle className="mt-3">{step.title}</CardTitle><p className="text-sm leading-6 text-muted-foreground">{localizeServiceText(step.description, market)}</p></CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div><Badge variant="outline">Buyer advantage in {market.locationName}</Badge><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Make the sourcing decision with better visibility</h2><p className="mt-3 text-base leading-7 text-muted-foreground">Keep supplier conversations, commercial checkpoints, quality expectations, and delivery planning connected instead of managing each step in isolation.</p></div>
          <Card className="border-border/50 bg-indigo-100/55 shadow-none dark:bg-indigo-950/25"><CardContent className="grid gap-4 px-6 sm:grid-cols-2"><div className="flex gap-3"><PackageSearch className="mt-1 size-5 shrink-0" aria-hidden="true" /><div><h3 className="font-semibold">Focused options</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">Compare relevant partners and practical terms.</p></div></div><div className="flex gap-3"><ShieldCheck className="mt-1 size-5 shrink-0" aria-hidden="true" /><div><h3 className="font-semibold">Clear checkpoints</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">Track quality, timing, and commercial decisions.</p></div></div></CardContent></Card>
        </div>
      </section>

      <section className="pb-10 sm:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden border-border/50 bg-blue-100/70 shadow-none dark:bg-blue-950/30"><CardContent className="flex flex-col gap-5 px-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between"><div><Badge variant="secondary"><Sparkles aria-hidden="true" />Start with your requirement</Badge><h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Need help with {service.name.toLowerCase()}?</h2><p className="mt-2 max-w-2xl text-muted-foreground">Share the product, order size, budget, and destination in {market.locationName} to begin.</p></div><Button size="lg" asChild><a href="/#support">Post a requirement</a></Button></CardContent></Card>
        </div>
      </section>

      <SiteFooter marketName={market.locationName} marketSlug={market.slug} />
    </main>
  );
}
