import { useEffect, useState } from "react";
import { ChevronDown, Component, FolderKanban, MessageCircle, PanelLeftClose, PanelLeftOpen, User, X } from "lucide-react";
import CatAvatar from "./CatAvatar";
import ThemeToggle from "./ThemeToggle";
import { catName, catTagline } from "../data/profile";
import { projects } from "../data/projects";
import type { ThemeMode } from "../hooks/useTheme";
import type { AppView } from "../types";

interface NavItem {
  id: AppView;
  label: string;
  icon: typeof MessageCircle;
}

const NAV_ITEMS: NavItem[] = [{ id: "chat", label: "Chat", icon: MessageCircle }];

interface SidebarProps {
  view: AppView;
  caseStudyId: string | null;
  onNavigate: (view: AppView) => void;
  onOpenCaseStudy: (projectId: string) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
}

interface SidebarContentProps {
  view: AppView;
  caseStudyId: string | null;
  onNavigate: (v: AppView) => void;
  onOpenCaseStudy: (projectId: string) => void;
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
  /** Desktop-only collapse control; the mobile drawer has its own X. */
  onCollapse?: () => void;
}

function SidebarContent({
  view,
  caseStudyId,
  onNavigate,
  onOpenCaseStudy,
  themeMode,
  onThemeChange,
  onCollapse,
}: SidebarContentProps) {
  const profileActive = view === "profile";
  const caseStudiesActive = view === "projects";
  // the overview grid — the parent item's own destination, as opposed to one of
  // the case studies nested under it
  const onOverview = caseStudiesActive && caseStudyId === null;
  // the list starts closed so the sidebar reads as a short menu; the effect
  // below unfolds it the moment any case-study view becomes active
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);

  // keep the dropdown open while any case-study subtab (or the overview) is active
  useEffect(() => {
    if (caseStudiesActive) setCaseStudiesOpen(true);
  }, [caseStudiesActive]);

  // Case Studies is a destination, not just a disclosure: it always navigates to
  // the overview grid. Only once you're already there does clicking it collapse
  // the list — otherwise opening a case study would strand the grid for good.
  const handleCaseStudiesToggle = () => {
    if (onOverview) {
      setCaseStudiesOpen((open) => !open);
    } else {
      onNavigate("projects");
      setCaseStudiesOpen(true);
    }
  };

  return (
    <>
      {/* the collapse control floats over the name line with minimal padding,
          off the text's row entirely — the tagline keeps one full line */}
      <div className="relative flex items-center gap-2 px-5 pb-5 pt-6">
        <CatAvatar size={32} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-[var(--font-display)] text-base font-bold text-[var(--color-ink)]">
            {catName} <span aria-hidden="true">🐾</span>
          </p>
          <p className="truncate text-[13px] leading-snug text-[var(--color-ink-soft)]">{catTagline}</p>
        </div>
        {onCollapse && (
          <button
            type="button"
            onClick={onCollapse}
            aria-label="Collapse sidebar"
            title="Collapse sidebar"
            className="focus-ring absolute right-2.5 top-5 hidden h-6 w-6 items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-ink-soft)] transition hover:bg-[var(--color-blush)] hover:text-[var(--color-rose-dark)] md:flex"
          >
            <PanelLeftClose size={15} strokeWidth={1.75} aria-hidden="true" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-0.5 px-3" aria-label="Main">
        {NAV_ITEMS.map((item) => {
          const active = view === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={active ? "page" : undefined}
              className={`flex w-full items-center gap-2.5 px-3 py-2 text-left font-[var(--font-display)] text-base font-semibold transition ${
                active
                  ? "rounded-[var(--radius-md)] bg-[var(--color-blush)] text-[var(--color-rose-dark)]"
                  : "rounded-[var(--radius-md)] text-[var(--color-ink-soft)] hover:bg-[var(--color-blush)] hover:text-[var(--color-rose-dark)]"
              }`}
            >
              <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
              {item.label}
            </button>
          );
        })}

        <div>
          <button
            type="button"
            onClick={handleCaseStudiesToggle}
            aria-current={caseStudiesActive ? "page" : undefined}
            aria-expanded={caseStudiesOpen}
            className={`flex w-full items-center gap-2.5 px-3 py-2 text-left font-[var(--font-display)] text-base font-semibold transition ${
              caseStudiesActive
                ? "rounded-[var(--radius-md)] bg-[var(--color-blush)] text-[var(--color-rose-dark)]"
                : "rounded-[var(--radius-md)] text-[var(--color-ink-soft)] hover:bg-[var(--color-blush)] hover:text-[var(--color-rose-dark)]"
            }`}
          >
            <FolderKanban size={16} strokeWidth={1.75} aria-hidden="true" />
            <span className="flex-1">Case Studies</span>
            <ChevronDown
              size={14}
              strokeWidth={2}
              aria-hidden="true"
              className={`shrink-0 transition-transform duration-200 ${caseStudiesOpen ? "rotate-180" : ""}`}
            />
          </button>

          {caseStudiesOpen && (
            <div className="mt-0.5 space-y-0.5 border-l border-[var(--color-blush-deep)]/70 pl-3.5">
              {projects.map((project) => {
                const active = caseStudiesActive && caseStudyId === project.id;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => onOpenCaseStudy(project.id)}
                    aria-current={active ? "page" : undefined}
                    className={`flex w-full items-center gap-2 rounded-[var(--radius-md)] px-2.5 py-1.5 text-left text-[15px] font-medium transition ${
                      active
                        ? "bg-[var(--color-blush)] text-[var(--color-rose-dark)]"
                        : "text-[var(--color-ink-soft)] hover:bg-[var(--color-blush)] hover:text-[var(--color-rose-dark)]"
                    }`}
                  >
                    {/* each study's own mark — gradient + icon, a favicon-sized
                        version of the identity its cards and hero already use */}
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[var(--radius-ui)] shadow-sm"
                      style={{ background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})` }}
                      aria-hidden="true"
                    >
                      <project.icon size={12} strokeWidth={2} style={{ color: "var(--color-on-sunset)" }} />
                    </span>
                    <span className="truncate">{project.title}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => onNavigate("design-system")}
          aria-current={view === "design-system" ? "page" : undefined}
          className={`flex w-full items-center gap-2.5 px-3 py-2 text-left font-[var(--font-display)] text-base font-semibold transition ${
            view === "design-system"
              ? "rounded-[var(--radius-md)] bg-[var(--color-blush)] text-[var(--color-rose-dark)]"
              : "rounded-[var(--radius-md)] text-[var(--color-ink-soft)] hover:bg-[var(--color-blush)] hover:text-[var(--color-rose-dark)]"
          }`}
        >
          <Component size={16} strokeWidth={1.75} aria-hidden="true" />
          Design System
        </button>

        <button
          type="button"
          onClick={() => onNavigate("profile")}
          aria-current={profileActive ? "page" : undefined}
          className={`flex w-full items-center gap-2.5 px-3 py-2 text-left font-[var(--font-display)] text-base font-semibold transition ${
            profileActive
              ? "rounded-[var(--radius-md)] bg-[var(--color-blush)] text-[var(--color-rose-dark)]"
              : "rounded-[var(--radius-md)] text-[var(--color-ink-soft)] hover:bg-[var(--color-blush)] hover:text-[var(--color-rose-dark)]"
          }`}
        >
          <User size={16} strokeWidth={1.75} aria-hidden="true" />
          Profile
        </button>
      </nav>

      {/* flat on the sidebar surface — the stroke separates it, so boxing it
          again would nest a container in a container. The theme switch
          closes the column. */}
      <div className="flex items-center justify-between gap-2 border-t border-[var(--color-blush-deep)]/60 px-5 pb-4 pt-3">
        <span className="text-[13px] font-medium uppercase tracking-wide text-[var(--color-ink-soft)]">
          Theme
        </span>
        <ThemeToggle mode={themeMode} onChange={onThemeChange} />
      </div>
    </>
  );
}

export default function Sidebar({
  view,
  caseStudyId,
  onNavigate,
  onOpenCaseStudy,
  mobileOpen,
  onCloseMobile,
  collapsed,
  onToggleCollapse,
  themeMode,
  onThemeChange,
}: SidebarProps) {
  return (
    <>
      {collapsed ? (
        // the collapsed state is the same sidebar with the words removed:
        // every element keeps its place and its icon, tooltips carry the names
        <div className="hidden w-12 shrink-0 flex-col items-center border-r border-[var(--color-blush-deep)]/60 bg-[var(--color-panel)]/70 pb-3 pt-4 backdrop-blur-sm md:flex">
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Open sidebar"
            title="Open sidebar"
            className="focus-ring flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-ink-soft)] transition hover:bg-[var(--color-blush)] hover:text-[var(--color-rose-dark)]"
          >
            <PanelLeftOpen size={16} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Open sidebar"
            title={`${catName}: open sidebar`}
            className="focus-ring mt-2 rounded-full"
          >
            <CatAvatar size={28} />
          </button>

          <span className="my-3 h-px w-6 shrink-0 bg-[var(--color-blush-deep)]/70" aria-hidden="true" />

          <nav
            aria-label="Main"
            className="scroll-warm flex min-h-0 flex-1 flex-col items-center gap-1 overflow-y-auto"
          >
            {[
              { id: "chat" as AppView, label: "Chat", icon: MessageCircle, active: view === "chat" },
              { id: "projects" as AppView, label: "Case Studies", icon: FolderKanban, active: view === "projects" && caseStudyId === null },
            ].map(({ id, label, icon: Icon, active }) => (
              <button
                key={id}
                type="button"
                onClick={() => onNavigate(id)}
                aria-label={label}
                title={label}
                aria-current={active ? "page" : undefined}
                className={`flex h-8 w-8 shrink-0 items-center justify-center transition ${
                  active
                    ? "rounded-[var(--radius-md)] bg-[var(--color-blush)] text-[var(--color-rose-dark)]"
                    : "rounded-[var(--radius-md)] text-[var(--color-ink-soft)] hover:bg-[var(--color-blush)] hover:text-[var(--color-rose-dark)]"
                }`}
              >
                <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
              </button>
            ))}

            {projects.map((project) => {
              const active = view === "projects" && caseStudyId === project.id;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => onOpenCaseStudy(project.id)}
                  aria-label={project.title}
                  title={project.title}
                  aria-current={active ? "page" : undefined}
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--radius-ui)] shadow-sm transition hover:scale-110 ${
                    active ? "ring-2 ring-[var(--color-rose)]" : "opacity-80 hover:opacity-100"
                  }`}
                  style={{ background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})` }}
                >
                  <project.icon size={13} strokeWidth={2} style={{ color: "var(--color-on-sunset)" }} aria-hidden="true" />
                </button>
              );
            })}

            {[
              { id: "design-system" as AppView, label: "Design System", icon: Component, active: view === "design-system" },
              { id: "profile" as AppView, label: "Profile", icon: User, active: view === "profile" },
            ].map(({ id, label, icon: Icon, active }) => (
              <button
                key={id}
                type="button"
                onClick={() => onNavigate(id)}
                aria-label={label}
                title={label}
                aria-current={active ? "page" : undefined}
                className={`flex h-8 w-8 shrink-0 items-center justify-center transition ${
                  active
                    ? "rounded-[var(--radius-md)] bg-[var(--color-blush)] text-[var(--color-rose-dark)]"
                    : "rounded-[var(--radius-md)] text-[var(--color-ink-soft)] hover:bg-[var(--color-blush)] hover:text-[var(--color-rose-dark)]"
                }`}
              >
                <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
              </button>
            ))}
          </nav>

          <span className="my-3 h-px w-6 shrink-0 bg-[var(--color-blush-deep)]/70" aria-hidden="true" />
          <ThemeToggle vertical mode={themeMode} onChange={onThemeChange} />
        </div>
      ) : (
        <aside className="hidden w-60 shrink-0 flex-col border-r border-[var(--color-blush-deep)]/60 bg-[var(--color-panel)]/70 backdrop-blur-sm md:flex">
          <SidebarContent
            view={view}
            caseStudyId={caseStudyId}
            onNavigate={onNavigate}
            onOpenCaseStudy={onOpenCaseStudy}
            themeMode={themeMode}
            onThemeChange={onThemeChange}
            onCollapse={onToggleCollapse}
          />
        </aside>
      )}

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={onCloseMobile}
            className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"
          />
          <aside className="relative z-10 flex w-72 max-w-[85vw] animate-pop-in flex-col bg-[var(--color-panel)] shadow-xl">
            <button
              type="button"
              onClick={onCloseMobile}
              aria-label="Close menu"
              className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-[var(--radius-ui)] text-[var(--color-ink-soft)] hover:bg-[var(--color-blush)]"
            >
              <X size={18} strokeWidth={1.75} aria-hidden="true" />
            </button>
            <SidebarContent
              view={view}
              caseStudyId={caseStudyId}
              onNavigate={(v) => {
                onNavigate(v);
                onCloseMobile();
              }}
              onOpenCaseStudy={(id) => {
                onOpenCaseStudy(id);
                onCloseMobile();
              }}
              themeMode={themeMode}
              onThemeChange={onThemeChange}
            />
          </aside>
        </div>
      )}
    </>
  );
}
