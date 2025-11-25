import { useState, useEffect } from 'react';

export function CaseStudyNav({ sections }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset + window.innerHeight / 3;

      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const sectionTop = element.offsetTop;
          const sectionBottom = sectionTop + element.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveIndex(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className="fixed bottom-2 sm:bottom-4 md:bottom-6 lg:bottom-8 left-2 right-2 sm:left-4 sm:right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-auto z-[999] bg-burgundy/95 backdrop-blur-[10px] p-2 sm:p-3 md:p-2.5 lg:p-3 flex gap-1 sm:gap-2 md:gap-1 lg:gap-1.5 border-2 border-burgundy shadow-[0_8px_32px_rgba(58,28,30,0.4)] overflow-x-auto"
      style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
      aria-label="Case study sections"
    >
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`py-2 px-3 sm:py-2.5 sm:px-4 md:py-2 md:px-3 lg:py-2 lg:px-4 border-none text-xs sm:text-sm md:text-xs lg:text-sm font-medium tracking-wide uppercase whitespace-nowrap cursor-pointer transition-all duration-300 font-body flex-shrink-0 ${
            index === activeIndex
              ? 'bg-cream text-burgundy font-semibold'
              : 'bg-transparent text-cream hover:bg-cream/10'
          }`}
          aria-current={index === activeIndex ? 'true' : 'false'}
          aria-label={`Go to ${section.title} section`}
        >
          {section.title}
        </button>
      ))}
    </nav>
  );
}
