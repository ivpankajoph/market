"use client";

import { useEffect, useState, type ComponentType } from "react";
import type { WorldProps } from "@/components/ui/globe";

export type { GlobePosition } from "@/components/ui/globe";

export function World(props: WorldProps) {
  const [GlobeComponent, setGlobeComponent] =
    useState<ComponentType<WorldProps> | null>(null);

  useEffect(() => {
    let active = true;
    import("@/components/ui/globe")
      .then((module) => {
        if (active) {
          setGlobeComponent(() => module.World);
        }
      })
      .catch(console.error);

    return () => {
      active = false;
    };
  }, []);

  if (!GlobeComponent) {
    return (
      <div
        className={props.className}
        aria-label="Interactive rotating globe showing worldwide trade"
      />
    );
  }

  return <GlobeComponent {...props} />;
}
