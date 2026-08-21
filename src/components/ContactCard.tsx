import type { ReactNode } from "react";
import { FileText, Mail } from "lucide-react";
import { profile } from "../data/profile";
import ToolLogo from "./ToolLogo";

/* — ContactIcons — the contact surface is a row of round brand marks, like a
   site footer's social row: no labels, no rows, nothing button-shaped beyond
   the circle itself. The full address travels in the tooltip and aria-label. — */
export function ContactIcons({
  size = "md",
  spread = false,
}: {
  size?: "sm" | "md" | "lg";
  /** Stretch the row full width with the marks pushed to the edges (sidebar). */
  spread?: boolean;
}) {
  // the mark fills the ring (~55% of the diameter) — a small glyph in a big
  // circle reads as empty chrome, this reads as the brand in a frame
  const circle = size === "lg" ? "h-10 w-10" : size === "md" ? "h-8 w-8" : "h-6 w-6";
  const glyph = size === "lg" ? 19 : size === "md" ? 17 : 13;

  const items: {
    label: string;
    href: string;
    external: boolean;
    icon: ReactNode;
  }[] = [
    {
      label: `Email: ${profile.contact.email}`,
      href: `mailto:${profile.contact.email}`,
      external: false,
      icon: <Mail size={glyph} strokeWidth={1.75} aria-hidden="true" />,
    },
    ...profile.contact.links.map((link) =>
      /cv|pdf|resume/i.test(link.label)
        ? {
            // the CV mark only opens the in-portfolio page; saving the PDF is
            // the Download button's job on that page
            label: "CV: opens it here",
            href: "#/cv",
            external: false,
            icon: <FileText size={glyph} strokeWidth={1.75} aria-hidden="true" />,
          }
        : {
            label: `${link.label}: ${link.url.replace(/^https?:\/\/(www\.)?/, "")}`,
            href: link.url,
            external: true,
            icon: <ToolLogo name={link.label} size={glyph} />,
          }
    ),
  ];

  return (
    <div
      className={spread ? "flex w-full items-center justify-between" : "flex flex-wrap items-center gap-2"}
      role="group"
      aria-label="Contact links"
    >
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          aria-label={item.label}
          title={item.label}
          // dressed exactly like the action buttons: btn-pastel supplies the
          // fill, the outline, the glyph colour, and the shared 10px corner
          className={`btn-pastel focus-ring group flex ${circle} items-center justify-center transition hover:-translate-y-0.5`}
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
