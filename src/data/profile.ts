import type { EducationEntry, ExperienceEntry, SkillGroup, Testimonial } from "../types";

export const profile = {
  name: "Nazrin Nasirova",
  role: "Product Designer",
  // no first person: it sits directly above a third-person bio
  tagline: "Loves building products based on user research",
  location: "Paris, France (open to relocation)",
  yearsExperience: 3,
  availability: "Seeking a CDD or CDI as Product Designer in France, starting October 2026",
  /** The same fact sized for tight corners (sidebar footer): status card line, not a sentence. */
  availabilityShort: "CDD / CDI · Product Designer · France · from Oct 2026",
  stats: [
    { label: "Years of experience in interaction design", value: "3+" },
    { label: "Prototypes built at Wiremind", value: "20+" },
    { label: "Research & testing participants", value: "50+" },
    { label: "Languages spoken", value: "4" },
  ],
  // third person throughout: Lola narrates this in chat, and the profile page
  // reads as a portfolio bio rather than Nazrin speaking
  bio: [
    "Nazrin is a product designer with hands-on experience across the full design cycle: user research, wireframing, high-fidelity prototyping, and usability testing.",
    "She's currently at Wiremind in Paris, turning user insights into validated designs through rapid Gen AI-aided iteration, while finishing her MSc in Interaction, Graphics & Design at Institut Polytechnique de Paris.",
    "Her frontend background (React, Tailwind) means she designs with implementation in mind. She's shipped the components, so she knows what a handoff actually costs.",
    "She combines research methods like interviews, personas, and competitive analysis with iterative prototyping, and doesn't call a design done until it's been validated with real users.",
  ],
  focusAreas: [
    "User research & personas",
    "Interactive prototyping",
    "Usability testing",
    "Gen AI-supported design",
    "Data visualization",
    "Accessibility",
  ],
  tools: [
    "Figma",
    "Miro",
    "Notion",
    "Lovable",
    "Claude Code",
    "React & Tailwind (for prototyping)",
    "GitHub",
  ],
  process: [
    { step: "Research", detail: "Interviews, surveys, and competitive analysis before any pixels. The problem defines the design." },
    { step: "Define", detail: "Personas, pain points, and goals-signals-metrics so success is measurable from day one." },
    { step: "Prototype", detail: "Sketches to hi-fi fast, with Gen AI tooling to iterate in hours instead of weeks." },
    { step: "Test", detail: "Task-based usability sessions with think-aloud protocol, then iterate on what actually failed." },
    { step: "Ship", detail: "Designs specced with implementation in mind, because I've been on the frontend side of the handoff." },
  ],
  funFacts: [
    "She's the eldest daughter of four, which she reckons is why she turned out so responsible.",
    "She moved to France two years ago on the TotalEnergies international scholarship programme.",
    "She's improving her French right now, one individual class at a time.",
    "She likes building whatever project wanders into her head, using gen AI to get it real.",
  ],
  experience: [
    {
      company: "Wiremind",
      role: "Product Owner UX (Internship)",
      period: "March 2026 - Present",
      summary: "Turning user insights into validated designs through rapid Gen AI-aided iteration, in Paris.",
      highlights: [
        "Created 20+ interactive prototypes and design iterations using Gen AI tooling",
        "Conducted user interviews with 6 participants to help define AI-based prototyping workflows",
        "Built a sprint monitoring dashboard with 5 data visualizations",
      ],
    },
    {
      company: "Polygraf AI",
      role: "Frontend Engineer",
      period: "Jan 2024 - Aug 2024",
      summary: "Translated technical logic into interface elements for web, browser extension, and desktop apps in Baku.",
      highlights: [
        "Implemented a library of reusable, responsive React components",
        "Developed an AI detector browser extension and redesigned an e-commerce extension; launch event drove 150+ new installs",
        "Organized a data-labeling competition, gathering 10K+ samples from 100+ participants",
      ],
    },
    {
      company: "KTLab, Cybersecurity Lab",
      role: "UI/UX Designer",
      period: "May 2023 - Sept 2023",
      summary: "Designed and tested prototypes for a cybersecurity learning app in Baku.",
      highlights: [
        "Created and tested prototypes for a cybersecurity learning app",
        "Ran usability sessions and iterated 5+ design versions based on findings",
        "Worked with the dev team to align UI with accessibility and brand guidelines",
      ],
    },
  ] satisfies ExperienceEntry[],
  education: [
    {
      school: "Institut Polytechnique de Paris",
      credential: "MSc in Computer Science: Interaction, Graphics & Design · CGPA 16.5/20",
      period: "2024 - 2026",
    },
    {
      school: "Université de Strasbourg (UFAZ)",
      credential: "BSc in Computer Science · CGPA 14.5/20",
      period: "2020 - 2024",
    },
  ] satisfies EducationEntry[],
  skillGroups: [
    {
      category: "Research & validation",
      items: ["User research & personas", "User interviews", "Usability testing", "A/B testing", "Accessibility"],
    },
    {
      category: "Design & prototyping",
      items: ["Wireframing", "Interactive prototyping", "Interaction design", "Data visualization", "Gen AI-supported design"],
    },
    {
      category: "Product",
      items: ["Requirements definition", "Prioritization", "Roadmapping", "Sprint monitoring", "Agile / Scrum"],
    },
    {
      category: "Tools & code",
      items: ["Figma", "Miro", "Canva", "Notion", "Lovable", "Claude Code", "HTML/CSS", "React.js", "Tailwind"],
    },
    {
      category: "Languages",
      items: ["English (C1, IELTS 8.0)", "French (B2, in progress)", "Turkish (fluent)", "Azerbaijani (native)"],
    },
  ] satisfies SkillGroup[],
  testimonials: [] as Testimonial[],
  contact: {
    email: "nazrin.nasirovaa@gmail.com",
    // served from this site's own assets, so the portfolio and the CV can't drift apart
    resumeUrl: "/assets/Nazrin_Nasirova_CV_Product_Designer.pdf",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/nazrin-nasirova/" },
      { label: "GitHub", url: "https://github.com/nasrinette" },
      { label: "CV (PDF)", url: "/assets/Nazrin_Nasirova_CV_Product_Designer.pdf" },
    ],
  },
};

export const catName = "Lola";
export const catTagline = "Nazrin's guide";
