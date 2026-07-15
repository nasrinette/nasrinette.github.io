import { colorTokens, principles, radiusScale, spacingScale, typeScale } from "../data/designSystem";
import CatAvatar from "./CatAvatar";

export default function DesignSystemView() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8 sm:py-12">
      <header className="mb-10 space-y-2">
        <h1 className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-ink)] sm:text-3xl">
          Design system
        </h1>
        <p className="max-w-xl text-sm text-[var(--color-ink-soft)]">
          This chat interface is itself a small design system. Here's what it's built from — colors, type,
          spacing, and the principles behind them.
        </p>
      </header>

      <section className="mb-10">
        <h2 className="mb-3 font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)]">Color</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {colorTokens.map((c) => (
            <div
              key={c.varName}
              className="overflow-hidden rounded-lg border border-[var(--color-blush-deep)]/60 bg-[var(--color-cream-soft)]"
            >
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

      <section className="mb-10">
        <h2 className="mb-3 font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)]">Typography</h2>
        <div className="divide-y divide-[var(--color-blush-deep)]/50 rounded-lg border border-[var(--color-blush-deep)]/60 bg-[var(--color-cream-soft)]">
          {typeScale.map((t) => (
            <div key={t.name} className="flex items-center gap-4 px-4 py-3">
              <span
                className="w-10 shrink-0 text-[var(--color-ink)]"
                style={{
                  fontFamily:
                    t.family === "Manrope"
                      ? "var(--font-display)"
                      : t.family === "JetBrains Mono"
                        ? "var(--font-mono)"
                        : "var(--font-body)",
                  fontWeight: Number(t.weight),
                  fontSize: t.name === "Display" ? 20 : t.name === "Heading" ? 16 : 14,
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

      <section className="mb-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <h2 className="mb-3 font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)]">Spacing</h2>
          <div className="space-y-2 rounded-lg border border-[var(--color-blush-deep)]/60 bg-[var(--color-cream-soft)] p-4">
            {spacingScale.map((s) => (
              <div key={s.token} className="flex items-center gap-3">
                <span className="w-16 shrink-0 font-[var(--font-mono)] text-[11px] text-[var(--color-ink-soft)]">
                  {s.token}
                </span>
                <span className="block h-3 rounded-sm bg-[var(--color-rose)]" style={{ width: s.px }} aria-hidden="true" />
                <span className="font-[var(--font-mono)] text-[11px] text-[var(--color-ink-soft)]">{s.px}px</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-3 font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)]">Radius</h2>
          <div className="space-y-2 rounded-lg border border-[var(--color-blush-deep)]/60 bg-[var(--color-cream-soft)] p-4">
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

      <section className="mb-10">
        <h2 className="mb-3 font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)]">Components</h2>
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-[var(--color-blush-deep)]/60 bg-[var(--color-cream-soft)] p-5">
          <button type="button" className="rounded-md bg-[var(--color-rose)] px-4 py-2 text-sm font-semibold text-white">
            Primary button
          </button>
          <button
            type="button"
            className="rounded-md border border-[var(--color-blush-deep)] px-4 py-2 text-sm font-medium text-[var(--color-ink)]"
          >
            Secondary button
          </button>
          <span className="rounded-full border border-[var(--color-rose)]/40 bg-[var(--color-cream-soft)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-rose-dark)]">
            Suggestion chip
          </span>
          <span className="rounded-full bg-[var(--color-paw)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-rose-dark)]">
            Tag
          </span>
          <CatAvatar size={30} />
          <div className="rounded-lg rounded-bl-sm border border-[var(--color-blush-deep)]/60 bg-[var(--color-cream-soft)] px-4 py-2.5 text-sm text-[var(--color-ink)]">
            Assistant bubble
          </div>
          <div className="rounded-lg rounded-br-sm bg-gradient-to-br from-[var(--color-rose)] to-[var(--color-rose-deep)] px-4 py-2.5 text-sm text-white">
            User bubble
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)]">Principles</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="rounded-lg border border-[var(--color-blush-deep)]/60 bg-[var(--color-cream-soft)] p-4">
              <p className="text-sm font-bold text-[var(--color-ink)]">{p.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--color-ink-soft)]">{p.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
