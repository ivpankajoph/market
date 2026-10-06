export const sourceCountries = [
  { slug: "china", name: "China", adjective: "Chinese", flagCode: "cn", extras: ["Alibaba Sourcing Services", "1688 Sourcing Services"] },
  { slug: "india", name: "India", adjective: "Indian", flagCode: "in", extras: ["Indiamart Sourcing Agent"] },
  { slug: "vietnam", name: "Vietnam", adjective: "Vietnamese", flagCode: "vn", extras: [] },
  { slug: "taiwan", name: "Taiwan", adjective: "Taiwanese", flagCode: "tw", extras: [] },
  { slug: "south-korea", name: "South Korea", adjective: "South Korean", flagCode: "kr", extras: [] },
  { slug: "mexico", name: "Mexico", adjective: "Mexican", flagCode: "mx", extras: [] },
  { slug: "netherlands", name: "Netherlands", adjective: "Dutch", flagCode: "nl", extras: [] },
  { slug: "uae", name: "UAE", adjective: "UAE", flagCode: "ae", extras: [] },
  { slug: "south-africa", name: "South Africa", adjective: "South African", flagCode: "za", extras: [] },
  { slug: "turkey", name: "Turkey", adjective: "Turkish", flagCode: "tr", extras: [] },
  { slug: "bangladesh", name: "Bangladesh", adjective: "Bangladeshi", flagCode: "bd", extras: [] },
  { slug: "malaysia", name: "Malaysia", adjective: "Malaysian", flagCode: "my", extras: [] },
  { slug: "indonesia", name: "Indonesia", adjective: "Indonesian", flagCode: "id", extras: [] },
  { slug: "spain", name: "Spain", adjective: "Spanish", flagCode: "es", extras: [] },
  { slug: "thailand", name: "Thailand", adjective: "Thai", flagCode: "th", extras: [] },
  { slug: "poland", name: "Poland", adjective: "Polish", flagCode: "pl", extras: [] },
  { slug: "brazil", name: "Brazil", adjective: "Brazilian", flagCode: "br", extras: [] },
  { slug: "philippines", name: "Philippines", adjective: "Filipino", flagCode: "ph", extras: [] },
] as const;

export type SourceCountry = (typeof sourceCountries)[number];
export type ServiceOrigin = SourceCountry["name"];

export type SourcingService = {
  name: string;
  slug: string;
  origin: ServiceOrigin;
  description: string;
  overview: string;
  includes: string[];
  process: { title: string; description: string }[];
};

function createServiceNames(country: SourceCountry) {
  const { name, adjective, extras } = country;

  return [
    `${adjective} Freight Forwarder`,
    `${adjective} Logistics Companies`,
    `${name} Buying Agent`,
    `${name} Import Export Agent`,
    `${name} Sourcing Agent`,
    `${name} DDP Services`,
    `Trending ${adjective} Product Research`,
    `${adjective} Product Inspection`,
    `${name} Factory Visit`,
    `${name} Door To Door Service`,
    `${adjective} Factory Research`,
    `${name} Procurement Agent`,
    `${name} Import Services`,
    `Made in ${name} Sourcing`,
    `Global Sourcing ${name}`,
    `Swift ${name} Sourcing`,
    `${name} Custom Clearance Services`,
    ...extras,
  ];
}

export const servicesByCountry = sourceCountries.map((country) => ({
  ...country,
  serviceNames: createServiceNames(country),
}));

export const chinaServiceNames = servicesByCountry.find(({ slug }) => slug === "china")!.serviceNames;
export const indiaServiceNames = servicesByCountry.find(({ slug }) => slug === "india")!.serviceNames;

export function serviceSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function serviceDisplayName(name: string) {
  return name.endsWith(" Custom Clearance Services")
    ? "Custom Clearance Services"
    : name;
}

export function isCustomClearanceService(name: string) {
  return name.endsWith(" Custom Clearance Services");
}

export function customClearancePageTitle(origin: ServiceOrigin, destination: string) {
  return `Custom Clearance Services from ${origin} to ${destination} | Custom Clearance Agent in ${destination}`;
}

function serviceFocus(name: string, origin: ServiceOrigin) {
  const lower = name.toLowerCase();

  if (lower.includes("custom clearance")) {
    return {
      action: `coordinate customs-clearance preparation for goods moving from ${origin} to the United States`,
      includes: [
        "Importer, consignee, and shipment detail review",
        "Product description and HS-classification inputs",
        "Commercial invoice and packing-list checks",
        "Duty, tax, and landed-cost input coordination",
        "Customs broker document and query handoffs",
        "Cargo release and final-delivery coordination",
      ],
    };
  }

  if (lower.includes("freight") || lower.includes("logistics")) {
    return {
      action: `plan and coordinate freight from ${origin} to the United States`,
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
      action: `coordinate an end-to-end delivery route from ${origin} to a US destination`,
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
      action: `verify suppliers, facilities, and product readiness in ${origin}`,
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
      action: `research promising products and supplier options across ${origin}`,
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
      action: `organize the commercial and shipping steps for imports from ${origin}`,
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
    action: `find, compare, and coordinate suitable suppliers in ${origin}`,
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
  const displayName = serviceDisplayName(name);

  return {
    name,
    slug: serviceSlug(name),
    origin,
    description: `${displayName} support for US buyers who need a clearer, more coordinated way to source internationally.`,
    overview: `Our ${displayName.toLowerCase()} workflow helps US businesses ${focus.action}. The service is shaped around your product, target cost, order size, documentation needs, and delivery destination.`,
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

export const services = servicesByCountry.flatMap((country) =>
  country.serviceNames.map((name) => buildService(name, country.name)),
);

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getSourceCountry(origin: ServiceOrigin) {
  return sourceCountries.find((country) => country.name === origin)!;
}
