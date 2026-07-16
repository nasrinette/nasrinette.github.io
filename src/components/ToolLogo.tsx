import {
  siClaude,
  siD3,
  siFigma,
  siGit,
  siGithub,
  siGoogleforms,
  siHtml5,
  siJavascript,
  siMiro,
  siNotion,
  siPython,
  siReact,
  siRedux,
  siTailwindcss,
} from "simple-icons";

// LinkedIn is no longer distributed by simple-icons or lucide, so its path lives here.
const linkedInIcon = {
  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
};

// First matching pattern wins, so more specific brands go before broader ones
// (e.g. "React & Tailwind" should read as React, "GitHub" must not match /git/).
const LOGOS: [RegExp, { path: string }][] = [
  [/linkedin/i, linkedInIcon],
  [/figma/i, siFigma],
  [/github/i, siGithub],
  [/react/i, siReact],
  [/tailwind/i, siTailwindcss],
  [/redux/i, siRedux],
  [/python|pandas/i, siPython],
  [/\bd3\b|d3\.js/i, siD3],
  [/notion/i, siNotion],
  [/miro/i, siMiro],
  [/claude/i, siClaude],
  [/javascript/i, siJavascript],
  [/html/i, siHtml5],
  [/google forms/i, siGoogleforms],
  [/\bgit\b/i, siGit],
];

interface ToolLogoProps {
  name: string;
  size?: number;
  className?: string;
}

/**
 * Brand mark for a tool name, rendered in currentColor so it stays legible
 * in both themes. Returns null when no brand icon matches.
 */
export default function ToolLogo({ name, size = 14, className = "" }: ToolLogoProps) {
  const icon = LOGOS.find(([pattern]) => pattern.test(name))?.[1];
  if (!icon) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <path d={icon.path} />
    </svg>
  );
}
