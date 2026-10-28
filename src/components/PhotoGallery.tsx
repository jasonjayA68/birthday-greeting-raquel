"use client";

import Image from "next/image";
import { useState } from "react";
import { photos } from "@/lib/photos";
import Lightbox from "./Lightbox";
import Reveal from "./Reveal";

/** Polaroid-style grid; clicking a photo opens it in the lightbox. */
export default function PhotoGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Reveal className="gallery">
      <h2 className="section-title">Beautiful Moments</h2>
      <div className="polaroids">
        {photos.map((photo, i) => (
          <button key={photo.src} className="polaroid" onClick={() => setOpenIndex(i)}>
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 1080px) 320px, (min-width: 600px) 30vw, 45vw"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          photos={photos}
          index={openIndex}
          onChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </Reveal>
  );
}
