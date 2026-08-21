import { useEffect, useState } from "react";

/**
 * Cycles `true` for a brief moment every few seconds, so a two-frame
 * (eyes-open / eyes-closed) illustration can fake a blink.
 */
export function useCatBlink(intervalMs = 6000, closedMs = 160) {
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setBlinking(true);
      window.setTimeout(() => setBlinking(false), closedMs);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, closedMs]);

  return blinking;
}
