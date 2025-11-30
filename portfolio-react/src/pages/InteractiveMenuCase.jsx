import {
  BackButton,
  CaseStudyHeader,
  CaseStudyNav,
  Section,
  SubSection,
  StatsGrid,
  ResultsGrid,
  TransformationBox,
  PainPointCard,
  PersonaCard,
  FeatureCard,
  InsightBox,
  ImageSlider,
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
    value: 'Lead UX Designer & Frontend Developer',
    icon: <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />,
  },
  {
    label: 'Timeline',
    value: '2 months',
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
    href: 'https://interactive-menu-app.netlify.app/',
    label: 'Live Demo',
    primary: true,
    icon: <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c1.1 0 2 2 2 2h14c1.11 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />,
  },
  {
    href: 'https://github.com/DimahBA/HCI_Project',
    label: 'GitHub',
    primary: false,
    icon: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />,
  },
];

const researchStats = [
  { number: '3.8/5', label: 'Digital Menu Satisfaction', note: 'vs. 4.3/5 for paper menus' },
  { number: '13/16', label: 'Want Customization', note: 'Ingredient transparency & options' },
  { number: '9/16', label: 'Frustrated by Waiting', note: 'For waiter attention to order/pay' },
];

const painPoints = [
  {
    number: '01',
    title: 'Service Dependency',
    description: 'Waiting for waiter attention to order, waiting again to get the bill. Extends dining time unnecessarily and creates awkward moments trying to get staff attention.',
    quote: 'I hate trying to get the waiter\'s attention just to pay.',
  },
  {
    number: '02',
    title: 'Information Opacity',
    description: 'Incomplete ingredient information and customization options. Users with dietary restrictions or preferences must interrogate waiters or make uncertain choices without seeing full details.',
    quote: 'I\'d just order something safe rather than ask about modifications.',
  },
  {
    number: '03',
    title: 'Payment Chaos',
    description: 'Group payment is broken: either wait turns to pay by card, or one person pays and others owe money indefinitely. This problem came up unprompted in 6 of 16 initial surveys.',
    quote: 'When we\'re in a group, someone always ends up paying for everyone and we all owe them money for weeks.',
  },
];

const personas = [
  {
    avatar: 'P',
    name: 'Pierre, 72',
    role: 'First-Time Digital User',
    context: 'Retired high school principal, limited tech experience. Never used a digital menu. Uses smartphone only for calls.',
    painPoints: ['Worries about making mistakes he can\'t undo', 'Feels embarrassed asking for help with technology', 'Struggles with small text in dim restaurant lighting'],
    needs: 'Clear instructions, simple navigation, obvious help options, easy error correction',
    quote: 'I just want to order my meal without feeling stressed by unfamiliar technology.',
  },
  {
    avatar: 'E',
    name: 'Emma, 26',
    role: 'Efficiency-Focused Diner',
    context: 'Software developer who values efficiency. Frequently dines with friends, uses multiple food ordering apps.',
    painPoints: ['Frustrated by slow service when she knows what she wants', 'Can\'t see ingredient details to customize properly', 'Group payment is always awkward and time-consuming'],
    needs: 'Fast ordering, detailed customization, complete ingredient transparency, seamless bill splitting',
    quote: 'I want to see every ingredient, customize exactly how I like it, and split the bill instantly with my friends.',
  },
  {
    avatar: 'M',
    name: 'Martha, 58',
    role: 'Visual Challenges',
    context: 'Has macular degeneration. Uses tablet at home with magnification but struggles with traditional paper menus.',
    painPoints: ['Can\'t read standard text in dimly lit restaurants', 'Has to constantly ask others to read menu', 'Feels loss of independence while dining out'],
    needs: 'Large text options, high contrast interfaces, simplified layouts, persistent accessibility controls',
    quote: 'I want to maintain my independence without drawing attention to my visual impairment.',
  },
];

const sketchImages = [
  { src: '/assets/sk1.png', alt: 'Design 1 - Filtering approach' },
  { src: '/assets/sk2.png', alt: 'Design 2 - Navigation approach' },
  { src: '/assets/sk3.png', alt: 'Design 3 - Personalization approach' },
  { src: '/assets/sk4.png', alt: 'Design 4 - Bill splitting approach' },
];

const features = [
  {
    icon: <path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V6c0-1.1-.89-2-2-2zM11 11H9V9h2v2zm0-4H9V5h2v2zm0 8H9v-2h2v2zm4 0h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2z" />,
    title: 'QR Code Entry Point',
    text: 'App downloads create friction. Each table has a unique QR code, scan it, menu loads instantly. No app, no account required.',
    result: 'Result: 4.5/5 average user confidence score',
  },
  {
    icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />,
    title: 'Complete Ingredient Transparency',
    text: '13 of 16 users wanted detailed customization. Every dish displays full ingredients, allergen warnings, and customization options upfront.',
    result: 'Result: Users praised "detailed food descriptions and photos"',
    image: '/assets/ingredients.png',
  },
  {
    icon: <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />,
    title: 'Individual Payment Handling',
    text: 'Group dining payment is broken, wait turns at card machine or one person pays and everyone owes money. Each diner can pay for their own items individually.',
    result: 'Result: "We can split the bill with friends" (Participant, 23)',
    image: '/assets/payment.png',
  },
  {
    icon: <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />,
    title: 'Persistent Accessibility Controls',
    text: 'Accessibility is buried in settings. Contrast, font size, and help are visible on every screen.',
    result: 'Result: High-contrast mode requested by 5 users, appreciated by 10/16',
    image: '/assets/accessibility.png',
  },
  {
    icon: <path d="M3 5h18v2l-7 7v5l-4-2v-3L3 7V5z" />,
    title: 'Smart Filters (Vegan, Gluten-Free, etc.)',
    text: 'Scanning the whole menu to find suitable items causes decision fatigue. Prominent multi-select filters trim the menu in real time.',
    result: 'Result: Faster discovery and fewer misorders',
    image: '/assets/filtering.png',
  },
];

const testingDemographics = [
  { number: '8', label: 'Total Participants' },
  { number: '21-59', label: 'Age Range' },
  { number: '5/8', label: 'Preferred Paper Menus Initially' },
  { number: '1-8/10', label: 'Digital Confidence Range' },
];

const results = [
  { metric: '8.8/10', label: 'Likelihood to Use in Real Restaurant', insight: 'Strong market acceptance, even from initial paper menu advocates', highlight: true },
  { metric: '4.5/5', label: 'User Confidence', insight: 'Even low-tech users felt confident (55-year-old with 1/10 digital confidence rated 5/5)' },
  { metric: '4.25/5', label: 'Frequent Use Intention', insight: 'Participants who preferred traditional ordering still responded positively' },
  { metric: '8.1/10', label: 'Ease of Task Completion', insight: 'Lower scores from 50+ demographic highlighted navigation areas to improve' },
  { metric: '7.8/10', label: 'Filter & Customization Usefulness', insight: 'Highest score (10/10) from 59-year-old who appreciated detailed descriptions' },
  { metric: '7.8/10', label: 'Cart & Payment Process', insight: 'Positive responses aligned with participants who specifically praised bill splitting' },
];

export function InteractiveMenuCase() {
  return (
    <div className="min-h-screen bg-cream pt-[100px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8 pb-16 relative">
        <BackButton />

        <CaseStudyHeader
          title="Interactive Restaurant Menu"
          subtitle="Design of an interactive digital menu application to enhance ordering experience in restaurants."
          meta={metaData}
          techStack="Figma, React.js, Tailwind CSS, Redux Toolkit, Vite"
          methods="User Research Questionnaires, Persona Development, Low-Fi Prototyping, High-Fi Prototyping, Task-Based Usability Testing, Think-Aloud Protocol"
          links={links}
          heroImage="/assets/menu-gif.gif"
        />

        {/* Overview */}
        <Section id="overview" title="Overview">
          <p className="leading-relaxed text-dark-gray mb-8">
            We designed the digital restaurant ordering experience to eliminate
            waiter dependency, provide ingredient transparency, and simplify
            group payments. The QR code-based solution earned an 88%
            satisfaction score and converted 68% of paper menu advocates to
            digital menu supporters.
          </p>
          <TransformationBox
            before={{ label: 'Initial Paper Menu Preference', number: '68%', note: '8 of 16 users preferred traditional ordering' }}
            after={{ label: 'Digital Menu Adoption', number: '88%', note: '8.8/10 likelihood to use our solution' }}
          />
        </Section>

        {/* Problem */}
        <Section
          id="problem"
          title="Problem"
          icon={<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />}
        >
          <p className="leading-relaxed text-dark-gray mb-8">
            Despite paper menus forcing diners to wait for service and guess at
            ingredients, 68% of our research participants initially preferred
            them over digital alternatives. The issue isn't technology adoption,
            existing digital solutions simply don't solve real pain points.
          </p>
          <InsightBox title="Our goal">
            Understand actual pain points of users in dining scenarios and why
            they tolerate paper menus.
          </InsightBox>
        </Section>

        {/* User Research */}
        <Section
          id="research"
          title="User Research"
          icon={<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />}
        >
          <p className="leading-relaxed text-dark-gray mb-8">
            We surveyed <strong>16 participants</strong> across age groups
            (21-65 years) to understand pain points with traditional dining and
            why existing digital solutions fail.
          </p>
          <StatsGrid stats={researchStats} />

          <SubSection title="Pain Points">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              {painPoints.map((point) => (
                <PainPointCard key={point.number} {...point} />
              ))}
            </div>
          </SubSection>

          <SubSection title="User Personas">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              {personas.map((persona) => (
                <PersonaCard key={persona.name} {...persona} />
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
          <p className="leading-relaxed text-dark-gray mb-8">
            Each of the 4 team members independently sketched solutions based on
            user research insights. We then synthesized the strongest ideas into
            a unified low-fidelity prototype, balancing simplicity, efficiency,
            and accessibility.
          </p>

          <SubSection title="Sketches">
            <ImageSlider images={sketchImages} />
          </SubSection>

          <SubSection title="Final Low-fidelity prototype">
            <figure className="w-full my-8 overflow-hidden transition-all duration-300 hover:-translate-y-0.5">
              <img
                src="/assets/low-fi-prototypes.png"
                alt="Low-fidelity prototypes"
                className="w-full h-auto block"
              />
              <figcaption className="py-3 px-4 mt-4 text-center text-sm text-gray italic bg-white">
                Low-fidelity prototypes combining features from all four sketches
              </figcaption>
            </figure>
          </SubSection>

          <SubSection title="Key Features">
            <div className="mb-8">
              <FeatureCard {...features[0]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.slice(1).map((feature, i) => (
                <FeatureCard key={i} {...feature} />
              ))}
            </div>
          </SubSection>

          <SubSection title="High-Fidelity Prototype">
            <figure className="w-full my-8 overflow-hidden transition-all duration-300 hover:-translate-y-0.5">
              <img
                src="/assets/hi-fi-menu.png"
                alt="High-fidelity design showing final interface"
                className="w-full h-auto block"
              />
              <figcaption className="py-3 px-4 mt-4 text-center text-sm text-gray italic bg-white">
                High-fidelity prototype showing complete user flow from menu browsing to payment
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
          <SubSection title="Testing Methodology">
            <p className="leading-relaxed text-dark-gray mb-8">
              We conducted task-based usability testing with <strong>8 participants</strong> using think-aloud protocol.
              Participants completed three realistic scenarios: free exploration,
              finding a vegetarian dish with customization, and simulating group
              dining with bill splitting.
            </p>
            <div className="bg-cream p-8 my-8 border-2 border-burgundy">
              <h5 className="text-xl font-bold text-burgundy mb-6">Participant Profile</h5>
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
            </div>
          </SubSection>

          <SubSection title="Quantitative Results">
            <ResultsGrid results={results} />
          </SubSection>
        </Section>

        {/* Conclusion */}
        <Section
          id="conclusion"
          title="Conclusion"
          icon={<path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="#3a1c1e" />}
        >
          <SubSection title="Outcome">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-white p-8 border-2 border-light-gray border-l-4 border-l-[#4caf50]">
                <h5 className="text-xl font-bold text-burgundy mb-4">What Works</h5>
                <ul className="list-none pl-0">
                  {['QR code entry eliminates app download friction', 'Individual payment solves group dining chaos', 'Complete ingredient transparency builds trust', 'Persistent accessibility controls for all users'].map((item, i) => (
                    <li key={i} className="py-2 pl-6 relative">
                      <span className="absolute left-0 text-[#4caf50]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-8 border-2 border-light-gray border-l-4 border-l-[#ff9800]">
                <h5 className="text-xl font-bold text-burgundy mb-4">Areas for Improvement</h5>
                <ul className="list-none pl-0">
                  {['Navigation back to main menu needs refinement', 'Set menu progression needs clearer indicators', 'Accessibility features need explicit testing'].map((item, i) => (
                    <li key={i} className="py-2 pl-6 relative">
                      <span className="absolute left-0 text-[#ff9800]">!</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SubSection>

          <SubSection title="Future Work">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-8">
              {[
                { title: 'Customer Experience', items: ['Fixed navigation and step indicators for set menus', 'Expanded dietary filters and voice control', 'Multi-language support'] },
                { title: 'Restaurant Management Platform', items: ['Real-time order tracking and kitchen integration', 'Live menu editing and analytics dashboard', 'Customer feedback system'] },
                { title: 'Enhanced Testing', items: ['Recruit users with genuine dietary restrictions', 'Explicit accessibility feature testing', 'Broader demographic representation'] },
              ].map((category, i) => (
                <div key={i} className="bg-white border-2 border-light-gray p-8">
                  <h5 className="text-burgundy text-xl font-bold mb-6">{category.title}</h5>
                  <ul className="list-none p-0">
                    {category.items.map((item, j) => (
                      <li key={j} className="py-3 pl-8 relative border-b border-light-gray last:border-b-0 before:content-['→'] before:absolute before:left-0 before:text-burgundy before:font-bold">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </SubSection>

          <div className="bg-gradient-to-r from-burgundy to-brown text-cream p-10 my-8">
            <h4 className="text-cream text-2xl mb-4 font-bold">Looking Forward</h4>
            <p className="leading-relaxed text-lg">
              The next phase focuses on building restaurant management tools
              that integrate with the customer interface, creating an ecosystem
              that benefits both diners and restaurant operations. The goal:
              make digital menus a competitive advantage, not just a paper
              replacement.
            </p>
          </div>
        </Section>
      </div>

      <CaseStudyNav sections={navSections} />
    </div>
  );
}
