import {
  BarChart3,
  BookOpen,
  Coffee,
  Globe2,
  Lamp,
  Lightbulb,
  ListChecks,
  MousePointer2,
  Network,
  PenTool,
  QrCode,
  Receipt,
  Search,
  Smartphone,
  Users,
} from "lucide-react";
import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "interactive-menu",
    title: "Interactive Menu App",
    summary: "A QR-code restaurant menu that ends the wait for the waiter.",
    description:
      "A digital restaurant ordering experience designed to eliminate waiter dependency, provide complete ingredient transparency, and simplify group payments. The QR-code-based solution earned an 8.8/10 likelihood-to-use score and won over users who initially preferred paper menus.",
    role: "Lead UX Designer & Frontend Developer",
    year: "2025",
    duration: "2 months",
    tags: ["HCI", "Mobile", "Accessibility"],
    tools: ["Figma", "React.js", "Tailwind CSS", "Redux Toolkit"],
    highlights: [
      "Surveyed 16 users and ran task-based usability tests with 8 more",
      "Converted initial paper-menu advocates: 68% preferred paper before, 8.8/10 would use ours",
      "Persistent accessibility controls (contrast, font size) on every screen",
    ],
    gradient: ["#f6b4a2", "#f19a86"],
    icon: QrCode,
    link: "https://interactive-menu-app.netlify.app/",
    problem:
      "Despite paper menus forcing diners to wait for service and guess at ingredients, 68% of research participants initially preferred them over digital alternatives. The issue isn't technology adoption — existing digital solutions simply don't solve the real pain points: service dependency, opaque ingredient info, and broken group payments.",
    goals: [
      "Let diners order and pay without waiting for waiter attention",
      "Show full ingredients, allergens, and customization for every dish",
      "Make splitting the bill in a group effortless",
      "Keep it usable for first-time digital users and people with visual impairments",
    ],
    process: [
      "Surveyed 16 participants (ages 21–65) on dining pain points; group payment chaos came up unprompted in 6 of 16 responses",
      "Built 3 personas — a 72-year-old first-time digital user, an efficiency-focused developer, and a diner with macular degeneration",
      "Each of 4 team members sketched solutions independently, then we synthesized the strongest ideas into one low-fi prototype",
      "Ran think-aloud usability tests with 8 participants (ages 21–59) across three realistic scenarios, including group bill splitting",
    ],
    solution:
      "Each table gets a QR code — scan it and the menu loads instantly, no app or account required. Every dish shows full ingredients, allergen warnings, and customization options upfront. Each diner pays for their own items individually, and accessibility controls (contrast, font size, help) stay visible on every screen instead of hiding in settings.",
    results: [
      { label: "Likelihood to use in a real restaurant", value: "8.8/10" },
      { label: "User confidence score", value: "4.5/5" },
      { label: "Paper-menu preference", value: "68% → won over" },
    ],
    gallery: [
      { caption: "QR-code entry — no app download", gradient: ["#f9cbbd", "#f6b4a2"], icon: Smartphone },
      { caption: "Full ingredient transparency & smart filters", gradient: ["#f6b4a2", "#f19a86"], icon: ListChecks },
      { caption: "Individual payment for group dining", gradient: ["#f4a894", "#f19a86"], icon: Receipt },
    ],
    testimonial: {
      quote: "We can split the bill with friends.",
      author: "Study participant, 23",
      role: "Usability testing session",
    },
  },
  {
    id: "goodreads-ux",
    title: "UX Study — Goodreads",
    summary: "A cursor-tracked usability study of the world's biggest book platform.",
    description:
      "A quantitative UX study of the Goodreads book recommendation platform. Combining cursor-tracking technology with structured task-based testing and surveys across 16 participants, we identified critical navigation pain points and delivered data-driven design recommendations.",
    role: "UX Researcher & Data Analyst",
    year: "2025",
    duration: "6 weeks",
    tags: ["UX Research", "Quantitative", "Data Analysis"],
    tools: ["Python (Pandas, Matplotlib, Seaborn)", "Cursor tracking", "Google Forms", "Canva"],
    highlights: [
      "Task-based study with 16 users combining cursor tracking and surveys",
      "Found that more time on site correlated with lower satisfaction — confusion, not engagement",
      "Published as a blog post on Télécom Paris's QuantUX site",
    ],
    gradient: ["#f7d49a", "#f3c079"],
    icon: BookOpen,
    link: "https://quantux.telecom-paris.fr/2025/03/07/evaluating-the-usability-of-goodreads/",
    problem:
      "Goodreads is one of the world's largest book platforms, yet there's little public research on its actual usability. As users ourselves, we'd felt the friction — so we asked: how intuitive, efficient, and satisfying is Goodreads for someone trying to find a book recommendation?",
    goals: [
      "Identify pain points via time spent, interaction frequency, and qualitative feedback",
      "Evaluate book discovery across Similar Books, Genres, Explore, Lists, and Community",
      "Measure satisfaction with Likert ratings and open-ended responses",
    ],
    process: [
      "Mapped the full Goodreads user journey to locate emotional low points — discovery and post-interaction phases stood out",
      "Designed a 3-task protocol: free exploration, feature discovery, and finding a recommendation via a friend's profile",
      "Collected cursor-tracking data plus surveys from 16 participants",
      "Analyzed with correlation matrices, heatmaps, and interaction-frequency charts",
    ],
    solution:
      "The data pointed to concrete recommendations: redesign the outdated Community section (participants compared it to Craigslist), add comprehensive filtering, simplify navigation, and reduce information density. Similar Books — the most engaging feature at 1.9 minutes and 2.2 books consulted — should anchor discovery.",
    results: [
      { label: "Average usability rating", value: "3.9/5" },
      { label: "Found the site easy to use", value: "31%" },
      { label: "Key insight", value: "Time ≠ engagement" },
    ],
    gallery: [
      { caption: "Cursor-tracking heatmaps of navigation", gradient: ["#fbe4bb", "#f7d49a"], icon: MousePointer2 },
      { caption: "Correlation analysis: time vs. satisfaction", gradient: ["#f7d49a", "#f3c079"], icon: BarChart3 },
      { caption: "3-task protocol with 16 participants", gradient: ["#f5c88a", "#f3c079"], icon: Search },
    ],
    testimonial: {
      quote: "This feels like it wasn't touched since 2009.",
      author: "Study participant",
      role: "On the Goodreads Community section",
    },
  },
  {
    id: "illumilend",
    title: "IllumiLend — Augmented Storage Room",
    summary: "A storage room that guides you to your reservation with light.",
    description:
      "A color-guided system helping students quickly find, collect, and return reserved equipment in university storage rooms. Swipe your ID, follow a projected floor arrow in your color, and pick up items from illuminated cubbies — synchronized with mobile and wall displays.",
    role: "UX Designer & Usability Tester",
    year: "2025",
    duration: "1-week design sprint",
    tags: ["Wayfinding", "Ambient UI", "HCI"],
    tools: ["Figma", "LED shelf lighting", "Projector"],
    highlights: [
      "80% of test users said color mapping made navigation faster",
      "Nobody picked the wrong item when the shelf lights were active",
      "Tested with 10 participants in a physical room prototype",
    ],
    gradient: ["#dcb4cd", "#c79bb9"],
    icon: Lightbulb,
    link: "https://www.figma.com/proto/wOZYuPmU3fsbzqpPIKWBUE/reserve?node-id=2013-425&t=B4GfEWrhlV6EvaMJ-0&scaling=min-zoom&content-scaling=fixed&page-id=2031%3A2918&starting-point-node-id=2013%3A425",
    problem:
      "Digital reservation systems handle bookings well but abandon users at the storage room door. Students hunt through shelves translating codes like 'B-07' into physical locations, leave without any confirmation their pickup registered, and staff manually reconcile inventory when things go missing.",
    goals: [
      "Make the room itself guide users to their items — hands-free",
      "Use color as a pre-attentive navigation language across room, shelf, and screen",
      "Provide multi-modal redundancy for users without phones or with dead batteries",
    ],
    process: [
      "Observed the real equipment room at Télécom Paris and ran a competitive analysis across library systems, warehouse picking, smart lockers, and AR navigation",
      "Sketched hand-drawn room layouts with colored markers simulating light patterns",
      "Built digital wireframes and interactive UI mockups in Figma for mobile and wall display",
      "Ran a task-based study with 10 participants: pick up 2 items, return them, then a semi-structured interview",
    ],
    solution:
      "Badge entry assigns each user a unique color in under 2 seconds. An overhead projector casts a directional floor arrow in that color, LED strips illuminate the exact cubby, and phone and wall displays mirror the same color-coded reservation details. Testing led to key refinements: never use red for placement, cap simultaneous users at 4–6 colors, and add ambient confirmation feedback (blue→green light change) after pickup.",
    results: [
      { label: "Found color paths faster", value: "80%" },
      { label: "Would use it as-is", value: "60%" },
      { label: "Wrong items picked with lights on", value: "0" },
    ],
    gallery: [
      { caption: "Color-coded floor arrows & shelf lighting", gradient: ["#e8cadd", "#dcb4cd"], icon: Lamp },
      { caption: "Hand-drawn sketches to Figma wireframes", gradient: ["#dcb4cd", "#c79bb9"], icon: PenTool },
      { caption: "Task-based study with 10 participants", gradient: ["#d2a6c4", "#c79bb9"], icon: Users },
    ],
    testimonial: {
      quote: "The color makes it super fast. I didn't even think about it, just followed the blue light.",
      author: "Participant 3",
      role: "Usability testing session",
    },
  },
  {
    id: "coffee-vis",
    title: "Coffee Across the Globe",
    summary: "11 interactive D3 visuals on global coffee trade, production, and consumption.",
    description:
      "An interactive web dashboard synthesizing five datasets covering 94 countries and 60+ years of coffee history. Users explore global trade networks, production trends, consumption patterns, and quality metrics through network graphs, choropleth maps, temporal charts, and word clouds.",
    role: "Data Visualization & Web Development",
    year: "2025",
    duration: "4 weeks",
    tags: ["Data Viz", "D3.js", "Interactive"],
    tools: ["D3.js", "JavaScript", "HTML/CSS"],
    highlights: [
      "11 interactive visualizations across trade, production, consumption, and quality",
      "Integrated 5 datasets spanning 94 countries and 60+ years",
      "Force-directed trade network with draggable nodes and a geographic map toggle",
    ],
    gradient: ["#f8c3a0", "#f3a988"],
    icon: Coffee,
    link: "https://data-vis-project.netlify.app/",
    problem:
      "Coffee industry data lives in siloed datasets — FAO statistics, production reports, consumer surveys, product reviews — in incompatible formats. Static charts miss the network structure of trade flows and the decades-long evolution of production.",
    goals: [
      "Reveal the global coffee story across production, trade, consumption, and quality in one place",
      "Match each visualization type to the shape of its data",
      "Turn static analysis into active exploration with sliders, filters, and toggles",
    ],
    process: [
      "Integrated five datasets: consumption & spending, production & trade for 94 countries, temporal trends 2000–2023, product reviews, and FAO bilateral trade flows",
      "Chose visualization types per section: force-directed graphs for trade networks, choropleths and boxplots for production, radar and lollipop charts for consumption, bubble charts and word clouds for quality",
      "Built with D3.js in a modular architecture with responsive SVG scaling",
      "Optimized performance with debouncing and requestAnimationFrame for smooth animation over large datasets",
    ],
    solution:
      "Four explorable sections tied together by interaction: a draggable trade network color-coded by importer/exporter status with a map toggle, a production dashboard with a year slider, consumption charts comparing preferences and spending over time, and a quality view encoding price, rating, and review volume. The visuals surfaced non-obvious patterns — Brazil's ~35% production share and its frost-driven volatility, Nordic countries leading per-capita consumption while growing zero coffee, and distinct regional trade clusters.",
    results: [
      { label: "Countries analyzed", value: "94" },
      { label: "Years of data", value: "60+" },
      { label: "Interactive visuals", value: "11" },
    ],
    gallery: [
      { caption: "Force-directed global trade network", gradient: ["#fbd7bc", "#f8c3a0"], icon: Network },
      { caption: "Choropleth production map with year slider", gradient: ["#f8c3a0", "#f3a988"], icon: Globe2 },
      { caption: "Consumption & quality dashboards", gradient: ["#f6b596", "#f3a988"], icon: BarChart3 },
    ],
  },
];
