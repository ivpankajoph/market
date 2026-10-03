import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SellersLogin Market",
  description:
    "A simple global marketplace where buyers and sellers discover trusted business opportunities.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
