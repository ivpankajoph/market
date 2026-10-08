import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List Sourcing Services for U.S. Buyers | ChinaIndiaSourcing",
  description:
    "Register as an independent sourcing agent, supplier, inspector, freight specialist, or trade-service provider and connect with U.S. and global buyers.",
};

export default function SellersLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
