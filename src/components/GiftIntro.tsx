"use client";

import { burstConfetti } from "@/lib/celebrate";
import { useCelebration } from "./CelebrationContext";

/** Full-screen closed gift box. Tapping it opens the lid and reveals the page. */
export default function GiftIntro() {
  const { phase, setPhase } = useCelebration();

  if (phase === "open") return null;

  function openGift() {
    if (phase !== "closed") return;
    setPhase("opening");
    setTimeout(() => burstConfetti(200, 0.5, 0.4), 450);

    // Unlock scrolling and remove the overlay once it has faded out
    setTimeout(() => {
      document.body.classList.remove("is-locked");
      setPhase("open");
    }, 1400);
  }

  return (
    <div className={`intro${phase === "opening" ? " is-open" : ""}`}>
      <button className="gift" onClick={openGift} aria-label="Open your birthday surprise">
        <span className="gift__lid">
          <span className="gift__bow gift__bow--left" />
          <span className="gift__bow gift__bow--right" />
        </span>
        <span className="gift__box" />
      </button>
      <p className="intro__hint">Tap to open 🎁</p>
    </div>
  );
}
