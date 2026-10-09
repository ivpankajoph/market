import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Boxes,
  Check,
  ClipboardCheck,
  Factory,
  FileCheck2,
  Gauge,
  MapPinned,
  PackageCheck,
  PackageSearch,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Tags,
  Target,
  Truck,
  Users,
} from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { ChineseFreightForwarderPage } from "@/components/chinese-freight-forwarder-page";
import { SourcePageIntro } from "@/components/source-page-intro";
import { ServicesWorldMap } from "@/components/services-world-map";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BuyerMarket } from "@/lib/markets";
import {
  getSourceCountry,
  serviceDisplayName,
  services,
  type SourcingService,
} from "@/lib/services";
import { routePath } from "@/url";

type ServiceDetailPageProps = {
  market: BuyerMarket;
  service: SourcingService;
  regionName?: string;
};

type ContentProfile = {
  label: string;
  intro: string;
  outcomes: { title: string; description: string }[];
  checkpoints: { title: string; description: string }[];
  idealFor: { title: string; description: string }[];
};

function localizeServiceText(text: string, market: BuyerMarket) {
  return text
    .replaceAll("US buyers", `buyers in ${market.locationName}`)
    .replaceAll("US businesses", `businesses in ${market.locationName}`)
    .replaceAll("the United States", market.locationName)
    .replaceAll("US delivery location", `delivery location in ${market.locationName}`)
    .replaceAll("US delivery destination", `delivery destination in ${market.locationName}`)
    .replaceAll("US delivery handoff", `${market.name} delivery handoff`)
    .replaceAll("US destination", `destination in ${market.locationName}`);
}

function getServiceKind(name: string) {
  const value = name.toLowerCase();
  if (value.includes("custom clearance")) return "customs";
  if (value.includes("ddp") || value.includes("door to door")) return "ddp";
  if (value.includes("freight") || value.includes("logistics")) return "freight";
  if (value.includes("inspection") || value.includes("factory visit") || value.includes("factory research")) return "inspection";
  if (value.includes("product research") || value.includes("trending")) return "research";
  if (value.includes("import") || value.includes("export")) return "import";
  if (value.includes("alibaba") || value.includes("1688") || value.includes("indiamart")) return "marketplace";
  return "sourcing";
}

function buildContent(service: SourcingService, market: BuyerMarket): ContentProfile {
  const origin = service.origin;
  const destination = market.locationName;
  const kind = getServiceKind(service.name);

  if (kind === "customs") {
    return {
      label: "Customs-clearance coordination",
      intro: `Prepare the information and handoffs needed to clear goods moving from ${origin} into ${destination}, with the importer, customs broker, logistics partner, and supplier working from a consistent shipment file.`,
      outcomes: [
        { title: "Shipment-file readiness", description: "Bring product descriptions, values, quantities, origin, consignee, and transport details into one reviewable file." },
        { title: "Classification inputs", description: "Organize material, use, and technical information that supports broker-led HS classification and duty review." },
        { title: "Document consistency", description: "Check that invoices, packing lists, shipment records, and party details do not conflict." },
        { title: "Release coordination", description: `Track customs queries, document updates, cargo release, and onward delivery in ${destination}.` },
      ],
      checkpoints: [
        { title: "Importer and product details", description: "Importer-of-record, consignee, commodity, composition, use, origin, value, and available compliance records." },
        { title: "Broker-ready documents", description: "Commercial invoice, packing list, transport document, purchase details, and supporting certificates where relevant." },
        { title: "Clearance and delivery", description: "Duty and tax inputs, customs queries, release status, storage exposure, and final handoff." },
      ],
      idealFor: [
        { title: "First-time importers", description: "Buyers who need a clearer view of the parties, documents, and decisions involved in clearance." },
        { title: "Repeat commercial shipments", description: "Teams that want consistent shipment files and broker handoffs across regular imports." },
        { title: "Complex product categories", description: "Goods that require precise descriptions, supporting records, or early compliance questions." },
      ],
    };
  }

  if (kind === "freight") {
    return {
      label: "Freight and logistics planning",
      intro: `Plan the movement of goods from ${origin} to ${destination} around cargo size, urgency, handling needs, and landed-cost priorities—not around a one-size-fits-all shipping quote.`,
      outcomes: [
        { title: "Mode and route fit", description: "Compare suitable air, ocean, rail, road, or multimodal options against time, volume, and budget." },
        { title: "Consolidation planning", description: "Coordinate cargo from one or several suppliers and identify practical handover points." },
        { title: "Document readiness", description: "Organize the commercial and shipping information needed by logistics and customs partners." },
        { title: "Destination handoff", description: `Align arrival, clearance responsibilities, and onward delivery in ${destination}.` },
      ],
      checkpoints: [
        { title: "Cargo profile", description: "Cartons, dimensions, weight, value, commodity, and special handling." },
        { title: "Quote comparison", description: "Freight basis, local charges, transit assumptions, and validity period." },
        { title: "Shipment milestones", description: "Pickup, departure, transit, arrival, clearance, and delivery updates." },
      ],
      idealFor: [
        { title: "Growing importers", description: "Teams moving repeat orders that need a more predictable logistics workflow." },
        { title: "Multi-supplier orders", description: "Buyers coordinating several factories or products in one sourcing cycle." },
        { title: "Time-sensitive cargo", description: "Projects that need a clear trade-off between delivery speed and cost." },
      ],
    };
  }

  if (kind === "ddp") {
    return {
      label: "Delivered-duty-paid coordination",
      intro: `Build a door-to-door plan from ${origin} to ${destination} with clearer ownership of freight, export handling, import clearance, duties, and final delivery.`,
      outcomes: [
        { title: "Landed-cost visibility", description: "Review which transport, customs, duty, and destination charges are included or excluded." },
        { title: "Responsibility mapping", description: "Make the handoffs between supplier, forwarder, broker, and final receiver easier to understand." },
        { title: "Delivery planning", description: "Confirm address type, appointment needs, unloading limits, and final-mile expectations." },
        { title: "Exception control", description: "Surface document gaps, restricted items, and shipment assumptions before dispatch." },
      ],
      checkpoints: [
        { title: "Shipment facts", description: "Commodity, value, HS-code input, dimensions, weight, and destination." },
        { title: "Scope confirmation", description: "Written inclusion of duties, taxes, clearance, storage, and final delivery." },
        { title: "Door delivery", description: "Milestone tracking through pickup, border clearance, and consignee handoff." },
      ],
      idealFor: [
        { title: "First-time importers", description: "Buyers who want fewer fragmented logistics arrangements." },
        { title: "E-commerce inventory", description: "Brands shipping stock to a warehouse, fulfilment centre, or commercial address." },
        { title: "Landed-cost buyers", description: "Teams comparing sourcing options on total delivered cost rather than unit price alone." },
      ],
    };
  }

  if (kind === "inspection") {
    return {
      label: "Supplier and quality verification",
      intro: `Create independent evidence around a ${origin} supplier, factory, or production order before the goods reach ${destination}.`,
      outcomes: [
        { title: "Supplier identity", description: "Review business details, operating location, product focus, and the claimed role in the supply chain." },
        { title: "Production capability", description: "Assess relevant equipment, capacity signals, workflow, and quality-control practices." },
        { title: "Specification checks", description: "Translate drawings, samples, tolerances, packaging, and workmanship into an inspection checklist." },
        { title: "Evidence-led decisions", description: "Use photos, measurements, findings, and corrective actions before approving the next milestone." },
      ],
      checkpoints: [
        { title: "Inspection standard", description: "Define the sample plan, defect classes, tests, and acceptance criteria." },
        { title: "On-site evidence", description: "Record quantities, workmanship, dimensions, function, labelling, and packaging." },
        { title: "Release decision", description: "Review findings and corrective actions before balance payment or shipment." },
      ],
      idealFor: [
        { title: "Private-label brands", description: "Products where finish, packaging, labelling, and consistency protect the brand." },
        { title: "Technical buyers", description: "Components or equipment with measurable specifications and tolerances." },
        { title: "New supplier orders", description: "Purchases where the buyer needs stronger evidence before scaling volume." },
      ],
    };
  }

  if (kind === "research") {
    return {
      label: "Product and market research",
      intro: `Turn a product idea into a sourcing-ready opportunity by connecting demand signals in ${destination} with supplier, cost, and customization realities in ${origin}.`,
      outcomes: [
        { title: "Demand signals", description: "Review use cases, buyer expectations, visible trends, seasonality, and market positioning." },
        { title: "Competitive benchmark", description: "Compare common features, price bands, pack sizes, claims, and customer pain points." },
        { title: "Supply depth", description: `Explore whether ${origin} has enough relevant manufacturers and viable alternatives.` },
        { title: "Unit-economics input", description: "Estimate the cost factors that influence product, packaging, freight, duty, and selling margin." },
      ],
      checkpoints: [
        { title: "Opportunity brief", description: "Target buyer, problem, channel, price point, and differentiation hypothesis." },
        { title: "Supply validation", description: "Supplier availability, MOQ, customization scope, sample cost, and lead time." },
        { title: "Go/no-go review", description: "Summarize evidence, assumptions, risks, and the next validation step." },
      ],
      idealFor: [
        { title: "Marketplace sellers", description: "Teams evaluating products for online channels before committing inventory." },
        { title: "Retail brands", description: "Businesses planning a new range, variation, bundle, or private-label concept." },
        { title: "Category expansion", description: "Established importers testing an adjacent product or customer segment." },
      ],
    };
  }

  if (kind === "import") {
    return {
      label: "Import and export coordination",
      intro: `Connect the commercial, documentation, and logistics steps needed to move goods from ${origin} into ${destination} with fewer last-minute surprises.`,
      outcomes: [
        { title: "Trade-term clarity", description: "Define responsibilities under the chosen Incoterm and align the commercial quotation." },
        { title: "Document coordination", description: "Prepare the invoice, packing list, transport documents, and product information for partner review." },
        { title: "Compliance handoff", description: "Identify product-specific questions that need confirmation from qualified customs or compliance partners." },
        { title: "Shipment continuity", description: "Keep supplier readiness, booking, export steps, clearance, and delivery connected." },
      ],
      checkpoints: [
        { title: "Product classification", description: "Detailed product description, material, use, origin, value, and HS-code input." },
        { title: "Commercial file", description: "Consistent quantities, pricing, Incoterms, consignee details, and supporting documents." },
        { title: "Border-to-door plan", description: "Broker, forwarder, importer-of-record, and destination responsibilities." },
      ],
      idealFor: [
        { title: "New trade lanes", description: `Buyers importing from ${origin} into ${destination} for the first time.` },
        { title: "Regulated categories", description: "Products requiring early document, labelling, testing, or compliance questions." },
        { title: "Repeat importers", description: "Teams looking to standardize files and handoffs across regular shipments." },
      ],
    };
  }

  if (kind === "marketplace") {
    return {
      label: "Marketplace-assisted sourcing",
      intro: `Use ${service.name} to move beyond search results and build a structured shortlist of ${origin} suppliers for buyers in ${destination}.`,
      outcomes: [
        { title: "Factory or trader context", description: "Check what the seller appears to manufacture, outsource, or distribute before comparing offers." },
        { title: "Normalized quotations", description: "Compare the same specification, quantity, Incoterm, packaging, and payment assumptions." },
        { title: "Sample and customization", description: "Coordinate samples, branding, materials, packaging, and approval points." },
        { title: "Order follow-through", description: "Carry confirmed terms into production, quality checks, and shipment planning." },
      ],
      checkpoints: [
        { title: "Search criteria", description: "Product keywords, supplier type, region, capability, certification, and export experience." },
        { title: "Supplier comparison", description: "Quote, MOQ, tooling, sample, capacity, lead time, and communication quality." },
        { title: "Verified next step", description: "Select candidates for deeper checks, samples, negotiation, or an order." },
      ],
      idealFor: [
        { title: "Online sellers", description: "Buyers who need a better filter than listings and headline prices." },
        { title: "Custom product teams", description: "Projects involving logo, packaging, tooling, colours, or specification changes." },
        { title: "Small and mid-size importers", description: "Teams that want comparison support without building a local sourcing office." },
      ],
    };
  }

  return {
    label: "End-to-end sourcing coordination",
    intro: `Find, compare, and coordinate suitable ${origin} suppliers while keeping commercial terms, product quality, and delivery to ${destination} connected.`,
    outcomes: [
      { title: "Relevant supplier shortlist", description: "Search around product capability, order size, customization, certifications, and export fit." },
      { title: "Comparable commercial terms", description: "Review quotations on the same specification, MOQ, tooling, packaging, payment, and Incoterm basis." },
      { title: "Sample and quality control", description: "Turn product expectations into approvals, production checkpoints, and inspection criteria." },
      { title: "Delivery coordination", description: `Connect supplier readiness with export documents, freight planning, and delivery in ${destination}.` },
    ],
    checkpoints: [
      { title: "Supplier fit", description: "Capability, identity, relevant experience, capacity, MOQ, and communication." },
      { title: "Product approval", description: "Specification, samples, materials, branding, packaging, and acceptance criteria." },
      { title: "Order control", description: "Final terms, production updates, inspection, shipment documents, and handoff." },
    ],
    idealFor: [
      { title: "E-commerce and private label", description: "Products requiring differentiation, packaging, and repeatable quality." },
      { title: "Wholesale and distribution", description: "Buyers comparing larger orders, supplier depth, and landed cost." },
      { title: "Industrial procurement", description: "Components, equipment, and made-to-spec requirements with measurable criteria." },
    ],
  };
}

export function ServiceDetailPage({ market, service, regionName }: ServiceDetailPageProps) {
  if (
    !regionName &&
    market.slug === "us" &&
    service.slug === "chinese-freight-forwarder"
  ) {
    return <ChineseFreightForwarderPage market={market} service={service} />;
  }

  const displayMarket = regionName
    ? { ...market, name: regionName, locationName: `${regionName}, ${market.locationName}` }
    : market;
  const sourceCountry = getSourceCountry(service.origin);
  const overview = localizeServiceText(service.overview, displayMarket);
  const content = buildContent(service, displayMarket);
  const displayServiceName = serviceDisplayName(service.name);
  const relatedServices = services.filter((item) => item.origin === service.origin && item.slug !== service.slug).slice(0, 6);
  const pageTitle = regionName
    ? `${displayServiceName} for Buyers in ${regionName}`
    : `${displayServiceName} for ${displayMarket.name} Buyers`;
  const briefDetails = [
    { icon: FileCheck2, title: "Product specification", description: "Materials, dimensions, packaging, certifications, and reference files." },
    { icon: PackageSearch, title: "Order target", description: "Expected quantity, preferred MOQ, sample needs, and reorder plans." },
    { icon: Tags, title: "Commercial range", description: "Target unit cost, total budget, payment expectations, and key terms." },
    { icon: Route, title: "Delivery plan", description: `Required date, destination in ${displayMarket.locationName}, shipping preference, and final-mile needs.` },
  ];
  const faqs = [
    {
      question: `What does ${displayServiceName} include?`,
      answer: `${displayServiceName} can cover the relevant stages shown on this page, from requirement clarification and partner comparison to documentation, quality, and delivery coordination. The final scope depends on your product, order size, origin, destination, and selected partner.`,
    },
    {
      question: `How are suppliers or service partners in ${service.origin} assessed?`,
      answer: "Assessment can review identity, product relevance, capability, quotation detail, communication, sample performance, available documents, and on-site evidence where appropriate. The checks should be agreed before an order is placed.",
    },
    {
      question: "Can the platform connect me with help for samples, MOQ, and price negotiation?",
      answer: "Yes. ChinaIndiaSourcing can introduce independent providers whose scope may include sample coordination, MOQ discussions, customization, packaging, target cost, and payment terms. Confirm the exact deliverables with the provider you select.",
    },
    {
      question: `How long does sourcing from ${service.origin} take?`,
      answer: "Timing varies by product complexity, supplier availability, sample rounds, tooling, production lead time, inspection, and shipping method. A realistic schedule is created after the requirement and supplier options are reviewed.",
    },
    {
      question: `Can quality checks and shipping to ${displayMarket.locationName} be coordinated?`,
      answer: "They can be included in the sourcing plan. Inspection criteria, release decisions, documents, freight responsibilities, customs handoffs, and final delivery requirements should be confirmed as separate milestones.",
    },
  ];
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: pageTitle,
      description: `${content.intro} ${overview}`,
      about: { "@type": "Service", name: displayServiceName, areaServed: { "@type": "Place", name: displayMarket.locationName } },
      audience: { "@type": "BusinessAudience", audienceType: `${displayMarket.name} buyers and importers` },
      publisher: { "@type": "Organization", name: "ChinaIndiaSourcing" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <SourcePageIntro title={pageTitle} />

      <section className="relative overflow-hidden border-b border-border/50 bg-blue-50/50 dark:bg-blue-950/10">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-24 -top-24 size-80 rounded-full bg-cyan-300/25 blur-3xl dark:bg-cyan-700/10" />
          <div className="absolute -right-20 bottom-0 size-96 rounded-full bg-indigo-300/25 blur-3xl dark:bg-indigo-700/10" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-7 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-start lg:px-8">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">For buyers in {displayMarket.name}</Badge>
              <Badge variant="outline" className="bg-background/70">
                <img src={`https://flagcdn.com/w40/${sourceCountry.flagCode}.png`} alt={`${sourceCountry.name} flag`} width={24} height={16} className="h-4 w-6 rounded-[2px] border border-black/10 object-cover" />
                {service.origin}
              </Badge>
            </div>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">{content.label}</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">Find the right {service.origin} partner for your buying requirement</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">{content.intro}</p>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">{overview}</p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Platform role:</strong> ChinaIndiaSourcing does not manufacture, sell, inspect, ship, or act as the sourcing agent. We connect buyers with independent businesses that provide those services.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild><Link href={routePath.buyers}><Search aria-hidden="true" />Post a requirement</Link></Button>
              <Button size="lg" variant="outline" asChild><a href="#process"><ClipboardCheck aria-hidden="true" />See the process</a></Button>
            </div>
          </div>

          <div className="relative py-2 lg:pl-5">
            <div className="flex items-center justify-between gap-4">
              <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">Sourcing from {service.origin}</p><h2 className="mt-2 text-2xl font-semibold tracking-tight">{service.origin} sourcing coverage</h2></div>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-blue-200/80 bg-background/50 text-blue-700 backdrop-blur-sm dark:border-blue-800/60 dark:text-blue-300"><MapPinned className="size-5" aria-hidden="true" /></span>
            </div>
            <div className="mt-4 flex h-[260px] items-center justify-center sm:h-[330px] lg:h-[360px]">
              <ServicesWorldMap highlightedCountryCodes={[sourceCountry.flagCode]} expandOnDesktop={false} />
            </div>
            <div className="mt-3 grid grid-cols-3 border-y border-blue-200/70 py-3 text-center text-sm dark:border-blue-800/50">
              <div><strong className="block text-lg text-foreground">{regionName ? "Regional" : "Countrywide"}</strong><span className="text-muted-foreground">Coordination</span></div>
              <div className="border-x border-blue-200/70 dark:border-blue-800/50"><strong className="block text-xl text-foreground">1</strong><span className="text-muted-foreground">Clear workflow</span></div>
              <div><strong className="block text-xl text-foreground">2</strong><span className="text-muted-foreground">Markets linked</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/50 bg-background py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl"><Badge variant="outline">What better coordination changes</Badge><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Decisions backed by clearer information</h2><p className="mt-3 leading-7 text-muted-foreground">Each stage should produce something a buyer can compare, approve, or act on—not another disconnected message thread.</p></div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.outcomes.map((item, index) => {
              const icons = [Target, Boxes, ShieldCheck, Truck];
              const Icon = icons[index];
              return <Card key={item.title} className={`h-full border-border/50 shadow-none ${index % 2 ? "bg-cyan-50/65 dark:bg-cyan-950/15" : "bg-blue-50/65 dark:bg-blue-950/15"}`}><CardHeader><span className="flex size-10 items-center justify-center rounded-xl bg-background text-blue-700 shadow-sm dark:text-blue-300"><Icon className="size-5" aria-hidden="true" /></span><CardTitle className="mt-3 text-lg">{item.title}</CardTitle><p className="text-sm leading-6 text-muted-foreground">{item.description}</p></CardHeader></Card>;
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border/50 bg-slate-50/60 py-10 dark:bg-slate-950/20 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:px-8">
          <div><Badge variant="secondary">Platform-assisted workflow</Badge><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">One visible path from brief to provider handoff</h2><p className="mt-3 leading-7 text-muted-foreground">Use the platform to compare options and organize decisions while each independent provider remains accountable for the scope you agree with them.</p></div>
          <Card className="overflow-hidden border-blue-200/70 bg-background/85 shadow-xl shadow-blue-950/5 dark:border-blue-900/60">
            <CardContent className="p-5 sm:p-7">
              <div className="grid gap-3 sm:grid-cols-4">
                {[{ icon: ClipboardCheck, title: "Define", text: "Brief and targets" }, { icon: Factory, title: "Match", text: "Partner options" }, { icon: ShieldCheck, title: "Verify", text: "Evidence and checks" }, { icon: PackageCheck, title: "Deliver", text: "Release and handoff" }].map(({ icon: Icon, title, text }, index) => (
                  <div key={title} className="relative rounded-xl border border-border/60 bg-blue-50/55 p-4 dark:bg-blue-950/20">
                    {index < 3 && <ArrowRight className="absolute -right-5 top-1/2 z-10 hidden size-5 -translate-y-1/2 rounded-full bg-background text-blue-600 sm:block" aria-hidden="true" />}
                    <Icon className="size-5 text-blue-700 dark:text-blue-300" aria-hidden="true" /><p className="mt-3 font-semibold">{title}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[{ icon: Gauge, title: "Quote clarity", text: "Comparable assumptions" }, { icon: ShieldCheck, title: "Quality gates", text: "Defined approvals" }, { icon: Route, title: "Milestone tracking", text: "Visible handoffs" }].map(({ icon: Icon, title, text }) => <div key={title} className="flex items-center gap-3 rounded-lg border border-border/50 px-3 py-3"><Icon className="size-5 text-cyan-700 dark:text-cyan-300" aria-hidden="true" /><div><p className="text-sm font-medium">{title}</p><p className="text-xs text-muted-foreground">{text}</p></div></div>)}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-b border-border/50 bg-background py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div><Badge variant="outline">A stronger starting brief</Badge><h2 className="mt-3 text-3xl font-semibold tracking-tight">Share the details that shape the right plan</h2><p className="mt-3 max-w-xl leading-7 text-muted-foreground">You do not need a finished technical pack to begin. A clear starting brief focuses partner conversations, makes options easier to compare, and identifies open questions early.</p></div>
            <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {briefDetails.map(({ icon: Icon, title, description }) => <div key={title} className="flex gap-4 border-t border-border/70 pt-5"><span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"><Icon className="size-5" aria-hidden="true" /></span><div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p></div></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl"><Badge variant="outline">Service scope</Badge><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">What listed {service.origin} providers can cover</h2></div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.includes.map((item, index) => <Card key={item} className={`border-border/50 shadow-none ${index % 3 === 0 ? "bg-blue-50/70 dark:bg-blue-950/20" : index % 3 === 1 ? "bg-cyan-50/70 dark:bg-cyan-950/20" : "bg-indigo-50/70 dark:bg-indigo-950/20"}`}><CardContent className="flex items-start gap-3 px-5"><span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-background"><Check className="size-4" aria-hidden="true" /></span><p className="leading-6">{localizeServiceText(item, displayMarket)}</p></CardContent></Card>)}
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-16 border-y border-border/50 bg-sky-50/40 py-10 dark:bg-sky-950/10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl"><Badge variant="secondary">How it works</Badge><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A clear path from brief to execution</h2></div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, index) => {
              const cardTones = [
                "border-blue-200/70 bg-blue-100/60 dark:border-blue-900/60 dark:bg-blue-950/25",
                "border-cyan-200/70 bg-cyan-100/60 dark:border-cyan-900/60 dark:bg-cyan-950/25",
                "border-indigo-200/70 bg-indigo-100/55 dark:border-indigo-900/60 dark:bg-indigo-950/25",
                "border-sky-200/70 bg-sky-100/60 dark:border-sky-900/60 dark:bg-sky-950/25",
              ];
              const numberTones = [
                "bg-blue-700 text-white",
                "bg-cyan-700 text-white",
                "bg-indigo-700 text-white",
                "bg-sky-700 text-white",
              ];

              return <Card key={step.title} className={`h-full shadow-none ${cardTones[index % cardTones.length]}`}><CardHeader><div className={`flex size-9 items-center justify-center rounded-full text-sm font-semibold ${numberTones[index % numberTones.length]}`}>{String(index + 1).padStart(2, "0")}</div><CardTitle className="mt-3">{step.title}</CardTitle><p className="text-sm leading-6 text-muted-foreground">{localizeServiceText(step.description, displayMarket)}</p></CardHeader></Card>;
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border/50 bg-background py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div><Badge variant="outline">Commercial checkpoints</Badge><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Questions to settle before money or goods move</h2><p className="mt-3 leading-7 text-muted-foreground">These checkpoints help turn assumptions into written decisions that can be revisited throughout the order.</p></div>
            <div className="space-y-3">
              {content.checkpoints.map((item, index) => {
                const checkpointTones = [
                  "border-blue-200/70 bg-blue-100/55 dark:border-blue-900/60 dark:bg-blue-950/25",
                  "border-cyan-200/70 bg-cyan-100/55 dark:border-cyan-900/60 dark:bg-cyan-950/25",
                  "border-indigo-200/70 bg-indigo-100/50 dark:border-indigo-900/60 dark:bg-indigo-950/25",
                ];
                const numberTones = ["bg-blue-700", "bg-cyan-700", "bg-indigo-700"];

                return <div key={item.title} className={`grid gap-3 rounded-xl border p-4 sm:grid-cols-[auto_1fr] sm:items-start ${checkpointTones[index % checkpointTones.length]}`}><span className={`flex size-9 items-center justify-center rounded-full text-sm font-semibold text-white ${numberTones[index % numberTones.length]}`}>{index + 1}</span><div><h3 className="font-semibold">{item.title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p></div></div>;
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/50 bg-indigo-50/35 py-10 dark:bg-indigo-950/10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl"><Badge variant="secondary">Risk and control</Badge><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Replace sourcing blind spots with practical controls</h2></div>
          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            <Card className="border-rose-200/70 bg-rose-50/65 shadow-none dark:border-rose-900/50 dark:bg-rose-950/15"><CardHeader><CardTitle className="flex items-center gap-2"><AlertTriangle className="size-5 text-rose-600" aria-hidden="true" />Without a connected plan</CardTitle></CardHeader><CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">{["Supplier claims can be difficult to compare.", "Headline prices may hide different specifications or trade terms.", "Quality issues may appear after production or payment.", "Shipping responsibilities can remain unclear until dispatch."].map((item) => <p key={item} className="flex gap-2"><span aria-hidden="true">—</span>{item}</p>)}</CardContent></Card>
            <Card className="border-emerald-200/70 bg-emerald-50/65 shadow-none dark:border-emerald-900/50 dark:bg-emerald-950/15"><CardHeader><CardTitle className="flex items-center gap-2"><ShieldCheck className="size-5 text-emerald-700" aria-hidden="true" />With defined checkpoints</CardTitle></CardHeader><CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">{["Shortlists are tied to stated capability and order needs.", "Quotes share a consistent specification and commercial basis.", "Samples, inspections, and approvals create decision evidence.", "Documents and logistics handoffs are discussed before shipment."].map((item) => <p key={item} className="flex gap-2"><Check className="mt-1 size-4 shrink-0 text-emerald-700" aria-hidden="true" />{item}</p>)}</CardContent></Card>
          </div>
        </div>
      </section>

      <section className="border-b border-border/50 bg-background py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl"><Badge variant="outline">Who this is for</Badge><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Built around real buying scenarios</h2></div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {content.idealFor.map((item, index) => {
              const icons = [Users, Boxes, Factory];
              const Icon = icons[index];
              const cardTones = [
                "border-blue-200/70 bg-blue-100/55 dark:border-blue-900/60 dark:bg-blue-950/25",
                "border-cyan-200/70 bg-cyan-100/55 dark:border-cyan-900/60 dark:bg-cyan-950/25",
                "border-indigo-200/70 bg-indigo-100/50 dark:border-indigo-900/60 dark:bg-indigo-950/25",
              ];
              const iconTones = [
                "text-blue-700 dark:text-blue-300",
                "text-cyan-700 dark:text-cyan-300",
                "text-indigo-700 dark:text-indigo-300",
              ];

              return <Card key={item.title} className={`shadow-none ${cardTones[index % cardTones.length]}`}><CardContent className="px-5"><Icon className={`size-6 ${iconTones[index % iconTones.length]}`} aria-hidden="true" /><h3 className="mt-4 text-lg font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p></CardContent></Card>;
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border/50 bg-sky-50/30 py-10 dark:bg-sky-950/10 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <div><Badge variant="secondary">Frequently asked questions</Badge><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Questions buyers ask before getting started</h2><p className="mt-3 leading-7 text-muted-foreground">The exact answer depends on the product and trade lane, but these points help define a practical first conversation.</p></div>
          <div className="divide-y divide-border/60 rounded-2xl border border-border/60 bg-background px-5 sm:px-6">
            {faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold"><span>{faq.question}</span><span className="text-xl font-normal text-blue-700 transition-transform group-open:rotate-45" aria-hidden="true">+</span></summary><p className="mt-3 pr-8 text-sm leading-7 text-muted-foreground">{faq.answer}</p></details>)}
          </div>
        </div>
      </section>

      {relatedServices.length > 0 && <section className="bg-background py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><Badge variant="outline">Related {service.origin} services</Badge><h2 className="mt-3 text-3xl font-semibold tracking-tight">Continue building your sourcing plan</h2></div><Button variant="outline" asChild><Link href={routePath.services}>View all services<ArrowRight aria-hidden="true" /></Link></Button></div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedServices.map((item) => <Link key={item.slug} href={routePath.marketService(market.slug, item.slug)} className="group flex items-center justify-between rounded-xl border border-border/60 bg-blue-50/40 p-4 transition-colors hover:border-blue-300 hover:bg-blue-50 dark:bg-blue-950/10 dark:hover:border-blue-800"><span className="font-medium">{serviceDisplayName(item.name)}</span><ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>)}
          </div>
        </div>
      </section>}

      <section className="pb-10 sm:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden border-border/50 bg-blue-100/70 shadow-none dark:bg-blue-950/30"><CardContent className="flex flex-col gap-5 px-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between"><div><Badge variant="secondary"><Sparkles aria-hidden="true" />Start with your requirement</Badge><h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Find providers offering {displayServiceName} in {service.origin}</h2><p className="mt-2 max-w-2xl text-muted-foreground">Tell independent partners what you need to source, your order size, target budget, and delivery destination in {displayMarket.locationName}.</p></div><Button size="lg" asChild><Link href={routePath.buyers}>Post a requirement</Link></Button></CardContent></Card>
        </div>
      </section>

      <SiteFooter marketName={displayMarket.locationName} marketSlug={market.slug} />
    </main>
  );
}
