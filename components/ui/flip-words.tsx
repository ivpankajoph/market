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
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (words.length < 2) return;

    let revealTimeout: number | undefined;
    const interval = window.setInterval(() => {
      setIsVisible(false);
      revealTimeout = window.setTimeout(() => {
        setCurrentIndex((index) => (index + 1) % words.length);
        setIsVisible(true);
      }, 220);
    }, duration);

    return () => {
      window.clearInterval(interval);
      if (revealTimeout) window.clearTimeout(revealTimeout);
    };
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
        initial={false}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -10,
          filter: isVisible ? "blur(0px)" : "blur(6px)",
        }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="inline-block whitespace-nowrap"
      >
        {currentWord}
      </motion.span>
    </span>
  );
}
