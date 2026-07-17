import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import type { ChatMessage, NavChip, Project } from "../types";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import LolaMascot from "./LolaMascot";

interface ChatWindowProps {
  messages: ChatMessage[];
  isTyping: boolean;
  onChipSelect: (label: string) => void;
  onRetry: (id: string) => void;
  onProjectLearnMore: (project: Project) => void;
  onNavigate: (chip: NavChip) => void;
  inputDisabled: boolean;
}

const BOTTOM_THRESHOLD = 96;

export default function ChatWindow({
  messages,
  isTyping,
  onChipSelect,
  onRetry,
  onProjectLearnMore,
  onNavigate,
  inputDisabled,
}: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [pinnedToBottom, setPinnedToBottom] = useState(true);
  const [unseenCount, setUnseenCount] = useState(0);
  const prevMessageCount = useRef(messages.length);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
    setUnseenCount(0);
    setPinnedToBottom(true);
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const atBottom = distanceFromBottom < BOTTOM_THRESHOLD;
    setPinnedToBottom(atBottom);
    if (atBottom) setUnseenCount(0);
  };

  useEffect(() => {
    const grew = messages.length > prevMessageCount.current;
    prevMessageCount.current = messages.length;
    if (!grew) return;
    if (pinnedToBottom) {
      requestAnimationFrame(() => scrollToBottom("smooth"));
    } else {
      setUnseenCount((c) => c + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length]);

  useEffect(() => {
    if (pinnedToBottom) {
      requestAnimationFrame(() => scrollToBottom("smooth"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTyping]);

  const latestMessage = messages[messages.length - 1];

  return (
    <div className="relative flex-1 min-h-0">
      <LolaMascot />
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="scroll-warm relative z-10 h-full overflow-y-auto px-3 py-4 sm:px-6"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-4">
          {messages.length === 0 && !isTyping && (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 py-16 text-center text-[var(--color-ink-soft)]">
              <p className="text-base">Lola is paddling over…</p>
            </div>
          )}
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              onChipSelect={onChipSelect}
              onRetry={onRetry}
              onProjectLearnMore={onProjectLearnMore}
              onNavigate={onNavigate}
              inputDisabled={inputDisabled}
            />
          ))}
          {isTyping && <TypingIndicator />}
        </div>
      </div>

      <div className="sr-only" role="status" aria-live="polite">
        {isTyping
          ? "Lola is typing"
          : latestMessage?.sender === "cat"
            ? latestMessage.text
            : ""}
      </div>

      {!pinnedToBottom && (
        <button
          type="button"
          onClick={() => scrollToBottom()}
          className="btn-pastel absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 px-4 py-1.5 font-[var(--font-display)] text-sm font-semibold shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-rose-dark)]"
        >
          {unseenCount > 0 ? `${unseenCount} new message${unseenCount > 1 ? "s" : ""}` : "Jump to latest"}
          <ArrowDown size={13} strokeWidth={2} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
