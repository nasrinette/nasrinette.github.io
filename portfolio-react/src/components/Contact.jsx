import { useReveal } from '../hooks/useReveal';

export function Contact() {
  const { ref, isActive } = useReveal();

  return (
    <section id="contact" className="py-16 px-8 md:px-16 bg-burgundy text-cream text-center relative overflow-hidden">
      <div className="mb-16">
        <h2 className="font-display text-4xl md:text-6xl font-black tracking-[-2px] text-cream">
          Let's Connect
        </h2>
      </div>

      <div ref={ref} className={`max-w-[600px] mx-auto reveal ${isActive ? 'active' : ''}`}>
        <div className="mb-12">
          <div className="inline-block mx-6 mb-4 font-light opacity-90">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current inline-block align-middle mr-2">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            Paris, France
          </div>
          <div className="inline-block mx-6 mb-4 font-light opacity-90">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current inline-block align-middle mr-2">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            +33 6 05 51 79 66
          </div>
        </div>

        <div className="flex justify-center gap-8">
          <a
            href="mailto:nazrin.nasirovaa@gmail.com"
            className="w-12 h-12 border-2 border-cream rounded-full flex items-center justify-center transition-all duration-300 hover:bg-cream hover:-translate-y-1 group"
            aria-label="Email"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-cream group-hover:fill-burgundy transition-colors">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </a>
          <a
            href="https://github.com/nasrinette"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 border-2 border-cream rounded-full flex items-center justify-center transition-all duration-300 hover:bg-cream hover:-translate-y-1 group"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-cream group-hover:fill-burgundy transition-colors">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.43 9.8 8.2 11.38.6.11.82-.26.82-.58 0-.29-.01-1.05-.01-2.06-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/nazrin-nasirova/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 border-2 border-cream rounded-full flex items-center justify-center transition-all duration-300 hover:bg-cream hover:-translate-y-1 group"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-cream group-hover:fill-burgundy transition-colors">
              <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
            </svg>
          </a>
        </div>
      </div>

      <p className={`max-w-[600px] mx-auto mt-12 text-lg leading-relaxed font-light italic opacity-80 reveal ${isActive ? 'active' : ''}`}>
        Passionate about creating intuitive and impactful user experiences.
        Currently seeking opportunities at the intersection of design,
        technology, and innovation.
      </p>
    </section>
  );
}
