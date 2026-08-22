import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Tiny floating-hearts reward for petting Lola. `burst()` spawns a small
 * batch of hearts that drift up and fade; `startStream()`/`stopStream()`
 * keep them coming for as long as she's being petted. Hearts clean
 * themselves up, so overlapping bursts just layer more of them.
 */
export function useHeartBurst() {
  const [hearts, setHearts] = useState<number[]>([]);
  const nextId = useRef(0);
  const timers = useRef<number[]>([]);
  const streamTimer = useRef<number | null>(null);

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach((t) => window.clearTimeout(t));
      if (streamTimer.current != null) window.clearInterval(streamTimer.current);
    };
  }, []);

  const burst = useCallback(() => {
    const batch = Array.from({ length: 3 }, () => nextId.current++);
    setHearts((h) => [...h, ...batch]);
    timers.current.push(
      window.setTimeout(() => {
        setHearts((h) => h.filter((id) => !batch.includes(id)));
      }, 1200),
    );
  }, []);

  const startStream = useCallback(() => {
    burst();
    if (streamTimer.current == null) {
      streamTimer.current = window.setInterval(burst, 900);
    }
  }, [burst]);

  const stopStream = useCallback(() => {
    if (streamTimer.current != null) {
      window.clearInterval(streamTimer.current);
      streamTimer.current = null;
    }
  }, []);

  return { hearts, burst, startStream, stopStream };
}

export function HeartBurst({ hearts }: { hearts: number[] }) {
  if (hearts.length === 0) return null;
  return (
    <span className="pointer-events-none absolute inset-x-0 -top-1 z-10" aria-hidden="true">
      {hearts.map((id) => (
        <span
          key={id}
          className="animate-lola-heart absolute font-[var(--font-display)] text-[13px] leading-none"
          style={{
            left: `${18 + (id % 3) * 28}%`,
            animationDelay: `${(id % 3) * 110}ms`,
            color: "var(--primary-hover)",
          }}
        >
          ♥
        </span>
      ))}
    </span>
  );
}
