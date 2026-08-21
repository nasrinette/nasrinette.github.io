import { Menu, RotateCcw } from "lucide-react";
import CatAvatar from "./CatAvatar";
import { catName, profile } from "../data/profile";

interface HeaderProps {
  onClear: () => void;
  onOpenMenu: () => void;
}

export default function Header({ onClear, onOpenMenu }: HeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-[var(--color-blush-deep)]/60 bg-[var(--color-cream-soft)]/70 px-3 py-3 backdrop-blur-sm sm:px-6">
      <div className="flex min-w-0 items-center gap-2">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open menu"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-ink-soft)] hover:bg-[var(--color-blush)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-rose-dark)] md:hidden"
        >
          <Menu size={18} strokeWidth={1.75} aria-hidden="true" />
        </button>
        <div className="flex min-w-0 items-center gap-3">
          <span className="md:hidden">
            <CatAvatar size={42} />
          </span>
          <div className="min-w-0">
            <h1 className="truncate font-[var(--font-display)] text-base font-bold text-[var(--color-ink)] sm:text-lg">
              {profile.name} <span className="text-[var(--color-ink-soft)]">· {profile.role}</span>
            </h1>
            <p className="flex items-center gap-1.5 truncate text-[13px] text-[var(--color-ink-soft)]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#34c759]" aria-hidden="true" />
              {catName} is online, ask her anything
            </p>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onClear}
        className="btn-pastel flex shrink-0 items-center gap-1.5 px-3 py-1.5 font-[var(--font-display)] text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-rose-dark)]"
        aria-label="Clear conversation and start over"
      >
        <RotateCcw size={13} strokeWidth={1.75} aria-hidden="true" />
        <span className="hidden sm:inline">Restart chat</span>
      </button>
    </header>
  );
}
