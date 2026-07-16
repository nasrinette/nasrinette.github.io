import { useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  ImageIcon,
  Layers,
  Maximize2,
  Minimize2,
  MonitorPlay,
  Play,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { DeviceKind, GalleryBlock } from "../types";

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
  device?: DeviceKind;
  /** A clip to play in place of `src`; `src` is its poster. */
  video?: string;
}

export type ArtifactTab = "gallery" | "live";

/* — PlayBadge — the affordance over a poster. A still frame of a demo looks
   like a screenshot, so the thumbnail has to say "this moves" before anyone
   decides whether to click it. ————————————————————————————————————————————— */
function PlayBadge({ size = 34 }: { size?: number }) {
  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <span
        className="flex items-center justify-center rounded-full bg-[var(--color-cream-soft)]/85 text-[var(--color-rose-dark)] shadow-[var(--shadow-card)] backdrop-blur-sm"
        style={{ width: size, height: size }}
      >
        {/* the glyph's own bearing sits left of centre — nudge it back */}
        <Play size={Math.round(size * 0.42)} fill="currentColor" strokeWidth={0} className="translate-x-[6%]" aria-hidden="true" />
      </span>
    </span>
  );
}

/* — DeviceMockup — presents a screenshot in the device it was taken on, so a
   phone shot reads as a phone instead of a letterboxed strip. Each frame hugs
   the rendered image rather than the panel: the phone bezel is the image's own
   border box, and the browser chrome sits on top of a width-led stack. ————— */
function DeviceMockup({ src, alt, device, url }: { src: string; alt: string; device: DeviceKind; url?: string }) {
  if (device === "phone") {
    return (
      <img
        src={src}
        alt={alt}
        // both maxes on a replaced element fit it to the panel and keep its
        // ratio, so the bezel border traces the screen on every axis.
        className="max-h-full max-w-full rounded-[1.75rem] border-[10px] border-[#17130f] object-contain shadow-[var(--shadow-lift)] ring-1 ring-[var(--color-blush-deep)]/60"
      />
    );
  }

  const host = url ? url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "";
  return (
    // desktop shots are wide and the panel is tall, so width is what binds:
    // lead with it and let height follow the shot's own ratio.
    <div className="flex w-full max-w-[1440px] flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-blush-deep)]/70 shadow-[var(--shadow-lift)]">
      <div className="flex shrink-0 items-center gap-2 border-b border-[var(--color-blush-deep)]/60 bg-[var(--color-blush)] px-2.5 py-1.5">
        <span className="flex shrink-0 gap-1" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[var(--color-rose)]" />
          <span className="h-2 w-2 rounded-full bg-[var(--color-gold)]" />
          <span className="h-2 w-2 rounded-full bg-[var(--color-dusk)]" />
        </span>
        {host && (
          <span className="min-w-0 flex-1 truncate rounded-full bg-[var(--color-cream-soft)]/80 px-2 py-0.5 text-center font-[var(--font-mono)] text-[10px] text-[var(--color-ink-soft)]">
            {host}
          </span>
        )}
      </div>
      <img src={src} alt={alt} className="h-auto w-full object-contain" />
    </div>
  );
}

/* ============================================================
   ARTIFACT
   Case-study visuals presented the way Claude presents an
   artifact: a titled card that opens into a resizable panel
   docked to the right of the conversation. Owned by the design
   system, consumed by CaseStudyView.
   ============================================================ */

/* — ArtifactChip — a compact inline reference to visuals, the way Claude
   references an artifact: thumbnail, label, and an Open affordance. The
   images themselves live in the panel, not the reading column. ——————————— */
export function ArtifactChip({
  title,
  subtitle,
  image,
  gradient,
  icon: Icon,
  video = false,
  active = false,
  onOpen,
}: {
  title: string;
  subtitle: string;
  image?: string;
  gradient: [string, string];
  icon: LucideIcon;
  /** Marks `image` as a video poster, so the thumbnail gets a play badge. */
  video?: boolean;
  active?: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`focus-ring group flex w-full items-center gap-3 rounded-[var(--radius-ui)] border bg-[var(--color-cream-soft)] px-3 py-2.5 text-left shadow-sm transition hover:border-[var(--color-rose)] hover:shadow-[var(--shadow-card)] ${
        active ? "border-[var(--color-rose)] ring-1 ring-[var(--color-rose)]" : "border-[var(--color-blush-deep)]/60"
      }`}
    >
      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-blush-deep)]/50">
        {image ? (
          <>
            <img src={image} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
            {video && <PlayBadge size={20} />}
          </>
        ) : (
          <span
            className="flex h-full w-full items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}
          >
            <Icon size={18} strokeWidth={1.75} style={{ color: "var(--color-on-sunset)" }} className="opacity-80" aria-hidden="true" />
          </span>
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-[var(--color-ink)]">{title}</span>
        <span className="block truncate text-[11px] text-[var(--color-ink-soft)]">{subtitle}</span>
      </span>
      <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--color-blush-deep)]/70 px-3 py-1.5 text-xs font-semibold text-[var(--color-rose-dark)] transition group-hover:bg-[var(--color-blush)]">
        <Maximize2 size={12} strokeWidth={2} aria-hidden="true" /> Open
      </span>
    </button>
  );
}

/* — ArtifactCollage — gallery shots as an angled showcase: window-framed
   screenshots on one rotated plane, staggered per column, cropped by the
   frame. Click a window to inspect it in the artifact panel. ————————————— */
export function ArtifactCollage({
  blocks,
  activeSrc,
  onOpen,
  onOpenFallback,
}: {
  blocks: GalleryBlock[];
  activeSrc?: string;
  onOpen: (src: string) => void;
  /** Used for image-less tiles (e.g. opens the live preview). */
  onOpenFallback?: () => void;
}) {
  const colCount = blocks.length >= 5 ? 3 : blocks.length >= 2 ? 2 : 1;
  const columns = Array.from({ length: colCount }, (_, c) =>
    blocks.filter((_, i) => i % colCount === c)
  );
  const columnOffsets = ["-2.5rem", "-0.25rem", "-3.5rem"];
  const heightClass =
    blocks.length <= 2 ? "h-[220px] sm:h-[280px]" : blocks.length <= 4 ? "h-[280px] sm:h-[360px]" : "h-[340px] sm:h-[440px]";

  const renderWindow = (block: GalleryBlock) => (
    <>
      <span className="flex items-center gap-1.5 border-b border-[var(--color-blush-deep)]/60 bg-[var(--color-blush)]/70 px-2.5 py-1.5">
        <span className="flex shrink-0 gap-1" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-rose)]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-dusk)]" />
        </span>
        <span className="min-w-0 truncate font-[var(--font-mono)] text-[10px] font-medium text-[var(--color-ink-soft)]">
          {block.caption}
        </span>
      </span>
      {block.image ? (
        <span className="relative block w-full">
          <img
            src={block.image}
            alt={block.caption}
            loading="lazy"
            className={`w-full bg-[var(--color-blush)] object-cover object-top ${
              block.variant === "phone" ? "aspect-[9/16]" : "aspect-[16/10]"
            } ${block.fit === "contain" ? "object-contain p-1.5" : ""}`}
          />
          {block.video && <PlayBadge size={30} />}
        </span>
      ) : (
        <span
          className={`flex w-full items-center justify-center ${
            block.variant === "phone" ? "aspect-[9/16]" : "aspect-[16/10]"
          }`}
          style={{ background: `linear-gradient(135deg, ${block.gradient[0]}, ${block.gradient[1]})` }}
        >
          <block.icon size={28} strokeWidth={1.5} style={{ color: "var(--color-on-sunset)" }} className="opacity-80" aria-hidden="true" />
        </span>
      )}
    </>
  );

  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-blush-deep)]/60 bg-[var(--color-blush)]/40 ${heightClass}`}
      style={{
        backgroundImage: "radial-gradient(color-mix(in srgb, var(--color-blush-deep) 55%, transparent) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] gap-4"
        style={{ width: "140%" }}
      >
        {columns.map((col, c) => (
          <div
            key={c}
            className="flex min-w-0 flex-1 flex-col gap-4"
            style={{ transform: `translateY(${columnOffsets[c % columnOffsets.length]})` }}
          >
            {col.map((block) => {
              const open = block.image ? () => onOpen(block.image!) : onOpenFallback;
              const windowClass = `flex w-full flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-blush-deep)]/70 bg-[var(--color-cream-soft)] shadow-[var(--shadow-card)] ${
                activeSrc && activeSrc === block.image ? "border-[var(--color-rose)] ring-1 ring-[var(--color-rose)]" : ""
              }`;
              return open ? (
                <button
                  key={block.caption}
                  type="button"
                  onClick={open}
                  aria-label={`View: ${block.caption}`}
                  className={`${windowClass} focus-ring text-left transition hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]`}
                >
                  {renderWindow(block)}
                </button>
              ) : (
                <div key={block.caption} className={windowClass}>
                  {renderWindow(block)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

/* — ArtifactPanel — the resizable pane docked to the right, à la Claude —— */
export function ArtifactPanel({
  images,
  index,
  liveUrl,
  liveTabLabel = "Live",
  liveEmbeddable = false,
  tab,
  onTabChange,
  onClose,
  onNavigate,
  width,
  onResizeStart,
  resizing,
  layout,
  fullscreen = false,
  onToggleFullscreen,
}: {
  images: ArtifactImage[];
  index: number;
  liveUrl?: string;
  liveTabLabel?: string;
  liveEmbeddable?: boolean;
  tab: ArtifactTab;
  onTabChange: (tab: ArtifactTab) => void;
  onClose: () => void;
  onNavigate: (index: number) => void;
  width: number;
  onResizeStart: (e: React.PointerEvent) => void;
  resizing: boolean;
  layout: "split" | "overlay";
  fullscreen?: boolean;
  /** When provided, shows a maximize/restore toggle in the header. */
  onToggleFullscreen?: () => void;
}) {
  const count = images.length;
  // a link that can't be framed gets no tab of its own — just the
  // open-in-new-tab icon in the header.
  const hasLiveTab = Boolean(liveUrl && liveEmbeddable);
  const current = images[index];
  const LiveTabIcon = linkIcon(liveTabLabel);

  // a tab that doesn't exist for this project can't be the selected one:
  // no live preview means gallery, no screens means live.
  const activeTab: ArtifactTab = !hasLiveTab ? "gallery" : count === 0 ? "live" : tab;

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        // fullscreen is a mode on top of the panel — Escape peels it off first
        if (fullscreen && onToggleFullscreen) onToggleFullscreen();
        else onClose();
        return;
      }
      if (activeTab !== "gallery" || count < 2) return;
      // a focused player owns the arrows for scrubbing — stepping to the next
      // artifact mid-seek would yank the clip out from under the viewer.
      if (e.target instanceof HTMLElement && e.target.tagName === "VIDEO") return;
      if (e.key === "ArrowRight") onNavigate((index + 1) % count);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + count) % count);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, count, activeTab, onClose, onNavigate, fullscreen, onToggleFullscreen]);

  const subtitle = activeTab === "live" ? liveUrl ?? "" : current?.title ?? "";

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
        {hasLiveTab ? (
          <div className="flex min-w-0 flex-1 gap-1">
            {count > 0 && (
              <button
                type="button"
                onClick={() => onTabChange("gallery")}
                className={`flex items-center gap-1.5 rounded-[var(--radius-sm)] px-2 py-1 text-xs font-semibold transition ${
                  activeTab === "gallery"
                    ? "bg-[var(--color-cream-soft)] text-[var(--color-rose-dark)] shadow-sm"
                    : "text-[var(--color-ink-soft)] hover:text-[var(--color-rose-dark)]"
                }`}
              >
                <ImageIcon size={12} strokeWidth={2} aria-hidden="true" /> Gallery
              </button>
            )}
            {count > 0 ? (
              <button
                type="button"
                onClick={() => onTabChange("live")}
                className={`flex items-center gap-1.5 truncate rounded-[var(--radius-sm)] px-2 py-1 text-xs font-semibold transition ${
                  activeTab === "live"
                    ? "bg-[var(--color-cream-soft)] text-[var(--color-rose-dark)] shadow-sm"
                    : "text-[var(--color-ink-soft)] hover:text-[var(--color-rose-dark)]"
                }`}
              >
                <LiveTabIcon size={12} strokeWidth={2} className="shrink-0" aria-hidden="true" />
                <span className="truncate">{liveTabLabel}</span>
              </button>
            ) : (
              // lone label, nothing to toggle — plain text, not a pill
              <span className="flex min-w-0 items-center gap-1.5 truncate px-2 py-1 text-xs font-semibold text-[var(--color-rose-dark)]">
                <LiveTabIcon size={12} strokeWidth={2} className="shrink-0" aria-hidden="true" />
                <span className="truncate">{liveTabLabel}</span>
              </span>
            )}
          </div>
        ) : (
          <span className="min-w-0 flex-1 truncate font-[var(--font-mono)] text-[11px] font-medium text-[var(--color-ink-soft)]">
            {subtitle}
          </span>
        )}
        {liveUrl && (activeTab === "live" || !hasLiveTab) && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${liveTabLabel} in a new tab`}
            title={`Open ${liveTabLabel} in a new tab`}
            className="focus-ring animate-link-beacon shrink-0 rounded-full bg-[var(--color-paw)] p-1.5 text-[var(--color-rose-dark)] transition hover:scale-110 hover:bg-[var(--color-blush)]"
          >
            <ExternalLink size={13} strokeWidth={2} />
          </a>
        )}
        {onToggleFullscreen && (
          <button
            type="button"
            onClick={onToggleFullscreen}
            aria-label={fullscreen ? "Exit full screen" : "View full screen"}
            title={fullscreen ? "Exit full screen" : "View full screen"}
            className="focus-ring shrink-0 rounded-[var(--radius-sm)] p-1 text-[var(--color-ink-soft)] transition hover:bg-[var(--color-blush)] hover:text-[var(--color-rose-dark)]"
          >
            {fullscreen ? <Minimize2 size={14} strokeWidth={2} /> : <Maximize2 size={14} strokeWidth={2} />}
          </button>
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

      {hasLiveTab && activeTab === "gallery" && current && (
        <div className="border-b border-[var(--color-blush-deep)]/60 px-3 py-1.5">
          <p className="truncate font-[var(--font-mono)] text-[11px] text-[var(--color-ink-soft)]">{current.title}</p>
        </div>
      )}

      {activeTab === "gallery" ? (
        <>
          <div
            className={`scroll-warm flex min-h-0 flex-1 items-center justify-center overflow-auto bg-[var(--color-blush)] p-3 ${
              resizing ? "pointer-events-none select-none" : ""
            }`}
          >
            {current &&
              (current.video ? (
                <video
                  // remount on change, or the element keeps the old clip playing
                  key={current.video}
                  src={current.video}
                  poster={current.src}
                  controls
                  playsInline
                  preload="metadata"
                  className="max-h-full w-auto max-w-full object-contain"
                />
              ) : current.device ? (
                <DeviceMockup src={current.src} alt={current.title} device={current.device} url={liveUrl} />
              ) : (
                <img src={current.src} alt={current.title} className="max-h-full w-auto max-w-full object-contain" />
              ))}
          </div>
          {count > 1 && (
            // a counter says "2 exist"; thumbnails show them — the strip makes
            // the rest of the gallery visible before anyone reads anything
            <div className="flex shrink-0 items-center gap-1.5 border-t border-[var(--color-blush-deep)]/60 px-2 py-2">
              <button
                type="button"
                aria-label="Previous screen"
                onClick={() => onNavigate((index - 1 + count) % count)}
                className="focus-ring shrink-0 rounded-[var(--radius-sm)] p-1 text-[var(--color-ink-soft)] transition hover:text-[var(--color-rose-dark)]"
              >
                <ChevronLeft size={15} strokeWidth={2} aria-hidden="true" />
              </button>
              <div className="scroll-warm flex min-w-0 flex-1 gap-1.5 overflow-x-auto py-0.5">
                {images.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    data-active={i === index || undefined}
                    aria-label={`Screen ${i + 1} of ${count}: ${img.title}`}
                    aria-current={i === index ? "true" : undefined}
                    onClick={() => onNavigate(i)}
                    ref={(el) => {
                      // keep the active thumb in view as prev/next walks the strip
                      if (el && i === index) el.scrollIntoView({ block: "nearest", inline: "nearest" });
                    }}
                    // auto margins center the strip when it fits; justify-center
                    // would strand the left thumbs beyond the scroll origin
                    className={`focus-ring relative h-11 w-16 shrink-0 overflow-hidden rounded-[var(--radius-sm)] border transition ${
                      i === 0 ? "ml-auto" : ""
                    } ${i === count - 1 ? "mr-auto" : ""} ${
                      i === index
                        ? "border-[var(--color-rose)] ring-1 ring-[var(--color-rose)]"
                        : "border-[var(--color-blush-deep)]/60 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img.src} alt="" loading="lazy" className="h-full w-full bg-[var(--color-blush)] object-cover object-top" />
                    {img.video && <PlayBadge size={18} />}
                  </button>
                ))}
              </div>
              <button
                type="button"
                aria-label="Next screen"
                onClick={() => onNavigate((index + 1) % count)}
                className="focus-ring shrink-0 rounded-[var(--radius-sm)] p-1 text-[var(--color-ink-soft)] transition hover:text-[var(--color-rose-dark)]"
              >
                <ChevronRight size={15} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className={`relative min-h-0 flex-1 bg-[var(--color-blush)] ${resizing ? "pointer-events-none" : ""}`}>
          <iframe
            src={liveUrl}
            title={liveTabLabel}
            className="h-full w-full border-0"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      )}
    </div>
  );
}
