import { useEffect, useRef, useState } from "react";
import type { ChatMessage, Project } from "../types";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

interface ChatWindowProps {
  messages: ChatMessage[];
  isTyping: boolean;
  onChipSelect: (label: string) => void;
  onRetry: (id: string) => void;
  onProjectLearnMore: (project: Project) => void;
  inputDisabled: boolean;
}

const BOTTOM_THRESHOLD = 96;

export default function ChatWindow({
  messages,
  isTyping,
  onChipSelect,
  onRetry,
  onProjectLearnMore,
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
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="scroll-warm h-full overflow-y-auto px-3 py-4 sm:px-6"
      >
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          {messages.length === 0 && !isTyping && (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 py-16 text-center text-[var(--color-ink-soft)]">
              <p className="text-sm">Waking Latte up… 🐾</p>
            </div>
          )}
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              onChipSelect={onChipSelect}
              onRetry={onRetry}
              onProjectLearnMore={onProjectLearnMore}
              inputDisabled={inputDisabled}
            />
          ))}
          {isTyping && <TypingIndicator />}
        </div>
      </div>

      <div className="sr-only" role="status" aria-live="polite">
        {isTyping
          ? "Latte is typing"
          : latestMessage?.sender === "cat"
            ? latestMessage.text
            : ""}
      </div>

      {!pinnedToBottom && (
        <button
          type="button"
          onClick={() => scrollToBottom()}
          className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-[var(--color-rose)] px-4 py-1.5 text-xs font-semibold text-white shadow-md transition hover:bg-[var(--color-rose-deep)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-rose-dark)]"
        >
          {unseenCount > 0 ? `${unseenCount} new message${unseenCount > 1 ? "s" : ""}` : "Jump to latest"}
          <span aria-hidden="true">↓</span>
        </button>
      )}
    </div>
  );
}
