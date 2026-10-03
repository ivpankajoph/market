import type { Metadata } from "next";

import { buyerMarkets, type BuyerMarket } from "@/lib/markets";
import { siteOrigin } from "@/url";

const marketHreflang: Record<string, string> = {
  china: "zh-CN",
  india: "en-IN",
  australia: "en-AU",
  germany: "de-DE",
  us: "en-US",
  uk: "en-GB",
  uae: "en-AE",
  "new-zealand": "en-NZ",
  canada: "en-CA",
  "south-africa": "en-ZA",
};

function absoluteUrl(path: string) {
  return new URL(path, siteOrigin).href;
}

export function countryAlternates(
  canonicalPath: string,
  localizedPath: (market: BuyerMarket) => string,
): NonNullable<Metadata["alternates"]> {
  const languages = Object.fromEntries(
    buyerMarkets.map((market) => [
      marketHreflang[market.slug],
      absoluteUrl(localizedPath(market)),
    ]),
  );

  return {
    canonical: absoluteUrl(canonicalPath),
    languages: {
      ...languages,
      "x-default": absoluteUrl(localizedPath(buyerMarkets[0])),
    },
  };
}
