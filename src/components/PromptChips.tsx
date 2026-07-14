interface PromptChipsProps {
  chips: string[];
  onSelect: (label: string) => void;
  disabled?: boolean;
}

export default function PromptChips({ chips, onSelect, disabled }: PromptChipsProps) {
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 pt-1" role="group" aria-label="Suggested questions">
      {chips.map((chip) => (
        <button
          key={chip}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(chip)}
          className="rounded-full border border-[var(--color-rose)]/50 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-[var(--color-rose-dark)] shadow-sm transition hover:bg-[var(--color-blush)] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-rose-dark)]"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
