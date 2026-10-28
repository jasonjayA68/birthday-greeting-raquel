"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/celebrate";
import { useCelebration } from "./CelebrationContext";

/*
 * Decorative background layers. Positions are random, so they're created
 * in the browser only (never during server rendering) to avoid hydration mismatches.
 */

function Sparkles() {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = layer.current;
    if (!el) return;
    const count = window.innerWidth < 768 ? 22 : 40;
    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");
      s.className = "sparkle";
      const size = 4 + Math.random() * 8;
      s.style.width = s.style.height = size + "px";
      s.style.left = Math.random() * 100 + "%";
      s.style.top = Math.random() * 100 + "%";
      s.style.animationDelay = Math.random() * 3 + "s";
      s.style.animationDuration = 2 + Math.random() * 3 + "s";
      el.appendChild(s);
    }
    return () => el.replaceChildren();
  }, []);

  return <div className="sparkles" ref={layer} aria-hidden="true" />;
}

const BALLOON_COLORS = ["#f4c0c8", "#e79aa6", "#ecd08a", "#d9a7b0", "#f7d9c4"];

function Balloons() {
  const layer = useRef<HTMLDivElement>(null);
  const { phase } = useCelebration();
  const started = phase !== "closed";

  useEffect(() => {
    const el = layer.current;
    if (!started || !el || prefersReducedMotion()) return;
    const timers: number[] = [];

    function spawn() {
      const b = document.createElement("span");
      b.className = "balloon";
      b.style.left = Math.random() * 92 + "%";
      b.style.background = BALLOON_COLORS[(Math.random() * BALLOON_COLORS.length) | 0];
      const duration = 12 + Math.random() * 10;
      b.style.animationDuration = duration + "s";
      el!.appendChild(b);
      timers.push(window.setTimeout(() => b.remove(), duration * 1000));
    }

    // A small flurry right away, then a gentle trickle
    for (let i = 0; i < 6; i++) timers.push(window.setTimeout(spawn, 450 + i * 350));
    const interval = window.setInterval(spawn, window.innerWidth < 768 ? 3200 : 2200);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
      el.replaceChildren();
    };
  }, [started]);

  return <div className="balloons" ref={layer} aria-hidden="true" />;
}

export default function Background() {
  return (
    <>
      <Sparkles />
      <Balloons />
    </>
  );
}
