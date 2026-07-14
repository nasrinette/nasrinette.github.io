import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatMessage } from "../types";
import { matchIntent } from "../data/matchIntent";
import {
  aboutResponse,
  contactResponse,
  designSystemResponse,
  errorEasterEgg,
  fallbackResponse,
  funResponse,
  greetingResponse,
  identityResponse,
  meowResponse,
  processResponse,
  projectDetailResponse,
  projectsResponse,
  skillsResponse,
  thanksResponse,
  type ResponseContent,
} from "../data/responses";
import { welcomeChips, welcomeText } from "../data/welcome";

export const MAX_MESSAGE_LENGTH = 500;
const STORAGE_KEY = "ai-portfolio-chat-v1";

let idCounter = 0;
function makeId(prefix: string): string {
  idCounter += 1;
  return `${prefix}-${Date.now()}-${idCounter}`;
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function isValidHistory(value: unknown): value is ChatMessage[] {
  return (
    Array.isArray(value) &&
    value.every(
      (m) =>
        m &&
        typeof m === "object" &&
        typeof m.id === "string" &&
        (m.sender === "cat" || m.sender === "user") &&
        typeof m.text === "string"
    )
  );
}

function loadHistory(): ChatMessage[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return isValidHistory(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function saveHistory(messages: ChatMessage[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // storage unavailable (private mode, quota, disabled) — fail silently
  }
}

function buildReply(userText: string, forceSuccess: boolean): { content: ResponseContent; failed: boolean } {
  const intent = matchIntent(userText);

  if (intent.type === "error-demo" && !forceSuccess) {
    return { content: errorEasterEgg(), failed: true };
  }

  switch (intent.type) {
    case "prompt": {
      switch (intent.id) {
        case "about":
          return { content: aboutResponse(), failed: false };
        case "projects":
          return { content: projectsResponse(), failed: false };
        case "process":
          return { content: processResponse(), failed: false };
        case "skills":
          return { content: skillsResponse(), failed: false };
        case "design-system":
          return { content: designSystemResponse(), failed: false };
        case "contact":
          return { content: contactResponse(), failed: false };
        case "fun":
          return { content: funResponse(), failed: false };
        default:
          return { content: fallbackResponse(), failed: false };
      }
    }
    case "project":
      return { content: projectDetailResponse(intent.id), failed: false };
    case "greeting":
      return { content: greetingResponse(), failed: false };
    case "thanks":
      return { content: thanksResponse(), failed: false };
    case "identity":
      return { content: identityResponse(), failed: false };
    case "meow":
      return { content: meowResponse(), failed: false };
    case "error-demo":
      return { content: errorEasterEgg(), failed: false };
    case "fallback":
    default:
      return { content: fallbackResponse(), failed: false };
  }
}

function replyDelay(text: string): number {
  return clamp(450 + text.length * 18, 550, 2200);
}

export function useChatEngine() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [booted, setBooted] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPendingTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const queueAssistantReply = useCallback((userText: string, opts?: { forceSuccess?: boolean }) => {
    setIsTyping(true);
    clearPendingTimeout();
    timeoutRef.current = setTimeout(() => {
      const { content, failed } = buildReply(userText, Boolean(opts?.forceSuccess));
      const assistantMsg: ChatMessage = {
        id: makeId("cat"),
        sender: "cat",
        text: content.text,
        createdAt: Date.now(),
        status: failed ? "failed" : "sent",
        rich: content.rich,
        chips: content.chips,
        navChips: content.navChips,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
      timeoutRef.current = null;
    }, replyDelay(userText));
  }, []);

  // boot: restore history or show welcome message
  useEffect(() => {
    const restored = loadHistory();
    if (restored && restored.length > 0) {
      setMessages(restored);
      const last = restored[restored.length - 1];
      if (last.sender === "user") {
        queueAssistantReply(last.text);
      }
      setBooted(true);
      return;
    }
    setIsTyping(true);
    const t = setTimeout(() => {
      setMessages([
        {
          id: makeId("cat"),
          sender: "cat",
          text: welcomeText(),
          createdAt: Date.now(),
          status: "sent",
          chips: welcomeChips,
        },
      ]);
      setIsTyping(false);
      setBooted(true);
    }, 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // persist on change, but only after initial boot resolves to avoid
  // overwriting stored history with an empty array during the load flash
  useEffect(() => {
    if (!booted) return;
    saveHistory(messages);
  }, [messages, booted]);

  useEffect(() => clearPendingTimeout, []);

  const sendMessage = useCallback(
    (raw: string) => {
      if (isTyping) return;
      const text = raw.trim().slice(0, MAX_MESSAGE_LENGTH);
      if (!text) return;
      const userMsg: ChatMessage = {
        id: makeId("user"),
        sender: "user",
        text,
        createdAt: Date.now(),
        status: "sent",
      };
      setMessages((prev) => [...prev, userMsg]);
      queueAssistantReply(text);
    },
    [isTyping, queueAssistantReply]
  );

  const requestProjectDetail = useCallback(
    (projectId: string, projectTitle: string) => {
      if (isTyping) return;
      const userMsg: ChatMessage = {
        id: makeId("user"),
        sender: "user",
        text: `Tell me more about ${projectTitle}`,
        createdAt: Date.now(),
        status: "sent",
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsTyping(true);
      clearPendingTimeout();
      timeoutRef.current = setTimeout(() => {
        const content = projectDetailResponse(projectId);
        setMessages((prev) => [
          ...prev,
          {
            id: makeId("cat"),
            sender: "cat",
            text: content.text,
            createdAt: Date.now(),
            status: "sent",
            chips: content.chips,
            navChips: content.navChips,
          },
        ]);
        setIsTyping(false);
        timeoutRef.current = null;
      }, replyDelay(projectTitle));
    },
    [isTyping]
  );

  const retryMessage = useCallback(
    (failedMessageId: string) => {
      let sourceText: string | null = null;
      setMessages((prev) => {
        const idx = prev.findIndex((m) => m.id === failedMessageId);
        if (idx === -1) return prev;
        // the user message immediately preceding the failed reply
        for (let i = idx - 1; i >= 0; i -= 1) {
          if (prev[i].sender === "user") {
            sourceText = prev[i].text;
            break;
          }
        }
        return prev.filter((m) => m.id !== failedMessageId);
      });
      if (sourceText) {
        queueAssistantReply(sourceText, { forceSuccess: true });
      }
    },
    [queueAssistantReply]
  );

  const clearChat = useCallback(() => {
    clearPendingTimeout();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setIsTyping(true);
    setMessages([]);
    setTimeout(() => {
      setMessages([
        {
          id: makeId("cat"),
          sender: "cat",
          text: welcomeText(),
          createdAt: Date.now(),
          status: "sent",
          chips: welcomeChips,
        },
      ]);
      setIsTyping(false);
    }, 500);
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    requestProjectDetail,
    retryMessage,
    clearChat,
  };
}
