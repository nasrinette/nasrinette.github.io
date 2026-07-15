import type { EducationEntry, ExperienceEntry, SkillGroup, Testimonial } from "../types";

export const profile = {
  name: "Elena Marlowe",
  role: "Senior Product Designer",
  tagline: "I design calm, usable products for messy, real-world problems.",
  location: "Lisbon, Portugal (remote-friendly)",
  yearsExperience: 7,
  availability: "Open to select freelance & full-time roles",
  stats: [
    { label: "Years in product design", value: "7" },
    { label: "Shipped case studies", value: "4" },
    { label: "Industries", value: "Fintech, Health, Dev Tools" },
    { label: "Avg. task-success lift", value: "+31%" },
  ],
  bio: [
    "Hi, I'm Elena — a product designer who cares more about whether something works than whether it wins awards.",
    "Over the last 7 years I've worked across fintech, health tech, and developer tools, taking products from a shaky first sketch to something people actually rely on every day.",
    "I like systems thinking, plain language, and design reviews that end in decisions instead of more meetings.",
    "Outside of client work, I mentor early-career designers and spend an unreasonable amount of time thinking about how to make internal tools not feel like punishment.",
  ],
  focusAreas: [
    "0→1 product design",
    "Design systems",
    "B2B & internal tools",
    "Accessibility (WCAG AA+)",
    "Design-to-code handoff",
  ],
  tools: [
    "Figma",
    "Figma Variables",
    "Framer",
    "Notion",
    "Linear",
    "React & Tailwind (for prototyping)",
  ],
  process: [
    { step: "Frame", detail: "Get painfully specific about the problem before opening Figma." },
    { step: "Explore", detail: "Diverge wide with low-fidelity flows, then converge fast." },
    { step: "Prototype", detail: "Build clickable, realistic prototypes — never static-only." },
    { step: "Test", detail: "5-user hallway tests beat 0-user certainty, every time." },
    { step: "Ship & measure", detail: "Work with engineers past handoff, then check the data." },
  ],
  funFacts: [
    "Named the studio cat mascot 'Lola' after the stray who wandered into a client meeting and stayed.",
    "Once redesigned a checkout flow entirely on a napkin during a flight delay.",
    "Collects those little rubber duck stress toys — 14 and counting.",
    "Learned to solder so she could stop bothering the hardware team with 'quick' questions.",
    "Has strong, unsolicited opinions about airport wayfinding systems.",
  ],
  experience: [
    {
      company: "Nimbus Pay",
      role: "Lead Product Designer",
      period: "2023 — Present",
      summary: "First design hire; built the design function from scratch alongside 2 engineers.",
      highlights: [
        "Owns product design end-to-end across onboarding, invoicing, and payments",
        "Hired and mentors a 2-person design team",
        "Cut onboarding drop-off from 38% to 11%",
      ],
    },
    {
      company: "Hearth Health",
      role: "Senior Product Designer",
      period: "2021 — 2023",
      summary: "Led IA and accessibility overhaul for the patient-facing portal.",
      highlights: [
        "Ran the org's first formal accessibility audit and remediation",
        "Partnered directly with clinical staff on requirements",
        "Patient task success rose from 61% to 92%",
      ],
    },
    {
      company: "Atlas Systems",
      role: "Design Systems Lead",
      period: "2019 — 2021",
      summary: "Rebuilt an internal component library from the ground up.",
      highlights: [
        "Grew adoption across product teams from 20% to 85%",
        "Built the first Figma-to-code token pipeline at the company",
      ],
    },
    {
      company: "Freelance",
      role: "Product Designer",
      period: "2017 — 2019",
      summary: "Early-career freelance work across small startups and pro-bono projects.",
      highlights: [
        "Designed Porch Light, a mutual-aid app, pro bono",
        "Worked with 8+ early-stage founders on MVP design",
      ],
    },
  ] satisfies ExperienceEntry[],
  education: [
    {
      school: "Lisbon School of Design",
      credential: "BA, Interaction Design",
      period: "2013 — 2017",
    },
    {
      school: "Interaction Design Foundation",
      credential: "Certificate, Accessibility & Inclusive Design",
      period: "2022",
    },
  ] satisfies EducationEntry[],
  skillGroups: [
    {
      category: "Design",
      items: ["Product strategy", "0→1 design", "Design systems", "Interaction design", "Prototyping"],
    },
    {
      category: "Research",
      items: ["Usability testing", "Card sorting", "Accessibility audits", "Diary studies"],
    },
    {
      category: "Tools",
      items: ["Figma", "Figma Variables", "Framer", "Storybook", "Notion", "Linear"],
    },
    {
      category: "Adjacent skills",
      items: ["HTML/CSS", "React basics", "Design token pipelines", "Technical writing"],
    },
  ] satisfies SkillGroup[],
  testimonials: [
    {
      quote:
        "Elena turned our worst-performing screen into the reason people finish onboarding. She sat in on every usability session herself.",
      author: "Priya Nathan",
      role: "Head of Product, Nimbus Pay",
    },
    {
      quote:
        "She didn't just make it prettier — she made it legible to a 71-year-old on a bad day. That's the whole job, honestly.",
      author: "Marcus Webb",
      role: "VP Product, Hearth Health",
    },
    {
      quote:
        "First design system I've worked with where engineering was a co-author, not a downstream recipient. That's why it actually stuck.",
      author: "Dana Ferreira",
      role: "Staff Engineer, Platform Team",
    },
  ] satisfies Testimonial[],
  contact: {
    email: "hello@elenamarlowe.design",
    resumeUrl: "#resume",
    links: [
      { label: "Portfolio (PDF)", url: "#portfolio-pdf" },
      { label: "LinkedIn", url: "#linkedin" },
      { label: "Dribbble", url: "#dribbble" },
    ],
  },
};

export const catName = "Lola";
