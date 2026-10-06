"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import type { WorldProps } from "@/components/ui/globe";
import { cn } from "@/lib/utils";

export type { GlobePosition } from "@/components/ui/globe";

const GlobeComponent = dynamic(
  () => import("@/components/ui/globe").then((module) => module.World),
  { ssr: false },
);

export function World(props: WorldProps) {
  const [isReady, setIsReady] = useState(false);
  const handleReady = useCallback(() => setIsReady(true), []);

  return (
    <div
      className={cn("relative", props.className)}
      role="img"
      aria-label="Interactive rotating globe showing worldwide trade"
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-200",
          isReady ? "opacity-0" : "opacity-100",
        )}
        aria-hidden="true"
      >
        <Image
          src="/images/globe-placeholder.png"
          alt=""
          width={1280}
          height={1280}
          priority
          className="h-full w-full object-contain"
        />
      </div>

      <GlobeComponent
        {...props}
        className="absolute inset-0 h-full w-full"
        onReady={handleReady}
      />
    </div>
  );
}
