import { Component, FolderKanban, MessageCircle, User, X } from "lucide-react";
import CatAvatar from "./CatAvatar";
import ThemeToggle from "./ThemeToggle";
import { catName, profile } from "../data/profile";
import type { ThemeMode } from "../hooks/useTheme";
import type { AppView } from "../types";

interface NavItem {
  id: AppView;
  label: string;
  icon: typeof MessageCircle;
}

const NAV_ITEMS: NavItem[] = [
  { id: "chat", label: "Chat", icon: MessageCircle },
  { id: "projects", label: "Case Studies", icon: FolderKanban },
  { id: "design-system", label: "Design System", icon: Component },
];

interface SidebarProps {
  view: AppView;
  onNavigate: (view: AppView) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
}

interface SidebarContentProps {
  view: AppView;
  onNavigate: (v: AppView) => void;
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
}

function SidebarContent({ view, onNavigate, themeMode, onThemeChange }: SidebarContentProps) {
  const profileActive = view === "profile";

  return (
    <>
      <div className="flex items-center gap-3 px-5 pb-5 pt-6">
        <CatAvatar size={30} />
        <div className="min-w-0">
          <p className="truncate font-[var(--font-display)] text-sm font-bold text-[var(--color-ink)]">
            {catName}
          </p>
          <p className="truncate text-[11px] text-[var(--color-ink-soft)]">{profile.name}'s portfolio</p>
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
  onNavigate,
  mobileOpen,
  onCloseMobile,
  themeMode,
  onThemeChange,
}: SidebarProps) {
  return (
    <>
      <aside className="hidden w-60 shrink-0 flex-col border-r border-[var(--color-blush-deep)]/60 bg-[var(--color-cream-soft)]/70 backdrop-blur-sm md:flex">
        <SidebarContent view={view} onNavigate={onNavigate} themeMode={themeMode} onThemeChange={onThemeChange} />
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
              onNavigate={(v) => {
                onNavigate(v);
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
