import type { LucideIcon } from "lucide-react";

export type Sender = "cat" | "user";

export type MessageStatus = "sending" | "sent" | "failed";

export interface ProjectRef {
  kind: "projects";
  ids?: string[];
}

export interface ContactRef {
  kind: "contact";
}

export type RichContent = ProjectRef | ContactRef;

export interface NavChip {
  label: string;
  view: AppView;
  projectId?: string;
}

export interface ChatMessage {
  id: string;
  sender: Sender;
  text: string;
  createdAt: number;
  status?: MessageStatus;
  rich?: RichContent;
  chips?: string[];
  navChips?: NavChip[];
}

export interface Metric {
  label: string;
  value: string;
}

export interface GalleryBlock {
  caption: string;
  gradient: [string, string];
  icon: LucideIcon;
  /** Real screenshot path (under /assets); falls back to gradient + icon when absent. */
  image?: string;
  /** "contain" shows the whole image (labelled charts, dense diagrams); default "cover". */
  fit?: "cover" | "contain";
  /** "phone" renders in the horizontal screens rail; default "wide" (grid tile). */
  variant?: "wide" | "phone";
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  role: string;
  year: string;
  duration: string;
  tags: string[];
  tools: string[];
  highlights: string[];
  gradient: [string, string];
  icon: LucideIcon;
  /** Cover image for the project card. */
  cover?: string;
  /** Banner image for the case study hero. */
  heroImage?: string;
  /** "contain" letterboxes the hero over the gradient (portrait GIFs); default "cover". */
  heroFit?: "cover" | "contain";
  link?: string;
  /** Short label for the external `link` tab in the artifact panel (e.g. "Live site", "Figma prototype"); defaults to "Live". */
  linkLabel?: string;
  problem: string;
  goals: string[];
  process: string[];
  solution: string;
  results: Metric[];
  gallery: GalleryBlock[];
  testimonial?: Testimonial;
}

export interface PromptDef {
  id: string;
  label: string;
  keywords: string[];
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
}

export interface EducationEntry {
  school: string;
  credential: string;
  period: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export type AppView = "chat" | "projects" | "design-system" | "profile";
