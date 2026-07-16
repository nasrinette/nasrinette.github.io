import { useEffect, useState } from "react";
import { ChevronDown, Component, FolderKanban, MessageCircle, User, X } from "lucide-react";
import CatAvatar from "./CatAvatar";
import ThemeToggle from "./ThemeToggle";
import { catName, catTagline, profile } from "../data/profile";
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
}

function SidebarContent({
  view,
  caseStudyId,
  onNavigate,
  onOpenCaseStudy,
  themeMode,
  onThemeChange,
}: SidebarContentProps) {
  const profileActive = view === "profile";
  const caseStudiesActive = view === "projects";
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(caseStudiesActive);

  // keep the dropdown open while any case-study subtab (or the overview) is active
  useEffect(() => {
    if (caseStudiesActive) setCaseStudiesOpen(true);
  }, [caseStudiesActive]);

  const handleCaseStudiesToggle = () => {
    if (caseStudiesActive) {
      setCaseStudiesOpen((open) => !open);
    } else {
      onNavigate("projects");
      setCaseStudiesOpen(true);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 px-5 pb-5 pt-6">
        <CatAvatar size={32} />
        <div className="min-w-0">
          <p className="truncate font-[var(--font-display)] text-sm font-bold text-[var(--color-ink)]">
            {catName} <span aria-hidden="true">🐾</span>
          </p>
          <p className="truncate text-[11px] text-[var(--color-ink-soft)]">{catTagline}</p>
        </div>
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
              className={`flex w-full items-center gap-2.5 px-3 py-2 text-left font-[var(--font-display)] text-sm font-semibold transition ${
                active
                  ? "btn-pastel is-active text-[var(--color-ink)]"
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
            className={`flex w-full items-center gap-2.5 px-3 py-2 text-left font-[var(--font-display)] text-sm font-semibold transition ${
              caseStudiesActive
                ? "btn-pastel is-active text-[var(--color-ink)]"
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
                    className={`block w-full truncate rounded-[var(--radius-md)] px-2.5 py-1.5 text-left text-[13px] font-medium transition ${
                      active
                        ? "bg-[var(--color-blush)] text-[var(--color-rose-dark)]"
                        : "text-[var(--color-ink-soft)] hover:bg-[var(--color-blush)] hover:text-[var(--color-rose-dark)]"
                    }`}
                  >
                    {project.title}
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
          className={`flex w-full items-center gap-2.5 px-3 py-2 text-left font-[var(--font-display)] text-sm font-semibold transition ${
            view === "design-system"
              ? "btn-pastel is-active text-[var(--color-ink)]"
              : "rounded-[var(--radius-md)] text-[var(--color-ink-soft)] hover:bg-[var(--color-blush)] hover:text-[var(--color-rose-dark)]"
          }`}
        >
          <Component size={16} strokeWidth={1.75} aria-hidden="true" />
          Design System
        </button>
      </nav>

      <div className="border-t border-[var(--color-blush-deep)]/60 px-3 pt-3">
        <button
          type="button"
          onClick={() => onNavigate("profile")}
          aria-current={profileActive ? "page" : undefined}
          className={`flex w-full items-center gap-2.5 px-3 py-2 text-left font-[var(--font-display)] text-sm font-semibold transition ${
            profileActive
              ? "btn-pastel is-active text-[var(--color-ink)]"
              : "rounded-[var(--radius-md)] text-[var(--color-ink-soft)] hover:bg-[var(--color-blush)] hover:text-[var(--color-rose-dark)]"
          }`}
        >
          <User size={16} strokeWidth={1.75} aria-hidden="true" />
          Profile
        </button>
      </div>

      <div className="space-y-3 px-5 pb-4 pt-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium uppercase tracking-wide text-[var(--color-ink-soft)]">
            Theme
          </span>
          <ThemeToggle mode={themeMode} onChange={onThemeChange} />
        </div>
        <p className="text-[11px] leading-snug text-[var(--color-ink-soft)]">{profile.availability}</p>
        <a
          href={`mailto:${profile.contact.email}`}
          className="block truncate text-xs font-semibold text-[var(--color-rose-dark)] hover:underline"
        >
          {profile.contact.email}
        </a>
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
  themeMode,
  onThemeChange,
}: SidebarProps) {
  return (
    <>
      <aside className="hidden w-60 shrink-0 flex-col border-r border-[var(--color-blush-deep)]/60 bg-[var(--color-cream-soft)]/70 backdrop-blur-sm md:flex">
        <SidebarContent
          view={view}
          caseStudyId={caseStudyId}
          onNavigate={onNavigate}
          onOpenCaseStudy={onOpenCaseStudy}
          themeMode={themeMode}
          onThemeChange={onThemeChange}
        />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={onCloseMobile}
            className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"
          />
          <aside className="relative z-10 flex w-72 max-w-[85vw] animate-pop-in flex-col bg-[var(--color-cream-soft)] shadow-xl">
            <button
              type="button"
              onClick={onCloseMobile}
              aria-label="Close menu"
              className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-md text-[var(--color-ink-soft)] hover:bg-[var(--color-blush)]"
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
