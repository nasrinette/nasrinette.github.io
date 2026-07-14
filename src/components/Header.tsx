import CatAvatar from "./CatAvatar";
import { catName, profile } from "../data/profile";

export default function Header({ onClear }: { onClear: () => void }) {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-[var(--color-blush-deep)]/50 bg-white/50 px-4 py-3 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-3 min-w-0">
        <CatAvatar size={38} />
        <div className="min-w-0">
          <h1 className="truncate font-[var(--font-display)] text-sm font-bold text-[var(--color-ink)] sm:text-base">
            {catName} · {profile.name}'s portfolio
          </h1>
          <p className="flex items-center gap-1.5 truncate text-[11px] text-[var(--color-ink-soft)]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            {profile.role}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onClear}
        className="shrink-0 rounded-full border border-[var(--color-blush-deep)] px-3 py-1.5 text-xs font-medium text-[var(--color-ink-soft)] transition hover:bg-[var(--color-blush)] hover:text-[var(--color-rose-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-rose-dark)]"
        aria-label="Clear conversation and start over"
      >
        Restart chat
      </button>
    </header>
  );
}
