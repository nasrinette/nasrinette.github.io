import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import type { Project } from "../types";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { ArtifactChip, ArtifactCollage, ArtifactPanel, type ArtifactImage, type ArtifactTab } from "./Artifact";
import CatAvatar from "./CatAvatar";
import RichText from "./RichText";
import {
  LolaTurn,
  MetricRow,
  PersonaGrid,
  ProcessTimeline,
  SectionHeading,
  TagPill,
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

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "process", label: "Process" },
  { id: "solution", label: "Solution" },
  { id: "impact", label: "Impact" },
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

  // every real image in this case study, in reading order — the set the
  // artifact panel steps through with prev/next.
  const artifacts = useMemo<ArtifactImage[]>(() => {
    const list: ArtifactImage[] = [];
    const indexBySrc = new Map<string, number>();

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

    if (project.heroImage) {
      add({
        src: project.heroImage,
        title: `${project.title}: overview`,
        fit: project.heroFit,
        device: project.heroDevice,
      });
    }
    for (const block of project.gallery) {
      if (block.image)
        add({ src: block.image, title: block.caption, fit: block.fit, device: block.device, video: block.video });
    }
    return list;
  }, [project]);

  const hasLivePreview = Boolean(project.link && project.embed);

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // a live, responsive app fills the panel at any width — better than a
  // letterboxed screenshot, so it leads when there's one to show.
  const [tab, setTab] = useState<ArtifactTab>(hasLivePreview ? "live" : "gallery");
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

  // opening a new case study starts fresh — auto-surface the hero artifact (or
  // the live preview when there are no shots) on desktop, the way Claude opens
  // the panel as soon as there's something to show.
  useEffect(() => {
    setOpenIndex(isDesktop && (artifacts.length > 0 || hasLivePreview) ? 0 : null);
    setTab(hasLivePreview ? "live" : "gallery");
    setFullscreen(false);
    setActiveSection("overview");
    scrollRef.current?.scrollTo({ top: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.id]);

  // page-level keyboard controls, active only while the artifact panel is
  // closed (the panel owns the keys when open): ←/→ cycle case studies,
  // Escape returns to the grid
  useEffect(() => {
    if (openIndex !== null) return;
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
  }, [openIndex, onNext, onPrev, onBack]);

  // asking for a specific screen means the gallery, even if the live
  // preview is what's currently on screen.
  const openArtifact = (src: string) => {
    const i = artifacts.findIndex((a) => a.src === src);
    if (i === -1) return;
    setOpenIndex(i);
    setTab("gallery");
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

  const activeSrc = openIndex !== null && tab === "gallery" ? artifacts[openIndex]?.src : undefined;

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
              whitespace is what separates one chapter from the next */}
          <div className="flex flex-col gap-12">
            <UserTurn>
              Tell me about the <strong>{project.title}</strong> case study.
            </UserTurn>

            <section id="cs-overview" className="scroll-mt-16">
            <LolaTurn>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <TagPill key={t}>{t}</TagPill>
                ))}
              </div>
              {/* the overview has no numbered heading, so Lola rides the
                  title line here, same as she does on section headings */}
              <h1 className="flex items-center gap-2.5 font-[var(--font-display)] text-[22px] font-bold text-[var(--color-ink)] sm:text-[26px]">
                <CatAvatar size={24} />
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-[var(--font-mono)] text-sm text-[var(--color-ink-soft)]">
                  {project.role} · {project.year}
                </p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring inline-flex w-fit items-center gap-1.5 rounded-full border border-[var(--color-blush-deep)]/70 bg-[var(--color-cream-soft)] px-3 py-1 text-sm font-semibold text-[var(--color-rose-dark)] transition hover:border-[var(--color-rose)] hover:bg-[var(--color-blush)]"
                  >
                    <ExternalLink size={12} strokeWidth={2} aria-hidden="true" />
                    {project.linkLabel ?? "Live"}
                  </a>
                )}
              </div>
              {artifacts.length > 0 || hasLivePreview ? (
                <ArtifactChip
                  title={project.title}
                  subtitle={artifactSubtitle(artifacts, hasLivePreview)}
                  image={project.heroImage ?? artifacts[0]?.src}
                  // a hero still of its own wins the thumbnail; without one the
                  // first artifact fills it, and a badge only fits if that's a clip.
                  video={!project.heroImage && Boolean(artifacts[0]?.video)}
                  gradient={project.gradient}
                  icon={project.icon}
                  active={openIndex === 0}
                  // the Open pill promises the full view, so it opens the
                  // panel already fullscreen; the collage keeps split mode
                  onOpen={() => {
                    setOpenIndex(0);
                    setFullscreen(true);
                  }}
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
              <div className="text-[17px] text-[var(--color-ink)]">
                <RichText text={project.description} />
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <ToolChip key={tool}>{tool}</ToolChip>
                ))}
              </div>
            </LolaTurn>
            </section>

            <section id="cs-problem" className="scroll-mt-16">
            <LolaTurn>
              <SectionHeading eyebrow="01">The problem</SectionHeading>
              <div className="text-base text-[var(--color-ink-soft)]">
                <RichText text={project.problem} />
              </div>
              <p className="pt-1 text-sm font-semibold uppercase tracking-wide text-[var(--color-ink-soft)]/80">
                What success looked like
              </p>
              <ul className="list-disc space-y-1.5 pl-5 text-base leading-relaxed text-[var(--color-ink-soft)] marker:text-[var(--color-rose)]">
                {project.goals.map((goal) => (
                  <li key={goal}>{goal}</li>
                ))}
              </ul>
            </LolaTurn>
            </section>

            <section id="cs-process" className="scroll-mt-16">
            <LolaTurn>
              <SectionHeading eyebrow="02">Process</SectionHeading>
              <ProcessTimeline steps={project.process} />
              {project.personas && project.personas.length > 0 && (
                <>
                  <p className="pt-1 text-sm font-semibold uppercase tracking-wide text-[var(--color-ink-soft)]/80">
                    Who we designed for
                  </p>
                  <PersonaGrid personas={project.personas} />
                </>
              )}
              {(processShots.length > 0 || findingShots.length > 0) && (
                <ArtifactCollage
                  blocks={[...processShots, ...findingShots]}
                  activeSrc={activeSrc}
                  onOpen={openArtifact}
                />
              )}
            </LolaTurn>
            </section>

            <section id="cs-solution" className="scroll-mt-16">
            <LolaTurn>
              <SectionHeading eyebrow="03">Solution</SectionHeading>
              {/* the section is already titled Solution — a "The solution"
                  callout inside it would just box the same label twice */}
              <div className="text-base text-[var(--color-ink-soft)]">
                <RichText text={project.solution} />
              </div>
              {(solutionImages.length > 0 || hasLivePreview) && (
                <ArtifactChip
                  title="Final screens"
                  subtitle={artifactSubtitle(solutionImages, hasLivePreview)}
                  image={solutionImages[0]?.image}
                  video={Boolean(solutionImages[0]?.video)}
                  gradient={project.gradient}
                  icon={solutionShots[0]?.icon ?? project.icon}
                  active={solutionImages.some((b) => b.image === activeSrc)}
                  onOpen={() => {
                    if (solutionImages[0]?.image) openArtifact(solutionImages[0].image!);
                    else setOpenIndex(0);
                    setFullscreen(true);
                  }}
                />
              )}
            </LolaTurn>
            </section>

            <section id="cs-impact" className="scroll-mt-16">
            <LolaTurn>
              <SectionHeading eyebrow="04">Impact</SectionHeading>
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
                  <p className="pt-1 text-sm font-semibold uppercase tracking-wide text-[var(--color-ink-soft)]/80">
                    Limitations
                  </p>
                  <div className="text-base text-[var(--color-ink-soft)]">
                    <RichText text={project.limitations} />
                  </div>
                </>
              )}
              {project.futureWork && (
                <>
                  <p className="pt-1 text-sm font-semibold uppercase tracking-wide text-[var(--color-ink-soft)]/80">
                    What&apos;s next
                  </p>
                  <div className="text-base text-[var(--color-ink-soft)]">
                    <RichText text={project.futureWork} />
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

      {openIndex !== null && (
        <ArtifactPanel
          images={artifacts}
          index={openIndex}
          liveUrl={project.link}
          liveTabLabel={project.linkLabel}
          liveEmbeddable={Boolean(project.embed)}
          tab={tab}
          onTabChange={setTab}
          onClose={() => {
            setOpenIndex(null);
            setFullscreen(false);
          }}
          onNavigate={setOpenIndex}
          width={panelWidth}
          onResizeStart={handleResizeStart}
          resizing={resizing}
          layout={isDesktop && !fullscreen ? "split" : "overlay"}
          fullscreen={fullscreen}
          onToggleFullscreen={isDesktop ? () => setFullscreen((f) => !f) : undefined}
        />
      )}
    </div>
  );
}
