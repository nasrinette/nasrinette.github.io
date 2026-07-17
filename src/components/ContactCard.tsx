import { FileText, Mail } from "lucide-react";
import { profile } from "../data/profile";
import ToolLogo from "./ToolLogo";

/* — ContactIcons — the contact surface is a row of round brand marks, like a
   site footer's social row: no labels, no rows, nothing button-shaped beyond
   the circle itself. The full address travels in the tooltip and aria-label. — */
export function ContactIcons({ size = "md" }: { size?: "sm" | "md" }) {
  // the mark fills the ring (~55% of the diameter) — a small glyph in a big
  // circle reads as empty chrome, this reads as the brand in a frame
  const circle = size === "md" ? "h-8 w-8" : "h-6 w-6";
  const glyph = size === "md" ? 17 : 13;

  const items = [
    {
      label: `Email: ${profile.contact.email}`,
      href: `mailto:${profile.contact.email}`,
      external: false,
      icon: <Mail size={glyph} strokeWidth={1.75} aria-hidden="true" />,
    },
    ...profile.contact.links.map((link) => ({
      label: /cv|pdf|resume/i.test(link.label) ? "CV (PDF): opens in a new tab" : `${link.label}: ${link.url.replace(/^https?:\/\/(www\.)?/, "")}`,
      href: link.url,
      external: true,
      icon: /cv|pdf|resume/i.test(link.label) ? (
        <FileText size={glyph} strokeWidth={1.75} aria-hidden="true" />
      ) : (
        <ToolLogo name={link.label} size={glyph} />
      ),
    })),
  ];

  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Contact links">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          aria-label={item.label}
          title={item.label}
          // outlined, not filled: ring and glyph share one color via
          // border-current — the app's rust accent, per the reference
          className={`focus-ring group flex ${circle} items-center justify-center rounded-full border border-current text-[var(--color-rose-dark)] transition hover:-translate-y-0.5`}
        >
          <span className="transition group-hover:scale-110">{item.icon}</span>
        </a>
      ))}
    </div>
  );
}

export default function ContactCard() {
  return <ContactIcons size="md" />;
}
