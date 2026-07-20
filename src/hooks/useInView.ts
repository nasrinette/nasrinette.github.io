import { useEffect, useRef, useState } from "react";

interface Options {
  /** Fire a little after the element's edge crosses in, so it reveals while
      it's comfortably on screen rather than the instant it peeks in. */
  rootMargin?: string;
  threshold?: number;
  /** Reveal once and stop observing (the default); false re-hides on exit. */
  once?: boolean;
}

/**
 * Reports when an element has scrolled into view. Drives the case study's
 * "generate as you scroll" reveals: each block waits until it's on screen,
 * then animates in. Fires immediately for anything already visible on open.
 */
export function useInView<T extends Element = HTMLDivElement>({
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.06,
  once = true,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) io.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { rootMargin, threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, threshold, once]);

  return [ref, inView] as const;
}
