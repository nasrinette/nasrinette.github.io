import { ArrowRight, Mail } from "lucide-react";
import { profile } from "../data/profile";

export default function ContactCard() {
  return (
    <div className="w-full max-w-xs space-y-3 rounded-lg border border-[var(--color-blush-deep)]/60 bg-[var(--color-cream-soft)] p-4">
      <a
        href={`mailto:${profile.contact.email}`}
        className="flex items-center justify-between gap-2 rounded-md bg-[var(--color-paw)] px-3 py-2 text-sm font-semibold text-[var(--color-rose-dark)] transition hover:bg-[var(--color-blush)]"
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
            className="rounded-full border border-[var(--color-blush-deep)] px-3 py-1 text-xs font-medium text-[var(--color-ink)] transition hover:bg-[var(--color-blush)]"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
