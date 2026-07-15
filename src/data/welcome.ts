import { catName, profile } from "./profile";
import { starterPrompts } from "./prompts";

export function welcomeText(): string {
  return `Hi, I'm ${catName}. I help people explore ${profile.name.split(" ")[0]}'s portfolio. Ask me anything, or tap a suggestion below to get started.`;
}

export const welcomeChips = starterPrompts.map((p) => p.label);
