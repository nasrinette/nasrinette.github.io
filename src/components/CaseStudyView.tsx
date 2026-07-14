import type { Project } from "../types";

interface CaseStudyViewProps {
  project: Project;
  onBack: () => void;
  onPrev: () => void;
  onNext: () => void;
  onAskLatte: (project: Project) => void;
}

export default function CaseStudyView({ project, onBack, onPrev, onNext, onAskLatte }: CaseStudyViewProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 pt-6 sm:px-8">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 flex items-center gap-1.5 rounded-full px-2 py-1 text-sm font-medium text-[var(--color-ink-soft)] transition hover:bg-[var(--color-blush)] hover:text-[var(--color-rose-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-rose-dark)]"
      >
        <span aria-hidden="true">←</span> All case studies
      </button>

      <div
        className="mb-6 flex h-40 items-center justify-center rounded-2xl text-6xl sm:h-56"
        style={{ background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})` }}
        aria-hidden="true"
      >
        {project.emoji}
      </div>

      <div className="mb-2 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[var(--color-paw)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-rose-dark)]"
          >
            {tag}
          </span>
        ))}
      </div>
      <h1 className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-ink)] sm:text-3xl">
        {project.title}
      </h1>
      <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
        {project.role} · {project.year} · {project.duration}
      </p>

      <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-ink)]">{project.description}</p>

      <section className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {project.results.map((metric) => (
          <div
            key={metric.label}
            className="rounded-xl border border-[var(--color-blush-deep)]/60 bg-white/80 p-4 text-center"
          >
            <p className="font-[var(--font-display)] text-lg font-bold text-[var(--color-rose-dark)]">
              {metric.value}
            </p>
            <p className="mt-1 text-[11px] text-[var(--color-ink-soft)]">{metric.label}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 space-y-2">
        <h2 className="font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)]">The problem</h2>
        <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">{project.problem}</p>
      </section>

      <section className="mt-8 space-y-2">
        <h2 className="font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)]">Goals</h2>
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[var(--color-ink-soft)] marker:text-[var(--color-rose)]">
          {project.goals.map((goal) => (
            <li key={goal}>{goal}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8 space-y-2">
        <h2 className="font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)]">Process</h2>
        <ol className="space-y-3">
          {project.process.map((step, i) => (
            <li key={step} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-blush)] text-xs font-bold text-[var(--color-rose-dark)]">
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed text-[var(--color-ink-soft)]">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8 space-y-2">
        <h2 className="font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)]">Solution</h2>
        <p className="text-sm leading-relaxed text-[var(--color-ink-soft)]">{project.solution}</p>
      </section>

      {project.gallery.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)]">Gallery</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {project.gallery.map((block) => (
              <div key={block.caption} className="overflow-hidden rounded-xl border border-[var(--color-blush-deep)]/60">
                <div
                  className="flex h-28 items-center justify-center text-3xl"
                  style={{ background: `linear-gradient(135deg, ${block.gradient[0]}, ${block.gradient[1]})` }}
                  aria-hidden="true"
                >
                  {block.emoji}
                </div>
                <p className="bg-white/80 px-3 py-2 text-xs text-[var(--color-ink-soft)]">{block.caption}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-8 space-y-2">
        <h2 className="font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)]">Tools</h2>
        <div className="flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-[var(--color-blush-deep)] px-3 py-1 text-xs font-medium text-[var(--color-ink)]"
            >
              {tool}
            </span>
          ))}
        </div>
      </section>

      {project.testimonial && (
        <section className="mt-10 rounded-2xl border border-[var(--color-blush-deep)]/60 bg-[var(--color-paw)]/50 p-5">
          <p className="text-[15px] italic leading-relaxed text-[var(--color-ink)]">
            "{project.testimonial.quote}"
          </p>
          <p className="mt-3 text-sm font-semibold text-[var(--color-rose-dark)]">
            {project.testimonial.author}
            <span className="ml-1.5 font-normal text-[var(--color-ink-soft)]">{project.testimonial.role}</span>
          </p>
        </section>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onAskLatte(project)}
          className="rounded-full bg-[var(--color-rose)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-rose-deep)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-rose-dark)]"
        >
          🐾 Ask Latte about this project
        </button>
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-[var(--color-blush-deep)]/50 pt-4">
        <button
          type="button"
          onClick={onPrev}
          className="text-sm font-medium text-[var(--color-ink-soft)] hover:text-[var(--color-rose-dark)]"
        >
          ← Previous
        </button>
        <button
          type="button"
          onClick={onNext}
          className="text-sm font-medium text-[var(--color-ink-soft)] hover:text-[var(--color-rose-dark)]"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
