import { ArrowRight } from "lucide-react";
import { projects } from "../data/projects";
import { profile } from "../data/profile";
import type { Project } from "../types";
import { Eyebrow, TagPill } from "./CaseStudyKit";

type Variant = "feature" | "regular" | "mini";

/* soft blurred blob of the project's gradient — colour without hurting text */
function ColorBlob({ gradient, className = "" }: { gradient: [string, string]; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute h-44 w-44 rounded-full opacity-60 blur-2xl transition-opacity duration-300 group-hover:opacity-80 ${className}`}
      style={{ background: `linear-gradient(140deg, ${gradient[0]}, ${gradient[1]})` }}
    />
  );
}

function IconChip({ project, big }: { project: Project; big?: boolean }) {
  const Icon = project.icon;
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-[var(--radius-lg)] shadow-[var(--shadow-soft)] ${
        big ? "h-12 w-12" : "h-11 w-11"
      }`}
      style={{ background: `linear-gradient(140deg, ${project.gradient[0]}, ${project.gradient[1]})` }}
      aria-hidden="true"
    >
      <Icon size={big ? 26 : 22} strokeWidth={1.75} style={{ color: "var(--color-on-sunset)" }} className="opacity-80" />
    </div>
  );
}

function ReadMore() {
  return (
    <span className="inline-flex items-center gap-1.5 text-base font-semibold text-[var(--color-rose-dark)]">
      Read case study
      <ArrowRight
        size={15}
        strokeWidth={2}
        className="transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </span>
  );
}

function BentoTile({
  project,
  variant,
  onOpen,
}: {
  project: Project;
  variant: Variant;
  onOpen: (id: string) => void;
}) {
  const base =
    "card-warm card-lift focus-ring group relative overflow-hidden text-left flex flex-col";
  const span =
    variant === "feature"
      ? "sm:col-span-2 lg:col-span-2 lg:row-span-2 p-6 gap-3"
      : "p-5 gap-2.5";

  if (variant === "mini") {
    return (
      <button type="button" onClick={() => onOpen(project.id)} className={`${base} flex-row items-center gap-3 p-4`}>
        <ColorBlob gradient={project.gradient} className="-left-14 -top-16" />
        <IconChip project={project} />
        <div className="relative min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="truncate font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)]">
              {project.title}
            </h3>
            <span className="shrink-0 font-[var(--font-mono)] text-[13px] text-[var(--color-ink-soft)]">
              {project.year}
            </span>
          </div>
          <p className="truncate text-sm text-[var(--color-ink-soft)]">{project.summary}</p>
        </div>
        <ArrowRight
          size={15}
          strokeWidth={2}
          className="relative shrink-0 -translate-x-1 text-[var(--color-rose-dark)] opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100"
          aria-hidden="true"
        />
      </button>
    );
  }

  if (variant === "feature") {
    return (
      <button type="button" onClick={() => onOpen(project.id)} className={`${base} ${span}`}>
        <ColorBlob gradient={project.gradient} className="-right-10 -top-12" />
        <div className="relative flex items-center justify-between">
          <IconChip project={project} big />
          <span className="font-[var(--font-mono)] text-[13px] text-[var(--color-ink-soft)]">{project.year}</span>
        </div>
        <div className="relative">
          <Eyebrow>{project.role}</Eyebrow>
          <h3 className="mt-1 font-[var(--font-display)] text-[26px] font-bold text-[var(--color-ink)]">{project.title}</h3>
          <p className="mt-1.5 text-base leading-relaxed text-[var(--color-ink-soft)]">{project.summary}</p>
        </div>
        <div className="relative mt-1 flex flex-wrap gap-x-6 gap-y-2">
          {project.results.slice(0, 2).map((m) => (
            <div key={m.label}>
              <p className="font-[var(--font-display)] text-xl font-bold text-[var(--color-rose-dark)]">{m.value}</p>
              <p className="text-[13px] leading-snug text-[var(--color-ink-soft)]">{m.label}</p>
            </div>
          ))}
        </div>
        {project.cover && (
          <img
            src={project.cover}
            alt=""
            loading="lazy"
            className="relative mt-2 min-h-40 w-full flex-1 rounded-[var(--radius-lg)] border border-[var(--color-blush-deep)]/50 bg-[var(--color-blush)] object-cover object-top"
          />
        )}
        <div className="relative mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <TagPill key={t}>{t}</TagPill>
            ))}
          </div>
          <ReadMore />
        </div>
      </button>
    );
  }

  // regular
  return (
    <button type="button" onClick={() => onOpen(project.id)} className={`${base} ${span}`}>
      <ColorBlob gradient={project.gradient} className="-right-12 -top-14" />
      <div className="relative flex items-center justify-between">
        <IconChip project={project} />
        <span className="font-[var(--font-mono)] text-[13px] text-[var(--color-ink-soft)]">{project.year}</span>
      </div>
      {project.cover && (
        <img
          src={project.cover}
          alt=""
          loading="lazy"
          className="relative mt-1 aspect-[16/10] w-full rounded-[var(--radius-lg)] border border-[var(--color-blush-deep)]/50 bg-[var(--color-blush)] object-cover object-top"
        />
      )}
      <h3 className="relative mt-1 font-[var(--font-display)] text-xl font-bold text-[var(--color-ink)]">
        {project.title}
      </h3>
      <p className="relative text-base leading-snug text-[var(--color-ink-soft)]">{project.summary}</p>
      <div className="relative mt-auto flex items-center justify-between gap-2 pt-2">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 2).map((t) => (
            <TagPill key={t}>{t}</TagPill>
          ))}
        </div>
        <ArrowRight
          size={16}
          strokeWidth={2}
          className="shrink-0 -translate-x-1 text-[var(--color-rose-dark)] opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100"
          aria-hidden="true"
        />
      </div>
    </button>
  );
}

export default function ProjectsView({ onOpen }: { onOpen: (projectId: string) => void }) {
  // the array order IS the importance order — the layout de-escalates with it:
  // #1 gets the 2×2 feature spot, #2–6 full cards, the rest compact rows.
  const featured = projects.slice(0, 6);
  const more = projects.slice(6);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-12">
      <header className="mb-8 space-y-2">
        <Eyebrow>Selected work</Eyebrow>
        <h1 className="font-[var(--font-display)] text-[26px] font-bold text-[var(--color-ink)] sm:text-[32px]">
          Case studies
        </h1>
        <p className="max-w-xl text-base text-[var(--color-ink-soft)]">
          Full write-ups of shipped work: the problem, the process, and what actually changed. By {profile.name}.
        </p>
        <span className="sunset-rule w-16" aria-hidden="true" />
      </header>

      {projects.length === 0 ? (
        <p className="italic text-[var(--color-ink-soft)]">No case studies published yet, check back soon!</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, i) => (
              <BentoTile key={project.id} project={project} variant={i === 0 ? "feature" : "regular"} onOpen={onOpen} />
            ))}
          </div>
          {more.length > 0 && (
            <>
              <div className="mb-4 mt-10 flex items-center gap-3">
                <Eyebrow>More studies</Eyebrow>
                <span className="h-px flex-1 bg-[var(--color-blush-deep)]/60" aria-hidden="true" />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {more.map((project) => (
                  <BentoTile key={project.id} project={project} variant="mini" onOpen={onOpen} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
