import { useState } from "react";
import { useCatPurr } from "../hooks/useCatPurr";
import { HeartBurst, useHeartBurst } from "./HeartBurst";

interface CatAvatarProps {
  size?: number;
  typing?: boolean;
  className?: string;
}

/**
 * Lola in full: a sitting cat with a swishing tail, twitching ear, and
 * blinking eyes. She breathes while idle, glances around while typing,
 * and hovering pets her — happy eyes, blush, and a real purr. Clicking
 * her pops a little burst of hearts.
 */
export default function CatAvatar({ size = 40, typing = false, className = "" }: CatAvatarProps) {
  const { start, stop } = useCatPurr();
  const { hearts, burst, startStream, stopStream } = useHeartBurst();
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

  const happy = petted;

  return (
    <div
      className={`relative shrink-0 cursor-pointer select-none text-[var(--color-ink)] ${className}`}
      style={{ width: size, height: size * (48 / 44) }}
      role="img"
      aria-label="Lola the cat, portfolio assistant"
      title="Lola 🐾"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={burst}
    >
      <HeartBurst hearts={hearts} />
      <svg viewBox="0 0 44 48" width={size} height={size * (48 / 44)} xmlns="http://www.w3.org/2000/svg">
        {/* tail — sways behind her, faster when she's typing */}
        <g className={typing ? "animate-lola-tail-fast" : "animate-lola-tail-sway"} style={{ transformOrigin: "34px 41px" }}>
          <path
            d="M34 41 Q 43 40 42 30 Q 41.5 25.5 37 27"
            fill="none"
            stroke="var(--color-cat-line)"
            strokeOpacity="0.35"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M34 41 Q 43 40 42 30 Q 41.5 25.5 37 27"
            fill="none"
            stroke="var(--color-cat-fur)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </g>

        <g className="animate-lola-breathe" style={{ transformOrigin: "22px 46px" }}>
          {/* sitting body */}
          <path
            d="M22 16 C 31 17 35 26 34.5 36 Q 34 44.5 22 44.5 Q 10 44.5 9.5 36 C 9 26 13 17 22 16 Z"
            fill="var(--color-cat-fur)"
            stroke="var(--color-cat-line)"
            strokeOpacity="0.45"
            strokeWidth="1"
          />
          {/* chest fluff */}
          <ellipse cx="22" cy="37" rx="7" ry="7.5" fill="var(--color-lily)" opacity="0.35" />
          {/* front-leg separations + paws */}
          <path d="M18 44 L18 37.5" stroke="var(--color-cat-line)" strokeOpacity="0.25" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M26 44 L26 37.5" stroke="var(--color-cat-line)" strokeOpacity="0.25" strokeWidth="0.8" strokeLinecap="round" />
          <ellipse cx="17.5" cy="43.6" rx="3.4" ry="2.3" fill="var(--color-cat-fur)" stroke="var(--color-cat-line)" strokeOpacity="0.3" strokeWidth="0.7" />
          <ellipse cx="26.5" cy="43.6" rx="3.4" ry="2.3" fill="var(--color-cat-fur)" stroke="var(--color-cat-line)" strokeOpacity="0.3" strokeWidth="0.7" />

          {/* ears — left one twitches now and then */}
          <g className="animate-lola-ear-twitch" style={{ transformOrigin: "15px 7px" }}>
            <path d="M12.8 7.5 L11.5 0.9 L19 4.3 Z" fill="var(--color-cat-fur)" stroke="var(--color-cat-line)" strokeOpacity="0.45" strokeWidth="1" strokeLinejoin="round" />
            <path d="M13.7 6 L13.1 2.7 L16.8 4.4 Z" fill="var(--color-lily)" opacity="0.85" />
          </g>
          <path d="M31.2 7.5 L32.5 0.9 L25 4.3 Z" fill="var(--color-cat-fur)" stroke="var(--color-cat-line)" strokeOpacity="0.45" strokeWidth="1" strokeLinejoin="round" />
          <path d="M30.3 6 L30.9 2.7 L27.2 4.4 Z" fill="var(--color-lily)" opacity="0.85" />

          {/* head */}
          <circle cx="22" cy="12.5" r="10.5" fill="var(--color-cat-fur)" stroke="var(--color-cat-line)" strokeOpacity="0.45" strokeWidth="1" />

          {/* eyes: happy arcs when petted, darting while typing, blinking otherwise */}
          {happy ? (
            <>
              <path d="M15.6 11.8 Q 17.8 14 20 11.8" fill="none" stroke="var(--color-cat-line)" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M24 11.8 Q 26.2 14 28.4 11.8" fill="none" stroke="var(--color-cat-line)" strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="14.2" cy="15.2" r="2" fill="var(--color-rose)" opacity="0.4" />
              <circle cx="29.8" cy="15.2" r="2" fill="var(--color-rose)" opacity="0.4" />
            </>
          ) : (
            <g className={typing ? "animate-lola-look" : undefined}>
              <g className="animate-blink" style={{ transformOrigin: "17.8px 11.8px" }}>
                <circle cx="17.8" cy="11.8" r="1.5" fill="var(--color-cat-line)" />
              </g>
              <g className="animate-blink" style={{ transformOrigin: "26.2px 11.8px" }}>
                <circle cx="26.2" cy="11.8" r="1.5" fill="var(--color-cat-line)" />
              </g>
            </g>
          )}

          {/* nose + mouth */}
          <path d="M20.9 15.2 L23.1 15.2 L22 16.8 Z" fill="var(--color-lily-deep)" />
          <path d="M22 16.8 Q 22 18.2 20.5 18.5" fill="none" stroke="var(--color-cat-line)" strokeWidth="0.7" strokeLinecap="round" opacity="0.5" />
          <path d="M22 16.8 Q 22 18.2 23.5 18.5" fill="none" stroke="var(--color-cat-line)" strokeWidth="0.7" strokeLinecap="round" opacity="0.5" />

          {/* whiskers */}
          <path d="M14.5 14.5 L8 13.5" stroke="var(--color-cat-line)" strokeOpacity="0.5" strokeWidth="0.7" strokeLinecap="round" />
          <path d="M14.5 16.5 L8 17.5" stroke="var(--color-cat-line)" strokeOpacity="0.5" strokeWidth="0.7" strokeLinecap="round" />
          <path d="M29.5 14.5 L36 13.5" stroke="var(--color-cat-line)" strokeOpacity="0.5" strokeWidth="0.7" strokeLinecap="round" />
          <path d="M29.5 16.5 L36 17.5" stroke="var(--color-cat-line)" strokeOpacity="0.5" strokeWidth="0.7" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
