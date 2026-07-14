export const colorTokens = [
  { name: "Cream", varName: "--color-cream", hex: "#FDF3EE", usage: "App background base" },
  { name: "Cream Soft", varName: "--color-cream-soft", hex: "#FFF8F4", usage: "Card surfaces" },
  { name: "Blush", varName: "--color-blush", hex: "#FBE2DF", usage: "Hover states, subtle fills" },
  { name: "Blush Deep", varName: "--color-blush-deep", hex: "#F3C9C9", usage: "Borders, dividers" },
  { name: "Rose", varName: "--color-rose", hex: "#C48A95", usage: "Primary actions, chips" },
  { name: "Rose Deep", varName: "--color-rose-deep", hex: "#A9636F", usage: "Primary hover" },
  { name: "Rose Dark", varName: "--color-rose-dark", hex: "#8A4A56", usage: "Emphasis text, focus rings" },
  { name: "Gold", varName: "--color-gold", hex: "#CFA06E", usage: "Accents" },
  { name: "Gold Soft", varName: "--color-gold-soft", hex: "#E6C9A0", usage: "Secondary gradient stop" },
  { name: "Ink", varName: "--color-ink", hex: "#4A2C2A", usage: "Primary text" },
  { name: "Ink Soft", varName: "--color-ink-soft", hex: "#7A5A55", usage: "Secondary text" },
  { name: "Paw", varName: "--color-paw", hex: "#F7E6DA", usage: "Tag backgrounds" },
];

export const typeScale = [
  { name: "Display", sample: "Aa", size: "24px / 1.2", weight: "700", family: "Quicksand" },
  { name: "Heading", sample: "Aa", size: "16px / 1.3", weight: "700", family: "Quicksand" },
  { name: "Body", sample: "Aa", size: "14px / 1.6", weight: "400", family: "Nunito" },
  { name: "Body strong", sample: "Aa", size: "14px / 1.6", weight: "700", family: "Nunito" },
  { name: "Caption", sample: "Aa", size: "12px / 1.4", weight: "500", family: "Nunito" },
  { name: "Micro", sample: "Aa", size: "10px / 1.3", weight: "500", family: "Nunito" },
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
  { token: "radius-sm", px: 8 },
  { token: "radius-md", px: 12 },
  { token: "radius-lg", px: 16 },
  { token: "radius-xl", px: 24 },
  { token: "radius-full", px: 999 },
];

export const principles = [
  {
    title: "Warm over slick",
    detail: "Rounded corners, soft gradients, and a mascot over sharp corporate polish — this is a portfolio, not a bank.",
  },
  {
    title: "One accent, used sparingly",
    detail: "Rose is the only color used for action — buttons, links, active states. Everything else stays neutral so the accent keeps meaning.",
  },
  {
    title: "Text does the heavy lifting",
    detail: "No icon appears without a text label. Emoji are decorative accents, never the only signal.",
  },
  {
    title: "Motion is a whisper",
    detail: "Animations are short (200–400ms), always ease-out, and fully disabled under prefers-reduced-motion.",
  },
];
