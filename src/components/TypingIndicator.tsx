import CatAvatar from "./CatAvatar";

export default function TypingIndicator() {
  return (
    <div className="flex animate-pop-in items-end gap-2" aria-hidden="true">
      <CatAvatar size={30} typing />
      <div className="flex items-center gap-1 rounded-lg rounded-bl-sm border border-[var(--color-blush-deep)]/60 bg-[var(--color-cream-soft)] px-4 py-3">
        <span className="h-1.5 w-1.5 animate-bounce-dot rounded-full bg-[var(--color-rose)]" style={{ animationDelay: "0ms" }} />
        <span className="h-1.5 w-1.5 animate-bounce-dot rounded-full bg-[var(--color-rose)]" style={{ animationDelay: "150ms" }} />
        <span className="h-1.5 w-1.5 animate-bounce-dot rounded-full bg-[var(--color-rose)]" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}
