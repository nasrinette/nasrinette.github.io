import type { CSSProperties, ReactNode } from "react";
import { useInView } from "../hooks/useInView";
import { useMediaQuery } from "../hooks/useMediaQuery";

/** rise: fade + lift (text blocks, groups). fade: opacity only (headings).
    gen: blur-resolve — an image sharpening into focus, like it's being made. */
type Variant = "rise" | "fade" | "gen";

/**
 * Wraps a block so it animates in the moment it scrolls into view, part of the
 * case study's "generating on the fly" feel. Honours prefers-reduced-motion by
 * rendering the block plainly. A `delay` staggers siblings into a cascade.
 */
export default function Reveal({
  children,
  variant = "rise",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
}) {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [ref, inView] = useInView<HTMLDivElement>();

  if (reduced) return <div className={className}>{children}</div>;

  const inClass = inView ? "reveal-in" : "";
  const style: CSSProperties | undefined = delay ? { animationDelay: `${delay}ms` } : undefined;

  // diffusion resolve: the children sharpen out of a soft blur
  if (variant === "gen") {
    return (
      <div ref={ref} className={`reveal reveal-gen ${inClass} ${className}`.trim()} style={style}>
        <div className="gen-layer">{children}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`reveal reveal-${variant} ${inClass} ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
