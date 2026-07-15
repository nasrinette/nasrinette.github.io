export const colorTokens = [
  { name: "Cream", varName: "--color-cream", light: "#FAF6F2", dark: "#17120F", usage: "App background base" },
  { name: "Cream Soft", varName: "--color-cream-soft", light: "#FFFFFF", dark: "#211A16", usage: "Card surfaces" },
  { name: "Blush", varName: "--color-blush", light: "#EDE0DD", dark: "#2E2220", usage: "Hover states, subtle fills" },
  { name: "Blush Deep", varName: "--color-blush-deep", light: "#DFC9C6", dark: "#3D2D2A", usage: "Borders, dividers" },
  { name: "Rose", varName: "--color-rose", light: "#A9748A", dark: "#C98CA0", usage: "Primary actions" },
  { name: "Rose Deep", varName: "--color-rose-deep", light: "#8F5D74", dark: "#B5748C", usage: "Primary hover" },
  { name: "Rose Dark", varName: "--color-rose-dark", light: "#6F4457", dark: "#E3AEBD", usage: "Emphasis text, focus rings" },
  { name: "Gold", varName: "--color-gold", light: "#B8935B", dark: "#CDA467", usage: "Accents" },
  { name: "Gold Soft", varName: "--color-gold-soft", light: "#D9C29A", dark: "#8C7248", usage: "Secondary accent" },
  { name: "Ink", varName: "--color-ink", light: "#211815", dark: "#F3E9E3", usage: "Primary text" },
  { name: "Ink Soft", varName: "--color-ink-soft", light: "#6B5B56", dark: "#B9A89F", usage: "Secondary text" },
  { name: "Paw", varName: "--color-paw", light: "#F0E4DA", dark: "#2A211C", usage: "Tag backgrounds" },
];

export const typeScale = [
  { name: "Display", sample: "Aa", size: "22px / 1.2", weight: "800", family: "Manrope" },
  { name: "Heading", sample: "Aa", size: "16px / 1.3", weight: "700", family: "Manrope" },
  { name: "Body", sample: "Aa", size: "14px / 1.6", weight: "400", family: "Inter" },
  { name: "Body strong", sample: "Aa", size: "14px / 1.6", weight: "600", family: "Inter" },
  { name: "Caption", sample: "Aa", size: "12px / 1.4", weight: "500", family: "Inter" },
  { name: "Mono", sample: "Aa", size: "11px / 1.4", weight: "400", family: "JetBrains Mono" },
];

export const spacingScale = [
  { token: "space-1", px: 4 },
  { token: "space-2", px: 8 },
  { token: "space-3", px: 12 },
  { token: "space-4", px: 16 },
  { token: "space-6", px: 24 },
  { token: "space-8", px: 32 },
  { token: "space-12", px: 48 },
];

export const radiusScale = [
  { token: "radius-md", px: 6 },
  { token: "radius-lg", px: 8 },
  { token: "radius-xl", px: 12 },
  { token: "radius-full", px: 999 },
];

export const principles = [
  {
    title: "Restraint over decoration",
    detail: "One accent color, used sparingly. Hairline borders instead of heavy shadows. Corners stay tight — 6–12px, not oversized pill shapes.",
  },
  {
    title: "Icons, not emoji",
    detail: "Every glyph in the interface is a consistent-weight line icon. Emoji render differently per OS and read as informal — line icons stay on-brand everywhere.",
  },
  {
    title: "Text does the heavy lifting",
    detail: "No icon appears without a text label on first use. Icons reinforce meaning, they don't carry it alone.",
  },
  {
    title: "Motion is a whisper",
    detail: "Transitions run 150–200ms with no bounce or overshoot. Reduced-motion preferences are fully respected.",
  },
  {
    title: "Dual-theme by default",
    detail: "Every token is defined for both light and dark from the start — dark mode is not an afterthought skin.",
  },
  {
    title: "Mono for machine-ish facts",
    detail: "Timestamps, metadata, and version-like values use a monospace face to read as precise, not decorative.",
  },
];
