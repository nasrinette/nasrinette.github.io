import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "../types";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { ArtifactChip, ArtifactCollage, ArtifactPanel, ArtifactShowcase, Lightbox, type ArtifactImage } from "./Artifact";
import CatAvatar from "./CatAvatar";
import Reveal from "./Reveal";
import { StreamingText } from "./RichText";
import {
  ComparisonFigure,
  FactList,
  FlowDiagram,
  LolaTurn,
  MetricRow,
  PersonaGrid,
  ProcessRail,
  ProcessStepBody,
  SectionHeading,
  StepLead,
  StickyNotes,
  Testimonial,
  ToolChip,
  UserTurn,
} from "./CaseStudyKit";

interface CaseStudyViewProps {
  project: Project;
  onBack: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const MIN_PANEL_WIDTH = 320;
const DEFAULT_PANEL_WIDTH = 400;
/** Share of the window the panel opens at — the case study is the page, so the
    preview takes the smaller half and the writing keeps the room to be read. */
const PANEL_WIDTH_RATIO = 0.32;

// chronological order: the overview already carries the outcome up top, so
// the body can tell the story in the order it happened
const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "process", label: "Process" },
  { id: "solution", label: "Solution" },
  { id: "impact", label: "Outcomes" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

/** "demo · 5 screens · live preview" — a clip isn't a screen, so it says so. */
function artifactSubtitle(blocks: { video?: string }[], hasLivePreview: boolean) {
  const demos = blocks.filter((b) => b.video).length;
  const screens = blocks.length - demos;
  return [
    demos > 0 ? (demos === 1 ? "demo" : `${demos} demos`) : null,
    screens > 0 ? `${screens} ${screens === 1 ? "screen" : "screens"}` : null,
    hasLivePreview ? "live preview" : null,
  ]
    .filter(Boolean)
    .join(" · ");
}

export default function CaseStudyView({ project, onBack, onPrev, onNext }: CaseStudyViewProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // each shot illustrates one part of the story — sketches sit with the
  // process, charts with the findings, final screens with the solution.
  const processShots = project.gallery.filter((b) => b.stage === "process");
  const findingShots = project.gallery.filter((b) => b.stage === "findings");
  const solutionShots = project.gallery.filter((b) => !b.stage || b.stage === "solution");
  const solutionImages = solutionShots.filter((b) => b.image);
  // screen-tagged shots pair into a showcase; without tags the sections fall
  // back to the collage and the compact Final screens chip. Screens without
  // an image render as placeholder frames, so finals can be authored before
  // they're shot.
  const screenShots = solutionShots.filter((b) => b.screen);
  const processScreens = processShots.filter((b) => b.screen);
  const processLoose = processShots.filter((b) => !b.screen);

  // every real image in this case study, in reading order — the set the
  // artifact panel steps through with prev/next. Shots the showcase presents
  // stay out: they zoom in place, and the panel keeps the live preview.
  const artifacts = useMemo<ArtifactImage[]>(() => {
    const list: ArtifactImage[] = [];
    const indexBySrc = new Map<string, number>();
    const showcased = new Set(project.gallery.filter((b) => b.screen && b.image).map((b) => b.image!));

    // a project whose hero is its only screenshot names that file twice — once
    // as the hero, once as the gallery block that captions it in the body. One
    // file is one screen, so the first mention wins and the second only fills
    // in what it left unset; otherwise prev/next steps onto the same picture.
    const add = (next: ArtifactImage) => {
      const at = indexBySrc.get(next.src);
      if (at === undefined) {
        indexBySrc.set(next.src, list.length);
        list.push(next);
        return;
      }
      const prev = list[at];
      list[at] = {
        ...prev,
        fit: prev.fit ?? next.fit,
        device: prev.device ?? next.device,
        video: prev.video ?? next.video,
      };
    };

    if (project.heroImage && !showcased.has(project.heroImage)) {
      add({
        src: project.heroImage,
        title: `${project.title}: overview`,
        fit: project.heroFit,
        device: project.heroDevice,
        isPhone: project.heroDevice === "phone",
      });
    }
    // iteration pairs sit adjacent, so prev/next in the panel flips a
    // comparison between its before and its after
    for (const c of project.iterations ?? []) {
      if (c.before) add({ src: c.before, title: `${c.title} · ${c.beforeLabel ?? "before"}` });
      if (c.after) add({ src: c.after, title: `${c.title} · ${c.afterLabel ?? "after"}` });
    }
    // boards attached to process steps open in the panel when clicked
    for (const step of project.process) {
      if (typeof step !== "string" && step.image)
        add({ src: step.image, title: step.imageCaption ?? `${project.title}: process` });
    }
    for (const block of project.gallery) {
      if (block.image && !showcased.has(block.image))
        add({
          src: block.image,
          title: block.caption,
          fit: block.fit,
          device: block.device,
          isPhone: block.variant === "phone" || block.device === "phone",
          video: block.video,
        });
    }
    return list;
  }, [project]);

  const hasLivePreview = Boolean(project.link && project.embed);

  // one shot zoomed in the lightbox, the only way images open now
  const [zoomed, setZoomed] = useState<ArtifactImage | null>(null);
  // the docked panel is the live preview and nothing else, opened only from
  // the overview's Open button
  const [liveOpen, setLiveOpen] = useState(false);
  // default the panel to a real share of the window, not a fixed sliver
  const [panelWidth, setPanelWidth] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_PANEL_WIDTH;
    const max = Math.max(MIN_PANEL_WIDTH, window.innerWidth - 480);
    return Math.min(max, Math.max(DEFAULT_PANEL_WIDTH, Math.round(window.innerWidth * PANEL_WIDTH_RATIO)));
  });
  const [resizing, setResizing] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const dragRef = useRef<{ startX: number; startWidth: number } | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeSection, setActiveSection] = useState<SectionId>("overview");

  const jumpTo = (id: SectionId) => {
    document.getElementById(`cs-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // scroll spy: the last section whose top has passed under the sticky nav wins
  const handleSectionScroll = () => {
    const root = scrollRef.current;
    if (!root) return;
    const rootTop = root.getBoundingClientRect().top;
    let current: SectionId = SECTIONS[0].id;
    for (const s of SECTIONS) {
      const el = document.getElementById(`cs-${s.id}`);
      if (el && el.getBoundingClientRect().top - rootTop <= 104) current = s.id;
    }
    setActiveSection(current);
  };

  // opening a new case study starts fresh. The panel stays closed until
  // asked for — auto-opening it stole half the page from the writing.
  useEffect(() => {
    setZoomed(null);
    setLiveOpen(false);
    setFullscreen(false);
    setActiveSection("overview");
    scrollRef.current?.scrollTo({ top: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.id]);

  // page-level keyboard controls, active only while the artifact panel is
  // closed (the panel owns the keys when open): ←/→ cycle case studies,
  // Escape returns to the grid
  useEffect(() => {
    // the lightbox and the live panel own the keys while open
    if (liveOpen || zoomed) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key === "ArrowRight") onNext();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "Escape") onBack();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [liveOpen, zoomed, onNext, onPrev, onBack]);

  // every in-page image opens the same way: zoomed in the lightbox
  const openArtifact = (src: string) => {
    const target = artifacts.find((a) => a.src === src);
    if (target) setZoomed(target);
  };

  const handleResizeStart = (e: ReactPointerEvent) => {
    e.preventDefault();
    dragRef.current = { startX: e.clientX, startWidth: panelWidth };
    setResizing(true);
  };

  useEffect(() => {
    if (!resizing) return;
    const onMove = (e: PointerEvent) => {
      if (!dragRef.current) return;
      const maxWidth = Math.max(MIN_PANEL_WIDTH, window.innerWidth - 420);
      const delta = dragRef.current.startX - e.clientX;
      const next = Math.min(maxWidth, Math.max(MIN_PANEL_WIDTH, dragRef.current.startWidth + delta));
      setPanelWidth(next);
    };
    const onUp = () => {
      setResizing(false);
      dragRef.current = null;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [resizing]);

  const activeSrc = zoomed?.src;

  return (
    <div className={`flex h-full min-h-0 ${resizing ? "select-none" : ""}`}>
      <div ref={scrollRef} onScroll={handleSectionScroll} className="scroll-warm min-h-0 flex-1 overflow-y-auto">
        <nav
          aria-label="Case study sections"
          className="sticky top-0 z-20 border-b border-[var(--color-blush-deep)]/50 bg-[var(--color-cream)]/85 backdrop-blur"
        >
          <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 py-2 sm:px-6">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => jumpTo(s.id)}
                aria-current={activeSection === s.id ? "true" : undefined}
                className={`focus-ring whitespace-nowrap rounded-full px-3 py-1 text-sm font-semibold transition ${
                  activeSection === s.id
                    ? "bg-[var(--color-blush)] text-[var(--color-rose-dark)]"
                    : "text-[var(--color-ink-soft)] hover:text-[var(--color-rose-dark)]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </nav>
        <div className="mx-auto max-w-6xl px-3 pb-16 pt-4 sm:px-6">
          <button
            type="button"
            onClick={onBack}
            className="focus-ring mb-4 flex items-center gap-1.5 rounded-[var(--radius-md)] px-2 py-1 text-base font-medium text-[var(--color-ink-soft)] transition hover:bg-[var(--color-blush)] hover:text-[var(--color-rose-dark)]"
          >
            <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" /> All case studies
          </button>

          {/* generous gaps: the sections are unboxed prose now, so the
              whitespace is what separates one chapter from the next.
              Keyed on the project so switching case studies remounts the body
              and every section streams in fresh, like a new answer. */}
          <div key={project.id} className="flex flex-col gap-12">
            <UserTurn>
              Tell me about the <strong>{project.title}</strong> case study.
            </UserTurn>

            <section id="cs-overview" className="scroll-mt-16">
            <LolaTurn>
              {/* two columns: everything written on the left, the cover on
                  the right; below md they stack, text first. The title lives
                  inside the text column so it sits right on its copy instead
                  of floating above the whole grid. */}
              <div className="grid gap-6 md:grid-cols-2 md:items-center">
                <div className="space-y-4">
                  {/* the overview has no numbered heading, so Lola rides the
                      title line here, same as she does on section headings —
                      with the same rose tick the numbered titles wear */}
                  <h1 className="flex items-center gap-2.5 font-[var(--font-display)] text-[24px] font-bold text-[var(--color-ink)] sm:text-[28px]">
                    <CatAvatar size={28} />
                    <span
                      className="h-5 w-1.5 shrink-0 rounded-full"
                      style={{ background: "var(--color-rose)" }}
                      aria-hidden="true"
                    />
                    {project.title}
                  </h1>
                  <div className="text-[17px] text-[var(--color-ink)]">
                    <StreamingText text={project.description} />
                  </div>
                  {project.facts ? (
                    <FactList facts={project.facts} />
                  ) : (
                    <p className="font-[var(--font-mono)] text-sm text-[var(--color-ink-soft)]">
                      {project.role} · {project.year}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <ToolChip key={tool}>{tool}</ToolChip>
                    ))}
                  </div>
                </div>
                <Reveal variant="gen">
                {artifacts.length > 0 || hasLivePreview ? (
                  <ArtifactChip
                    title={project.title}
                    subtitle={artifactSubtitle(artifacts, hasLivePreview)}
                    image={project.heroImage ?? artifacts[0]?.src}
                    // the cover column: hero presentation whenever there's an
                    // image to lead with
                    large
                    // a portrait hero (a phone GIF) shows whole instead of
                    // cropping to the wide cover box
                    fit={project.heroImage ? project.heroFit : undefined}
                    // a hero still of its own wins the thumbnail; without one the
                    // first artifact fills it, and a badge only fits if that's a clip.
                    video={!project.heroImage && Boolean(artifacts[0]?.video)}
                    gradient={project.gradient}
                    icon={project.icon}
                    active={Boolean(zoomed && zoomed.src === (project.heroImage ?? artifacts[0]?.src))}
                    // clicking the hero zooms it; the one Open button opens the
                    // live preview when there is one, otherwise links out (the
                    // Chrome store, a Figma prototype, a write-up)
                    onOpen={() => {
                      const src = project.heroImage ?? artifacts[0]?.src;
                      if (src) openArtifact(src);
                    }}
                    onOpenFull={hasLivePreview ? () => setLiveOpen(true) : undefined}
                    openHref={hasLivePreview ? undefined : project.link}
                    openLabel={hasLivePreview ? "Open" : project.linkLabel}
                  />
                ) : (
                  <div
                    className="flex h-32 items-center justify-center rounded-[var(--radius-lg)]"
                    style={{ background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})` }}
                    aria-hidden="true"
                  >
                    <project.icon size={40} strokeWidth={1.5} style={{ color: "var(--color-on-sunset)" }} className="opacity-80" />
                  </div>
                )}
                </Reveal>
              </div>
            </LolaTurn>
            </section>

            <section id="cs-problem" className="scroll-mt-16">
            <LolaTurn>
              <SectionHeading eyebrow="01">Problem</SectionHeading>
              <div className="text-[17px] text-[var(--color-ink-soft)]">
                <StreamingText text={project.problem} />
              </div>
            </LolaTurn>
            </section>

            <section id="cs-process" className="scroll-mt-16">
            <LolaTurn>
              <SectionHeading eyebrow="02">Process</SectionHeading>
              {/* one numbered rail threads every subsection — research, each
                  phase, design decisions, V1, V2 — into a single connected
                  sequence, the way the phase timeline already reads */}
              <ProcessRail
                items={[
                  // Research: findings, the pains as sticky notes, the review
                  // quotes that back them, then who it all points to
                  (project.research || (project.researchQuotes?.length ?? 0) > 0) && (
                    <>
                      <StepLead>Research</StepLead>
                      {project.research && <StreamingText text={project.research} />}
                      {project.researchNotes && project.researchNotes.length > 0 && (
                        <StickyNotes notes={project.researchNotes} />
                      )}
                      {project.researchQuotes && project.researchQuotes.length > 0 && (
                        <div className="space-y-5">
                          {project.researchQuotes.map((q) => (
                            <Testimonial key={q.quote} quote={q.quote} author={q.author} role={q.role} />
                          ))}
                        </div>
                      )}
                      {findingShots.length > 0 && (
                        <Reveal variant="gen">
                          <ArtifactCollage blocks={findingShots} activeSrc={activeSrc} onOpen={openArtifact} />
                        </Reveal>
                      )}
                    </>
                  ),
                  // Who we designed for
                  project.personas && project.personas.length > 0 && (
                    <>
                      <StepLead>Who I designed for</StepLead>
                      <PersonaGrid personas={project.personas} />
                    </>
                  ),
                  // Design: the phase steps under one "Design" node when the
                  // project also has iterations (so "Iteration" can stand as
                  // its own later step); otherwise each phase is its own node.
                  // A project that tells its process through V1/V2 has no phase
                  // steps, so this node drops out entirely — no stray number.
                  ...((project.iterations?.length ?? 0) > 0
                    ? project.process.length > 0
                      ? [
                          <>
                            <StepLead>Design</StepLead>
                            {project.process.map((raw, i) => (
                              <ProcessStepBody
                                key={i}
                                step={typeof raw === "string" ? { text: raw } : raw}
                                activeSrc={activeSrc}
                                onOpenImage={openArtifact}
                              />
                            ))}
                          </>,
                        ]
                      : []
                    : project.process.map((raw) => (
                        <ProcessStepBody
                          step={typeof raw === "string" ? { text: raw } : raw}
                          activeSrc={activeSrc}
                          onOpenImage={openArtifact}
                        />
                      ))),
                  // V1: its limits sit right beside its screens, not in the
                  // final product's Limitations
                  processScreens.length > 0 && (
                    <>
                      <StepLead>{project.v1 ? "V1" : "The app today"}</StepLead>
                      {project.v1 && <StreamingText text={project.v1} />}
                      {project.v1Notes && project.v1Notes.length > 0 && <StickyNotes notes={project.v1Notes} />}
                      <Reveal variant="gen">
                        <ArtifactShowcase blocks={processScreens} />
                      </Reveal>
                    </>
                  ),
                  // V2: the switch that made the shipped app, and the build shot
                  (project.v2 || processLoose.length > 0) && (
                    <>
                      {project.v2 && <StepLead>V2</StepLead>}
                      {project.v2 && <StreamingText text={project.v2} />}
                      {processLoose.length > 0 && (
                        <Reveal variant="gen">
                          <ArtifactCollage blocks={processLoose} activeSrc={activeSrc} onOpen={openArtifact} />
                        </Reveal>
                      )}
                    </>
                  ),
                  // Iteration: the before/after decisions, now after V1/V2.
                  // Reads as "More iterations" when it follows a V1/V2 pass, and
                  // stands alone as "Iteration" for a project with neither.
                  (project.iterations?.length ?? 0) > 0 && (
                    <>
                      <StepLead>
                        {processScreens.length > 0 || project.v2 || processLoose.length > 0
                          ? "More iterations"
                          : "Iteration"}
                      </StepLead>
                      <div className="space-y-5">
                        {(project.iterations ?? []).map((c) => (
                          <ComparisonFigure
                            key={c.title}
                            comparison={c}
                            gradient={project.gradient}
                            activeSrc={activeSrc}
                            onOpenImage={openArtifact}
                          />
                        ))}
                      </div>
                    </>
                  ),
                ]}
              />
            </LolaTurn>
            </section>

            <section id="cs-solution" className="scroll-mt-16">
            <LolaTurn>
              <SectionHeading eyebrow="03">Solution</SectionHeading>
              {/* the interaction drawn before it's described: one row of
                  steps says what a paragraph of bullets was saying */}
              {project.flow && project.flow.length > 0 && <FlowDiagram steps={project.flow} />}
              {/* the section is already titled Solution — a "The solution"
                  callout inside it would just box the same label twice */}
              <div className="text-[17px] text-[var(--color-ink-soft)]">
                <StreamingText text={project.solution} />
              </div>
              {screenShots.length > 0 ? (
                // one surface holds every final screen — desktop windows with
                // their phone twins; each shot zooms in the lightbox on click
                <Reveal variant="gen">
                  <ArtifactShowcase blocks={screenShots} />
                </Reveal>
              ) : solutionImages.length > 0 ? (
                // untagged final screens show inline as a collage, each zooming
                // in the lightbox; the live preview is reached from the top Open
                <Reveal variant="gen">
                  <ArtifactCollage blocks={solutionImages} activeSrc={activeSrc} onOpen={openArtifact} />
                </Reveal>
              ) : null}
            </LolaTurn>
            </section>

            <section id="cs-impact" className="scroll-mt-16">
            <LolaTurn>
              <SectionHeading eyebrow="04">Outcomes</SectionHeading>
              {/* the honest claim first, the numbers after it */}
              {project.outcomeNote && (
                <div className="text-[17px] text-[var(--color-ink-soft)]">
                  <StreamingText text={project.outcomeNote} />
                </div>
              )}
              <MetricRow metrics={project.results} />
              {project.testimonial && (
                <Testimonial
                  quote={project.testimonial.quote}
                  author={project.testimonial.author}
                  role={project.testimonial.role}
                />
              )}
              {project.limitations && (
                <>
                  <p className="pt-4 text-[15px] font-semibold uppercase tracking-wide text-[var(--color-ink-soft)]/80">
                    Limitations
                  </p>
                  <div className="text-[17px] text-[var(--color-ink-soft)]">
                    <StreamingText text={project.limitations} />
                  </div>
                </>
              )}
              {project.futureWork && (
                <>
                  <p className="pt-4 text-[15px] font-semibold uppercase tracking-wide text-[var(--color-ink-soft)]/80">
                    What&apos;s next
                  </p>
                  <div className="text-[17px] text-[var(--color-ink-soft)]">
                    <StreamingText text={project.futureWork} />
                  </div>
                </>
              )}
            </LolaTurn>
            </section>

          </div>

          <div className="mt-10 flex items-center justify-between border-t border-[var(--color-blush-deep)]/50 pt-4">
            <button
              type="button"
              onClick={onPrev}
              className="focus-ring flex items-center gap-1.5 rounded-[var(--radius-md)] px-2 py-1 text-base font-medium text-[var(--color-ink-soft)] transition hover:text-[var(--color-rose-dark)]"
            >
              <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" /> Previous
            </button>
            <button
              type="button"
              onClick={onNext}
              className="focus-ring flex items-center gap-1.5 rounded-[var(--radius-md)] px-2 py-1 text-base font-medium text-[var(--color-ink-soft)] transition hover:text-[var(--color-rose-dark)]"
            >
              Next <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* the panel is the live preview only now — no gallery, no prev/next.
          Empty images makes the panel render live-only. */}
      {liveOpen && hasLivePreview && (
        <ArtifactPanel
          images={[]}
          index={0}
          liveUrl={project.link}
          liveTabLabel={project.linkLabel}
          liveEmbeddable
          liveMinHeight={project.embedMinHeight}
          tab="live"
          onTabChange={() => {}}
          onClose={() => {
            setLiveOpen(false);
            setFullscreen(false);
          }}
          onNavigate={() => {}}
          width={panelWidth}
          onResizeStart={handleResizeStart}
          resizing={resizing}
          layout={isDesktop && !fullscreen ? "split" : "overlay"}
          fullscreen={fullscreen}
          onToggleFullscreen={isDesktop ? () => setFullscreen((f) => !f) : undefined}
        />
      )}

      {/* every image in the case study zooms here, the same way Nourish's
          showcase already did */}
      {zoomed && (
        <Lightbox
          src={zoomed.src}
          title={zoomed.title}
          isPhone={zoomed.isPhone}
          video={zoomed.video}
          onClose={() => setZoomed(null)}
        />
      )}
    </div>
  );
}
