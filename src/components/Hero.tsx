import Image from "next/image";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <Reveal className="hero">
      <h1 className="hero__title">Happy 26th Birthday, Raquel!</h1>
      <div className="hero__photo">
        {/* `preload` replaces the deprecated `priority` prop in Next.js 16 */}
        <Image
          src="/images/raquel-1.jpg"
          alt="Raquel smiling"
          width={828}
          height={828}
          sizes="(min-width: 1100px) 340px, min(70vw, 300px)"
          preload
        />
      </div>
      <a className="scroll-cue" href="#message" aria-label="Scroll to the message">
        ⌄
      </a>
    </Reveal>
  );
}
