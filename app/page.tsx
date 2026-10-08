import {
  BellRing,
  Boxes,
  Check,
  ClipboardCheck,
  ClipboardList,
  Factory,
  Handshake,
  PackageCheck,
  Search,
  ShieldCheck,
  Ship,
  Sparkles,
  Store,
  Tags,
  TrendingUp,
  Undo2,
  Users,
} from "lucide-react";

import type { Metadata } from "next";
import Link from "next/link";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SourcePageIntro } from "@/components/source-page-intro";
import { SiteFooter } from "@/components/site-footer";
import { countryAlternates } from "@/lib/seo";
import { routePath } from "@/url";

export const metadata: Metadata = {
  title: "Find Sourcing Agents in China, India & Beyond | ChinaIndiaSourcing",
  description:
    "ChinaIndiaSourcing connects U.S. buyers with independent sourcing agents, suppliers, inspectors, and logistics providers across China, India, and 16 other sourcing countries.",
  alternates: countryAlternates(
    routePath.home,
    (market) => routePath.market(market.slug),
  ),
};

const categories = [
  { name: "Clothing", image: "https://images.unsplash.com/photo-1683223059099-e2f012c65630?auto=format&fit=crop&w=900&q=85", tone: "bg-orange-50 dark:bg-orange-950/20" },
  { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=85", tone: "bg-blue-50 dark:bg-blue-950/20" },
  { name: "Toys", image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=900&q=85", tone: "bg-amber-50 dark:bg-amber-950/20" },
  { name: "Mobile accessories", image: "https://images.unsplash.com/photo-1628489479633-fefb4059474f?auto=format&fit=crop&w=900&q=85", tone: "bg-violet-50 dark:bg-violet-950/20" },
  { name: "Bags", image: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&w=900&q=85", tone: "bg-rose-50 dark:bg-rose-950/20" },
  { name: "Home furnishing", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85", tone: "bg-sky-50 dark:bg-sky-950/20" },
  { name: "Industrial chemicals", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=85", tone: "bg-cyan-50 dark:bg-cyan-950/20" },
  { name: "Industrial machinery", image: "https://images.unsplash.com/photo-1610429687715-12f60e3c6a49?auto=format&fit=crop&w=900&q=85", tone: "bg-slate-100 dark:bg-slate-900/40" },
  { name: "Agro products", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=85", tone: "bg-lime-50 dark:bg-lime-950/20" },
  { name: "Solar products", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=85", tone: "bg-yellow-50 dark:bg-yellow-950/20" },
  { name: "EV vehicles", image: "https://images.unsplash.com/photo-1597404294360-feeeda04612e?auto=format&fit=crop&w=900&q=85", tone: "bg-emerald-50 dark:bg-emerald-950/20" },
  { name: "Education items", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=85", tone: "bg-indigo-50 dark:bg-indigo-950/20" },
];

const agentServices = [
  { icon: Factory, label: "Supplier and factory discovery", tone: "bg-blue-100/60 dark:bg-blue-950/30" },
  { icon: PackageCheck, label: "Product sample coordination", tone: "bg-cyan-100/60 dark:bg-cyan-950/30" },
  { icon: Handshake, label: "Price and MOQ negotiation", tone: "bg-indigo-100/60 dark:bg-indigo-950/30" },
  { icon: ClipboardCheck, label: "Factory visits and quality inspection", tone: "bg-sky-100/60 dark:bg-sky-950/30" },
  { icon: Boxes, label: "Order consolidation and packing", tone: "bg-violet-100/60 dark:bg-violet-950/30" },
  { icon: Ship, label: "Freight, shipping, and documentation support", tone: "bg-teal-100/60 dark:bg-teal-950/30" },
];

const premiumFeatures = [
  { icon: ClipboardList, title: "Multiple buying requirements", description: "Post sourcing briefs for the products your U.S. business needs during the package period.", tone: "bg-blue-100/60 dark:bg-blue-950/30" },
  { icon: BellRing, title: "Partner-match alerts", description: "Receive updates when relevant independent agents respond through the platform.", tone: "bg-cyan-100/60 dark:bg-cyan-950/30" },
  { icon: TrendingUp, title: "Origin-market updates", description: "Follow useful product and supply-market signals from China, India, and other origins.", tone: "bg-indigo-100/60 dark:bg-indigo-950/30" },
  { icon: ShieldCheck, title: "Payment protection", description: "Use the platform payment route to keep eligible transactions protected.", tone: "bg-emerald-100/60 dark:bg-emerald-950/30" },
  { icon: Tags, title: "Price comparison", description: "Review competitive quotations from suitable sourcing agents.", tone: "bg-sky-100/60 dark:bg-sky-950/30" },
  { icon: Undo2, title: "Refund commitment", description: "Package terms include a refund when suitable sourcing support is unavailable.", tone: "bg-violet-100/60 dark:bg-violet-950/30" },
];

const indiaSupport = [
  "Indian supplier and manufacturer discovery",
  "India-based buying and sourcing agents",
  "Product inspection and factory visits",
  "Freight and documentation providers for U.S. imports",
];

const platformBenefits = [
  { title: "One buyer brief", description: "Post once and make the same U.S. import requirement visible to relevant partners." },
  { title: "Country-based discovery", description: "Browse services according to where your products will be sourced." },
  { title: "Independent comparisons", description: "Compare provider experience, scope, terms, and quotations before deciding." },
  { title: "Clear platform role", description: "We facilitate introductions and workflow; providers remain independent businesses." },
  { title: "Safer coordination", description: "Define milestones and use eligible on-platform safeguards where available." },
  { title: "Buyer choice", description: "You select the agent, supplier, inspector, or logistics provider that fits your needs." },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SourcePageIntro />

      <section id="categories" className="scroll-mt-20 bg-indigo-50/20 py-10 dark:bg-indigo-950/5 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl"><Badge variant="secondary">Popular categories</Badge><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">What U.S. buyers can source</h2><p className="mt-4 text-base leading-7 text-muted-foreground">Choose a category, select the origin country, and share the product specifications your business needs.</p></div>
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <Card key={category.name} className={`group overflow-hidden border-border/30 py-0 shadow-none ${category.tone}`}>
                <CardContent className="p-0">
                  <div className="aspect-[4/3] overflow-hidden bg-blue-50/40 dark:bg-blue-950/10">
                    <img src={category.image} alt={category.name} width={900} height={675} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                  </div>
                  <h3 className="px-5 py-4 font-medium leading-5">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border/50 bg-sky-50/35 py-10 dark:bg-sky-950/10 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:px-8">
          <div><Badge variant="outline">China sourcing for U.S. buyers</Badge><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">What an independent China sourcing agent can handle</h2><p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">Use ChinaIndiaSourcing to find partners based in China who can bridge supplier communication, quality checks, and shipment preparation for your U.S. business.</p></div>
          <div className="grid gap-3 sm:grid-cols-2">
            {agentServices.map((service) => (
              <Card key={service.label} className={`border-border/40 py-0 shadow-none ${service.tone}`}><CardContent className="flex items-center gap-3 p-5"><span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-white/60 dark:bg-black/10"><service.icon className="size-4" aria-hidden="true" /></span><span className="text-sm font-medium leading-5">{service.label}</span></CardContent></Card>
            ))}
          </div>
        </div>
      </section>

      <section id="premium" className="scroll-mt-20 bg-blue-50/20 py-10 dark:bg-blue-950/5 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div className="max-w-2xl"><Badge>U.S. buyer package</Badge><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Three months of partner discovery and platform support</h2><p className="mt-4 text-base leading-7 text-muted-foreground">Designed for active U.S. importers who need ongoing introductions, comparison tools, and coordination support.</p></div><Badge variant="outline" className="h-8 px-3 text-sm">3 months</Badge></div>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {premiumFeatures.map((feature) => (
              <Card key={feature.title} className={`h-full border-border/40 shadow-none ${feature.tone}`}><CardHeader><feature.icon className="size-5" aria-hidden="true" /><CardTitle className="mt-3">{feature.title}</CardTitle><CardDescription className="leading-6">{feature.description}</CardDescription></CardHeader></Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border/50 bg-indigo-50/30 py-10 dark:bg-indigo-950/10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden border-border/40 bg-indigo-100/55 shadow-none dark:bg-indigo-950/25"><CardContent className="grid gap-6 py-2 sm:p-8 lg:grid-cols-2 lg:items-center"><div><Badge variant="secondary"><Users aria-hidden="true" />India sourcing for U.S. buyers</Badge><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Find independent sourcing partners across India</h2><p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">Connect with India-based agents and service providers for supplier discovery, factory coordination, quality checks, freight, and documentation for U.S.-bound orders.</p></div><div className="grid gap-3">{indiaSupport.map((item) => (<div key={item} className="flex items-center gap-3 rounded-lg bg-white/65 p-4 dark:bg-black/10"><Check className="size-4 shrink-0" aria-hidden="true" /><span className="text-sm font-medium">{item}</span></div>))}</div></CardContent></Card>
        </div>
      </section>

      <section className="bg-sky-50/20 py-10 dark:bg-sky-950/5 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl"><Badge variant="outline">Our role in the transaction</Badge><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">A marketplace and directory—not the supplier or sourcing agent</h2><p className="mt-4 text-base leading-7 text-muted-foreground">ChinaIndiaSourcing helps buyers and independent providers find one another, exchange requirements, and organize the sourcing journey. We do not manufacture products, own listed suppliers, or replace the agent or specialist you select.</p></div>
          <div className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">{platformBenefits.map((benefit) => (<div key={benefit.title} className="border-l pl-5"><h3 className="font-semibold">{benefit.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{benefit.description}</p></div>))}</div>
        </div>
      </section>

      <section className="pb-10 sm:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Alert className="border-amber-300/80 bg-amber-100/70 text-amber-950 dark:border-amber-800/60 dark:bg-amber-950/35 dark:text-amber-100">
            <ShieldCheck className="size-5 text-amber-700 dark:text-amber-400" aria-hidden="true" />
            <AlertTitle className="font-semibold text-amber-900 dark:text-amber-200">
              Sourcing Safety &amp; Payment Protection Notice
            </AlertTitle>
            <AlertDescription className="mt-2 space-y-2 text-sm leading-6 text-amber-950/90 dark:text-amber-200/90">
              <p className="font-medium">
                &ldquo;Never pay advance money to unverified parties. Inspect goods before shipment.&rdquo; Use trusted inspection agencies and secure payment methods for China and India sourcing.
              </p>
              <p>
                ChinaIndiaSourcing acts as an introduction, directory, and coordination platform. Independent agents, suppliers, inspectors, and logistics companies are responsible for their own services. Payment safeguards and package terms apply only when eligible transactions follow the verified platform flow; off-platform payments remain the buyer&apos;s responsibility.
              </p>
              <p className="pt-1">
                Read our full{" "}
                <Link href={routePath.terms} className="font-semibold underline underline-offset-4 hover:text-amber-900 dark:hover:text-white">
                  Terms &amp; Conditions
                </Link>{" "}
                and anti-fraud guidelines.
              </p>
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section id="support" className="scroll-mt-20 border-t border-border/50 bg-blue-50/35 py-10 dark:bg-blue-950/10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card id="start" className="scroll-mt-24 overflow-hidden border-border/40 bg-blue-100/60 shadow-none dark:bg-blue-950/25"><CardContent className="grid gap-8 py-2 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center"><div><Badge variant="secondary"><Sparkles aria-hidden="true" />U.S. buyers and global sourcing partners</Badge><h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Ready to find the right partner for your next import?</h2><p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">Post a U.S. buying requirement, or list your services as an independent sourcing partner.</p></div><div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><Button size="lg" asChild><Link href={routePath.buyers}><Search aria-hidden="true" />Post a requirement</Link></Button><Button size="lg" variant="outline" asChild><Link href={routePath.sellers}><Store aria-hidden="true" />List my services</Link></Button></div></CardContent></Card>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
