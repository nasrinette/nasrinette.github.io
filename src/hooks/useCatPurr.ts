import { useCallback, useRef } from "react";
import purrUrl from "../assets/feedthestraycats-real-cat-purring-sound-354510.mp3";

/**
 * Hold-to-purr controls backed by a real cat-purring recording.
 *
 * `start()` begins looping the purr (call it on mouse-enter); `stop()` pauses
 * and rewinds it (call it on mouse-leave). The <audio> element is created
 * lazily on first use — a user gesture — to satisfy autoplay policies, then
 * reused. Looping means the purr continues for as long as the cursor stays
 * over the cat and cuts out the moment it leaves.
 */
export function useCatPurr() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const start = useCallback(() => {
    if (typeof window === "undefined") return;
    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio(purrUrl);
      audio.loop = true;
      audio.volume = 0.6;
      audio.preload = "auto";
      audioRef.current = audio;
    }
    void audio.play().catch(() => {
      /* ignore autoplay rejections before the first interaction */
    });
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  }, []);

  return { start, stop };
}
