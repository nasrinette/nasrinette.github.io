import { useState } from "react";
import type { ReactNode } from "react";
import {
  colorTokens,
  elevationScale,
  principles,
  radiusScale,
  spacingScale,
  typeScale,
} from "../data/designSystem";
import { projects } from "../data/projects";
import { starterPrompts } from "../data/prompts";
import type { ThemeMode } from "../hooks/useTheme";
import { ArtifactChip, ArtifactCollage } from "./Artifact";
import CatAvatar from "./CatAvatar";
import ChatInput from "./ChatInput";
import ConfirmDialog from "./ConfirmDialog";
import { ContactIcons } from "./ContactCard";
import ProjectCard from "./ProjectCard";
import PromptChips from "./PromptChips";
import RichText from "./RichText";
import ThemeToggle from "./ThemeToggle";
import TypingIndicator from "./TypingIndicator";
import {
  LolaTurn,
  MetricRow,
  PersonaCard,
  ProcessTimeline,
  SectionHeading,
  TagPill,
  Testimonial,
  ToolChip,
  UserTurn,
} from "./CaseStudyKit";

/* Demos use real portfolio content — Protoca's metrics, personas, and gallery,
   the real starter prompts — never invented stand-ins: the system is shown
   doing its actual job. */
const demoProject = projects.find((p) => p.id === "interactive-menu") ?? projects[0];
const demoTestimonial = projects.map((p) => p.testimonial).find(Boolean);
const demoClips = demoProject.gallery.filter((b) => b.video).length;
const demoScreens = demoProject.gallery.filter((b) => b.image).length - demoClips;
const noop = () => {};

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <h2 className="font-[var(--font-display)] text-xl font-bold text-[var(--color-ink)]">{children}</h2>
      <span className="sunset-rule flex-1 opacity-40" aria-hidden="true" />
    </div>
  );
}

export default function DesignSystemView() {
  const [dialogOpen, setDialogOpen] = useState(false);
  // local, cosmetic mode so the doc shows the cycle without touching the app theme
  const [demoTheme, setDemoTheme] = useState<ThemeMode>("light");
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-12">
      <header className="mb-12 space-y-3">
        <p className="font-[var(--font-mono)] text-[13px] font-medium uppercase tracking-[0.2em] text-[var(--color-rose-dark)]">
          Sunset · design system
        </p>
        <h1 className="font-[var(--font-display)] text-[32px] font-bold text-[var(--color-ink)] sm:text-[38px]">
          One accent, used with intent
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-[var(--color-ink-soft)]">
          This chat interface is itself a small design system: warm sunset colors over dusk creams,
          all flat fills. Here's everything it's built from: color, type, space, elevation, and the
          principles that hold them together.
        </p>
      </header>

      <section className="mb-12">
        <SectionTitle>Color</SectionTitle>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {colorTokens.map((c) => (
            <div key={c.varName} className="card-warm overflow-hidden">
              <div className="h-16" style={{ background: `var(${c.varName})` }} aria-hidden="true" />
              <div className="p-3">
                <p className="text-sm font-bold text-[var(--color-ink)]">{c.name}</p>
                <p className="font-[var(--font-mono)] text-[12px] text-[var(--color-ink-soft)]">
                  {c.light} <span className="opacity-50">/</span> {c.dark}
                </p>
                <p className="mt-1 text-[12px] leading-snug text-[var(--color-ink-soft)]">{c.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <SectionTitle>Typography</SectionTitle>
        <div className="card-warm divide-y divide-[var(--color-blush-deep)]/50">
          {typeScale.map((t) => (
            <div key={t.name} className="flex items-center gap-4 px-4 py-3">
              <span
                className="w-10 shrink-0 text-[var(--color-ink)]"
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
                <p className="text-sm font-bold text-[var(--color-ink)]">{t.name}</p>
                <p className="font-[var(--font-mono)] text-[13px] text-[var(--color-ink-soft)]">
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
                <span className="w-16 shrink-0 font-[var(--font-mono)] text-[13px] text-[var(--color-ink-soft)]">
                  {s.token}
                </span>
                <span
                  className="block h-3 rounded-[var(--radius-sm)]"
                  style={{ width: s.px, background: "var(--color-rose)" }}
                  aria-hidden="true"
                />
                <span className="font-[var(--font-mono)] text-[13px] text-[var(--color-ink-soft)]">{s.px}px</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionTitle>Radius</SectionTitle>
          <div className="card-warm space-y-2 p-4">
            {radiusScale.map((r) => (
              <div key={r.token} className="flex items-center gap-3">
                <span className="w-20 shrink-0 font-[var(--font-mono)] text-[13px] text-[var(--color-ink-soft)]">
                  {r.token}
                </span>
                <span
                  className="block h-6 w-10 border-2 border-[var(--color-rose)]"
                  style={{ borderRadius: Math.min(r.px, 20) }}
                  aria-hidden="true"
                />
                <span className="font-[var(--font-mono)] text-[13px] text-[var(--color-ink-soft)]">
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
                className="mb-3 h-16 rounded-[var(--radius-lg)] bg-[var(--color-cream-soft)]"
                style={{ boxShadow: `var(--${e.token})` }}
                aria-hidden="true"
              />
              <p className="text-sm font-bold text-[var(--color-ink)]">{e.label}</p>
              <p className="mt-0.5 text-[12px] leading-snug text-[var(--color-ink-soft)]">{e.usage}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <SectionTitle>Components</SectionTitle>
        <div className="space-y-8">
          <div>
            <p className="mb-3 font-[var(--font-mono)] text-[12px] uppercase tracking-wide text-[var(--color-ink-soft)]">
              Essentials: buttons, tag, avatar, typing, theme, contact
            </p>
            <div className="card-warm flex flex-wrap items-center gap-3 p-5">
              <button type="button" className="btn-pastel px-4 py-2 font-[var(--font-display)] text-base font-semibold">
                Primary button
              </button>
              <button type="button" className="btn-ghost px-4 py-2 font-[var(--font-display)] text-base font-semibold">
                Secondary button
              </button>
              <TagPill>AI</TagPill>
              <CatAvatar size={30} />
              <TypingIndicator />
              <ThemeToggle mode={demoTheme} onChange={setDemoTheme} />
              <ContactIcons size="sm" />
            </div>
          </div>

          <div>
            <p className="mb-3 font-[var(--font-mono)] text-[12px] uppercase tracking-wide text-[var(--color-ink-soft)]">
              Chat turns: the user keeps a bubble, Lola speaks straight on the page
            </p>
            <div className="space-y-3">
              <UserTurn>Tell me about the {demoProject.title} case study.</UserTurn>
              <LolaTurn>
                <div className="text-base">
                  <RichText text={"**A bold lead carries the idea**, with *stress* where it matters.\n\n- Bullets for flows\n- One move per line"} />
                </div>
              </LolaTurn>
            </div>
          </div>

          <div>
            <p className="mb-3 font-[var(--font-mono)] text-[12px] uppercase tracking-wide text-[var(--color-ink-soft)]">
              Suggestion chips: docked above the composer, questions and navigation in one row
            </p>
            <PromptChips
              chips={[starterPrompts[0].label, starterPrompts[2].label]}
              navChips={[{ label: "View full profile →", view: "profile" }]}
              onSelect={noop}
              onNavigate={noop}
            />
          </div>

          <div>
            <p className="mb-3 font-[var(--font-mono)] text-[10px] uppercase tracking-wide text-[var(--color-ink-soft)]">
              Composer: the input with its square send button, always the field's height
            </p>
            <ChatInput onSend={noop} disabled={false} />
          </div>

          <div>
            <p className="mb-3 font-[var(--font-mono)] text-[12px] uppercase tracking-wide text-[var(--color-ink-soft)]">
              Project card: the chat carousel unit
            </p>
            <ProjectCard project={demoProject} onLearnMore={noop} />
          </div>

          <div>
            <p className="mb-3 font-[var(--font-mono)] text-[12px] uppercase tracking-wide text-[var(--color-ink-soft)]">
              Artifact chip & collage: width-capped chip whose Open jumps straight to fullscreen
            </p>
            <div className="space-y-4">
              <ArtifactChip
                title={demoProject.title}
                subtitle={[demoClips > 0 ? "demo" : null, `${demoScreens} screens`].filter(Boolean).join(" · ")}
                image={demoProject.cover}
                video={demoClips > 0}
                gradient={demoProject.gradient}
                icon={demoProject.icon}
                onOpen={noop}
              />
              <ArtifactCollage blocks={demoProject.gallery.slice(0, 4)} onOpen={noop} />
            </div>
          </div>

          <div>
            <p className="mb-3 font-[var(--font-mono)] text-[12px] uppercase tracking-wide text-[var(--color-ink-soft)]">
              Confirm dialog: the app's own voice for destructive actions
            </p>
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
          </div>
        </div>
      </section>

      <section className="mb-12">
        <SectionTitle>Case study elements</SectionTitle>
        <p className="mb-5 max-w-xl text-base leading-relaxed text-[var(--color-ink-soft)]">
          The composable blocks a case study is built from, each one owned here and reused verbatim in
          every write-up, so the story always looks like the system.
        </p>

        <div className="space-y-8">
          <div className="card-warm p-5">
            <p className="mb-3 font-[var(--font-mono)] text-[12px] uppercase tracking-wide text-[var(--color-ink-soft)]">
              Section heading
            </p>
            <SectionHeading eyebrow="03">Process</SectionHeading>
          </div>

          <div>
            <p className="mb-3 font-[var(--font-mono)] text-[12px] uppercase tracking-wide text-[var(--color-ink-soft)]">
              Metric row: {demoProject.title}'s real results
            </p>
            <MetricRow metrics={demoProject.results} />
          </div>

          <div>
            <p className="mb-3 font-[var(--font-mono)] text-[12px] uppercase tracking-wide text-[var(--color-ink-soft)]">
              Process timeline: bold phase leads, from {demoProject.title}
            </p>
            <div className="card-warm p-5">
              <ProcessTimeline steps={demoProject.process.slice(0, 3)} />
            </div>
          </div>

          <div>
            <p className="mb-3 font-[var(--font-mono)] text-[12px] uppercase tracking-wide text-[var(--color-ink-soft)]">
              Persona card: a real research persona
            </p>
            {demoProject.personas?.[0] && <PersonaCard persona={demoProject.personas[0]} />}
          </div>

          {demoTestimonial && (
            <div>
              <p className="mb-3 font-[var(--font-mono)] text-[12px] uppercase tracking-wide text-[var(--color-ink-soft)]">
                Testimonial
              </p>
              <Testimonial {...demoTestimonial} />
            </div>
          )}

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2">
              <span className="font-[var(--font-mono)] text-[12px] uppercase tracking-wide text-[var(--color-ink-soft)]">
                Tags
              </span>
              <TagPill>Fintech</TagPill>
              <TagPill>0→1</TagPill>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-[var(--font-mono)] text-[12px] uppercase tracking-wide text-[var(--color-ink-soft)]">
                Tools
              </span>
              <ToolChip>Figma</ToolChip>
              <ToolChip>Maze</ToolChip>
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>Principles</SectionTitle>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="card-warm p-4">
              <p className="text-base font-bold text-[var(--color-ink)]">{p.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--color-ink-soft)]">{p.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
