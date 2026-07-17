import type { ReactNode } from "react";
import { Frown, Target } from "lucide-react";
import type { Persona } from "../types";
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
  return (
    <div className="flex animate-pop-in items-start gap-2">
      <CatAvatar size={30} className="mt-0.5" />
      <div className="min-w-0 max-w-full flex-1 space-y-3 rounded-[var(--radius-ui)] border border-[var(--color-blush-deep)]/60 bg-[var(--color-cream-soft)] px-4 py-3 text-base text-[var(--color-ink)] shadow-sm">
        {children}
      </div>
    </div>
  );
}

/* — Eyebrow — a small mono label above a heading ——————————— */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-[var(--font-mono)] text-[13px] font-medium uppercase tracking-[0.2em] text-[var(--color-rose-dark)]">
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
        <h2 className="font-[var(--font-display)] text-xl font-bold text-[var(--color-ink)]">{children}</h2>
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
              style={{ background: "var(--gradient-sunset)" }}
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
          style={{ background: "var(--gradient-sunset)" }}
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


