import type { ReactNode } from "react";
import { ArrowRight, Frown, ImageIcon, Target } from "lucide-react";
import type { Comparison, Persona } from "../types";
import CatAvatar from "./CatAvatar";
import RichText from "./RichText";
import ToolLogo from "./ToolLogo";

/* ============================================================
   CASE STUDY KIT
   The reusable, sunset-styled building blocks that make up a
   case study. Owned by the design system, consumed by
   CaseStudyView and documented in DesignSystemView.
   ============================================================ */

/* — UserTurn / LolaTurn — chat bubbles a case study is told through ——— */
export function UserTurn({ children }: { children: ReactNode }) {
  return (
    <div className="flex animate-pop-in justify-end">
      <div className="bubble-sunset max-w-[85%] px-4 py-2.5 text-base sm:max-w-[75%]">{children}</div>
    </div>
  );
}

export function LolaTurn({ children }: { children: ReactNode }) {
  // no avatar column: Lola appears inline at the end of each section's
  // heading (see SectionHeading), so body copy aligns flush with the page
  // and both sides of the conversation share the same edges
  return <div className="animate-pop-in space-y-3 py-1 text-base text-[var(--color-ink)]">{children}</div>;
}

/* — Eyebrow — a small mono label above a heading ——————————— */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-[var(--font-mono)] text-[13px] font-medium uppercase tracking-[0.2em] text-[var(--color-rose-dark)]">
      {children}
    </p>
  );
}

/* — SectionHeading — one line: tick, eyebrow, title, then Lola at the end.
   She rides the heading instead of owning a column, so the copy below
   starts flush at the page edge. —————————————————————————————————— */
export function SectionHeading({ children, eyebrow }: { children: ReactNode; eyebrow?: ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2.5">
      <CatAvatar size={24} />
      <span
        className="h-5 w-1.5 shrink-0 rounded-full"
        style={{ background: "var(--color-rose)" }}
        aria-hidden="true"
      />
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-[var(--font-display)] text-xl font-bold text-[var(--color-ink)]">{children}</h2>
    </div>
  );
}

/* — MetricStat — headline result with a sunset cap ————————————— */
export function MetricStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="card-warm relative overflow-hidden p-4 pt-5 text-center">
      <span
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: "var(--color-rose)" }}
        aria-hidden="true"
      />
      <p className="font-[var(--font-display)] text-[22px] font-bold leading-tight text-[var(--color-rose-dark)]">
        {value}
      </p>
      <p className="mt-1.5 text-[13px] leading-snug text-[var(--color-ink-soft)]">{label}</p>
    </div>
  );
}

export function MetricRow({ metrics }: { metrics: { value: string; label: string }[] }) {
  // container-, not viewport-relative: the artifact panel steals width from this
  // column, so a wide window can still leave a narrow column. Sizing on the
  // viewport crams three cards into space that isn't there.
  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-3 @xs:grid-cols-2 @lg:grid-cols-3">
        {metrics.map((m) => (
          <MetricStat key={m.label} value={m.value} label={m.label} />
        ))}
      </div>
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
              className="relative z-10 flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-full font-[var(--font-mono)] text-sm font-bold text-[var(--color-on-sunset)] shadow-[var(--shadow-soft)]"
              style={{ background: "var(--color-rose)" }}
            >
              {i + 1}
            </span>
            {/* steps lead with a bolded phase name — Discover, Define… — so the
                shape of the process reads before any of the prose does */}
            <div className="pt-0.5 text-base leading-relaxed text-[var(--color-ink-soft)]">
              <RichText text={step} />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* — PersonaCard — a research persona: who we designed for ————————— */
export function PersonaCard({ persona }: { persona: Persona }) {
  const initials = persona.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <article className="card-warm flex h-full flex-col gap-3 p-4">
      <div className="flex items-center gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-[var(--font-display)] text-base font-bold text-[var(--color-on-sunset)] shadow-[var(--shadow-soft)]"
          style={{ background: "var(--color-rose)" }}
          aria-hidden="true"
        >
          {initials}
        </span>
        <div className="min-w-0">
          <p className="font-[var(--font-display)] text-base font-bold text-[var(--color-ink)]">{persona.name}</p>
          <p className="text-sm leading-snug text-[var(--color-ink-soft)]">{persona.descriptor}</p>
        </div>
      </div>
      <blockquote className="border-l-2 border-[var(--color-rose)] pl-2.5 text-[15px] italic leading-relaxed text-[var(--color-ink)]">
        “{persona.quote}”
      </blockquote>
      <div className="@container/persona space-y-3 @sm/persona:grid @sm/persona:grid-cols-2 @sm/persona:gap-4 @sm/persona:space-y-0">
        <div>
          <p className="flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-wide text-[var(--color-rose-dark)]">
            <Target size={12} strokeWidth={2} aria-hidden="true" /> Goals
          </p>
          <ul className="mt-1 space-y-1 text-sm leading-relaxed text-[var(--color-ink-soft)]">
            {persona.goals.map((g) => (
              <li key={g} className="flex gap-1.5">
                <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-gold)]" />
                {g}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-wide text-[var(--color-dusk)]">
            <Frown size={12} strokeWidth={2} aria-hidden="true" /> Frustrations
          </p>
          <ul className="mt-1 space-y-1 text-sm leading-relaxed text-[var(--color-ink-soft)]">
            {persona.frustrations.map((f) => (
              <li key={f} className="flex gap-1.5">
                <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-dusk)]" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export function PersonaGrid({ personas }: { personas: Persona[] }) {
  return (
    <div className="space-y-3">
      {personas.map((p) => (
        <PersonaCard key={p.name} persona={p} />
      ))}
    </div>
  );
}

/* — Testimonial — the user's voice, set as plain text: just a quote ——— */
export function Testimonial({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <figure className="border-l-2 border-[var(--color-rose)] py-0.5 pl-4">
      <blockquote className="text-[17px] italic leading-relaxed text-[var(--color-ink)]">“{quote}”</blockquote>
      <figcaption className="mt-1.5 text-sm text-[var(--color-ink-soft)]">
        <span className="font-semibold text-[var(--color-ink)]">{author}</span> · {role}
      </figcaption>
    </figure>
  );
}

/* — ComparisonFigure — one design iteration as a decision pair: before and
   after side by side, the why underneath as the caption. Sides with a
   screenshot open in the artifact panel when a handler is passed; sides
   without one render a placeholder frame until the shot exists, so the
   template can be authored before the images are. ——————————————————— */
export function ComparisonFigure({
  comparison,
  gradient,
  activeSrc,
  onOpenImage,
}: {
  comparison: Comparison;
  /** Tint for placeholder frames — the project's own gradient. */
  gradient: [string, string];
  activeSrc?: string;
  onOpenImage?: (src: string) => void;
}) {
  const sides = [
    { label: comparison.beforeLabel ?? "Before", image: comparison.before },
    { label: comparison.afterLabel ?? "After", image: comparison.after },
  ];
  const frame =
    "relative block w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-blush-deep)]/60";
  return (
    <figure>
      <div className="relative grid grid-cols-2 gap-3">
        {sides.map((side) => {
          const labelChip = (
            <span className="absolute left-2 top-2 z-10 rounded-[var(--radius-sm)] bg-[var(--color-cream-soft)]/90 px-2 py-0.5 font-[var(--font-mono)] text-[12px] font-medium text-[var(--color-ink-soft)] shadow-sm backdrop-blur-sm">
              {side.label}
            </span>
          );
          if (side.image && onOpenImage) {
            const image = side.image;
            return (
              <button
                key={side.label}
                type="button"
                onClick={() => onOpenImage(image)}
                aria-label={`View ${comparison.title}, ${side.label}`}
                className={`${frame} focus-ring transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] ${
                  activeSrc === image ? "border-[var(--color-rose)] ring-1 ring-[var(--color-rose)]" : ""
                }`}
              >
                {labelChip}
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  className="aspect-[16/10] w-full bg-[var(--color-blush)] object-cover object-top"
                />
              </button>
            );
          }
          return (
            <span key={side.label} className={frame}>
              {labelChip}
              {side.image ? (
                <img
                  src={side.image}
                  alt={`${comparison.title}, ${side.label}`}
                  loading="lazy"
                  className="aspect-[16/10] w-full bg-[var(--color-blush)] object-cover object-top"
                />
              ) : (
                <span
                  className="flex aspect-[16/10] w-full items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }}
                >
                  <ImageIcon
                    size={24}
                    strokeWidth={1.5}
                    style={{ color: "var(--color-on-sunset)" }}
                    className="opacity-70"
                    aria-hidden="true"
                  />
                </span>
              )}
            </span>
          );
        })}
        <span
          className="pointer-events-none absolute left-1/2 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-blush-deep)]/60 bg-[var(--color-cream-soft)] text-[var(--color-rose-dark)] shadow-[var(--shadow-card)]"
          aria-hidden="true"
        >
          <ArrowRight size={14} strokeWidth={2} />
        </span>
      </div>
      <figcaption className="mt-2 text-base leading-relaxed text-[var(--color-ink-soft)]">
        <span className="font-semibold text-[var(--color-ink)]">{comparison.title}.</span> {comparison.note}
      </figcaption>
    </figure>
  );
}

/* — TagPill — soft warm category pill —————————————————————————— */
export function TagPill({ children }: { children: ReactNode }) {
  return <span className="tag-warm px-2.5 py-0.5 text-[13px] font-medium">{children}</span>;
}

/* — ToolChip — outlined tool token with its brand mark ————————— */
export function ToolChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-blush-deep)] px-3 py-1 text-sm font-medium text-[var(--color-ink)]">
      {typeof children === "string" && <ToolLogo name={children} size={13} className="text-[var(--color-rose-dark)]" />}
      {children}
    </span>
  );
}


