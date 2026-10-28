"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties } from "react";
import type { Photo } from "@/lib/photos";

type Props = {
  photos: Photo[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
};

/** Full-screen photo viewer: arrows, keyboard, swipe, and tap-outside to close. */
export default function Lightbox({ photos, index, onChange, onClose }: Props) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const photo = photos[index];

  const go = (step: number) => onChange((index + step + photos.length) % photos.length);

  // Lock page scroll and move focus into the dialog; restore both on close
  useEffect(() => {
    const lastFocus = document.activeElement as HTMLElement | null;
    document.body.classList.add("is-locked");
    closeBtn.current?.focus();
    return () => {
      document.body.classList.remove("is-locked");
      lastFocus?.focus();
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onChange((index - 1 + photos.length) % photos.length);
      if (e.key === "ArrowRight") onChange((index + 1) % photos.length);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, photos.length, onChange, onClose]);

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      // Tap on the dark backdrop (not the photo or buttons) closes it
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <button ref={closeBtn} className="lightbox__close" onClick={onClose} aria-label="Close">
        ×
      </button>
      <button className="lightbox__nav lightbox__nav--prev" onClick={() => go(-1)} aria-label="Previous photo">
        ‹
      </button>
      <Image
        key={photo.src}
        className="lightbox__img"
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes="(min-width: 768px) 80vw, 100vw"
        style={{ "--ratio": photo.width / photo.height } as CSSProperties}
      />
      <button className="lightbox__nav lightbox__nav--next" onClick={() => go(1)} aria-label="Next photo">
        ›
      </button>
      <p className="lightbox__count">
        {index + 1} / {photos.length}
      </p>
    </div>
  );
}
