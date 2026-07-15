import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowUp } from "lucide-react";
import { MAX_MESSAGE_LENGTH } from "../hooks/useChatEngine";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const trimmed = value.trim();
  const isEmpty = trimmed.length === 0;
  const nearLimit = value.length >= MAX_MESSAGE_LENGTH - 40;
  const atLimit = value.length >= MAX_MESSAGE_LENGTH;

  const resize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  const submit = () => {
    if (disabled || isEmpty) return;
    onSend(trimmed);
    setValue("");
    requestAnimationFrame(resize);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    } else if (e.key === "Escape") {
      setValue("");
    }
  };

  return (
    <div className="border-t border-[var(--color-blush-deep)]/60 bg-[var(--color-cream-soft)]/70 px-3 py-3 backdrop-blur-sm sm:px-5">
      <div className="mx-auto flex max-w-4xl items-end gap-2">
        <div className="flex-1 rounded-[var(--radius-ui)] border border-[var(--color-blush-deep)] bg-[var(--color-cream-soft)] px-3.5 py-2.5 focus-within:border-[var(--color-rose)]">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => {
              setValue(e.target.value.slice(0, MAX_MESSAGE_LENGTH));
              resize();
            }}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            rows={1}
            maxLength={MAX_MESSAGE_LENGTH}
            placeholder={disabled ? "Lola is typing…" : "Ask about projects, process, contact…"}
            aria-label="Message"
            className="max-h-[120px] w-full resize-none bg-transparent text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)]/60 focus:outline-none disabled:cursor-not-allowed"
          />
          {nearLimit && (
            <div
              className={`mt-1 text-right text-[10px] ${atLimit ? "text-red-500" : "text-[var(--color-ink-soft)]"}`}
              aria-live="polite"
            >
              {value.length}/{MAX_MESSAGE_LENGTH}
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={submit}
          disabled={disabled || isEmpty}
          aria-label="Send message"
          className="btn-pastel flex h-10 w-10 shrink-0 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-rose-dark)]"
        >
          <ArrowUp size={18} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
      <p className="mx-auto mt-2 max-w-4xl text-center text-[10px] text-[var(--color-ink-soft)]/60">
        {"Lola is a scripted guide, not a real AI — replies are pre-written by "}
        Elena.
      </p>
    </div>
  );
}
