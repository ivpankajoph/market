import {
  BadgeCheck,
  BellRing,
  Boxes,
  Check,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  Factory,
  Globe2,
  HandCoins,
  Handshake,
  Headphones,
  MessageSquareText,
  PackageCheck,
  PackageSearch,
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
import { CountryTypewriter } from "@/components/ui/country-typewriter";
import { World, type GlobePosition } from "@/components/ui/globe-client";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { InquiryCarousel, type Inquiry } from "@/components/inquiry-carousel";
import { SiteFooter } from "@/components/site-footer";
import inquiryData from "@/data/inquiries.json";

const trustPoints = [
  { icon: BadgeCheck, title: "Relevant agent matching", description: "Meet agents experienced in your product category.", tone: "bg-blue-100/70 dark:bg-blue-950/30" },
  { icon: ShieldCheck, title: "Protected platform payments", description: "Payment safeguards apply to transactions made here.", tone: "bg-cyan-100/70 dark:bg-cyan-950/30" },
  { icon: HandCoins, title: "Competitive quotations", description: "Compare offers before choosing your sourcing partner.", tone: "bg-indigo-100/70 dark:bg-indigo-950/30" },
  { icon: Undo2, title: "Refund support", description: "Buyer-package terms include a refund commitment.", tone: "bg-sky-100/70 dark:bg-sky-950/30" },
];

const steps = [
  { number: "01", icon: ClipboardList, title: "Post your requirement", description: "Add the product, quantity, specifications, target price, and delivery destination.", tone: "bg-blue-100/60 dark:bg-blue-950/30" },
  { number: "02", icon: PackageSearch, title: "Receive relevant matches", description: "Your request reaches sourcing agents who already work in that category.", tone: "bg-sky-100/60 dark:bg-sky-950/30" },
  { number: "03", icon: MessageSquareText, title: "Compare agents and offers", description: "Discuss samples, quotations, production terms, and timelines with interested agents.", tone: "bg-cyan-100/60 dark:bg-cyan-950/30" },
  { number: "04", icon: CreditCard, title: "Choose and pay securely", description: "Select the right partner and use the platform payment flow for protection.", tone: "bg-indigo-100/60 dark:bg-indigo-950/30" },
];

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

const countries = [
  { text: "China", className: "text-[#DE2910]" },
  { text: "India", className: "text-[#FF9933]" },
  { text: "Vietnam", className: "text-[#DA251D]" },
  { text: "Taiwan", className: "text-[#0055B9] dark:text-[#38BDF8]" },
  { text: "Africa", className: "text-[#059669] dark:text-[#34D399]" },
  { text: "Global", className: "text-foreground" },
];

const globeData: GlobePosition[] = [
  { order: 1, startLat: 28.6139, startLng: 77.209, endLat: 31.2304, endLng: 121.4737, arcAlt: 0.18, color: "#bfdbfe" },
  { order: 2, startLat: 21.0285, startLng: 105.8542, endLat: 28.6139, endLng: 77.209, arcAlt: 0.16, color: "#dbeafe" },
  { order: 3, startLat: 25.033, startLng: 121.5654, endLat: 19.076, endLng: 72.8777, arcAlt: 0.2, color: "#bfdbfe" },
  { order: 4, startLat: -1.2921, startLng: 36.8219, endLat: 28.6139, endLng: 77.209, arcAlt: 0.25, color: "#dbeafe" },
  { order: 5, startLat: 31.2304, startLng: 121.4737, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.28, color: "#bfdbfe" },
  { order: 6, startLat: 19.076, startLng: 72.8777, endLat: 40.7128, endLng: -74.006, arcAlt: 0.3, color: "#dbeafe" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 overflow-hidden border-b border-border/40 hero-ambient-flow backdrop-blur-md">
        {/* Soft moving light ambient orbs in navbar */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="animate-float-slow absolute -left-10 -top-12 h-36 w-36 rounded-full bg-blue-300/25 blur-2xl dark:bg-blue-600/15" />
          <div className="animate-float-reverse absolute right-12 -top-10 h-36 w-36 rounded-full bg-indigo-200/35 blur-2xl dark:bg-indigo-600/15" />
        </div>
        <div className="relative z-10 mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight" aria-label="SellersLogin Market home">
            <span className="flex size-8 items-center justify-center rounded-md border border-border/50 bg-white/70 shadow-xs dark:bg-black/20">
              <Globe2 className="size-4" aria-hidden="true" />
            </span>
            <span>SellersLogin Market</span>
          </a>
          <div className="flex items-center gap-2">
            <nav className="flex items-center gap-1" aria-label="Main navigation">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex hover:bg-white/50 dark:hover:bg-white/10" asChild><a href="#how">How it works</a></Button>
              <Button variant="ghost" size="sm" className="hidden md:inline-flex hover:bg-white/50 dark:hover:bg-white/10" asChild><a href="#categories">Categories</a></Button>
              <Button variant="ghost" size="sm" className="hover:bg-white/50 dark:hover:bg-white/10" asChild><a href="#support">Support</a></Button>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden scroll-mt-24 hero-ambient-flow">
        {/* Soft moving light ambient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="animate-float-slow absolute -left-20 -top-20 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl dark:bg-blue-600/15 sm:h-96 sm:w-96" />
          <div className="animate-float-reverse absolute -right-20 top-10 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl dark:bg-indigo-600/15 sm:h-96 sm:w-96" />
          <div className="animate-float-drift absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-teal-200/30 blur-3xl dark:bg-teal-600/15 sm:h-80 sm:w-80" />
          <div className="animate-float-slow absolute right-1/4 bottom-16 h-64 w-64 rounded-full bg-rose-200/25 blur-3xl dark:bg-rose-600/10 sm:h-72 sm:w-72" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 pt-4 text-center sm:px-6">

          <h1 className="mt-5 flex max-w-4xl flex-col items-center text-balance text-4xl font-semibold tracking-tight sm:block sm:text-6xl lg:text-7xl">
            <span>Source From</span>{" "}
            <CountryTypewriter items={countries} className="min-w-[8ch] justify-center px-0 text-foreground sm:justify-start" typingSpeed={40} deletingSpeed={22} pauseDuration={480} />
          </h1>
         
          <div className="mt-6 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Button size="lg" asChild><a href="#start">I&apos;m a buyer<Search aria-hidden="true" /></a></Button>
            <Button size="lg" variant="outline" asChild><a href="#start">I&apos;m a seller<Store aria-hidden="true" /></a></Button>
          </div>
          
        </div>

        <div className="relative z-10 mx-auto mt-2 h-72 max-w-7xl overflow-hidden sm:mt-3 sm:h-80" aria-label="Interactive rotating globe showing worldwide trade">
          <World className="absolute left-1/2 -top-16 h-[40rem] w-[40rem] -translate-x-1/2 sm:-top-20 sm:h-[44rem] sm:w-[44rem]" data={globeData} globeConfig={{ globeColor: "#1d4ed8", polygonColor: "rgba(219,234,254,0.88)", atmosphereColor: "#60a5fa", atmosphereAltitude: 0.08, emissive: "#172554", emissiveIntensity: 0.18, showAtmosphere: true, autoRotate: true, autoRotateSpeed: 0.65, initialPosition: { lat: 20, lng: 78 } }} />
        </div>
        <Separator />
      </section>

      <section className="bg-sky-50/25 py-6 dark:bg-sky-950/5 sm:py-8" aria-label="Platform assurances">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {trustPoints.map((point) => (
            <Card key={point.title} className={`gap-4 border-border/40 py-5 shadow-none ${point.tone}`}>
              <CardContent className="flex gap-3 px-5">
                <point.icon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <div><h2 className="font-medium">{point.title}</h2><p className="mt-1 text-sm leading-5 text-muted-foreground">{point.description}</p></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="how" className="scroll-mt-20 border-y border-border/50 bg-blue-50/35 py-10 dark:bg-blue-950/10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl"><Badge variant="outline">How it works</Badge><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">From requirement to sourcing partner</h2><p className="mt-4 text-base leading-7 text-muted-foreground">A focused four-step path keeps each sourcing decision clear.</p></div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <Card key={step.number} className={`h-full border-border/40 shadow-none ${step.tone}`}><CardHeader><div className="flex items-center justify-between"><span className="flex size-10 items-center justify-center rounded-md bg-white/60 dark:bg-black/10"><step.icon className="size-5" aria-hidden="true" /></span><Badge variant="secondary">{step.number}</Badge></div><CardTitle className="mt-3">{step.title}</CardTitle><CardDescription className="leading-6">{step.description}</CardDescription></CardHeader></Card>
            ))}
          </div>
        </div>
      </section>

      <section id="requests" className="scroll-mt-20 border-b border-border/50 bg-background py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <Badge variant="outline">Live buyer requirements</Badge>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Explore active sourcing enquiries</h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">Browse recent buyer requests and open a card to review the complete sourcing requirement.</p>
            </div>
            <Badge variant="secondary" className="w-fit px-3 py-1.5 text-sm">{inquiryData.length} requests</Badge>
          </div>
          <InquiryCarousel inquiries={inquiryData as Inquiry[]} />
        </div>
      </section>

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
          <Alert className="border-amber-200/60 bg-amber-100/60 dark:border-amber-900/40 dark:bg-amber-950/25"><ShieldCheck aria-hidden="true" /><AlertTitle>Payment protection applies only on the platform</AlertTitle><AlertDescription><p>SellersLogin Market introduces buyers and sourcing agents. Payment safeguards, price commitments, and package refunds apply only when the transaction is completed through the platform. Payments made directly to an agent remain the buyer&apos;s responsibility.</p></AlertDescription></Alert>
        </div>
      </section>

      <section id="support" className="scroll-mt-20 border-t border-border/50 bg-blue-50/35 py-10 dark:bg-blue-950/10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card id="start" className="scroll-mt-24 overflow-hidden border-border/40 bg-blue-100/60 shadow-none dark:bg-blue-950/25"><CardContent className="grid gap-8 py-2 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center"><div><Badge variant="secondary"><Sparkles aria-hidden="true" />Buyers and sourcing agents welcome</Badge><h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">Ready to begin your next sourcing request?</h2><p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">Post your requirement as a buyer, or join the network as a sourcing agent.</p></div><div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><Button size="lg" asChild><a href="#top"><Search aria-hidden="true" />Post a requirement</a></Button><Button size="lg" variant="outline" asChild><a href="#top"><Store aria-hidden="true" />Join as an agent</a></Button><Button size="lg" variant="ghost" asChild><a href="mailto:support@sellerslogin.market"><Headphones aria-hidden="true" />Contact support</a></Button></div></CardContent></Card>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
