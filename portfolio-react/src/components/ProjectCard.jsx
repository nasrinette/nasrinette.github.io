import { Link } from 'react-router-dom';
import { useReveal } from '../hooks/useReveal';

export function ProjectCard({ project, index }) {
  const { ref, isActive } = useReveal();

  return (
    <article
      ref={ref}
      onClick={() => window.location.href = project.link}
      className={`project-card overflow-hidden transition-all duration-500 cursor-pointer hover:-translate-y-2 reveal ${isActive ? 'active' : ''}`}
    >
      <div className="w-full h-[300px] md:h-[500px] overflow-hidden bg-gradient-to-br from-burgundy to-brown relative flex items-center justify-center text-cream text-5xl">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-all duration-500"
        />
        <div className="absolute top-6 right-6 font-display text-5xl font-black text-cream drop-shadow-lg">
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>
      <div className="pt-8">
        <div className="flex items-center justify-between gap-4 mb-4">
          <span className="font-display text-2xl md:text-3xl font-bold text-burgundy tracking-tight leading-tight flex-1 hover:text-brown transition-colors">
            {project.title}
          </span>
          <span className="w-6 h-6 min-w-[24px] transition-transform hover:scale-125">
            <svg viewBox="0 0 24 24" className="w-full h-full fill-burgundy">
              <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
            </svg>
          </span>
        </div>
        <p className="font-normal leading-relaxed text-gray mb-6 text-lg">
          {project.description}
        </p>
      </div>
    </article>
  );
}
