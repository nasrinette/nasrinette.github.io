import { Moon, Sun } from "lucide-react";
import type { ThemeMode } from "../hooks/useTheme";

interface ThemeToggleProps {
  mode: ThemeMode;
  onChange: (mode: ThemeMode) => void;
  /** Stacks the two segments for narrow homes like the collapsed rail. */
  vertical?: boolean;
}

/* The segmented two-state control: both modes visible, the active one lit.
   Light and dark only — the system preference just picks the starting mode
   on a first visit. */
const OPTIONS: { mode: ThemeMode; label: string; icon: typeof Sun }[] = [
  { mode: "light", label: "Light theme", icon: Sun },
  { mode: "dark", label: "Dark theme", icon: Moon },
];

export default function ThemeToggle({ mode, onChange, vertical = false }: ThemeToggleProps) {
  // one pill slides between the two segments instead of each lighting on its
  // own, so switching theme reads as a single moving control. 28px segment +
  // 2px gap = 30px per slot.
  const activeIndex = Math.max(0, OPTIONS.findIndex((o) => o.mode === mode));
  const slide = `${activeIndex * 30}px`;
  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={`relative flex gap-0.5 rounded-[var(--radius-md)] border border-[var(--color-blush-deep)] bg-[var(--color-cream)] p-0.5 ${
        vertical ? "flex-col" : ""
      }`}
    >
      <span
        aria-hidden="true"
        className="btn-pastel is-active pointer-events-none absolute left-0.5 top-0.5 h-7 w-7"
        style={{
          transform: vertical ? `translateY(${slide})` : `translateX(${slide})`,
          transition: "transform 300ms cubic-bezier(0.34, 1.4, 0.64, 1)",
        }}
      />
      {OPTIONS.map(({ mode: optionMode, label, icon: Icon }) => {
        const active = mode === optionMode;
        return (
          <button
            key={optionMode}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => onChange(optionMode)}
            className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)] transition-colors ${
              active
                ? "text-[var(--color-btn-line)]"
                : "text-[var(--color-ink-soft)] hover:text-[var(--color-rose-dark)]"
            }`}
          >
            <Icon size={14} strokeWidth={2} aria-hidden="true" className={active ? "animate-theme-pop" : ""} />
          </button>
        );
      })}
    </div>
  );
}
