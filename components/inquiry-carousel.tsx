"use client";

import * as React from "react";
import {
  Building2,
  CalendarClock,
  Eye,
  Globe2,
  Mail,
  MapPin,
  PackageSearch,
  Phone,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type Inquiry = {
  id: number;
  timestamp: string;
  name: string;
  email: string;
  mobile: string;
  whatsapp: string;
  address: string;
  product: string;
  quantity: string;
  budget: string;
  importedBefore: string;
  company: string;
  dealingStatus: string;
  website: string;
  importFrom: string;
};

const cardTones = [
  "bg-blue-100/75 dark:bg-blue-950/35",
  "bg-cyan-100/75 dark:bg-cyan-950/35",
  "bg-violet-100/75 dark:bg-violet-950/35",
  "bg-emerald-100/70 dark:bg-emerald-950/30",
  "bg-amber-100/70 dark:bg-amber-950/30",
  "bg-rose-100/70 dark:bg-rose-950/30",
];

function maskName(value: string) {
  const clean = value.trim();
  if (!clean) return "Not provided";
  return `${clean.slice(0, Math.min(3, clean.length))}xxx`;
}

function maskPhone(value: string) {
  const clean = value.trim();
  if (!clean) return "Not provided";
  const visible = clean.startsWith("+") ? 6 : 4;
  return `${clean.slice(0, Math.min(visible, clean.length))}xxxxxx`;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-background/80 p-4">
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1 break-words text-base leading-6">
        {value.trim() || "Not provided"}
      </dd>
    </div>
  );
}

export function InquiryCarousel({ inquiries }: { inquiries: Inquiry[] }) {
  const [selected, setSelected] = React.useState<Inquiry | null>(null);

  return (
    <>
      <Carousel
        opts={{ align: "start", loop: true }}
        className="mt-7"
        aria-label="Buyer requirements"
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Swipe the cards or use the buttons to browse all {inquiries.length} requests.
          </p>
          <div className="flex shrink-0 gap-2">
            <CarouselPrevious className="static size-10 translate-y-0 bg-background/90 shadow-sm" />
            <CarouselNext className="static size-10 translate-y-0 bg-background/90 shadow-sm" />
          </div>
        </div>

        <CarouselContent className="-ml-3 md:-ml-4">
          {inquiries.map((inquiry, index) => (
            <CarouselItem
              key={inquiry.id}
              className="basis-[88%] pl-3 sm:basis-1/2 md:pl-4 lg:basis-1/3 xl:basis-1/4"
            >
              <Card
                className={`h-full min-h-72 border-white/60 shadow-none ${cardTones[index % cardTones.length]}`}
              >
                <CardContent className="flex h-full flex-col px-5">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <Badge className="bg-white/75 text-foreground shadow-none hover:bg-white/75 dark:bg-black/20">
                      {inquiry.importFrom || "Buyer request"}
                    </Badge>
                    <span className="text-sm font-medium text-muted-foreground">
                      #{String(inquiry.id).padStart(3, "0")}
                    </span>
                  </div>

                  <dl className="space-y-4">
                    <div className="flex items-start gap-3">
                      <UserRound className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                      <div className="min-w-0">
                        <dt className="text-sm text-muted-foreground">Name</dt>
                        <dd className="mt-0.5 truncate font-medium">{maskName(inquiry.name)}</dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                      <div className="min-w-0">
                        <dt className="text-sm text-muted-foreground">Email</dt>
                        <dd className="mt-0.5 truncate font-medium">
                          {inquiry.email ? `${inquiry.email.slice(0, 3)}xxx` : "Not provided"}
                        </dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                      <div className="min-w-0">
                        <dt className="text-sm text-muted-foreground">Phone</dt>
                        <dd className="mt-0.5 truncate font-medium">{maskPhone(inquiry.mobile)}</dd>
                      </div>
                    </div>
                  </dl>

                  <Button
                    variant="outline"
                    className="mt-auto w-full bg-white/70 hover:bg-white dark:bg-black/15 dark:hover:bg-black/25"
                    onClick={() => setSelected(inquiry)}
                    aria-label={`View complete details for ${inquiry.name}`}
                  >
                    <Eye aria-hidden="true" />
                    View details
                  </Button>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        {selected && (
          <DialogContent className="max-h-[90vh] gap-0 overflow-hidden border-border/60 p-0 sm:max-w-2xl">
            <DialogHeader className="border-b border-border/60 bg-blue-100/70 p-6 pr-14 dark:bg-blue-950/40">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{selected.importFrom || "Buyer request"}</Badge>
                <Badge variant="outline" className="bg-background/60">
                  Request #{String(selected.id).padStart(3, "0")}
                </Badge>
              </div>
              <DialogTitle className="mt-2 text-2xl leading-tight">{selected.name}</DialogTitle>
              <DialogDescription>
                Complete buyer requirement and submitted contact information.
              </DialogDescription>
            </DialogHeader>

            <div className="scrollbar-thin overflow-y-auto p-6">
              <section>
                <h3 className="flex items-center gap-2 font-semibold">
                  <UserRound className="size-4" aria-hidden="true" /> Contact details
                </h3>
                <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                  <Field label="Full name" value={selected.name} />
                  <Field label="Email" value={selected.email || "Not provided in source form"} />
                  <Field label="Mobile number" value={selected.mobile} />
                  <Field label="WhatsApp number" value={selected.whatsapp} />
                </dl>
              </section>

              <section className="mt-6">
                <h3 className="flex items-center gap-2 font-semibold">
                  <PackageSearch className="size-4" aria-hidden="true" /> Requirement
                </h3>
                <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="sm:col-span-2"><Field label="Product and specifications" value={selected.product} /></div>
                  <Field label="Quantity" value={selected.quantity} />
                  <Field label="Import budget" value={selected.budget} />
                  <Field label="Imported from China before" value={selected.importedBefore} />
                  <Field label="Preferred import source" value={selected.importFrom} />
                </dl>
              </section>

              <section className="mt-6">
                <h3 className="flex items-center gap-2 font-semibold">
                  <Building2 className="size-4" aria-hidden="true" /> Business details
                </h3>
                <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                  <Field label="Company" value={selected.company} />
                  <Field label="Company website" value={selected.website} />
                  <div className="sm:col-span-2"><Field label="Current dealing status" value={selected.dealingStatus} /></div>
                </dl>
              </section>

              <section className="mt-6">
                <h3 className="flex items-center gap-2 font-semibold">
                  <Globe2 className="size-4" aria-hidden="true" /> Location and submission
                </h3>
                <dl className="mt-3 grid gap-3">
                  <div className="rounded-xl border border-border/60 bg-background/80 p-4">
                    <dt className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <MapPin className="size-4" aria-hidden="true" /> Full address
                    </dt>
                    <dd className="mt-1 break-words text-base leading-6">{selected.address || "Not provided"}</dd>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-background/80 p-4">
                    <dt className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <CalendarClock className="size-4" aria-hidden="true" /> Submitted
                    </dt>
                    <dd className="mt-1 text-base leading-6">{selected.timestamp || "Not provided"}</dd>
                  </div>
                </dl>
              </section>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
