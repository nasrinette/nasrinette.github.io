import { projects } from "../data/projects";
import type { Project } from "../types";
import ProjectCard from "./ProjectCard";

export default function ProjectCarousel({ onLearnMore }: { onLearnMore: (project: Project) => void }) {
  // the chat pitches the selected work; the side-project shelf stays on the
  // Case studies page, where "Show more" sets its expectations.
  const caseStudies = projects.filter((p) => !p.sideProject);
  if (caseStudies.length === 0) {
    return (
      <p className="text-base italic text-[var(--color-ink-soft)]">
        No projects to show yet, check back soon!
      </p>
    );
  }

  return (
    <div
      className="scroll-warm -mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-2"
      role="list"
      aria-label="Projects"
    >
      {caseStudies.map((project) => (
        <div role="listitem" key={project.id}>
          <ProjectCard project={project} onLearnMore={onLearnMore} />
        </div>
      ))}
    </div>
  );
}
