"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export function FlipWords({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (words.length < 2) return;

    const interval = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % words.length);
    }, duration);

    return () => window.clearInterval(interval);
  }, [duration, words.length]);

  const currentWord = words[currentIndex] ?? "";

  return (
    <span
      className={cn(
        "relative z-10 inline-flex text-left text-neutral-900 dark:text-neutral-100",
        className,
      )}
    >
      <motion.span
        key={currentWord}
        initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ type: "spring", stiffness: 110, damping: 14 }}
        className="inline-block whitespace-nowrap"
      >
        {currentWord}
      </motion.span>
    </span>
  );
}
