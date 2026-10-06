"use client";

import { useEffect, useState } from "react";
import { Globe2 } from "lucide-react";
import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { routePath } from "@/url";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        isScrolled
          ? "border-b border-border/40 bg-background/85 shadow-xs backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="relative z-10 mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={routePath.home} className="flex items-center gap-2 font-semibold tracking-tight" aria-label="Chinaindiasourcing home">
          <span className="flex size-8 items-center justify-center rounded-md border border-border/50 bg-white/70 shadow-xs dark:bg-black/20">
            <Globe2 className="size-4" aria-hidden="true" />
          </span>
          <span>Chinaindiasourcing</span>
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <nav className="flex items-center gap-1" aria-label="Main navigation">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex hover:bg-white/50 dark:hover:bg-white/10" asChild>
              <Link href="/#how">How it works</Link>
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:inline-flex hover:bg-white/50 dark:hover:bg-white/10" asChild>
              <Link href={routePath.services}>Services</Link>
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-white/50 dark:hover:bg-white/10" asChild>
              <Link href="/#support">Support</Link>
            </Button>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
