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
