import type { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  onLearnMore: (project: Project) => void;
}

export default function ProjectCard({ project, onLearnMore }: ProjectCardProps) {
  const Icon = project.icon;
  return (
    // h-full + the pinned button keep every card in the row the same height,
    // however many lines its tags wrap to
    <div className="card-warm card-lift flex h-full w-64 shrink-0 snap-start flex-col overflow-hidden">
      {project.cover ? (
        <img
          src={project.cover}
          alt=""
          loading="lazy"
          className="h-28 w-full shrink-0 bg-[var(--color-blush)] object-cover object-top"
        />
      ) : (
        <div
          className="flex h-28 shrink-0 items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
          }}
          aria-hidden="true"
        >
          <Icon size={30} strokeWidth={1.75} style={{ color: "var(--color-on-sunset)" }} className="opacity-80" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-[var(--font-display)] text-base font-bold text-[var(--color-ink)]">
              {project.title}
            </h3>
            <span className="shrink-0 font-[var(--font-mono)] text-[13px] text-[var(--color-ink-soft)]">
              {project.year}
            </span>
          </div>
          <p className="text-sm leading-snug text-[var(--color-ink-soft)]">{project.summary}</p>
          <div className="flex flex-wrap gap-1 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-[var(--radius-ui)] bg-[var(--color-paw)] px-2 py-0.5 text-[12px] font-medium text-[var(--color-rose-dark)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => onLearnMore(project)}
          className="btn-pastel mt-auto w-full px-3 py-1.5 font-[var(--font-display)] text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-rose-dark)]"
        >
          Tell me more
        </button>
      </div>
    </div>
  );
}
