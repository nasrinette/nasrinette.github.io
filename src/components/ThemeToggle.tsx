import { Laptop, Moon, Sun } from "lucide-react";
import type { ThemeMode } from "../hooks/useTheme";

interface ThemeToggleProps {
  mode: ThemeMode;
  onChange: (mode: ThemeMode) => void;
}

const OPTIONS: { mode: ThemeMode; label: string; icon: typeof Sun }[] = [
  { mode: "light", label: "Light theme", icon: Sun },
  { mode: "dark", label: "Dark theme", icon: Moon },
  { mode: "system", label: "Match system theme", icon: Laptop },
];

export default function ThemeToggle({ mode, onChange }: ThemeToggleProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="flex items-center gap-0.5 rounded-[var(--radius-md)] border border-[var(--color-blush-deep)] bg-[var(--color-cream)] p-0.5"
    >
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
            className={`flex h-7 w-7 items-center justify-center transition ${
              active
                ? "btn-pastel is-active text-[var(--color-ink)]"
                : "rounded-[var(--radius-md)] text-[var(--color-ink-soft)] hover:bg-[var(--color-blush)] hover:text-[var(--color-rose-dark)]"
            }`}
          >
            <Icon size={14} strokeWidth={2} aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
