import { useCallback } from "react";
import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import { useChatEngine } from "./hooks/useChatEngine";
import type { Project } from "./types";

export default function App() {
  const { messages, isTyping, sendMessage, requestProjectDetail, retryMessage, clearChat } =
    useChatEngine();

  const handleProjectLearnMore = useCallback(
    (project: Project) => {
      requestProjectDetail(project.id, project.title);
    },
    [requestProjectDetail]
  );

  const handleClear = useCallback(() => {
    if (messages.length > 1 && !window.confirm("Start a new conversation? This clears your chat history.")) {
      return;
    }
    clearChat();
  }, [messages.length, clearChat]);

  return (
    <div className="mx-auto flex h-[100dvh] max-w-3xl flex-col bg-[var(--color-cream-soft)]/40 sm:my-0 sm:shadow-xl md:my-4 md:h-[calc(100dvh-2rem)] md:rounded-3xl md:border md:border-[var(--color-blush-deep)]/40">
      <Header onClear={handleClear} />
      <ChatWindow
        messages={messages}
        isTyping={isTyping}
        onChipSelect={sendMessage}
        onRetry={retryMessage}
        onProjectLearnMore={handleProjectLearnMore}
        inputDisabled={isTyping}
      />
      <ChatInput onSend={sendMessage} disabled={isTyping} />
    </div>
  );
}
