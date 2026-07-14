interface SectionTopBarProps {
  title: string;
  onOpenMenu: () => void;
}

export default function SectionTopBar({ title, onOpenMenu }: SectionTopBarProps) {
  return (
    <div className="flex items-center gap-3 border-b border-[var(--color-blush-deep)]/50 bg-white/60 px-4 py-3 backdrop-blur-sm md:hidden">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Open menu"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--color-ink-soft)] hover:bg-[var(--color-blush)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-rose-dark)]"
      >
        <span aria-hidden="true">☰</span>
      </button>
      <span className="truncate font-[var(--font-display)] text-sm font-bold text-[var(--color-ink)]">
        {title}
      </span>
    </div>
  );
}
