import { projects } from "../data/projects";
import type { Project } from "../types";
import ProjectCard from "./ProjectCard";

export default function ProjectCarousel({ onLearnMore }: { onLearnMore: (project: Project) => void }) {
  if (projects.length === 0) {
    return (
      <p className="text-sm italic text-[var(--color-ink-soft)]">
        No projects to show yet — check back soon!
      </p>
    );
  }

  return (
    <div
      className="scroll-warm -mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-2"
      role="list"
      aria-label="Projects"
    >
      {projects.map((project) => (
        <div role="listitem" key={project.id}>
          <ProjectCard project={project} onLearnMore={onLearnMore} />
        </div>
      ))}
    </div>
  );
}
