import { ArrowRight, Mail } from "lucide-react";
import { profile } from "../data/profile";

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
        {profile.contact.links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            className="btn-pastel px-3 py-1 text-xs font-medium"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
