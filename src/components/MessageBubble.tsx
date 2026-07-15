import { RotateCcw } from "lucide-react";
import type { ChatMessage, NavChip, Project } from "../types";
import BubbleCat, { PERCH_CLEARANCE, pickPerch } from "./BubbleCat";
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
  // Sometimes Lola climbs onto one of her own bubbles; stable per message.
  const perch = !isUser && message.status !== "failed" ? pickPerch(message.id) : null;

  if (message.status === "failed") {
    return (
      <div className="flex animate-pop-in items-end gap-2">
        <CatAvatar size={30} />
        <div className="max-w-[80%] space-y-2 rounded-[var(--radius-ui)] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
          <p>{message.text}</p>
          <button
            type="button"
            onClick={() => onRetry(message.id)}
            className="btn-pastel flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
          >
            <RotateCcw size={12} strokeWidth={2} aria-hidden="true" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex animate-pop-in flex-col gap-1.5 ${isUser ? "items-end" : "items-start"}`}
      style={perch ? { marginTop: PERCH_CLEARANCE[perch] } : undefined}
    >
      <div className={`flex min-w-0 max-w-[85%] items-end gap-2 sm:max-w-[75%] ${isUser ? "flex-row-reverse" : ""}`}>
        {/* when Lola has climbed onto the bubble she leaves her avatar spot */}
        {!isUser && (perch ? <div className="w-[30px] shrink-0" aria-hidden="true" /> : <CatAvatar size={30} />)}
        <div
          className={
            isUser
              ? "bubble-sunset min-w-0 px-4 py-2.5 text-sm"
              : "relative min-w-0 rounded-[var(--radius-ui)] border border-[var(--color-blush-deep)]/60 bg-[var(--color-cream-soft)] px-4 py-2.5 text-sm text-[var(--color-ink)] shadow-sm"
          }
        >
          {perch && <BubbleCat pose={perch} />}
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
              className="btn-pastel px-3 py-1.5 font-[var(--font-display)] text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-rose-dark)]"
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
