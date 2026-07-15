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
          className="btn-pastel px-3.5 py-1.5 font-[var(--font-display)] text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-rose-dark)]"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
