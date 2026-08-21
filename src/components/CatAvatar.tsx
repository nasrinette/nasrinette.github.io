import { useState } from "react";
import { useCatPurr } from "../hooks/useCatPurr";
import { useCatBlink } from "../hooks/useCatBlink";
import { HeartBurst, useHeartBurst } from "./HeartBurst";
import catSittingOpen from "../assets/cat-illustrations/cat-sitting-eyes-open-sm.png";
import catSittingClosed from "../assets/cat-illustrations/cat-sitting-eyes-closed-sm.png";
import catHeadOpen from "../assets/cat-illustrations/cat-head-peak-eyes-open-sm.png";
import catHeadClosed from "../assets/cat-illustrations/cat-head-peak-eyes-closed-sm.png";

interface CatAvatarProps {
  size?: number;
  typing?: boolean;
  className?: string;
  /** The full sitting cat marks the spots where Lola herself is speaking
      (the chat's avatar column, the sidebar identity card, dialogs); as a
      small accent elsewhere she appears head-only, peeking into the frame. */
  variant?: "sitting" | "head";
}

/**
 * Lola as an avatar: she breathes while idle, blinks now and then, glances a
 * little while typing, and closes her eyes happily when petted — with a real
 * purr, and a burst of hearts on click. Head-only by default; pass the
 * sitting variant where Lola is the speaker rather than an accent.
 */
export default function CatAvatar({ size = 40, typing = false, className = "", variant = "head" }: CatAvatarProps) {
  const { start, stop } = useCatPurr();
  const { hearts, burst, startStream, stopStream } = useHeartBurst();
  const [petted, setPetted] = useState(false);
  const blinking = useCatBlink();

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

  const eyesClosed = petted || blinking;
  const src =
    variant === "sitting"
      ? eyesClosed
        ? catSittingClosed
        : catSittingOpen
      : eyesClosed
        ? catHeadClosed
        : catHeadOpen;

  return (
    <div
      className={`relative shrink-0 cursor-pointer select-none ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Lola the cat, portfolio assistant"
      title="Lola 🐾"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={burst}
    >
      <HeartBurst hearts={hearts} />
      <img
        src={src}
        alt=""
        draggable={false}
        // the head art is wider than tall, so it settles on the box's bottom
        // edge (peeking up) instead of floating letterboxed in the middle
        className={`animate-lola-breathe h-full w-full object-contain ${
          variant === "head" ? "object-bottom" : ""
        } transition-transform duration-200 ${typing ? "animate-lola-look" : ""} ${petted ? "scale-105" : ""}`}
      />
    </div>
  );
}
