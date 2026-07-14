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
  emoji: string;
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
  emoji: string;
  link?: string;
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
  emoji: string;
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
