import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  ImageIcon,
  Layers,
  Maximize2,
  MonitorPlay,
  X,
} from "lucide-react";

function linkIcon(label: string) {
  const lower = label.toLowerCase();
  if (lower.includes("write") || lower.includes("article")) return FileText;
  if (lower.includes("figma") || lower.includes("prototype")) return Layers;
  return MonitorPlay;
}

export interface ArtifactImage {
  src: string;
  title: string;
  fit?: "cover" | "contain";
}

/* ============================================================
   ARTIFACT
   Case-study visuals presented the way Claude presents an
   artifact: a titled card that opens into a resizable panel
   docked to the right of the conversation. Owned by the design
   system, consumed by CaseStudyView.
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

/* — ArtifactCard — the inline chat preview, click to open the panel ————— */
export function ArtifactCard({
  image,
  title,
  fit = "cover",
  aspect = "wide",
  active = false,
  onOpen,
}: {
  image: string;
  title: string;
  fit?: "cover" | "contain";
  aspect?: "wide" | "phone" | "hero";
  active?: boolean;
  onOpen: () => void;
}) {
  const heightClass =
    aspect === "hero" ? "h-44 sm:h-64" : aspect === "phone" ? "aspect-[9/17]" : "h-48";

  return (
    <button
      type="button"
      onClick={onOpen}
      className={`card-warm card-lift focus-ring group block w-full overflow-hidden text-left transition ${
        active ? "border-[var(--color-rose)] ring-1 ring-[var(--color-rose)]" : ""
      }`}
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

/* — ArtifactPanel — the resizable pane docked to the right, à la Claude —— */
export function ArtifactPanel({
  images,
  index,
  liveUrl,
  liveTabLabel = "Live",
  liveEmbeddable = false,
  onClose,
  onNavigate,
  width,
  onResizeStart,
  resizing,
  layout,
}: {
  images: ArtifactImage[];
  index: number;
  liveUrl?: string;
  liveTabLabel?: string;
  liveEmbeddable?: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  width: number;
  onResizeStart: (e: React.PointerEvent) => void;
  resizing: boolean;
  layout: "split" | "overlay";
}) {
  const count = images.length;
  const [tab, setTab] = useState<"gallery" | "live">(count === 0 && liveUrl ? "live" : "gallery");
  const current = images[index];
  const LiveTabIcon = linkIcon(liveTabLabel);

  // image-less case studies only have the live preview to show
  useEffect(() => {
    if (count === 0 && liveUrl) setTab("live");
  }, [count, liveUrl]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (tab !== "gallery" || count < 2) return;
      if (e.key === "ArrowRight") onNavigate((index + 1) % count);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + count) % count);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, count, tab, onClose, onNavigate]);

  const subtitle = tab === "live" ? liveUrl ?? "" : current?.title ?? "";

  return (
    <div
      className={
        layout === "overlay"
          ? "fixed inset-0 z-50 flex flex-col bg-[var(--color-cream-soft)] animate-pop-in"
          : "relative flex h-full shrink-0 flex-col overflow-hidden border-l border-[var(--color-blush-deep)]/60 bg-[var(--color-cream-soft)]"
      }
      style={layout === "split" ? { width } : undefined}
      role="complementary"
      aria-label="Artifact viewer"
    >
      {layout === "split" && (
        <div
          onPointerDown={onResizeStart}
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize artifact panel"
          className={`group absolute left-0 top-0 z-10 h-full w-2 -translate-x-1/2 cursor-col-resize touch-none ${
            resizing ? "bg-[var(--color-rose)]/25" : ""
          }`}
        >
          <span
            className={`absolute left-1/2 top-1/2 h-10 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full transition ${
              resizing ? "bg-[var(--color-rose-dark)]" : "bg-[var(--color-blush-deep)] group-hover:bg-[var(--color-rose)]"
            }`}
            aria-hidden="true"
          />
        </div>
      )}

      <div className="flex items-center gap-2 border-b border-[var(--color-blush-deep)]/60 bg-[var(--color-blush)]/60 px-3 py-2">
        {liveUrl ? (
          <div className="flex min-w-0 flex-1 gap-1">
            {count > 0 && (
              <button
                type="button"
                onClick={() => setTab("gallery")}
                className={`flex items-center gap-1.5 rounded-[var(--radius-sm)] px-2 py-1 text-xs font-semibold transition ${
                  tab === "gallery"
                    ? "bg-[var(--color-cream-soft)] text-[var(--color-rose-dark)] shadow-sm"
                    : "text-[var(--color-ink-soft)] hover:text-[var(--color-rose-dark)]"
                }`}
              >
                <ImageIcon size={12} strokeWidth={2} aria-hidden="true" /> Gallery
              </button>
            )}
            <button
              type="button"
              onClick={() => setTab("live")}
              className={`flex items-center gap-1.5 truncate rounded-[var(--radius-sm)] px-2 py-1 text-xs font-semibold transition ${
                tab === "live"
                  ? "bg-[var(--color-cream-soft)] text-[var(--color-rose-dark)] shadow-sm"
                  : "text-[var(--color-ink-soft)] hover:text-[var(--color-rose-dark)]"
              }`}
            >
              <LiveTabIcon size={12} strokeWidth={2} className="shrink-0" aria-hidden="true" />
              <span className="truncate">{liveTabLabel}</span>
            </button>
          </div>
        ) : (
          <span className="min-w-0 flex-1 truncate font-[var(--font-mono)] text-[11px] font-medium text-[var(--color-ink-soft)]">
            {subtitle}
          </span>
        )}
        {tab === "live" && liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open in a new tab"
            className="focus-ring shrink-0 rounded-[var(--radius-sm)] p-1 text-[var(--color-ink-soft)] transition hover:bg-[var(--color-blush)] hover:text-[var(--color-rose-dark)]"
          >
            <ExternalLink size={13} strokeWidth={2} />
          </a>
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close artifact panel"
          className="focus-ring shrink-0 rounded-[var(--radius-sm)] p-1 text-[var(--color-ink-soft)] transition hover:bg-[var(--color-blush)] hover:text-[var(--color-rose-dark)]"
        >
          <X size={15} strokeWidth={2} />
        </button>
      </div>

      {liveUrl && (
        <div className="border-b border-[var(--color-blush-deep)]/60 px-3 py-1.5">
          <p className="truncate font-[var(--font-mono)] text-[11px] text-[var(--color-ink-soft)]">{subtitle}</p>
        </div>
      )}

      {tab === "gallery" ? (
        <>
          <div
            className={`scroll-warm flex min-h-0 flex-1 items-center justify-center overflow-auto bg-[var(--color-blush)] p-3 ${
              resizing ? "pointer-events-none select-none" : ""
            }`}
          >
            {current && <img src={current.src} alt={current.title} className="max-h-full w-auto max-w-full object-contain" />}
          </div>
          {count > 1 && (
            <div className="flex shrink-0 items-center justify-between border-t border-[var(--color-blush-deep)]/60 px-3 py-2">
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
        </>
      ) : liveEmbeddable && liveUrl ? (
        <div className={`relative min-h-0 flex-1 bg-[var(--color-blush)] ${resizing ? "pointer-events-none" : ""}`}>
          <iframe
            src={liveUrl}
            title={liveTabLabel}
            className="h-full w-full border-0"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 bg-[var(--color-blush)] p-6 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-cream-soft)] text-[var(--color-rose-dark)]">
            <LiveTabIcon size={20} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <p className="text-sm text-[var(--color-ink-soft)]">This site can't be embedded here.</p>
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-pastel focus-ring flex items-center gap-2 px-4 py-2 font-[var(--font-display)] text-sm font-semibold"
            >
              <ExternalLink size={14} strokeWidth={2} aria-hidden="true" />
              {liveTabLabel}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
