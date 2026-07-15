import type { ReactNode } from "react";
import {
  colorTokens,
  elevationScale,
  gradientTokens,
  principles,
  radiusScale,
  spacingScale,
  typeScale,
} from "../data/designSystem";
import CatAvatar from "./CatAvatar";

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <h2 className="font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)]">{children}</h2>
      <span className="sunset-rule flex-1 opacity-40" aria-hidden="true" />
    </div>
  );
}

export default function DesignSystemView() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8 sm:py-12">
      <header className="mb-12 space-y-3">
        <p className="font-[var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-rose-dark)]">
          Sunset · design system
        </p>
        <h1 className="font-[var(--font-display)] text-3xl font-bold text-[var(--color-ink)] sm:text-4xl">
          One horizon, used with intent
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-[var(--color-ink-soft)]">
          This chat interface is itself a small design system — a warm coral-to-gold horizon over dusk
          creams. Here's everything it's built from: gradients, color, type, space, elevation, and the
          principles that hold them together.
        </p>
        <div className="h-24 w-full max-w-md rounded-[var(--radius-lg)] shadow-[var(--shadow-card)]" style={{ background: "var(--gradient-sunset)" }} aria-hidden="true" />
      </header>

      <section className="mb-12">
        <SectionTitle>Gradients</SectionTitle>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {gradientTokens.map((g) => (
            <div key={g.varName} className="card-warm overflow-hidden">
              <div className="h-20" style={{ background: `var(${g.varName})` }} aria-hidden="true" />
              <div className="p-3">
                <p className="text-xs font-bold text-[var(--color-ink)]">{g.name}</p>
                <p className="font-[var(--font-mono)] text-[10px] text-[var(--color-ink-soft)]">{g.css}</p>
                <p className="mt-1 text-[10px] leading-snug text-[var(--color-ink-soft)]">{g.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <SectionTitle>Color</SectionTitle>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {colorTokens.map((c) => (
            <div key={c.varName} className="card-warm overflow-hidden">
              <div className="h-16" style={{ background: `var(${c.varName})` }} aria-hidden="true" />
              <div className="p-3">
                <p className="text-xs font-bold text-[var(--color-ink)]">{c.name}</p>
                <p className="font-[var(--font-mono)] text-[10px] text-[var(--color-ink-soft)]">
                  {c.light} <span className="opacity-50">/</span> {c.dark}
                </p>
                <p className="mt-1 text-[10px] leading-snug text-[var(--color-ink-soft)]">{c.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <SectionTitle>Typography</SectionTitle>
        <div className="card-warm divide-y divide-[var(--color-blush-deep)]/50">
          {typeScale.map((t) => (
            <div key={t.name} className="flex items-center gap-4 px-4 py-3">
              <span
                className="w-10 shrink-0 text-[var(--color-ink)]"
                style={{
                  fontFamily:
                    t.family === "Quicksand"
                      ? "var(--font-display)"
                      : t.family === "JetBrains Mono"
                        ? "var(--font-mono)"
                        : "var(--font-body)",
                  fontWeight: Number(t.weight),
                  fontSize: t.name === "Display" ? 24 : t.name === "Heading" ? 17 : 14,
                }}
              >
                {t.sample}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-[var(--color-ink)]">{t.name}</p>
                <p className="font-[var(--font-mono)] text-[11px] text-[var(--color-ink-soft)]">
                  {t.family} · {t.weight} · {t.size}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <SectionTitle>Spacing</SectionTitle>
          <div className="card-warm space-y-2 p-4">
            {spacingScale.map((s) => (
              <div key={s.token} className="flex items-center gap-3">
                <span className="w-16 shrink-0 font-[var(--font-mono)] text-[11px] text-[var(--color-ink-soft)]">
                  {s.token}
                </span>
                <span
                  className="block h-3 rounded-[var(--radius-sm)]"
                  style={{ width: s.px, background: "var(--gradient-sunset)" }}
                  aria-hidden="true"
                />
                <span className="font-[var(--font-mono)] text-[11px] text-[var(--color-ink-soft)]">{s.px}px</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionTitle>Radius</SectionTitle>
          <div className="card-warm space-y-2 p-4">
            {radiusScale.map((r) => (
              <div key={r.token} className="flex items-center gap-3">
                <span className="w-20 shrink-0 font-[var(--font-mono)] text-[11px] text-[var(--color-ink-soft)]">
                  {r.token}
                </span>
                <span
                  className="block h-6 w-10 border-2 border-[var(--color-rose)]"
                  style={{ borderRadius: Math.min(r.px, 20) }}
                  aria-hidden="true"
                />
                <span className="font-[var(--font-mono)] text-[11px] text-[var(--color-ink-soft)]">
                  {r.px === 999 ? "full" : `${r.px}px`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <SectionTitle>Elevation</SectionTitle>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {elevationScale.map((e) => (
            <div key={e.token} className="text-center">
              <div
                className="mb-3 h-16 rounded-[var(--radius-lg)] bg-[var(--color-cream-soft)]"
                style={{ boxShadow: `var(--${e.token})` }}
                aria-hidden="true"
              />
              <p className="text-xs font-bold text-[var(--color-ink)]">{e.label}</p>
              <p className="mt-0.5 text-[10px] leading-snug text-[var(--color-ink-soft)]">{e.usage}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <SectionTitle>Components</SectionTitle>
        <div className="card-warm flex flex-wrap items-center gap-3 p-5">
          <button type="button" className="btn-pastel px-4 py-2 font-[var(--font-display)] text-sm font-semibold">
            Primary button
          </button>
          <button type="button" className="btn-ghost px-4 py-2 font-[var(--font-display)] text-sm font-semibold">
            Secondary button
          </button>
          <span className="tag-warm px-2.5 py-0.5 text-[11px] font-medium">Tag</span>
          <CatAvatar size={30} />
          <div className="rounded-[var(--radius-ui)] border border-[var(--color-blush-deep)]/60 bg-[var(--color-cream-soft)] px-4 py-2.5 text-sm text-[var(--color-ink)] shadow-[var(--shadow-soft)]">
            Assistant bubble
          </div>
          <div className="bubble-sunset px-4 py-2.5 text-sm">User bubble</div>
        </div>
      </section>

      <section>
        <SectionTitle>Principles</SectionTitle>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="card-warm p-4">
              <p className="text-sm font-bold text-[var(--color-ink)]">{p.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--color-ink-soft)]">{p.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
