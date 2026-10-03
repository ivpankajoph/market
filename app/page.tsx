import {
  ArrowRight,
  Globe2,
  Headphones,
  PackageCheck,
  Search,
  ShieldCheck,
  Store,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe3D } from "@/components/ui/3d-globe";
import { FlipWords } from "@/components/ui/flip-words";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const services = [
  {
    icon: Search,
    title: "Discover verified sellers",
    description:
      "Find reliable suppliers and compare the right products for your business.",
  },
  {
    icon: Store,
    title: "Build your storefront",
    description:
      "Present your catalogue clearly and reach buyers beyond your local market.",
  },
  {
    icon: ShieldCheck,
    title: "Trade with confidence",
    description:
      "Use verified business profiles and transparent order details from the start.",
  },
  {
    icon: Headphones,
    title: "Get practical support",
    description:
      "Receive help when you need it, from your first enquiry to your next order.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create your profile",
    description: "Tell the market what you buy or what you sell.",
  },
  {
    number: "02",
    title: "Find the right match",
    description: "Browse relevant businesses and start a conversation.",
  },
  {
    number: "03",
    title: "Move business forward",
    description: "Agree on the details and build a lasting trade relationship.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/40 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="#top"
            className="flex items-center gap-2 font-semibold tracking-tight"
            aria-label="SellersLogin Market home"
          >
            <span className="flex size-8 items-center justify-center rounded-md border bg-card shadow-xs">
              <Globe2 className="size-4" aria-hidden="true" />
            </span>
            <span>SellersLogin Market</span>
          </a>

          <nav className="flex items-center gap-1" aria-label="Main navigation">
            <Button variant="ghost" size="sm" asChild>
              <a href="#services">Services</a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="#support">Support</a>
            </Button>
          </nav>
        </div>
      </header>

      <section id="top" className="overflow-hidden mt-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6">


          <h1 className="flex max-w-4xl flex-col items-center text-balance text-4xl font-semibold tracking-tight sm:block sm:text-6xl lg:text-7xl">
            <span>Import from</span>{" "}
            <FlipWords
              words={["China", "India", "the US", "the UK", "Global"]}
              duration={2200}
              className="min-w-[7ch] justify-center px-0 text-foreground sm:justify-start"
            />
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
            Discover dependable businesses, open new markets, and make every
            trade conversation simpler.
          </p>

          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <Button size="lg" asChild>
              <a href="#services">
                I&apos;m a buyer
                <Search aria-hidden="true" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#seller">
                I&apos;m a seller
                <Store aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>

        <div
          className="relative mx-auto mt-10 h-72 max-w-7xl overflow-hidden sm:mt-14 sm:h-80"
          aria-label="Interactive rotating globe showing worldwide trade"
        >
          <Globe3D
            className="absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 sm:h-[40rem] sm:w-[40rem]"
            config={{
              autoRotateSpeed: 0.7,
              enableZoom: false,
              enablePan: false,
              showAtmosphere: true,
              atmosphereIntensity: 0.35,
              atmosphereBlur: 3,
              bumpScale: 0.8,
              ambientIntensity: 0.8,
              pointLightIntensity: 1.35,
            }}
          />
        </div>
        <Separator />
      </section>

      <section id="services" className="scroll-mt-20 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Badge variant="secondary">Services</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need to find your next opportunity
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              A clear, dependable place to discover products, present your
              business, and build trusted relationships.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Card key={service.title} className="h-full">
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-md border bg-muted">
                    <service.icon className="size-5" aria-hidden="true" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription className="leading-6">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="seller" className="border-y bg-muted/30 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:px-8">
          <div>
            <Badge variant="outline">How it works</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              From introduction to opportunity
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              Start as a buyer or seller. The path stays simple either way.
            </p>
          </div>

          <div className="grid gap-4">
            {steps.map((step) => (
              <Card key={step.number}>
                <CardContent className="flex gap-5">
                  <Badge variant="secondary" className="h-7 rounded-md">
                    {step.number}
                  </Badge>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="support" className="scroll-mt-20 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden">
            <CardContent className="grid gap-8 py-2 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <Badge variant="secondary">
                  <Users aria-hidden="true" />
                  Buyers and sellers welcome
                </Badge>
                <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                  Your next business relationship can start here
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                  Join a straightforward marketplace designed to help serious
                  businesses find each other.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <a href="#top">
                    Explore the market
                    <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="mailto:support@sellerslogin.market">
                    Contact support
                    <Headphones aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-foreground">
            <PackageCheck className="size-4" aria-hidden="true" />
            <span className="font-medium">SellersLogin Market</span>
          </div>
          <p>Made for clear, confident business.</p>
        </div>
      </footer>
    </main>
  );
}
