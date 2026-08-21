import { useState } from "react";
import { useCatPurr } from "../hooks/useCatPurr";
import { useCatBlink } from "../hooks/useCatBlink";
import { HeartBurst, useHeartBurst } from "./HeartBurst";
import catPeekOpen from "../assets/cat-illustrations/cat-head-peak-eyes-open-sm.png";
import catPeekClosed from "../assets/cat-illustrations/cat-head-peak-eyes-closed-sm.png";

/* Perches are head-only: the full sitting cat lives in the avatar column at
   the left of the chat and nowhere else, so on a bubble Lola only ever peeks
   over the top edge, from one corner or the other. */
export type PerchPose = "peek-right" | "peek-left";

/** Rendered box (px) for each pose — both poses render at the same size. */
const PERCH_SIZE: Record<PerchPose, number> = {
  "peek-right": 36,
  "peek-left": 36,
};

/** Extra headroom (px) a message needs above its bubble for each pose —
 * just under the full box height, so only a sliver (paws/chin) settles
 * onto the text edge instead of covering it. */
export const PERCH_CLEARANCE: Record<PerchPose, number> = {
  "peek-right": 31,
  "peek-left": 31,
};

/**
 * Pick a perch for a cat message, deterministically from its id — roughly
 * one bubble in three gets a Lola peeking over it, and the corner is stable
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
  return (["peek-right", "peek-left"] as const)[(h >>> 4) % 2];
}

interface BubbleCatProps {
  pose: PerchPose;
}

/**
 * Lola peeking over a chat bubble's top edge, from the right or left corner.
 * Hovering pets her (purr + closed happy eyes); clicking pops hearts.
 */
export default function BubbleCat({ pose }: BubbleCatProps) {
  const { start, stop } = useCatPurr();
  const { hearts, burst, startStream, stopStream } = useHeartBurst();
  const [petted, setPetted] = useState(false);
  const blinking = useCatBlink();
  const eyesClosed = petted || blinking;

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

  const size = PERCH_SIZE[pose];
  const inset = pose === "peek-right" ? { right: 24 } : { left: 24 };

  return (
    <div
      className="animate-lola-perch-in absolute z-10 cursor-pointer select-none"
      aria-hidden="true"
      title="mew."
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={burst}
      style={{ top: -size, width: size, height: size, ...inset, filter: "drop-shadow(0 3px 5px rgba(60, 35, 25, 0.14))" }}
    >
      <HeartBurst hearts={hearts} />
      <img
        src={eyesClosed ? catPeekClosed : catPeekOpen}
        alt=""
        draggable={false}
        className="animate-lola-peek h-full w-full object-contain"
      />
    </div>
  );
}
