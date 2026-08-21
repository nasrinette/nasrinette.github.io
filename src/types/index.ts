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

/** A mockup shell to present a screenshot in: a phone bezel or a desktop browser window. */
export type DeviceKind = "phone" | "browser";

export interface GalleryBlock {
  caption: string;
  gradient: [string, string];
  icon: LucideIcon;
  /** Real screenshot path (under /assets); falls back to gradient + icon when absent. */
  image?: string;
  /**
   * A demo clip (under /assets) that plays with controls in the artifact panel
   * instead of a still. Needs `image` alongside it as the poster — that's what
   * the collage and chips show, and what the player holds until playback.
   */
  video?: string;
  /** "contain" shows the whole image (labelled charts, dense diagrams); default "cover". */
  fit?: "cover" | "contain";
  /** "phone" renders in a tall 9:16 window; default "wide" (16:10). */
  variant?: "wide" | "phone";
  /** Dresses the shot in a device mockup in the artifact panel — a phone bezel or a browser window. */
  device?: DeviceKind;
  /**
   * Which part of the story this shot belongs to: "process" (sketches,
   * wireframes, research artifacts), "findings" (charts, data, evidence),
   * or "solution" (the shipped design — the default).
   */
  stage?: "process" | "findings" | "solution";
  /**
   * Names the app screen this shot shows (e.g. "Today"). Shots sharing a
   * name pair up in the solution showcase: the desktop shot as the window,
   * the phone shot standing in front of it. Untagged shots stay out.
   */
  screen?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

/** A design iteration told as a decision: before and after, with the why. */
export interface Comparison {
  /** The decision, a few words — e.g. "Ring instead of bars". */
  title: string;
  /** Why the after won. One or two sentences; this line is the artifact. */
  note: string;
  /** Screenshot paths (under /assets); a missing side renders a placeholder frame. */
  before?: string;
  after?: string;
  /** Version chips over the frames; default "Before" / "After". */
  beforeLabel?: string;
  afterLabel?: string;
  /** What changed, as sticky notes under the figure. */
  notes?: string[];
}

/** One node of the interaction flow diagram. */
export interface FlowStep {
  label: string;
  /** Small line under the label, e.g. the example sentence spoken to the AI. */
  note?: string;
  icon: LucideIcon;
}

/** A research persona — who the project was designed for. */
export interface Persona {
  name: string;
  /** Age/role context, e.g. "72 — retired teacher, first-time digital diner". */
  descriptor: string;
  /** Short first-person line capturing their stance. */
  quote: string;
  goals: string[];
  frustrations: string[];
}

/** A process step that carries its own evidence under the text. */
export interface ProcessStep {
  text: string;
  /** Sticky notes rendered under the text. */
  notes?: string[];
  /** A board or screenshot rendered under the notes, full width (path under /assets). */
  image?: string;
  /** Caption on the image's window bar; also its title in the artifact panel. */
  imageCaption?: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  role: string;
  year: string;
  /** Shelved as a side project: sits behind "Show more" on the Case studies page, out of the chat carousel and sidebar lists. */
  sideProject?: boolean;
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
  /** Dresses the hero shot in a device mockup in the artifact panel. */
  heroDevice?: DeviceKind;
  link?: string;
  /** Short label for the external `link` tab in the artifact panel (e.g. "Live site", "Figma prototype"); defaults to "Live". */
  linkLabel?: string;
  /** Render `link` as a live iframe preview in the artifact panel (the site must allow framing). */
  embed?: boolean;
  /**
   * The shortest viewport (px) the embedded site lays out for. A panel
   * shorter than this renders the iframe at this height and scales it down
   * to fit, instead of letting the site clip.
   */
  embedMinHeight?: number;
  problem: string;
  goals: string[];
  /**
   * Compact overview facts (Role / Timeline / Outcome…). When present they
   * replace the plain "role · year" line in the case study overview.
   */
  facts?: Metric[];
  /** Timeline steps; an empty list skips the timeline (projects using grouped Process blocks instead). A step can be a plain string or a `ProcessStep` with stickies and a board shot of its own. */
  process: (string | ProcessStep)[];
  /** Research findings, shown under a "Research" heading at the top of Process; quotes follow it. */
  research?: string;
  /** Research pain points as sticky notes, shown after `research`. */
  researchNotes?: string[];
  /** Evidence from research (e.g. store reviews of existing apps), shown with `research`. */
  researchQuotes?: Testimonial[];
  /** What the first version was and where it fell short, shown beside the V1 screens. */
  v1?: string;
  /** The first version's limits as sticky notes, shown after `v1`. */
  v1Notes?: string[];
  /** The second pass: what changed and why, shown under a "V2" heading above the build shots. */
  v2?: string;
  /** How the product is used, drawn as a step-by-step flow diagram at the top of Solution. */
  flow?: FlowStep[];
  /** Research personas, shown in the Process section. */
  personas?: Persona[];
  /** Design iterations, rendered as comparison figures in the Process section. */
  iterations?: Comparison[];
  solution: string;
  /** Honest one-liner opening Outcomes: what the project actually did for whom. */
  outcomeNote?: string;
  results: Metric[];
  /** Where the design falls short — shown in the Outcomes section, before `futureWork`. */
  limitations?: string;
  /** Where the project goes next — shown at the end of the Outcomes section. */
  futureWork?: string;
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

export type AppView = "chat" | "projects" | "design-system" | "profile" | "cv";
