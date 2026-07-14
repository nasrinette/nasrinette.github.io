import CatAvatar from "./CatAvatar";

export default function TypingIndicator() {
  return (
    <div className="flex animate-pop-in items-end gap-2" aria-hidden="true">
      <CatAvatar size={32} typing />
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white/80 px-4 py-3 shadow-sm">
        <span className="h-1.5 w-1.5 animate-bounce-dot rounded-full bg-[var(--color-rose)]" style={{ animationDelay: "0ms" }} />
        <span className="h-1.5 w-1.5 animate-bounce-dot rounded-full bg-[var(--color-rose)]" style={{ animationDelay: "150ms" }} />
        <span className="h-1.5 w-1.5 animate-bounce-dot rounded-full bg-[var(--color-rose)]" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}
