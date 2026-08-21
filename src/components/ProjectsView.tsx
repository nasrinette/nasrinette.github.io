import { useState } from "react";
import { ArrowRight, ChevronDown, FolderKanban } from "lucide-react";
import { projects } from "../data/projects";
import { profile } from "../data/profile";
import type { Project } from "../types";
import { Eyebrow, TagPill } from "./CaseStudyKit";
import { GifCover, WindowChrome } from "./Artifact";

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

function IconChip({ project }: { project: Project }) {
  const Icon = project.icon;
  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-lg)] shadow-[var(--shadow-soft)]"
      style={{ background: `linear-gradient(140deg, ${project.gradient[0]}, ${project.gradient[1]})` }}
      aria-hidden="true"
    >
      <Icon size={22} strokeWidth={1.75} style={{ color: "var(--color-on-sunset)" }} className="opacity-80" />
    </div>
  );
}

/* one card per study, every study equal: icon + year, cover, title, summary,
   tags, and an arrow that answers the hover. */
function ProjectCard({ project, onOpen }: { project: Project; onOpen: (id: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project.id)}
      className="card-warm card-lift focus-ring group relative flex flex-col gap-2.5 overflow-hidden p-5 text-left"
    >
      <ColorBlob gradient={project.gradient} className="-right-12 -top-14" />
      <div className="relative flex items-center justify-between">
        <IconChip project={project} />
        <span className="font-[var(--font-mono)] text-[13px] text-[var(--color-ink-soft)]">{project.year}</span>
      </div>
      {project.cover && (
        <div className="relative mt-1 flex w-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-blush-deep)]/50">
          <WindowChrome />
          <GifCover
            src={project.cover}
            className="aspect-[16/10] w-full bg-[var(--color-blush)] object-cover object-top"
          />
        </div>
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

/* compact row for the side-project shelf — the demotion is the styling */
function SideProjectRow({ project, onOpen }: { project: Project; onOpen: (id: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(project.id)}
      className="card-warm card-lift focus-ring group relative flex flex-row items-center gap-3 overflow-hidden p-4 text-left"
    >
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

/* the sixth cell of the grid — an iOS-folder-style card previewing the
   shelved projects, so the 3×2 layout has no empty cell. Clicking unfolds
   them as compact rows below the grid. */
function ShelfCard({ items, open, onToggle }: { items: Project[]; open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="card-warm card-lift focus-ring group relative flex flex-col gap-2.5 overflow-hidden p-5 text-left"
    >
      <div className="relative flex items-center justify-between">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-blush)] shadow-[var(--shadow-soft)]"
          aria-hidden="true"
        >
          <FolderKanban size={22} strokeWidth={1.75} className="text-[var(--color-rose-dark)] opacity-80" />
        </div>
        <span className="font-[var(--font-mono)] text-[13px] text-[var(--color-ink-soft)]">
          {items.length} projects
        </span>
      </div>
      <div className="relative mt-1 flex aspect-[16/10] w-full items-center justify-center rounded-[var(--radius-lg)] border border-[var(--color-blush-deep)]/50 bg-[var(--color-blush)]">
        <div className="grid grid-cols-2 gap-3">
          {items.map((project) => (
            <IconChip key={project.id} project={project} />
          ))}
        </div>
      </div>
      <h3 className="relative mt-1 font-[var(--font-display)] text-xl font-bold text-[var(--color-ink)]">
        Side projects
      </h3>
      <p className="relative text-base leading-snug text-[var(--color-ink-soft)]">
        I love building things, so I made more than the recommended number of case studies. Discover more if you have time.
      </p>
      <div className="relative mt-auto flex items-center justify-between gap-2 pt-2">
        <span className="font-[var(--font-display)] text-sm font-semibold text-[var(--color-rose-dark)]">
          {open ? "Hide" : "Show all"}
        </span>
        <ChevronDown
          size={16}
          strokeWidth={2}
          aria-hidden="true"
          className={`shrink-0 text-[var(--color-rose-dark)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </div>
    </button>
  );
}

export default function ProjectsView({ onOpen }: { onOpen: (projectId: string) => void }) {
  // the array order IS the display order — same order the chat carousel
  // pitches. Side projects sit in their own section behind "Show all".
  const caseStudies = projects.filter((p) => !p.sideProject);
  const sideProjects = projects.filter((p) => p.sideProject);
  const [shelfOpen, setShelfOpen] = useState(false);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-8 sm:py-8">
      <header className="mb-6 space-y-2">
        <Eyebrow>Selected work</Eyebrow>
        <h1 className="font-[var(--font-display)] text-[26px] font-bold text-[var(--color-ink)] sm:text-[32px]">
          Case studies
        </h1>
        <p className="max-w-xl text-base text-[var(--color-ink-soft)]">
          Full write-ups of shipped work: the problem, the process, and what actually changed. By {profile.name}.
        </p>
        <span className="sunset-rule w-16" aria-hidden="true" />
      </header>

      {caseStudies.length === 0 ? (
        <p className="italic text-[var(--color-ink-soft)]">No case studies published yet, check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={onOpen} />
          ))}
          {sideProjects.length > 0 && (
            <ShelfCard items={sideProjects} open={shelfOpen} onToggle={() => setShelfOpen((open) => !open)} />
          )}
        </div>
      )}

      {shelfOpen && sideProjects.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sideProjects.map((project) => (
            <SideProjectRow key={project.id} project={project} onOpen={onOpen} />
          ))}
        </div>
      )}
    </div>
  );
}
