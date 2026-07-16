import type { ComponentType, ReactNode } from "react";
import { Lightbulb, Quote } from "lucide-react";
import ToolLogo from "./ToolLogo";

/* ============================================================
   CASE STUDY KIT
   The reusable, sunset-styled building blocks that make up a
   case study. Owned by the design system, consumed by
   CaseStudyView and documented in DesignSystemView.
   ============================================================ */

type IconType = ComponentType<{ size?: number; strokeWidth?: number; className?: string; style?: object }>;

/* — Eyebrow — a small mono label above a heading ——————————— */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-[var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-rose-dark)]">
      {children}
    </p>
  );
}

/* — SectionHeading — gradient tick + display title ———————————— */
export function SectionHeading({ children, eyebrow }: { children: ReactNode; eyebrow?: ReactNode }) {
  return (
    <div className="mb-3 space-y-1.5">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <div className="flex items-center gap-2.5">
        <span
          className="h-5 w-1.5 shrink-0 rounded-full"
          style={{ background: "var(--gradient-sunset)" }}
          aria-hidden="true"
        />
        <h2 className="font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)]">{children}</h2>
      </div>
    </div>
  );
}

/* — MetricStat — headline result with a sunset cap ————————————— */
export function MetricStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="card-warm relative overflow-hidden p-4 pt-5 text-center">
      <span
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: "var(--gradient-sunset)" }}
        aria-hidden="true"
      />
      <p className="font-[var(--font-display)] text-xl font-bold leading-tight text-[var(--color-rose-dark)]">
        {value}
      </p>
      <p className="mt-1.5 text-[11px] leading-snug text-[var(--color-ink-soft)]">{label}</p>
    </div>
  );
}

export function MetricRow({ metrics }: { metrics: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {metrics.map((m) => (
        <MetricStat key={m.label} value={m.value} label={m.label} />
      ))}
    </div>
  );
}

/* — ProcessTimeline — numbered sunset badges on a connecting rail ——— */
export function ProcessTimeline({ steps }: { steps: string[] }) {
  return (
    <ol className="relative">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <li key={step} className="relative flex gap-4 pb-5 last:pb-0">
            {!isLast && (
              <span
                className="absolute bottom-1 left-[13px] top-8 w-px bg-[var(--color-blush-deep)]"
                aria-hidden="true"
              />
            )}
            <span
              className="relative z-10 flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-full font-[var(--font-mono)] text-xs font-bold text-[var(--color-on-sunset)] shadow-[var(--shadow-soft)]"
              style={{ background: "var(--gradient-sunset)" }}
            >
              {i + 1}
            </span>
            <p className="pt-0.5 text-sm leading-relaxed text-[var(--color-ink-soft)]">{step}</p>
          </li>
        );
      })}
    </ol>
  );
}

/* — KeyInsight — a soft-tinted callout for a takeaway ——————————— */
export function KeyInsight({ children, label = "Key insight" }: { children: ReactNode; label?: string }) {
  return (
    <aside
      className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-blush-deep)]/60 border-l-[3px] border-l-[var(--color-rose)] p-4 shadow-[var(--shadow-soft)]"
      style={{ background: "color-mix(in srgb, var(--color-rose) 16%, var(--color-cream-soft))" }}
    >
      <div className="flex gap-3">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-cream-soft)] text-[var(--color-rose-dark)]"
          aria-hidden="true"
        >
          <Lightbulb size={16} strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="font-[var(--font-display)] text-xs font-bold uppercase tracking-wide text-[var(--color-rose-dark)]">
            {label}
          </p>
          <p className="mt-0.5 text-sm leading-relaxed text-[var(--color-ink)]">{children}</p>
        </div>
      </div>
    </aside>
  );
}

/* — Testimonial — quote block with a decorative sunset quote mark —— */
export function Testimonial({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <figure className="card-warm relative overflow-hidden border-l-[3px] border-l-[var(--color-rose)] p-5 sm:p-6">
      <Quote
        size={64}
        strokeWidth={1}
        className="pointer-events-none absolute -right-2 -top-3 text-[var(--color-rose)] opacity-15"
        aria-hidden="true"
      />
      <blockquote className="relative text-[15px] italic leading-relaxed text-[var(--color-ink)]">
        {quote}
      </blockquote>
      <figcaption className="relative mt-3 text-sm font-semibold text-[var(--color-rose-dark)]">
        {author}
        <span className="ml-1.5 font-normal text-[var(--color-ink-soft)]">{role}</span>
      </figcaption>
    </figure>
  );
}

/* — TagPill — soft warm category pill —————————————————————————— */
export function TagPill({ children }: { children: ReactNode }) {
  return <span className="tag-warm px-2.5 py-0.5 text-[11px] font-medium">{children}</span>;
}

/* — ToolChip — outlined tool token with its brand mark ————————— */
export function ToolChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-blush-deep)] px-3 py-1 text-xs font-medium text-[var(--color-ink)]">
      {typeof children === "string" && <ToolLogo name={children} size={13} className="text-[var(--color-rose-dark)]" />}
      {children}
    </span>
  );
}

/* — GalleryTile — screenshot (or gradient fallback) + caption ——— */
export function GalleryTile({
  gradient,
  icon: Icon,
  caption,
  image,
  fit = "cover",
}: {
  gradient: [string, string];
  icon: IconType;
  caption: string;
  image?: string;
  fit?: "cover" | "contain";
}) {
  return (
    <figure className="card-warm card-lift flex h-full flex-col overflow-hidden">
      {image ? (
        <img
          src={image}
          alt={caption}
          loading="lazy"
          className={`h-56 w-full bg-[var(--color-blush)] ${
            fit === "contain" ? "object-contain p-2" : "object-cover object-top"
          }`}
        />
      ) : (
        <div
          className="flex h-28 items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}
          aria-hidden="true"
        >
          <Icon size={26} strokeWidth={1.75} style={{ color: "var(--color-on-sunset)" }} className="opacity-80" />
        </div>
      )}
      <figcaption className="mt-auto bg-[var(--color-cream-soft)] px-3 py-2 text-xs text-[var(--color-ink-soft)]">
        {caption}
      </figcaption>
    </figure>
  );
}

/* — PhoneScreen — a portrait mockup on its project-gradient backdrop —— */
export function PhoneScreen({
  image,
  caption,
  gradient,
}: {
  image: string;
  caption: string;
  gradient: [string, string];
}) {
  return (
    <figure className="w-44 shrink-0 snap-center sm:w-48">
      <div
        className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-blush-deep)]/50 shadow-[var(--shadow-card)] transition duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
        style={{ background: `linear-gradient(165deg, ${gradient[0]}2e, ${gradient[1]}52)` }}
      >
        {/* soft glow behind the device */}
        <span
          className="pointer-events-none absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-2xl"
          style={{ background: `linear-gradient(140deg, ${gradient[0]}, ${gradient[1]})` }}
          aria-hidden="true"
        />
        <img
          src={image}
          alt={caption}
          loading="lazy"
          className="relative aspect-[9/17] w-full object-contain px-3 py-4 drop-shadow-lg"
        />
      </div>
      <figcaption className="mt-2 px-1 text-center text-xs leading-snug text-[var(--color-ink-soft)]">
        {caption}
      </figcaption>
    </figure>
  );
}

/* — ScreenRail — horizontally snapping strip of PhoneScreens ————— */
export function ScreenRail({ children }: { children: ReactNode }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
      <div className="flex w-max min-w-full snap-x snap-mandatory justify-center gap-4 sm:gap-5">
        {children}
      </div>
    </div>
  );
}

/* — CaseStudyHero — banner with image (or icon), tags, title & meta — */
export function CaseStudyHero({
  gradient,
  icon: Icon,
  tags,
  title,
  meta,
  image,
  imageFit = "cover",
}: {
  gradient: [string, string];
  icon: IconType;
  tags: string[];
  title: string;
  meta: string;
  image?: string;
  imageFit?: "cover" | "contain";
}) {
  return (
    <div className="mb-6">
      <div
        className="relative flex h-40 items-center justify-center overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-card)] sm:h-64"
        style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}
      >
        {image ? (
          <img
            src={image}
            alt=""
            className={`absolute inset-0 h-full w-full ${
              imageFit === "contain" ? "object-contain py-3" : "object-cover"
            }`}
          />
        ) : (
          <>
            {/* soft light bloom in the corner for depth */}
            <span
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full"
              style={{ background: "color-mix(in srgb, var(--color-cream-soft) 40%, transparent)", filter: "blur(24px)" }}
              aria-hidden="true"
            />
            <Icon size={56} strokeWidth={1.5} style={{ color: "var(--color-on-sunset)" }} className="relative opacity-80" />
          </>
        )}
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <TagPill key={t}>{t}</TagPill>
        ))}
      </div>
      <h1 className="mt-2 font-[var(--font-display)] text-2xl font-bold text-[var(--color-ink)] sm:text-3xl">
        {title}
      </h1>
      <p className="mt-1 font-[var(--font-mono)] text-xs text-[var(--color-ink-soft)]">{meta}</p>
    </div>
  );
}
