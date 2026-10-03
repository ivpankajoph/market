"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark =
      document.documentElement.classList.contains("dark") ||
      (localStorage.getItem("theme") === "dark") ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`size-9 rounded-md border border-border/50 bg-white/60 text-foreground transition-all hover:bg-white/80 dark:bg-black/20 dark:hover:bg-black/40 ${className ?? ""}`}
      title={mounted ? (theme === "dark" ? "Switch to light theme" : "Switch to dark theme") : "Toggle theme"}
      aria-label="Toggle theme"
    >
      {mounted ? (
        theme === "dark" ? (
          <Sun className="size-4 text-amber-400 transition-transform duration-200" />
        ) : (
          <Moon className="size-4 text-slate-700 dark:text-slate-200 transition-transform duration-200" />
        )
      ) : (
        <span className="size-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
