import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Check,
  ClipboardCheck,
  Globe2,
  MapPinned,
  PackageSearch,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    description: service.description,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const isChina = service.origin === "China";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:px-8">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">US sourcing support</Badge>
              <Badge variant="outline" className="bg-background/70">
                <img src={isChina ? "/flags/china.png" : "/flags/india.png"} alt="" width={24} height={16} className="h-4 w-6 rounded-[2px] object-cover" />
                {service.origin}
              </Badge>
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{service.name}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{service.description}</p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{service.overview}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild><a href="/#support"><Search aria-hidden="true" />Post a requirement</a></Button>
              <Button size="lg" variant="outline" asChild><a href="#process"><ClipboardCheck aria-hidden="true" />See the process</a></Button>
            </div>
          </div>

          <Card className="overflow-hidden border-blue-200/60 bg-[#0b1f3a] py-0 text-white shadow-xl shadow-blue-950/10 dark:border-blue-800/40">
            <CardContent className="relative p-6 sm:p-8">
              <div className="mb-3 flex items-center justify-between gap-4">
                <div><p className="text-sm font-medium text-cyan-300">Built for US buyers</p><h2 className="mt-1 text-xl font-semibold">Nationwide sourcing coordination</h2></div>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10"><MapPinned className="size-5" aria-hidden="true" /></span>
              </div>
              <img src="/usa-map.png" alt="Map of the United States" width={960} height={594} className="mt-5 h-auto w-full opacity-95" />
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                <div className="rounded-lg bg-white/8 p-3"><strong className="block text-lg">50</strong><span className="text-slate-300">States</span></div>
                <div className="rounded-lg bg-white/8 p-3"><strong className="block text-lg">1</strong><span className="text-slate-300">Workflow</span></div>
                <div className="rounded-lg bg-white/8 p-3"><strong className="block text-lg">2</strong><span className="text-slate-300">Markets</span></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl"><Badge variant="outline">Service scope</Badge><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">What this service can cover</h2></div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.includes.map((item, index) => (
              <Card key={item} className={`border-border/50 shadow-none ${index % 3 === 0 ? "bg-blue-50/70 dark:bg-blue-950/20" : index % 3 === 1 ? "bg-cyan-50/70 dark:bg-cyan-950/20" : "bg-indigo-50/70 dark:bg-indigo-950/20"}`}>
                <CardContent className="flex items-start gap-3 px-5"><span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-background"><Check className="size-4" aria-hidden="true" /></span><p className="leading-6">{item}</p></CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-20 border-y border-border/50 bg-sky-50/40 py-14 dark:bg-sky-950/10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl"><Badge variant="secondary">How it works</Badge><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">A clear path from brief to execution</h2></div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, index) => (
              <Card key={step.title} className="h-full border-border/50 bg-background/80 shadow-none">
                <CardHeader><div className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{String(index + 1).padStart(2, "0")}</div><CardTitle className="mt-3">{step.title}</CardTitle><p className="text-sm leading-6 text-muted-foreground">{step.description}</p></CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div><Badge variant="outline">US buyer advantage</Badge><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Make the sourcing decision with better visibility</h2><p className="mt-4 text-base leading-7 text-muted-foreground">Keep supplier conversations, commercial checkpoints, quality expectations, and delivery planning connected instead of managing each step in isolation.</p></div>
          <Card className="border-border/50 bg-indigo-100/55 shadow-none dark:bg-indigo-950/25"><CardContent className="grid gap-4 px-6 sm:grid-cols-2"><div className="flex gap-3"><PackageSearch className="mt-1 size-5 shrink-0" aria-hidden="true" /><div><h3 className="font-semibold">Focused options</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">Compare relevant partners and practical terms.</p></div></div><div className="flex gap-3"><ShieldCheck className="mt-1 size-5 shrink-0" aria-hidden="true" /><div><h3 className="font-semibold">Clear checkpoints</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">Track quality, timing, and commercial decisions.</p></div></div></CardContent></Card>
        </div>
      </section>

      <section className="pb-14 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden border-border/50 bg-blue-100/70 shadow-none dark:bg-blue-950/30"><CardContent className="flex flex-col gap-6 px-6 sm:p-9 lg:flex-row lg:items-center lg:justify-between"><div><Badge variant="secondary"><Sparkles aria-hidden="true" />Start with your requirement</Badge><h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">Need help with {service.name.toLowerCase()}?</h2><p className="mt-3 max-w-2xl text-muted-foreground">Share the product, order size, budget, and US destination to begin.</p></div><Button size="lg" asChild><a href="/#support">Post a requirement</a></Button></CardContent></Card>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

