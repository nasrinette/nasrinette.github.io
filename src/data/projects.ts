import {
  BookOpen,
  FolderTree,
  Handshake,
  Home,
  ListChecks,
  Map,
  Palette,
  PenTool,
  Puzzle,
  Receipt,
  RefreshCw,
  Rows3,
  Stethoscope,
  Wifi,
  Zap,
} from "lucide-react";
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
    gradient: ["#b98a9a", "#8f5d74"],
    icon: Receipt,
    link: "#case-study-nimbus-pay",
    problem:
      "New users abandoned setup before sending their first invoice. Exit surveys pointed at one thing: the product asked for tax details, bank info, and branding before ever showing the user something useful.",
    goals: [
      "Get a first-time user to a sendable invoice in under 3 minutes",
      "Defer anything that isn't required for invoice #1",
      "Make the invoice builder feel like a document, not a form",
    ],
    process: [
      "Mapped the existing 14-step setup flow and tagged every field as required-now, required-eventually, or unnecessary",
      "Ran 3 rounds of concept testing on a radically shorter flow with 8 freelancers",
      "Prototyped a line-item builder that behaves like a spreadsheet but reads like an invoice",
      "Paired with engineering weekly to validate what could actually ship incrementally",
    ],
    solution:
      "We cut setup to 4 required fields and moved tax, banking, and branding into a 'finish your profile' prompt that appears after the first invoice is sent — when the user is motivated, not before. The invoice builder got autosave, smart line-item duplication, and inline math.",
    results: [
      { label: "Setup time", value: "9 min → 1m 40s" },
      { label: "Onboarding drop-off", value: "38% → 11%" },
      { label: "First-invoice completion", value: "+61%" },
    ],
    gallery: [
      { caption: "Old 14-step setup wizard", gradient: ["#c9ab9a", "#b98a9a"], icon: ListChecks },
      { caption: "New 4-field fast start", gradient: ["#b98a9a", "#8f5d74"], icon: Zap },
      { caption: "Invoice builder, line-item detail", gradient: ["#a97d8f", "#8f5d74"], icon: Rows3 },
    ],
    testimonial: {
      quote:
        "Elena turned our worst-performing screen into the reason people finish onboarding. She sat in on every usability session herself.",
      author: "Priya Nathan",
      role: "Head of Product, Nimbus Pay",
    },
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
    gradient: ["#c9ab77", "#a9793f"],
    icon: Stethoscope,
    link: "#case-study-hearth-health",
    problem:
      "Patients managing chronic conditions checked the portal weekly for three things — meds, appointments, care team messages — but the IA was organized by internal department, not by patient need. Support tickets for 'where do I find X' were the #1 contact reason.",
    goals: [
      "Reorganize IA around patient mental models, not org charts",
      "Meet WCAG AA across the whole portal, not just new screens",
      "Reduce 'where do I find X' support tickets by half",
    ],
    process: [
      "Ran a 40-participant open card sort to find the patients' real mental model",
      "Audited every existing screen for color contrast, tap target size, and screen-reader labeling",
      "Built a new top-level IA around 'This week' instead of department silos",
      "Validated with 12 moderated sessions across patients aged 24–71",
    ],
    solution:
      "The portal now opens on a single 'This week' view — meds due, upcoming appointments, unread messages — with everything else one tap away. Every color pairing was rebuilt against a WCAG AA-checked token set, and the whole flow was tested with screen readers, not just automated scanners.",
    results: [
      { label: "Task success rate", value: "61% → 92%" },
      { label: "Support tickets (navigation)", value: "−54%" },
      { label: "Accessibility conformance", value: "WCAG AA" },
    ],
    gallery: [
      { caption: "Old department-based navigation", gradient: ["#d9c19a", "#c9ab77"], icon: FolderTree },
      { caption: "New 'This week' home view", gradient: ["#c9ab77", "#a9793f"], icon: Home },
      { caption: "Contrast-checked color tokens", gradient: ["#b8935b", "#a9793f"], icon: Palette },
    ],
    testimonial: {
      quote:
        "She didn't just make it prettier — she made it legible to a 71-year-old on a bad day. That's the whole job, honestly.",
      author: "Marcus Webb",
      role: "VP Product, Hearth Health",
    },
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
    gradient: ["#a68f85", "#6f5a52"],
    icon: Puzzle,
    link: "#case-study-atlas-devkit",
    problem:
      "Every product team had forked the shared component library because it didn't match their needs and nobody trusted it to stay stable. Design and code had drifted so far apart that engineers stopped opening Figma at all.",
    goals: [
      "Get design tokens and code tokens onto a single source of truth",
      "Win back trust from teams that had already forked the library",
      "Cut UI-related engineering tickets caused by inconsistent components",
    ],
    process: [
      "Audited every forked variant across 6 product teams to find real, not assumed, requirements",
      "Rebuilt the token architecture around Figma Variables mapped 1:1 to code tokens",
      "Paired weekly with a rotating engineer from each team through the whole rebuild",
      "Shipped incrementally, component by component, instead of a big-bang relaunch",
    ],
    solution:
      "Atlas became a token-first system: every color, space, and radius lives as a variable, synced automatically from Figma into the codebase via a small pipeline. Components shipped with usage docs, code snippets, and a named engineering owner from day one — so trust was built into the rollout, not bolted on after.",
    results: [
      { label: "Team adoption", value: "20% → 85%" },
      { label: "UI-related eng tickets", value: "−30%" },
      { label: "Design-to-code drift", value: "Near zero" },
    ],
    gallery: [
      { caption: "Token architecture map", gradient: ["#b8a89d", "#a68f85"], icon: Map },
      { caption: "Figma → code sync pipeline", gradient: ["#a68f85", "#6f5a52"], icon: RefreshCw },
      { caption: "Component doc template", gradient: ["#9c8a80", "#6f5a52"], icon: BookOpen },
    ],
    testimonial: {
      quote:
        "First design system I've worked with where engineering was a co-author, not a downstream recipient. That's why it actually stuck.",
      author: "Dana Ferreira",
      role: "Staff Engineer, Platform Team",
    },
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
    gradient: ["#c17d63", "#a9636f"],
    icon: Home,
    link: "#case-study-porch-light",
    problem:
      "Volunteer organizers were coordinating mutual aid through a Facebook group — posts got buried, there was no way to see what was already handled, and older neighbors without Facebook accounts were locked out entirely.",
    goals: [
      "Let anyone post or answer a help request with zero account required",
      "Make it obvious at a glance what's still open vs. already handled",
      "Design for low-bandwidth connections and older, low-spec phones",
    ],
    process: [
      "Shadowed two organizers for a week to see how requests actually got matched",
      "Sketched flows on paper with organizers before opening Figma, to stay implementation-agnostic",
      "Built a low-fidelity Framer prototype and tested it with neighbors aged 19 to 84",
      "Stripped every non-essential asset to keep the app usable on 3G",
    ],
    solution:
      "Porch Light needs no account for a first-time help request — just a name and what's needed. Open requests are visually distinct from claimed ones, and the whole UI was budgeted to load under 200KB for neighbors on old Android phones and spotty connections.",
    results: [
      { label: "Neighborhoods onboarded", value: "6 in season 1" },
      { label: "Account-free requests", value: "100% supported" },
      { label: "Page weight", value: "< 200KB" },
    ],
    gallery: [
      { caption: "Paper sketches with organizers", gradient: ["#d19a85", "#c17d63"], icon: PenTool },
      { caption: "Open vs. claimed request states", gradient: ["#c17d63", "#a9636f"], icon: Handshake },
      { caption: "Low-bandwidth UI budget", gradient: ["#c98a7a", "#a9636f"], icon: Wifi },
    ],
    testimonial: {
      quote:
        "Elena asked to shadow us before she opened a design tool. That one decision is why the app actually fits how we work.",
      author: "Renée Okafor",
      role: "Volunteer Organizer, Porch Light Network",
    },
  },
];
