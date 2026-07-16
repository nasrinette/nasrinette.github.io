import { useEffect } from "react";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight, ImageIcon, Maximize2, X } from "lucide-react";

export interface ArtifactImage {
  src: string;
  title: string;
  fit?: "cover" | "contain";
}

/* ============================================================
   ARTIFACT
   Case-study images presented the way Claude presents an
   artifact: a titled card with a compact preview that opens
   into a focused, full-size viewer. Owned by the design system,
   consumed by CaseStudyView.
   ============================================================ */

function ArtifactHeader({ title, trailing }: { title: string; trailing?: ReactNode }) {
  return (
    <div className="flex items-center gap-2 border-b border-[var(--color-blush-deep)]/60 bg-[var(--color-blush)]/60 px-3 py-2">
      <ImageIcon size={13} strokeWidth={1.75} className="shrink-0 text-[var(--color-rose-dark)]" aria-hidden="true" />
      <span className="min-w-0 flex-1 truncate font-[var(--font-mono)] text-[11px] font-medium text-[var(--color-ink-soft)]">
        {title}
      </span>
      {trailing}
    </div>
  );
}

/* — ArtifactCard — the inline chat preview, click to expand ——————— */
export function ArtifactCard({
  image,
  title,
  fit = "cover",
  aspect = "wide",
  onOpen,
}: {
  image: string;
  title: string;
  fit?: "cover" | "contain";
  aspect?: "wide" | "phone" | "hero";
  onOpen: () => void;
}) {
  const heightClass =
    aspect === "hero" ? "h-44 sm:h-64" : aspect === "phone" ? "aspect-[9/17]" : "h-48";

  return (
    <button
      type="button"
      onClick={onOpen}
      className="card-warm card-lift focus-ring group block w-full overflow-hidden text-left"
    >
      <ArtifactHeader
        title={title}
        trailing={
          <Maximize2
            size={12}
            strokeWidth={2}
            className="shrink-0 text-[var(--color-ink-soft)] transition group-hover:text-[var(--color-rose-dark)]"
            aria-hidden="true"
          />
        }
      />
      <div className={`relative w-full overflow-hidden bg-[var(--color-blush)] ${heightClass}`}>
        <img
          src={image}
          alt={title}
          loading="lazy"
          className={`h-full w-full ${fit === "contain" ? "object-contain p-2" : "object-cover object-top"}`}
        />
      </div>
    </button>
  );
}

/* — ArtifactLightbox — the expanded artifact viewer ——————————————— */
export function ArtifactLightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: ArtifactImage[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const count = images.length;
  const current = images[index];

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && count > 1) onNavigate((index + 1) % count);
      if (e.key === "ArrowLeft" && count > 1) onNavigate((index - 1 + count) % count);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, count, onClose, onNavigate]);

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex animate-pop-in items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={current.title}
    >
      <button type="button" aria-label="Close artifact" onClick={onClose} className="absolute inset-0" />
      <div className="card-warm relative z-10 flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden shadow-[var(--shadow-lift)]">
        <ArtifactHeader
          title={current.title}
          trailing={
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="focus-ring shrink-0 rounded-[var(--radius-sm)] p-0.5 text-[var(--color-ink-soft)] transition hover:bg-[var(--color-blush)] hover:text-[var(--color-rose-dark)]"
            >
              <X size={14} strokeWidth={2} />
            </button>
          }
        />
        <div className="scroll-warm flex min-h-0 flex-1 items-center justify-center overflow-auto bg-[var(--color-blush)] p-3">
          <img src={current.src} alt={current.title} className="max-h-[70vh] w-auto max-w-full object-contain" />
        </div>
        {count > 1 && (
          <div className="flex items-center justify-between border-t border-[var(--color-blush-deep)]/60 px-3 py-2">
            <button
              type="button"
              onClick={() => onNavigate((index - 1 + count) % count)}
              className="focus-ring flex items-center gap-1 rounded-[var(--radius-sm)] px-2 py-1 text-xs font-medium text-[var(--color-ink-soft)] transition hover:text-[var(--color-rose-dark)]"
            >
              <ChevronLeft size={14} strokeWidth={2} aria-hidden="true" /> Prev
            </button>
            <span className="font-[var(--font-mono)] text-[11px] text-[var(--color-ink-soft)]">
              {index + 1} / {count}
            </span>
            <button
              type="button"
              onClick={() => onNavigate((index + 1) % count)}
              className="focus-ring flex items-center gap-1 rounded-[var(--radius-sm)] px-2 py-1 text-xs font-medium text-[var(--color-ink-soft)] transition hover:text-[var(--color-rose-dark)]"
            >
              Next <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
