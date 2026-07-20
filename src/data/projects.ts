import {
  Apple,
  BarChart3,
  BookOpen,
  Camera,
  CloudFog,
  CloudRain,
  CloudSun,
  Coffee,
  Download,
  Globe2,
  Lamp,
  KeyRound,
  Languages,
  Layers,
  Lightbulb,
  ListChecks,
  MessageSquare,
  MonitorPlay,
  MousePointer2,
  Network,
  PenTool,
  QrCode,
  Receipt,
  Salad,
  Search,
  ShoppingCart,
  Smartphone,
  Snowflake,
  Sparkles,
  Sun,
  Users,
} from "lucide-react";
import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "protoca",
    title: "Protoca",
    summary: "Give AI your real design, not a description of it.",
    description:
      "AI can generate UI in seconds, just not *your* UI. Protoca is a Chrome extension that captures the page you're on. From there you edit it by hand like in Figma, or hand it to an AI as your real design instead of a description of it.",
    role: "AI product builder",
    year: "2026",
    facts: [
      { label: "Role", value: "AI product builder" },
      { label: "Timeline", value: "May 2026" },
      { label: "Outcome", value: "5 POs, 2 designers use it" },
    ],
    tags: ["AI", "Design Tools", "Chrome Extension"],
    tools: ["Claude Code", "JavaScript (MV3)", "Chrome APIs"],
    highlights: [
      "The insight: don't fix the model, fix the starting point. Hand the AI the real page, not a description of it",
      "Edit where you click: the snapshot behaves like a real page until you touch an element, then it's freely movable in place",
      "Designed for failure. When capture hits a limit it degrades on purpose and says so, rather than shipping a silently-broken snapshot",
    ],
    gradient: ["#eba8b5", "#dd8fa4"],
    icon: Layers,
    cover: "/assets/protoca/protoca-cover.png",
    // the branded cover leads the overview preview; without it artifacts[0]
    // is the first process board, which is not a cover. The demo and the rest
    // of the gallery follow it in the panel.
    heroImage: "/assets/protoca/protoca-cover.png",
    link: "https://chromewebstore.google.com/detail/protoca/lmjkmbkaocgjihbppodfffjnoncoccbd?hl=en",
    linkLabel: "Chrome Web Store",
    problem:
      "**Design teams prototype with AI now, and fight it over every small detail.** The real problem is the starting point. The model gets a description of your design instead of the design itself, so its output ignores your system and you re-prompt in circles.",
    goals: [],
    process: [
      {
        text: "**Discover**: I ran open interviews with 7 teammates who prototype with AI every day, one question about where the workflow hurts.",
        image: "/assets/protoca/interviews.png",
        imageCaption: "7 coded interviews",
      },
      {
        text: "**Define**: a thematic analysis coded every card into two themes. AI output ignores the design system, and getting the result right costs time and tokens.",
        notes: [
          "Design system compliance",
          "Strategies to force compliance",
          "Iteration and speed",
          "Prototyping workflow",
          "Token consumption",
        ],
        image: "/assets/protoca/themes.png",
        imageCaption: "Two themes, five sub-themes",
      },
      {
        text: "**Design**: the popup, the library, and the editor built as one surface, modeled on tools designers already know.",
        image: "/assets/protoca/extension.png",
        imageCaption: "The capture popup",
      },
      "**Refine**: tested the full loop end to end (capture, edit, hand to AI) and cut anything that didn't earn its place.",
    ],
    flow: [
      { label: "Pick a page", note: "on your real site", icon: MousePointer2 },
      { label: "Capture it", note: "one click", icon: Camera },
      { label: "Edit by hand", note: "or export to AI", icon: PenTool },
      { label: "Iterate with AI", note: "in any tool", icon: Sparkles },
    ],
    solution:
      "**A Chrome extension, and one flow.**\n\n- **Capture**: freeze any page on your real site, exactly as it renders\n- **Edit by hand**: the capture opens in a preview you move and restyle, like Figma\n- **Or hand it to AI**: export a standalone HTML file and iterate in any AI tool\n- **Versioned**: capture a page twice and both are kept, so you can compare\n- **Grouped by site**: every capture filed under its own domain\n- **Layer select**: export one part of the page, not the whole thing\n\nEvery path starts from your real design, so the AI never resets to generic.",
    outcomeNote:
      "**The people I built it for kept using it.** 5 POs and 2 designers now prototype their ideas with AI through Protoca.\n\nIt proved the bet. AI designs better UI from a real piece of the interface than from any description of it.",
    results: [
      { label: "Now prototyping with it", value: "5 POs, 2 designers" },
      { label: "From live page to editable capture", value: "1 click" },
      { label: "Export", value: "ZIP · HTML · PNG" },
    ],
    limitations:
      "- Hand editing works, but it isn't as smooth as Figma yet.\n- Complex pages don't always capture cleanly. When one hits a limit, it says so instead of faking it.",
    futureWork:
      "**Fix what the team ran into, and keep watching.**\n\nMake hand editing feel closer to a real design tool, and harden capture so complex pages come through clean. Designer workflows are shifting fast right now, so I stay curious about the next one before building for it.",
    gallery: [
      {
        caption: "Full walkthrough",
        gradient: ["#f3c4cd", "#eba8b5"],
        icon: MonitorPlay,
        image: "/assets/protoca/protoca-poster.png",
        video: "/assets/protoca/protoca.mp4",
        fit: "contain",
      },
      { caption: "Captures by domain", gradient: ["#eba8b5", "#dd8fa4"], icon: Layers, image: "/assets/protoca/protos-home.png", fit: "contain" },
      { caption: "Edit any element", gradient: ["#e49bab", "#dd8fa4"], icon: MousePointer2, image: "/assets/protoca/layers.png", fit: "contain" },
      { caption: "Three export formats", gradient: ["#f3c4cd", "#eba8b5"], icon: Download, image: "/assets/protoca/export.png", fit: "contain" },
    ],
  },
  {
    id: "nourish-mcp",
    title: "Nourish MCP",
    summary: "A calorie tracker you update by just telling Claude what you ate.",
    description:
      "Eating better starts with knowing what you eat, and every app I tried made that a chore. Nourish is a nutrition tracker you update by telling an AI what you ate. It ships with an MCP server, so the assistant you already talk to becomes the input, and the dashboard fills in behind it.",
    role: "Solo, AI product builder",
    year: "2026",
    facts: [
      { label: "Role", value: "Solo, AI product builder" },
      { label: "Timeline", value: "June 2026" },
      { label: "Outcome", value: "MCP as the interaction" },
    ],
    tags: ["AI", "MCP", "Health"],
    tools: ["Claude Code", "MCP", "Next.js", "TypeScript"],
    highlights: [
      "The insight: the interface was the chore, so remove the form, keep the dashboard",
      "Log a meal in one sentence, from whatever AI you already use",
      "Dark and warm, not clinical: one coral calorie ring, three macro bars, four places to go",
    ],
    gradient: ["#f2cf9b", "#e9b878"],
    icon: Apple,
    cover: "/assets/nourish-mcp/nourish-tour-cover.gif",
    // the demo GIF leads the overview and autoplays in the hero preview, like
    // LingoPro and AtmosUI; the panel frames it in browser chrome.
    heroImage: "/assets/nourish-mcp/nourish-demo.gif",
    heroDevice: "browser",
    link: "https://ui-production-41e1.up.railway.app/",
    linkLabel: "Live site",
    embed: true,
    problem:
      "**I train regularly but wasn't seeing results, and every calorie tracker I tried made logging such a chore that I gave up.** The tracking was never the problem, the logging was.",
    goals: [],
    process: [],
    research:
      "**Every tracker had the same problems.** I tried the popular ones and read Play Store reviews of the most used one.",
    researchNotes: [
      "Cluttered UI",
      "Adding food by hand takes too long",
      "Hard to keep logging every day",
      "The useful features cost money",
    ],
    researchQuotes: [
      {
        quote:
          "Can't view the entire day anymore, everything is hidden in sub menus. Nutrient info for the day is three menus deep. I'm out.",
        author: "Play Store review",
        role: "market-leading tracker",
      },
    ],
    personas: [
      {
        name: "Nazrin",
        descriptor: "Me. I train hard, live in AI tools, and never stuck with a tracker",
        quote: "I'll log a meal if it's one sentence. Building it from a thousand-item list, I did that for a week and quit.",
        goals: [
          "Eat enough protein and calories to actually see results",
          "Log a meal without opening a form",
          "Keep the habit past the first week",
        ],
        frustrations: [
          "Cluttered trackers that bury the day",
          "Building every meal by hand",
          "The useful features locked behind a subscription",
        ],
      },
    ],
    v1: "**First version, built with Claude artifacts to explore the UI.** Its limits:",
    v1Notes: [
      "Goals were set during onboarding",
      "Input was a form plus a chat",
      "No dark mode",
      "No day by day view",
    ],
    v2: "**I switched to VS Code with Claude Code, for better iteration.** This is where the app became the real product.",
    flow: [
      { label: "You eat", icon: Salad },
      { label: "Tell your AI", note: "\"a chicken salad and an espresso\"", icon: MessageSquare },
      { label: "MCP logs it", note: "no forms, no search", icon: Network },
      { label: "Dashboard updates", note: "calories and macros", icon: BarChart3 },
    ],
    solution:
      "**Tell any AI what you ate. Open Nourish to see what it means.**\n\n- **Chat only**: you log by telling the AI what you ate. After testing, any form was a no\n- **Connect**: one tab links the tracker to your AI and helps you get started\n- **Goals**: the AI can create and change your daily targets\n- **Day by day**: see any day, not just today, in dark mode\n- **Accounts**: sign in, and your data is yours\n\nThe AI takes the input. The dashboard shows you the pattern.",
    outcomeNote:
      "**I built Nourish for my own problem, and it solved it perfectly.** Logging stopped being a chore, so I finally see what I eat.",
    results: [
      { label: "Idea to live app, built solo", value: "One month" },
      { label: "Effort to log a meal", value: "One sentence" },
      { label: "Where you log from", value: "Any AI you already use" },
    ],
    limitations:
      "- **Estimates can be off**: if you don't say how much you ate, the AI's numbers get less accurate\n- **Onboarding is not beginner friendly**: it assumes you know what a connector and MCP are, and already use AI tools\n- **Needs more testing**: so far the only tester is me",
    futureWork:
      "**Friends next.**\n\nSign in shipped, so every user has their own space. Next is shared goals and seeing what your friends actually eat, because staying consistent is easier together.",
    gallery: [
      { caption: "V1 onboarding: a five step form set your goals before you saw the app", gradient: ["#f7dfb8", "#f2cf9b"], icon: ListChecks, image: "/assets/nourish-mcp/v1-onboarding.png", device: "browser", screen: "Onboarding", stage: "process" },
      { caption: "V1 home: ring, macros, and the day's meals, light mode only", gradient: ["#f2cf9b", "#e9b878"], icon: BarChart3, image: "/assets/nourish-mcp/v1-today.png", device: "browser", screen: "Home", stage: "process" },
      { caption: "V1 add a meal: the manual form, later cut", gradient: ["#f2cf9b", "#e9b878"], icon: PenTool, image: "/assets/nourish-mcp/v1-add-meal.png", device: "browser", screen: "Add a meal", stage: "process" },
      { caption: "V1 goals: the plan from onboarding, editable by hand", gradient: ["#f2cf9b", "#e9b878"], icon: ListChecks, image: "/assets/nourish-mcp/v1-goals.png", device: "browser", screen: "Goals", stage: "process" },
      { caption: "Building sign in with Claude Code in VS Code, with the login page next to it", gradient: ["#f7dfb8", "#f2cf9b"], icon: Sparkles, image: "/assets/nourish-mcp/vscode+claude.png", fit: "contain", stage: "process" },
      { caption: "Log a meal: send Claude a photo or a sentence, Nourish logs it", gradient: ["#f7dfb8", "#f2cf9b"], icon: MessageSquare, image: "/assets/nourish-mcp/claude-input.png", variant: "phone", device: "phone", screen: "Log a meal" },
      { caption: "Calorie ring and macro bars for the day at a glance", gradient: ["#f2cf9b", "#e9b878"], icon: BarChart3, image: "/assets/nourish-mcp/today-mobile.png", variant: "phone", device: "phone", screen: "Today" },
      { caption: "The same day on desktop: the layout expands to a sidebar and a two-column log", gradient: ["#f2cf9b", "#e9b878"], icon: BarChart3, image: "/assets/nourish-mcp/today-desktop.png", device: "browser", screen: "Today" },
      { caption: "History: calories and macros as trends, over the range you pick", gradient: ["#eec489", "#e9b878"], icon: BarChart3, image: "/assets/nourish-mcp/history-desktop.png", device: "browser", screen: "History" },
      { caption: "The same trends in your pocket", gradient: ["#eec489", "#e9b878"], icon: BarChart3, image: "/assets/nourish-mcp/history-mobile.png", variant: "phone", device: "phone", screen: "History" },
      { caption: "Daily calorie and macro targets", gradient: ["#f2cf9b", "#e9b878"], icon: ListChecks, image: "/assets/nourish-mcp/goals-mobile.png", variant: "phone", device: "phone", screen: "Goals" },
      { caption: "Goals on desktop: targets and the day's progress side by side", gradient: ["#f2cf9b", "#e9b878"], icon: ListChecks, image: "/assets/nourish-mcp/goals-desktop.png", device: "browser", screen: "Goals" },
      { caption: "One-tap connect page pairs the tracker with Claude", gradient: ["#f7dfb8", "#f2cf9b"], icon: Network, image: "/assets/nourish-mcp/connect-mobile.png", variant: "phone", device: "phone", screen: "Connect" },
      { caption: "Connecting from desktop: copy the URL straight into Claude", gradient: ["#f7dfb8", "#f2cf9b"], icon: Network, image: "/assets/nourish-mcp/connect-desktop.png", device: "browser", screen: "Connect" },
      { caption: "Sign in: your own space, on any device", gradient: ["#f7dfb8", "#f2cf9b"], icon: KeyRound, image: "/assets/nourish-mcp/signin-desktop.png", device: "browser", screen: "Sign in" },
      { caption: "Sign in on the phone", gradient: ["#f7dfb8", "#f2cf9b"], icon: KeyRound, image: "/assets/nourish-mcp/signin-mobile.png", variant: "phone", device: "phone", screen: "Sign in" },
    ],
  },
  {
    id: "interactive-menu",
    title: "Interactive Menu App",
    summary: "A QR-code restaurant menu that ends the wait for the waiter.",
    description:
      "A QR-code menu for restaurants, so you never flag down a waiter or guess what's in your food. Scan the code on your table, see every ingredient, order and pay for your own items. No app, no account.",
    role: "Lead UX Designer & Frontend Developer",
    year: "2025",
    facts: [
      { label: "Role", value: "Lead UX & frontend" },
      { label: "Team", value: "4 designers" },
      { label: "Outcome", value: "Paper fans won over" },
    ],
    tags: ["HCI", "Mobile", "Accessibility"],
    tools: ["Figma", "React.js", "Tailwind CSS", "Redux Toolkit"],
    highlights: [
      "Surveyed 16 users and ran task-based usability tests with 8 more",
      "Converted initial paper-menu advocates. 68% preferred paper before, 8.8/10 would use ours",
      "Persistent accessibility controls (contrast, font size) on every screen",
    ],
    gradient: ["#f6b4a2", "#f19a86"],
    icon: QrCode,
    // the recorded app walkthrough leads: menu, filters, cart and split
    // payment, ratings, and the accessibility settings, all in one loop. It
    // ships with its own phone frame, so no heroDevice (that would double-bezel)
    cover: "/assets/interactive-menu/menu-demo.gif",
    heroImage: "/assets/interactive-menu/menu-demo.gif",
    heroFit: "contain",
    link: "https://interactive-menu-app.netlify.app/",
    linkLabel: "Live site",
    embed: true,
    problem:
      "**The benefits of a digital menu are obvious, so why do most restaurants still hand you paper?** We surveyed diners to find out, and 68% still preferred paper, because going digital doesn't fix what actually hurts, the wait for a waiter, the guessing at ingredients, the fight over the group bill.",
    goals: [
      "Order and pay without waiting for a waiter",
      "Every ingredient, allergen, and option shown upfront",
      "Split the bill with no mental math",
      "Usable with low vision, and by a first-timer",
    ],
    research:
      "**We surveyed 16 diners, ages 21 to 65.** 68% still preferred paper, and the same pains came up unprompted.",
    researchNotes: [
      "Waiting for the waiter",
      "Guessing what's in the dish",
      "Group-bill chaos (6 of 16)",
      "Small text, low contrast",
    ],
    process: [
      {
        text: "**Sketch**: four of us sketched apart, then merged the strongest ideas into one low-fi prototype instead of designing by committee.",
        image: "/assets/interactive-menu/low-fi-prototypes.webp",
        imageCaption: "Four solo sketches merged into one low-fi prototype",
      },
      {
        text: "**Design**: built the high-fidelity prototype in Figma, inspired by the classic French bouillon restaurants, then implemented it in React.",
        image: "/assets/interactive-menu/inspire.jpg",
        imageCaption: "Classic Paris bouillon restaurants, the reference for the look",
      },
      {
        text: "**Test**: think-aloud sessions with 8 diners across three real tasks, including a group bill. That is where the paper fans came around, 8.8/10 said they would use it for real.",
        image: "/assets/interactive-menu/hi-fi-menu.webp",
        imageCaption: "The high-fidelity prototype we tested, browse to payment",
      },
    ],
    personas: [
      {
        name: "Maxime",
        descriptor: "29, developer, always in a hurry",
        quote: "If it's slower than waving at the waiter, I'm out.",
        goals: ["Order and pay in under a minute", "Split the bill with no math"],
        frustrations: ["Waiting for service when it's busy", "Group payment chaos at the end"],
      },
      {
        name: "Claire",
        descriptor: "58, lives with low vision",
        quote: "Menus assume everyone can read fine print.",
        goals: ["Set contrast and text size on the spot", "Know what's in every dish"],
        frustrations: ["Accessibility buried in settings", "Guessing at ingredients and allergens"],
      },
    ],
    flow: [
      { label: "Scan the code", note: "on your table", icon: QrCode },
      { label: "See every dish", note: "ingredients and allergens upfront", icon: ListChecks },
      { label: "Order it yourself", note: "no app, no waiter", icon: ShoppingCart },
      { label: "Pay for your own", note: "no split-bill math", icon: Receipt },
    ],
    solution:
      "**Scan the code on your table. The menu loads. That's the whole setup.**\n\n- **No app, no account**: the QR code is the only on-ramp\n- **Every dish, fully open**: ingredients, allergens, and customisation upfront\n- **Everyone pays for their own**: no mental math at the end of the meal\n- **Accessibility stays on screen**: contrast, font size, and help on every view, never buried in settings",
    outcomeNote:
      "**These numbers come from think-aloud usability tests with 8 diners (21-59), each running three real scenarios including a group bill.**",
    results: [
      { label: "Likelihood to use in a real restaurant", value: "8.8/10" },
      { label: "User confidence score", value: "4.5/5" },
      { label: "Paper-menu preference", value: "68% → won over" },
    ],
    limitations:
      "**A prototype tested with 8 people, not a service that has run.**\n\n- Eight testers is enough to find what hurts, not to prove it holds across a full dining room\n- Payment is designed, not wired to a real kitchen or POS\n- The QR code is the only door in, so a diner with no phone still needs the waiter, the one person the design set out to make optional",
    gallery: [
      { caption: "Complete ingredient transparency for every dish", gradient: ["#f4a894", "#f19a86"], icon: ListChecks, image: "/assets/interactive-menu/ingredients.webp", variant: "phone" },
      { caption: "Individual payment for group dining", gradient: ["#f9cbbd", "#f6b4a2"], icon: Receipt, image: "/assets/interactive-menu/payment.png", variant: "phone" },
      { caption: "Persistent accessibility controls on every screen", gradient: ["#f6b4a2", "#f19a86"], icon: Smartphone, image: "/assets/interactive-menu/accessibility.png", variant: "phone" },
      { caption: "Smart dietary filters trim the menu in real time", gradient: ["#f4a894", "#f19a86"], icon: ListChecks, image: "/assets/interactive-menu/filtering.webp", variant: "phone" },
    ],
    testimonial: {
      quote: "I came in preferring the paper menu. By the end I was asking when a real restaurant would have this.",
      author: "Study participant",
      role: "Initially a paper-menu advocate",
    },
  },
  {
    id: "lingopro",
    title: "LingoPro",
    summary: "Turn any text into a vocabulary lesson, built for my own French professor.",
    description:
      "LingoPro turns any text into the same set of French exercises every time, at the level you pick, and shares to a class with one link. I built it for my own French professor, who was building each quiz by hand in ChatGPT.",
    role: "Solo, AI product builder",
    year: "2026",
    facts: [
      { label: "Role", value: "Solo, AI product builder" },
      { label: "Timeline", value: "May 2026" },
      { label: "Outcome", value: "5 professors use it" },
    ],
    tags: ["EdTech", "AI", "UX Research"],
    tools: ["Claude Code", "OpenRouter"],
    highlights: [
      "Built for one real user, my French professor, from an interview about how she actually makes these",
      "Kept her five exercises and tab layout so nothing felt new, then it spread to five professors",
      "One usability session exposed the loading screen, so I made the lesson build live and the quitting stopped",
    ],
    gradient: ["#c3b3dd", "#a794c9"],
    icon: Languages,
    // the recorded walkthrough leads everywhere, like AtmosUI: the card cover
    // and the case study hero both show the real app, light theme then dark
    cover: "/assets/lingopro/demo.gif",
    heroImage: "/assets/lingopro/demo.gif",
    heroDevice: "browser",
    link: "https://lingopro-production.up.railway.app/",
    linkLabel: "Live site",
    embed: true,
    problem:
      "**Every week I got a fresh pile of hand-made HTML quizzes, and I could never keep track of them.**\n\nMy professor built each one by hand, so they looked different every time and some just broke. Once she sent one, she had no way to see if it was used.",
    goals: [
      "One set of exercises with the same shape every time, not a new layout per lesson",
      "Any text in, a full lesson out, without redoing the prompt each time",
      "A way for her to see who actually practised",
    ],
    research:
      "**I asked her how she makes these, then looked at a batch she had already sent.**\n\nOne chat per student, a block of instructions at the top, the day's text pasted in. Every quiz used the same five exercises in tabs, vocabulary, flashcards, multiple choice, associations, and fill in the blanks. That set became the shape of the product.",
    researchNotes: [
      "One chat per student, dozens to dig through",
      "Two or three tries before the AI got it right",
      "A different layout every lesson",
      "HTML files, easy to lose, sometimes broken",
      "No idea who practised",
    ],
    personas: [
      {
        name: "Camille",
        descriptor: "My French professor, who builds every lesson by chatting with an AI",
        quote: "I make each quiz in a chat, re-prompt it two or three times, paste the text in, then lose the file.",
        goals: [
          "Turn any text into a lesson in minutes",
          "Keep the five exercises her students already know",
          "See who actually practised",
        ],
        frustrations: [
          "One chat per student, dozens to dig through",
          "Re-prompting two or three times a lesson",
          "HTML files that get lost or break",
        ],
      },
    ],
    process: [
      "I kept her exact format, the same exercises and tabs, so nothing felt new to her or her students. One calm screen, and one apricot button for the only action that matters, *Generate lesson*.",
    ],
    iterations: [
      {
        title: "The loading screen was quietly losing people",
        note: "In a test with her, the old wait screen after Generate made her doubt it was working, so she quit. I swapped it for the lesson building live, word by word, and she stayed. The screen, not the result, earned her trust.",
        before: "/assets/lingopro/loading-old.gif",
        after: "/assets/lingopro/loading-new.gif",
        beforeLabel: "The old wait screen",
        afterLabel: "Building live",
      },
    ],
    solution:
      "**Paste a text. Pick a level. Share one link.**\n\n- **Any source**: an article, a story, or a transcript of something you listened to, with the language detected for you\n- **Your level**: A2 to C2, and the words change with it\n- **Your language**: vocabulary translated into the one you think in\n- **Five ways to practise**: the full vocabulary list, flashcards, multiple choice, associations, and fill in the blanks, switched by tabs\n- **One link**: students open it and start, and she sees who did\n\nEvery lesson looks the same, so the only new thing is the words.",
    outcomeNote:
      "**Now she builds a lesson in a couple of minutes, sends one link to her class, and can finally see who practised.**",
    results: [
      { label: "Professors using it", value: "5" },
      { label: "Less time to create a lesson", value: "50%" },
      { label: "Translation languages", value: "17" },
    ],
    limitations:
      "- **Levels are not exact.** The AI does not truly know which level a word belongs to, so the same text at B2 can give a different word list each run.\n- **Long texts strain it.** A long text turns up far more words than a lesson should hold, so there is a cap, and past it the quality drops.",
    futureWork:
      "**Make a level mean the same thing every time.**\n\nAnchor each level to a fixed word list so B2 always means B2, and split a long text into several shorter lessons instead of one overloaded one.",
    gallery: [
      { caption: "Four of her past quizzes, each a different look, all the same exercises", gradient: ["#d5c9e8", "#c3b3dd"], icon: Search, image: "/assets/lingopro/examples.png", fit: "contain", stage: "findings" },
      { caption: "Create: paste any text, pick a level A2 to C2, choose the language to translate into", gradient: ["#d5c9e8", "#c3b3dd"], icon: Sparkles, image: "/assets/lingopro/create.png", device: "browser" },
      { caption: "Lexique: every word with a definition, an example sentence, and its translation", gradient: ["#c3b3dd", "#a794c9"], icon: BookOpen, image: "/assets/lingopro/lexique.png", device: "browser" },
      { caption: "Five ways to practise one text: flashcards, QCM, associations, and texte à trous", gradient: ["#baa6d4", "#a794c9"], icon: ListChecks, image: "/assets/lingopro/flashcards.png", device: "browser" },
      { caption: "The dashboard she never had, showing who practised and how it went", gradient: ["#d5c9e8", "#c3b3dd"], icon: Users, image: "/assets/lingopro/results.png", device: "browser" },
    ],
  },
  {
    id: "atmos-ui",
    title: "AtmosUI",
    summary: "Physics-based weather effects on the home screen that never cover your apps.",
    description:
      "Live weather on your home screen. Rain slides down, snow piles up on widgets, apps never get blocked. It won 2nd place among 40+ teams at Huawei Tech Arena, €4,000.",
    role: "UX Designer · Team MUGA",
    year: "2025",
    facts: [
      { label: "Role", value: "UX Designer" },
      { label: "Team", value: "MUGA · Huawei Tech Arena" },
      { label: "Outcome", value: "2nd place · €4,000" },
    ],
    tags: ["UI Design", "Motion", "Hackathon"],
    tools: ["Claude Code", "WebGL", "HTML5 & CSS3"],
    highlights: [
      "2nd place among 40+ teams at Huawei Tech Arena",
      "One rule: weather never blocks an app",
      "Three explored directions; weather won",
    ],
    gradient: ["#b9c8de", "#9db1cd"],
    icon: CloudSun,
    // the recorded effects loop leads everywhere: the card cover and the
    // overview chip both show the weather actually moving
    cover: "/assets/atmos-ui/effects.gif",
    heroImage: "/assets/atmos-ui/effects.gif",
    // no device dressing: the loop already draws its own devices on cream
    heroFit: "contain",
    link: "https://nasrinette.github.io/atmos-UI/",
    linkLabel: "Live demo",
    embed: true,
    // the demo's phone is a fixed 800px tall and never scrolls; at panel
    // widths the site also top-aligns it under 80px of padding, so 896px is
    // the least that shows the whole bezel
    embedMinHeight: 900,
    problem:
      "**Huawei's hackathon brief was a unique UI visual effect that works across form factors and stays power-efficient.** Today, weather on a phone is just a number in a corner or a wallpaper that replaces the home screen you chose.",
    // the judges' actual rubric, straight from the challenge deck — success
    // here had a literal scoring function, so it's quoted rather than invented
    goals: [
      "Unique idea, not seen in the industry (+5 points)",
      "Visual quality, judged live (+10)",
      "Real-time demo, not a video (+5 on PC, +10 on phone)",
      "Multiple form factors, foldables to cars (+10)",
    ],
    // each step carries its own evidence: the stickies said on the boards,
    // and the board itself right under them
    process: [
      {
        text: "**Analyze**: we took the brief apart first. Every slide of Huawei's deck became a sticky with what they actually want:",
        notes: [
          "Fun to play",
          "Physics-based interaction",
          "Advanced sense of light and texture",
          "Personalized expression",
          "Multi-device collaboration",
        ],
        image: "/assets/atmos-ui/requirements-analys.png",
        imageCaption: "Requirements analysis: Huawei's brief distilled into stickies",
      },
      {
        text: "**Brainstorm**: everything went on the board.",
        notes: [
          "Water ripples that follow your finger",
          "Wallpapers with 3D avatars that pass files between devices",
          "Widgets that merge into each other",
          "A home screen without a grid",
        ],
        image: "/assets/atmos-ui/brainstorming.png",
        imageCaption: "Brainstorming: three directions on one board",
      },
      {
        text: "**Decide**: we picked weather interacting with the UI, because:",
        notes: [
          "It's physics-based",
          "It's light and texture",
          "It's fun to watch",
          "It stays personal without blocking an app",
          "It works the same from a watch to a car",
        ],
      },
      {
        text: "**Visualize**: we wrote the effect as a prompt and let AI render it before any code. Rain hits icons, snow settles on them, and opening an app pulls the effect into the header.",
        image: "/assets/atmos-ui/ideation.png",
        imageCaption: "Ideation: AI-rendered concepts before any code",
      },
      "**Build**: a real-time WebGL demo with Claude Code. Four weather modes, four screen sizes.",
    ],
    flow: [
      { label: "Pick a device", note: "phone, watch, auto, desktop", icon: Smartphone },
      { label: "Pick the weather", note: "sunny, rainy, snowy, foggy", icon: CloudSun },
      { label: "Set the intensity", note: "calm to heavy", icon: Sun },
      { label: "Apps stay yours", note: "never blocked, never moved", icon: Layers },
    ],
    solution:
      "**Four kinds of weather, one rule: nothing blocks your apps.**\n\n- **Sunny**: warm light and drifting dust\n- **Rainy**: drops land on widgets and slide down\n- **Snowy**: frost spreads as flakes settle\n- **Foggy**: smoke rolls through for depth\n\nAll of it real time in the live demo, including the watch and the car.",
    results: [
      { label: "Huawei Tech Arena, among 40+ participants", value: "2nd place" },
      { label: "Prize money", value: "€4,000" },
      { label: "Form factors, one concept", value: "Phone · Watch · Auto · Desktop" },
    ],
    limitations:
      "- Proof of concept, not implemented natively\n- Weather mode is chosen by hand, not automatically as intended",
    gallery: [
      // the four weather modes, screen-tagged so each desktop shot pairs with
      // its phone twin in the solution showcase — same scene, only the weather
      // changes
      { caption: "Sunny: warm light and drifting dust", gradient: ["#e8dcc0", "#d9c496"], icon: Sun, image: "/assets/atmos-ui/desktop-sunny.jpg", device: "browser", screen: "Sunny" },
      { caption: "Sunny on the phone", gradient: ["#e8dcc0", "#d9c496"], icon: Sun, image: "/assets/atmos-ui/mobile-sunny.jpg", variant: "phone", device: "phone", screen: "Sunny" },
      { caption: "Rainy: drops gather and slide down", gradient: ["#cdd8e8", "#b9c8de"], icon: CloudRain, image: "/assets/atmos-ui/desktop-rain.jpg", device: "browser", screen: "Rainy" },
      { caption: "Rainy on the phone", gradient: ["#cdd8e8", "#b9c8de"], icon: CloudRain, image: "/assets/atmos-ui/mobile-rain.jpg", variant: "phone", device: "phone", screen: "Rainy" },
      { caption: "Snowy: frost spreads as flakes settle", gradient: ["#dbe4ee", "#b9c8de"], icon: Snowflake, image: "/assets/atmos-ui/desktop-snow.jpg", device: "browser", screen: "Snowy" },
      { caption: "Snowy on the phone", gradient: ["#dbe4ee", "#b9c8de"], icon: Snowflake, image: "/assets/atmos-ui/mobile-snow.jpg", variant: "phone", device: "phone", screen: "Snowy" },
      { caption: "Foggy: smoke rolls through for depth", gradient: ["#adbdd6", "#9db1cd"], icon: CloudFog, image: "/assets/atmos-ui/desktop-fog.jpg", device: "browser", screen: "Foggy" },
      { caption: "Foggy on the phone", gradient: ["#adbdd6", "#9db1cd"], icon: CloudFog, image: "/assets/atmos-ui/mobile-fog.jpg", variant: "phone", device: "phone", screen: "Foggy" },
    ],
  },
  {
    id: "illumilend",
    title: "IllumiLend: Augmented Storage Room",
    summary: "A storage room that guides you to your reservation with light.",
    description:
      "Reservation systems are great at booking and useless for the last ten metres. IllumiLend makes the room do the guiding. Badge in, get a colour, follow the arrow on the floor to the cubby lit in that same colour.",
    role: "UX Designer & Usability Tester",
    year: "2025",
    sideProject: true,
    tags: ["Wayfinding", "Ambient UI", "HCI"],
    tools: ["Figma", "LED shelf lighting", "Projector"],
    highlights: [
      "Colour before words: 80% said it made finding their item faster, and nobody picked the wrong one with the lights on",
      "One colour follows you across three surfaces: the floor, the shelf, and your phone",
      "Tested with 10 people in a real room, which is where the design's real ceiling showed up",
    ],
    gradient: ["#dcb4cd", "#c79bb9"],
    icon: Lightbulb,
    cover: "/assets/illumilend/illumilend-hero.png",
    heroImage: "/assets/illumilend/illumilend-hero.gif",
    heroFit: "contain",
    link: "https://www.figma.com/proto/wOZYuPmU3fsbzqpPIKWBUE/reserve?node-id=2013-425&t=B4GfEWrhlV6EvaMJ-0&scaling=min-zoom&content-scaling=fixed&page-id=2031%3A2918&starting-point-node-id=2013%3A425",
    linkLabel: "Figma prototype",
    problem:
      "**The booking works, then you open the storage-room door and you're on your own, hunting for a code like *B-07* on a real shelf.** The system knows exactly where your item is, it just never tells the room.",
    goals: [
      "Let the room guide you, hands-free",
      "Use colour as the language, since you see it before you read anything",
      "Still work for someone with no phone, or a dead battery",
    ],
    process: [
      "**Discover**: watched the real equipment room at Télécom Paris, then looked at how libraries, warehouse picking, smart lockers, and AR navigation each solve the same last-ten-metres problem.",
      "**Sketch**: hand-drawn room layouts with coloured markers standing in for light. Cheap enough to throw away, which is exactly why they were useful.",
      "**Design**: the phone and the wall display in Figma, both speaking the same colour language as the room itself. One colour per person, carried across three surfaces, so you never have to re-find yourself.",
      "**Test**: 10 participants who picked up two items, returned them, then talked. What they said changed the design: red can't mark a place, colour runs out at four to six people, and a pickup needs its own confirmation.",
    ],
    solution:
      "**Badge in. The room picks your colour. Follow it.**\n\n- **Under 2 seconds**: badge to colour assigned\n- **The floor points**: a projected arrow, in your colour\n- **The shelf answers**: LEDs light the exact cubby, so there's nothing to decode\n- **Phone and wall agree**: same colour, same reservation, three surfaces telling one story\n- **Light confirms**: blue turns green when the pickup registers, so you know without checking a screen\n\nColour does the work because you register it before you read a word.",
    results: [
      { label: "Found color paths faster", value: "80%" },
      { label: "Would use it as-is", value: "60%" },
      { label: "Wrong items picked with lights on", value: "0" },
    ],
    limitations:
      "**Testing set the ceiling, and it's colour.**\n\n- **Colour runs out.** Four to six people at once is the limit before the colours stop being tellable apart.\n- **Red can't mean *here*.** It reads as an alert wherever you put it, so it's unusable for marking a place.\n- **Only 60% would use it as-is.** Fast didn't automatically mean trusted. People wanted proof the pickup registered before they'd walk away.",
    futureWork:
      "**Get past colour.**\n\nColour is a beautiful first channel and a hard ceiling: it caps the room at a handful of people and it asks everyone to see hue the same way, which not everyone does. Next is a second channel carrying the same message on its own (position, shape, and rhythm of the light), which lifts the cap and makes the room work for colour-blind users in the same move.",
    gallery: [
      { caption: "Hand-drawn room layouts simulating light patterns", gradient: ["#e8cadd", "#dcb4cd"], icon: PenTool, image: "/assets/illumilend/ill-skc.png", stage: "process" },
      { caption: "Digital wireframes of the initial UI", gradient: ["#dcb4cd", "#c79bb9"], icon: PenTool, image: "/assets/illumilend/wireframe1.png", stage: "process" },
      { caption: "Wireframes of the reservation flow: browse, pick dates, confirm", gradient: ["#dcb4cd", "#c79bb9"], icon: PenTool, image: "/assets/illumilend/wireframe2.png", stage: "process" },
      { caption: "LED lighting on numbered cubby positions", gradient: ["#d2a6c4", "#c79bb9"], icon: Lamp, image: "/assets/illumilend/room-study.png" },
      { caption: "Welcome screen with pickup instructions", gradient: ["#e8cadd", "#dcb4cd"], icon: Users, image: "/assets/illumilend/f1.png", variant: "phone" },
      { caption: "Your reservations: ongoing and past", gradient: ["#dcb4cd", "#c79bb9"], icon: Users, image: "/assets/illumilend/f2.png", variant: "phone" },
      { caption: "Browsing items to reserve", gradient: ["#e8cadd", "#dcb4cd"], icon: Users, image: "/assets/illumilend/f4.png", variant: "phone" },
      { caption: "Picking reservation dates on the calendar", gradient: ["#dcb4cd", "#c79bb9"], icon: Users, image: "/assets/illumilend/f5.png", variant: "phone" },
      { caption: "Filtering the catalogue and confirming dates in one sheet", gradient: ["#e8cadd", "#dcb4cd"], icon: Users, image: "/assets/illumilend/f9.png", variant: "phone" },
      { caption: "Request sent: waiting on approval from the institution", gradient: ["#dcb4cd", "#c79bb9"], icon: Users, image: "/assets/illumilend/f6.png", variant: "phone" },
      { caption: "Yellow means the item is waiting to be picked up", gradient: ["#d2a6c4", "#c79bb9"], icon: Lamp, image: "/assets/illumilend/f7.png", variant: "phone" },
      { caption: "Red means it's time to return the item", gradient: ["#e8cadd", "#dcb4cd"], icon: Lamp, image: "/assets/illumilend/f3.png", variant: "phone" },
      { caption: "Past reservations: reserve the same item again, or remove it", gradient: ["#dcb4cd", "#c79bb9"], icon: Users, image: "/assets/illumilend/f8.png", variant: "phone" },
      { caption: "Wall display mirrors the mobile interface", gradient: ["#d2a6c4", "#c79bb9"], icon: Lamp, image: "/assets/illumilend/big-screen.png" },
    ],
    testimonial: {
      quote: "The color makes it super fast. I didn't even think about it, just followed the blue light.",
      author: "Participant 3",
      role: "Usability testing session",
    },
  },
  {
    id: "goodreads-ux",
    title: "UX Study: Goodreads",
    summary: "A cursor-tracked usability study of the world's biggest book platform.",
    description:
      "One of the world's biggest book platforms, and almost no public research on whether it works. We gave 16 people real tasks, tracked where their cursors went, and asked how it felt. The finding that mattered: the longer someone stayed, the less they liked it.",
    role: "UX Researcher & Data Analyst",
    year: "2025",
    sideProject: true,
    tags: ["UX Research", "Quantitative", "Data Analysis"],
    tools: ["Cursor tracking", "Google Forms", "Python", "Canva"],
    highlights: [
      "Time on site went up as satisfaction went down. The engagement metric was measuring confusion",
      "Cursor tracking plus surveys across 16 people, on three real tasks",
      "Published on Télécom Paris's QuantUX site",
    ],
    gradient: ["#f7d49a", "#f3c079"],
    icon: BookOpen,
    cover: "/assets/goodreads-ux/goodreads.png",
    heroImage: "/assets/goodreads-ux/goodreads-cover.png",
    link: "https://quantux.telecom-paris.fr/2025/03/07/evaluating-the-usability-of-goodreads/",
    linkLabel: "Read the write-up",
    problem:
      "**Goodreads is one of the largest book platforms in the world, yet there's almost no public research on whether it's actually usable.** Finding a recommendation, the thing it exists for, is exactly where we kept getting stuck.",
    goals: [
      "Find where discovery breaks, with data instead of opinion",
      "Compare every route to a book: Similar Books, Genres, Explore, Lists, Community",
      "Measure how it feels, not just how long it takes",
    ],
    process: [
      "**Discover**: mapped the whole Goodreads journey and marked the emotional low points. Discovery, and whatever happens right after you interact, stood out.",
      "**Define**: a three-task protocol (explore freely, find a feature, then find a recommendation through a friend's profile). Real jobs, not clicks.",
      "**Measure**: 16 participants, cursors tracked, plus a survey after. Where a cursor hesitates is where the design does.",
      "**Analyse**: the surprise was that time on site went *up* as satisfaction went *down*. On this site, time isn't engagement, it's confusion wearing engagement's clothes.",
    ],
    solution:
      "**What the data asked for.**\n\n- **Rebuild Community**: participants compared it to Craigslist; it's where time goes to die\n- **Let people filter**: discovery without filters is browsing with your eyes closed\n- **Cut the density**: every page asks for too much attention at once\n- **Lead with Similar Books**: the most engaging thing on the site at 1.9 minutes and 2.2 books consulted, so it should anchor discovery instead of hiding behind it",
    results: [
      { label: "Average usability rating", value: "3.9/5" },
      { label: "Found the site easy to use", value: "31%" },
      { label: "Key insight", value: "Time ≠ engagement" },
    ],
    limitations:
      "**A 16-person study is a signal, not a verdict.**\n\n- Sixteen participants is enough to find the pain points, not to size them across Goodreads' whole audience\n- A cursor tells you where attention probably went, not what someone was thinking when it went there\n- We measured the site as it stood that week; it keeps shipping changes we didn't control for",
    futureWork:
      "**Prototype the fixes, then test them the same way.**\n\nThe study says what hurts, not what cures it. Next is redesigning Community and the filtering flow, then re-running these same three tasks against the prototype with the same protocol and the same measures, so the before and after are actually comparable.",
    gallery: [
      { caption: "User journey map: emotional highs and lows", gradient: ["#fbe4bb", "#f7d49a"], icon: Search, image: "/assets/goodreads-ux/user-journey.png", fit: "contain", stage: "process" },
      { caption: "Heatmap: users gravitate to Browse and My Books", gradient: ["#f7d49a", "#f3c079"], icon: MousePointer2, image: "/assets/goodreads-ux/heatmap.png", stage: "findings" },
      { caption: "Correlation matrix: more time, lower satisfaction", gradient: ["#f5c88a", "#f3c079"], icon: BarChart3, image: "/assets/goodreads-ux/matrix.png", fit: "contain", stage: "findings" },
      { caption: "Interaction frequency across site sections", gradient: ["#fbe4bb", "#f7d49a"], icon: BarChart3, image: "/assets/goodreads-ux/freq-barchart.png", fit: "contain", stage: "findings" },
      { caption: "Average time per feature: Community lags", gradient: ["#f7d49a", "#f3c079"], icon: BarChart3, image: "/assets/goodreads-ux/avg-time.png", fit: "contain", stage: "findings" },
      { caption: "Helpfulness ratings: Similar Books wins", gradient: ["#f5c88a", "#f3c079"], icon: BarChart3, image: "/assets/goodreads-ux/helpfullness.png", fit: "contain", stage: "findings" },
      { caption: "Interactions by page type: Book Page and User Profile absorb most of them", gradient: ["#fbe4bb", "#f7d49a"], icon: BarChart3, image: "/assets/goodreads-ux/interactions-by-page.png", fit: "contain", stage: "findings" },
      { caption: "Total time by page type: 14.1 minutes on Book Page alone", gradient: ["#f5c88a", "#f3c079"], icon: BarChart3, image: "/assets/goodreads-ux/time-by-page.png", fit: "contain", stage: "findings" },
      { caption: "The Browse menu: seven destinations to cross before a genre", gradient: ["#f7d49a", "#f3c079"], icon: MonitorPlay, image: "/assets/goodreads-ux/goodreads-problem-poster.png", video: "/assets/goodreads-ux/goodreads-problem.mp4", fit: "contain", stage: "findings" },
    ],
    testimonial: {
      quote: "This feels like it wasn't touched since 2009.",
      author: "Study participant",
      role: "On the Goodreads Community section",
    },
  },
  {
    id: "coffee-vis",
    title: "Coffee Across the Globe",
    summary: "11 interactive D3 visuals on global coffee trade, production, and consumption.",
    description:
      "Everything about coffee is global, and everything about coffee data is siloed. Five datasets, 94 countries, and 60+ years, pulled into one place you can actually explore. Trade as a network you drag, production on a map with a year slider, consumption and quality side by side.",
    role: "Data Visualization Designer",
    year: "2025",
    sideProject: true,
    tags: ["Data Viz", "Interactive", "Storytelling"],
    tools: ["D3.js"],
    highlights: [
      "Every visual matched to the shape of its data. A trade network is a graph you can pull apart, not a bar chart",
      "Five datasets, 94 countries, 60+ years, one explorable story",
      "Surfaced what the tables hid: Nordic countries top per-capita consumption while growing no coffee at all",
    ],
    gradient: ["#f8c3a0", "#f3a988"],
    icon: Coffee,
    cover: "/assets/coffee-vis/coffee-hero.png",
    heroImage: "/assets/coffee-vis/coffee-main.png",
    link: "https://data-vis-project.netlify.app/",
    linkLabel: "Live site",
    embed: true,
    problem:
      "**The story of coffee is a network, and networks don't fit in a bar chart.** Its data is scattered across five incompatible sources, and static charts flatten the two things that matter most, who trades with whom and how that shifted over sixty years.",
    goals: [
      "One place for the whole story: production, trade, consumption, quality",
      "Match every visual to the shape of its data, not to what looks impressive",
      "Make it explorable rather than just readable",
    ],
    process: [
      "**Gather**: five datasets into one. Consumption and spending, production and trade across 94 countries, trends from 2000 to 2023, product reviews, and country-to-country trade flows.",
      "**Match**: each question got the form that actually fits it. Trade is a web of relationships, so it's a network you can pull apart with your cursor. Production is geographic, so it's a map. Quality is three things at once (price, rating, volume), so it's a bubble chart.",
      "**Design**: a palette taken from the product itself, roasted browns through to raw sienna. One rule holds the sections together: every view answers a hover and a filter, so no chart is a dead end.",
      "**Explore**: the visuals earned their keep by surfacing what the tables hid. Brazil's ~35% share and how frost swings it, Nordic countries topping per-capita consumption while growing none at all, and trade that clusters hard by region.",
    ],
    solution:
      "**Four sections, one rule: every chart answers back.**\n\n- **Trade**: a network you drag, colour-coded by importer and exporter, with a map toggle when you want geography instead of structure\n- **Production**: a year slider that runs sixty years of history under your thumb\n- **Consumption**: preference and spending, compared over time\n- **Quality**: price, rating, and review volume in a single view\n\nExploring beats reading: the patterns worth finding here are the ones you didn't know to ask for.",
    results: [
      { label: "Countries analyzed", value: "94" },
      { label: "Years of data", value: "60+" },
      { label: "Interactive visuals", value: "11" },
    ],
    limitations:
      "**The data sets the ceiling.**\n\n- It ends in 2023, so this is history, not a live picture of the trade\n- Five sources means five different collection methods; country coverage is uneven and the seams show where they meet\n- Reviews skew to the people who write reviews, so the quality view reads specialty coffee better than it reads the everyday cup",
    futureWork:
      "**Make it a story, not just a tool.**\n\nEleven visuals ask a lot of a first-time visitor. They explore best if they already know what they're looking for. The next version leads: a guided path through the three or four findings that matter, with free exploration waiting at the end for anyone who wants it.",
    gallery: [
      { caption: "Force-directed global trade network", gradient: ["#fbd7bc", "#f8c3a0"], icon: Network, image: "/assets/coffee-vis/trade.png" },
      { caption: "Production dashboard with year slider", gradient: ["#f8c3a0", "#f3a988"], icon: Globe2, image: "/assets/coffee-vis/coffee-prod.png" },
      { caption: "Consumption patterns over time", gradient: ["#f6b596", "#f3a988"], icon: BarChart3, image: "/assets/coffee-vis/coffee-cons.png" },
      { caption: "Quality metrics: price, rating, reviews", gradient: ["#fbd7bc", "#f8c3a0"], icon: BarChart3, image: "/assets/coffee-vis/coffee-qual.png" },
    ],
  },
  {
    id: "mister-garden",
    title: "Mister Garden: Salad Builder",
    summary: "Build your salad, watch nutrition facts and price update live.",
    description:
      "You find out what your salad costs when it's already on your tray. This is an unofficial, fan-made builder for the Mister Garden menu, pick a base, stack what you want, and watch the calories and the price move as you go. In French or English.",
    role: "Product Designer",
    year: "2026",
    sideProject: true,
    tags: ["Web App", "Nutrition", "Bilingual"],
    tools: ["Claude Code", "React"],
    highlights: [
      "The number never leaves the screen. Calories, macros, and price move with every ingredient you add",
      "The flow mirrors the real counter: base, ingredients, bonus, sauce, bread",
      "Fully bilingual, because the people ordering switch language mid-sentence",
    ],
    gradient: ["#cdd9a5", "#b3c383"],
    icon: Salad,
    cover: "/assets/mister-garden/builder.png",
    heroImage: "/assets/mister-garden/builder.png",
    link: "https://nasrinette.github.io/mister-garden-builder/",
    linkLabel: "Live site",
    embed: true,
    problem:
      "**You find out what your salad costs, and what's actually in it, only once it's already on your tray.** No menu adds up *your* combination in calories or in price, so everything you need to decide arrives after you've already decided.",
    goals: [
      "Plan your exact salad before you're standing in the queue",
      "Honest per-ingredient nutrition that adds up as you go",
      "Fast, and in the language you're actually ordering in",
    ],
    process: [
      "**Discover**: the menu is a list of parts with no way to add them up. The gap isn't information, it's arithmetic nobody wants to do standing in a queue.",
      "**Design**: the builder walks the real counter's order (base, ingredients, bonus, sauce, bread). A fresh green palette pulled off the food itself, and a totals panel that never leaves the screen, because the number is the whole reason you're here.",
      "**Localize**: French and English throughout, since the people ordering switch between them mid-sentence.",
      "**Refine**: every choice moves the total instantly. A number that lags is a number you stop trusting.",
    ],
    solution:
      "**One page, the same order as the real counter.**\n\n- **Base** → **ingredients** → **bonus toppings** → **sauce** → **bread**\n- A panel tracks calories, macros, and estimated price the whole way down\n- Add or remove anything and the total moves with you\n- Switch the whole interface between French and English\n\nDecide before you're at the counter, not after.",
    results: [
      { label: "Menu items to compose from", value: "80+" },
      { label: "Languages", value: "FR · EN" },
      { label: "Nutrition & price feedback", value: "Live" },
    ],
    limitations:
      "**Fan-made, and the numbers admit it.**\n\n- Unofficial: the menu is compiled by hand, so it drifts the moment the real one changes\n- The price is an estimate, not a quote\n- Nutrition is per-ingredient arithmetic, close enough to choose with, not close enough to weigh against a kitchen scale",
    futureWork:
      "**Save what you build.**\n\nRight now every visit starts from an empty bowl, but people order the same salad over and over. Saved combinations, and a way to hand one to the person behind the counter, is the obvious next step.",
    gallery: [
      { caption: "Compose: base, ingredients, bonus, sauce, and bread", gradient: ["#dee6bf", "#cdd9a5"], icon: Salad, image: "/assets/mister-garden/builder.png" },
      { caption: "Nutrition facts and price update with every ingredient", gradient: ["#cdd9a5", "#b3c383"], icon: BarChart3 },
      { caption: "Switch the whole interface between French and English", gradient: ["#c3cf94", "#b3c383"], icon: Globe2 },
    ],
  },
];
