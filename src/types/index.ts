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

export interface ChatMessage {
  id: string;
  sender: Sender;
  text: string;
  createdAt: number;
  status?: MessageStatus;
  rich?: RichContent;
  chips?: string[];
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
}

export interface PromptDef {
  id: string;
  label: string;
  emoji: string;
  keywords: string[];
}
