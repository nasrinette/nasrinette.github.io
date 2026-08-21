/* The CV as data. The downloadable PDF in public/assets is printed from the
   rendered #/cv page itself (npm run cv:pdf), so this file is the single
   source of truth for both. **bold** marks the emphasised phrases;
   [label](url) turns a phrase into a link. */

export interface CvExperience {
  role: string;
  org: string;
  /** The employer's site; omitted when the org has no home to link. */
  orgUrl?: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface CvEducation {
  school: string;
  schoolUrl: string;
  period: string;
  degree: string;
  field: string;
  /** The quiet tail of the degree line: grade and city. */
  meta: string;
}

export interface CvProject {
  name: string;
  /** Case-study id: the project name links into the portfolio itself. */
  projectId: string;
  summary: string;
}

export const cv = {
  name: "Nazrin Nasirova",
  title: "AI Product Designer / Design Engineer",
  location: "Paris, France",
  phone: "+33 6 05 51 79 66",
  email: "nazrin.nasirovaa@gmail.com",
  links: [
    { label: "nasrinette.github.io", url: "https://nasrinette.github.io" },
    { label: "linkedin.com/in/nazrin-nasirova", url: "https://www.linkedin.com/in/nazrin-nasirova/" },
  ],
  profile:
    "**AI Native Product Designer** specialised in the full design thinking process: **user research, wireframing, high-fidelity prototyping, and usability testing**. **3+ years** of experience in both **B2B and B2C** digital products; AI and product development enthusiast. Engineering background with a taste for design. Seeking a **CDD or CDI as Product Designer / Design Engineer / UX Product Owner**, starting October 2026 in France (open to relocation).",
  skills: [
    {
      // research first, then design, then prototyping: the process in order
      label: "Design Thinking",
      items: ["User Interviews", "Usability Testing", "A/B Testing", "Design Systems", "Atomic Design", "Information Architecture", "Accessibility (WCAG)", "Wireframing", "Interaction Design & Prototyping", "Responsive Design", "Data Visualization"],
    },
    {
      // AI practice, then design tools, then build tools: themed clusters
      label: "AI & Tools",
      items: ["Prompt Engineering", "Vibe Coding", "Claude Code", "MCP", "Cursor", "Lovable", "Figma", "Adobe XD", "Miro", "Canva", "Maze", "Make.com", "Notion", "HTML/CSS", "React.js", "Tailwind", "Git"],
    },
    {
      label: "Product",
      items: ["Prioritization", "Roadmapping", "Sprint Monitoring", "Product Analytics (PostHog)", "Agile / Scrum", "Automation"],
    },
    {
      label: "Soft",
      items: ["Cross-Functional Collaboration", "Stakeholder Communication", "Storytelling", "User Advocacy", "Critical Thinking"],
    },
  ],
  experience: [
    {
      role: "Product Owner UX",
      org: "Wiremind",
      orgUrl: "https://www.wiremind.io/",
      location: "Paris, France",
      period: "March 2026 · Present",
      bullets: [
        "Created **20+ interactive prototypes** and design iterations using Figma and Claude Code.",
        "Conducted **user interviews with 6 participants** to help define AI-based prototyping workflows.",
        "Built a **sprint monitoring dashboard** with **5 data visualizations**.",
      ],
    },
    {
      role: "Frontend Engineer",
      org: "Polygraf AI",
      orgUrl: "https://www.polygraf.ai/",
      location: "Austin, Texas, USA",
      period: "Jan 2024 · Aug 2024",
      bullets: [
        "Implemented a library of **reusable, responsive React components**.",
        "Developed an [AI detector browser extension](https://chromewebstore.google.com/detail/polygraf-ai-content-detec/cbngnnhgfljncoliddifmkgklphlojnf) and organized a launch event that drove **150+ new installs**.",
        "Redesigned an e-commerce extension with a clean onboarding flow; uninstall rate decreased by **20%**.",
        "Built a data-labeling competition in the company website, gathering **10K+ samples** from **100+ participants**.",
      ],
    },
    {
      role: "UI/UX Designer",
      org: "KTLab, Cybersecurity Lab",
      location: "Baku, Azerbaijan",
      period: "May 2023 · Sept 2023",
      bullets: [
        "Designed the **logo, landing page, visual language**, and more for a local startup.",
        "Translated **20 technical CTF UIs** into user-friendly UIs that comply with brand guidelines.",
        "Startup received recognition from **KOBIA Azerbaijan** and a **10K AZN investment**.",
      ],
    },
  ] satisfies CvExperience[],
  education: [
    {
      school: "Institut Polytechnique de Paris",
      schoolUrl: "https://www.ip-paris.fr/",
      period: "2024 · 2026",
      degree: "Master's (MSc)",
      field: "Computer Science: Interaction, Graphics & Design",
      meta: "CGPA 16.5/20 · Palaiseau, France",
    },
    {
      school: "Université de Strasbourg (UFAZ)",
      schoolUrl: "https://www.ufaz.az/",
      period: "2020 · 2024",
      degree: "Bachelor's (BSc)",
      field: "Computer Science",
      meta: "CGPA 14.5/20 · Baku, Azerbaijan",
    },
  ] satisfies CvEducation[],
  projects: [
    {
      name: "Protoca",
      projectId: "protoca",
      summary:
        "Chrome extension that hands AI your real UI instead of a description; shaped by **7 user interviews**, now used by **product teams of Wiremind**.",
    },
    {
      name: "LingoPro",
      projectId: "lingopro",
      summary:
        "turns any text into a French vocabulary lesson; built for one real professor, then adopted by **5 professors**.",
    },
    {
      name: "Interactive Menu App",
      projectId: "interactive-menu",
      summary: "user interviews, personas, and usability testing with **20+ users**; **85% accessibility rating**.",
    },
  ] satisfies CvProject[],
  /* the links below open the owner's certificates (Google Drive), carried
     over from the previous hand-made CV PDF */
  languages: [
    "English (C1, [IELTS 8.0](https://drive.google.com/file/d/1ZivL6dDU_4ibFFdj6cpXc8y1GldS3DhS/view))",
    "French (B2)",
    "Turkish (fluent)",
    "Azerbaijani (native)",
  ],
  achievements: [
    "2nd place, **[Huawei Tech Arena](https://drive.google.com/file/d/11n2yelyYg3EhgRb5zXhRf1y9IUa_FX3l/view?usp=sharing)** Hackathon (Finland)",
    "**[TotalEnergies](https://drive.google.com/file/d/1bLAckxIIx98UCD38Q7rIyq0azy8336gO/view)** E&P International Scholarship Program",
    "Summer School at **[Université de Strasbourg](https://drive.google.com/file/d/1qInbQDhtEDDebnqmVImbuy_M0LA8j-4t/view)** (top 5 of cohort)",
  ],
  volunteering: [
    "**[Khan Academy](https://drive.google.com/file/d/1Y9-esEbs0t2FXr1QCjKWJ0LhRygrWcP8/view):** translated educational content (ENG → AZ)",
    "**Nature Friends Az:** local environmental initiatives",
    "**[UFAZ Student Council](https://drive.google.com/file/d/11Q1bxS3fWW5BVTPWlZeUNiJFMVbUlmXm/view):** mentored first-year students",
  ],
};
