import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import SectionTopBar from "./components/SectionTopBar";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import PromptChips from "./components/PromptChips";
import ProjectsView from "./components/ProjectsView";
import CaseStudyView from "./components/CaseStudyView";
import DesignSystemView from "./components/DesignSystemView";
import ProfileView from "./components/ProfileView";
import ConfirmDialog from "./components/ConfirmDialog";
import { useChatEngine } from "./hooks/useChatEngine";
import { useTheme } from "./hooks/useTheme";
import { projects } from "./data/projects";
import { welcomeChips } from "./data/welcome";
import type { AppView, NavChip, Project } from "./types";

/* The current view (and the open case study) lives in the URL hash, so a
   refresh restores where you were instead of dropping back to chat, and a
   case study is a shareable link. Hash-based, so it needs no server routing. */
function parseHash(): { view: AppView; caseStudyId: string | null } {
  const [seg, id] = window.location.hash.replace(/^#\/?/, "").split("/");
  if (seg === "case-studies") return { view: "projects", caseStudyId: id ? decodeURIComponent(id) : null };
  if (seg === "design-system") return { view: "design-system", caseStudyId: null };
  if (seg === "profile") return { view: "profile", caseStudyId: null };
  return { view: "chat", caseStudyId: null };
}

function toHash(view: AppView, caseStudyId: string | null): string {
  if (view === "projects") return caseStudyId ? `#/case-studies/${encodeURIComponent(caseStudyId)}` : "#/case-studies";
  if (view === "design-system") return "#/design-system";
  if (view === "profile") return "#/profile";
  return "#/";
}

export default function App() {
  const { messages, isTyping, sendMessage, retryMessage, clearChat, restoredIds } = useChatEngine();
  const { mode: themeMode, setMode: setThemeMode } = useTheme();

  const [view, setView] = useState<AppView>(() => parseHash().view);
  const [caseStudyId, setCaseStudyId] = useState<string | null>(() => {
    // only restore an id that names a real project; a stale hash falls back to
    // the case studies list, never a broken empty view
    const id = parseHash().caseStudyId;
    return id && projects.some((p) => p.id === id) ? id : null;
  });
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const activeCaseStudy = useMemo(
    () => (caseStudyId ? projects.find((p) => p.id === caseStudyId) ?? null : null),
    [caseStudyId]
  );

  // keep the URL hash in step with the view, and follow the hash back when the
  // browser's back/forward buttons change it
  useEffect(() => {
    const target = toHash(view, caseStudyId);
    if ((window.location.hash || "#/") !== target) window.location.hash = target;
  }, [view, caseStudyId]);

  useEffect(() => {
    const onHashChange = () => {
      const next = parseHash();
      setView(next.view);
      setCaseStudyId(next.caseStudyId && projects.some((p) => p.id === next.caseStudyId) ? next.caseStudyId : null);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // a card in the chat is a doorway to the case study, not a prompt for a
  // summary of it — clicking through goes straight to the real thing.
  const handleProjectLearnMore = useCallback((project: Project) => {
    setView("projects");
    setCaseStudyId(project.id);
  }, []);

  // a real conversation deserves the app's own dialog, not a "localhost says"
  // browser alert — a fresh chat (welcome only) just clears without asking
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);
  const handleClear = useCallback(() => {
    if (messages.length > 1) {
      setConfirmClearOpen(true);
      return;
    }
    clearChat();
  }, [messages.length, clearChat]);

  const handleConfirmClear = useCallback(() => {
    setConfirmClearOpen(false);
    clearChat();
  }, [clearChat]);

  const handleSidebarNavigate = useCallback((next: AppView) => {
    setView(next);
    setCaseStudyId(null);
  }, []);

  const handleSidebarOpenCaseStudy = useCallback((projectId: string) => {
    setView("projects");
    setCaseStudyId(projectId);
  }, []);

  const handleChipNavigate = useCallback((chip: NavChip) => {
    setView(chip.view);
    setCaseStudyId(chip.projectId ?? null);
  }, []);

  const cycleCaseStudy = useCallback(
    (direction: 1 | -1) => {
      if (projects.length === 0) return;
      const currentIndex = projects.findIndex((p) => p.id === caseStudyId);
      const safeIndex = currentIndex === -1 ? 0 : currentIndex;
      const nextIndex = (safeIndex + direction + projects.length) % projects.length;
      setCaseStudyId(projects[nextIndex].id);
    },
    [caseStudyId]
  );

  const openMobileNav = () => setMobileNavOpen(true);
  const closeMobileNav = () => setMobileNavOpen(false);

  // suggestions dock above the input, Claude-style, instead of trailing
  // Lola's bubbles. The row always offers four buttons: the latest reply's
  // own chips lead, starter prompts fill the remaining slots (skipping the
  // question that was just asked).
  const suggestions = useMemo(() => {
    const latest = messages[messages.length - 1];
    if (isTyping || latest?.sender !== "cat" || latest.status === "failed") return null;
    const navChips = latest.navChips ?? [];
    const lastAsked = [...messages]
      .reverse()
      .find((m) => m.sender === "user")
      ?.text.trim()
      .toLowerCase();
    const chips = [...(latest.chips ?? [])];
    const have = new Set(chips.map((c) => c.toLowerCase()));
    for (const label of welcomeChips) {
      if (chips.length + navChips.length >= 4) break;
      if (have.has(label.toLowerCase()) || label.toLowerCase() === lastAsked) continue;
      chips.push(label);
      have.add(label.toLowerCase());
    }
    return chips.length + navChips.length > 0 ? { chips, navChips } : null;
  }, [messages, isTyping]);

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-[var(--color-cream-soft)]/40">
      <Sidebar
        view={view}
        caseStudyId={caseStudyId}
        onNavigate={handleSidebarNavigate}
        onOpenCaseStudy={handleSidebarOpenCaseStudy}
        mobileOpen={mobileNavOpen}
        onCloseMobile={closeMobileNav}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
        themeMode={themeMode}
        onThemeChange={setThemeMode}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {view === "chat" && (
          <>
            <Header onClear={handleClear} onOpenMenu={openMobileNav} />
            <ChatWindow
              messages={messages}
              isTyping={isTyping}
              restoredIds={restoredIds}
              onRetry={retryMessage}
              onProjectLearnMore={handleProjectLearnMore}
            />
            {suggestions && (
              <div className="px-3 pb-1 pt-2 sm:px-5">
                <div className="mx-auto max-w-6xl">
                  <PromptChips
                    chips={suggestions.chips}
                    navChips={suggestions.navChips}
                    onSelect={sendMessage}
                    onNavigate={handleChipNavigate}
                  />
                </div>
              </div>
            )}
            <ChatInput onSend={sendMessage} disabled={isTyping} />
          </>
        )}

        {view === "projects" && !activeCaseStudy && (
          <>
            <SectionTopBar title="Case Studies" onOpenMenu={openMobileNav} />
            <div className="scroll-warm min-h-0 flex-1 overflow-y-auto">
              <ProjectsView onOpen={setCaseStudyId} />
            </div>
          </>
        )}

        {view === "projects" && activeCaseStudy && (
          <>
            <SectionTopBar title={activeCaseStudy.title} onOpenMenu={openMobileNav} />
            <div className="min-h-0 flex-1 overflow-hidden">
              <CaseStudyView
                project={activeCaseStudy}
                onBack={() => setCaseStudyId(null)}
                onPrev={() => cycleCaseStudy(-1)}
                onNext={() => cycleCaseStudy(1)}
              />
            </div>
          </>
        )}

        {view === "design-system" && (
          <>
            <SectionTopBar title="Design System" onOpenMenu={openMobileNav} />
            <div className="scroll-warm min-h-0 flex-1 overflow-y-auto">
              <DesignSystemView />
            </div>
          </>
        )}

        {view === "profile" && (
          <>
            <SectionTopBar title="Profile" onOpenMenu={openMobileNav} />
            <div className="scroll-warm min-h-0 flex-1 overflow-y-auto">
              <ProfileView />
            </div>
          </>
        )}
      </div>

      <ConfirmDialog
        open={confirmClearOpen}
        title="Start a new conversation?"
        message="This clears your chat history with Lola. The case studies and profile stay right where they are."
        confirmLabel="Restart chat"
        onConfirm={handleConfirmClear}
        onCancel={() => setConfirmClearOpen(false)}
      />
    </div>
  );
}
