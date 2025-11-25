export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-burgundy relative overflow-hidden py-24 px-8">
      {/* Background pattern - matching original with rotate: 2360deg */}
      <div
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none opacity-50"
        style={{
          background: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23754946' opacity='0.1'/%3E%3Ccircle cx='50' cy='50' r='40' fill='none' stroke='%23F5F5F0' stroke-width='0.1' opacity='0.2'/%3E%3C/svg%3E\")",
          rotate: '2360deg'
        }}
      />

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 md:gap-16 items-center relative z-10">
        {/* Image wrapper - shows first on mobile */}
        <div className="relative order-first md:order-last flex justify-center md:justify-end">
          <div className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full overflow-hidden border-4 border-cream bg-brown flex items-center justify-center">
            <img
              src="/assets/me.png"
              alt="Nazrin Nasirova"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[330px] md:h-[330px] border-2 border-cream rounded-full opacity-20" />
        </div>

        {/* Content */}
        <div className="text-center md:text-left">
          <p className="text-cream text-sm tracking-[3px] uppercase mb-6 opacity-80">
            Product Designer & HCI Student
          </p>
          <h1 className="font-display text-4xl md:text-7xl font-black text-cream leading-[0.9] mb-8 tracking-[-3px]">
            Nazrin<br />Nasirova
          </h1>
          <p className="text-cream leading-relaxed font-light max-w-[500px] opacity-90 mb-12 text-lg mx-auto md:mx-0">
            MSc student at Institut Polytechnique de Paris specializing in
            interaction design. I combine user research (interviews, personas,
            competitive analysis) with iterative prototyping to create
            solutions that address real pain points, validated through
            usability testing and heuristic evaluation.
          </p>
          <div className="flex gap-6 flex-wrap justify-center md:justify-start">
            <a
              href="#projects"
              className="px-10 py-4 text-cream border-2 border-cream bg-burgundy text-sm tracking-wider uppercase font-medium hover:bg-cream hover:text-burgundy transition-all duration-300 no-underline"
            >
              View Work
            </a>
            <a
              href="/Nazrin_Nasirova_CV.pdf"
              download="Nazrin_Nasirova_CV.pdf"
              className="px-10 py-4 text-cream border-2 border-cream bg-burgundy text-sm tracking-wider uppercase font-medium hover:bg-cream hover:text-burgundy transition-all duration-300 no-underline"
            >
              Download CV
            </a>
            <a
              href="#contact"
              className="px-10 py-4 text-cream border-2 border-cream bg-burgundy text-sm tracking-wider uppercase font-medium hover:bg-cream hover:text-burgundy transition-all duration-300 no-underline"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
