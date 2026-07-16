// Sunset design system — the documented source of truth for the tokens
// defined in index.css. Keep these values in sync with that file.

export const gradientTokens = [
  {
    name: "Sunset",
    varName: "--gradient-sunset",
    css: "soft coral → apricot → gold, 103°",
    usage: "Primary actions, active states, the user's message",
  },
  {
    name: "Sunset Soft",
    varName: "--gradient-sunset-soft",
    css: "pale peach → gold, 103°",
    usage: "Large decorative fills, hero light",
  },
  {
    name: "Dusk",
    varName: "--gradient-dusk",
    css: "plum → coral → gold, 160°",
    usage: "The cool counterweight — accents & mascot pond",
  },
];

export const colorTokens = [
  { name: "Cream", varName: "--color-cream", light: "#FFF8F2", dark: "#060409", usage: "App background base" },
  { name: "Cream Soft", varName: "--color-cream-soft", light: "#FFFDFB", dark: "#181014", usage: "Card surfaces" },
  { name: "Blush", varName: "--color-blush", light: "#FEF3ED", dark: "#24191E", usage: "Hover states, subtle fills" },
  { name: "Blush Deep", varName: "--color-blush-deep", light: "#F6E2D6", dark: "#35262F", usage: "Borders, dividers" },
  { name: "Coral", varName: "--color-rose", light: "#F4B3A1", dark: "#F2916F", usage: "Primary accent" },
  { name: "Coral Deep", varName: "--color-rose-deep", light: "#EF9D84", dark: "#F6A686", usage: "Primary hover" },
  { name: "Coral Dark", varName: "--color-rose-dark", light: "#A54627", dark: "#F7BBA2", usage: "Emphasis text, links, focus" },
  { name: "Gold", varName: "--color-gold", light: "#F6D29A", dark: "#F2C069", usage: "Secondary accent" },
  { name: "Gold Soft", varName: "--color-gold-soft", light: "#FBEBD0", dark: "#3D2E1E", usage: "Soft gold fills" },
  { name: "Dusk", varName: "--color-dusk", light: "#BD95AD", dark: "#CB9EC0", usage: "Cool plum accent" },
  { name: "Ink", varName: "--color-ink", light: "#3B2925", dark: "#FBEDE4", usage: "Primary text" },
  { name: "Ink Soft", varName: "--color-ink-soft", light: "#7C5B52", dark: "#C7AB9F", usage: "Secondary text" },
  { name: "Paw", varName: "--color-paw", light: "#FDEFE5", dark: "#1F1622", usage: "Tag backgrounds" },
];

export const typeScale = [
  { name: "Display", sample: "Aa", size: "30px / 1.15", weight: "700", family: "Quicksand" },
  { name: "Heading", sample: "Aa", size: "18px / 1.3", weight: "700", family: "Quicksand" },
  { name: "Body", sample: "Aa", size: "14px / 1.6", weight: "400", family: "Nunito" },
  { name: "Body strong", sample: "Aa", size: "14px / 1.6", weight: "600", family: "Nunito" },
  { name: "Caption", sample: "Aa", size: "12px / 1.4", weight: "500", family: "Nunito" },
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

// one radius across every button and container; circles are the only exception
export const radiusScale = [
  { token: "radius-ui", px: 10 },
  { token: "radius-full", px: 999 },
];

export const elevationScale = [
  { token: "shadow-soft", label: "Soft", usage: "Buttons, resting chips" },
  { token: "shadow-card", label: "Card", usage: "Cards, surfaces at rest" },
  { token: "shadow-lift", label: "Lift", usage: "Hover / raised state" },
  { token: "shadow-glow", label: "Glow", usage: "Coral glow on hover of primary" },
];

export const principles = [
  {
    title: "One horizon, used with intent",
    detail:
      "A single sunset gradient carries every primary action, active state, and the user's own voice. It earns attention precisely because nothing else competes for it.",
  },
  {
    title: "Warm all the way down",
    detail:
      "No neutral grays. Text is a plum-brown ink, surfaces are peachy creams, shadows are tinted coral — so light and interface read as one continuous warm light.",
  },
  {
    title: "Cute in shape, elegant in finish",
    detail:
      "Generous rounded corners and a friendly cat host keep it warm; hairline borders, restrained shadows, and a monospace face for facts keep it composed.",
  },
  {
    title: "Two-tier action hierarchy",
    detail:
      "The gradient button leads; a soft ghost button follows. Never two primaries side by side — the eye should always know where to go first.",
  },
  {
    title: "Motion is a whisper",
    detail: "Transitions run 120–220ms with no bounce or overshoot. Reduced-motion preferences are fully respected.",
  },
  {
    title: "Dual-theme by default",
    detail:
      "Every token is defined for both the day sky and the dusk from the start — dark mode is a second painting of the same scene, not an afterthought skin.",
  },
];
