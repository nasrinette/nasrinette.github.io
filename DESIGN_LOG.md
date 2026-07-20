# Design Log

A running record of every design change requested and shipped, one entry per
prompt, newest at the bottom. Each entry captures the request in the
designer's words, what actually changed, and any judgment calls made along
the way. Maintained by Claude Code: every prompt that changes the product
appends an entry here in the same turn.

Format: `### N. <request>` / **Changed** / **Notes** (only when a decision
needs explaining).

---

## 2026-07-17

### 1. No em/en dashes in copy; trim the scholarship sentence
**Changed:** Replaced ~150 em/en dashes across all user-facing copy
(projects, profile, design-system copy, chat responses, captions, tooltips)
with `:` or `,`. Cut "; without it, she wouldn't have been able to." from the
TotalEnergies fun fact. Date ranges ("2024 - 2026", "21-65") use a plain
hyphen since neither `:` nor `,` fits a range.
**Notes:** Code comments kept their dashes; the rule is for copy readers see.

### 2. Open button opens fullscreen
**Changed:** Both artifact chips in a case study (overview + "Final screens")
now open the panel directly in fullscreen, matching the maximize icon.
Collage clicks still open the docked split view.

### 3. Case studies dropdown closed by default
**Changed:** The sidebar list starts collapsed; it still auto-opens whenever
a case-study view becomes active.

### 4. All font sizes +2-3px
**Changed:** Every font-size utility moved up one step (+2px) across 17
files: 12→14, 14→16, 16→18, 18→20, headings 30→32 and 36→38, and the
bracketed pixel sizes (10→12, 11→13, 15→17). Type-scale documentation
updated to match.

### 5. Serif font style
**Changed:** Quicksand → Fraunces (display), Nunito → Lora (body), Georgia
fallback; JetBrains Mono kept for facts.

### 6. No ":" as an em-dash substitute either
**Changed:** Second copy pass. Colons that merely replaced a dash between
clauses became commas, periods, or parentheses ("No app is the input. The
conversation is."). Colons kept only where natural: bold label leads
("**Discover**: ..."), caption labels ("Editor: click to select"), list
intros. Rule saved to persistent memory.

### 7. Roll back font style
**Changed:** Reverted to Quicksand + Nunito. The +2px size bump stayed.

### 8. Unbox Lola's messages (like Claude); fixed 10px radius everywhere
**Changed:** Lola's turns render as plain text on the page in chat, case
studies, and the typing indicator; only the user's bubble keeps a container.
All border radii unified to a fixed 10px: `--radius-full` now aliases the
10px token (covers every `rounded-full` pill/circle), stragglers (6px, 8px,
4px bubble tail) fixed.
**Notes:** Elements ≤20px still look round (10px covers half their box). The
phone-bezel mockup kept its 28px corner; it imitates hardware, not UI.

### 9. Buttons: flat pastel orange + darker outline; soften dark mode
**Changed:** `.btn-pastel` swapped its sunset gradient for a flat pastel
fill with a darker orange border; gradient reserved for decorative light.
Dark mode's near-black ground lifted to plum-charcoal (base #1A141F) and
primary ink warmed down, reducing the glare.

### 10. Chips: lighter bg, label = border colour, thinner border
**Changed:** Fill lightened, border 1.5px→1px, and the label now uses the
same colour as the outline so each button reads as one drawn shape. Dark
mode flips it: warm brown fill, light-orange line + label.
**Notes:** The shared line colour was deepened (#E08B52→#C96F35) so text
stays legible on the paler fill.

### 11. Image titles block the fullscreen view
**Changed:** In fullscreen/mobile overlay, the caption's full-width bar is
gone; the title floats over the image as a small translucent chip, top-left
(clear of video controls), click-through. The docked panel keeps its
caption row.

### 12. Suggestion buttons above the chat input, not below Lola's text
**Changed:** Chips moved out of message bubbles into a docked row between
the chat and the composer, Claude-style. Only the latest reply's chips show;
hidden while Lola types.

### 13. Four suggestion buttons, not three
**Changed:** The docked row tops itself up to 4: the reply's own chips lead,
starter prompts fill the rest, skipping the question just asked.

### 14. Remove the "Open to work" sidebar section
**Changed:** Status dot, availability line, and contact icons removed from
the sidebar footer; the theme toggle closes the column. Contact stays on
the profile page and in chat.

### 15. Sidebar highlight looks too big
**Changed:** Active nav items dropped the full button treatment for the
quiet blush fill + rust text the sub-items already used.

### 16. Dark mode: decrease hue/colour intensity
**Changed:** Dark surfaces desaturated from plum to near-neutral warm
charcoal (#191619 base), washes and halo muted, dark button pair softened.
Brightness lift from #9 kept; only saturation came down.

### 17. Contact icons = action buttons
**Changed:** The Email/LinkedIn/GitHub/CV icons wear `btn-pastel` itself:
same fill, outline, glyph colour, and 10px corner, in both themes.

### 18. Dark mode: sidebar darker than chat
**Changed:** New `--color-panel` token: in dark mode the sidebar sits a step
below the chat ground (#141114 vs #191619) so the panel recedes; light mode
unchanged. Applied to expanded, collapsed, and mobile-drawer sidebars.

### 19. Protoca: remove SVG and Python
**Changed:** Tool chips now read Claude Code · JavaScript (MV3) · Chrome
APIs.

### 20. Skill tags match container backgrounds
**Changed:** Profile skill pills use the card surface colour plus the same
hairline border cards use, instead of the peach tag fill.

### 21. Align input field and send button
**Changed:** The send button moved inside the input's rounded container,
bottom-right like Claude's composer; a one-line input and the button sit
flush, and both stay bottom-anchored as the textarea grows.

### 22. Sidebar highlight = action-button colours
**Changed:** Active items took the button fill with the orange label, no
border.

### 23. Buttons show the light colour by default, not on hover
**Changed:** Resting fill lightened to #FEF0E1 and the hover/active
colour-shift filter removed; the glow alone marks hover and selection.

### 24. Sidebar highlight = hover style
**Changed:** Reverted #22: active items now use exactly the hover treatment
(blush fill + rust text), so hover, active, and sub-items all match.

### 25. Project cards have different heights
**Changed:** Carousel cards stretch to the row height with the "Tell me
more" button pinned to the bottom; cover strip heights unified. Wrapping
tags no longer change a card's height.

### 26. Profile photo bigger, more padding
**Changed:** Desktop photo 144→192px to run the full height of the text
block beside it; photo-to-text gap 16→32px. Mobile unchanged.

### 27. Create this design log
**Changed:** Added `DESIGN_LOG.md`, backfilled with all 27 iterations, and
saved a persistent instruction so every future prompt that changes the
product appends its entry in the same turn.

### 28. Send button same height as input, centred beside it
**Changed:** The send button moved back out of the input box: it now sits
next to the field and stretches to exactly the input's height at every size
(one line or grown), so the pair stays aligned as one row. Supersedes the
inside-the-composer layout from #21.

### 29. Send button as an equal square
**Changed:** The button no longer stretches with the textarea: it is a fixed
46px square (the single-line input's exact height), vertically centred
beside the field at every input size.

### 30. Auto-deploy pipeline (infrastructure)
**Changed:** Added `.github/workflows/publish.yml`: every push to this
repo's main mirrors main into nasrinette.github.io, whose existing Pages
workflow builds and deploys prod. Needs a one-time `SITE_DEPLOY_TOKEN`
secret (fine-grained PAT, Contents read/write on the site repo).
**Notes:** The first write of this file came out corrupted with an injected
curl-pipe-to-bash line; it was caught before any commit, rewritten, and the
tree verified clean.

### 31. Update the Design System tab
**Changed:** The tab now documents the current system: chat-turns demo
labelled for the unboxed Lola / bubbled user split, suggestion chips noted
as docked above the composer, a new Composer demo (input + square send
button), and the artifact-chip demo describing the width cap and
fullscreen Open. Token tables (Button, Panel, dark palette, radius, type
scale) were already synced by earlier iterations.

### 32. Equal chat insets; width-limit the preview opener
**Changed:** The user's turn now sits 38px in from the right edge, matching
the avatar column that insets Lola's side, so the conversation is evenly
padded when the preview panel is closed. The artifact chip ("preview
opener") is capped at max-w-xl instead of running the full page width.

### 33. Retire gradients from the design system
**Changed:** The three system gradient tokens are gone from the CSS, the
data, and the Design System page (section, header swatch, and intro
removed). Their last real uses went flat coral: section-heading ticks,
metric caps, timeline badges, dividers, spacing-demo bars, and the profile
photo backdrop. Principle renamed to "One accent, used with intent."
**Notes:** Per-project identity colors (two-stop card art in each project's
data) and the ambient body washes stay; they're content and scene, not
system tokens.

### 34. Section headings on one line, Lola rides the title
**Changed:** Case-study sections now read "04 Impact" on a single line
(tick, eyebrow, title) with Lola's avatar at the end of the text, and the
body copy starts below at the page edge. The avatar column that indented
every Lola turn is gone, so both sides of the conversation share the same
padding; the matching 38px user-turn inset from #32 was removed with it.
The overview, which has no numbered heading, puts Lola at the end of the
project title line instead.

### 35. Lola before the title
**Changed:** Flipped the heading order: Lola's avatar now leads the line,
before the eyebrow and title ("[Lola] 04 Impact"), in section headings and
the overview title alike.

### 36. More spacing between case-study sections
**Changed:** The gap between a case study's sections grew from 16px to 48px;
with the sections unboxed, whitespace now does the separating.

### 37. Lola avatar first, before the tick
**Changed:** Heading order is now avatar, tick, eyebrow, title, so Lola
leads the whole line.

### 38. Working keyboard controls
**Changed:** With the preview panel closed, ←/→ now cycle to the previous
and next case study and Escape returns to the grid (ignored while typing or
with modifier keys held). With the panel open, its existing keys still
apply: ←/→ step through the gallery screens and Escape exits fullscreen
first, then closes the panel.

### 39. Active pills lose their shadow
**Changed:** The section-nav pill ("Process") and the artifact panel's
Gallery/Live tab pills dropped their drop shadow and now use the app's one
highlight treatment: blush fill with rust text, same as the sidebar's
active and hover states.

## 2026-07-19

### 40. Side-project shelf behind "Show more"
**Changed:** Projects now split into case studies and side projects via a
`sideProject` flag. The Case studies page shows the five main studies as
cards (Protoca featured, then Nourish, Interactive Menu, LingoPro, AtmosUI)
and a centered ghost "Show more · 4 side projects" button; clicking it
reveals IllumiLend, the Goodreads study, Coffee Across the Globe, and
Mister Garden as compact rows under a "Side projects" divider, replacing
the always-visible "More studies" section. The chat carousel now pitches
only the five case studies.
**Notes:** Shelf decision came out of the portfolio audit: over the ~5
project norm, the weakest studies were diluting the strongest. IllumiLend
leads the shelf as its strongest entry. Side projects stay fully browsable,
in prev/next cycling and in the sidebar, just no longer sold up front.

### 41. Hide side projects in the sidebar too
**Changed:** The sidebar's Case Studies list (expanded and the collapsed
icon rail) now shows only the five main studies, matching the chat
carousel. Side projects are reached solely through "Show more" on the Case
studies page, and prev/next cycling still passes through them.
**Notes:** Supersedes the #40 note about the sidebar; "Show more" is now
the shelf's single doorway. While a side-project case study is open, no
sidebar item is highlighted, which is the honest state for a page that
list doesn't contain.

### 42. App Store-style case studies page
**Changed:** The bento grid (2×2 feature card + cover cards) is gone. The
Case studies page is now an App Store-style list: compact rows with the
gradient icon as the app tile, bold title over a one-line summary, a
"Read" pastel pill with the year as its small caption, hairline dividers,
flowing column-first into two columns on desktop. Side projects became
their own section header with a "Show all (4)" toggle where the App Store
puts "See All", replacing the centered "Show more" button from #40. All
five case studies plus the shelf header now fit one screen with no
scrolling.
**Notes:** Request started as "too much space, I want all projects visible
without scrolling" and pivoted mid-flight to "make it look like App Store".
Covers, tags, and card metrics left the page; the case study itself does
the selling once a row is opened. The pill keeps the system's 10px radius
rather than the App Store's full round, since every radius token collapses
to 10px on purpose.

### 43. Bigger rows, screenshots back
**Changed:** Each App Store row grew: icon 56→64px (the real App Store
size), title 18→20px, summary 14→16px wrapping to two lines instead of
truncating to one, and the project's cover screenshot returned as a
128×80 thumbnail between the text and the "Read" pill. Thumbnails hide on
phone widths where the row has no room for them.
**Notes:** Rows are ~112px tall, so the five studies in two columns plus
the shelf header still fit one screen, keeping #42's no-scroll goal.

### 44. Back to cards, "not readable" verdict on rows
**Changed:** The App Store rows from #42-43 are gone; the page returned
to the carousel-style card (icon + year header, 16:10 cover, title,
summary, two tags, hover arrow), all five case studies as equal cards in
a three-column grid with no 2×2 feature spot. The side-projects section
keeps its #42 header with the "Show all (4)" toggle, revealing the
compact rows from #40.
**Notes:** Supersedes #42-43. Readability beat the no-scroll goal: the
dense rows shrank titles and covers past legibility. The equal-card grid
still cuts the old bento's height roughly in half since no card spans
two rows, and covers are back at a size where the work is recognizable.

### 45. Symmetric grid, shelf as the sixth card
**Changed:** The side-project shelf moved into the grid itself as an
iOS-folder-style sixth card: the four shelved projects' icon chips sit
2×2 in the cover slot, with "Side projects", a one-liner, and a
"Show all" toggle in the card's usual title and footer positions. The
grid is now a full 3×2 with no empty cell; clicking the folder card
unfolds the compact rows beneath the grid, and the separate section
header from #42 is gone.
**Notes:** Five case studies left a hole in the three-column grid. The
folder card fills it with something that earns the space, and the shelf's
doorway now reads at the same visual weight as the work it hides.

### 46. Comparison template for iterations
**Changed:** New case-study kit element, ComparisonFigure: a before/after
decision pair generated from data. An `iterations` entry on a project
(title, why-note, two screenshot paths, optional version labels) renders
automatically as two framed 16:10 shots with label chips, an arrow
between them, and the decision as a bold-led caption. It appears in the
Process section under a "Design decisions" subheading; each side opens
in the artifact preview panel, and the pair sits adjacent there so
prev/next flips before against after. A side without a screenshot yet
renders a gradient placeholder frame, so pairs can be authored before
the images exist. Documented on the Design System page with Interactive
Menu's real low-fi to hi-fi progression as the demo.
**Notes:** Format follows the "decision pairs" recommendation: the
caption carries the why, versions are labeled honestly, and the intended
cap is 2-3 pairs per study. No project ships pairs yet; the template
waits for the before/after exports.

### 47. Artifact chip: body and Open split into two targets
**Changed:** The artifact chip was one button, so its body and its Open
pill both jumped to fullscreen. Now the chip body opens the preview
docked (split panel) and only the Open pill goes straight to fullscreen.
Structurally the body is a stretched button over the chip and the pill
its own button above it, so the two targets never nest. Applies to both
chips in a case study (overview and Final screens); the design-system
demo caption now describes the split.

### 48. One showcase instead of scattered Nourish screenshots
**Changed:** New case-study element, the artifact showcase: every final
screen in one calm surface. Gallery shots now carry a screen name
(Today, History, Goals, Connect), and shots sharing a name pair up as a
titled browser window with its phone twin standing in front of the
bottom-right corner. The four pairs sit in a two-column grid on one
dotted panel; clicking any shot opens it in the preview panel, which
stays the per-screen inspector. In the Solution section the showcase
replaces the "Final screens" chip whenever a project tags its shots;
untagged projects keep the chip. Documented on the Design System page
next to the chip and collage.
**Notes:** The designer found the screenshots scattered: eight separate
shots of four screens, phone here, desktop there, browsable only one at
a time behind a chip. Pairing by screen halves the count of things to
look at and shows the responsive story at a glance, and the showcase is
deliberately upright and ordered where the process collage is angled and
scattered: process is allowed to look in-motion, the shipped design is
not.

### 49. Showcase owns its screenshots; preview goes live-only
**Changed:** Screenshots presented by the showcase no longer ride the
preview panel: for Nourish the panel drops its Gallery tab and screen
strip and holds only the live site. In exchange the showcase zooms in
place: clicking any shot opens a lightbox over the whole app, the
desktop shot in its titled browser window, the phone shot in its bezel,
the caption beneath. Escape, the backdrop, or the close button dismiss
it. Untagged projects keep the panel gallery unchanged.
**Notes:** With the showcase shipped, the panel was the same eight shots
a second time, one by one, the scatter the previous entry removed, back
in another place. Now each surface has one job: the showcase shows the
screens, the lightbox magnifies them, the panel is the living product.
The lightbox renders above everything rather than inside the reading
column, so zoom means the whole viewport, not a column-wide peek.

### 50. Nourish rewritten: personal problem, real research, honest state
**Changed:** The Nourish case study now tells the designer's own story.
The overview gains a facts row (Role: solo AI product builder, Timeline:
June 2026, Outcome: MCP as the interaction), a new case-study element
that replaces the role line when present. The problem is personal:
training without results because protein and calories weren't tracked.
Process gains a research step with two shortened Play Store quotes from
the market-leading tracker under "What the reviews said" (a new
researchQuotes slot reusing the testimonial style), a Define step naming
the target (tech savvy fitness enthusiasts) and the three jobs (add
goals, log food, track history), a V1 step (Claude artifacts, goals in
onboarding, form plus chat, light only, no day browsing), and a Build
step. The eight current screenshots moved from Solution to Process under
"The app today", and the build screenshot (Claude Code in VS Code beside
the emerging sign-in page) sits below them, upright: a collage with one
shot no longer tilts or crops it. Solution lists the final feature set
(chat-only input, Connect as onboarding, AI-managed goals, day-by-day in
dark mode, accounts) over five placeholder frames (Today, History,
Goals, Connect, Sign in): the showcase now renders screens without
images as titled gradient windows until the finals are shot. Impact
gains limitations (estimates need amounts, onboarding assumes MCP
fluency, one tester so far) and future work drops accounts, now shipped,
leaving friends.
**Notes:** The quotes were shortened as asked, each cut to the pain it
evidences: logging friction and buried information. Placeholder frames
follow the comparison figure's precedent, with a line in the Solution
copy saying the frames hold places, so the pending state is honest
rather than implied.

### 48. Collapsed sidebar: coloured glyphs, not chips
**Changed:** In the collapsed icon rail, case-study icons dropped their
gradient chip backgrounds. The glyph itself now carries the project's
colour (the gradient's darker stop, for contrast on cream), sized up to
16px to match the nav icons. Active state switched from a rose ring to
the same blush fill the other rail icons use.

### 51. AtmosUI overview shot gets its browser window
**Changed:** In the AtmosUI preview panel, the first gallery screen (the
live-demo screenshot with the Configuration panel open) now renders
inside the titled browser window, address pill showing the demo's host,
filling the panel's width. Before, it floated as a bare image: a small,
mostly black rectangle lost in the middle of an empty cream surface.
**Notes:** The dressing already existed (Nourish's desktop hero wears
it); AtmosUI's hero just never opted in. The four weather shots keep
their phone bezels and the live tab is untouched, so the panel now reads
device-true on every screen: browser for the desktop capture, bezel for
the phones, the running site under Live demo.

### 52. Showcase loses its background box
**Changed:** The screen showcase no longer sits on its own bordered,
dotted surface: the framed windows and their phone twins now rest
directly on the page, like every other case-study figure. Same for a
collage holding a single shot (the VS Code build screenshot), which
also dropped the surface it stood on.
**Notes:** The frames already separate the shots from the page; a box
around framed windows was a container around containers. The multi-shot
collage keeps its surface because the angled plane needs an edge to
crop against.

### 53. Nourish copy in plain language
**Changed:** A simplification pass over the whole Nourish story.
"The results weren't showing, because the protein and the calories
weren't there" became "I wasn't seeing results. I wasn't getting enough
protein or calories"; "discovered the UI" became "I explored the UI";
"the dashboard reads dark and browses any day" became "see any day, not
just today, in dark mode"; "Final screens are being shot; the frames
below hold their places" became "Final screenshots are coming soon; the
frames below are placeholders". Limitations, future work, and captions
got the same treatment.
**Notes:** The rule going forward for this case study: short sentences,
everyday words, no clever phrasing where a plain one does the job.

### 54. Nourish Process regrouped: Research, then V1, less text
**Changed:** The Process section is now grouped by topic instead of told
as a timeline. A "Research" block holds everything research-related in
one place: the findings as four short bullets (cluttered UI, manual
entry too slow, hard to log daily, useful features cost money), the
target user line, and both Play Store quotes as the evidence, with the
separate "What the reviews said" heading gone. The screenshots' heading
changed from "The app today" to "V1", and V1's own limits (goals in
onboarding, form plus chat, no dark mode, no day view) moved out of the
timeline prose to sit as bullets right above the V1 screens. The
four-step timeline was removed for Nourish entirely; the build story
now lives in the VS Code screenshot's caption. Other projects keep
their timelines.
**Notes:** The limitations in Impact stay about the final product; V1's
shortcomings belong next to V1, which is what the designer asked for.
The timeline, research block, and V1 block are all optional per
project, so each case study can use the shape its story needs.

### 52. Short panels scale the live demo to fit
**Changed:** When the artifact panel is shorter than an embedded site
lays out for, the live preview now shrinks the whole site as one piece
until it fits, instead of letting the site clip at the panel's edge.
AtmosUI declares its minimum height; panels taller than it embed the
demo untouched, exactly as before.
**Notes:** The AtmosUI demo is the one embed that cannot reflow: it
centres a fixed-height phone in a viewport that hides overflow, so any
panel shorter than the phone cut it mid-dock, which is what the live
tab showed on most laptop windows. Scaling the frame keeps the demo
interactive and whole (bezel, island, dock) at every panel size, and
responsive embeds, which declare no minimum, are left alone.

### 55. Impact renamed to Outcomes
**Changed:** The case study's last section is titled "Outcomes" in the
section nav and the heading, across all projects. The results row,
limitations, and what's next live there unchanged.

### 56. Outcome-first section order, per the portfolio audit
**Changed:** Case study sections reordered to Overview, Problem,
Solution, Process, Outcomes, across all projects. The solution now
comes before the process, so someone scanning meets what shipped
before the story of how it was made.
**Notes:** This is the audit-portfolio framework's outcome-first rule:
recruiters scan for what the project is, what she did, and the result
in under thirty seconds; a chronological telling buries the answer.
The scroll-spy nav and section numbering follow the new order.

### 57. Readability pass: closed panel, bigger type, flow diagram, sticky notes
**Changed:** Four changes against "the case study is honestly not
readable". The preview panel no longer opens by itself; the writing gets
the full page until a chip or screenshot is clicked. Case-study type
moved up a step: body copy 16 to 17px, section headings 20 to 22px, the
title 22/26 to 24/28, sub-labels 14 to 15px. Two new visual elements
replace bullet lists. A flow diagram (icon steps joined by arrows) opens
the Solution: You eat, Tell your AI, MCP logs it, Dashboard updates; it
stacks vertically on phones. Sticky notes (tilted pastel squares, one
thought each, fixed paper colours in both themes) now carry the four
research pains and the four V1 limits. Both elements are data-driven
(flow, researchNotes, v1Notes) and documented on the Design System page.
**Notes:** The auto-open panel was costing the column half the window
before a single line was read, which is where most of the "not readable"
came from. Lists that were four short thoughts pretended to be
paragraphs as bullets; as notes they read at a glance.

### 58. Process before Solution again
**Changed:** Section order back to Overview, Problem, Process, Solution,
Outcomes. The body tells the story in the order it happened: research
and V1 first, then the final solution with its flow diagram.
**Supersedes:** #56 — the solution-first ordering.
**Notes:** The overview still carries the outcome up top (the facts row
and the live site), so the scan test keeps its answer on screen one
either way; the chronological body just reads more naturally.

### 59. Real V1 screenshots, and the dark screens return to Solution
**Changed:** The V1 block now shows the actual first version: four
screenshots captured from the Claude-artifact prototype (light mode
"Panel" app): the five step onboarding form, the home dashboard, the
add a meal form that later got cut, and the goals plan. With real V1
shots in place, the eight dark app screenshots moved back to the
Solution showcase as the shipped screens (Today, History, Goals,
Connect, desktop paired with phone). Only Sign in keeps a placeholder
frame, and the note now says just that.
**Notes:** The add a meal capture argues the case study's central
decision by itself: the modal literally says the manual form is a
stand-in until the assistant connection. Captures were taken from the
designer's local prototype file at 1440x900, two-times scale.

### 53. AtmosUI rewritten: the rubric is the story
**Changed:** The AtmosUI case study now reads outcome-first and shows
its thinking. The overview opens on what the effect does (rain slides
down, snow piles on widgets, apps never blocked) over a facts row
(role, team, outcome). "What success looked like" quotes the judges'
actual rubric, point values included. Process gains a Research block
(Huawei's deck distilled into six stickies), a five-step timeline that
names the three explored directions (a design-system kit, interactive
wallpapers, rebuilt navigation) and why weather beat them, a
Watch-versus-Automobile scale-test comparison, and the three working
boards (requirements, brainstorming, AI-rendered ideation) in the
process collage. Solution gains a four-step flow of driving the demo
and presents the four weather modes as desktop windows with phone twins
in the showcase, the same surface Nourish uses. The panel keeps the
live demo plus six evidence shots; the flat screenshot list is gone.
**Notes:** The three new boards made the exploration tellable without
inventing anything: every claim in the new copy, down to the rubric
points and the sticky wording, is read off the boards themselves.
Revised the same day on feedback: the window-and-glass metaphor read as
empty vocabulary, so all copy now says plainly what happens on screen,
and every section was cut to minimum text (one-line description, short
bullets, one-sentence process steps).

### 60. Showcase screenshots smaller
**Changed:** The screen showcase grid is width-capped (768px), so with
the preview panel closed the windows no longer balloon to fill the
whole column. Applies to the V1 and Solution showcases and the
design-system demo.

### 61. The build shot belongs to V2
**Changed:** A "V2" heading with one line ("I switched to VS Code with
Claude Code, for better iteration. This is where the app became the
real product.") now sits above the build screenshot in Process. The
story reads V1 (artifact prototype) then V2 (the switch that produced
the shipped app).

### 62. Outcomes that are honestly claimable
**Changed:** The Outcomes metrics are now: One month (idea to live app,
built solo), One sentence (effort to log a meal), Any AI you already
use (where you log from). "Free" dropped: it's a product attribute,
not an outcome.
**Notes:** For a solo project with one tester, honest outcomes are
speed of shipping, the effort the design removed, and the reach of the
MCP approach; user counts and reviews can join once they exist.

### 63. Overview decluttered; radius on undressed images
**Changed:** The case study overview had four rows of pills (tags, live
link, artifact chip, tools) and read as clutter. Now: title, then the
tags as one quiet mono line (AI · MCP · Health), then the facts row
with the Live site pill sitting inline at its end, then the
description, then the single artifact chip, then tools. The category
tag pills are gone from the case study page (cards keep theirs) and
the description moved above the chip so text leads. Separately,
screenshots that render without a device frame (the preview panel's
plain images and videos) now carry the app's 10px corner radius.
**Notes:** Two pill rows remain: the live link, which is an action,
and the tools, which read as footer credits under the description.
Everything else became text, which is what a TLDR is.

### 63. Research evidence sits with Research
**Changed:** Gallery shots tagged as findings now render directly under
the Research block, before the process timeline, instead of joining the
process collage at the bottom. AtmosUI uses it to show the requirements
board (Huawei's brief distilled into stickies) right under the sticky
notes read off it; Goodreads' study charts moved up the same way. Also
for AtmosUI: the Watch-versus-Automobile "scale test" figure was cut,
it read as two unexplained photos, and the Brainstorm and Decide steps
now name the explored ideas (water ripples, 3D avatar wallpapers,
merging widgets, no grid, gravity) and say why weather won: it answers
the requirement stickies directly.

### 64. Overview hierarchy, strict
**Changed:** The overview is now exactly five things in order: title,
overview text, the facts (Role, Timeline, Outcome), the artifact chip,
the tools tags. The category tag line (AI · MCP · Health) and the Live
site pill are gone; the live site stays reachable through the artifact
panel's Live tab and its open-in-new-tab icon.
**Supersedes:** #63 — the tags-as-text line and the live pill in the
facts row.

### 65. Facts and target user wear icon badges
**Changed:** The overview facts row stopped being bare text: each fact
now has a small blush icon badge (person for Role, calendar for
Timeline, spark for Outcome). The research block's target user line
became the same kind of element, with a target icon, and moved to the
end of the block per the designer's ordering: findings line, sticky
note pains, the two review quotes, then Target user as the conclusion.
It lives in its own field now instead of inside the research text.
**Notes:** One element vocabulary for facts everywhere: icon badge,
mono label, semibold value. The icon is picked from the label, so new
fact types get a sensible mark without configuration.

### 66. Lone build shot: smaller, and no letterbox
**Changed:** A collage holding a single screenshot (the V2 build shot)
is now width-capped like the showcase, and its window follows the
image's own proportions edge to edge instead of forcing a 16:10 frame
with letterbox padding around the picture.

### 64. Process steps carry their own evidence
**Changed:** A timeline step can now hold sticky notes and a full-width
board under its text, and clicking the board opens it in the panel.
AtmosUI's five steps use it exactly as asked: Analyze shows the six
requirement stickies over the requirements board, Brainstorm shows the
four explored ideas as stickies over the brainstorming board, Decide
lists the five reasons weather won as stickies, Visualize shows the
ideation board, Build is one line. The separate Research block is gone
for AtmosUI. Solution now leads its showcase with a recorded GIF of
the live demo cycling all four effects on the desktop scene. "What's
next" is removed (there is no next), and Limitations is two lines:
proof of concept, not implemented natively; weather mode chosen by
hand, not automatically as intended.

### 67. Room to breathe
**Changed:** Case-study sections space their blocks at 20px instead of
12px, sub-headings (Research, V1, V2, Limitations…) carry extra air
above so more space sits before a heading than after it, and the two
review quotes separate at the block gap too.
**Notes:** The sections stopped being plain prose a while ago; sticky
notes, quote blocks, and screenshot grids are objects, and objects
need gaps to read as groups. The tight 12px rhythm came from when the
sections were only text.

### 68. The outcome, said plainly
**Changed:** Outcomes now opens with the honest claim before any
numbers: "I built Nourish for my own problem, and it solved it
perfectly. Logging stopped being a chore, so I finally see what I
eat." New optional outcome line on the case study template, above the
metric cards.
**Notes:** Transparency is the credibility here: one builder, one real
problem, solved. It also squares with the stated limitation that the
only tester so far is the builder.

### 65. Smaller step boards, the GIF leads, Problem de-duplicated
**Changed:** Process-step board figures are width-capped and show the
whole image inside a fixed window, uncropped, instead of running the
full column. The effects GIF was re-recorded to step through all four
form factors (phone in sun, watch in rain, car in snow, desktop in
fog) and is now the case study's cover and overview thumbnail as well
as the showcase opener. The Problem section dropped the brief
restatement from the overview and the three research bullets already
told as Analyze stickies; it is now two lines plus the rubric. The
Outcome fact reads "2nd place · €4,000".

### 66. Overview as two columns: words left, cover right
**Changed:** The overview is a two-column grid on desktop: description,
facts, and tools in the left column, the cover in the right as a plain
edge-to-edge picture with a floating Open pill (no card furniture). On
narrow screens the text stacks first. The effects GIF was re-recorded
a third time to the keeper: each device shown whole with its bezel and
shadow, floating on a warm cream that matches the page, so the loop
sits on the overview like a mockup instead of a cropped screen.
Compact chips elsewhere are unchanged.
**Notes:** Landed on the designer's own layout call after three passes
in one session: thumbnail-sized image, then a full-width card with a
footer row (read badly, and the GIF sat in black bars), then this.

### 69. Interactive Menu brought up to the AtmosUI structure
**Changed:** Ran the portfolio audit on the Interactive Menu study and
closed its structural gaps against AtmosUI, which is the richest study.
Added `facts` (Role: Lead UX & frontend, Team: 4 designers, Outcome:
Paper fans won over) so the overview isolates the author's part instead
of leaning on "we". Rewrote Process: Research is now a ProcessStep
carrying its four pain points as stickies, and a new "Reframe" step
makes the decision explicit (digitizing the menu was never the win;
kill the wait, the guessing, and the split-bill math). Added a four-step
`flow` at the top of Solution (Scan, See every dish, Order it yourself,
Pay for your own). Added `limitations` (8-person prototype, payment not
wired to a real POS, QR as the only door still needs a waiter for the
phoneless diner) and `futureWork` (pilot in a real restaurant, then
build the no-phone fallback). Fixed a colon-as-dash in a highlight.
**Notes:** No new numbers invented, per the case-study writing rules;
every addition restructures claims already in the study. Honesty was
the biggest gap, it was the only main study with neither limitations
nor future work while every sibling had both. The audit also flagged
the Research-Define-Sketch-Test chronology as the bootcamp template;
the Reframe step is the decision-storytelling fix for it.

### 70. Problem section down to 1-2 sentences, every study
**Changed:** Rewrote the `problem` field on all nine case studies from a
bold lead plus a bullet list plus a bold close (5-8 lines) to a tight
1-2 sentences each. Every one keeps its concrete hook (Protoca's
"description instead of the design", Nourish's "tracking wasn't the
problem, the logging was", Interactive Menu's "68% still preferred
paper", Goodreads' "no public research on whether it's usable") and its
signature closing insight, just without the bulleted middle. The bold
lead carries the first sentence; a plain second sentence lands the twist.
**Notes:** No new facts introduced, per the case-study writing rules;
each condensed line is drawn from copy already in that study's problem or
description. Colons that had substituted for dashes inside the old bullets
("what actually hurts:", "five incompatible places:") are gone with them.
The Problem section is the 30-second-scan anchor, so shorter and sharper
serves the recruiter read the audit skill optimizes for.

### 71. Drop the "What success looked like" label
**Changed:** Removed the "What success looked like" sub-label that sat
above the goals list in every case study's Problem section. The goals
bullets now follow the problem prose directly, separated by the section's
standard 20px block gap.
**Notes:** One label, shared by all studies, so it cleared everywhere at
once. The goals list stays; only its heading is gone. The list reads as
the implicit aim right after the problem, which suits the plain-prose
Lola-turn voice better than a shouty uppercase label did.

### 72. Interactive Menu problem: reframe as the adoption paradox
**Changed:** Recast the Interactive Menu problem from "68% still preferred
paper" to the question underneath it: the benefits of a digital menu are
obvious, so why do most restaurants still hand you paper? The 68% and the
three real pains (waiting, guessing, group-bill math) now land as the
answer the survey found, not the opening claim.
**Notes:** Same facts, better hook. Leading with the paradox gives the
reader a question to carry into the research, and the survey result earns
its place as the payoff. It also lines up with the Process "Reframe" step,
which already argues the win was never digitizing the menu.

### 73. Goals list moves from Problem to Process
**Changed:** The `goals` bullets now render at the top of the Process
section instead of under the Problem prose, app-wide across every case
study. The Problem section is now just the problem statement; Process
opens with what the project set out to do, then research and steps.
**Notes:** The aims are approach, not problem, so they belong with the
work. This also leaves the Problem section as the clean 1-2 sentence
scan anchor from #70-72, with nothing trailing it. Kept the list
label-less per #71; the "02 Process" heading frames it.

### 74. Drop Nourish's goals list
**Changed:** Emptied Nourish's `goals` array, so its three generic aims
(Add your goals, Log your food, Track your history) no longer render at
the top of Process. The `goals.length > 0` guard from #73 hides the list
for that study; every other study keeps its goals.
**Notes:** Those three read as the app's nav, not as design aims, so they
added nothing above the Research findings that follow. Nourish's Process
now opens straight into Research.

### 75. Remove the goals list from all case studies
**Changed:** Dropped the goals `<ul>` render from the Process section
entirely, so no case study shows a goals list anymore. Supersedes #73
(which moved it there) and #74 (Nourish-only). Every study's Process now
opens straight into Research or its first step.
**Notes:** Left the `goals` data on the projects untouched, just
unrendered, so it can come back without retyping. The field stays
required in the type; nothing else reads it.

### 76. Overview and Solution tidied on feedback
**Changed:** The title moved inside the overview's text column, so it
sits right on the description instead of floating above the grid. The
effects loop now lives only on the cover; its duplicate showcase slot
in Solution is gone, and the four weather pairs open the showcase. The
flow diagram aligns left with the rest of the copy instead of
centering.

### 77. LingoPro led by a recorded walkthrough
**Changed:** LingoPro's cover and case study hero are now a recorded GIF
of the live app, driven end to end: paste a text, pick a level, generate,
then each of the five ways to practise, and the teacher dashboard. Added
a `facts` row (Role / For / Outcome, "5 professors use it") so the outcome
scans in the overview, and replaced the three empty gallery placeholders
with four real screenshots (create, lexique, flashcards, results), each in
a browser frame.
**Notes:** Modeled on AtmosUI, where the recorded loop leads everywhere.
The audit's biggest LingoPro gap was visual evidence, one static screen and
three gradient placeholders; the demo loop plus real screens fixes that,
and the facts row answers "what did this do" in the 30-second scan. The
GIF was recorded with Playwright (a floating cursor drawn in, since video
capture shows none), the ~19s AI-generation wait trimmed out, and sped 1.2x
to ~26s. The live-site preview still lives behind the artifact panel.

### 78. Interactive Menu trimmed to two personas, screenshots inline
**Changed:** Cut the Interactive Menu personas from three to two, Maxime
(speed and the split bill) and Claire (accessibility and ingredients),
which between them cover all four researched pains; dropped Odile as the
redundant third. Simplified their wording ("macular degeneration" became
"low vision"). Moved the low-fi and hi-fi prototype shots out of the
gallery and inline under the Sketch and Test process steps, so the right
screenshot sits directly below the step it belongs to. Trimmed the process
prose.
**Notes:** Matches AtmosUI, where each process step carries its own board
right under it. Two personas that span every pain read faster than three
with overlap. Re-grounded the "usable at 72" goal to "usable with low
vision, and by a first-timer" since the 72-year-old persona was gone and
72 sat outside the 21-to-65 survey range.

### 76. Personas 2-col, Interactive Menu trims, final screens inline
**Changed:** (1) PersonaGrid renders 2-up (`md:grid-cols-2`) instead of a
single stack. (2) Interactive Menu: removed the four hand-drawn sketches
and the "What's next" future-work block; added an `outcomeNote` stating
the testing methodology (think-aloud tests, 8 diners 21-59, three
scenarios incl. a group bill) above the metric cards. (3) Solution now
shows image-bearing final screens inline as a collage instead of the
"Final screens" chip, app-wide; the chip stays only for live-preview-only
projects, and `screen`-tagged studies still get the showcase.
**Notes:** Inline-collage change is app-wide for consistency with how
process and findings shots already render inline; say the word to scope
it back to Interactive Menu only.

### 79. Update Protoca: real research, Nourish structure, Outcomes
**Changed:** Rebuilt the Protoca case study on the Nourish template. Replaced
the two invented personas (Mila, Adrian) with the actual research: a
`research` block describing open interviews with 7 teammates and a thematic
analysis that produced two themes (AI ignores the design system; getting it
right costs time and tokens), the five sub-themes as sticky notes, and a
`targetUser` fact. Added the two research boards to the gallery as `findings`
shots (interviews coded per participant, the two-theme/five-sub-theme board).
Trimmed the process timeline to the two build decisions (Design, Refine).
Added a `facts` row (Role / For / Outcome "5 POs, 2 designers use it"), a
`flow` diagram (pick a page, capture, edit by hand, iterate with AI), an
`outcomeNote` carrying the adoption and the validated bet, real `limitations`
(hand editing rougher than Figma, heavy HTML export), and `futureWork`
(smoother editing, zipped export) closing on the "stay curious" learning.
Rewrote the solution to the described feature set (capture, hand edit,
export to AI, versioning, grouping by domain, layer select) and dropped ZIP
from the export claim since it isn't shipped yet.
**Notes:** Followed /audit-portfolio: the biggest gaps were a buried outcome
(fixed by the facts row + outcomeNote) and thin honesty/reflection (fixed by
limitations + what's next). Personas were cut per the "personas must be real"
rule now that the true research method is documented. Kept two themes in the
research prose and five sub-themes as stickies so the thematic analysis
scans without a wall of text.

### 80. Flatten the artifact collage app-wide; Protoca screenshots + ZIP
**Changed:** (1) `ArtifactCollage` no longer renders its multi-shot branch on
a rotated, staggered plane over a dotted surface. It's now an upright,
width-capped two-column grid of the same browser-window frames the process
figures and showcase use. This is app-wide: it changes the findings, loose
process, and untagged-solution collages in every case study, plus the
design-system demo (caption updated). (2) Protoca: moved the interviews and
themes research boards out of the findings collage and onto Discover / Define
process steps, so they render in the flat window frame (AtmosUI pattern);
the five sub-themes ride the Define step as sticky notes. (3) Added four real
extension screenshots to the Protoca gallery (popup, dashboard grouped by
domain, editor/layers, export dialog), dropped the imageless "AI loop" tile,
and stopped reusing the branded cover as an inline editor shot. (4) ZIP
export is shipped (the export dialog offers "Export ZIP (LLM-friendly)"), so
restored ZIP to the results row and export caption, removed the "HTML export
too heavy" limitation and the "add a zip" future-work; limitations are now
two short unlabeled lines (hand editing, complex-page capture). (5) Copy:
"Seven"→"7", "Five/two POs and designers"→"5/2".
**Notes:** Supersedes the findings-collage part of #79. The collage flatten
answers "remove this type of container from all projects"; nothing now tilts.
Reconciled the earlier "zip needed" limitation against the shipped export
dialog the screenshots show, and flagged the change to the user.

### 69. Final screens from production, a demo tour, and the Claude input
**Changed:** All final screenshots recaptured from the live production
app: Today, History, Goals, and Connect on desktop and phone, plus the
real Sign in screen on both, which replaces the last placeholder frame
and its "screenshot is coming" note. The showcase gains a new leading
screen, "Log a meal": the Claude chat where a dinner photo becomes a
logged meal, shown as a lone phone at its natural ratio (lone phones no
longer crop to the grid's 9:19). A 21 second screen recording touring
Today, History, Goals, and Connect ships as an mp4 demo in the artifact
panel, with a poster still; a GIF of the same tour sits in the assets
folder for sharing outside the site. The demo-data banner was removed
from the captures; they show the product, not the demo furniture.
**Notes:** The Claude input shot is the thesis in one picture: a photo
and two words become a logged meal with macros. It leads the showcase
because the input side of the product never had a screen before, and
it is the whole point.

### 81. Protoca cover fix; window frames fit images and grow a step
**Changed:** (1) Protoca now sets `heroImage` to the branded cover
(protoca-cover.png). Without it, artifacts[0] was the first process board
(the interviews stickies), so the overview preview led with a research board
instead of a cover. (2) Fixed an object-fit bug in the collage window frame:
the image carried both `object-cover` and `object-contain`, which Tailwind
resolves to cover, so every `fit: "contain"` shot was silently cropping.
Now exactly one fit class applies, so contained shots show whole. (3) Bumped
the window-frame containers a step across all case studies: collage grid and
single shot max-w-3xl -> max-w-4xl, showcase max-w-3xl -> max-w-4xl, and the
process-step figure max-w-lg -> max-w-2xl, with slightly larger gaps.
**Notes:** The fit bug is why the Protoca solution shots (popup, dashboard,
editor, export) were cropping despite fit:contain. Same dotted-window frame
is now reused everywhere (collage, single shot, process figure, showcase),
just larger and no longer cropping.

### 70. Demo tour includes light mode; GIF is the Nourish cover
**Changed:** Re-recorded the production tour so it flips to light mode
partway through: dark Today, History, Goals, Connect, then Light mode
on for a second pass of Today and History, so the clip shows the app
reads well both ways. The Nourish project card cover is now the tour
GIF itself, animating in the chat carousel and the case study grid,
instead of a still of the Today screen. The panel demo mp4 and its
poster were refreshed from the same recording (poster is the History
charts, banner-free).
**Notes:** A moving cover earns the glance in a grid of stills, and it
previews the actual product in three seconds. The mp4 stays the
in-panel demo; the standalone share GIF was regenerated too.

### 77. All-phone collages render as small phones, not blowups
**Changed:** ArtifactCollage now detects an all-phone set of shots and
lays them out as a flex row of small (160px) phone windows instead of
the 2-up grid, where a phone shot stretched to half of max-w-4xl
ballooned to ~450px wide. Fixes Interactive Menu's inline final screens
looking oversized.

### 82. Browser-window frame on every cover image
**Changed:** Added a shared `WindowChrome` (the three traffic-light dots on a
top bar, optional caption) and wrapped it around all three cover surfaces:
the case-study overview hero (`ArtifactChip` large), the Case Studies grid
card (ProjectsView), and the chat carousel card (ProjectCard). Covers now
wear the same browser-window frame as the process boards and gallery windows.
The overview hero was restructured so the frame sits above the image and the
Open pill floats over the image, not the bar.
**Notes:** Dots only, no caption, on covers, the title already sits beside or
below each one, so a caption would just repeat it. `WindowChrome` is exported
from Artifact.tsx and reused rather than re-inlined, since the same dot bar
already appears in five places.

### 78. Bare phones in the final-screen row, no double frame
**Changed:** The all-phone collage row now renders the shots as bare
device images (144px wide, own ratio, uncropped) instead of wrapping each
in browser-window chrome. The shots are already phone mockups with the
bezel in the image, so the chrome double-framed them and truncated the
caption ("Complete ingredi..."). Active shot gets a rose ring; hover
lifts.

### 83. Interactive Menu led by its recorded app demo
**Changed:** Interactive Menu's cover and hero are now the recorded phone
walkthrough of the live app (menu, dietary filters, cart and split
payment, ratings, the "waiter is coming" help, and the accessibility
settings), replacing the static `menu-cover.jpg`. Kept `heroFit: contain`
and set no `heroDevice`, since the GIF already carries its own phone bezel.
**Notes:** Recovered the original 12MB, 73s, 30fps GIF from git history
(`menu-gif.gif`, dropped from the tree earlier) and optimized it to a 5MB,
24s loop: sped 3x, dropped to 15fps, downscaled to 460px, and frame-diff
optimized with gifsicle. ffmpeg's palette route bloated it to 100MB+
because scaling perturbs every pixel and defeats GIF frame-diffing;
gifsicle -O3 restores it. Same reason as #78, no second phone frame.

### 79. Cap persona grid width
**Changed:** PersonaGrid gained `max-w-4xl`, so the two cards are ~430px
each instead of stretching to the full ~950px column. The persona content
(a quote and two short lists) was filling under half the card, leaving
large empty containers; the cap makes the content fill the width.

### 71. Demo re-recorded: visible cursor, snappier, cleaner cover
**Changed:** Re-recorded the tour with a visible pointer that glides to
each nav item and pulses on click, so the navigation reads as someone
using the app instead of screens cutting on their own. Pacing tightened
(about one second per screen) and the clip trimmed to start on the dark
dashboard, so the cover opens on the product, not the login screen or
the demo banner. The Nourish card cover is the trimmed loop; it now
animates through Today, History, Goals, Connect, a light-mode flip, and
back, roughly ten seconds. Poster refreshed to a light-mode dashboard.
**Notes:** The "static cover" was the old cut opening on a slow login
fade that barely moved in the card crop. Starting mid-navigation on the
dashboard fixes both the stillness and the stray demo banner.

### 84. Make the portrait hero fit properly, not crop
**Changed:** The large overview hero chip now honours `heroFit`. A
`contain` hero (the Interactive Menu phone GIF) shows the whole shot
centred over the blush instead of being cropped to the 16:10 cover box, so
the full phone is visible rather than a zoomed slice. `cover` heroes are
unchanged.
**Notes:** The hardcoded `object-cover` only ever met landscape heroes, so
it never showed; a portrait phone exposed it. AtmosUI and Nourish (also
`contain`, but landscape) still fill the frame, so nothing regressed.

### 80. Shorter contain hero
**Changed:** The large overview ArtifactChip's contain image cap dropped
from max-h-460px to 360px, shortening portrait heroes like Interactive
Menu's phone demo GIF. Landscape heroes are width-bound and unaffected.

### 72. Cache-bust the cover; widen the showcase grid
**Changed:** The animated cover was regenerated several times at the
same path, so browsers kept serving a stale cached copy that looked
static. Renamed it to nourish-tour-cover.gif so the browser fetches the
current animation fresh. The final-screens showcase grid widened to
max-w-5xl with gap-5 / gap-6, so the paired screens read larger.
**Notes:** The file was always a valid infinite-loop GIF; the staleness
was pure HTTP caching on an overwritten URL. A new filename is the
reliable fix.

### 85. Interactive Menu process: drop Reframe/Define, show real personas, add Design
**Changed:** Cut the "Reframe" and "Define" prose steps from Interactive
Menu. Research moved into the `research`/`researchNotes` fields so it leads
as a subsection, and the "Who we designed for" persona cards (Maxime,
Claire) now render right after it, at the Define slot, instead of below all
the steps. Added a "Design" step after Sketch, "built the high-fidelity
prototype in Figma, inspired by the classic French bouillon restaurants,
then implemented it in React", carrying the hi-fi board; Sketch keeps the
low-fi board and Test is now text-only. Process reads Research, personas,
Sketch, Design, Test.
**Notes:** Personas were repositioned in CaseStudyView to render straight
after the research block; only Interactive Menu has personas, so nothing
else moved. Replaced the sentence describing the two personas with the
actual cards, the request was to show them, not narrate them.

## 2026-07-20

### 85. Refine the LingoPro case study around the loading-screen iteration
**Changed:** Rewrote LingoPro end to end from new research notes. The problem
now names the real workflow (quizzes built by hand in ChatGPT, one chat per
student, HTML files that were inconsistent and sometimes broken, no way to see
who practised). Process is grouped: a Research block with five pain stickies
and the target user, then Design and Test steps. Added the key iteration as a
before/after figure, the old full-screen wait ("Detecting the language...", a
15-60s progress bar) versus the new live build where the lesson fills the
dashboard word by word. Facts now read Solo, AI product builder / May 2026 / 5
professors use it, and tools add OpenRouter. Results are 5 professors, 5 ways
to practise, 17 translation languages. Limitations and What's next rewritten to
the two real ones (inexact levels, long-text cap). Media: converted
lingopro-old.mov to loading-old.gif (the before), and by driving the real app
with Playwright recorded loading-new.gif (the live reveal) plus a new demo.gif
hero that crossfades a light create-to-lesson flow into the dark results
dashboard.
**Notes:** Recorded from the local build in demo mode, which is the same code
as production, for a deterministic and free capture; the "demo content" badge
was hidden so the clips match the shipped product running a real key. The two
learnings ride in the copy rather than a separate box: "UI changes trust" is
the caption on the loading figure, and "even a workflow she liked had a weak
spot" opens the Test step.

### 86. Make the old-loading "before" gif 2x faster
**Changed:** Re-encoded loading-old.gif from the source clip at half the
playback time (about 16s down to 8s) with `setpts=0.5*PTS`, keeping the
infinite loop. Same filename, so the before/after figure is unchanged.
**Notes:** Speeds only the playback, not the content; the wait screen still
runs its full Reading, Detecting, Choosing, Opening sequence, just tighter, so
it loops without dragging next to the live-build "after".

### 87. Add examples.png as research evidence, tighten the LingoPro copy
**Changed:** Added examples.png to the Research block as a findings shot, a 2x2
of four of her original quizzes, the same five exercises but a different look
each time, the evidence behind "studied a batch she had already sent". Cut the
phrasing that repeated across the hero, problem, and research (the "hand-made,
inconsistent, broken" line no longer appears three times) and used plainer,
shorter sentences throughout.

### 88. Move the design decisions inside a "Design" sub-section
**Changed:** The before/after comparison used to sit in its own "Design
decisions" node after the phase steps. Now, when a project has iterations, the
phase steps and the comparisons render together under one "DESIGN" sub-section
node. LingoPro's process collapsed to a single design beat, with the
usability-test setup folded into the comparison caption.
**Notes:** Scoped to projects that have iterations, so every other case study
still shows its phase steps as separate rail nodes, unchanged.

### 89. Widen the collage grid for all case studies
**Changed:** ArtifactCollage's grid went from `max-w-4xl` to `max-w-5xl`
(gap-5, sm:grid-cols-2), so image collages read wider on every case study.

### 90. Add a new step after Design, called Iteration
**Changed:** Split the merged "Design" node from #88 back into two rail steps:
"Design" holds the design rationale, "Iteration" holds the before/after loading
comparison right after it. Still scoped to projects with iterations, so other
case studies are unchanged.

### 91. Swap a results metric for the real time saved
**Changed:** LingoPro's second Outcomes metric changed from "5, Ways to
practise one text" to "50%, Less time to create a lesson", a real efficiency
outcome instead of a capability count that echoed the "5 professors" tile.

### 92. Update the LingoPro screenshots
**Changed:** Recaptured create, lexique, flashcards, and results from the
current app in light mode at 2x. The results shot now shows a populated
dashboard (three students, per-activity scores, completion) instead of the old
empty "No students yet" state, matching its caption.

### 93. Drop the filler lead on Limitations
**Changed:** Removed "These came out of real use, so they are worth stating
plainly." from LingoPro's Limitations. The section already has a heading, so it
now opens straight on the two real limits.

### 94. Recapture the LingoPro screenshots from production, fully loaded
**Changed:** Reshot create, lexique, flashcards, and results against the live
site instead of localhost, so the student-link field shows the real
lingopro-production URL. Each shot waits for generation to fully finish, so all
35 words are loaded, not mid-reveal.
**Notes:** Production had no class data, so the results dashboard needed
students. Generated one real lesson ("Les bienfaits de la lecture") and seeded
three sample students (Aysel, Léa, Marc) through the public API to populate it.
That demo lesson still lives on production and can be deleted from its teacher
page.

### 95. One dark overview per case study, not a rose lead plus a body
**Changed:** Every case study's `description` (the overview blurb) collapsed
from a bold rose lead line plus a dark paragraph into a single dark paragraph.
The two read as two separate overviews; now each is one. Only the overview
changed, the Problem, Process, Solution, and Outcomes sections keep their bold
rose leads.

### 86. Add the bouillon inspiration board to Interactive Menu
**Changed:** The Design step now carries the moodboard (a board of classic
Paris bouillon restaurants) right under "inspired by the classic French
bouillon restaurants", so the claim is shown, not just stated. The hi-fi
prototype it displaced moved down to the Test step ("the prototype we
tested"), where the low-fi already had its Sketch step.
**Notes:** The dropped-in `inspire.png` was 6.4MB, a photo board, so it was
recompressed to a 1600px JPG (~0.4MB) and referenced as `inspire.jpg`; a
2MB PNG would have been the wrong format for photographs. Each of Sketch,
Design, and Test now shows exactly one fitting board.

### 73. One numbered rail threads the whole Process section
**Changed:** Every Process subsection now sits on a single connected
timeline rail, the way the phase steps already did. Research, "Who I
designed for", each phase, Design decisions, V1, and V2 are numbered
nodes joined by one vertical line, so the section reads as one sequence
instead of stacked free-floating blocks. The old uppercase block labels
became node leads beside each number. Applies to every case study.
**Notes:** Built a generic ProcessRail (badge + connecting line) with a
StepLead heading and a ProcessStepBody for phase steps; ProcessTimeline
is now a thin ProcessRail of step bodies, so the design-system demo is
unchanged. Nourish reads Research, V1, V2; Protoca and the menu study
fold their personas and phases onto the same spine.

### 83. Short image captions; popup moves to the Design step
**Changed:** (1) Cut every Protoca image caption to a few words: gallery is
now "Full walkthrough", "Captures by domain", "Edit any element", "Three
export formats"; the interviews board caption shortened to "7 coded
interviews". (2) Moved the popup shot (extension.png) out of the Solution
gallery and onto the Design process step as its board ("The capture popup"),
so the entry point is shown where the surface is described. Solution gallery
is now four shots (demo, dashboard, editor, export).
**Notes:** The long "Label: sentence" captions read as body copy in the
window bar; a few words scan as a caption should. Camera icon stays (still
the Capture flow step).

### 74. Target user fact becomes a full persona
**Changed:** The plain "Target user" fact in Research is replaced by a
user persona card (name, one-line descriptor, a quote, goals, and
frustrations), rendered as its own "Who I designed for" node on the
process rail. Nourish's persona is the builder herself, since she made
it for her own problem, grounded in the problem story and the research
pains. LingoPro's persona is her French professor, the real person she
interviewed, anonymized, grounded in the documented interview findings.
The targetUser field is retired from the type.
**Notes:** Both personas are drawn from real users already in each study,
not invented: Nourish's is the designer's own profile, LingoPro's is the
interviewed professor. Names on the professor persona are anonymized;
goals and frustrations quote the real research notes.

### 84. Nourish overview leads with the autoplaying demo GIF
**Changed:** Set Nourish `heroImage` to nourish-demo.gif with heroDevice
"browser", so the overview hero preview now autoplays the walkthrough instead
of showing the static Today screenshot. Removed the mp4 demo block that had
briefly led the gallery. Matches how LingoPro (demo.gif) and AtmosUI
(effects.gif) lead.
**Notes:** GIF over mp4 per request, so it plays inline with no play badge or
click, the way the other two demo-led studies already work. The card cover
stays nourish-tour-cover.gif; the hero is the demo GIF.

### 87. Bigger case study section titles
**Changed:** The numbered section headings (Problem, Process, Solution,
Outcomes) grew from 22px to 26px, 30px on desktop, and the rose accent bar
beside them from h-5 to h-6 to stay in proportion. Applies to every case
study through the shared `SectionHeading`.
**Notes:** They now read as strong chapter dividers, matching the overview
title's scale; the eyebrow number and cat avatar were left as-is.

### 88. Scale the rest of the section heading to match
**Changed:** The section number, cat avatar, and accent bar grew with the
title from #87: cat avatar 24px to 30px, bar h-6 to h-7, and the number
13px to 16px. The number is now sized inline in `SectionHeading` rather
than via the shared `Eyebrow`, so the projects grid's "Selected work"
eyebrow keeps its small size.
**Notes:** Scoping the number locally avoids enlarging the one other place
`Eyebrow` is used.

### 89. Section number black, grouped with the title
**Changed:** The section number ("01", "02"...) is now ink black instead of
rose, and sits in a tight baseline-aligned group with the title, so it reads
as one heading unit ("01 The problem") rather than a separate coloured
label. The rose stays only on the accent bar.
**Notes:** Number and title share a nested flex so the number hugs the
title; the bar keeps its own spacing from the pair.

### 85. Protoca facts: real role, client, and timeline
**Changed:** Updated the Protoca overview facts. Role is now "AI product
builder" (top-level role field too), "For" is "Product team at Wiremind"
(was "My design team"), and added a "Timeline" fact "May 2026". Kept the
Outcome fact ("5 POs, 2 designers use it") so the result still scans up top.
**Notes:** Four facts now instead of three; the row wraps cleanly. Say the
word to drop Outcome from the facts if you'd rather keep it to three.

### 86. Drop Protoca "For"; three-fact overview layout, app-wide
**Changed:** (1) Removed the "For: Product team at Wiremind" fact from
Protoca, leaving Role / Timeline / Outcome. (2) Reshaped `FactList` for the
three-fact case: the first two facts stack in a left column (Role over the
middle fact) and the third (Outcome) sits in a second column spanning both
rows, vertically centred between them. Falls back to the old flex-wrap for
any other count. Applies to every case study, since all of them carry
exactly three facts.
**Notes:** Layout matches the sketch (1 top-left, 2 bottom-left, 3 centred
on the right). Single-fact uses like the Research block's Target-user badge
keep the flex fallback.

### 81. New artifact interaction: zoom images, one Open button, no gallery
**Changed:** Reworked how case-study visuals open, app-wide.
- Removed gallery mode from the docked panel. The panel is now the live
  preview and nothing else (opened with empty `images`, which the panel
  already renders as live-only). No prev/next, no thumbnail strip, no
  Gallery tab.
- One Open button, on the overview hero, is the only way to the live
  preview. If the project embeds, it opens the docked live preview;
  otherwise the pill becomes an external link to `project.link` (Chrome
  store, Figma prototype, write-up), labelled with `linkLabel`.
- Every image everywhere now zooms in one shared `Lightbox` (extracted
  from the showcase's in-place zoom, the Nourish behaviour). Collages,
  process boards, comparison figures, the hero, and the showcase all
  route clicks through it; phones get a bezel, wide shots a browser
  window, clips play in place.
**Notes:** Kept component call sites stable by leaving `onOpen(src)` /
`onOpenImage(src)` signatures intact and only changing what the handler
does (zoom via an src->ArtifactImage lookup that now carries `isPhone`).
The showcase's own lightbox was replaced by the shared one, so there is a
single zoom implementation. Build is currently blocked by an unrelated
in-progress error in ProjectCard.tsx; Artifact.tsx and CaseStudyView.tsx
type-check clean.

### 87. Whole card clickable; "Open to work" badge; green status dots
**Changed:** (1) The chat carousel ProjectCard is now one button, so clicking
anywhere on the card opens the case study, not just the pill. The "Tell me
more" button became a visual pill (a real button would nest inside the card
button) that glows on card hover via group-hover. (2) Added an "Open to work"
line with a green status dot in the sidebar footer, above the Theme row, flat
on the surface (no new container). (3) Lola's online dot in the header
switched from gold to the same green (#34c759).
**Notes:** Green #34c759 reads as available in both light and dark; the
sidebar dot carries a soft ring for a status-light feel. Matches the grid
ProjectCard, which was already a full-card button.

### 88. Overview title gets the rose tick, matching the numbered headings
**Changed:** Added the rose tick (the same one SectionHeading uses) to the
case-study overview title, between the cat avatar and the project name. Now
every case-study title reads the same way, whether numbered ("01 The
problem") or the top overview title. Sub-labels left untouched.
**Notes:** Only the overview title lacked the tick; the numbered section
headings already had it.

### 82. Lightbox: no bezel on phone shots
**Changed:** The Lightbox no longer wraps phone shots in a black device
bezel. The phone gallery images already are mockups with the frame baked
in, so the added bezel double-framed them. Phone zooms now show just the
picture (rounded corners, soft shadow). Desktop shots keep their browser
window chrome.

### 89. Merge the section number into the title
**Changed:** SectionHeading now renders the number inside the title <h2>, so
"01 Problem" reads as one heading in the display font at the full title size,
instead of a 16px mono tag sitting in a separate flex cell beside the bigger
title. Cat avatar and rose tick still lead the line.
**Notes:** Number kept the same ink colour as the title for a clean single
unit (matches the screenshot). Trivial to tint it rose-dark if an accent is
wanted. Eyebrow component stays for the grid's "Selected work" label.

### 90. "01 The problem" -> "01 Problem"
**Changed:** Dropped "The" from the Problem section heading so all four
section titles are parallel single words: Problem, Process, Solution,
Outcomes.

### 83. Open-to-work dot in the collapsed nav rail
**Changed:** The collapsed sidebar rail now shows the "Open to work"
availability as a green status dot below the vertical theme toggle, with
a tooltip and an sr-only label. The expanded sidebar already carried the
availability row; the rail was the only place it was missing.

### 84. Restyle the "Open to work" footer, revert the rail dot
**Changed:** Reverted #83's collapsed-rail dot (wrong target). Restyled
the expanded sidebar's "Open to work" row to match the reference: green
dot to the left of the text, centered, in the rose accent colour instead
of dark ink, at text-base, with a divider rule between it and the Theme
row.

### 85. Divider above Theme, not above Open to work
**Changed:** Dropped the footer's top border so the only rule sits
between "Open to work" and the Theme row (top of Theme). "Open to work"
now has no line above it.

### 91. Nourish Connect iteration: before/after + what-changed stickies
**Changed:** Added an Iteration to Nourish's Process section showing the
Connect page before/after: the first version exposed one shared MCP URL to
every visitor; the current one gives each account its own connector and
points the demo to "Create your space". Recovered the "before" screenshot
from git history (commit ac30e53) as connect-v1-desktop.png. Added a `notes`
field to the Comparison type and rendered it as sticky notes under the
ComparisonFigure, listing what changed (shared URL -> per account, demo stops
handing out a live connector, "Copy the URL" -> "Create your space"). Guarded
the "Design" sub-label so it only shows when a project has phase steps
(Nourish's process is empty, told through V1/V2 instead).
**Notes:** The Iteration renders in Process before the V1/V2 blocks (that's
the section order); chronologically the Connect change came late, so say the
word if you want it moved after V2.

### 96. Rebuild the Design System page in atomic order, on placeholder data
**Changed:** Reorganised the whole Design System view into the four atomic
layers, smallest piece to largest, each under a rose-eyebrowed tier heading:
Foundations (color, type, space, radius, elevation, motion, icons), Atoms,
Molecules, Organisms, then Principles. Every component now appears exactly
once. Swapped all the real-case-study demos (Protoca's metrics, real
personas, gallery shots, starter prompts) for generic placeholder content
held in a new `demo` object and a minimal `demoProject` in designSystem.ts,
so the gallery reads as templates, not the portfolio. Component figures with
no image fall back to the system's own gradient + icon "no shot yet" frame,
which serves as the placeholder image. Added components that weren't
documented before: Motion tokens, an Icons inventory (every lucide glyph the
app uses, split into Interface and Content marks, plus the ToolLogo brand
marks), the Window frame primitive, the Fact list, the single Metric stat,
and the Eyebrow label. Rewrote Principles from six wordy paragraphs into five
short plain-language rules (One accent; All warm, no grey; Round but tidy;
One clear action; Two themes, one system), moving the old "motion is a
whisper" copy into the Motion token instead.
**Notes:** Placeholder metrics/persona/testimonial are deliberately generic
(no invented stats or research) since this is a parts catalogue, not a case
study. Specimens sit directly on the page with a mono label, never wrapped in
a second card, to keep the no-nested-containers rule. The theme toggle in
Atoms drives a local cosmetic state only, it doesn't touch the app theme.

### 97. Swap the Connect iteration for the goals page; move it after V1/V2
**Changed:** Replaced Nourish's Connect before/after with a goals-page one:
the first dark Goals page, just four target fields and a save button, versus
the current one where those targets sit above a full "Your plan" (body, goal,
training, diet) the AI fills in from chat. Recovered the "before" from git
(the earlier goals-desktop.png at commit ac30e53, overwritten in 8a14a85) and
saved it as goals-v2-desktop.png; the "after" is the current goals-desktop.png.
Labels First pass/Now, with what-changed stickies. Restructured the Process
rail so iterations render *after* the V1 and V2 nodes as "More iterations"
(Nourish now reads 1 Research, 2 Who I designed for, 3 V1, 4 V2, 5 More
iterations), and dropped the empty "Design" node that a project with no phase
steps was leaving behind as a stray number.
**Notes:** First tried v1-goals.png (the light "Panel" V1) as the before, but
that's the V1, not the middle version, so I pulled the early-V2 goals shot
from history instead. The label stays "Iteration" (not "More iterations") when
a project has no V1/V2 before it, so LingoPro's single iteration reads
unchanged: Research, Who I designed for, Design, Iteration. connect-v1-desktop.png
is now unused but left in place. Answers the open question logged in #91 (move
the iteration after V2).

### 98. Fix the artifact demo and cut the cheesy captions
**Changed:** The Design System's artifact chip was showing the old small
thumbnail-and-pill form, which the product no longer uses. Swapped it for the
real large cover form (browser-window frame over the shot) under an "Artifact
cover" label in Organisms, and wired its Open button (and a click on the
cover) to actually open the artifact in the shared Lightbox, matching the
case study. Added a placeholder screenshot (a skeleton-UI SVG data URI) so the
cover, collage, and showcase render a real image instead of an empty gradient
frame. Cut the flavour text everywhere: tier headings lost their prose notes
(just the eyebrow + title now), the header intro dropped to one line, and
every component specimen label is now just the component name (Chat turns,
Persona card, Composer…) instead of a sentence describing it.

### 99. One artifact gallery, not two that look the same
**Changed:** In the Design System, the Artifact collage and Artifact showcase
demos rendered as near-identical grids of browser windows, so the collage was
dropped and only the Artifact showcase remains (its placeholder blocks and the
now-unused `demo.blocks` went with it). Kept the showcase to desktop windows,
no phone twins, since the phone-shot presentation read as weird.
**Notes:** The snowy phone screenshot that surfaced this was a real atmos-ui
case-study shot in the Lightbox, not the Design System (which is placeholder
only). The showcase still owns its own Lightbox zoom.

### 100. Widen the Design System page to match the content width
**Changed:** The Design System body was max-w-5xl px-4 sm:px-8, narrower than
the Chat and Case Study pages (max-w-6xl px-3 sm:px-6), which read as extra
left/right padding. Matched it to the wide content width.
**Notes:** Profile and the Case Studies list still use max-w-5xl; say the word
if you want those widened too.

### 101. Persist the open case study (and every view) across refresh
**Changed:** The current view and open case study now live in the URL hash
(#/case-studies/<id>, #/design-system, #/profile, #/ for chat), read on load
and kept in sync as you navigate, so a refresh restores where you were instead
of dropping back to chat. Back/forward buttons follow it too, and a case study
is now a shareable link. A hash pointing at a project that no longer exists
falls back to the case studies list.
**Notes:** Hash-based on purpose: the site is a static GitHub Pages SPA with a
404-to-root redirect, and hashes keep the path at "/", so shared links never
hit the 404 fallback and no server routing is needed.
