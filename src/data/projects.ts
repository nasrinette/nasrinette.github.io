import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "nimbus-pay",
    title: "Nimbus Pay",
    summary: "Redesigning invoicing for freelancers who hate spreadsheets.",
    description:
      "Nimbus Pay was a fintech startup whose invoicing tool had a 38% drop-off during setup. I led a full redesign of onboarding and the invoice builder, cutting setup time from 9 minutes to under 2.",
    role: "Lead Product Designer",
    year: "2024",
    duration: "5 months",
    tags: ["Fintech", "0→1", "Onboarding"],
    tools: ["Figma", "Maze", "Notion"],
    highlights: [
      "Cut onboarding drop-off from 38% to 11%",
      "Shipped a reusable invoice-line component now used in 4 other flows",
      "Ran 12 moderated usability sessions across 3 rounds",
    ],
    gradient: ["#f6c9c9", "#f3b7a8"],
    emoji: "💌",
    link: "#case-study-nimbus-pay",
  },
  {
    id: "hearth-health",
    title: "Hearth Health",
    summary: "A calmer patient portal for people managing chronic conditions.",
    description:
      "Hearth's existing portal was built by engineers, for engineers — dense tables, no hierarchy. I rebuilt the information architecture around what patients actually check weekly: meds, appointments, and messages from their care team.",
    role: "Senior Product Designer",
    year: "2023",
    duration: "8 months",
    tags: ["Health Tech", "Accessibility", "IA"],
    tools: ["Figma", "Figjam", "UserTesting.com"],
    highlights: [
      "Redesigned IA validated via 40-participant card sort",
      "Hit WCAG AA across the entire portal, including color contrast overhaul",
      "Patient-reported task success rose from 61% to 92%",
    ],
    gradient: ["#e6c9a0", "#f3d9c4"],
    emoji: "🩺",
    link: "#case-study-hearth-health",
  },
  {
    id: "atlas-devkit",
    title: "Atlas DevKit",
    summary: "A design system built to survive contact with real engineers.",
    description:
      "Atlas was an internal component library that nobody trusted — every team forked it. I rebuilt it with a token-first architecture, paired weekly with engineering, and got adoption from 20% to 85% of product teams in two quarters.",
    role: "Design Systems Lead",
    year: "2022",
    duration: "12 months",
    tags: ["Design Systems", "B2B", "Dev Tools"],
    tools: ["Figma Variables", "Storybook", "Linear"],
    highlights: [
      "Adoption grew from 20% to 85% of internal product teams",
      "Reduced UI-related engineering tickets by ~30%",
      "Built a token pipeline syncing Figma variables to code",
    ],
    gradient: ["#f3c9c9", "#e6c9a0"],
    emoji: "🧩",
    link: "#case-study-atlas-devkit",
  },
  {
    id: "porch-light",
    title: "Porch Light",
    summary: "A neighborhood mutual-aid app, designed pro bono.",
    description:
      "A volunteer-run mutual aid network needed a simple way for neighbors to request and offer help without a Facebook group's chaos. I designed the whole flow — posting a need, matching, and a lightweight trust system — with zero dark patterns and zero ads.",
    role: "Volunteer Product Designer",
    year: "2021",
    duration: "3 months",
    tags: ["Social Good", "Mobile", "0→1"],
    tools: ["Figma", "Framer"],
    highlights: [
      "Used by 6 neighborhoods within the first season",
      "Designed entirely around low-bandwidth, older-device users",
      "No accounts required for first-time help requests",
    ],
    gradient: ["#fbe2df", "#c48a95"],
    emoji: "🏠",
    link: "#case-study-porch-light",
  },
];
