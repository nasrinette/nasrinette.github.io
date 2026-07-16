import type { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  onLearnMore: (project: Project) => void;
}

export default function ProjectCard({ project, onLearnMore }: ProjectCardProps) {
  const Icon = project.icon;
  return (
    <div className="card-warm card-lift w-64 shrink-0 snap-start overflow-hidden">
      {project.cover ? (
        <img
          src={project.cover}
          alt=""
          loading="lazy"
          className="h-28 w-full bg-[var(--color-blush)] object-cover object-top"
        />
      ) : (
        <div
          className="flex h-24 items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
          }}
          aria-hidden="true"
        >
          <Icon size={30} strokeWidth={1.75} style={{ color: "var(--color-on-sunset)" }} className="opacity-80" />
        </div>
      )}
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
              className="rounded-[var(--radius-ui)] bg-[var(--color-paw)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-rose-dark)]"
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onLearnMore(project)}
          className="btn-pastel mt-2 w-full px-3 py-1.5 font-[var(--font-display)] text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-rose-dark)]"
        >
          Tell me more
        </button>
      </div>
    </div>
  );
}
