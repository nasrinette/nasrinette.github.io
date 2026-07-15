import { RotateCcw } from "lucide-react";
import type { ChatMessage, NavChip, Project } from "../types";
import CatAvatar from "./CatAvatar";
import RichText from "./RichText";
import PromptChips from "./PromptChips";
import ProjectCarousel from "./ProjectCarousel";
import ContactCard from "./ContactCard";

interface MessageBubbleProps {
  message: ChatMessage;
  onChipSelect: (label: string) => void;
  onRetry: (id: string) => void;
  onProjectLearnMore: (project: Project) => void;
  onNavigate: (chip: NavChip) => void;
  inputDisabled: boolean;
}

function formatTime(ts: number): string {
  try {
    return new Date(ts).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  } catch {
    return "";
  }
}

export default function MessageBubble({
  message,
  onChipSelect,
  onRetry,
  onProjectLearnMore,
  onNavigate,
  inputDisabled,
}: MessageBubbleProps) {
  const isUser = message.sender === "user";

  if (message.status === "failed") {
    return (
      <div className="flex animate-pop-in items-end gap-2">
        <CatAvatar size={30} />
        <div className="max-w-[80%] space-y-2 rounded-lg rounded-bl-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
          <p>{message.text}</p>
          <button
            type="button"
            onClick={() => onRetry(message.id)}
            className="flex items-center gap-1.5 rounded-md bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700 transition hover:bg-red-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 dark:bg-red-900/50 dark:text-red-200 dark:hover:bg-red-900"
          >
            <RotateCcw size={12} strokeWidth={2} aria-hidden="true" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex animate-pop-in flex-col gap-1.5 ${isUser ? "items-end" : "items-start"}`}>
      <div className={`flex min-w-0 max-w-[85%] items-end gap-2 sm:max-w-[75%] ${isUser ? "flex-row-reverse" : ""}`}>
        {!isUser && <CatAvatar size={30} />}
        <div
          className={
            isUser
              ? "min-w-0 rounded-lg rounded-br-sm bg-gradient-to-br from-[var(--color-rose)] to-[var(--color-rose-deep)] px-4 py-2.5 text-sm text-white shadow-sm"
              : "min-w-0 rounded-lg rounded-bl-sm border border-[var(--color-blush-deep)]/60 bg-[var(--color-cream-soft)] px-4 py-2.5 text-sm text-[var(--color-ink)] shadow-sm"
          }
        >
          {message.text && <RichText text={message.text} />}
          {message.rich?.kind === "projects" && (
            <div className="mt-3">
              <ProjectCarousel onLearnMore={onProjectLearnMore} />
            </div>
          )}
          {message.rich?.kind === "contact" && (
            <div className="mt-3">
              <ContactCard />
            </div>
          )}
        </div>
      </div>
      <span
        className={`px-1 font-[var(--font-mono)] text-[10px] text-[var(--color-ink-soft)]/70 ${isUser ? "mr-1" : "ml-9"}`}
      >
        {formatTime(message.createdAt)}
      </span>
      {message.chips && message.chips.length > 0 && (
        <div className={isUser ? "mr-1" : "ml-9"}>
          <PromptChips chips={message.chips} onSelect={onChipSelect} disabled={inputDisabled} />
        </div>
      )}
      {message.navChips && message.navChips.length > 0 && (
        <div className={`flex flex-wrap gap-2 ${isUser ? "mr-1" : "ml-9"}`}>
          {message.navChips.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => onNavigate(chip)}
              className="rounded-md border border-[var(--color-gold)]/40 bg-[var(--color-gold-soft)]/30 px-3 py-1.5 text-xs font-semibold text-[var(--color-rose-dark)] transition hover:bg-[var(--color-gold-soft)]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-rose-dark)]"
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
