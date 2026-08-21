import CatAvatar from "./CatAvatar";

export default function TypingIndicator() {
  return (
    <div className="flex animate-pop-in items-end gap-1" aria-hidden="true">
      {/* full sitting cat, matching the avatar column of every chat message */}
      <CatAvatar size={45} variant="sitting" typing />
      {/* unboxed like every Lola turn — just the dots, straight on the page */}
      <div className="flex items-center gap-1 px-1 py-3">
        <span className="h-1.5 w-1.5 animate-bounce-dot rounded-full bg-[var(--color-rose)]" style={{ animationDelay: "0ms" }} />
        <span className="h-1.5 w-1.5 animate-bounce-dot rounded-full bg-[var(--color-rose)]" style={{ animationDelay: "150ms" }} />
        <span className="h-1.5 w-1.5 animate-bounce-dot rounded-full bg-[var(--color-rose)]" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}
