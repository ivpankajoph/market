import Link from "next/link";
import { Globe2, Mail, MapPinned, PackageCheck } from "lucide-react";

import { chinaServiceNames, indiaServiceNames, serviceSlug } from "@/lib/services";
import { routePath } from "@/url";

function ServiceList({
  services,
  marketSlug,
}: {
  services: readonly string[];
  marketSlug: string;
}) {
  return (
    <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
      {services.map((service) => (
        <li key={service}>
          <Link
            href={routePath.marketService(marketSlug, serviceSlug(service))}
            className="group inline-flex items-start gap-2 text-sm leading-5 text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <span className="mt-2 size-1 shrink-0 rounded-full bg-cyan-300/70 transition-transform group-hover:scale-150" aria-hidden="true" />
            {service}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SiteFooter({
  marketName = "the United States",
  marketSlug = "us",
}: {
  marketName?: string;
  marketSlug?: string;
}) {
  return (
    <footer
      id="services"
      className="relative scroll-mt-16 overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(circle at 12% 18%, rgba(37, 99, 235, 0.26), transparent 32%), radial-gradient(circle at 88% 78%, rgba(6, 182, 212, 0.18), transparent 30%), linear-gradient(135deg, #06142d 0%, #0b2040 48%, #07182f 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
        <div className="absolute -left-20 top-10 size-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -right-20 bottom-0 size-80 rounded-full bg-cyan-400/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 border-b border-white/10 pb-9 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <Link href={routePath.home} className="inline-flex items-center gap-3 text-xl font-semibold tracking-tight">
              <span className="flex size-10 items-center justify-center rounded-xl border border-white/15 bg-white/10">
                <Globe2 className="size-5" aria-hidden="true" />
              </span>
              SellersLogin Market
            </Link>
            <p className="mt-4 max-w-md text-base leading-7 text-slate-300">
              Practical sourcing, verification, procurement, and logistics coordination for buyers in {marketName} working with China and India.
            </p>
            <p className="mt-3 text-xs leading-5 text-slate-400">
              ChinaIndiaSourcing on SellersLogin Market is operated by <span className="text-slate-200 font-medium">Life Changing Networks Pvt. Ltd.</span>, an authorised partner of <a href="https://www.sellerslogin.com" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">SellersLogin.com</a>.
            </p>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-3"><MapPinned className="size-4 text-cyan-300" aria-hidden="true" /><span>Serving buyers across {marketName}</span></div>
              <a href="mailto:info@onlinepromotionhouse.com" className="flex items-center gap-3 hover:text-white"><Mail className="size-4 text-cyan-300" aria-hidden="true" /><span>info@onlinepromotionhouse.com</span></a>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <section aria-labelledby="china-services-heading">
              <div className="flex items-center gap-3">
                <img src="/flags/china.png" alt="" width={30} height={20} className="h-5 w-7 rounded-[2px] object-cover" />
                <h2 id="china-services-heading" className="font-semibold">China sourcing services</h2>
              </div>
              <ServiceList services={chinaServiceNames} marketSlug={marketSlug} />
            </section>

            <section aria-labelledby="india-services-heading">
              <div className="flex items-center gap-3">
                <img src="/flags/india.png" alt="" width={30} height={20} className="h-5 w-7 rounded-[2px] object-cover" />
                <h2 id="india-services-heading" className="font-semibold">India sourcing services</h2>
              </div>
              <ServiceList services={indiaServiceNames} marketSlug={marketSlug} />
            </section>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <PackageCheck className="size-4" aria-hidden="true" />
            <span>Buy, verify, and ship with one coordinated network.</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
            <Link href={routePath.terms} className="text-slate-300 hover:text-white transition-colors underline-offset-4 hover:underline">
              Terms &amp; Conditions
            </Link>
            <a href="https://www.sellerslogin.com/privacy" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors underline-offset-4 hover:underline">
              Privacy Policy
            </a>
            <Link href="/terms#safety" className="text-amber-300/90 hover:text-amber-200 transition-colors underline-offset-4 hover:underline">
              Safety Notices
            </Link>
            <span>© {new Date().getFullYear()} SellersLogin Market</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

