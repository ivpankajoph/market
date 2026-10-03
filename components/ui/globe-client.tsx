"use client";

import dynamic from "next/dynamic";

import type { WorldProps } from "@/components/ui/globe";

export type { GlobePosition } from "@/components/ui/globe";

export const World = dynamic<WorldProps>(
  () => import("@/components/ui/globe").then((module) => module.World),
  { ssr: false },
);
