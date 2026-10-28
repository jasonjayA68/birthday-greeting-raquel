"use client";

import { useState } from "react";
import { burstConfetti } from "@/lib/celebrate";
import Reveal from "./Reveal";

const CANDLES = 6;

/** CSS-drawn cake with flickering candles that can be blown out. */
export default function BirthdayCake() {
  const [blown, setBlown] = useState(false);
  const [wished, setWished] = useState(false);

  function blowCandles() {
    setBlown(true);
    setTimeout(() => {
      burstConfetti(220, 0.5, 0.55);
      setWished(true);
    }, 450);
  }

  return (
    <Reveal className="cake-section">
      <h2 className="section-title">Make a Wish</h2>
      <div className={`cake${blown ? " is-out" : ""}`}>
        <div className="candles">
          {Array.from({ length: CANDLES }, (_, i) => (
            <span key={i} className="candle">
              <i className="flame" />
            </span>
          ))}
        </div>
        <div className="cake__tier cake__tier--top">
          <span className="cake__number">26</span>
        </div>
        <div className="cake__tier cake__tier--bottom" />
        <div className="cake__plate" />
      </div>
      <button className="btn" onClick={blowCandles} disabled={blown}>
        {blown ? "Your wish is on its way ✨" : "Make a wish & blow the candles 🎂"}
      </button>
      <p className={`wish${wished ? " is-visible" : ""}`} aria-live="polite">
        Wishing you all the happiness in the world! 💖
      </p>
    </Reveal>
  );
}
