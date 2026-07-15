import type { PromptDef } from "../types";

export const starterPrompts: PromptDef[] = [
  {
    id: "about",
    label: "Tell me about yourself",
    keywords: ["about", "who are you", "yourself", "intro", "background", "bio"],
  },
  {
    id: "projects",
    label: "Show me your projects",
    keywords: ["project", "projects", "work", "portfolio", "case study", "case studies"],
  },
  {
    id: "design-system",
    label: "Show me your design system",
    keywords: ["design system", "tokens", "components", "colors", "typography", "palette"],
  },
  {
    id: "process",
    label: "What's your design process?",
    keywords: ["process", "how do you work", "workflow", "methodology", "approach"],
  },
  {
    id: "skills",
    label: "What tools do you use?",
    keywords: ["tools", "skills", "software", "stack", "figma"],
  },
  {
    id: "contact",
    label: "How can I reach you?",
    keywords: ["contact", "reach", "email", "hire", "available", "availability", "resume", "cv"],
  },
  {
    id: "fun",
    label: "Tell me something fun about you",
    keywords: ["fun", "funny", "hobby", "hobbies", "cat", "lola", "random"],
  },
];

export const followUpChips: Record<string, string[]> = {
  about: ["Show me your projects", "What's your design process?", "How can I reach you?"],
  projects: ["What's your design process?", "What tools do you use?", "How can I reach you?"],
  "design-system": ["Show me your projects", "What tools do you use?"],
  process: ["Show me your projects", "What tools do you use?"],
  skills: ["Show me your projects", "Show me your design system"],
  contact: ["Tell me about yourself", "Show me your projects"],
  fun: ["Tell me about yourself", "Show me your projects"],
  fallback: ["Tell me about yourself", "Show me your projects", "How can I reach you?"],
};
