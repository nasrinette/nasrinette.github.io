import type { PromptDef } from "../types";

export const starterPrompts: PromptDef[] = [
  {
    id: "about",
    label: "Tell me about yourself",
    emoji: "👋",
    keywords: ["about", "who are you", "yourself", "intro", "background", "bio"],
  },
  {
    id: "projects",
    label: "Show me your projects",
    emoji: "🎨",
    keywords: ["project", "projects", "work", "portfolio", "case study", "case studies"],
  },
  {
    id: "process",
    label: "What's your design process?",
    emoji: "🧭",
    keywords: ["process", "how do you work", "workflow", "methodology", "approach"],
  },
  {
    id: "skills",
    label: "What tools do you use?",
    emoji: "🛠️",
    keywords: ["tools", "skills", "software", "stack", "figma"],
  },
  {
    id: "contact",
    label: "How can I reach you?",
    emoji: "📩",
    keywords: ["contact", "reach", "email", "hire", "available", "availability", "resume", "cv"],
  },
  {
    id: "fun",
    label: "Tell me something fun about you",
    emoji: "🐾",
    keywords: ["fun", "funny", "hobby", "hobbies", "cat", "latte", "random"],
  },
];

export const followUpChips: Record<string, string[]> = {
  about: ["Show me your projects", "What's your design process?", "How can I reach you?"],
  projects: ["What's your design process?", "What tools do you use?", "How can I reach you?"],
  process: ["Show me your projects", "What tools do you use?"],
  skills: ["Show me your projects", "What's your design process?"],
  contact: ["Tell me about yourself", "Show me your projects"],
  fun: ["Tell me about yourself", "Show me your projects"],
  fallback: ["Tell me about yourself", "Show me your projects", "How can I reach you?"],
};
