import { useState } from "react";
import { useCatPurr } from "../hooks/useCatPurr";
import { HeartBurst, useHeartBurst } from "./HeartBurst";

export type PerchPose = "loaf" | "peek" | "hang";

/** Extra headroom (px) a message needs above its bubble for each pose. */
export const PERCH_CLEARANCE: Record<PerchPose, number> = {
  loaf: 28,
  peek: 21,
  hang: 25,
};

/**
 * Pick a perch for a cat message, deterministically from its id — roughly
 * one bubble in three gets a Lola sitting on it, and the pose is stable
 * across re-renders.
 */
export function pickPerch(id: string): PerchPose | null {
  // FNV-1a with a final avalanche — sequential timestamp-based ids need
  // the mixing or nearby messages all land on the same pose.
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  h ^= h >>> 15;
  h = Math.imul(h, 2246822519);
  h ^= h >>> 13;
  h >>>= 0;
  if (h % 10 >= 3) return null;
  return (["loaf", "peek", "hang"] as const)[(h >>> 4) % 3];
}

interface BubbleCatProps {
  pose: PerchPose;
}

/**
 * Lola perched on a chat bubble, in one of three poses:
 *  - loaf: full bread-loaf on the top-right edge, tail tucked round front
 *  - peek: just ears, wide eyes and paws hooked over the edge
 *  - hang: draped over the corner, front paws dangling into the bubble
 * Hovering pets her (purr + happy eyes); clicking pops hearts.
 */
export default function BubbleCat({ pose }: BubbleCatProps) {
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

  const position =
    pose === "loaf"
      ? "-top-[28px] right-8 w-16"
      : pose === "peek"
        ? "-top-[21px] left-8 w-11"
        : "-top-[25px] right-7 w-14";

  return (
    <div
      className={`animate-lola-perch-in absolute z-10 cursor-pointer select-none ${position}`}
      aria-hidden="true"
      title="mew."
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={burst}
      style={{ filter: "drop-shadow(0 3px 5px rgba(60, 35, 25, 0.14))" }}
    >
      <HeartBurst hearts={hearts} />
      {pose === "loaf" && <LoafCat petted={petted} />}
      {pose === "peek" && <PeekCat petted={petted} />}
      {pose === "hang" && <HangCat petted={petted} />}
    </div>
  );
}

const line = "var(--color-cat-line)";
const fur = "var(--color-cat-fur)";

/* Happy ^^ eyes vs. open blinking eyes, shared across poses. */
function Eyes({ petted, lx, rx, y, r = 1.5 }: { petted: boolean; lx: number; rx: number; y: number; r?: number }) {
  if (petted) {
    return (
      <>
        <path d={`M${lx - 2.1} ${y} Q ${lx} ${y + 2.1} ${lx + 2.1} ${y}`} fill="none" stroke={line} strokeWidth="1.2" strokeLinecap="round" />
        <path d={`M${rx - 2.1} ${y} Q ${rx} ${y + 2.1} ${rx + 2.1} ${y}`} fill="none" stroke={line} strokeWidth="1.2" strokeLinecap="round" />
      </>
    );
  }
  return (
    <>
      <g className="animate-blink" style={{ transformOrigin: `${lx}px ${y}px` }}>
        <circle cx={lx} cy={y} r={r} fill={line} />
      </g>
      <g className="animate-blink" style={{ transformOrigin: `${rx}px ${y}px` }}>
        <circle cx={rx} cy={y} r={r} fill={line} />
      </g>
    </>
  );
}

function LoafCat({ petted }: { petted: boolean }) {
  return (
    <svg viewBox="0 0 64 34" className="w-full" xmlns="http://www.w3.org/2000/svg">
      {/* loaf body */}
      <ellipse cx="28" cy="22.5" rx="21" ry="11" fill={fur} stroke={line} strokeOpacity="0.45" strokeWidth="1" />
      {/* haunch hint */}
      <path d="M14 15 Q 9.5 20 10.5 27" fill="none" stroke={line} strokeOpacity="0.2" strokeWidth="0.8" strokeLinecap="round" />
      {/* tail curled round the front */}
      <g className="animate-lola-tail-sway" style={{ transformOrigin: "13px 29px" }}>
        <path d="M13 29 Q 4.5 28.5 6 21.5 Q 7 17.5 11.5 19" fill="none" stroke={line} strokeOpacity="0.35" strokeWidth="5" strokeLinecap="round" />
        <path d="M13 29 Q 4.5 28.5 6 21.5 Q 7 17.5 11.5 19" fill="none" stroke={fur} strokeWidth="3.6" strokeLinecap="round" />
      </g>

      {/* ears */}
      <g className="animate-lola-ear-twitch" style={{ transformOrigin: "40px 8px" }}>
        <path d="M38.5 8.5 L37 1.5 L44 5 Z" fill={fur} stroke={line} strokeOpacity="0.45" strokeWidth="1" strokeLinejoin="round" />
        <path d="M39.3 7 L38.6 3.4 L42.2 5.2 Z" fill="var(--color-lily)" opacity="0.85" />
      </g>
      <path d="M53.5 8.5 L55 1.5 L48 5 Z" fill={fur} stroke={line} strokeOpacity="0.45" strokeWidth="1" strokeLinejoin="round" />
      <path d="M52.7 7 L53.4 3.4 L49.8 5.2 Z" fill="var(--color-lily)" opacity="0.85" />

      {/* head */}
      <circle cx="46" cy="13.5" r="10" fill={fur} stroke={line} strokeOpacity="0.45" strokeWidth="1" />
      <Eyes petted={petted} lx={42.3} rx={49.7} y={12.8} />
      <path d="M45 16.5 L47 16.5 L46 18 Z" fill="var(--color-lily-deep)" />
      <path d="M39 15.5 L33.5 14.8" stroke={line} strokeOpacity="0.5" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M39 17.2 L33.5 18" stroke={line} strokeOpacity="0.5" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M53 15.5 L58.5 14.8" stroke={line} strokeOpacity="0.5" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M53 17.2 L58.5 18" stroke={line} strokeOpacity="0.5" strokeWidth="0.7" strokeLinecap="round" />
    </svg>
  );
}

function PeekCat({ petted }: { petted: boolean }) {
  return (
    <svg viewBox="0 0 44 22" className="animate-lola-peek w-full" xmlns="http://www.w3.org/2000/svg">
      {/* ears */}
      <path d="M14 11 L12 3 L20 7.5 Z" fill={fur} stroke={line} strokeOpacity="0.45" strokeWidth="1" strokeLinejoin="round" />
      <path d="M15 9.5 L14 5.2 L18.3 7.6 Z" fill="var(--color-lily)" opacity="0.85" />
      <g className="animate-lola-ear-twitch" style={{ transformOrigin: "29px 11px" }}>
        <path d="M30 11 L32 3 L24 7.5 Z" fill={fur} stroke={line} strokeOpacity="0.45" strokeWidth="1" strokeLinejoin="round" />
        <path d="M29 9.5 L30 5.2 L25.7 7.6 Z" fill="var(--color-lily)" opacity="0.85" />
      </g>

      {/* top of head, rest hidden behind the bubble edge */}
      <circle cx="22" cy="24" r="14" fill={fur} stroke={line} strokeOpacity="0.45" strokeWidth="1" />

      {/* wide curious eyes, glancing about */}
      <g className={petted ? undefined : "animate-lola-look"}>
        <Eyes petted={petted} lx={17.2} rx={26.8} y={17.5} r={1.7} />
      </g>

      {/* paws hooked over the edge */}
      <ellipse cx="13.5" cy="21.5" rx="3.3" ry="2.6" fill={fur} stroke={line} strokeOpacity="0.4" strokeWidth="0.8" />
      <ellipse cx="30.5" cy="21.5" rx="3.3" ry="2.6" fill={fur} stroke={line} strokeOpacity="0.4" strokeWidth="0.8" />
      <path d="M12.5 20 L12.5 21.8 M14.7 20 L14.7 21.8" stroke={line} strokeOpacity="0.3" strokeWidth="0.6" strokeLinecap="round" />
      <path d="M29.5 20 L29.5 21.8 M31.7 20 L31.7 21.8" stroke={line} strokeOpacity="0.3" strokeWidth="0.6" strokeLinecap="round" />
    </svg>
  );
}

function HangCat({ petted }: { petted: boolean }) {
  return (
    <svg viewBox="0 0 60 42" className="w-full" style={{ overflow: "visible" }} xmlns="http://www.w3.org/2000/svg">
      {/* tail flicking behind */}
      <g className="animate-lola-tail-sway" style={{ transformOrigin: "20px 19px" }}>
        <path d="M20 19 Q 9 22 7.5 13.5" fill="none" stroke={line} strokeOpacity="0.35" strokeWidth="5" strokeLinecap="round" />
        <path d="M20 19 Q 9 22 7.5 13.5" fill="none" stroke={fur} strokeWidth="3.6" strokeLinecap="round" />
      </g>

      {/* draped body resting on the bubble edge */}
      <ellipse cx="35" cy="17.5" rx="19" ry="9.5" fill={fur} stroke={line} strokeOpacity="0.45" strokeWidth="1" />

      {/* dangling front paws — they swing gently over the text */}
      <g className="animate-lola-dangle" style={{ transformOrigin: "41px 25px" }}>
        <path d="M41 25 L41 38.5" stroke={line} strokeOpacity="0.35" strokeWidth="5.4" strokeLinecap="round" />
        <path d="M41 25 L41 38.5" stroke={fur} strokeWidth="4.2" strokeLinecap="round" />
      </g>
      <g className="animate-lola-dangle" style={{ transformOrigin: "50.5px 24px", animationDelay: "-0.9s" }}>
        <path d="M50.5 24 L50.5 36.5" stroke={line} strokeOpacity="0.35" strokeWidth="5.4" strokeLinecap="round" />
        <path d="M50.5 24 L50.5 36.5" stroke={fur} strokeWidth="4.2" strokeLinecap="round" />
      </g>

      {/* ears */}
      <path d="M39.5 12 L38.5 5 L45 8.5 Z" fill={fur} stroke={line} strokeOpacity="0.45" strokeWidth="1" strokeLinejoin="round" />
      <path d="M40.3 10.7 L39.8 7 L43.2 8.8 Z" fill="var(--color-lily)" opacity="0.85" />
      <g className="animate-lola-ear-twitch" style={{ transformOrigin: "53px 12px" }}>
        <path d="M53.5 12 L55.5 5.5 L48.8 8.5 Z" fill={fur} stroke={line} strokeOpacity="0.45" strokeWidth="1" strokeLinejoin="round" />
        <path d="M52.8 10.7 L53.8 7.3 L50.5 8.8 Z" fill="var(--color-lily)" opacity="0.85" />
      </g>

      {/* head drooping over the front */}
      <circle cx="46.5" cy="17.5" r="9.5" fill={fur} stroke={line} strokeOpacity="0.45" strokeWidth="1" />
      {petted ? (
        <Eyes petted lx={43} rx={50} y={17} />
      ) : (
        <>
          {/* relaxed, half-lidded eyes for the flop */}
          <path d="M40.9 17 Q 43 18.4 45.1 17" fill="none" stroke={line} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.85" />
          <path d="M47.9 17 Q 50 18.4 52.1 17" fill="none" stroke={line} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.85" />
        </>
      )}
      <path d="M45.5 20.5 L47.5 20.5 L46.5 22 Z" fill="var(--color-lily-deep)" />
      <path d="M40 20 L34.8 19.4" stroke={line} strokeOpacity="0.5" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M40 21.6 L34.8 22.3" stroke={line} strokeOpacity="0.5" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M53 20 L58.2 19.4" stroke={line} strokeOpacity="0.5" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M53 21.6 L58.2 22.3" stroke={line} strokeOpacity="0.5" strokeWidth="0.7" strokeLinecap="round" />
    </svg>
  );
}
