import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import type { Project } from "../types";
import {
  CaseStudyHero,
  GalleryTile,
  KeyInsight,
  MetricRow,
  ProcessTimeline,
  SectionHeading,
  Testimonial,
  ToolChip,
} from "./CaseStudyKit";

interface CaseStudyViewProps {
  project: Project;
  onBack: () => void;
  onPrev: () => void;
  onNext: () => void;
  onAskLola: (project: Project) => void;
}

export default function CaseStudyView({ project, onBack, onPrev, onNext, onAskLola }: CaseStudyViewProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-16 pt-6 sm:px-8">
      <button
        type="button"
        onClick={onBack}
        className="focus-ring mb-4 flex items-center gap-1.5 rounded-[var(--radius-md)] px-2 py-1 text-sm font-medium text-[var(--color-ink-soft)] transition hover:bg-[var(--color-blush)] hover:text-[var(--color-rose-dark)]"
      >
        <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" /> All case studies
      </button>

      <CaseStudyHero
        gradient={project.gradient}
        icon={project.icon}
        tags={project.tags}
        title={project.title}
        meta={`${project.role} · ${project.year} · ${project.duration}`}
      />

      <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-ink)]">{project.description}</p>

      <section className="mt-8">
        <MetricRow metrics={project.results} />
      </section>

      <section className="mt-10">
        <SectionHeading eyebrow="01">The problem</SectionHeading>
        <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">{project.problem}</p>
      </section>

      <section className="mt-9">
        <SectionHeading eyebrow="02">Goals</SectionHeading>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[var(--color-ink-soft)] marker:text-[var(--color-rose)]">
          {project.goals.map((goal) => (
            <li key={goal}>{goal}</li>
          ))}
        </ul>
      </section>

      <section className="mt-9">
        <SectionHeading eyebrow="03">Process</SectionHeading>
        <ProcessTimeline steps={project.process} />
      </section>

      <section className="mt-9 space-y-3">
        <SectionHeading eyebrow="04">Solution</SectionHeading>
        <KeyInsight label="The solution">{project.solution}</KeyInsight>
      </section>

      {project.gallery.length > 0 && (
        <section className="mt-10">
          <SectionHeading>Gallery</SectionHeading>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {project.gallery.map((block) => (
              <GalleryTile key={block.caption} gradient={block.gradient} icon={block.icon} caption={block.caption} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-9">
        <SectionHeading>Tools</SectionHeading>
        <div className="flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <ToolChip key={tool}>{tool}</ToolChip>
          ))}
        </div>
      </section>

      {project.testimonial && (
        <section className="mt-10">
          <Testimonial
            quote={project.testimonial.quote}
            author={project.testimonial.author}
            role={project.testimonial.role}
          />
        </section>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onAskLola(project)}
          className="btn-pastel focus-ring flex items-center gap-2 px-4 py-2 font-[var(--font-display)] text-sm font-semibold"
        >
          <MessageCircle size={15} strokeWidth={1.75} aria-hidden="true" />
          Ask Lola about this project
        </button>
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
    </div>
  );
}
