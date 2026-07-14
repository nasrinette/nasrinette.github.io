import { profile } from "../data/profile";

export default function ContactCard() {
  return (
    <div className="w-full max-w-xs space-y-3 rounded-2xl border border-[var(--color-blush-deep)]/60 bg-white/80 p-4">
      <a
        href={`mailto:${profile.contact.email}`}
        className="flex items-center justify-between rounded-xl bg-[var(--color-paw)] px-3 py-2 text-sm font-semibold text-[var(--color-rose-dark)] transition hover:bg-[var(--color-blush)]"
      >
        <span>✉️ {profile.contact.email}</span>
        <span aria-hidden="true">→</span>
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
