import {
  BellRing,
  Boxes,
  Check,
  ClipboardCheck,
  ClipboardList,
  Factory,
  Handshake,
  Headphones,
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
  title: "SellersLogin Market - Global Sourcing & Buyer Sourcing Coordination",
  description:
    "A simple global marketplace where buyers and sellers discover trusted business opportunities.",
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
  { icon: ClipboardList, title: "Unlimited requirements", description: "Post every sourcing request you need during the package period.", tone: "bg-blue-100/60 dark:bg-blue-950/30" },
  { icon: BellRing, title: "Matching alerts", description: "Receive agent updates through email, WhatsApp, and the platform.", tone: "bg-cyan-100/60 dark:bg-cyan-950/30" },
  { icon: TrendingUp, title: "China trend updates", description: "Get notified when promising products begin trending in China.", tone: "bg-indigo-100/60 dark:bg-indigo-950/30" },
  { icon: ShieldCheck, title: "Payment protection", description: "Use the platform payment route to keep eligible transactions protected.", tone: "bg-emerald-100/60 dark:bg-emerald-950/30" },
  { icon: Tags, title: "Price comparison", description: "Review competitive quotations from suitable sourcing agents.", tone: "bg-sky-100/60 dark:bg-sky-950/30" },
  { icon: Undo2, title: "Refund commitment", description: "Package terms include a refund when suitable sourcing support is unavailable.", tone: "bg-violet-100/60 dark:bg-violet-950/30" },
];

const indiaSupport = [
  "China sourcing coordination",
  "Customs and documentation guidance",
  "Freight and logistics assistance",
  "Local communication and follow-up",
];

const platformBenefits = [
  { title: "Save time", description: "Post once instead of contacting agents individually." },
  { title: "Stay protected", description: "Use the platform payment route for eligible safeguards." },
  { title: "Compare prices", description: "Review multiple quotations before making a decision." },
  { title: "Reduce sourcing risk", description: "Work with category-relevant sourcing professionals." },
  { title: "Get targeted matches", description: "Reach agents aligned with your exact product request." },
  { title: "Track product trends", description: "Receive useful updates about fast-moving China products." },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SourcePageIntro />

      <section id="categories" className="scroll-mt-20 bg-indigo-50/20 py-10 dark:bg-indigo-950/5 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl"><Badge variant="secondary">Popular categories</Badge><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Source across key product categories</h2><p className="mt-4 text-base leading-7 text-muted-foreground">Choose a category and share the exact product details you need.</p></div>
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
          <div><Badge variant="outline">On-the-ground support</Badge><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">What a China import agent can handle</h2><p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">A local sourcing partner helps manage work that is difficult to coordinate from another country.</p></div>
          <div className="grid gap-3 sm:grid-cols-2">
            {agentServices.map((service) => (
              <Card key={service.label} className={`border-border/40 py-0 shadow-none ${service.tone}`}><CardContent className="flex items-center gap-3 p-5"><span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-white/60 dark:bg-black/10"><service.icon className="size-4" aria-hidden="true" /></span><span className="text-sm font-medium leading-5">{service.label}</span></CardContent></Card>
            ))}
          </div>
        </div>
      </section>

      <section id="premium" className="scroll-mt-20 bg-blue-50/20 py-10 dark:bg-blue-950/5 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div className="max-w-2xl"><Badge>Premium buyer package</Badge><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Three months of guided sourcing support</h2><p className="mt-4 text-base leading-7 text-muted-foreground">Designed for active importers who want ongoing matching, updates, and assistance.</p></div><Badge variant="outline" className="h-8 px-3 text-sm">3 months</Badge></div>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {premiumFeatures.map((feature) => (
              <Card key={feature.title} className={`h-full border-border/40 shadow-none ${feature.tone}`}><CardHeader><feature.icon className="size-5" aria-hidden="true" /><CardTitle className="mt-3">{feature.title}</CardTitle><CardDescription className="leading-6">{feature.description}</CardDescription></CardHeader></Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border/50 bg-indigo-50/30 py-10 dark:bg-indigo-950/10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden border-border/40 bg-indigo-100/55 shadow-none dark:bg-indigo-950/25"><CardContent className="grid gap-6 py-2 sm:p-8 lg:grid-cols-2 lg:items-center"><div><Badge variant="secondary"><Users aria-hidden="true" />India coordination</Badge><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Local support in India as well</h2><p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">Alongside China-based sourcing professionals, India-based service providers can help bridge communication, freight, and documentation.</p></div><div className="grid gap-3">{indiaSupport.map((item) => (<div key={item} className="flex items-center gap-3 rounded-lg bg-white/65 p-4 dark:bg-black/10"><Check className="size-4 shrink-0" aria-hidden="true" /><span className="text-sm font-medium">{item}</span></div>))}</div></CardContent></Card>
        </div>
      </section>

      <section className="bg-sky-50/20 py-10 dark:bg-sky-950/5 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl"><Badge variant="outline">Why SellersLogin Market</Badge><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">A simpler way to coordinate international sourcing</h2></div>
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
                SellersLogin Market introduces buyers and sourcing agents. Payment safeguards, price commitments, and package refunds apply only when transactions are coordinated through the verified platform flow. Payments conducted off-platform remain the buyer&apos;s sole responsibility.
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
          <Card id="start" className="scroll-mt-24 overflow-hidden border-border/40 bg-blue-100/60 shadow-none dark:bg-blue-950/25"><CardContent className="grid gap-8 py-2 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center"><div><Badge variant="secondary"><Sparkles aria-hidden="true" />Buyers and sourcing agents welcome</Badge><h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Ready to begin your next sourcing request?</h2><p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">Post your requirement as a buyer, or join the network as a sourcing agent.</p></div><div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><Button size="lg" asChild><Link href={routePath.buyers}><Search aria-hidden="true" />Post a requirement</Link></Button><Button size="lg" variant="outline" asChild><a href="https://web.sellerslogin.com/sellers" target="_blank" rel="noopener noreferrer"><Store aria-hidden="true" />Join as an agent</a></Button><Button size="lg" variant="ghost" asChild><a href="mailto:info@onlinepromotionhouse.com"><Headphones aria-hidden="true" />Contact support</a></Button></div></CardContent></Card>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
