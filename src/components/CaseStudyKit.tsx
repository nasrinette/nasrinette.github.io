import { Fragment, type ReactNode } from "react";
import { ArrowRight, CalendarDays, Frown, ImageIcon, Sparkles, Target, UserRound } from "lucide-react";
import type { Comparison, FlowStep, Persona, ProcessStep } from "../types";
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
  // roomy rhythm: the sections mix text with big visual blocks (stickies,
  // showcases, quotes), and those need air between them to read as groups
  return <div className="animate-pop-in space-y-5 py-1 text-[17px] text-[var(--color-ink)]">{children}</div>;
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
      <CatAvatar size={30} />
      <span
        className="h-7 w-1.5 shrink-0 rounded-full"
        style={{ background: "var(--color-rose)" }}
        aria-hidden="true"
      />
      {/* number merged into the title: one h2 in the same display font, size,
          and weight, so "01 Problem" reads as a single heading, not a small
          tag beside a big title */}
      <h2 className="font-[var(--font-display)] text-[26px] font-bold text-[var(--color-ink)] sm:text-[30px]">
        {eyebrow && <>{eyebrow}{" "}</>}
        {children}
      </h2>
    </div>
  );
}

/* — FlowDiagram — how the product is used, as steps joined by arrows. One
   picture instead of a paragraph: each node is an icon badge, a short label,
   and an optional example line. Stacks vertically on narrow screens. ————— */
export function FlowDiagram({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="flex flex-col items-center gap-2 py-2 sm:flex-row sm:items-start sm:justify-start sm:gap-1">
      {steps.map((step, i) => (
        <Fragment key={step.label}>
          {i > 0 && (
            <ArrowRight
              size={20}
              strokeWidth={2}
              aria-hidden="true"
              className="shrink-0 rotate-90 text-[var(--color-rose)] sm:mt-3.5 sm:rotate-0"
            />
          )}
          <div className="flex w-40 flex-col items-center gap-1.5 text-center">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-on-sunset)] shadow-[var(--shadow-soft)]"
              style={{ background: "var(--color-rose)" }}
            >
              <step.icon size={20} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <p className="text-base font-bold leading-snug text-[var(--color-ink)]">{step.label}</p>
            {step.note && <p className="text-sm leading-snug text-[var(--color-ink-soft)]">{step.note}</p>}
          </div>
        </Fragment>
      ))}
    </div>
  );
}

/* — StickyNotes — short list items as notes pinned to the page: pastel
   squares, each slightly tilted, one thought per note. For pains, limits,
   and other lists that read heavier as bullets than they are. ——————————— */
export function StickyNotes({ notes }: { notes: string[] }) {
  // fixed pastel paper with fixed dark ink: a sticky note is a physical
  // object, so it keeps its colour in both themes (like the phone bezel)
  const papers = ["#fbe9c0", "#f9dcd4", "#ecdfec", "#dcebd9"];
  const tilts = ["-1.5deg", "1.2deg", "-0.8deg", "1.6deg"];
  return (
    <ul className="flex flex-wrap gap-4 py-2">
      {notes.map((note, i) => (
        <li
          key={note}
          className="flex min-h-28 w-44 items-center rounded-[4px] p-3.5 text-[15px] font-semibold leading-snug shadow-[var(--shadow-card)]"
          style={{
            background: papers[i % papers.length],
            color: "#4a3a2b",
            transform: `rotate(${tilts[i % tilts.length]})`,
          }}
        >
          {note}
        </li>
      ))}
    </ul>
  );
}

/* — FactList — the overview's vital signs: Role, Timeline, Outcome. Each
   fact wears a small icon badge so the row reads as UI, not a line of
   text; still no boxes around the facts themselves. ————————————————————— */
function factIcon(label: string) {
  const lower = label.toLowerCase();
  if (lower.includes("target") || lower.includes("audience")) return Target;
  if (lower.includes("role") || lower.includes("team")) return UserRound;
  if (lower.includes("time") || lower.includes("date") || lower.includes("year")) return CalendarDays;
  return Sparkles;
}

export function FactList({ facts }: { facts: { label: string; value: string }[] }) {
  const renderFact = (f: { label: string; value: string }) => {
    const Icon = factIcon(f.label);
    return (
      <div key={f.label} className="flex items-center gap-2.5">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-blush)] text-[var(--color-rose-dark)]"
          aria-hidden="true"
        >
          <Icon size={16} strokeWidth={2} />
        </span>
        <div>
          <dt className="font-[var(--font-mono)] text-[12px] font-medium uppercase tracking-[0.14em] text-[var(--color-ink-soft)]/80">
            {f.label}
          </dt>
          <dd className="mt-0.5 text-[15px] font-semibold text-[var(--color-ink)]">{f.value}</dd>
        </div>
      </div>
    );
  };

  // exactly three facts get a fixed shape: the first two stack on the left,
  // the third sits to their right, centred between them. The third column
  // spans both rows, so Outcome stands alone beside Role over the middle fact.
  if (facts.length === 3) {
    return (
      <dl className="grid w-fit grid-cols-[auto_auto] gap-x-10 gap-y-3">
        {renderFact(facts[0])}
        <div className="row-span-2 self-center">{renderFact(facts[2])}</div>
        {renderFact(facts[1])}
      </dl>
    );
  }

  return <dl className="flex flex-wrap gap-x-7 gap-y-3">{facts.map(renderFact)}</dl>;
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

/* — ProcessRail — the numbered timeline spine. Each item is a node joined to
   the next by one vertical rail, so every process subsection (research, a
   phase, V1, V2…) reads as one connected sequence. Owns the badge and the
   connecting line; each node supplies its own content. ————————————————————— */
export function ProcessRail({ items }: { items: ReactNode[] }) {
  const nodes = items.filter((n): n is ReactNode => Boolean(n));
  return (
    <ol className="relative">
      {nodes.map((node, i) => (
        <li key={i} className="relative flex gap-4 pb-7 last:pb-0">
          {i < nodes.length - 1 && (
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
          <div className="min-w-0 flex-1 space-y-3 pt-0.5 text-[17px] leading-relaxed text-[var(--color-ink-soft)]">
            {node}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* — StepLead — a process node's phase name, at the top of the node beside its
   number. Matches the rose mono labels used elsewhere. ————————————————————— */
export function StepLead({ children }: { children: ReactNode }) {
  return (
    <p className="font-[var(--font-mono)] text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-rose-dark)]">
      {children}
    </p>
  );
}

/* — ProcessStepBody — one phase step's evidence: bold-led text, optional
   sticky notes, and an optional board shown whole (click opens it in the
   artifact panel). Rendered as a node inside a ProcessRail. ————————————————— */
export function ProcessStepBody({
  step,
  activeSrc,
  onOpenImage,
}: {
  step: ProcessStep;
  activeSrc?: string;
  onOpenImage?: (src: string) => void;
}) {
  // compact window, whole board visible: the inline figure is a teaser (the
  // panel is where boards get read), so it stays small and never crops
  const figureFrame = (active: boolean) =>
    `flex w-full max-w-2xl flex-col overflow-hidden rounded-[var(--radius-md)] border bg-[var(--color-cream-soft)] shadow-[var(--shadow-card)] ${
      active ? "border-[var(--color-rose)] ring-1 ring-[var(--color-rose)]" : "border-[var(--color-blush-deep)]/70"
    }`;
  const figure = step.image && (
    <>
      <span className="flex items-center gap-1.5 border-b border-[var(--color-blush-deep)]/60 bg-[var(--color-blush)]/70 px-2.5 py-1.5">
        <span className="flex shrink-0 gap-1" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-rose)]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-dusk)]" />
        </span>
        {step.imageCaption && (
          <span className="min-w-0 truncate font-[var(--font-mono)] text-[12px] font-medium text-[var(--color-ink-soft)]">
            {step.imageCaption}
          </span>
        )}
      </span>
      <img src={step.image} alt={step.imageCaption ?? ""} loading="lazy" className="aspect-[16/10] w-full bg-[var(--color-blush)] object-contain p-1.5" />
    </>
  );
  return (
    <>
      {/* steps lead with a bolded phase name — Discover, Define… — so the
          shape of the process reads before any of the prose does */}
      <RichText text={step.text} />
      {step.notes && step.notes.length > 0 && <StickyNotes notes={step.notes} />}
      {step.image &&
        (onOpenImage ? (
          <button
            type="button"
            onClick={() => onOpenImage(step.image!)}
            aria-label={`View: ${step.imageCaption ?? "process board"}`}
            className={`${figureFrame(activeSrc === step.image)} focus-ring text-left transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]`}
          >
            {figure}
          </button>
        ) : (
          <div className={figureFrame(false)}>{figure}</div>
        ))}
    </>
  );
}

/* — ProcessTimeline — a bare phase timeline (Discover → Refine), the
   ProcessRail fed only phase steps. Kept for the design-system demo. ——————— */
export function ProcessTimeline({
  steps,
  activeSrc,
  onOpenImage,
}: {
  steps: (string | ProcessStep)[];
  activeSrc?: string;
  onOpenImage?: (src: string) => void;
}) {
  return (
    <ProcessRail
      items={steps.map((raw) => (
        <ProcessStepBody step={typeof raw === "string" ? { text: raw } : raw} activeSrc={activeSrc} onOpenImage={onOpenImage} />
      ))}
    />
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
    <div className="grid max-w-4xl gap-4 md:grid-cols-2">
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


