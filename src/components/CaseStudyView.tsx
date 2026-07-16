import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import type { Project } from "../types";
import { ArtifactCard, ArtifactLightbox, type ArtifactImage } from "./Artifact";
import {
  KeyInsight,
  LolaTurn,
  MetricRow,
  ProcessTimeline,
  ScreenRail,
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
  onAskLola: (project: Project) => void;
}

export default function CaseStudyView({ project, onBack, onPrev, onNext, onAskLola }: CaseStudyViewProps) {
  const phoneShots = project.gallery.filter((b) => b.variant === "phone" && b.image);
  const wideShots = project.gallery.filter((b) => b.variant !== "phone" && b.image);

  // every real image in this case study, in reading order — the set the
  // artifact lightbox steps through with prev/next.
  const artifacts = useMemo<ArtifactImage[]>(() => {
    const list: ArtifactImage[] = [];
    if (project.heroImage) {
      list.push({ src: project.heroImage, title: `${project.title} — overview`, fit: project.heroFit });
    }
    for (const block of project.gallery) {
      if (block.image) list.push({ src: block.image, title: block.caption, fit: block.fit });
    }
    return list;
  }, [project]);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const openArtifact = (src: string) => {
    const i = artifacts.findIndex((a) => a.src === src);
    if (i !== -1) setLightboxIndex(i);
  };

  return (
    <div className="mx-auto max-w-5xl px-3 pb-16 pt-4 sm:px-6">
      <button
        type="button"
        onClick={onBack}
        className="focus-ring mb-4 flex items-center gap-1.5 rounded-[var(--radius-md)] px-2 py-1 text-sm font-medium text-[var(--color-ink-soft)] transition hover:bg-[var(--color-blush)] hover:text-[var(--color-rose-dark)]"
      >
        <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" /> All case studies
      </button>

      <div className="flex flex-col gap-4">
        <UserTurn>
          Tell me about the <strong>{project.title}</strong> case study.
        </UserTurn>

        <LolaTurn>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <TagPill key={t}>{t}</TagPill>
            ))}
          </div>
          <h1 className="font-[var(--font-display)] text-xl font-bold text-[var(--color-ink)] sm:text-2xl">
            {project.title}
          </h1>
          <p className="font-[var(--font-mono)] text-xs text-[var(--color-ink-soft)]">
            {project.role} · {project.year} · {project.duration}
          </p>
          {project.heroImage ? (
            <ArtifactCard
              image={project.heroImage}
              title={`${project.title} — overview`}
              fit={project.heroFit}
              aspect="hero"
              onOpen={() => openArtifact(project.heroImage!)}
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
          <p className="text-[15px] leading-relaxed text-[var(--color-ink)]">{project.description}</p>
        </LolaTurn>

        <LolaTurn>
          <SectionHeading eyebrow="Results">What changed</SectionHeading>
          <MetricRow metrics={project.results} />
        </LolaTurn>

        <LolaTurn>
          <SectionHeading eyebrow="01">The problem</SectionHeading>
          <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">{project.problem}</p>
        </LolaTurn>

        <LolaTurn>
          <SectionHeading eyebrow="02">Goals</SectionHeading>
          <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[var(--color-ink-soft)] marker:text-[var(--color-rose)]">
            {project.goals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        </LolaTurn>

        <LolaTurn>
          <SectionHeading eyebrow="03">Process</SectionHeading>
          <ProcessTimeline steps={project.process} />
        </LolaTurn>

        <LolaTurn>
          <SectionHeading eyebrow="04">Solution</SectionHeading>
          <KeyInsight label="The solution">{project.solution}</KeyInsight>
        </LolaTurn>

        {project.gallery.length > 0 && (
          <LolaTurn>
            <SectionHeading>Gallery</SectionHeading>
            {phoneShots.length > 0 && (
              <ScreenRail>
                {phoneShots.map((block) => (
                  <div key={block.caption} className="w-40 shrink-0 snap-center sm:w-44">
                    <ArtifactCard
                      image={block.image!}
                      title={block.caption}
                      aspect="phone"
                      fit={block.fit}
                      onOpen={() => openArtifact(block.image!)}
                    />
                  </div>
                ))}
              </ScreenRail>
            )}
            {wideShots.length > 0 && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {wideShots.map((block) => (
                  <ArtifactCard
                    key={block.caption}
                    image={block.image!}
                    title={block.caption}
                    fit={block.fit}
                    onOpen={() => openArtifact(block.image!)}
                  />
                ))}
              </div>
            )}
          </LolaTurn>
        )}

        <LolaTurn>
          <SectionHeading>Tools</SectionHeading>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <ToolChip key={tool}>{tool}</ToolChip>
            ))}
          </div>
        </LolaTurn>

        {project.testimonial && (
          <LolaTurn>
            <Testimonial
              quote={project.testimonial.quote}
              author={project.testimonial.author}
              role={project.testimonial.role}
            />
          </LolaTurn>
        )}

        <LolaTurn>
          <p className="text-sm leading-relaxed text-[var(--color-ink)]">
            Curious about the details, or want to see something from a different angle?
          </p>
          <button
            type="button"
            onClick={() => onAskLola(project)}
            className="btn-pastel focus-ring flex items-center gap-2 px-4 py-2 font-[var(--font-display)] text-sm font-semibold"
          >
            <MessageCircle size={15} strokeWidth={1.75} aria-hidden="true" />
            Ask Lola about this project
          </button>
        </LolaTurn>
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-[var(--color-blush-deep)]/50 pt-4">
        <button
          type="button"
          onClick={onPrev}
          className="focus-ring flex items-center gap-1.5 rounded-[var(--radius-md)] px-2 py-1 text-sm font-medium text-[var(--color-ink-soft)] transition hover:text-[var(--color-rose-dark)]"
        >
          <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" /> Previous
        </button>
        <button
          type="button"
          onClick={onNext}
          className="focus-ring flex items-center gap-1.5 rounded-[var(--radius-md)] px-2 py-1 text-sm font-medium text-[var(--color-ink-soft)] transition hover:text-[var(--color-rose-dark)]"
        >
          Next <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      {lightboxIndex !== null && (
        <ArtifactLightbox
          images={artifacts}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
