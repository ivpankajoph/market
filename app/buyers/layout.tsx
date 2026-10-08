import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post a U.S. Product Sourcing Requirement | ChinaIndiaSourcing",
  description:
    "Tell independent sourcing agents and trade-service providers what your U.S. business wants to source from China, India, or another origin country.",
};

export default function BuyersLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
