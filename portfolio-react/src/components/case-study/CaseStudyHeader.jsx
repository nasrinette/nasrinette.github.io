export function CaseStudyHeader({ title, subtitle, meta, techStack, methods, links, heroImage }) {
  const hasHeroImage = !!heroImage;

  return (
    <div className="flex flex-wrap items-center border-b-2 border-light-gray mb-4 pb-4">
      <div className={`w-full ${hasHeroImage ? 'md:w-[70%]' : ''} mb-12 pb-8 relative`}>
        <h2 className="font-display text-3xl md:text-4xl font-black text-burgundy mb-4 tracking-tight text-center md:text-left">
          {title}
        </h2>
        <p className="text-dark-gray text-lg font-light leading-relaxed text-center md:text-left">
          {subtitle}
        </p>

        {/* Meta info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
          {meta.map((item, i) => (
            <div key={i} className="flex flex-col items-start gap-4 p-4 bg-white border-2 border-light-gray transition-all duration-300 hover:border-burgundy hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center gap-2">
                <svg className="w-7 h-7 fill-burgundy" viewBox="0 0 24 24">
                  {item.icon}
                </svg>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray">
                  {item.label}
                </span>
              </div>
              <span className="text-sm font-medium text-dark-gray leading-relaxed">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Tech Stack & Methods */}
        <div className="flex flex-wrap gap-4">
          {techStack && (
            <div className="flex flex-col">
              <strong className="text-burgundy flex items-center gap-2">
                <svg className="w-4 h-4 fill-burgundy" viewBox="0 0 24 24">
                  <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
                </svg>
                Tech Stack:
              </strong>
              <span className="font-light text-dark-gray">{techStack}</span>
            </div>
          )}
          {methods && (
            <div className="flex flex-col">
              <strong className="text-burgundy flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C10.1435 2 8.36301 2.7375 7.05025 4.05025C5.7375 5.36301 5 7.14348 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.2652 8.10536 17.5196 8.29289 17.7071C8.48043 17.8946 8.73478 18 9 18H15C15.2652 18 15.5196 17.8946 15.7071 17.7071C15.8946 17.5196 16 17.2652 16 17V14.74C17.81 13.47 19 11.38 19 9C19 7.14348 18.2625 5.36301 16.9497 4.05025C15.637 2.7375 13.8565 2 12 2ZM9 21C9 21.2652 9.10536 21.5196 9.29289 21.7071C9.48043 21.8946 9.73478 22 10 22H14C14.2652 22 14.5196 21.8946 14.7071 21.7071C14.8946 21.5196 15 21.2652 15 21V20H9V21Z" fill="#3A1C1E" />
                </svg>
                Methods:
              </strong>
              <span className="font-light text-dark-gray">{methods}</span>
            </div>
          )}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-8 mt-8">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`py-3 px-8 no-underline font-semibold text-sm transition-all duration-300 inline-flex items-center gap-2 tracking-wide ${
                link.primary
                  ? 'bg-burgundy text-cream border-2 border-burgundy shadow-md hover:bg-brown hover:border-brown hover:-translate-y-0.5 hover:shadow-lg'
                  : 'bg-white text-burgundy border-2 border-burgundy hover:bg-burgundy hover:text-cream hover:-translate-y-0.5 hover:shadow-md'
              }`}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                {link.icon}
              </svg>
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Hero Image */}
      {heroImage && (
        <div className="w-full md:w-[30%]">
          <img src={heroImage} alt={title} className="w-full" />
        </div>
      )}
    </div>
  );
}
