import confetti from "canvas-confetti";

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const COLORS = ["#f4c0c8", "#e79aa6", "#b76e79", "#d4af37", "#ecd08a", "#ffffff"];

/**
 * Fire a round burst of confetti from a point on screen (x, y as 0–1 fractions).
 * With reduced motion we keep a small, gentle burst instead of the full show.
 */
export function burstConfetti(count = 160, x = 0.5, y = 0.45) {
  confetti({
    particleCount: prefersReducedMotion() ? Math.round(count / 4) : count,
    spread: 360,
    startVelocity: 38,
    gravity: 0.9,
    ticks: 240,
    scalar: 1.1,
    origin: { x, y },
    colors: COLORS,
    zIndex: 60,
  });
}
