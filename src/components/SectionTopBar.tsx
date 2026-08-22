import { Menu } from "lucide-react";

interface SectionTopBarProps {
  title: string;
  onOpenMenu: () => void;
}

export default function SectionTopBar({ title, onOpenMenu }: SectionTopBarProps) {
  return (
    <div className="flex items-center gap-3 border-b border-[var(--border)]/60 bg-[var(--surface)]/70 px-4 py-3 backdrop-blur-sm md:hidden print:hidden">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Open menu"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-ui)] text-[var(--text-secondary)] hover:bg-[var(--hover-fill)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-emphasis)]"
      >
        <Menu size={18} strokeWidth={1.75} aria-hidden="true" />
      </button>
      <span className="truncate font-[var(--font-display)] text-base font-bold text-[var(--text)]">
        {title}
      </span>
    </div>
  );
}
