import { starterPrompts } from "./prompts";
import { projects } from "./projects";

export type Intent =
  | { type: "prompt"; id: string }
  | { type: "project"; id: string }
  | { type: "greeting" }
  | { type: "thanks" }
  | { type: "identity" }
  | { type: "meow" }
  | { type: "error-demo" }
  | { type: "fallback" };

function normalize(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ");
}

const GREETINGS = ["hi", "hello", "hey", "yo", "sup", "howdy", "hiya"];
const THANKS = ["thanks", "thank you", "thx", "ty", "appreciate"];
const IDENTITY = [
  "are you real",
  "are you ai",
  "are you a real ai",
  "are you human",
  "who made you",
  "are you chatgpt",
  "are you gpt",
  "what are you",
];

export function matchIntent(rawInput: string): Intent {
  const input = normalize(rawInput);
  if (!input) return { type: "fallback" };

  if (input === "meow" || input === "meow meow") return { type: "meow" };

  if (IDENTITY.some((phrase) => input.includes(phrase))) {
    return { type: "identity" };
  }

  if (input.includes("error") || input.includes("bug") || input.includes("crash")) {
    return { type: "error-demo" };
  }

  // exact label match (chip clicks) takes priority
  const exactPrompt = starterPrompts.find((p) => normalize(p.label) === input);
  if (exactPrompt) return { type: "prompt", id: exactPrompt.id };

  // project name mentions
  const projectHit = projects.find((proj) => input.includes(normalize(proj.title)));
  if (projectHit) return { type: "project", id: projectHit.id };

  // keyword scoring across prompts
  let bestPromptId: string | null = null;
  let bestScore = 0;
  for (const p of starterPrompts) {
    const score = p.keywords.reduce((acc, kw) => (input.includes(kw) ? acc + 1 : acc), 0);
    if (score > bestScore) {
      bestScore = score;
      bestPromptId = p.id;
    }
  }
  if (bestPromptId) return { type: "prompt", id: bestPromptId };

  if (GREETINGS.some((g) => input === g || input.startsWith(g + " "))) {
    return { type: "greeting" };
  }
  if (THANKS.some((t) => input.includes(t))) {
    return { type: "thanks" };
  }

  return { type: "fallback" };
}
