import { useRef, useState, useEffect } from 'react';
import {
  BackButton,
  CaseStudyHeader,
  CaseStudyNav,
  Section,
  SubSection,
  ResultsGrid,
  PainPointCard,
  InsightBox,
} from '../components/case-study';

const navSections = [
  { id: 'overview', title: 'Overview' },
  { id: 'problem', title: 'Problem' },
  { id: 'research', title: 'Research' },
  { id: 'design', title: 'Design' },
  { id: 'testing', title: 'Testing' },
  { id: 'conclusion', title: 'Conclusion' },
];

const metaData = [
  {
    label: 'Role',
    value: 'UX Design & Usability Testing',
    icon: <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />,
  },
  {
    label: 'Timeline',
    value: '1 Week Design Sprint',
    icon: <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />,
  },
  {
    label: 'Team',
    value: '4 members',
    icon: <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />,
  },
  {
    label: 'Institution',
    value: 'Télécom Paris',
    icon: <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />,
  },
];

const links = [
  {
    href: 'https://www.figma.com/proto/wOZYuPmU3fsbzqpPIKWBUE/reserve?node-id=2013-425&t=B4GfEWrhlV6EvaMJ-0&scaling=min-zoom&content-scaling=fixed&page-id=2031%3A2918&starting-point-node-id=2013%3A425',
    label: 'Figma Prototype',
    primary: true,
    icon: <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />,
  },
];

const flowSteps = [
  { number: '01', name: 'Badge Entry', detail: 'Door scanner authenticates user and loads reservation' },
  { number: '02', name: 'Color Assignment', detail: 'System assigns unique color across all touchpoints' },
  { number: '03', name: 'Floor Navigation', detail: 'Projected arrow guides to target shelf' },
  { number: '04', name: 'Shelf Lighting', detail: 'Specific cubby illuminates in matching color' },
  { number: '05', name: 'Screen Mirrors', detail: 'Phone and wall display show items, colors, due times' },
  { number: '06', name: 'Confirmation', detail: 'Future: Light change + progress indicator verify action' },
];

const painPoints = [
  {
    number: '01',
    title: 'No Physical Wayfinding',
    description: 'Digital systems show what you reserved, not where it is. Users hunt through shelves translating codes like "B-07" to physical locations.',
  },
  {
    number: '02',
    title: 'Missing Confirmation Loop',
    description: 'No system acknowledgment after pickup or return. Users leave uncertain whether actions registered.',
  },
  {
    number: '03',
    title: 'No Automated Verification',
    description: 'Misplacements surface late. Staff manually reconcile inventory; disputes arise without evidence trails.',
  },
];

const designPrinciples = [
  {
    title: 'Make the Room Smart, Not Just the App',
    text: 'Embed guidance in the physical environment—floor projections and shelf lighting create an ambient interface.',
  },
  {
    title: 'Color as Primary Navigation Language',
    text: 'Color is processed pre-attentively. Users see "their blue" instantly across room, shelf, and screen.',
  },
  {
    title: 'Multi-Modal Redundancy',
    text: 'Wall screen mirrors mobile content for users without phones, dead batteries, or who prefer larger displays.',
  },
];

const wireframeImages = [
  { src: '/assets/reserve/sk1.png', alt: 'Wireframe sketch 1' },
  { src: '/assets/reserve/sk2.png', alt: 'Wireframe sketch 2' },
  { src: '/assets/reserve/sk3.png', alt: 'Wireframe sketch 3' },
  { src: '/assets/reserve/sk4.png', alt: 'Wireframe sketch 4' },
  { src: '/assets/reserve/sk5.png', alt: 'Wireframe sketch 5' },
  { src: '/assets/reserve/sk6.png', alt: 'Wireframe sketch 6' },
];

const mobileScreens = [
  '/assets/reserve/f1.png',
  '/assets/reserve/f2.png',
  '/assets/reserve/f3.png',
  '/assets/reserve/f8.png',
  '/assets/reserve/f4.png',
  '/assets/reserve/f9.png',
  '/assets/reserve/f5.png',
  '/assets/reserve/f6.png',
  '/assets/reserve/f7.png',
];

const testingDemographics = [
  { number: '10', label: 'Participants' },
  { number: '5F / 5M', label: 'Gender Split' },
  { number: '33', label: 'Avg Age' },
  { number: '0-4+', label: 'Borrows/Year' },
];

const testingResults = [
  { metric: '80%', label: 'Color Mapping Helpful', insight: 'Explicitly stated color guidance sped navigation. Concerns: red perceived as warning; many simultaneous users might confuse.', highlight: true },
  { metric: '70%', label: 'Hesitated at Pickup', insight: 'Brief pause after taking item, looking for confirmation. Root: no feedback loop showing "system registered."' },
  { metric: '60%', label: 'Would Use as-Is', insight: 'Comfortable using current version immediately. Remaining 40% want explicit confirmations first.', highlight: true },
  { metric: '60%', label: 'Skipped Badge Scan', insight: 'Prototype artifact—no physical door scanner. Expected to vanish with real hardware.' },
  { metric: '20%', label: 'Room Too Dark', insight: 'Minority found ambient lighting insufficient. LEDs compensated for most.' },
  { metric: '10%', label: 'Checked Wall Screen', insight: 'Most relied on phones. 1 user glanced at wall screen—validates mirror-only approach.' },
];

const userQuotes = [
  {
    text: "I wasn't sure if the system registered my action, some tiny confirmation would remove the stress.",
    author: 'Participant 7',
  },
  {
    text: "The color makes it super fast. I didn't even think about it, just followed the blue light.",
    author: 'Participant 3',
  },
  {
    text: "Red feels like something is wrong. Maybe use it for errors, not for telling me where my item is.",
    author: 'Participant 9',
  },
];

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

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
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

export function IllumilendCase() {
  return (
    <div className="min-h-screen bg-cream pt-[100px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8 pb-16 relative">
        <BackButton />

        <CaseStudyHeader
          title="IllumiLend - Augmented Storage Room"
          subtitle="A color-guided system helping students quickly find and return reserved equipment."
          meta={metaData}
          techStack="Figma, LED shelf, PowerPoint, Projector"
          methods="Low/Hi-Fi prototyping, Task-based study (n=10), Think-aloud, Thematic Coding"
          links={links}
          heroImage="/assets/reserve/illumilend-hero.gif"
        />

        {/* Overview */}
        <Section id="overview" title="Overview">
          <p className="leading-relaxed text-dark-gray mb-8">
            IllumiLend transforms chaotic university equipment rooms into
            intuitive, self-service spaces. Students swipe their ID, follow
            colored floor arrows, and pick up items from illuminated cubbies—all
            synchronized with mobile and wall displays. Testing with 10 users
            showed 80% found the color paths faster, and 60% were ready to use
            it immediately.
          </p>

          <SubSection title="The IllumiLend Flow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              {flowSteps.map((step) => (
                <div
                  key={step.number}
                  className="flex items-start gap-4 p-4 bg-white border-2 border-light-gray"
                >
                  <div className="font-display text-2xl font-black text-burgundy">
                    {step.number}
                  </div>
                  <div>
                    <div className="font-semibold text-burgundy">{step.name}</div>
                    <div className="text-sm text-gray">{step.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </SubSection>
        </Section>

        {/* Problem */}
        <Section
          id="problem"
          title="The Problem"
          icon={<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />}
        >
          <p className="leading-relaxed text-dark-gray mb-8">
            Digital reservation systems efficiently handle bookings but abandon
            users at the storage room door. Users waste time searching shelves
            and leave uncertain whether the system registered their actions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            {painPoints.map((point) => (
              <PainPointCard key={point.number} {...point} />
            ))}
          </div>

          <InsightBox title="Design Challenge">
            <strong>How might we make the storage environment itself guide and
            confirm user actions?</strong> The gap isn't in reservation technology—it's in the physical
            experience once users enter the room.
          </InsightBox>
        </Section>

        {/* User Research */}
        <Section
          id="research"
          title="User Research"
          icon={<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />}
        >
          <SubSection title="Observations & Analysis">
            <p className="leading-relaxed text-dark-gray mb-8">
              At Télécom Paris equipment room, we observed: students book online
              but receive minimal location details, manually scan labels to match
              codes, take items without system confirmation, and staff manually
              check returns.
            </p>
          </SubSection>

          <SubSection title="Competitive Analysis">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              <div className="p-6 bg-white border-2 border-light-gray">
                <strong className="text-burgundy">Library Systems</strong><br />
                <span className="text-dark-gray">RFID checkout but no wayfinding to shelves</span>
              </div>
              <div className="p-6 bg-white border-2 border-light-gray">
                <strong className="text-burgundy">Warehouse Picking</strong><br />
                <span className="text-dark-gray">Handheld scanners with routes—not self-service</span>
              </div>
              <div className="p-6 bg-white border-2 border-light-gray">
                <strong className="text-burgundy">Smart Lockers</strong><br />
                <span className="text-dark-gray">Automate retrieval but need heavy infrastructure</span>
              </div>
              <div className="p-6 bg-white border-2 border-light-gray">
                <strong className="text-burgundy">AR Navigation</strong><br />
                <span className="text-dark-gray">Requires phone-holding—high cognitive load</span>
              </div>
            </div>

            <p className="leading-relaxed text-dark-gray mb-8">
              <strong>Key insight:</strong> No solution combined ambient guidance
              (hands-free), personalized color mapping, and immediate verification
              for university equipment rooms.
            </p>
          </SubSection>

          <SubSection title="Core Design Principles">
            <div className="space-y-4 my-8">
              {designPrinciples.map((principle, i) => (
                <div key={i} className="p-6 bg-white border-2 border-light-gray border-l-4 border-l-burgundy">
                  <h5 className="text-lg font-bold text-burgundy mb-2">{principle.title}</h5>
                  <p className="text-dark-gray">{principle.text}</p>
                </div>
              ))}
            </div>
          </SubSection>
        </Section>

        {/* Design Process */}
        <Section
          id="design"
          title="Design Process"
          icon={<path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />}
        >
          <p className="leading-relaxed text-dark-gray mb-4">
            <strong>Stage 1:</strong> Hand-drawn room layouts with colored
            markers simulating light patterns.
          </p>

          <figure className="w-full overflow-hidden transition-all duration-300 hover:-translate-y-0.5">
            <img
              src="/assets/reserve/ill-skc.png"
              alt="Initial whiteboard sketches showing color-coded flow"
              className="w-full h-auto block"
            />
          </figure>

          <p className="leading-relaxed text-dark-gray mb-4 mt-16">
            <strong>Stage 2:</strong> Digital wireframes in Figma showing
            initial UI layouts.
          </p>

          <ImageCarousel images={wireframeImages} />

          <SubSection title="Final System Components">
            <p className="leading-relaxed text-dark-gray mb-4">
              <strong>Badge Entry:</strong> Door scanner reads ID, pulls
              reservation, assigns color (&lt;2 seconds)
            </p>

            <p className="leading-relaxed text-dark-gray mb-4">
              <strong>Floor Navigation:</strong> Overhead projector casts
              directional arrow in user's color
            </p>

            <p className="leading-relaxed text-dark-gray mb-8">
              <strong>Shelf Illumination:</strong> LED strips embedded in shelf
              edges light specific cubbies
            </p>

            <figure className="flex flex-col items-center my-8">
              <img
                src="/assets/reserve/room-study.png"
                alt="Shelf with LED lighting and numbered cubbies"
                className="w-1/2 h-auto block"
              />
              <figcaption className="py-3 px-4 mt-4 text-center text-sm text-gray italic bg-white">
                LED lighting integrated with numbered cubby positions
              </figcaption>
            </figure>

            <p className="leading-relaxed text-dark-gray mb-4 mt-16">
              <strong>Stage 3:</strong> Interactive UI mockups in
              Figma—reservation instructions, item details with colors/states/due
              times, new reservation flow.
            </p>

            {/* Mobile Screens Carousel */}
            <ImageCarousel images={mobileScreens} />

            <figure className="flex flex-col items-center my-8">
              <img
                src="/assets/reserve/big-screen.png"
                alt="Wall screen displaying reservation info"
                className="w-1/2 h-auto block"
              />
              <figcaption className="py-3 px-4 mt-4 text-center text-sm text-gray italic bg-white">
                <strong>Wall Display:</strong> Large screen (20-30") mirrors
                mobile interface to view the reservation details when phones are
                unavailable
              </figcaption>
            </figure>
          </SubSection>
        </Section>

        {/* Testing & Results */}
        <Section
          id="testing"
          title="Testing & Results"
          icon={<path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />}
        >
          <div className="bg-cream p-8 my-8 border-2 border-burgundy">
            <h5 className="text-xl font-bold text-burgundy mb-6">Study Design</h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {testingDemographics.map((demo, i) => (
                <div key={i} className="text-center p-6 bg-white border-2 border-light-gray">
                  <div className="font-display text-4xl font-black text-burgundy leading-none">
                    {demo.number}
                  </div>
                  <div className="text-sm mt-2 opacity-80">{demo.label}</div>
                </div>
              ))}
            </div>

            <p className="leading-relaxed text-dark-gray mt-6">
              <strong>Protocol:</strong> Intro + consent → Task 1 (pickup 2
              items) → Task 2 (return items) → 5-min semi-structured interview.{' '}
              <strong>Measures:</strong> Task completion time, hesitation
              moments, screen usage, difficulty ratings (1-5 scale), qualitative
              feedback via think-aloud.
            </p>
          </div>

          <SubSection title="Key Findings">
            <ResultsGrid results={testingResults} />
          </SubSection>

          <SubSection title="User Quotes">
            {userQuotes.map((quote, i) => (
              <div key={i} className="border-l-4 border-burgundy pl-6 py-4 my-6 bg-white">
                <p className="italic text-dark-gray">"{quote.text}"</p>
                <cite className="text-sm text-gray block mt-2">— {quote.author}</cite>
              </div>
            ))}
          </SubSection>
        </Section>

        {/* Conclusion */}
        <Section
          id="conclusion"
          title="Conclusion"
          icon={<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="#3a1c1e" />}
        >
          <SubSection title="Outcome">
            <p className="leading-relaxed text-dark-gray mb-8">
              IllumiLend proves <strong>the room itself can communicate</strong>.
              By embedding guidance in the physical environment, we eliminated
              location friction—users found items 80% faster (subjective), and no
              one picked wrong items when lights were active. The system offers
              reduced staff burden, better user experience, scalable foundation,
              and built-in accessibility.
            </p>
          </SubSection>

          <SubSection title="Key Refinements">
            <div className="bg-white p-8 border-2 border-light-gray mb-6">
              <h4 className="text-xl font-bold text-burgundy mb-4">✓ Keep: Color-Guided Navigation</h4>
              <p className="leading-relaxed text-dark-gray">
                80% relied heavily on it. <strong>Refinements:</strong> Avoid red
                for placement (reserve for errors), cap simultaneous users (4-6
                colors max), always pair color with text labels/IDs for
                accessibility.
              </p>
            </div>

            <div className="bg-white p-8 border-2 border-light-gray mb-6">
              <h4 className="text-xl font-bold text-burgundy mb-4">✓ Add: Explicit Confirmation Feedback</h4>
              <p className="leading-relaxed text-dark-gray">
                70% hesitation shows users need closure.{' '}
                <strong>Solution:</strong> After pickup/return: cubby light
                changes state (blue→green), soft audio ping (optional), progress
                indicator updates ("1/2 picked up"). No modals or extra taps—keep
                it ambient.
              </p>
            </div>

            <div className="bg-white p-8 border-2 border-light-gray mb-6">
              <h4 className="text-xl font-bold text-burgundy mb-4">✓ Future: IoT + Computer Vision</h4>
              <p className="leading-relaxed text-dark-gray">
                <strong>Next phase:</strong> RFID tags on items + cubby sensors
                detect events. Overhead camera for exception review. Automated
                condition logging. Lights guide; sensors verify.
              </p>
            </div>
          </SubSection>
        </Section>
      </div>

      <CaseStudyNav sections={navSections} />
    </div>
  );
}
