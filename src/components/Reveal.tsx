"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useCelebration } from "./CelebrationContext";

/**
 * Returns a ref + a flag that flips to true the first time the element
 * scrolls into view. Observing only starts once the gift has been opened.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  const { phase } = useCelebration();

  useEffect(() => {
    const el = ref.current;
    if (phase !== "open" || !el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [phase]);

  return [ref, visible] as const;
}

/** A <section> that fades/slides in when it enters the viewport. */
export default function Reveal({
  className = "",
  id,
  children,
}: {
  className?: string;
  id?: string;
  children: ReactNode;
}) {
  const [ref, visible] = useReveal<HTMLElement>();
  return (
    <section ref={ref} id={id} className={`reveal ${className}${visible ? " is-visible" : ""}`}>
      {children}
    </section>
  );
}
