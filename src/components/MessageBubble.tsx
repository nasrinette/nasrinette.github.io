import { RotateCcw } from "lucide-react";
import type { ChatMessage, Project } from "../types";
import BubbleCat, { PERCH_CLEARANCE, pickPerch } from "./BubbleCat";
import CatAvatar from "./CatAvatar";
import RichText, { StreamingText } from "./RichText";
import ProjectCarousel from "./ProjectCarousel";
import { ContactIcons } from "./ContactCard";

// suggestion chips are not rendered here: they dock above the chat input
// (see App), the way Claude offers suggested replies
interface MessageBubbleProps {
  message: ChatMessage;
  /** Stream the text in word by word, like Lola is generating it live. */
  stream?: boolean;
  /** The chat's opening message never gets a bubble perch: Lola greets
      from her avatar spot. */
  opening?: boolean;
  onRetry: (id: string) => void;
  onProjectLearnMore: (project: Project) => void;
}

function formatTime(ts: number): string {
  try {
    return new Date(ts).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  } catch {
    return "";
  }
}

export default function MessageBubble({ message, stream = false, opening = false, onRetry, onProjectLearnMore }: MessageBubbleProps) {
  const isUser = message.sender === "user";
  // Sometimes Lola climbs onto one of her own bubbles; stable per message.
  // Never on the opening message: there she greets from her avatar spot.
  const perch = !isUser && message.status !== "failed" && !opening ? pickPerch(message.id) : null;

  if (message.status === "failed") {
    return (
      <div className="flex animate-pop-in items-end gap-1">
        <CatAvatar size={45} variant="sitting" />
        <div className="max-w-[80%] space-y-2 rounded-[var(--radius-ui)] border border-red-200 bg-red-50 px-4 py-3 text-base text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200">
          <p>{message.text}</p>
          <button
            type="button"
            onClick={() => onRetry(message.id)}
            className="btn-pastel flex items-center gap-1.5 px-2.5 py-1 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
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
      {/* gap-1 only: the sitting art carries transparent canvas padding of
          its own, so a wider flex gap reads as a hole between cat and text */}
      <div className={`flex min-w-0 max-w-[85%] items-end gap-1 sm:max-w-[75%] ${isUser ? "flex-row-reverse" : ""}`}>
        {/* the avatar column is always reserved so message content lines up
            across turns; when Lola climbs onto a bubble her spot stays as
            an empty spacer */}
        {!isUser &&
          (perch ? <div className="w-[45px] shrink-0" aria-hidden="true" /> : <CatAvatar size={45} variant="sitting" />)}
        <div
          className={
            isUser
              ? "bubble-sunset min-w-0 px-4 py-2.5 text-base"
              : // Lola speaks straight onto the page, the way Claude does —
                // only the user's turn keeps a bubble
                "relative min-w-0 py-1 text-base text-[var(--text)]"
          }
        >
          {perch && <BubbleCat pose={perch} />}
          {message.text && (stream ? <StreamingText text={message.text} /> : <RichText text={message.text} />)}
          {message.rich?.kind === "projects" && (
            <div className="mt-3">
              <ProjectCarousel onLearnMore={onProjectLearnMore} />
            </div>
          )}
          {message.rich?.kind === "contact" && (
            <div className="mt-3">
              <ContactIcons size="lg" />
            </div>
          )}
        </div>
      </div>
      {/* 45px + the span's own px-1 lands the timestamp exactly on the
          content edge (45px avatar column + 4px gap), perch or not */}
      <span
        className={`px-1 font-[var(--font-mono)] text-[12px] text-[var(--text-secondary)]/70 ${isUser ? "mr-1" : "ml-[45px]"}`}
      >
        {formatTime(message.createdAt)}
      </span>
    </div>
  );
}
