"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/celebrate";
import { useReveal } from "./Reveal";

const MESSAGE =
  "Happy 26th Birthday! Keep being the amazing mom that you are to Kairo. We're so proud of you! We love you so much.";

/** Handwritten-style card: the message types itself out, then the signature fades in. */
export default function MessageCard() {
  const [ref, visible] = useReveal<HTMLElement>();
  const [typed, setTyped] = useState(0);
  const [signed, setSigned] = useState(false);
  const done = typed >= MESSAGE.length;

  useEffect(() => {
    if (!visible) return;

    if (done) {
      const t = setTimeout(() => setSigned(true), 400);
      return () => clearTimeout(t);
    }

    // Reduced motion: show the whole message at once
    if (prefersReducedMotion()) {
      const t = setTimeout(() => setTyped(MESSAGE.length), 0);
      return () => clearTimeout(t);
    }

    // Pause a little longer after punctuation for a natural rhythm
    const prev = MESSAGE[typed - 1];
    const delay = prev && /[.!?]/.test(prev) ? 380 : 45 + Math.random() * 40;
    const t = setTimeout(() => setTyped(typed + 1), delay);
    return () => clearTimeout(t);
  }, [visible, typed, done]);

  return (
    <section ref={ref} id="message" className={`message reveal${visible ? " is-visible" : ""}`}>
      <div className="card">
        <p className="card__text">
          {/* Invisible full copy reserves the card's height so it doesn't grow while typing */}
          <span className="card__ghost" aria-hidden="true">
            {MESSAGE}
          </span>
          <span className={visible && !done ? "is-typing" : undefined} aria-hidden="true">
            {MESSAGE.slice(0, typed)}
          </span>
          <span className="sr-only">{MESSAGE}</span>
        </p>
        <p className={`card__signature${signed ? " is-visible" : ""}`}>Love, Ate Mae</p>
      </div>
    </section>
  );
}
