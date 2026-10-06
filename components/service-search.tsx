"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { unitedStatesMarket } from "@/lib/markets";
import { serviceDisplayName, servicesByCountry, serviceSlug } from "@/lib/services";
import { routePath } from "@/url";

const searchableServices = servicesByCountry.flatMap((country) =>
  country.serviceNames.map((name) => ({
    name: serviceDisplayName(name),
    country: country.name,
    flagCode: country.flagCode,
    href: routePath.marketService(unitedStatesMarket.slug, serviceSlug(name)),
  })),
);

export function ServiceSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!normalizedQuery) return [];

    return searchableServices
      .filter(({ name, country }) =>
        `${name} ${country}`.toLowerCase().includes(normalizedQuery),
      )
      .slice(0, 7);
  }, [normalizedQuery]);

  return (
    <form
      className="relative w-full"
      onSubmit={(event) => {
        event.preventDefault();
        if (matches[0]) {
          router.push(matches[0].href);
          setQuery("");
        }
      }}
    >
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search sourcing services..."
        aria-label="Search sourcing services"
        className="h-10 w-full rounded-full border border-border/70 bg-background/90 pl-9 pr-9 text-sm shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/15"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      )}

      {normalizedQuery && (
        <div className="absolute left-0 right-0 top-12 z-[80] overflow-hidden rounded-xl border border-border/70 bg-background shadow-xl">
          {matches.length > 0 ? (
            <ul className="max-h-80 overflow-y-auto p-1.5">
              {matches.map((result) => (
                <li key={`${result.country}-${result.name}`}>
                  <Link
                    href={result.href}
                    onClick={() => setQuery("")}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-blue-50 dark:hover:bg-blue-950/30"
                  >
                    <img
                      src={`https://flagcdn.com/w40/${result.flagCode}.png`}
                      alt=""
                      width={24}
                      height={16}
                      className="h-4 w-6 shrink-0 rounded-[2px] border border-black/10 object-cover"
                    />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">{result.name}</span>
                      <span className="block text-xs text-muted-foreground">{result.country}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-4 text-sm text-muted-foreground">No services found for “{query}”.</p>
          )}
        </div>
      )}
    </form>
  );
}
