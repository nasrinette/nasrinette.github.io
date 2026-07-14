import { profile, catName } from "./profile";
import { projects } from "./projects";
import { followUpChips } from "./prompts";
import type { RichContent } from "../types";

export interface ResponseContent {
  text: string;
  rich?: RichContent;
  chips?: string[];
}

function bulletList(items: string[]): string {
  return items.map((i) => `- ${i}`).join("\n");
}

export function aboutResponse(): ResponseContent {
  return {
    text: [
      `**${profile.name}** here — ${profile.role}, based in ${profile.location}.`,
      profile.bio.join("\n\n"),
      `**Focus areas:**\n\n${bulletList(profile.focusAreas)}`,
    ].join("\n\n"),
    chips: followUpChips.about,
  };
}

export function projectsResponse(): ResponseContent {
  if (projects.length === 0) {
    return {
      text: "Hmm, my project cabinet is empty right now 📭 — check back soon, or ask me something else!",
      chips: followUpChips.fallback,
    };
  }
  return {
    text: `Here are a few things ${profile.name.split(" ")[0]} has shipped. Tap a card for the full story, or ask me about any of them by name.`,
    rich: { kind: "projects" },
    chips: followUpChips.projects,
  };
}

export function projectDetailResponse(id: string): ResponseContent {
  const project = projects.find((p) => p.id === id);
  if (!project) {
    return {
      text: `I couldn't dig up a project called "${id}" 🐾 — here's everything I do have:`,
      rich: { kind: "projects" },
      chips: followUpChips.projects,
    };
  }
  return {
    text: [
      `${project.emoji} **${project.title}** — ${project.role}, ${project.year} (${project.duration})`,
      project.description,
      `**Highlights:**\n\n${bulletList(project.highlights)}`,
      `**Tools:** ${project.tools.join(", ")}`,
    ].join("\n\n"),
    chips: ["Show me your projects", "What's your design process?", "How can I reach you?"],
  };
}

export function processResponse(): ResponseContent {
  const steps = profile.process
    .map((p, i) => `${i + 1}. **${p.step}** — ${p.detail}`)
    .join("\n");
  return {
    text: `Here's roughly how a project flows, start to finish:\n\n${steps}`,
    chips: followUpChips.process,
  };
}

export function skillsResponse(): ResponseContent {
  return {
    text: [
      `**Tools in daily rotation:**\n\n${bulletList(profile.tools)}`,
      `${profile.yearsExperience} years in product design, mostly ${profile.focusAreas.slice(0, 2).join(" and ")}.`,
    ].join("\n\n"),
    chips: followUpChips.skills,
  };
}

export function contactResponse(): ResponseContent {
  return {
    text: `${profile.availability}. Best way to reach ${profile.name.split(" ")[0]} is below 👇`,
    rich: { kind: "contact" },
    chips: followUpChips.contact,
  };
}

export function funResponse(): ResponseContent {
  const fact = profile.funFacts[Math.floor(Math.random() * profile.funFacts.length)];
  return {
    text: `🐾 ${fact}\n\n(also, I'm named ${catName} — nice to meet you.)`,
    chips: followUpChips.fun,
  };
}

export function greetingResponse(): ResponseContent {
  return {
    text: `Hello! I'm ${catName}, ${profile.name.split(" ")[0]}'s portfolio assistant 🐱 Ask me anything, or tap a suggestion below.`,
    chips: followUpChips.fallback,
  };
}

export function thanksResponse(): ResponseContent {
  return {
    text: "You're welcome! *purrs* Anything else you'd like to know?",
    chips: followUpChips.fallback,
  };
}

export function identityResponse(): ResponseContent {
  return {
    text: `Full disclosure: I'm not a real AI — just a friendly scripted guide built for this portfolio so you can explore hands-free. All the info I share is genuinely accurate about ${profile.name}, though!`,
    chips: followUpChips.fallback,
  };
}

export function meowResponse(): ResponseContent {
  return {
    text: "Meow! 🐾",
    chips: followUpChips.fallback,
  };
}

export function fallbackResponse(): ResponseContent {
  const openers = [
    "I'm just a portfolio kitty — I don't have paws for that one yet.",
    "Hmm, that's outside my litter box of knowledge.",
    "I only know my human's work, not the whole internet, sorry!",
  ];
  const opener = openers[Math.floor(Math.random() * openers.length)];
  return {
    text: `${opener} 🐾 Try one of these instead:`,
    chips: followUpChips.fallback,
  };
}

export function errorEasterEgg(): ResponseContent {
  return {
    text: "Uh oh — I got distracted chasing a laser pointer and lost my train of thought. Mind trying that again?",
    chips: followUpChips.fallback,
  };
}
