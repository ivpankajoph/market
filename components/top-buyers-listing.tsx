"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Box,
  CalendarClock,
  Eye,
  MapPin,
  Send,
  WalletCards,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { routePath } from "@/url";

type BuyerProfile = {
  id: string;
  name: string;
  company: string;
  country: string;
  flag: string;
  request: string;
  description: string;
  quantity: string;
  budget: string;
  timeline: string;
  destination: string;
};

const topBuyers: BuyerProfile[] = [
  { id: "B001", name: "Daniel R.", company: "Northstar Home", country: "United States", flag: "/flags/united-states.svg", request: "Freight forwarding for homeware shipments", description: "Needs consolidated sea freight from two suppliers in Yiwu to a fulfilment warehouse in California.", quantity: "3–4 CBM", budget: "US$4k–7k", timeline: "Within 30 days", destination: "California, USA" },
  { id: "B002", name: "Amelia K.", company: "Bright Retail Co.", country: "United Kingdom", flag: "/flags/uk.svg", request: "Air freight for consumer electronics", description: "Looking for a provider experienced with batteries, export documents, insurance, and final delivery.", quantity: "620 kg", budget: "US$5k–9k", timeline: "Within 14 days", destination: "Manchester, UK" },
  { id: "B003", name: "Arjun M.", company: "Urban Cart India", country: "India", flag: "/flags/india.svg", request: "China-to-India machinery shipment", description: "Requires factory pickup, export handling, customs coordination, and delivery to an industrial unit.", quantity: "1 machine", budget: "US$3k–6k", timeline: "Within 45 days", destination: "Pune, India" },
  { id: "B004", name: "Sophia T.", company: "Kindred Living", country: "Australia", flag: "/flags/australia.svg", request: "Furniture consolidation and sea freight", description: "Wants cartons collected from three Foshan suppliers and combined into one Australia-bound shipment.", quantity: "18 CBM", budget: "US$8k–12k", timeline: "Within 40 days", destination: "Melbourne, Australia" },
  { id: "B005", name: "Michael O.", company: "Cedar Trade", country: "Canada", flag: "/flags/canada.svg", request: "Door-to-door freight for packaging goods", description: "Needs a clear quote covering pickup, ocean freight, brokerage support, and delivery to Toronto.", quantity: "1×20 ft", budget: "US$7k–11k", timeline: "Within 35 days", destination: "Toronto, Canada" },
  { id: "B006", name: "Aisha N.", company: "Nexa Commerce", country: "United Arab Emirates", flag: "/flags/uae.svg", request: "Fast shipping for beauty accessories", description: "Comparing air and express options for a repeat order from suppliers in Guangzhou and Shenzhen.", quantity: "410 kg", budget: "US$2k–5k", timeline: "Within 12 days", destination: "Dubai, UAE" },
  { id: "B007", name: "Noah W.", company: "Field & Form", country: "United States", flag: "/flags/united-states.svg", request: "Sea freight for garden equipment", description: "Needs pickup from Ningbo, cargo insurance, U.S. customs support, and appointment delivery.", quantity: "1×40 ft", budget: "US$10k–16k", timeline: "Within 50 days", destination: "Texas, USA" },
  { id: "B008", name: "Emma J.", company: "Little Arc", country: "New Zealand", flag: "/flags/new-zealand.svg", request: "Freight support for children’s products", description: "Looking for safe consolidation and documented handling for cartons from two verified factories.", quantity: "6 CBM", budget: "US$5k–8k", timeline: "Within 32 days", destination: "Auckland, New Zealand" },
  { id: "B009", name: "Liam B.", company: "Studio Supply", country: "United Kingdom", flag: "/flags/uk.svg", request: "DDP quote for office accessories", description: "Wants an all-inclusive comparison for regular shipments from Shenzhen to a UK business address.", quantity: "2.5 CBM", budget: "US$3k–5k", timeline: "Monthly", destination: "London, UK" },
  { id: "B010", name: "Zara H.", company: "Aster Brands", country: "United States", flag: "/flags/united-states.svg", request: "Mixed supplier cargo consolidation", description: "Needs warehouse receiving, carton checks, consolidation, and sea freight to the East Coast.", quantity: "9 CBM", budget: "US$6k–10k", timeline: "Within 38 days", destination: "New Jersey, USA" },
  { id: "B011", name: "Ethan P.", company: "Peak Mobility", country: "Canada", flag: "/flags/canada.svg", request: "Freight for sports and mobility products", description: "Seeking a forwarder who can handle oversized cartons and provide milestone-based shipment updates.", quantity: "12 CBM", budget: "US$8k–13k", timeline: "Within 42 days", destination: "Vancouver, Canada" },
  { id: "B012", name: "Maya S.", company: "Terra Kitchen", country: "Australia", flag: "/flags/australia.svg", request: "Recurring freight for kitchen products", description: "Plans quarterly orders and wants stable pricing, consolidation, inspection coordination, and delivery.", quantity: "8–10 CBM", budget: "US$7k–12k", timeline: "Quarterly", destination: "Sydney, Australia" },
];

function BuyerCard({ buyer, onView }: { buyer: BuyerProfile; onView: (buyer: BuyerProfile) => void }) {
  const initials = buyer.company.split(/\s+/).map((word) => word[0]).join("").slice(0, 2).toUpperCase();

  return (
    <Card className="group relative h-full overflow-hidden border-emerald-100 bg-gradient-to-b from-emerald-50/65 to-background shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/5 dark:border-emerald-950 dark:from-emerald-950/25">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />
      <CardContent className="flex h-full flex-col p-5 pt-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid size-11 shrink-0 place-items-center rounded-full bg-emerald-600 text-sm font-black text-white shadow-md shadow-emerald-900/15">{initials}</div>
            <div className="min-w-0">
              <h3 className="truncate font-bold">{buyer.company}</h3>
              <p className="truncate text-xs text-muted-foreground">Buyer: {buyer.name}</p>
            </div>
          </div>
          <Badge className="shrink-0 border-emerald-200 bg-white text-emerald-700 hover:bg-white dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
            <span className="size-1.5 rounded-full bg-emerald-500" /> Active
          </Badge>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Image src={buyer.flag} alt={`${buyer.country} flag`} width={20} height={14} className="h-3.5 w-5 rounded-[2px] border border-black/10 object-cover" />
          <span>{buyer.country}</span>
          <span aria-hidden="true">•</span>
          <span className="truncate">Sourcing from China</span>
        </div>

        <div className="mt-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">Buying requirement</p>
          <h4 className="mt-1 line-clamp-2 min-h-12 text-lg font-bold leading-snug">{buyer.request}</h4>
          <p className="mt-2 line-clamp-3 min-h-15 text-sm leading-5 text-muted-foreground">{buyer.description}</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-emerald-100 bg-white/80 p-2.5 dark:border-emerald-950 dark:bg-black/10">
            <p className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-muted-foreground"><Box className="size-3" /> Quantity</p>
            <p className="mt-1 truncate text-xs font-bold">{buyer.quantity}</p>
          </div>
          <div className="rounded-lg border border-emerald-100 bg-white/80 p-2.5 dark:border-emerald-950 dark:bg-black/10">
            <p className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-muted-foreground"><WalletCards className="size-3" /> Budget</p>
            <p className="mt-1 truncate text-xs font-bold">{buyer.budget}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 border-t border-emerald-100 pt-4 text-xs text-muted-foreground dark:border-emerald-950">
          <CalendarClock className="size-3.5 shrink-0" aria-hidden="true" />
          <span>{buyer.timeline}</span>
          <MapPin className="ml-auto size-3.5 shrink-0" aria-hidden="true" />
          <span className="max-w-24 truncate">{buyer.destination}</span>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <Button variant="outline" className="border-emerald-200 bg-white/75 hover:bg-emerald-50 dark:border-emerald-900 dark:bg-black/10" onClick={() => onView(buyer)}>
            <Eye className="size-4" /> Details
          </Button>
          <Button asChild className="bg-emerald-600 text-white hover:bg-emerald-700">
            <Link href={routePath.sellers}><Send className="size-4" /> Respond</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function TopBuyersListing() {
  const [selected, setSelected] = React.useState<BuyerProfile | null>(null);

  return (
    <>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {topBuyers.map((buyer) => <BuyerCard key={buyer.id} buyer={buyer} onView={setSelected} />)}
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        {selected ? (
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-emerald-600 text-white">Active requirement</Badge>
                <Badge variant="outline">#{selected.id}</Badge>
              </div>
              <DialogTitle className="mt-3 pr-8 text-2xl leading-tight">{selected.request}</DialogTitle>
            </DialogHeader>
            <div className="mt-2 space-y-5">
              <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950/25">
                <Image src={selected.flag} alt={`${selected.country} flag`} width={28} height={19} className="h-5 w-7 rounded-sm border border-black/10 object-cover" />
                <div><p className="font-semibold">{selected.company}</p><p className="text-sm text-muted-foreground">{selected.country} buyer sourcing from China</p></div>
              </div>
              <p className="leading-7 text-foreground/80">{selected.description}</p>
              <dl className="grid gap-3 sm:grid-cols-2">
                {[['Quantity', selected.quantity], ['Budget', selected.budget], ['Timeline', selected.timeline], ['Destination', selected.destination]].map(([label, value]) => (
                  <div key={label} className="rounded-xl border p-4"><dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</dt><dd className="mt-1 font-semibold">{value}</dd></div>
                ))}
              </dl>
              <Button asChild className="w-full bg-emerald-600 text-white hover:bg-emerald-700">
                <Link href={routePath.sellers}>Respond as a sourcing partner <ArrowUpRight className="size-4" /></Link>
              </Button>
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </>
  );
}
