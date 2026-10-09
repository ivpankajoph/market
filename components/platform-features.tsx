import { ArrowDown } from "lucide-react";

type PlatformFeaturesProps = {
  serviceName: string;
  marketName: string;
};

function StepMarker({ number, last = false }: { number: string; last?: boolean }) {
  return (
    <div className="flex h-full flex-col items-center" aria-hidden="true">
      <span className="relative grid size-12 shrink-0 place-items-center rounded-2xl border border-emerald-300 bg-gradient-to-br from-emerald-100 via-white to-teal-100 text-base font-black text-emerald-700 shadow-lg shadow-emerald-900/10 ring-4 ring-emerald-100/70 dark:border-emerald-700 dark:from-emerald-950 dark:via-emerald-900 dark:to-teal-950 dark:text-emerald-300 dark:ring-emerald-950/70">
        {number}
        <span className="absolute -right-1 -top-1 size-3 rounded-full border-2 border-indigo-50 bg-emerald-500 dark:border-indigo-950" />
      </span>
      {!last ? (
        <span className="flex min-h-16 flex-1 flex-col items-center py-2">
          <span className="w-px flex-1 bg-gradient-to-b from-emerald-400 to-emerald-200 dark:to-emerald-900" />
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-emerald-600 text-white shadow-md shadow-emerald-900/20 ring-4 ring-emerald-100 dark:ring-emerald-950">
            <ArrowDown className="size-4" />
          </span>
          <span className="w-px flex-1 bg-gradient-to-b from-emerald-200 to-emerald-100 dark:from-emerald-900 dark:to-emerald-950" />
        </span>
      ) : null}
    </div>
  );
}

export function PlatformFeatures({ serviceName, marketName }: PlatformFeaturesProps) {
  return (
    <section className="border-b border-indigo-100 bg-indigo-50/45 py-12 dark:border-indigo-950 dark:bg-indigo-950/10 sm:py-16" aria-labelledby="platform-features-title">
      <article className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">ChinaIndiaSourcing</p>
          <h2 id="platform-features-title" className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            What our platform do
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            A simpler way for buyers and independent sourcing partners to find each other and work from one clear requirement.
          </p>
        </div>

        <ol className="border-t border-indigo-200 pt-6 text-base leading-8 text-foreground/80 dark:border-indigo-900 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <li className="grid grid-cols-[3rem_1fr] gap-4 pb-5">
            <StepMarker number="01" />
            <p>
              ChinaIndiaSourcing is a connection platform for buyers and independent sourcing businesses. A buyer looking for a {serviceName} can share one clear requirement instead of contacting many companies separately. The request can include shipment details, pickup location, delivery destination in {marketName}, budget, expected timeline, and any special handling needs.
            </p>
          </li>
          <li className="grid grid-cols-[3rem_1fr] gap-4 pb-5">
            <StepMarker number="02" />
            <p>
              When a requirement reaches us, our team reviews the information and checks which registered providers are relevant. We help introduce the buyer to suitable sellers, sourcing agents, freight specialists, or service companies. We do not manufacture products or transport goods ourselves; the selected provider remains responsible for the quotation and agreed work.
            </p>
          </li>
          <li className="grid grid-cols-[3rem_1fr] gap-4 pb-5">
            <StepMarker number="03" />
            <p>
              Buyers can review provider profiles, visit company websites, compare services, and send enquiries from the same place. This makes the first conversation clearer because both sides understand what is required before discussing price, documents, delivery terms, or the next action. Buyers remain free to compare options and choose the provider that fits their needs.
            </p>
          </li>
          <li className="grid grid-cols-[3rem_1fr] gap-4">
            <StepMarker number="04" last />
            <p>
              After registration, the dashboard keeps sourcing activity organised. Buyers can follow enquiries, replies, provider details, and requirement progress without managing separate spreadsheets or searching through long message histories. Providers can also view relevant opportunities and respond from their own account. Our role is to make discovery, connection, and follow-up simpler.
            </p>
          </li>
        </ol>
      </article>
    </section>
  );
}
