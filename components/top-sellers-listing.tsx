"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type TopSeller = {
  name: string;
  location: string;
  website: string;
  image: string;
};

const chinaTopSellers: TopSeller[] = [
  {
    name: "JingSourcing",
    location: "Yiwu, China",
    website: "https://jingsourcing.com",
    image: "https://ddpchain.com/wp-content/uploads/2025/12/China-Sourcing-Agents-JingSourcing-300x167.webp",
  },
  {
    name: "Guangzhou Sourcing",
    location: "Guangzhou, China",
    website: "https://guangzhousourcing.com",
    image: "https://ddpchain.com/wp-content/uploads/2025/12/China-Sourcing-Agents-Guangzhou-Sourcing-300x167.webp",
  },
  {
    name: "MatchSourcing",
    location: "Guangzhou, China",
    website: "https://matchsourcing.com",
    image: "https://ddpchain.com/wp-content/uploads/2025/12/China-Sourcing-Agents-MatchSourcing-300x167.webp",
  },
  {
    name: "IMEX Sourcing",
    location: "Guangzhou & Hong Kong",
    website: "https://imexsourcingservices.com",
    image: "https://ddpchain.com/wp-content/uploads/2025/12/China-Sourcing-Agents-IMEX-Sourcing-300x167.webp",
  },
  {
    name: "Asiaction",
    location: "China & France",
    website: "https://asiaction.com",
    image: "https://ddpchain.com/wp-content/uploads/2025/12/China-Sourcing-Agents-Asiaction-300x167.webp",
  },
  {
    name: "Dragon Sourcing",
    location: "China and global offices",
    website: "https://dragonsourcing.com",
    image: "https://ddpchain.com/wp-content/uploads/2025/12/China-Sourcing-Agents-Dragon-300x167.webp",
  },
  {
    name: "Keen Sourcing",
    location: "Shanghai, China",
    website: "https://www.keensourcing.com",
    image: "https://ddpchain.com/wp-content/uploads/2025/12/China-Sourcing-Agents-Keen-300x167.webp",
  },
  {
    name: "China Purchasing Agent",
    location: "Shenzhen, China",
    website: "https://chinapurchasingagent.com",
    image: "https://ddpchain.com/wp-content/uploads/2025/12/China-Sourcing-Agents-China-Purchasing-Agent-300x167.webp",
  },
  {
    name: "OwlSourcing",
    location: "Shanghai, China",
    website: "https://owlsourcing.com",
    image: "https://ddpchain.com/wp-content/uploads/2025/12/China-Sourcing-Agents-OwlSourcing-300x167.webp",
  },
  {
    name: "JustChinait",
    location: "Shenzhen, China",
    website: "https://justchinait.com",
    image: "https://ddpchain.com/wp-content/uploads/2025/12/China-Sourcing-Agents-JustChinait-300x167.webp",
  },
];

type TopSellersListingProps = {
  countryName: string;
};

export function TopSellersListing({ countryName }: TopSellersListingProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  function moveSlider(direction: -1 | 1) {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollBy({
      left: direction * Math.min(560, slider.clientWidth * 0.85),
      behavior: "smooth",
    });
  }

  return (
    <section className="overflow-hidden border-y border-blue-100 bg-[#f8fbff] py-8 text-foreground dark:border-blue-950 dark:bg-[#071222] sm:py-10" aria-labelledby="top-sellers-title">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 sm:flex-row sm:items-end sm:justify-between sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-blue-700 dark:text-blue-300">
            <img src="/flags/china.svg" alt="China flag" width={24} height={16} className="h-4 w-6 rounded-[2px] object-cover" />
            <span>Independent sourcing companies</span>
          </div>
          <h2 id="top-sellers-title" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Top Sellers in {countryName}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://ddpchain.com/top-china-sourcing-agents/"
            target="_blank"
            rel="noreferrer"
            className="hidden text-xs text-muted-foreground underline decoration-blue-300 underline-offset-4 transition-colors hover:text-foreground dark:decoration-blue-800 sm:inline"
          >
            Source: DDPChain 2026 list
          </a>
          <div className="flex gap-2" aria-label="Seller slider controls">
            <button
              type="button"
              onClick={() => moveSlider(-1)}
              className="flex size-11 items-center justify-center rounded-full border border-blue-200 bg-white text-foreground transition-colors hover:border-blue-400 hover:bg-blue-50 dark:border-blue-900 dark:bg-slate-950 dark:hover:bg-blue-950"
              aria-label="Show previous sellers"
            >
              <ArrowLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => moveSlider(1)}
              className="flex size-11 items-center justify-center rounded-full border border-blue-200 bg-white text-foreground transition-colors hover:border-blue-400 hover:bg-blue-50 dark:border-blue-900 dark:bg-slate-950 dark:hover:bg-blue-950"
              aria-label="Show next sellers"
            >
              <ArrowRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="top-sellers-viewport mt-6 overflow-x-auto scroll-smooth px-4 sm:px-6 lg:px-8"
      >
        <div className="flex w-max gap-5 pb-1">
          {chinaTopSellers.map((seller) => (
            <a
              key={seller.name}
              href={seller.website}
              target="_blank"
              rel="noreferrer"
              className="group flex aspect-square w-[280px] shrink-0 snap-start flex-col overflow-hidden bg-transparent shadow-none sm:w-[320px]"
            >
              <img
                src={seller.image}
                alt={`${seller.name} company`}
                width={320}
                height={208}
                loading="lazy"
                className="h-[65%] w-full shrink-0 rounded-2xl border border-blue-100 object-cover transition-transform duration-300 group-hover:scale-[1.02] dark:border-blue-950"
              />
              <span className="min-w-0 px-1 py-4">
                <span className="block text-xl font-semibold leading-7 text-foreground">{seller.name}</span>
                <span className="mt-2 block text-base text-muted-foreground">{seller.location}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
