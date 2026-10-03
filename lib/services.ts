export type ServiceOrigin = "China" | "India";

export type SourcingService = {
  name: string;
  slug: string;
  origin: ServiceOrigin;
  description: string;
  overview: string;
  includes: string[];
  process: { title: string; description: string }[];
};

export const chinaServiceNames = [
  "Chinese Freight Forwarder",
  "China Buying Agent",
  "China Import Export Agent",
  "China Sourcing Agent",
  "China DDP Services",
  "Trending Chinese Product Research",
  "Chinese Product Inspection",
  "China Factory Visit",
  "China Door To Door Service",
  "Alibaba Sourcing Services",
  "1688 Sourcing Services",
  "Chinese Factory Research",
  "China Procurement Agent",
  "China Import Services",
  "Made in China Sourcing",
  "Global Sourcing China",
  "Swift China Sourcing",
] as const;

export const indiaServiceNames = [
  "Indian Freight Forwarder",
  "Indian Logistics Companies",
  "India Buying Agent",
  "India Import Export Agent",
  "India Sourcing Agent",
  "Indian DDP Services",
  "Trending India Product Research",
  "India Product Inspection",
  "India Factory Visit",
  "Indian Factory Research",
  "India Procurement Agent",
  "India Import Services",
  "Made in China Sourcing",
  "Global Sourcing China",
  "Swift China Sourcing",
  "Indiamart Sourcing Agent",
] as const;

export function serviceSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function serviceFocus(name: string, origin: ServiceOrigin) {
  const lower = name.toLowerCase();
  const country = origin;

  if (lower.includes("freight") || lower.includes("logistics")) {
    return {
      action: `plan and coordinate freight from ${country} to the United States`,
      includes: [
        "Air and ocean freight option comparison",
        "Origin pickup and cargo consolidation",
        "Packing and shipment document checks",
        "Carrier and route coordination",
        "Milestone and transit updates",
        "US delivery handoff support",
      ],
    };
  }

  if (lower.includes("ddp") || lower.includes("door to door")) {
    return {
      action: `coordinate an end-to-end delivery route from ${country} to a US destination`,
      includes: [
        "Supplier or factory pickup",
        "Export handling at origin",
        "Air or ocean line-haul planning",
        "Import clearance coordination",
        "Duty and landed-cost visibility",
        "Final-mile delivery tracking",
      ],
    };
  }

  if (lower.includes("inspection") || lower.includes("factory visit") || lower.includes("factory research")) {
    return {
      action: `verify suppliers, facilities, and product readiness in ${country}`,
      includes: [
        "Supplier identity and capability review",
        "Factory profile and production checks",
        "Sample or specification verification",
        "On-site observations when arranged",
        "Photo-based findings and issue notes",
        "Decision-ready verification summary",
      ],
    };
  }

  if (lower.includes("trending") || lower.includes("product research")) {
    return {
      action: `research promising products and supplier options across ${country}`,
      includes: [
        "Product and demand-signal research",
        "Competitor and price-point review",
        "Supplier landscape mapping",
        "MOQ and indicative cost collection",
        "Risk and differentiation notes",
        "Shortlist prepared for sourcing",
      ],
    };
  }

  if (lower.includes("import export") || lower.includes("import services")) {
    return {
      action: `organize the commercial and shipping steps for imports from ${country}`,
      includes: [
        "Supplier and product information review",
        "Commercial-document coordination",
        "Shipping method comparison",
        "Customs-broker handoff preparation",
        "Cost and timeline checkpoints",
        "Shipment progress coordination",
      ],
    };
  }

  return {
    action: `find, compare, and coordinate suitable suppliers in ${country}`,
    includes: [
      "Requirement and specification review",
      "Supplier discovery and shortlisting",
      "MOQ, price, and lead-time comparison",
      "Sample and quotation coordination",
      "Order and production follow-up",
      "Inspection and shipping handoff",
    ],
  };
}

function buildService(name: string, origin: ServiceOrigin): SourcingService {
  const focus = serviceFocus(name, origin);

  return {
    name,
    slug: serviceSlug(name),
    origin,
    description: `${name} support for US buyers who need a clearer, more coordinated way to source internationally.`,
    overview: `Our ${name.toLowerCase()} workflow helps US businesses ${focus.action}. The service is shaped around your product, target cost, order size, quality expectations, and delivery destination.`,
    includes: focus.includes,
    process: [
      {
        title: "Share the requirement",
        description: "Tell us the product, specifications, quantity, target budget, and US delivery location.",
      },
      {
        title: "Review the route",
        description: `We assess suitable ${origin} partners, commercial considerations, and the practical sourcing path.`,
      },
      {
        title: "Compare the options",
        description: "Receive a focused shortlist, indicative terms, and the key questions to resolve before proceeding.",
      },
      {
        title: "Coordinate execution",
        description: "Move forward with supplier communication, checkpoints, and shipment handoffs in one clear workflow.",
      },
    ],
  };
}

const chinaServices = chinaServiceNames.map((name) => buildService(name, "China"));
const indiaServices = indiaServiceNames.map((name) => buildService(name, "India"));

export const services = Array.from(
  new Map([...chinaServices, ...indiaServices].map((service) => [service.slug, service])).values(),
);

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

