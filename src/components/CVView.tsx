import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Download } from "lucide-react";
import { cv } from "../data/cv";
import { profile } from "../data/profile";

/* — CVView — the CV rendered as a real page in the portfolio's own type and
   tokens, not a browser PDF viewer with its grey chrome. One paper-like card
   on the page background, typeset at the density of the printed sheet so the
   whole card lands at roughly A4 proportions. The summary opens the sheet
   with no heading; every section below sits under a hairline rule and a
   wide-tracked caps label. Experience and education lead with the org name,
   dates right-aligned on the same line, the role as a tracked-caps subline;
   bullets keep their bold key phrases. The one-line closing facts
   (languages, achievements, volunteering) share a single label-column block
   under one rule, so the sheet still lands on one A4 page. The Download
   button above the card hands over the actual file. — */

/** The project links' visible treatment, for links that should read as links. */
const linkAccent =
  "font-semibold text-[var(--text-emphasis)] underline decoration-[var(--primary)]/50 underline-offset-2 transition hover:decoration-[var(--text-emphasis)]";

/** Inline [label](url) links inside the data's copy; the PDF print carries
    them through as clickable annotations, like every other link on the sheet.
    Quiet by default (ink, hover only); linkClassName opts into visible styling. */
function Links({ text, linkClassName }: { text: string; linkClassName?: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        return m ? (
          <a
            key={i}
            href={m[2]}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName ?? "transition hover:text-[var(--text-emphasis)]"}
          >
            {m[1]}
          </a>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </>
  );
}

/** The PDF's bold phrases and links, carried by **markers** in the data. */
function Emphasis({ text, linkClassName }: { text: string; linkClassName?: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-[var(--text)]">
            <Links text={part.slice(2, -2)} linkClassName={linkClassName} />
          </strong>
        ) : (
          <Links key={i} text={part} linkClassName={linkClassName} />
        )
      )}
    </>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-[var(--border)]/70 pt-2">
      <h2 className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--text)]">{title}</h2>
      <div className="pt-1.5">{children}</div>
    </section>
  );
}

/** Org name bold left, period right, on one shared baseline. */
function EntryHead({ org, period }: { org: ReactNode; period: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <h3 className="text-[15px] font-bold leading-tight text-[var(--text)]">{org}</h3>
      <p className="shrink-0 text-[12px] text-[var(--text-secondary)]">{period}</p>
    </div>
  );
}

const dot = <span aria-hidden="true"> · </span>;

export default function CVView() {
  // The sheet is laid out at a fixed 794px, the PDF's width, and scaled
  // down to fit narrower panels, so the preview is the downloaded page
  // exactly: same line breaks, same page, smaller glass.
  const shellRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / 794));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    // 842px container minus sm:px-6 leaves the card at 794px, A4's width in
    // CSS pixels, so at A4 length the sheet is literally A4-sized. In print
    // the shell falls away and the card IS the sheet: the PDF in
    // public/assets is generated from this very page (npm run cv:pdf).
    <div data-cv-page className="mx-auto max-w-[842px] px-4 pb-10 pt-5 sm:px-6">
      <div className="mb-4 flex justify-end print:hidden">
        <a
          href={profile.contact.resumeUrl}
          download
          className="btn-pastel focus-ring flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold"
        >
          <Download size={15} strokeWidth={1.75} aria-hidden="true" />
          Download PDF
        </a>
      </div>

      {/* aspect-[794/1123] holds the card at true A4 proportions even when
          content ends early, so the site shows exactly the sheet the PDF
          prints, spare bottom space included; content taller than A4 still
          grows the card (and the measure probe flags it). The scaler shrinks
          the fixed-width sheet on narrow panels; print always runs at 1:1. */}
      <div ref={shellRef} data-cv-scaler style={scale < 1 ? { height: 1123 * scale } : undefined}>
        <article
          data-cv-sheet
          className="card-warm aspect-[794/1123] w-[794px] px-9 py-5"
          style={scale < 1 ? { transform: `scale(${scale})`, transformOrigin: "top left" } : undefined}
        >
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* the source photo is a bust shot; the circle crops in on the
                face so it reads at CV-portrait scale */}
            {/* rounded-[50%], not rounded-full: the infinity radius Tailwind
                emits for -full breaks in Chromium's print rendering */}
            <div
              className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[50%] border border-[var(--border)]/70"
              style={{ background: "var(--hover-fill)" }}
            >
              {/* zoomed by oversizing rather than transform: print rendering
                  clips plain layout reliably, scaled layers not always */}
              <img
                src="/assets/me.jpg"
                alt=""
                className="max-w-none"
                style={{ width: "120%", height: "120%", marginLeft: "-10%", marginTop: "-6%" }}
              />
            </div>
            <div>
              <h1 className="font-[var(--font-display)] text-2xl font-bold text-[var(--text)]">{cv.name}</h1>
              <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-emphasis)]">
                {cv.title}
              </p>
              {/* location and phone live under the title: three rows on the
                  left mirror the three contact rows on the right */}
              <p className="mt-1 text-[12px] leading-snug text-[var(--text-secondary)]">
                {cv.location}
                {dot}
                <a href={`tel:${cv.phone.replace(/\s/g, "")}`} className="transition hover:text-[var(--text-emphasis)]">
                  {cv.phone}
                </a>
              </p>
            </div>
          </div>
          <div className="space-y-0.5 text-right text-[12px] leading-snug text-[var(--text-secondary)]">
            <p>
              <a href={`mailto:${cv.email}`} className="transition hover:text-[var(--text-emphasis)]">
                {cv.email}
              </a>
            </p>
            {/* one link per row; inline they wrap mid-URL at sheet width */}
            {cv.links.map((link) => (
              <p key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-[var(--text-emphasis)]"
                >
                  {link.label}
                </a>
              </p>
            ))}
          </div>
        </header>

        <div className="mb-3 mt-2 border-b-2 border-[var(--text)]/70" aria-hidden="true" />

        {/* the summary opens the sheet bare, no heading, like a spoken intro */}
        <p className="text-[13px] leading-snug text-[var(--text-secondary)]">
          <Emphasis text={cv.profile} />
        </p>

        <div className="mt-3 space-y-4">
          <Section title="Skills">
            <dl className="space-y-1.5">
              {/* 115px labels (clearing the widest, Design Thinking) and 12px
                  items keep the long skill rows to two lines at most */}
              {cv.skills.map((group) => (
                <div key={group.label} className="grid grid-cols-[115px_1fr] gap-3">
                  <dt className="text-[13px] font-bold text-[var(--text)]">{group.label}</dt>
                  <dd className="text-[12px] leading-snug text-[var(--text-secondary)]">{group.items.join(", ")}</dd>
                </div>
              ))}
              {/* languages close the skills grid; Emphasis keeps the IELTS
                  certificate link alive inside the row */}
              <div className="grid grid-cols-[115px_1fr] gap-3">
                <dt className="text-[13px] font-bold text-[var(--text)]">Languages</dt>
                <dd className="text-[12px] leading-snug text-[var(--text-secondary)]">
                  <Emphasis text={cv.languages.join(", ")} linkClassName={linkAccent} />
                </dd>
              </div>
            </dl>
          </Section>

          <Section title="Experience">
            <div className="space-y-2">
              {cv.experience.map((job) => (
                <div key={`${job.role}${job.org}`}>
                  <EntryHead
                    org={
                      job.orgUrl ? (
                        <a
                          href={job.orgUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition hover:text-[var(--text-emphasis)]"
                        >
                          {job.org}
                        </a>
                      ) : (
                        job.org
                      )
                    }
                    period={job.period}
                  />
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.15em] text-[var(--text)]">
                    {job.role}
                    <span className="ml-1 text-[11px] font-normal normal-case tracking-normal text-[var(--text-secondary)]">
                      {dot}
                      {job.location}
                    </span>
                  </p>
                  <ul className="mt-0.5 space-y-0.5 pl-4 text-[13px] leading-snug text-[var(--text-secondary)]">
                    {job.bullets.map((bullet) => (
                      <li key={bullet} className="list-disc marker:text-[var(--primary)]">
                        <Emphasis text={bullet} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Education">
            <div className="space-y-1.5">
              {cv.education.map((entry) => (
                <div key={entry.school}>
                  <EntryHead
                    org={
                      <a
                        href={entry.schoolUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition hover:text-[var(--text-emphasis)]"
                      >
                        {entry.school}
                      </a>
                    }
                    period={entry.period}
                  />
                  <p className="text-[13px] leading-snug text-[var(--text)]">
                    {entry.degree}
                    {dot}
                    {entry.field}
                    <span className="text-[12px] text-[var(--text-secondary)]">
                      {dot}
                      {entry.meta}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Selected Projects">
            <ul className="space-y-1 pl-4 text-[13px] leading-snug text-[var(--text-secondary)]">
              {cv.projects.map((project) => (
                <li key={project.projectId} className="list-disc marker:text-[var(--primary)]">
                  {/* each project on the CV is a case study in this very site,
                      so the name walks the reader straight into it */}
                  <a href={`#/case-studies/${project.projectId}`} className={linkAccent}>
                    {project.name}
                  </a>
                  : <Emphasis text={project.summary} />
                </li>
              ))}
            </ul>
          </Section>

          {/* three one-line facts share one rule and the skills' label column,
              instead of spending a full section apiece; keeps the sheet on A4.
              Items within a row separate on hairlines, not cramped dots, and
              wrap as whole units so no entry breaks mid-phrase. */}
          <section className="border-t border-[var(--border)]/70 pt-2">
            <dl className="space-y-1.5">
              {[
                { label: "Achievements", items: cv.achievements },
                { label: "Volunteering", items: cv.volunteering },
              ].map((row) => (
                <div key={row.label} className="grid grid-cols-[115px_1fr] items-baseline gap-3">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--text)]">
                    {row.label}
                  </dt>
                  {/* items run on as one text flow, split by short vertical
                      hairlines, so a row reads continuously like prose and
                      every line starts flush at the column edge */}
                  <dd className="text-[13px] leading-snug text-[var(--text-secondary)]">
                    {row.items.map((item, i) => (
                      <span key={item}>
                        {i > 0 && (
                          <span
                            aria-hidden="true"
                            className="mx-2.5 inline-block h-[11px] w-px translate-y-[1.5px] bg-[var(--border)]"
                          />
                        )}
                        <Emphasis text={item} />
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
        </article>
      </div>
    </div>
  );
}
