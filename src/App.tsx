import { useCallback, useMemo, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import SectionTopBar from "./components/SectionTopBar";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import ProjectsView from "./components/ProjectsView";
import CaseStudyView from "./components/CaseStudyView";
import DesignSystemView from "./components/DesignSystemView";
import ProfileView from "./components/ProfileView";
import { useChatEngine } from "./hooks/useChatEngine";
import { useTheme } from "./hooks/useTheme";
import { projects } from "./data/projects";
import type { AppView, NavChip, Project } from "./types";

export default function App() {
  const { messages, isTyping, sendMessage, requestProjectDetail, retryMessage, clearChat } =
    useChatEngine();
  const { mode: themeMode, setMode: setThemeMode } = useTheme();

  const [view, setView] = useState<AppView>("chat");
  const [caseStudyId, setCaseStudyId] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const activeCaseStudy = useMemo(
    () => (caseStudyId ? projects.find((p) => p.id === caseStudyId) ?? null : null),
    [caseStudyId]
  );

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

  const handleSidebarNavigate = useCallback((next: AppView) => {
    setView(next);
    setCaseStudyId(null);
  }, []);

  const handleChipNavigate = useCallback((chip: NavChip) => {
    setView(chip.view);
    setCaseStudyId(chip.projectId ?? null);
  }, []);

  const handleAskLolaAboutProject = useCallback(
    (project: Project) => {
      setView("chat");
      requestProjectDetail(project.id, project.title);
    },
    [requestProjectDetail]
  );

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

  return (
    <div className="flex h-[100dvh] w-full overflow-hidden bg-[var(--color-cream-soft)]/40">
      <Sidebar
        view={view}
        onNavigate={handleSidebarNavigate}
        mobileOpen={mobileNavOpen}
        onCloseMobile={closeMobileNav}
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
              onChipSelect={sendMessage}
              onRetry={retryMessage}
              onProjectLearnMore={handleProjectLearnMore}
              onNavigate={handleChipNavigate}
              inputDisabled={isTyping}
            />
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
            <div className="scroll-warm min-h-0 flex-1 overflow-y-auto">
              <CaseStudyView
                project={activeCaseStudy}
                onBack={() => setCaseStudyId(null)}
                onPrev={() => cycleCaseStudy(-1)}
                onNext={() => cycleCaseStudy(1)}
                onAskLola={handleAskLolaAboutProject}
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
    </div>
  );
}
