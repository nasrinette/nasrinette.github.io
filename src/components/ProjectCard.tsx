import type { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  onLearnMore: (project: Project) => void;
}

export default function ProjectCard({ project, onLearnMore }: ProjectCardProps) {
  const Icon = project.icon;
  return (
    <div className="w-64 shrink-0 snap-start overflow-hidden rounded-lg border border-[var(--color-blush-deep)]/60 bg-[var(--color-cream-soft)]">
      <div
        className="flex h-24 items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
        }}
        aria-hidden="true"
      >
        <Icon size={30} strokeWidth={1.5} className="text-white/90" />
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-[var(--font-display)] text-sm font-bold text-[var(--color-ink)]">
            {project.title}
          </h3>
          <span className="shrink-0 font-[var(--font-mono)] text-[11px] text-[var(--color-ink-soft)]">
            {project.year}
          </span>
        </div>
        <p className="text-xs leading-snug text-[var(--color-ink-soft)]">{project.summary}</p>
        <div className="flex flex-wrap gap-1 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[var(--color-paw)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-rose-dark)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onLearnMore(project)}
          className="mt-2 w-full rounded-md bg-[var(--color-rose)] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[var(--color-rose-deep)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-rose-dark)]"
        >
          Tell me more
        </button>
      </div>
    </div>
  );
}
