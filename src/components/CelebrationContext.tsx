"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

/**
 * Where we are in the gift-opening flow:
 * - "closed":  gift box is showing, page is locked
 * - "opening": lid is flying off, confetti + balloons start
 * - "open":    intro is gone, scroll-reveal animations begin
 */
export type Phase = "closed" | "opening" | "open";

type Celebration = {
  phase: Phase;
  setPhase: (phase: Phase) => void;
};

const CelebrationContext = createContext<Celebration>({
  phase: "closed",
  setPhase: () => {},
});

export function CelebrationProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("closed");
  return <CelebrationContext value={{ phase, setPhase }}>{children}</CelebrationContext>;
}

export const useCelebration = () => useContext(CelebrationContext);
