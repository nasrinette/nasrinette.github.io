import { useReveal } from '../hooks/useReveal';
import { ProjectCard } from './ProjectCard';

const projects = [
  {
    title: 'Interactive Menu App',
    description: 'Designed a digital restaurant ordering experience to eliminate waiter dependency, provide complete ingredient transparency, and simplify group payments for all users.',
    image: '/assets/menu-cover.png',
    link: '/case-study/interactive-menu',
  },
  {
    title: 'UX Study of Goodreads Book Recommendation',
    description: 'Conducted a comprehensive UX analysis of the Goodreads platform, identifying key usability issues and proposing actionable design improvements to enhance user engagement and satisfaction.',
    image: '/assets/goodreads.png',
    link: '/case-study/goodreads',
  },
  {
    title: 'Augmented Storage Room — IllumiLend',
    description: 'Designed a color-guided system that helps students quickly find, collect, and return reserved equipment in university storage rooms using floor arrows, shelf lighting, and simple confirmations.',
    image: '/assets/reserve/illumilend-hero.png',
    link: '/case-study/illumilend',
  },
  {
    title: 'Coffee Data Visualization',
    description: 'Developed an interactive data visualization project to explore global coffee production trends, utilizing D3.js to create dynamic charts and maps that highlight key insights and patterns in the coffee industry.',
    image: '/assets/coffee/coffee-hero.png',
    link: '/case-study/coffee-vis',
  },
];

export function Projects() {
  const { ref, isActive } = useReveal();

  return (
    <section id="projects" className="py-16 px-8 md:px-16 bg-cream relative overflow-hidden">
      <div ref={ref} className={`mb-20 relative reveal ${isActive ? 'active' : ''}`}>
        <div className="font-display text-[8rem] md:text-[10rem] font-black opacity-10 leading-none pointer-events-none">
          01
        </div>
        <h2 className="font-display text-4xl md:text-6xl font-black tracking-[-2px] relative z-10">
          Featured Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
