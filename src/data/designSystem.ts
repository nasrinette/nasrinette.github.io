// Sunset design system — the documented source of truth for the tokens
// defined in index.css. Keep these values in sync with that file.
//
// The DesignSystemView reads this file top to bottom the way atomic design
// stacks: foundations (the tokens below) → atoms → molecules → organisms.
// Everything a component demo needs is placeholder data (see `demo` and
// `demoProject`), never a real case study, so the gallery shows the parts,
// not the portfolio.

import type { LucideIcon } from "lucide-react";
import {
  Apple,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BarChart3,
  BookOpen,
  Camera,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CloudFog,
  CloudRain,
  CloudSun,
  Coffee,
  Component,
  Download,
  ExternalLink,
  FileText,
  FolderKanban,
  Frown,
  Globe2,
  ImageIcon,
  KeyRound,
  Lamp,
  Languages,
  Layers,
  Lightbulb,
  ListChecks,
  Mail,
  Maximize2,
  Menu,
  MessageCircle,
  MessageSquare,
  Minimize2,
  MonitorPlay,
  Moon,
  MousePointer2,
  Network,
  PanelLeftClose,
  PanelLeftOpen,
  PenTool,
  Play,
  QrCode,
  Receipt,
  RotateCcw,
  Salad,
  Search,
  ShoppingCart,
  Smartphone,
  Snowflake,
  Sparkles,
  Sun,
  Target,
  User,
  UserRound,
  Users,
  X,
} from "lucide-react";
import type { Comparison, FlowStep, GalleryBlock, Persona, Project } from "../types";

/* ============================================================
   FOUNDATIONS — the raw tokens everything is built from
   ============================================================ */

// no gradient tokens: the system is flat fills only. Per-project identity
// colors (the two-stop card art) live in each project's data, not here.
export const colorTokens = [
  { name: "Cream", varName: "--color-cream", light: "#FFF8F2", dark: "#191619", usage: "App background base" },
  { name: "Cream Soft", varName: "--color-cream-soft", light: "#FFFDFB", dark: "#232023", usage: "Card surfaces" },
  { name: "Panel", varName: "--color-panel", light: "#FFFDFB", dark: "#141114", usage: "Sidebar surface" },
  { name: "Blush", varName: "--color-blush", light: "#FEF3ED", dark: "#2F2A2E", usage: "Hover states, subtle fills" },
  { name: "Blush Deep", varName: "--color-blush-deep", light: "#F6E2D6", dark: "#413B3F", usage: "Borders, dividers" },
  { name: "Coral", varName: "--color-rose", light: "#F4B3A1", dark: "#F2916F", usage: "Primary accent" },
  { name: "Coral Deep", varName: "--color-rose-deep", light: "#EF9D84", dark: "#F6A686", usage: "Primary hover" },
  { name: "Coral Dark", varName: "--color-rose-dark", light: "#A54627", dark: "#F7BBA2", usage: "Emphasis text, links, focus" },
  { name: "Button", varName: "--color-btn", light: "#FEF0E1", dark: "#3F3226", usage: "Primary button fill" },
  { name: "Button Line", varName: "--color-btn-line", light: "#C96F35", dark: "#D8A578", usage: "Primary button outline & label" },
  { name: "Gold", varName: "--color-gold", light: "#F6D29A", dark: "#F2C069", usage: "Secondary accent" },
  { name: "Gold Soft", varName: "--color-gold-soft", light: "#FBEBD0", dark: "#3E3526", usage: "Soft gold fills" },
  { name: "Dusk", varName: "--color-dusk", light: "#BD95AD", dark: "#CB9EC0", usage: "Cool plum accent" },
  { name: "Ink", varName: "--color-ink", light: "#3B2925", dark: "#F1E4DB", usage: "Primary text" },
  { name: "Ink Soft", varName: "--color-ink-soft", light: "#7C5B52", dark: "#C9B1A5", usage: "Secondary text" },
  { name: "Paw", varName: "--color-paw", light: "#FDEFE5", dark: "#282328", usage: "Tag backgrounds" },
];

export const typeScale = [
  { name: "Display", sample: "Aa", size: "32px / 1.15", weight: "700", family: "Quicksand" },
  { name: "Heading", sample: "Aa", size: "20px / 1.3", weight: "700", family: "Quicksand" },
  { name: "Body", sample: "Aa", size: "16px / 1.6", weight: "400", family: "Nunito" },
  { name: "Body strong", sample: "Aa", size: "16px / 1.6", weight: "600", family: "Nunito" },
  { name: "Caption", sample: "Aa", size: "14px / 1.4", weight: "500", family: "Nunito" },
  { name: "Mono", sample: "Aa", size: "13px / 1.4", weight: "400", family: "JetBrains Mono" },
];

export const spacingScale = [
  { token: "space-1", px: 4 },
  { token: "space-2", px: 8 },
  { token: "space-3", px: 12 },
  { token: "space-4", px: 16 },
  { token: "space-6", px: 24 },
  { token: "space-8", px: 32 },
  { token: "space-12", px: 48 },
];

// one radius across everything, pills and circles included; small elements
// (20px or under) still render round because 10px covers half their box
export const radiusScale = [
  { token: "radius-ui", px: 10 },
  { token: "radius-full", px: 10 },
];

export const elevationScale = [
  { token: "shadow-soft", label: "Soft", usage: "Buttons, resting chips" },
  { token: "shadow-card", label: "Card", usage: "Cards, surfaces at rest" },
  { token: "shadow-lift", label: "Lift", usage: "Hover / raised state" },
  { token: "shadow-glow", label: "Glow", usage: "Coral glow on hover of primary" },
];

// motion is quiet: every transition sits between 120 and 220ms, eases out,
// and never bounces. Reduced-motion turns all of it off.
export const motionTokens = [
  { name: "Quick", value: "120ms", usage: "Presses and taps" },
  { name: "Base", value: "160ms", usage: "Hover and color shifts" },
  { name: "Settle", value: "180-220ms", usage: "Surfaces, shadows, theme" },
];

// Every lucide glyph the app draws, split by job. Interface marks steer the
// chrome and actions; content marks stand in for a project or a flow step.
export const interfaceIcons: { name: string; Icon: LucideIcon }[] = [
  { name: "Menu", Icon: Menu },
  { name: "PanelLeftOpen", Icon: PanelLeftOpen },
  { name: "PanelLeftClose", Icon: PanelLeftClose },
  { name: "MessageCircle", Icon: MessageCircle },
  { name: "FolderKanban", Icon: FolderKanban },
  { name: "Component", Icon: Component },
  { name: "User", Icon: User },
  { name: "ArrowUp", Icon: ArrowUp },
  { name: "ArrowDown", Icon: ArrowDown },
  { name: "ArrowLeft", Icon: ArrowLeft },
  { name: "ArrowRight", Icon: ArrowRight },
  { name: "ChevronLeft", Icon: ChevronLeft },
  { name: "ChevronRight", Icon: ChevronRight },
  { name: "ChevronDown", Icon: ChevronDown },
  { name: "RotateCcw", Icon: RotateCcw },
  { name: "X", Icon: X },
  { name: "Maximize2", Icon: Maximize2 },
  { name: "Minimize2", Icon: Minimize2 },
  { name: "ExternalLink", Icon: ExternalLink },
  { name: "Play", Icon: Play },
  { name: "ImageIcon", Icon: ImageIcon },
  { name: "MonitorPlay", Icon: MonitorPlay },
  { name: "Layers", Icon: Layers },
  { name: "FileText", Icon: FileText },
  { name: "Mail", Icon: Mail },
  { name: "Download", Icon: Download },
  { name: "Search", Icon: Search },
  { name: "Sun", Icon: Sun },
  { name: "Moon", Icon: Moon },
];

export const contentIcons: { name: string; Icon: LucideIcon }[] = [
  { name: "Target", Icon: Target },
  { name: "UserRound", Icon: UserRound },
  { name: "CalendarDays", Icon: CalendarDays },
  { name: "Sparkles", Icon: Sparkles },
  { name: "Frown", Icon: Frown },
  { name: "Users", Icon: Users },
  { name: "MessageSquare", Icon: MessageSquare },
  { name: "Lightbulb", Icon: Lightbulb },
  { name: "ListChecks", Icon: ListChecks },
  { name: "Network", Icon: Network },
  { name: "PenTool", Icon: PenTool },
  { name: "BarChart3", Icon: BarChart3 },
  { name: "Camera", Icon: Camera },
  { name: "BookOpen", Icon: BookOpen },
  { name: "Globe2", Icon: Globe2 },
  { name: "Smartphone", Icon: Smartphone },
  { name: "MousePointer2", Icon: MousePointer2 },
  { name: "QrCode", Icon: QrCode },
  { name: "Receipt", Icon: Receipt },
  { name: "ShoppingCart", Icon: ShoppingCart },
  { name: "Salad", Icon: Salad },
  { name: "Apple", Icon: Apple },
  { name: "Coffee", Icon: Coffee },
  { name: "KeyRound", Icon: KeyRound },
  { name: "Languages", Icon: Languages },
  { name: "Lamp", Icon: Lamp },
  { name: "CloudSun", Icon: CloudSun },
  { name: "CloudRain", Icon: CloudRain },
  { name: "CloudFog", Icon: CloudFog },
  { name: "Snowflake", Icon: Snowflake },
];

// Brand marks the ToolLogo component draws for tool chips and contact links.
// Each string is matched to a simple-icons path by ToolLogo.
export const brandMarks = [
  "Figma",
  "React",
  "Tailwind CSS",
  "Redux",
  "Python",
  "D3",
  "Notion",
  "Miro",
  "Claude",
  "JavaScript",
  "HTML5",
  "Google Forms",
  "Git",
  "GitHub",
  "LinkedIn",
];

/* ============================================================
   DEMO DATA — placeholder content for the component gallery.
   Deliberately generic (no real metrics, personas, or shots), so
   the demos read as templates, not case studies.
   ============================================================ */

const demoGradient: [string, string] = ["#f4b3a1", "#f6d29a"];

// A neutral placeholder screenshot (skeleton UI over the sunset gradient), so
// the artifact demos render a real image instead of an empty frame.
const placeholder = (label: string): string => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4b3a1"/><stop offset="1" stop-color="#f6d29a"/></linearGradient></defs><rect width="800" height="500" fill="#fffdfb"/><rect width="800" height="96" fill="url(#g)"/><circle cx="60" cy="48" r="22" fill="#fffdfb" opacity="0.85"/><rect x="96" y="38" width="190" height="20" rx="6" fill="#fffdfb" opacity="0.85"/><rect x="56" y="150" width="430" height="28" rx="8" fill="#f6e2d6"/><rect x="56" y="204" width="660" height="18" rx="7" fill="#f6e2d6"/><rect x="56" y="240" width="600" height="18" rx="7" fill="#f6e2d6"/><rect x="56" y="300" width="300" height="54" rx="12" fill="#f4b3a1"/><text x="744" y="472" text-anchor="end" font-family="ui-monospace, monospace" font-size="22" fill="#7c5b52">${label}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

export const demo = {
  gradient: demoGradient,
  icon: Sparkles as LucideIcon,
  placeholderImage: placeholder("Preview"),
  chips: ["Sample question", "Another prompt"],
  navLabel: "Placeholder link",
  richText:
    "**A bold lead carries the idea**, with *stress* where it matters.\n\n- One thought per line\n- Bullets for flows",
  metric: { value: "128", label: "Sample metric" },
  facts: [
    { label: "Role", value: "Owner of the work" },
    { label: "Timeline", value: "A few weeks" },
    { label: "Outcome", value: "Shipped" },
  ],
  notes: ["One thought per note", "Short and specific", "Reads as a group"],
  flow: [
    { label: "Step one", note: "Short example line", icon: MessageSquare },
    { label: "Step two", icon: Sparkles },
    { label: "Step three", icon: Download },
  ] as FlowStep[],
  process: [
    { text: "**Discover.** One line on what happened in this phase.", notes: ["Note one", "Note two"] },
    { text: "**Define.** One line on the next phase." },
  ],
  persona: {
    name: "Sample Persona",
    descriptor: "Placeholder role, sample context",
    quote: "A short line in the persona's own voice.",
    goals: ["First goal", "Second goal"],
    frustrations: ["First frustration", "Second frustration"],
  } as Persona,
  testimonial: { quote: "A short line in the user's own voice.", author: "Sample User", role: "Placeholder role" },
  comparison: {
    title: "Before and after",
    note: "One line on why the second option won.",
    beforeLabel: "Before",
    afterLabel: "After",
  } as Comparison,
  showcaseBlocks: [
    { caption: "Screen A", image: placeholder("Screen A"), gradient: demoGradient, icon: ImageIcon, screen: "Screen A" },
    { caption: "Screen B", image: placeholder("Screen B"), gradient: demoGradient, icon: Layers, screen: "Screen B" },
  ] as GalleryBlock[],
};

// a minimal, fully placeholder Project: enough for ProjectCard and the
// artifact chip to render with no cover image (they fall back to the
// gradient + icon frame, which is the system's own "no shot yet" state).
export const demoProject: Project = {
  id: "sample",
  title: "Sample Project",
  summary: "One line describing the sample project.",
  description: "",
  role: "Product Designer",
  year: "2026",
  tags: ["Tag", "Sample"],
  tools: ["Figma"],
  highlights: [],
  gradient: demoGradient,
  icon: Sparkles,
  problem: "",
  goals: [],
  process: [],
  solution: "",
  results: [demo.metric],
  gallery: [],
};

/* ============================================================
   PRINCIPLES — the five rules the whole thing follows
   ============================================================ */

export const principles = [
  {
    title: "One accent",
    detail: "Coral is the only accent. It marks what matters, so nothing else has to fight for attention.",
  },
  {
    title: "All warm, no grey",
    detail: "Text, surfaces, and shadows are all warm tones. The screen reads as one soft light.",
  },
  {
    title: "Round but tidy",
    detail: "Soft corners and a cat host keep it friendly. Thin borders and small shadows keep it neat.",
  },
  {
    title: "One clear action",
    detail: "The filled button leads, the outline button follows. Never two loud buttons at once.",
  },
  {
    title: "Two themes, one system",
    detail: "Light and dark are designed together from the start, not one added on top of the other.",
  },
];
