import CatAvatar from "./CatAvatar";
import { catName, profile } from "../data/profile";
import type { AppView } from "../types";

interface NavItem {
  id: AppView;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "chat", label: "Chat", icon: "💬" },
  { id: "projects", label: "Case Studies", icon: "🗂️" },
  { id: "design-system", label: "Design System", icon: "🧩" },
  { id: "profile", label: "Profile", icon: "🙋‍♀️" },
];

interface SidebarProps {
  view: AppView;
  onNavigate: (view: AppView) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

function SidebarContent({ view, onNavigate }: { view: AppView; onNavigate: (v: AppView) => void }) {
  return (
    <>
      <div className="flex items-center gap-3 px-5 pb-5 pt-6">
        <CatAvatar size={36} />
        <div className="min-w-0">
          <p className="truncate font-[var(--font-display)] text-sm font-bold text-[var(--color-ink)]">
            {catName}
          </p>
          <p className="truncate text-[11px] text-[var(--color-ink-soft)]">{profile.name}'s portfolio</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3" aria-label="Main">
        {NAV_ITEMS.map((item) => {
          const active = view === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={active ? "page" : undefined}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                active
                  ? "bg-[var(--color-rose)] text-white shadow-sm"
                  : "text-[var(--color-ink-soft)] hover:bg-[var(--color-blush)] hover:text-[var(--color-rose-dark)]"
              }`}
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-[var(--color-blush-deep)]/50 px-5 py-4">
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

export default function Sidebar({ view, onNavigate, mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      <aside className="hidden w-64 shrink-0 flex-col border-r border-[var(--color-blush-deep)]/50 bg-white/50 backdrop-blur-sm md:flex">
        <SidebarContent view={view} onNavigate={onNavigate} />
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
              className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-ink-soft)] hover:bg-[var(--color-blush)]"
            >
              ✕
            </button>
            <SidebarContent
              view={view}
              onNavigate={(v) => {
                onNavigate(v);
                onCloseMobile();
              }}
            />
          </aside>
        </div>
      )}
    </>
  );
}
