import { useState } from "react";
import { useCatPurr } from "../hooks/useCatPurr";
import { HeartBurst, useHeartBurst } from "./HeartBurst";

interface LolaMascotProps {
  className?: string;
}

/**
 * Lola, drifting across her lily pond in the chat background, fast asleep —
 * breathing slowly, ear twitching, Zzz floating up. The pond ignores pointer
 * events, but Lola herself sits above the messages so she can be petted —
 * hover her and she stops to purr and blush under a stream of hearts
 * (Nazrin's cat, saying hi).
 */
export default function LolaMascot({ className = "" }: LolaMascotProps) {
  const { start, stop } = useCatPurr();
  const { hearts, startStream, stopStream, burst } = useHeartBurst();
  const [petted, setPetted] = useState(false);

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

          <svg viewBox="0 0 100 62" xmlns="http://www.w3.org/2000/svg" className="relative w-full">
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

            <g className="animate-lola-breathe" style={{ transformOrigin: "50px 46px" }}>
              {/* plush curled body — one smooth bean */}
              <path
                d="M 61.5 19
                   C 53 16.5 43 17.5 36.5 22
                   C 29.5 26.8 26.5 33.5 28.2 39
                   C 29.6 43.6 34.5 45.9 41 46
                   L 57 46
                   C 61 46 63 43.5 63 40
                   C 63 33 62 25 61.5 19 Z"
                fill="var(--color-cat-fur)"
                stroke="var(--color-cat-line)"
                strokeOpacity="0.45"
                strokeWidth="0.9"
                strokeLinejoin="round"
              />
              {/* soft belly warmth */}
              <ellipse cx="40" cy="39" rx="11" ry="5.5" fill="var(--color-lily)" opacity="0.2" />
              {/* folded hind leg, barely suggested */}
              <path d="M 37 23.5 C 32.5 27.5 31 33.5 33.2 39.5" fill="none" stroke="var(--color-cat-line)" strokeWidth="0.7" strokeOpacity="0.15" strokeLinecap="round" />

              {/* hind paw peeking out */}
              <ellipse cx="37.5" cy="44.6" rx="4.4" ry="2.7" fill="var(--color-cat-fur)" stroke="var(--color-cat-line)" strokeOpacity="0.35" strokeWidth="0.7" />
              <path d="M36.2 43.2 L36.2 45.7 M39 43.2 L39 45.7" stroke="var(--color-cat-line)" strokeWidth="0.5" strokeOpacity="0.2" strokeLinecap="round" />

              {/* front paw by her chest */}
              <ellipse cx="57" cy="44" rx="4" ry="2.6" fill="var(--color-cat-fur)" stroke="var(--color-cat-line)" strokeOpacity="0.35" strokeWidth="0.7" />
              <path d="M55.8 42.6 L55.8 45.1 M58.4 42.6 L58.4 45.1" stroke="var(--color-cat-line)" strokeWidth="0.5" strokeOpacity="0.2" strokeLinecap="round" />

              {/* tail hugging the body, rounded tip resting by the front paw */}
              <g className="animate-lola-tail-sway" style={{ transformOrigin: "29.5px 39.5px" }}>
                <path
                  d="M 29.5 39.5 Q 24 44.5 31 46.8 Q 40.5 49.3 50 47.4 Q 53.5 46.7 53.8 44.6"
                  fill="none"
                  stroke="var(--color-cat-line)"
                  strokeOpacity="0.35"
                  strokeWidth="5.4"
                  strokeLinecap="round"
                />
                <path
                  d="M 29.5 39.5 Q 24 44.5 31 46.8 Q 40.5 49.3 50 47.4 Q 53.5 46.7 53.8 44.6"
                  fill="none"
                  stroke="var(--color-cat-fur)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </g>

              {/* small rounded ears; the right one twitches */}
              <path
                d="M 58.5 22 Q 55.5 17.8 56.6 14.1 Q 60.6 15.1 63.6 19.1 Z"
                fill="var(--color-cat-fur)"
                stroke="var(--color-cat-line)"
                strokeOpacity="0.45"
                strokeWidth="0.9"
                strokeLinejoin="round"
              />
              <path d="M 58.9 20.1 Q 57.5 17.7 57.9 15.9 Q 60 16.9 61.7 18.9 Z" fill="var(--color-lily)" opacity="0.8" />
              <g className="animate-lola-ear-twitch" style={{ transformOrigin: "72px 19.5px" }}>
                <path
                  d="M 68.6 19 Q 71.4 14.9 75.4 14 Q 76.4 18 73.6 22 Z"
                  fill="var(--color-cat-fur)"
                  stroke="var(--color-cat-line)"
                  strokeOpacity="0.45"
                  strokeWidth="0.9"
                  strokeLinejoin="round"
                />
                <path d="M 70.4 18.1 Q 72.2 15.7 74 15.4 Q 74.5 17.6 73.2 20 Z" fill="var(--color-lily)" opacity="0.8" />
              </g>

              {/* chubby round head, sunk low into her shoulders */}
              <path
                d="M 66 18.7
                   C 73.5 18.7 78 23.5 77.8 29.5
                   C 77.6 36 72.8 40.3 66 40.3
                   C 59.2 40.3 54.4 36 54.2 29.5
                   C 54 23.5 58.5 18.7 66 18.7 Z"
                fill="var(--color-cat-fur)"
                stroke="var(--color-cat-line)"
                strokeOpacity="0.45"
                strokeWidth="0.9"
              />

              {/* soft sleeping eyes */}
              <path d="M 60 29.7 Q 62.2 31.7 64.4 29.7" fill="none" stroke="var(--color-cat-line)" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.85" />
              <path d="M 67.6 29.7 Q 69.8 31.7 72 29.7" fill="none" stroke="var(--color-cat-line)" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.85" />

              {/* rosy cheeks, warmer while she's petted */}
              <circle cx="58.6" cy="33.5" r="2" fill="var(--color-rose)" opacity={petted ? 0.45 : 0.22} />
              <circle cx="73.4" cy="33.5" r="2" fill="var(--color-rose)" opacity={petted ? 0.45 : 0.22} />

              {/* tiny nose + ω mouth */}
              <path d="M 65.2 33.1 L 66.8 33.1 L 66 34.3 Z" fill="var(--color-lily-deep)" />
              <path d="M 66 35.1 Q 65.2 36.1 64.3 35.5 M 66 35.1 Q 66.8 36.1 67.7 35.5" fill="none" stroke="var(--color-cat-line)" strokeWidth="0.55" strokeOpacity="0.5" strokeLinecap="round" />

              {/* short tidy whiskers */}
              <path d="M 56.8 32.1 L 51.6 31.6 M 57 33.9 L 52 34.8" stroke="var(--color-cat-line)" strokeWidth="0.5" strokeLinecap="round" opacity="0.4" />
              <path d="M 75.2 32.1 L 80.4 31.6 M 75 33.9 L 80 34.8" stroke="var(--color-cat-line)" strokeWidth="0.5" strokeLinecap="round" opacity="0.4" />
            </g>

            {/* Zzz drifting up while she sleeps */}
            {!petted && (
              <g fill="var(--color-ink-soft)" fontFamily="var(--font-display)" fontWeight="600" opacity="0.8">
                <text className="animate-lola-zzz" x="78" y="14" fontSize="7" style={{ animationDelay: "0s" }}>z</text>
                <text className="animate-lola-zzz" x="83" y="10" fontSize="5.5" style={{ animationDelay: "1.2s" }}>z</text>
                <text className="animate-lola-zzz" x="87" y="7" fontSize="4.5" style={{ animationDelay: "2.4s" }}>z</text>
              </g>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}
