"use client";

import { useEffect, useRef, useState } from "react";

/*
 * OPTIONAL BACKGROUND MUSIC
 * To add a song, put an MP3 at  public/audio/song.mp3
 * The button stays hidden automatically if that file is missing.
 * Music is off by default because browsers block autoplay.
 */
const SONG_URL = "/audio/song.mp3";

export default function MusicToggle() {
  const audio = useRef<HTMLAudioElement>(null);
  const [available, setAvailable] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    fetch(SONG_URL, { method: "HEAD" })
      .then((res) => setAvailable(res.ok))
      .catch(() => setAvailable(false));
  }, []);

  if (!available) return null;

  function toggle() {
    const el = audio.current;
    if (!el) return;
    if (el.paused) {
      el.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      el.pause();
      setPlaying(false);
    }
  }

  return (
    <>
      <audio ref={audio} src={SONG_URL} loop preload="metadata" />
      <button
        className={`music${playing ? " is-playing" : ""}`}
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        aria-pressed={playing}
      >
        ♪
      </button>
    </>
  );
}
