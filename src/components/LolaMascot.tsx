import { useEffect, useState } from "react";
import { useCatPurr } from "../hooks/useCatPurr";
import { HeartBurst, useHeartBurst } from "./HeartBurst";
import catSleeping from "../assets/cat-illustrations/cat-sleeping-sm.png";

// She paddles in from the left only on the first page load; switching
// views remounts the chat, and the pond just sits where it belongs.
let hasPaddledIn = false;

interface LolaMascotProps {
  className?: string;
}

/**
 * Lola, asleep on her lily pond in the bottom-right corner of the chat
 * background — breathing slowly, Zzz floating up. The pond ignores pointer
 * events, but Lola herself sits above the messages so she can be petted —
 * hover her and she stops to purr under a stream of hearts (Nazrin's cat,
 * saying hi).
 */
export default function LolaMascot({ className = "" }: LolaMascotProps) {
  const { start, stop } = useCatPurr();
  const { hearts, startStream, stopStream, burst } = useHeartBurst();
  const [petted, setPetted] = useState(false);
  const [paddlingIn] = useState(() => !hasPaddledIn);
  useEffect(() => {
    hasPaddledIn = true;
  }, []);

  const onEnter = () => {
    setPetted(true);
    start();
    startStream();
  };
  const onLeave = () => {
    setPetted(false);
    stop();
    stopStream();
  };

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-20 overflow-hidden ${paddlingIn ? "animate-lola-paddle-in" : ""} ${className}`}
      aria-hidden="true"
    >
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8">
        <div
          className="animate-lola-bob pointer-events-auto relative w-28 cursor-pointer sm:w-36"
          style={{
            filter: "drop-shadow(0 6px 10px rgba(30, 45, 35, 0.18))",
            animationPlayState: petted ? "paused" : "running",
          }}
          title="Pet me, I'm Lola, Nazrin's cat 🐾"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          onClick={burst}
        >
          <HeartBurst hearts={hearts} />

          {/* ripples spreading from the pad */}
          <span
            className="animate-lola-ripple absolute left-1/2 top-[62%] h-6 w-16 -translate-x-1/2 rounded-full border border-[var(--color-rose)]/40"
            style={{ animationDelay: "0s" }}
          />
          <span
            className="animate-lola-ripple absolute left-1/2 top-[62%] h-6 w-16 -translate-x-1/2 rounded-full border border-[var(--color-rose)]/30"
            style={{ animationDelay: "1.1s" }}
          />

          <div className="relative w-full" style={{ aspectRatio: "100 / 62" }}>
            <svg viewBox="0 0 100 62" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 h-full w-full">
              {/* lily pad, with the classic notch cut toward the middle */}
              <path
                d="M50 46 L15 44 A36 10.5 0 1 1 18.5 50.8 Z"
                fill="var(--color-blush-deep)"
                opacity="0.9"
              />
              {/* pad veins */}
              <path
                d="M50 46 L74 41.5 M50 46 L80 47.5 M50 46 L68 52.5"
                stroke="var(--color-rose-deep)"
                strokeWidth="0.7"
                opacity="0.35"
                strokeLinecap="round"
              />
              {/* a little lotus at the pad's edge */}
              <g opacity="0.95">
                <path d="M83 41.5 Q 84.5 37.5 86.5 41 Q 88.5 37.5 90 41.5 Q 91 44 86.5 44.5 Q 82 44 83 41.5 Z" fill="var(--color-lily)" />
                <path d="M85 41.8 Q 86.5 39 88 41.8" fill="none" stroke="var(--color-rose-deep)" strokeWidth="0.6" opacity="0.5" strokeLinecap="round" />
              </g>
            </svg>

            {/* curled up asleep on the pad — a real purr is her only "petted"
                tell, since her painted face stays fast asleep. A plain <img>
                (not an SVG <image> ref) so she scales crisp, not rasterized. */}
            <img
              src={catSleeping}
              alt=""
              draggable={false}
              className="animate-lola-breathe absolute"
              style={{ left: "25%", top: "6.4516%", width: "56%", height: "90.3226%", transformOrigin: "50% 74.19%" }}
            />

            {/* Zzz drifting up while she sleeps */}
            {!petted && (
              <svg viewBox="0 0 100 62" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 h-full w-full">
                <g fill="var(--color-ink-soft)" fontFamily="var(--font-display)" fontWeight="600" opacity="0.8">
                  <text className="animate-lola-zzz" x="78" y="14" fontSize="7" style={{ animationDelay: "0s" }}>z</text>
                  <text className="animate-lola-zzz" x="83" y="10" fontSize="5.5" style={{ animationDelay: "1.2s" }}>z</text>
                  <text className="animate-lola-zzz" x="87" y="7" fontSize="4.5" style={{ animationDelay: "2.4s" }}>z</text>
                </g>
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
