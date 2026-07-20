import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  /** Zoom the shot inside a phone bezel instead of a browser window frame. */
  isPhone?: boolean;
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

/* — WindowChrome — the browser-window top bar (three traffic-light dots and
   an optional caption) that fronts every framed shot in the case studies.
   Shared so covers wear the exact same frame as process boards and gallery
   windows. Sits as the first child of a flex-col, border-wrapped surface. — */
export function WindowChrome({ caption }: { caption?: string }) {
  return (
    <span className="flex items-center gap-1.5 border-b border-[var(--color-blush-deep)]/60 bg-[var(--color-blush)]/70 px-2.5 py-1.5">
      <span className="flex shrink-0 gap-1" aria-hidden="true">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-rose)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-dusk)]" />
      </span>
      {caption && (
        <span className="min-w-0 truncate font-[var(--font-mono)] text-[12px] font-medium text-[var(--color-ink-soft)]">
          {caption}
        </span>
      )}
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
          <span className="min-w-0 flex-1 truncate rounded-full bg-[var(--color-cream-soft)]/80 px-2 py-0.5 text-center font-[var(--font-mono)] text-[12px] text-[var(--color-ink-soft)]">
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
  large = false,
  fit = "cover",
  onOpen,
  onOpenFull,
  openHref,
  openLabel = "Open",
}: {
  title: string;
  subtitle: string;
  image?: string;
  gradient: [string, string];
  icon: LucideIcon;
  /** Marks `image` as a video poster, so the thumbnail gets a play badge. */
  video?: boolean;
  active?: boolean;
  /** Hero presentation: the image runs full width above the title row instead of sitting as a thumbnail. */
  large?: boolean;
  /** "contain" shows the whole shot (portrait phones, tall art) letterboxed over the blush; default "cover" fills and crops. */
  fit?: "cover" | "contain";
  /** Chip-body click: zoom the shot. */
  onOpen: () => void;
  /** Open-pill click (e.g. open the live preview). Omit to hide the pill unless `openHref` is set. */
  onOpenFull?: () => void;
  /** When set, the Open pill is an external link (Chrome store, Figma, write-up) instead of a button. */
  openHref?: string;
  /** Label on the Open pill. */
  openLabel?: string;
}) {
  if (large && image) {
    // hero presentation: a browser-window frame over the picture, same chrome
    // the process boards wear. The image is the docked-preview target; a
    // floating pill goes fullscreen.
    return (
      <div
        className={`group relative flex w-full max-w-2xl flex-col overflow-hidden rounded-[var(--radius-lg)] border bg-[var(--color-cream-soft)] shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-lift)] ${
          active ? "border-[var(--color-rose)] ring-1 ring-[var(--color-rose)]" : "border-[var(--color-blush-deep)]/60 hover:border-[var(--color-rose)]"
        }`}
      >
        <WindowChrome />
        <div className="relative">
          {fit === "contain" ? (
            // portrait phones and tall art show whole, centred over the blush,
            // instead of being cropped to the 16:10 cover box
            <div className="flex items-center justify-center bg-[var(--color-blush)] py-3">
              <img src={image} alt={title} loading="lazy" className="max-h-[360px] w-auto max-w-full object-contain" />
            </div>
          ) : (
            <img src={image} alt={title} loading="lazy" className="aspect-[16/10] w-full bg-[var(--color-blush)] object-cover" />
          )}
          {video && <PlayBadge />}
          <button
            type="button"
            onClick={onOpen}
            aria-label={`Zoom ${title}`}
            className="focus-ring absolute inset-0"
          />
          {openHref ? (
            <a
              href={openHref}
              target="_blank"
              rel="noreferrer"
              aria-label={`${openLabel}: ${title}`}
              className="focus-ring absolute right-2.5 top-2.5 z-10 flex items-center gap-1.5 rounded-full bg-[var(--color-cream-soft)]/90 px-3 py-1.5 text-sm font-semibold text-[var(--color-rose-dark)] shadow-sm backdrop-blur transition hover:bg-[var(--color-blush)]"
            >
              <ExternalLink size={12} strokeWidth={2} aria-hidden="true" /> {openLabel}
            </a>
          ) : onOpenFull ? (
            <button
              type="button"
              onClick={onOpenFull}
              aria-label={`${openLabel}: ${title}`}
              className="focus-ring absolute right-2.5 top-2.5 z-10 flex items-center gap-1.5 rounded-full bg-[var(--color-cream-soft)]/90 px-3 py-1.5 text-sm font-semibold text-[var(--color-rose-dark)] shadow-sm backdrop-blur transition hover:bg-[var(--color-blush)]"
            >
              <Maximize2 size={12} strokeWidth={2} aria-hidden="true" /> {openLabel}
            </button>
          ) : null}
        </div>
      </div>
    );
  }
  return (
    // capped width: on a wide page a full-bleed bar strands the Open
    // affordance far from the label it belongs to
    <div
      className={`group relative flex w-full max-w-xl items-center gap-3 rounded-[var(--radius-ui)] border bg-[var(--color-cream-soft)] px-3 py-2.5 text-left shadow-sm transition hover:border-[var(--color-rose)] hover:shadow-[var(--shadow-card)] ${
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
        <span className="block truncate text-base font-semibold text-[var(--color-ink)]">{title}</span>
        <span className="block truncate text-[13px] text-[var(--color-ink-soft)]">{subtitle}</span>
      </span>
      {/* two targets, never nested: the body is one stretched button that
          docks the preview; the pill is its own button for fullscreen and
          sits above the stretch on z */}
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Preview ${title}`}
        className="focus-ring absolute inset-0 rounded-[var(--radius-ui)]"
      />
      <button
        type="button"
        onClick={onOpenFull ?? onOpen}
        aria-label={`Open ${title} full screen`}
        className="focus-ring relative z-10 flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--color-blush-deep)]/70 px-3 py-1.5 text-sm font-semibold text-[var(--color-rose-dark)] transition group-hover:bg-[var(--color-blush)]"
      >
        <Maximize2 size={12} strokeWidth={2} aria-hidden="true" /> Open
      </button>
    </div>
  );
}

/* — ArtifactCollage — gallery shots as an upright grid of window-framed
   screenshots, each in its own browser frame. Click a window to inspect it
   in the artifact panel. A lone shot sits full width on its own. ————————— */
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
  const renderWindow = (block: GalleryBlock) => (
    <>
      <span className="flex items-center gap-1.5 border-b border-[var(--color-blush-deep)]/60 bg-[var(--color-blush)]/70 px-2.5 py-1.5">
        <span className="flex shrink-0 gap-1" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-rose)]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-dusk)]" />
        </span>
        <span className="min-w-0 truncate font-[var(--font-mono)] text-[12px] font-medium text-[var(--color-ink-soft)]">
          {block.caption}
        </span>
      </span>
      {block.image ? (
        <span className="relative block w-full">
          <img
            src={block.image}
            alt={block.caption}
            loading="lazy"
            // one object-fit only: cover + contain together resolves to cover
            // in Tailwind, so a `contain` shot would crop. Pick exactly one.
            className={`w-full bg-[var(--color-blush)] ${
              block.variant === "phone" ? "aspect-[9/16]" : "aspect-[16/10]"
            } ${block.fit === "contain" ? "object-contain p-2" : "object-cover object-top"}`}
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

  // a lone shot has no collage to be part of: angling and cropping it would
  // only hide what it shows, so it sits upright and whole, width-capped like
  // the showcase, its window following the image's own ratio edge to edge
  if (blocks.length === 1) {
    const block = blocks[0];
    const open = block.image ? () => onOpen(block.image!) : onOpenFallback;
    const windowClass = `flex w-full max-w-4xl flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-blush-deep)]/70 bg-[var(--color-cream-soft)] shadow-[var(--shadow-card)] ${
      activeSrc && activeSrc === block.image ? "border-[var(--color-rose)] ring-1 ring-[var(--color-rose)]" : ""
    }`;
    const windowBody = block.image ? (
      <>
        <span className="flex items-center gap-1.5 border-b border-[var(--color-blush-deep)]/60 bg-[var(--color-blush)]/70 px-2.5 py-1.5">
          <span className="flex shrink-0 gap-1" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-rose)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-dusk)]" />
          </span>
          <span className="min-w-0 truncate font-[var(--font-mono)] text-[12px] font-medium text-[var(--color-ink-soft)]">
            {block.caption}
          </span>
        </span>
        <img src={block.image} alt={block.caption} loading="lazy" className="h-auto w-full" />
      </>
    ) : (
      renderWindow(block)
    );
    return open ? (
      <button
        type="button"
        onClick={open}
        aria-label={`View: ${block.caption}`}
        className={`${windowClass} focus-ring text-left transition hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]`}
      >
        {windowBody}
      </button>
    ) : (
      <div className={windowClass}>{windowBody}</div>
    );
  }

  // an all-phone set (final screens with no desktop twin): the shots are
  // already phone mockups with the bezel in the image, so no window chrome on
  // top — that double-frames them and truncates the caption. Just a clean row
  // of small phones, each following its own ratio, uncropped.
  if (blocks.length > 1 && blocks.every((b) => b.variant === "phone" && b.image)) {
    return (
      <div className="flex flex-wrap items-start gap-5">
        {blocks.map((block) => (
          <button
            key={block.caption}
            type="button"
            onClick={() => onOpen(block.image!)}
            aria-label={`View: ${block.caption}`}
            className={`focus-ring relative block w-36 shrink-0 rounded-[1.5rem] transition hover:-translate-y-0.5 ${
              activeSrc === block.image ? "ring-2 ring-[var(--color-rose)] ring-offset-2 ring-offset-[var(--color-cream)]" : ""
            }`}
          >
            <img src={block.image} alt={block.caption} loading="lazy" className="w-full rounded-[1.5rem]" />
            {block.video && <PlayBadge size={26} />}
          </button>
        ))}
      </div>
    );
  }

  // upright grid, no angle: every shot in its own window frame, the same
  // frame the process figures and the showcase use. Two up on desktop,
  // width-capped so the windows don't balloon on a full column.
  return (
    <div className="grid max-w-5xl gap-5 sm:grid-cols-2">
      {blocks.map((block) => {
        const open = block.image ? () => onOpen(block.image!) : onOpenFallback;
        const windowClass = `flex w-full flex-col overflow-hidden rounded-[var(--radius-md)] border bg-[var(--color-cream-soft)] shadow-[var(--shadow-card)] ${
          activeSrc && activeSrc === block.image
            ? "border-[var(--color-rose)] ring-1 ring-[var(--color-rose)]"
            : "border-[var(--color-blush-deep)]/70"
        }`;
        return open ? (
          <button
            key={block.caption}
            type="button"
            onClick={open}
            aria-label={`View: ${block.caption}`}
            className={`${windowClass} focus-ring text-left transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]`}
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
  );
}

/* — Lightbox — the one way every case-study image opens now: a full-screen
   zoom over a dimmed backdrop, the same for a collage shot, a showcase screen,
   a process board, or the overview hero. No docked gallery, no prev/next: one
   image, click-out or Escape to dismiss. Phones wear a bezel, everything else
   a browser window; a clip plays in place. Portaled to body so the pop-in
   animation's transformed ancestors can't trap `fixed` positioning. ———————— */
export function Lightbox({
  src,
  title,
  isPhone = false,
  video,
  screen,
  onClose,
}: {
  src: string;
  title: string;
  isPhone?: boolean;
  video?: string;
  screen?: string;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8">
      <button
        type="button"
        aria-label="Close zoom"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="animate-pop-in pointer-events-none relative flex max-h-full max-w-full flex-col items-center gap-3"
      >
        {video ? (
          <video
            src={video}
            poster={src}
            controls
            autoPlay
            playsInline
            className="pointer-events-auto w-auto max-w-full rounded-[var(--radius-md)] object-contain shadow-[var(--shadow-lift)]"
            style={{ maxHeight: "80vh" }}
          />
        ) : isPhone ? (
          // the phone shots are already device mockups with the bezel in the
          // image, so the lightbox adds no frame of its own — just the picture
          <img
            src={src}
            alt={title}
            className="min-h-0 w-auto max-w-full flex-1 rounded-[var(--radius-md)] object-contain shadow-[var(--shadow-lift)]"
            style={{ maxHeight: "80vh" }}
          />
        ) : (
          <div className="flex min-h-0 flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-blush-deep)]/70 bg-[var(--color-cream-soft)] shadow-[var(--shadow-lift)]">
            <WindowChrome caption={screen} />
            <img
              src={src}
              alt={title}
              className="h-auto max-h-[78vh] w-auto max-w-full bg-[var(--color-blush)] object-contain"
            />
          </div>
        )}
        <p className="rounded-[var(--radius-ui)] bg-[var(--color-cream-soft)]/90 px-3 py-1.5 text-center font-[var(--font-mono)] text-[13px] text-[var(--color-ink-soft)] shadow-sm backdrop-blur">
          {title}
        </p>
      </div>
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close zoom"
        className="focus-ring absolute right-4 top-4 rounded-full bg-[var(--color-cream-soft)]/90 p-2 text-[var(--color-ink-soft)] shadow-[var(--shadow-card)] backdrop-blur transition hover:text-[var(--color-rose-dark)]"
      >
        <X size={16} strokeWidth={2} />
      </button>
    </div>,
    document.body
  );
}

/* — ArtifactShowcase — every final screen in one calm surface. Shots pair up
   by their `screen` tag: the desktop shot as a browser window, its phone
   twin standing in front of the bottom-right corner. The collage scatters
   process shots on an angle; this is its opposite — the shipped design,
   ordered and upright. The showcase owns its screenshots end to end: click
   a shot and it zooms in the shared Lightbox, so the artifact panel stays
   free for the live preview. ————————————————————————————————————————————— */
export function ArtifactShowcase({ blocks }: { blocks: GalleryBlock[] }) {
  const [zoom, setZoom] = useState<GalleryBlock | null>(null);

  // group by screen name in first-appearance order; the phone shot rides
  // whichever window shares its tag. A screen without an image yet still
  // gets a window — a placeholder frame, so the set can be authored before
  // the shots exist (same promise the comparison figure makes).
  const screens: { name: string; desktop?: GalleryBlock; phone?: GalleryBlock }[] = [];
  for (const block of blocks) {
    if (!block.screen) continue;
    let entry = screens.find((s) => s.name === block.screen);
    if (!entry) {
      entry = { name: block.screen };
      screens.push(entry);
    }
    if (block.image && (block.device === "phone" || block.variant === "phone")) entry.phone = block;
    else entry.desktop = block;
  }
  if (screens.length === 0) return null;

  return (
    // no surface of its own: the framed windows sit directly on the page,
    // the way every other case-study figure does. Width is capped: on a
    // full-width column, uncapped windows balloon into a wall of image.
    <div role="group" aria-label="Final screens">
      <div className="grid max-w-5xl gap-5 sm:grid-cols-2 sm:gap-6">
        {screens.map((screen) => (
          // reserved right/bottom sliver keeps the overhanging phone inside
          // the surface instead of clipping at the grid cell
          <div key={screen.name} className={screen.desktop ? "relative pb-3 pr-2" : ""}>
            {screen.desktop && screen.desktop.image && (
              <button
                type="button"
                onClick={() => setZoom(screen.desktop!)}
                aria-label={`Zoom: ${screen.desktop.caption}`}
                className="focus-ring flex w-full cursor-zoom-in flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-blush-deep)]/70 bg-[var(--color-cream-soft)] text-left shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-lift)]"
              >
                <span className="flex items-center gap-1.5 border-b border-[var(--color-blush-deep)]/60 bg-[var(--color-blush)]/70 px-2.5 py-1.5">
                  <span className="flex shrink-0 gap-1" aria-hidden="true">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-rose)]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-dusk)]" />
                  </span>
                  <span className="min-w-0 truncate font-[var(--font-mono)] text-[12px] font-medium text-[var(--color-ink-soft)]">
                    {screen.name}
                  </span>
                </span>
                <img
                  src={screen.desktop.image}
                  alt=""
                  loading="lazy"
                  className="aspect-[16/10] w-full bg-[var(--color-blush)] object-cover object-top"
                />
              </button>
            )}
            {screen.desktop && !screen.desktop.image && (
              // no shot yet: the window frame holds the screen's place
              <div className="flex w-full flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-blush-deep)]/70 bg-[var(--color-cream-soft)] shadow-[var(--shadow-card)]">
                <span className="flex items-center gap-1.5 border-b border-[var(--color-blush-deep)]/60 bg-[var(--color-blush)]/70 px-2.5 py-1.5">
                  <span className="flex shrink-0 gap-1" aria-hidden="true">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-rose)]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-dusk)]" />
                  </span>
                  <span className="min-w-0 truncate font-[var(--font-mono)] text-[12px] font-medium text-[var(--color-ink-soft)]">
                    {screen.name}
                  </span>
                </span>
                <span
                  className="flex aspect-[16/10] w-full items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${screen.desktop.gradient[0]}, ${screen.desktop.gradient[1]})`,
                  }}
                >
                  <screen.desktop.icon
                    size={28}
                    strokeWidth={1.5}
                    style={{ color: "var(--color-on-sunset)" }}
                    className="opacity-80"
                    aria-hidden="true"
                  />
                </span>
              </div>
            )}
            {screen.phone && screen.desktop && (
              <button
                type="button"
                onClick={() => setZoom(screen.phone!)}
                aria-label={`Zoom: ${screen.phone.caption}`}
                className="focus-ring absolute bottom-0 right-0 z-10 w-[24%] max-w-[104px] cursor-zoom-in overflow-hidden rounded-[0.9rem] border-4 border-[#17130f] shadow-[var(--shadow-lift)] ring-1 ring-[var(--color-blush-deep)]/60 transition hover:-translate-y-0.5"
              >
                <img
                  src={screen.phone.image}
                  alt=""
                  loading="lazy"
                  className="aspect-[9/19] w-full bg-[var(--color-blush)] object-cover object-top"
                />
              </button>
            )}
            {screen.phone && !screen.desktop && (
              // a screen that only exists on phone stands alone, centered, at
              // its own ratio: a lone shot has no grid twin to match, and
              // cropping it (a chat, a feed) would cut the story it tells
              <button
                type="button"
                onClick={() => setZoom(screen.phone!)}
                aria-label={`Zoom: ${screen.phone.caption}`}
                className="focus-ring mx-auto block w-[52%] max-w-[210px] cursor-zoom-in overflow-hidden rounded-[1.1rem] border-4 border-[#17130f] shadow-[var(--shadow-lift)] ring-1 ring-[var(--color-blush-deep)]/60 transition hover:-translate-y-0.5"
              >
                <img src={screen.phone.image} alt="" loading="lazy" className="h-auto w-full bg-[var(--color-blush)]" />
              </button>
            )}
          </div>
        ))}
      </div>

      {zoom?.image && (
        <Lightbox
          src={zoom.image}
          title={zoom.caption}
          isPhone={zoom.device === "phone" || zoom.variant === "phone"}
          screen={zoom.screen}
          onClose={() => setZoom(null)}
        />
      )}
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
  liveMinHeight,
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
  /** The embedded site's shortest workable viewport; shorter panels scale the frame down to fit. */
  liveMinHeight?: number;
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

  // a fixed-size embed (a phone centred in a viewport that hides overflow)
  // clips in a panel shorter than it lays out for. Below liveMinHeight the
  // iframe keeps that height and the whole frame shrinks as one piece.
  const liveBoxRef = useRef<HTMLDivElement | null>(null);
  const [liveBox, setLiveBox] = useState<{ width: number; height: number } | null>(null);
  useEffect(() => {
    if (activeTab !== "live" || !liveMinHeight) return;
    const el = liveBoxRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setLiveBox({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [activeTab, liveMinHeight]);
  const liveScale =
    liveMinHeight && liveBox && liveBox.height < liveMinHeight ? liveBox.height / liveMinHeight : 1;

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
                className={`flex items-center gap-1.5 rounded-[var(--radius-sm)] px-2 py-1 text-sm font-semibold transition ${
                  activeTab === "gallery"
                    ? "bg-[var(--color-blush)] text-[var(--color-rose-dark)]"
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
                className={`flex items-center gap-1.5 truncate rounded-[var(--radius-sm)] px-2 py-1 text-sm font-semibold transition ${
                  activeTab === "live"
                    ? "bg-[var(--color-blush)] text-[var(--color-rose-dark)]"
                    : "text-[var(--color-ink-soft)] hover:text-[var(--color-rose-dark)]"
                }`}
              >
                <LiveTabIcon size={12} strokeWidth={2} className="shrink-0" aria-hidden="true" />
                <span className="truncate">{liveTabLabel}</span>
              </button>
            ) : (
              // lone label, nothing to toggle — plain text, not a pill
              <span className="flex min-w-0 items-center gap-1.5 truncate px-2 py-1 text-sm font-semibold text-[var(--color-rose-dark)]">
                <LiveTabIcon size={12} strokeWidth={2} className="shrink-0" aria-hidden="true" />
                <span className="truncate">{liveTabLabel}</span>
              </span>
            )}
          </div>
        ) : (
          <span className="min-w-0 flex-1 truncate font-[var(--font-mono)] text-[13px] font-medium text-[var(--color-ink-soft)]">
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

      {/* docked panel: the title gets its own row. Fullscreen and mobile
          overlay: a full-width bar would block the view, so the title floats
          over the image as a small chip instead (see below). */}
      {hasLiveTab && activeTab === "gallery" && current && layout === "split" && (
        <div className="border-b border-[var(--color-blush-deep)]/60 px-3 py-1.5">
          <p className="truncate font-[var(--font-mono)] text-[13px] text-[var(--color-ink-soft)]">{current.title}</p>
        </div>
      )}

      {activeTab === "gallery" ? (
        <>
          <div
            className={`scroll-warm relative flex min-h-0 flex-1 items-center justify-center overflow-auto bg-[var(--color-blush)] p-3 ${
              resizing ? "pointer-events-none select-none" : ""
            }`}
          >
            {hasLiveTab && layout === "overlay" && current?.title && (
              // top-left keeps it clear of video controls at the bottom
              <div className="pointer-events-none absolute left-3 top-3 z-10 max-w-[70%] rounded-[var(--radius-ui)] bg-[var(--color-cream-soft)]/85 px-3 py-1.5 shadow-sm backdrop-blur">
                <p className="truncate font-[var(--font-mono)] text-[13px] text-[var(--color-ink-soft)]">{current.title}</p>
              </div>
            )}
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
                  className="max-h-full w-auto max-w-full rounded-[var(--radius-md)] object-contain"
                />
              ) : current.device ? (
                <DeviceMockup src={current.src} alt={current.title} device={current.device} url={liveUrl} />
              ) : (
                // an undressed shot still gets the app's corner radius
                <img
                  src={current.src}
                  alt={current.title}
                  className="max-h-full w-auto max-w-full rounded-[var(--radius-md)] object-contain"
                />
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
        <div
          ref={liveBoxRef}
          className={`relative min-h-0 flex-1 overflow-hidden bg-[var(--color-blush)] ${resizing ? "pointer-events-none" : ""}`}
        >
          <iframe
            src={liveUrl}
            title={liveTabLabel}
            className="h-full w-full border-0"
            // scaling divides the visible box by liveScale, so the iframe is
            // laid out that much larger to land back on the panel exactly
            style={
              liveScale < 1 && liveBox
                ? {
                    width: Math.round(liveBox.width / liveScale),
                    height: liveMinHeight,
                    transform: `scale(${liveScale})`,
                    transformOrigin: "top left",
                  }
                : undefined
            }
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      )}
    </div>
  );
}
