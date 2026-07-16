import { ArrowRight, FileText, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { profile } from "../data/profile";
import ToolLogo from "./ToolLogo";

const LINK_ICONS: Record<string, LucideIcon> = {
  "CV (PDF)": FileText,
};

export default function ContactCard() {
  return (
    <div className="w-full max-w-xs space-y-3 rounded-[var(--radius-ui)] border border-[var(--color-blush-deep)]/60 bg-[var(--color-cream-soft)] p-4">
      <a
        href={`mailto:${profile.contact.email}`}
        className="btn-pastel flex items-center justify-between gap-2 px-3 py-2 text-sm font-semibold"
      >
        <span className="flex min-w-0 items-center gap-2">
          <Mail size={14} strokeWidth={1.75} className="shrink-0" aria-hidden="true" />
          <span className="truncate">{profile.contact.email}</span>
        </span>
        <ArrowRight size={14} strokeWidth={2} className="shrink-0" aria-hidden="true" />
      </a>
      <div className="flex flex-wrap gap-2">
        {profile.contact.links.map((link) => {
          const Icon = LINK_ICONS[link.label];
          return (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pastel inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium"
            >
              {Icon ? (
                <Icon size={12} strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <ToolLogo name={link.label} size={12} />
              )}
              {link.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
