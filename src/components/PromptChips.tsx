import type { NavChip } from "../types";

interface PromptChipsProps {
  chips: string[];
  onSelect: (label: string) => void;
  /** Rendered in the same row, before the question chips — one row, never stacked. */
  navChips?: NavChip[];
  onNavigate?: (chip: NavChip) => void;
  disabled?: boolean;
}

const chipClass =
  "btn-pastel px-3.5 py-1.5 font-[var(--font-display)] text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-rose-dark)]";

export default function PromptChips({ chips, onSelect, navChips = [], onNavigate, disabled }: PromptChipsProps) {
  if (chips.length === 0 && navChips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1" role="group" aria-label="Suggested questions">
      {/* nav chips lead: they continue the thread (open the profile, the case
          study), while question chips start a new one */}
      {navChips.map((chip) => (
        <button key={chip.label} type="button" disabled={disabled} onClick={() => onNavigate?.(chip)} className={chipClass}>
          {chip.label}
        </button>
      ))}
      {chips.map((chip) => (
        <button key={chip} type="button" disabled={disabled} onClick={() => onSelect(chip)} className={chipClass}>
          {chip}
        </button>
      ))}
    </div>
  );
}
