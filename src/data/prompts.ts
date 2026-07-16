import type { PromptDef } from "../types";

/* Lola is the guide, not Nazrin — a visitor is asking *her* about *Nazrin*, so
   the copy stays in third person on both sides of the turn. */
export const starterPrompts: PromptDef[] = [
  {
    id: "about",
    label: "Tell me about Nazrin",
    keywords: ["about", "who", "yourself", "nazrin", "intro", "background", "bio"],
  },
  {
    id: "projects",
    label: "Show me her projects",
    keywords: ["project", "projects", "work", "portfolio", "case study", "case studies"],
  },
  {
    id: "contact",
    label: "How can I reach her?",
    keywords: ["contact", "reach", "email", "hire", "available", "availability", "resume", "cv"],
  },
  {
    id: "fun",
    label: "Tell me something fun about her",
    // "lola" is deliberately not a keyword: mentioning the cat by name is
    // addressing the guide, not asking for fun facts about Nazrin
    keywords: ["fun", "funny", "hobby", "hobbies", "cat", "random"],
  },
];

/* Follow-ups continue the thread just pulled — never a menu of everything. An
   answer that ends in a view leads with its nav chip, so at most one or two
   suggestions ever sit under a reply. Intents with no chip (process, skills,
   design system) stay reachable by typing. */
export const followUpChips: Record<string, string[]> = {
  about: ["How can I reach her?"],
  projects: ["Tell me about Nazrin", "How can I reach her?"],
  contact: ["Show me her projects"],
  fun: ["Tell me about Nazrin"],
  "design-system": ["Show me her projects"],
  process: ["Show me her projects"],
  skills: ["Show me her projects"],
  fallback: ["Tell me about Nazrin", "Show me her projects", "How can I reach her?"],
};
