import {
  BackButton,
  CaseStudyHeader,
  CaseStudyNav,
  Section,
  SubSection,
  StatsGrid,
  ResultsGrid,
  PainPointCard,
  InsightBox,
} from '../components/case-study';

const navSections = [
  { id: 'overview', title: 'Overview' },
  { id: 'problem', title: 'Problem' },
  { id: 'research', title: 'Research' },
  { id: 'testing', title: 'Testing' },
  { id: 'results', title: 'Results' },
  { id: 'conclusion', title: 'Conclusion' },
];

const metaData = [
  {
    label: 'Role',
    value: 'UX Researcher & Data Analyst',
    icon: <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />,
  },
  {
    label: 'Timeline',
    value: '6 weeks',
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
    href: 'https://quantux.telecom-paris.fr/2025/03/07/evaluating-the-usability-of-goodreads/',
    label: 'View Blog Post',
    primary: true,
    icon: <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c1.1 0 2 2 2 2h14c1.11 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />,
  },
];

const researchProcess = [
  { number: '01', name: 'Goals & Metrics', detail: 'Defined research framework' },
  { number: '02', name: 'Protocol Design', detail: 'Created 3-task testing protocol' },
  { number: '03', name: 'Data Collection', detail: '16 participants, cursor tracking + surveys' },
  { number: '04', name: 'Analysis', detail: 'Quantitative & qualitative insights' },
  { number: '05', name: 'Recommendations', detail: 'Actionable design improvements' },
];

const participantStats = [
  { number: '16', label: 'Total Participants' },
  { number: '75%', label: 'Ages 18-25' },
  { number: '37.5%', label: 'Read Monthly' },
];

const testingTasks = [
  {
    number: '01',
    title: 'Free Exploration',
    description: 'Participants explored the site freely to find a book they\'d enjoy. Assessed first-time user experience and natural navigation patterns.',
  },
  {
    number: '02',
    title: 'Feature Discovery',
    description: 'Participants searched for books by exploring Similar Books, Favorite Genres, Explore, Lists, and Community sections.',
  },
  {
    number: '03',
    title: 'Friend Profile',
    description: 'Participants found a book recommendation for a friend using the Friend Profile feature.',
  },
];

const task1Results = [
  { metric: '3.9/5', label: 'Avg Usability Rating', insight: 'Room for improvement', highlight: true },
  { metric: '31%', label: 'Found Site Easy', insight: 'Only 5 of 16 participants' },
  { metric: '25%', label: 'Found Confusing', insight: '4 participants struggled' },
];

const task2Stats = [
  { number: '1.9 min', label: 'Similar Books', note: 'Most engaging - 2.2 books consulted' },
  { number: '~1.5 min', label: 'Genres, Explore, Lists', note: 'Positive but needs filters' },
  { number: '3.1 min', label: 'Community', note: 'Highest time, lowest books (0.7)' },
];

const task3Results = [
  { metric: '50%', label: 'Rated "Very Easy"', insight: 'Most positive feedback', highlight: true },
  { metric: '#1', label: 'Book Page', insight: 'Highest interactions' },
];

export function GoodreadsCase() {
  return (
    <div className="min-h-screen bg-cream pt-[100px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8 pb-16 relative">
        <BackButton />

        <CaseStudyHeader
          title="Evaluating of Goodreads"
          subtitle="A quantitative UX study of the Goodreads book recommendation platform."
          meta={metaData}
          techStack="Python (Pandas, NumPy, Matplotlib, Seaborn), Google Forms, Cursor Tracking Plugin, Canva"
          methods="User Journey Mapping, Cursor Tracking Analysis, Structured User Testing, Correlation Analysis, Heatmap Visualization"
          links={links}
        />

        {/* Overview */}
        <Section id="overview" title="Overview">
          <p className="leading-relaxed text-dark-gray mb-8">
            <a
              href="https://www.goodreads.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-burgundy font-semibold hover:underline"
            >
              Goodreads
            </a>{' '}
            is one of the world's largest book recommendation platforms with
            millions of users. Despite its popularity, there's limited publicly
            available research on its actual usability. By combining{' '}
            <strong>cursor-tracking technology</strong> with structured user
            testing and qualitative feedback from{' '}
            <strong>16 participants</strong>, we identified critical navigation
            pain points and provided actionable, data-driven recommendations to
            enhance the user experience.
          </p>

          <SubSection title="Research Process">
            <div className="flex flex-wrap gap-4 my-8">
              {researchProcess.map((step) => (
                <div
                  key={step.number}
                  className="flex items-start gap-4 flex-1 min-w-[200px] p-4 bg-white border-2 border-light-gray"
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
          title="Problem"
          icon={<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />}
        >
          <p className="leading-relaxed text-dark-gray mb-8">
            We were interested in conducting this UX study because we use the
            Goodreads platform ourselves for book recommendations and have
            experienced difficulties. Understanding strengths and weaknesses of
            such a widely-used website can improve user experience in other
            digital recommendation systems.
          </p>

          <InsightBox title="Research Question">
            How intuitive, efficient, and satisfying is the Goodreads platform
            for users attempting to find book recommendations?
          </InsightBox>
        </Section>

        {/* User Research */}
        <Section
          id="research"
          title="User Research"
          icon={<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />}
        >
          <SubSection title="User Journey Mapping">
            <p className="leading-relaxed text-dark-gray mb-8">
              We mapped the complete Goodreads user journey to identify critical
              pain points. The emotional journey reveals significant drops during
              "Exploration & Search" and "Post-Interaction" phases, validating our
              research focus on book discovery.
            </p>

            <figure className="w-full my-8 overflow-hidden transition-all duration-300 hover:-translate-y-0.5">
              <img
                src="/assets/user-journey.png"
                alt="Goodreads User Journey Map"
                className="w-full h-auto block"
              />
              <figcaption className="py-3 px-4 mt-4 text-center text-sm text-gray italic bg-white">
                User journey map highlighting emotional fluctuations and pain
                points across the Goodreads experience
              </figcaption>
            </figure>
          </SubSection>

          <SubSection title="Participants">
            <div className="bg-cream p-8 my-8 border-2 border-burgundy">
              <div className="grid grid-cols-3 gap-6">
                {participantStats.map((stat, i) => (
                  <div key={i} className="text-center p-6 bg-white border-2 border-light-gray">
                    <div className="font-display text-4xl font-black text-burgundy leading-none">
                      {stat.number}
                    </div>
                    <div className="text-sm mt-2 opacity-80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </SubSection>

          <SubSection title="Goals, Signals & Metrics">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              <div className="p-6 bg-gradient-to-br from-burgundy/5 to-brown/5 border-2 border-light-gray">
                <strong className="text-burgundy block mb-2">Goal 1: Identify Pain Points</strong>
                <p className="text-sm">
                  <strong>Signals:</strong> User frustration, low ratings<br />
                  <strong>Metrics:</strong> Time spent, interaction frequency, qualitative feedback
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-burgundy/5 to-brown/5 border-2 border-light-gray">
                <strong className="text-burgundy block mb-2">Goal 2: Evaluate Book Discovery</strong>
                <p className="text-sm">
                  <strong>Signals:</strong> Quick find or confusion<br />
                  <strong>Metrics:</strong> Time to find book, books consulted, cursor distance
                </p>
              </div>
              <div className="p-6 bg-gradient-to-br from-burgundy/5 to-brown/5 border-2 border-light-gray">
                <strong className="text-burgundy block mb-2">Goal 3: Measure Satisfaction</strong>
                <p className="text-sm">
                  <strong>Signals:</strong> Overall experience feedback<br />
                  <strong>Metrics:</strong> Likert scale ratings, open-ended responses
                </p>
              </div>
            </div>
          </SubSection>
        </Section>

        {/* Testing Protocol */}
        <Section
          id="testing"
          title="Testing Protocol"
          icon={<path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />}
        >
          <p className="leading-relaxed text-dark-gray mb-8">
            We designed a three-task protocol to evaluate different aspects of
            the Goodreads experience, combining cursor-tracking data with
            qualitative surveys.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            {testingTasks.map((task) => (
              <PainPointCard key={task.number} {...task} />
            ))}
          </div>
        </Section>

        {/* Results */}
        <Section
          id="results"
          title="Results"
          icon={<path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />}
        >
          <SubSection title="Task 1: Free Exploration">
            <ResultsGrid results={task1Results} />

            <p className="leading-relaxed text-dark-gray my-8">
              <strong>Key Finding:</strong> Users who spent more time and clicked
              more gave lower ratings, suggesting confusion rather than
              engagement.
            </p>

            <div className="grid grid-cols-2 gap-4 my-8">
              <img
                className="w-full h-auto object-contain"
                src="/assets/matrix.png"
                alt="Correlation Matrix showing inverse relationship between time spent and satisfaction"
              />
              <img
                className="w-full h-auto object-contain"
                src="/assets/freq-barchart.png"
                alt="Interaction Frequency Bar Chart"
              />
            </div>

            <figure className="w-full my-8 overflow-hidden transition-all duration-300 hover:-translate-y-0.5">
              <img
                src="/assets/heatmap.png"
                alt="Heatmap of user interactions"
                className="w-full h-auto block"
              />
              <figcaption className="py-3 px-4 mt-4 text-center text-sm text-gray italic bg-white">
                Heatmap showing users primarily interacted with "Browse" and "My
                Books" sections
              </figcaption>
            </figure>
          </SubSection>

          <SubSection title="Task 2: Feature Evaluation">
            <StatsGrid stats={task2Stats} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
              <figure className="overflow-hidden transition-all duration-300 hover:-translate-y-0.5">
                <img
                  src="/assets/avg-time.png"
                  alt="Average time spent per task"
                  className="w-full h-auto block"
                />
                <figcaption className="py-3 px-4 mt-4 text-center text-sm text-gray italic bg-white">
                  Average time per feature - Community required significantly more time
                </figcaption>
              </figure>

              <figure className="overflow-hidden transition-all duration-300 hover:-translate-y-0.5">
                <img
                  src="/assets/helpfullness.png"
                  alt="Helpfulness ratings distribution"
                  className="w-full h-auto block"
                />
                <figcaption className="py-3 px-4 mt-4 text-center text-sm text-gray italic bg-white">
                  Similar Books received predominantly 5-star ratings; Community
                  section received most negative ratings
                </figcaption>
              </figure>
            </div>

            <div className="border-l-4 border-[#ff9800] pl-6 py-4 my-8 bg-white">
              <p className="text-[#d32f2f] font-medium italic">
                "This feels like it wasn't touched since 2009" | "HORRIBLE it
                looked like Craigslist" | "SO HARD TO FIND A SINGLE BOOK"
              </p>
              <cite className="text-sm text-gray block mt-2">— Community Section Feedback</cite>
            </div>
          </SubSection>

          <SubSection title="Task 3: Friend Profile">
            <ResultsGrid results={task3Results} />

            <div className="grid grid-cols-2 gap-4 my-8">
              <img
                className="w-full h-auto object-contain"
                src="/assets/task31.png"
                alt="Task 3 interaction patterns"
              />
              <img
                className="w-full h-auto object-contain"
                src="/assets/task32.png"
                alt="Task 3 page frequency"
              />
            </div>
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
                  {['Similar Books feature highly engaging', 'Friend Profile useful for gifting', 'Solid core functionality'].map((item, i) => (
                    <li key={i} className="py-2 pl-6 relative">
                      <span className="absolute left-0 text-[#4caf50]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-8 border-2 border-light-gray border-l-4 border-l-[#ff9800]">
                <h5 className="text-xl font-bold text-burgundy mb-4">Critical Issues</h5>
                <ul className="list-none pl-0">
                  {['Community section outdated & confusing', 'Lack of filtering options', 'Weak personalization', 'Information overload'].map((item, i) => (
                    <li key={i} className="py-2 pl-6 relative">
                      <span className="absolute left-0 text-[#ff9800]">!</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SubSection>

          <SubSection title="Key Recommendations">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-8">
              {[
                { title: 'Priority 1', items: ['Redesign Community section', 'Implement comprehensive filtering', 'Simplify navigation'] },
                { title: 'Priority 2', items: ['Enhance recommendation algorithms', 'Add personalized group suggestions', '"Find book for friend" feature'] },
                { title: 'Priority 3', items: ['Reduce information density', 'Add comparison features', 'Improve visual hierarchy'] },
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

          <SubSection title="Reflections">
            <div className="bg-white p-8 border-2 border-light-gray mb-6">
              <h4 className="text-xl font-bold text-burgundy mb-4">Time Spent ≠ Engagement</h4>
              <p className="leading-relaxed text-dark-gray">
                The inverse correlation between time and satisfaction challenged
                assumptions about engagement metrics. Extended interaction often
                indicated confusion, not interest.
              </p>
            </div>

            <div className="bg-white p-8 border-2 border-light-gray mb-6">
              <h4 className="text-xl font-bold text-burgundy mb-4">Value of Triangulation</h4>
              <p className="leading-relaxed text-dark-gray">
                Combining cursor-tracking quantitative data with qualitative
                feedback validated patterns and built confidence in conclusions.
              </p>
            </div>
          </SubSection>

          <div className="bg-gradient-to-r from-burgundy to-brown text-cream p-10 my-8">
            <h4 className="text-cream text-2xl mb-4 font-bold">Impact Potential</h4>
            <p className="leading-relaxed text-lg">
              Users want to love Goodreads - they appreciate its extensive
              database and core features. By addressing navigation complexities,
              adding filtering, enhancing personalization, and redesigning the
              Community section, Goodreads can transform from "average" to the
              gold standard in book recommendation platforms.
            </p>
          </div>
        </Section>
      </div>

      <CaseStudyNav sections={navSections} />
    </div>
  );
}
