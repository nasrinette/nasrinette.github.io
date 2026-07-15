import { projects } from "../data/projects";
import { profile } from "../data/profile";

export default function ProjectsView({ onOpen }: { onOpen: (projectId: string) => void }) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-12">
      <header className="mb-8 space-y-2">
        <p className="font-[var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-rose-dark)]">
          Selected work
        </p>
        <h1 className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-ink)] sm:text-3xl">
          Case studies
        </h1>
        <p className="max-w-xl text-sm text-[var(--color-ink-soft)]">
          Full write-ups of shipped work — the problem, the process, and what actually changed. By{" "}
          {profile.name}.
        </p>
        <span className="sunset-rule w-16" aria-hidden="true" />
      </header>

      {projects.length === 0 ? (
        <p className="italic text-[var(--color-ink-soft)]">No case studies published yet — check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => onOpen(project.id)}
              className="card-warm card-lift focus-ring group flex flex-col overflow-hidden text-left"
            >
              <div
                className="flex h-32 items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
                }}
                aria-hidden="true"
              >
                <project.icon size={36} strokeWidth={1.75} style={{ color: "var(--color-on-sunset)" }} className="opacity-80" />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-[var(--font-display)] text-base font-bold text-[var(--color-ink)]">
                    {project.title}
                  </h2>
                  <span className="shrink-0 font-[var(--font-mono)] text-xs text-[var(--color-ink-soft)]">
                    {project.year}
                  </span>
                </div>
                <p className="text-sm leading-snug text-[var(--color-ink-soft)]">{project.summary}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[var(--color-paw)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-rose-dark)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="pt-2 text-xs font-semibold text-[var(--color-rose-dark)] transition group-hover:underline">
                  Read case study →
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
