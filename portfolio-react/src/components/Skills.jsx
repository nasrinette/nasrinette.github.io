import { useReveal } from '../hooks/useReveal';

const skillsData = [
  {
    title: 'Design & UX',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-gray group-hover:fill-cream transition-colors">
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4L19.5 7.5V16.5L12 20L4.5 16.5V7.5L12 4Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    items: ['UX Research & User Personas', 'Prototyping', 'Usability Testing & Iteration', 'Responsive & Accessible Design'],
  },
  {
    title: 'Technical Skills',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-gray group-hover:fill-cream transition-colors">
        <path d="M9.4 16.6L4.8 12L9.4 7.4L8 6L2 12L8 18L9.4 16.6ZM14.6 16.6L19.2 12L14.6 7.4L16 6L22 12L16 18L14.6 16.6Z" />
        <path d="M10 18L14 6H12L8 18H10Z" opacity="0.7" />
      </svg>
    ),
    items: ['HTML, CSS, JavaScript', 'React.js & Tailwind CSS', 'Data Visualization (D3.js)', 'Python & Pandas', 'Unity & C#', 'Git/GitHub'],
  },
  {
    title: 'Soft Skills',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-gray group-hover:fill-cream transition-colors">
        <path d="M16 11C17.66 11 18.99 9.66 18.99 8S17.66 5 16 5S13 6.34 13 8S14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8S9.66 5 8 5S5 6.34 5 8S6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" />
      </svg>
    ),
    items: ['Collaboration & Communication', 'Agile Methodologies', 'Presentation', 'Time Management', 'Problem Solving'],
  },
  {
    title: 'Tools',
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-gray group-hover:fill-cream transition-colors">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
      </svg>
    ),
    items: ['Adobe Creative Suite', 'Figma', 'Canva', 'Microsoft (Excel, PowerPoint, Word)', 'Jira & Trello'],
  },
];

const languages = [
  { name: 'English', level: 'C1 - IELTS 8.0', progress: 85 },
  { name: 'French', level: 'B1 - Intermediate', progress: 50 },
  { name: 'Turkish', level: 'Fluent', progress: 100 },
  { name: 'Azerbaijani', level: 'Native Speaker', progress: 100 },
];

function SkillCard({ skill }) {
  const { ref, isActive } = useReveal();

  return (
    <article
      ref={ref}
      className={`group p-8 md:p-16 border border-light-gray relative overflow-hidden transition-all duration-500 hover:bg-burgundy hover:text-cream reveal ${isActive ? 'active' : ''}`}
    >
      <div className="w-16 h-16 mb-8 opacity-30">
        {skill.icon}
      </div>
      <h3 className="font-display text-2xl md:text-3xl font-bold mb-8 tracking-tight">
        {skill.title}
      </h3>
      <ul className="list-none leading-loose">
        {skill.items.map((item, i) => (
          <li key={i} className="font-light opacity-90 transition-transform duration-300 group-hover:translate-x-2.5">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

function LanguageBar({ language }) {
  const { ref, isActive } = useReveal();

  return (
    <article ref={ref} className={`text-center min-w-[150px] reveal ${isActive ? 'active' : ''}`}>
      <div className="font-display text-2xl font-bold mb-2">
        {language.name}
      </div>
      <div className="text-sm opacity-70 tracking-wider">
        {language.level}
      </div>
      <div className="w-full h-1.5 bg-cream/20 rounded mt-4 overflow-hidden">
        <div
          className={`language-progress-bar ${isActive ? 'active' : ''}`}
          style={{ '--progress-width': `${language.progress}%` }}
        />
      </div>
    </article>
  );
}

export function Skills() {
  const { ref, isActive } = useReveal();

  return (
    <section id="skills" className="py-16 px-8 md:px-16 bg-cream relative overflow-hidden">
      <div ref={ref} className={`mb-20 relative reveal ${isActive ? 'active' : ''}`}>
        <div className="font-display text-[8rem] md:text-[10rem] font-black opacity-10 leading-none pointer-events-none">
          03
        </div>
        <h2 className="font-display text-4xl md:text-6xl font-black tracking-[-2px] relative z-10">
          Skills & Expertise
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
        {skillsData.map((skill) => (
          <SkillCard key={skill.title} skill={skill} />
        ))}
      </div>

      {/* Languages section */}
      <div className="col-span-1 md:col-span-2 p-8 md:p-16 bg-burgundy text-cream flex justify-around items-center flex-wrap gap-12 mt-0">
        {languages.map((language) => (
          <LanguageBar key={language.name} language={language} />
        ))}
      </div>
    </section>
  );
}
