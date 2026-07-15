import { useState } from "react";
import { useCatPurr } from "../hooks/useCatPurr";

interface LolaMascotProps {
  className?: string;
}

/**
 * Lola, drifting across her lily pond in the chat background.
 * The pond ignores pointer events, but Lola herself sits above the messages
 * so she can be petted — hover her and she stops to purr (Nazrin's cat, saying hi).
 */
export default function LolaMascot({ className = "" }: LolaMascotProps) {
  const { start, stop } = useCatPurr();
  const [petted, setPetted] = useState(false);

  const onEnter = () => {
    setPetted(true);
    start();
  };
  const onLeave = () => {
    setPetted(false);
    stop();
  };

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-20 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="animate-lola-drift absolute bottom-4 left-[-14%] sm:bottom-8"
        style={{ animationPlayState: petted ? "paused" : "running" }}
      >
        <div
          className="animate-lola-bob pointer-events-auto relative w-24 cursor-pointer sm:w-32"
          style={{
            filter: "drop-shadow(0 6px 10px rgba(30, 45, 35, 0.18))",
            animationPlayState: petted ? "paused" : "running",
          }}
          title="Pet me — I'm Lola, Nazrin's cat 🐾"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          {/* ripples spreading from the pad */}
          <span
            className="animate-lola-ripple absolute left-1/2 top-[62%] h-6 w-16 -translate-x-1/2 rounded-full border border-[var(--color-rose)]/40"
            style={{ animationDelay: "0s" }}
          />
          <span
            className="animate-lola-ripple absolute left-1/2 top-[62%] h-6 w-16 -translate-x-1/2 rounded-full border border-[var(--color-rose)]/30"
            style={{ animationDelay: "1.1s" }}
          />

          <svg viewBox="0 0 100 62" xmlns="http://www.w3.org/2000/svg" className="relative w-full">
            {/* lily pad */}
            <ellipse cx="50" cy="46" rx="36" ry="10.5" fill="var(--color-blush-deep)" opacity="0.9" />
            <path
              d="M50 37 Q 62 40 62 46 Q 62 52 50 55"
              fill="none"
              stroke="var(--color-rose-deep)"
              strokeWidth="0.8"
              opacity="0.5"
              strokeLinecap="round"
            />

            {/* tail, flicks independently */}
            <path
              className="animate-lola-tail"
              d="M28 38 Q 14 34 16 24 Q 17 18 23 19"
              fill="none"
              stroke="var(--color-cat-fur)"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* curled body */}
            <ellipse cx="50" cy="34" rx="21" ry="14.5" fill="var(--color-cat-fur)" stroke="var(--color-cat-line)" strokeOpacity="0.28" strokeWidth="0.6" />

            {/* front paw peeking out */}
            <ellipse cx="33" cy="41" rx="6.5" ry="4.5" fill="var(--color-cat-fur)" stroke="var(--color-cat-line)" strokeOpacity="0.22" strokeWidth="0.6" />

            {/* head */}
            <circle cx="68" cy="27" r="12.5" fill="var(--color-cat-fur)" stroke="var(--color-cat-line)" strokeOpacity="0.28" strokeWidth="0.6" />

            {/* ears */}
            <path d="M59 19 L57 10 L65 16.5 Z" fill="var(--color-cat-fur)" stroke="var(--color-cat-line)" strokeOpacity="0.28" strokeWidth="0.6" strokeLinejoin="round" />
            <path d="M60.5 17 L59.5 12 L63.5 15.5 Z" fill="var(--color-lily)" opacity="0.85" />
            <path d="M77 19 L80 10 L72.5 16 Z" fill="var(--color-cat-fur)" stroke="var(--color-cat-line)" strokeOpacity="0.28" strokeWidth="0.6" strokeLinejoin="round" />
            <path d="M76 17 L78 12.5 L74 15.5 Z" fill="var(--color-lily)" opacity="0.85" />

            {/* closed, sleepy eyes */}
            <path d="M62 27 Q 64.5 29 67 27" fill="none" stroke="var(--color-cat-line)" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.85" />
            <path d="M71 27 Q 73.5 29 76 27" fill="none" stroke="var(--color-cat-line)" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.85" />

            {/* nose + whiskers */}
            <path d="M67.3 31.5 L69.7 31.5 L68.5 33.2 Z" fill="var(--color-lily-deep)" />
            <path d="M60 32 L52 31" stroke="var(--color-cat-line)" strokeWidth="0.5" strokeLinecap="round" opacity="0.45" />
            <path d="M60 34 L52 35" stroke="var(--color-cat-line)" strokeWidth="0.5" strokeLinecap="round" opacity="0.45" />
            <path d="M76 32 L84 31" stroke="var(--color-cat-line)" strokeWidth="0.5" strokeLinecap="round" opacity="0.45" />
            <path d="M76 34 L84 35" stroke="var(--color-cat-line)" strokeWidth="0.5" strokeLinecap="round" opacity="0.45" />
          </svg>
        </div>
      </div>
    </div>
  );
}
