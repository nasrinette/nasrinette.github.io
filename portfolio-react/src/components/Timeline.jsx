import { useReveal } from '../hooks/useReveal';

const timelineData = [
  {
    period: '2024 - 2026',
    title: 'MSc in Computer Science Interaction, Graphics & Design',
    subtitle: 'Institut Polytechnique de Paris',
    description: 'Focus on human-computer interaction, advanced UI/UX design, and immersive technologies. CGPA: 16.5/20',
    details: null,
  },
  {
    period: 'Jan 2024 – Aug 2024',
    title: 'Frontend Development | Internship',
    subtitle: 'Polygraf AI',
    description: null,
    details: [
      'Translated technical logic into interface elements for web, browser extension, and desktop apps.',
      'Designed an AI detector browser extension & redesigned ecommerce extension. Led a launch event with 150+ new installs.',
      'Organized & designed a data-labeling competition, gathering 10K+ samples from 100+ participants.',
    ],
  },
  {
    period: 'May 2023 – Sep 2023',
    title: 'UI/UX Designer | Internship',
    subtitle: 'KTLab | Cybersecurity LAB',
    description: null,
    details: [
      'Designed and tested prototypes for a cybersecurity learning app.',
      'Ran usability sessions and iterated 5+ design versions.',
      'Worked with dev team to align UI with accessibility and brand guidelines.',
    ],
  },
  {
    period: '2020 - 2024',
    title: 'BSc in Computer Science',
    subtitle: 'Université de Strasbourg (UFAZ)',
    description: 'Dual-degree program (UFAZ) between Université de Strasbourg and Azerbaijan State Oil and Industry University. CGPA: 14.5/20',
    details: null,
  },
];

function TimelineItem({ item, index }) {
  const { ref, isActive } = useReveal();

  return (
    <article
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative reveal ${isActive ? 'active' : ''}`}
    >
      {/* Timeline marker */}
      <div className="absolute left-5 md:left-1/2 top-8 w-4 h-4 bg-cream rounded-full -translate-x-1/2 z-10 shadow-[0_0_0_4px_#3a1c1e]" />

      <div className={`${index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-2'} bg-cream/5 p-8 md:p-10 rounded-lg border border-cream/10 transition-all duration-500 hover:bg-cream/[0.08] hover:border-cream/20 hover:-translate-y-1 ml-12 md:ml-0 md:my-4`}>
        <p className="text-sm tracking-[2px] uppercase opacity-60 mb-4">
          {item.period}
        </p>
        <h3 className="font-display text-2xl md:text-3xl font-bold mb-2 tracking-tight">
          {item.title}
        </h3>
        <p className="text-lg opacity-80 mb-6">
          {item.subtitle}
        </p>
        {item.description && (
          <p className="leading-relaxed font-light opacity-90">
            {item.description}
          </p>
        )}
        {item.details && (
          <ul className="list-none leading-relaxed font-light opacity-90">
            {item.details.map((detail, i) => (
              <li key={i} className="mb-3 pl-6 relative before:content-['—'] before:absolute before:left-0 before:opacity-50">
                {detail}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export function Timeline() {
  const { ref, isActive } = useReveal();

  return (
    <section id="experience" className="py-16 px-8 md:px-16 bg-burgundy text-cream relative overflow-hidden">
      <div ref={ref} className={`mb-20 relative reveal ${isActive ? 'active' : ''}`}>
        <div className="font-display text-[8rem] md:text-[10rem] font-black opacity-10 leading-none pointer-events-none text-cream">
          02
        </div>
        <h2 className="font-display text-4xl md:text-6xl font-black tracking-[-2px] relative z-10 text-cream">
          Professional Background
        </h2>
      </div>

      <div className="max-w-[1200px] mx-auto relative py-8">
        {/* Timeline line */}
        <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 bg-cream opacity-30 -translate-x-1/2" />

        {timelineData.map((item, index) => (
          <TimelineItem key={item.period} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
