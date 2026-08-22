import { useState } from "react";
import type { ReactNode } from "react";
import { ArrowUp, ImageIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  brandMarks,
  colorTokens,
  contentIcons,
  demo,
  demoProject,
  elevationScale,
  interfaceIcons,
  motionTokens,
  principles,
  radiusScale,
  spacingScale,
  typeScale,
} from "../data/designSystem";
import type { ThemeMode } from "../hooks/useTheme";
import { ArtifactChip, ArtifactShowcase, Lightbox, WindowChrome } from "./Artifact";
import CatAvatar from "./CatAvatar";
import ChatInput from "./ChatInput";
import ConfirmDialog from "./ConfirmDialog";
import { ContactIcons } from "./ContactCard";
import ProjectCard from "./ProjectCard";
import PromptChips from "./PromptChips";
import Reveal from "./Reveal";
import RichText from "./RichText";
import ThemeToggle from "./ThemeToggle";
import ToolLogo from "./ToolLogo";
import TypingIndicator from "./TypingIndicator";
import {
  ComparisonFigure,
  Eyebrow,
  FactList,
  FlowDiagram,
  LolaTurn,
  MetricStat,
  PersonaCard,
  ProcessTimeline,
  SectionHeading,
  StickyNotes,
  TagPill,
  Testimonial,
  ToolChip,
  UserTurn,
} from "./CaseStudyKit";

const noop = () => {};

/* — TierHeading — the four atomic layers, plus Principles. Eyebrow + title,
   no prose. ————————————————————————————————————————————————————————————————— */
function TierHeading({ index, title }: { index?: string; title: string }) {
  return (
    <Reveal variant="fade" className="mb-6 mt-16 border-t border-[var(--border)]/50 pt-8 first:mt-0 first:border-0 first:pt-0">
      {index && (
        <p className="font-[var(--font-mono)] text-[13px] font-medium uppercase tracking-[0.2em] text-[var(--text-emphasis)]">
          {index}
        </p>
      )}
      <h2 className="mt-1 font-[var(--font-display)] text-[26px] font-bold text-[var(--text)] sm:text-[30px]">
        {title}
      </h2>
    </Reveal>
  );
}

/* — SectionTitle — a sub-heading inside a tier, with a trailing rule. ————— */
function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <Reveal variant="fade" className="mb-4 flex items-center gap-3">
      <h3 className="font-[var(--font-display)] text-xl font-bold text-[var(--text)]">{children}</h3>
      <span className="sunset-rule flex-1 opacity-40" aria-hidden="true" />
    </Reveal>
  );
}

/* — Specimen — a mono label above one live component. No box of its own, so a
   carded component never sits inside a second card. ————————————————————————— */
function Specimen({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Reveal>
      <p className="mb-3 font-[var(--font-mono)] text-[12px] uppercase tracking-wide text-[var(--text-secondary)]">
        {label}
      </p>
      {children}
    </Reveal>
  );
}

/* — AtomCell — one small atom with a caption under it, laid out in a wrap. — */
function AtomCell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex min-h-[44px] items-center">{children}</div>
      <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-wide text-[var(--text-secondary)]">
        {label}
      </span>
    </div>
  );
}

/* — IconCell — one glyph over its name, for the icon inventory grids. —————— */
function IconCell({ name, Icon }: { name: string; Icon: LucideIcon }) {
  return (
    <div className="flex flex-col items-center gap-1.5 py-2 text-center">
      <Icon size={20} strokeWidth={1.75} className="text-[var(--text)]" aria-hidden="true" />
      <span className="w-full truncate font-[var(--font-mono)] text-[11px] text-[var(--text-secondary)]">{name}</span>
    </div>
  );
}

const iconGrid = "grid grid-cols-3 gap-1 sm:grid-cols-5 md:grid-cols-6";

export default function DesignSystemView({ themeMode }: { themeMode: ThemeMode }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [artifactOpen, setArtifactOpen] = useState(false);
  // local, cosmetic mode so the doc shows the toggle without touching the app theme
  const [demoTheme, setDemoTheme] = useState<ThemeMode>("light");

  return (
    <div className="mx-auto max-w-6xl px-3 py-8 sm:px-6 sm:py-12">
      <header className="mb-12 space-y-3">
        <p className="font-[var(--font-mono)] text-[13px] font-medium uppercase tracking-[0.2em] text-[var(--text-emphasis)]">
          Sunset · design system
        </p>
        <h1 className="font-[var(--font-display)] text-[32px] font-bold text-[var(--text)] sm:text-[38px]">
          Built up in four layers
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
          The parts this chat interface is built from, smallest to largest. Every demo uses placeholder content.
        </p>
      </header>

      {/* ============================================================
          LAYER 01 — FOUNDATIONS
          ============================================================ */}
      <TierHeading index="Layer 01" title="Foundations" />

      <section className="mb-12">
        <SectionTitle>Color</SectionTitle>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {colorTokens.map((c) => (
            <div key={c.varName} className="card-warm overflow-hidden">
              <div className="h-16" style={{ background: `var(${c.varName})` }} aria-hidden="true" />
              <div className="p-3">
                <p className="text-sm font-bold text-[var(--text)]">{c.name}</p>
                <p className="font-[var(--font-mono)] text-[12px] text-[var(--text-secondary)]">
                  {themeMode === "dark" ? c.dark : c.light}
                </p>
                <p className="mt-1 text-[12px] leading-snug text-[var(--text-secondary)]">{c.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <SectionTitle>Typography</SectionTitle>
        <div className="card-warm divide-y divide-[var(--border)]/50">
          {typeScale.map((t) => (
            <div key={t.name} className="flex items-center gap-4 px-4 py-3">
              <span
                className="w-10 shrink-0 text-[var(--text)]"
                style={{
                  fontFamily:
                    t.family === "Quicksand"
                      ? "var(--font-display)"
                      : t.family === "JetBrains Mono"
                        ? "var(--font-mono)"
                        : "var(--font-body)",
                  fontWeight: Number(t.weight),
                  fontSize: t.name === "Display" ? 26 : t.name === "Heading" ? 19 : 16,
                }}
              >
                {t.sample}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-[var(--text)]">{t.name}</p>
                <p className="font-[var(--font-mono)] text-[13px] text-[var(--text-secondary)]">
                  {t.family} · {t.weight} · {t.size}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <SectionTitle>Spacing</SectionTitle>
          <div className="card-warm space-y-2 p-4">
            {spacingScale.map((s) => (
              <div key={s.token} className="flex items-center gap-3">
                <span className="w-16 shrink-0 font-[var(--font-mono)] text-[13px] text-[var(--text-secondary)]">
                  {s.token}
                </span>
                <span
                  className="block h-3 rounded-[var(--radius-sm)]"
                  style={{ width: s.px, background: "var(--primary)" }}
                  aria-hidden="true"
                />
                <span className="font-[var(--font-mono)] text-[13px] text-[var(--text-secondary)]">{s.px}px</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionTitle>Radius</SectionTitle>
          <div className="card-warm space-y-2 p-4">
            {radiusScale.map((r) => (
              <div key={r.token} className="flex items-center gap-3">
                <span className="w-20 shrink-0 font-[var(--font-mono)] text-[13px] text-[var(--text-secondary)]">
                  {r.token}
                </span>
                <span
                  className="block h-6 w-10 border-2 border-[var(--primary)]"
                  style={{ borderRadius: Math.min(r.px, 20) }}
                  aria-hidden="true"
                />
                <span className="font-[var(--font-mono)] text-[13px] text-[var(--text-secondary)]">
                  {r.px === 999 ? "full" : `${r.px}px`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <SectionTitle>Elevation</SectionTitle>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {elevationScale.map((e) => (
            <div key={e.token} className="text-center">
              <div
                className="mb-3 h-16 rounded-[var(--radius-lg)] bg-[var(--surface)]"
                style={{ boxShadow: `var(--${e.token})` }}
                aria-hidden="true"
              />
              <p className="text-sm font-bold text-[var(--text)]">{e.label}</p>
              <p className="mt-0.5 text-[12px] leading-snug text-[var(--text-secondary)]">{e.usage}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <SectionTitle>Motion</SectionTitle>
        <div className="card-warm divide-y divide-[var(--border)]/50">
          {motionTokens.map((m) => (
            <div key={m.name} className="flex items-center gap-4 px-4 py-3">
              <span className="w-20 shrink-0 font-[var(--font-mono)] text-[13px] text-[var(--text-emphasis)]">
                {m.value}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-[var(--text)]">{m.name}</p>
                <p className="text-[13px] leading-snug text-[var(--text-secondary)]">{m.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <SectionTitle>Icons</SectionTitle>
        <div className="space-y-6">
          <Specimen label="Interface">
            <div className={iconGrid}>
              {interfaceIcons.map((i) => (
                <IconCell key={i.name} name={i.name} Icon={i.Icon} />
              ))}
            </div>
          </Specimen>
          <Specimen label="Content">
            <div className={iconGrid}>
              {contentIcons.map((i) => (
                <IconCell key={i.name} name={i.name} Icon={i.Icon} />
              ))}
            </div>
          </Specimen>
          <Specimen label="Brand marks">
            <div className={iconGrid}>
              {brandMarks.map((name) => (
                <div key={name} className="flex flex-col items-center gap-1.5 py-2 text-center">
                  <ToolLogo name={name} size={20} className="text-[var(--text)]" />
                  <span className="w-full truncate font-[var(--font-mono)] text-[11px] text-[var(--text-secondary)]">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </Specimen>
        </div>
      </section>

      {/* ============================================================
          LAYER 02 — ATOMS
          ============================================================ */}
      <TierHeading index="Layer 02" title="Atoms" />

      <section className="mb-4">
        <div className="flex flex-wrap gap-x-10 gap-y-7">
          <AtomCell label="Primary button">
            <button type="button" className="btn-pastel px-4 py-2 font-[var(--font-display)] text-base font-semibold">
              Primary
            </button>
          </AtomCell>
          <AtomCell label="Secondary button">
            <button type="button" className="btn-ghost px-4 py-2 font-[var(--font-display)] text-base font-semibold">
              Secondary
            </button>
          </AtomCell>
          <AtomCell label="Send button">
            <span className="btn-pastel flex h-11 w-11 items-center justify-center" aria-hidden="true">
              <ArrowUp size={18} strokeWidth={2} />
            </span>
          </AtomCell>
          <AtomCell label="Suggestion chip">
            <button type="button" className="btn-pastel px-3.5 py-1.5 font-[var(--font-display)] text-sm font-semibold">
              Suggestion
            </button>
          </AtomCell>
          <AtomCell label="Tag">
            <TagPill>Sample</TagPill>
          </AtomCell>
          <AtomCell label="Tool chip">
            <ToolChip>Figma</ToolChip>
          </AtomCell>
          <AtomCell label="Eyebrow label">
            <Eyebrow>Section label</Eyebrow>
          </AtomCell>
          <AtomCell label="Theme toggle">
            <ThemeToggle mode={demoTheme} onChange={setDemoTheme} />
          </AtomCell>
          <AtomCell label="Lola avatar">
            <CatAvatar size={42} />
          </AtomCell>
          <AtomCell label="Typing indicator">
            <TypingIndicator />
          </AtomCell>
          <AtomCell label="Contact icons">
            <ContactIcons size="sm" />
          </AtomCell>
        </div>
      </section>

      {/* ============================================================
          LAYER 03 — MOLECULES
          ============================================================ */}
      <TierHeading index="Layer 03" title="Molecules" />

      <section className="mb-4 space-y-8">
        <Specimen label="Chat turns">
          <div className="space-y-3">
            <UserTurn>A short question from the visitor.</UserTurn>
            <LolaTurn>
              <div className="text-base">
                <RichText text={demo.richText} />
              </div>
            </LolaTurn>
          </div>
        </Specimen>

        <Specimen label="Prompt chips">
          <PromptChips
            chips={demo.chips}
            navChips={[{ label: `${demo.navLabel} →`, view: "profile" }]}
            onSelect={noop}
            onNavigate={noop}
          />
        </Specimen>

        <Specimen label="Section heading">
          <SectionHeading eyebrow="03">Process</SectionHeading>
        </Specimen>

        <Specimen label="Window frame">
          <div className="flex w-full max-w-md flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)]/70 bg-[var(--surface)] shadow-[var(--shadow-card)]">
            <WindowChrome caption="Placeholder caption" />
            <span
              className="flex aspect-[16/10] w-full items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${demo.gradient[0]}, ${demo.gradient[1]})` }}
            >
              <ImageIcon size={22} strokeWidth={1.5} style={{ color: "var(--text-on-primary)" }} className="opacity-70" aria-hidden="true" />
            </span>
          </div>
        </Specimen>

        <Specimen label="Metric stat">
          <div className="w-40">
            <MetricStat value={demo.metric.value} label={demo.metric.label} />
          </div>
        </Specimen>

        <Specimen label="Fact list">
          <FactList facts={demo.facts} />
        </Specimen>

        <Specimen label="Sticky notes">
          <StickyNotes notes={demo.notes} />
        </Specimen>

        <Specimen label="Flow diagram">
          <FlowDiagram steps={demo.flow} />
        </Specimen>

        <Specimen label="Persona card">
          <PersonaCard persona={demo.persona} />
        </Specimen>

        <Specimen label="Testimonial">
          <Testimonial {...demo.testimonial} />
        </Specimen>

        <Specimen label="Comparison figure">
          <ComparisonFigure comparison={demo.comparison} gradient={demo.gradient} />
        </Specimen>

        <Specimen label="Process timeline">
          <ProcessTimeline steps={demo.process} />
        </Specimen>
      </section>

      {/* ============================================================
          LAYER 04 — ORGANISMS
          ============================================================ */}
      <TierHeading index="Layer 04" title="Organisms" />

      <section className="mb-4 space-y-8">
        <Specimen label="Composer">
          <ChatInput onSend={noop} disabled={false} />
        </Specimen>

        <Specimen label="Project card">
          <ProjectCard project={demoProject} onLearnMore={noop} />
        </Specimen>

        <Specimen label="Artifact cover">
          {/* the case-study cover: click it or Open to zoom the artifact */}
          <ArtifactChip
            title="Sample Project"
            subtitle="3 screens · live preview"
            image={demo.placeholderImage}
            large
            gradient={demo.gradient}
            icon={demo.icon}
            active={artifactOpen}
            onOpen={() => setArtifactOpen(true)}
            onOpenFull={() => setArtifactOpen(true)}
            openLabel="Open"
          />
          {artifactOpen && (
            <Lightbox src={demo.placeholderImage} title="Sample Project" onClose={() => setArtifactOpen(false)} />
          )}
        </Specimen>

        <Specimen label="Artifact showcase">
          <ArtifactShowcase blocks={demo.showcaseBlocks} />
        </Specimen>

        <Specimen label="Confirm dialog">
          <button
            type="button"
            onClick={() => setDialogOpen(true)}
            className="btn-ghost px-4 py-2 font-[var(--font-display)] text-base font-semibold"
          >
            Preview the confirm dialog
          </button>
          <ConfirmDialog
            open={dialogOpen}
            title="Start a new conversation?"
            message="This clears your chat history with Lola. The case studies and profile stay right where they are."
            confirmLabel="Restart chat"
            onConfirm={() => setDialogOpen(false)}
            onCancel={() => setDialogOpen(false)}
          />
        </Specimen>
      </section>

      {/* ============================================================
          PRINCIPLES
          ============================================================ */}
      <TierHeading title="Principles" />
      <section>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="card-warm p-4">
              <p className="text-base font-bold text-[var(--text)]">{p.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{p.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
