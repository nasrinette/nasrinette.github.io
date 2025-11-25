import { useRef, useState, useEffect } from 'react';
import {
  BackButton,
  CaseStudyHeader,
  CaseStudyNav,
  Section,
  SubSection,
  StatsGrid,
  PainPointCard,
  InsightBox,
} from '../components/case-study';

// Infinite Scroll Carousel Component
function ImageCarousel({ images, size = 'default' }) {
  const scrollRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Normalize images to always have src and alt
  const normalizedImages = images.map((img, i) =>
    typeof img === 'string' ? { src: img, alt: `Image ${i + 1}` } : img
  );

  // Create extended array with clones for infinite effect
  const extendedImages = [...normalizedImages, ...normalizedImages, ...normalizedImages];
  const originalLength = normalizedImages.length;

  // Size presets
  const sizeClasses = {
    default: 'w-[180px] sm:w-[200px] md:w-[240px] lg:w-[280px]',
    large: 'w-[280px] sm:w-[320px] md:w-[400px] lg:w-[480px]',
  };

  // Initialize scroll position to middle set
  const initializeScroll = () => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.scrollWidth / 3;
      scrollRef.current.scrollLeft = itemWidth;
    }
  };

  // Handle infinite scroll logic
  const handleScroll = () => {
    if (!scrollRef.current || isTransitioning) return;

    const { scrollLeft, scrollWidth } = scrollRef.current;
    const itemWidth = scrollWidth / 3;

    // If scrolled to the end (third set), jump to middle set
    if (scrollLeft >= itemWidth * 2) {
      setIsTransitioning(true);
      scrollRef.current.style.scrollBehavior = 'auto';
      scrollRef.current.scrollLeft = scrollLeft - itemWidth;
      scrollRef.current.style.scrollBehavior = 'smooth';
      setTimeout(() => setIsTransitioning(false), 50);
    }
    // If scrolled to the beginning (first set), jump to middle set
    else if (scrollLeft <= 0) {
      setIsTransitioning(true);
      scrollRef.current.style.scrollBehavior = 'auto';
      scrollRef.current.scrollLeft = scrollLeft + itemWidth;
      scrollRef.current.style.scrollBehavior = 'smooth';
      setTimeout(() => setIsTransitioning(false), 50);
    }
  };

  // Initialize on mount
  useEffect(() => {
    setTimeout(initializeScroll, 100);
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 220;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative my-8">
      {/* Full-width container that breaks out of parent padding */}
      <div
        className="relative"
        style={{
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
        }}
      >
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-burgundy text-cream flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Scroll left"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onLoad={initializeScroll}
          className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth py-4 px-16 md:px-20"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {extendedImages.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
            >
              <img
                src={img.src}
                alt={img.alt || `Image ${(i % originalLength) + 1}`}
                className={`${sizeClasses[size]} h-auto`}
              />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-burgundy text-cream flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Scroll right"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>
      </div>

      {/* Scroll Indicator */}
      <p className="text-center text-sm text-gray mt-4 italic">
        Swipe or use arrows to explore all screens
      </p>
    </div>
  );
}

const navSections = [
  { id: 'overview', title: 'Overview' },
  { id: 'problem', title: 'Problem' },
  { id: 'design', title: 'Design' },
  { id: 'conclusion', title: 'Conclusion' },
];

const metaData = [
  {
    label: 'Role',
    value: 'Data Visualization & Web Development',
    icon: <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />,
  },
  {
    label: 'Timeline',
    value: '4 Weeks',
    icon: <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />,
  },
  {
    label: 'Team',
    value: '3 members',
    icon: <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />,
  },
  {
    label: 'Institution',
    value: 'Télécom Paris (Master IGD)',
    icon: <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />,
  },
];

const links = [
  {
    href: 'https://data-vis-project.netlify.app/',
    label: 'Live Demo',
    primary: true,
    icon: <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c1.1 0 2 2 2 2h14c1.11 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />,
  },
  {
    href: 'https://github.com/ksenichault/Data-Viz-Project',
    label: 'GitHub',
    primary: false,
    icon: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />,
  },
];

const overviewStats = [
  { number: '94', label: 'Countries Analyzed' },
  { number: '60+', label: 'Years of Data' },
  { number: '5', label: 'Visualization Types' },
  { number: '4', label: 'Major Sections' },
];

const painPoints = [
  {
    number: '01',
    title: 'Fragmented Data',
    description: 'Data spans FAO statistics, production reports, consumer surveys, and reviews across different formats.',
  },
  {
    number: '02',
    title: 'Hidden Relationships',
    description: 'Static charts fail to reveal network structures and trade flow dynamics between nations.',
  },
  {
    number: '03',
    title: 'Temporal Complexity',
    description: 'Production evolves over decades. Static snapshots miss historical context and trends.',
  },
];

const visualizationStrategies = [
  {
    title: 'Trade Networks',
    text: 'Force-directed graph shows trading relationships with draggable nodes sized by volume. Toggle to map view for geographic context. Color-coded by net importer/exporter status.',
  },
  {
    title: 'Production',
    text: 'Interactive dashboard with choropleth map, bar charts with boxplots showing historical distribution, and temporal line charts. Year slider enables time-series exploration.',
  },
  {
    title: 'Consumption',
    text: 'Radar chart for type preferences over time, pictorial unit charts for intuitive price/volume comparisons, and lollipop chart for lifetime spending rankings.',
  },
  {
    title: 'Quality',
    text: 'Bubble chart encoding price, rating, and review count. Word cloud reveals flavor descriptors by roast type. Choropleth shows regional preferences.',
  },
];

const insights = [
  {
    title: "Brazil's Dominance",
    description: 'Produces ~35% of global coffee. Temporal view reveals volatility from frost events and drought cycles.',
    icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />,
  },
  {
    title: 'Nordic Leadership',
    description: 'Finland, Norway, Iceland lead in per-capita consumption (12+ cups/day) despite producing zero coffee.',
    icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />,
  },
  {
    title: 'Trade Clusters',
    description: 'Network shows distinct regional patterns: Latin America → North America, Africa → Europe, Asia → Pacific.',
    icon: <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />,
  },
];

const screenshots = [
  { src: '/assets/coffee/coffee-main.png', alt: 'Main dashboard' },
  { src: '/assets/coffee/trade.png', alt: 'Trade networks' },
  { src: '/assets/coffee/coffee-prod.png', alt: 'Production view' },
  { src: '/assets/coffee/coffee-cons.png', alt: 'Consumption patterns' },
  { src: '/assets/coffee/coffee-qual.png', alt: 'Quality metrics' },
];

export function CoffeeVisCase() {
  return (
    <div className="min-h-screen bg-cream pt-[100px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8 pb-16 relative">
        <BackButton />

        <CaseStudyHeader
          title="Coffee Across the Globe"
          subtitle="An interactive data visualization exploring global coffee production, trade networks, consumption patterns, and quality metrics."
          meta={metaData}
          techStack="D3.js, HTML5, CSS3, JavaScript"
          links={links}
        />

        {/* Screenshot Gallery */}
        <ImageCarousel images={screenshots} size="large" />

        {/* Overview */}
        <Section id="overview" title="Overview">
          <p className="leading-relaxed text-dark-gray mb-8">
            An interactive web-based dashboard synthesizing five datasets
            covering 94 countries and 60+ years of coffee history. Users explore
            global trade networks, production trends, consumption patterns, and
            quality metrics through network graphs, choropleth maps, temporal
            charts, and word clouds.
          </p>

          <StatsGrid stats={overviewStats} />
        </Section>

        {/* Problem */}
        <Section
          id="problem"
          title="Problem"
          icon={<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />}
        >
          <p className="leading-relaxed text-dark-gray mb-8">
            Coffee industry data exists in siloed datasets that are difficult to
            synthesize. Understanding trade flows, production trends, and
            quality patterns requires integrating disconnected sources and
            making complex relationships accessible.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            {painPoints.map((point) => (
              <PainPointCard key={point.number} {...point} />
            ))}
          </div>

          <InsightBox title="Design Question">
            <strong>How might we create an interactive system that reveals the
            global coffee story across production, trade, consumption, and
            quality?</strong>
          </InsightBox>
        </Section>

        {/* Design Solution */}
        <Section
          id="design"
          title="Design Solution"
          icon={<path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />}
        >
          {/* Video Section */}
          <div className="my-8">
            <div className="relative w-full aspect-video bg-dark-gray overflow-hidden">
              <video
                className="w-full h-full object-cover"
                controls
                preload="metadata"
                poster="/assets/coffee/coffee-hero.png"
              >
                <source src="/assets/coffee/Coffe.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-center text-sm text-gray italic mt-4">
              Interactive demonstration of the visualization features
            </p>
          </div>

          <SubSection title="Data Integration">
            <p className="leading-relaxed text-dark-gray mb-8">
              We integrated five datasets: consumption & spending data (Cafely
              Research), production & trade statistics for 94 countries (Kaggle),
              temporal consumption trends 2000-2023, product reviews with ratings
              and prices, and bilateral trade flows (FAO FAOSTAT).
            </p>
          </SubSection>

          <SubSection title="Visualization Strategy">
            <p className="leading-relaxed text-dark-gray mb-8">
              Each section uses visualization types matched to data
              characteristics:
            </p>

            <div className="space-y-4 my-8">
              {visualizationStrategies.map((strategy, i) => (
                <div key={i} className="p-6 bg-white border-2 border-light-gray border-l-4 border-l-burgundy">
                  <h5 className="text-lg font-bold text-burgundy mb-2">{strategy.title}</h5>
                  <p className="text-dark-gray">{strategy.text}</p>
                </div>
              ))}
            </div>
          </SubSection>

          <SubSection title="Implementation">
            <p className="leading-relaxed text-dark-gray mb-8">
              Built with D3.js for custom interactions and flexibility. Modular
              architecture ensures consistency. Responsive SVG scaling maintains
              readability. Performance optimized through debouncing and
              requestAnimationFrame for smooth animations with large datasets.
            </p>
          </SubSection>
        </Section>

        {/* Conclusion */}
        <Section
          id="conclusion"
          title="Impact & Insights"
          icon={<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="#3a1c1e" />}
        >
          <p className="leading-relaxed text-dark-gray mb-8">
            The visualization revealed non-obvious patterns in the global coffee
            industry:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            {insights.map((insight, i) => (
              <div key={i} className="bg-white p-8 border-2 border-light-gray text-center">
                <svg
                  className="w-14 h-14 mx-auto mb-4 fill-burgundy opacity-80"
                  viewBox="0 0 24 24"
                >
                  {insight.icon}
                </svg>
                <h5 className="text-lg font-bold text-burgundy mb-2">{insight.title}</h5>
                <p className="text-dark-gray text-sm">{insight.description}</p>
              </div>
            ))}
          </div>

          <SubSection title="Key Learnings">
            <div className="bg-white p-8 border-2 border-light-gray mb-6">
              <h4 className="text-xl font-bold text-burgundy mb-4">✓ Visualization Diversity</h4>
              <p className="leading-relaxed text-dark-gray">
                Matching chart types to data characteristics (networks for
                relationships, maps for geography, timelines for trends) made each
                section clearer than a one-size-fits-all approach.
              </p>
            </div>

            <div className="bg-white p-8 border-2 border-light-gray mb-6">
              <h4 className="text-xl font-bold text-burgundy mb-4">✓ Interactive Discovery</h4>
              <p className="leading-relaxed text-dark-gray">
                Sliders and filters transformed static analysis into active
                exploration, letting users discover patterns we didn't explicitly
                highlight.
              </p>
            </div>

            <div className="bg-white p-8 border-2 border-light-gray mb-6">
              <h4 className="text-xl font-bold text-burgundy mb-4 flex items-center gap-2">
                <span className="text-[#ff9800]">⚠</span> D3.js Trade-offs
              </h4>
              <p className="leading-relaxed text-dark-gray">
                D3's flexibility enabled custom interactions but required
                significant debugging time. For simpler projects, higher-level
                libraries might be more efficient.
              </p>
            </div>
          </SubSection>
        </Section>
      </div>

      <CaseStudyNav sections={navSections} />
    </div>
  );
}
