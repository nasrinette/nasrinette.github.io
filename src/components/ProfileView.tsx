import { profile } from "../data/profile";
import CatAvatar from "./CatAvatar";
import ContactCard from "./ContactCard";
import ToolLogo from "./ToolLogo";

export default function ProfileView() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-8 sm:py-12">
      <header className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <img
          src="/assets/me.png"
          alt={profile.name}
          className="h-20 w-20 shrink-0 rounded-full object-cover shadow-[var(--shadow-glow)]"
          style={{ background: "var(--gradient-sunset)" }}
        />
        <div>
          <p className="font-[var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-rose-dark)]">
            {profile.role}
          </p>
          <h1 className="mt-0.5 font-[var(--font-display)] text-2xl font-bold text-[var(--color-ink)] sm:text-3xl">
            {profile.name}
          </h1>
          <p className="text-sm text-[var(--color-ink-soft)]">{profile.location}</p>
          <p className="mt-1 text-sm italic text-[var(--color-rose-dark)]">{profile.tagline}</p>
        </div>
      </header>

      <section className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {profile.stats.map((stat) => (
          <div key={stat.label} className="card-warm p-4 text-center">
            <p className="font-[var(--font-display)] text-lg font-bold text-[var(--color-rose-dark)]">{stat.value}</p>
            <p className="mt-1 text-[11px] leading-snug text-[var(--color-ink-soft)]">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="mb-10 space-y-3">
        {profile.bio.map((p) => (
          <p key={p} className="text-sm leading-relaxed text-[var(--color-ink)]">
            {p}
          </p>
        ))}
      </section>

      <section className="mb-10">
        <h2 className="mb-3 font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)]">Experience</h2>
        <div className="space-y-4">
          {profile.experience.map((job) => (
            <div key={`${job.company}-${job.period}`} className="card-warm p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <p className="text-sm font-bold text-[var(--color-ink)]">
                  {job.role} <span className="font-normal text-[var(--color-ink-soft)]">· {job.company}</span>
                </p>
                <p className="font-[var(--font-mono)] text-xs text-[var(--color-ink-soft)]">{job.period}</p>
              </div>
              <p className="mt-1 text-xs text-[var(--color-ink-soft)]">{job.summary}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-relaxed text-[var(--color-ink-soft)] marker:text-[var(--color-rose)]">
                {job.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <h2 className="mb-3 font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)]">Education</h2>
          <div className="space-y-3">
            {profile.education.map((ed) => (
              <div key={ed.school} className="card-warm p-4">
                <p className="text-sm font-bold text-[var(--color-ink)]">{ed.credential}</p>
                <p className="font-[var(--font-mono)] text-xs text-[var(--color-ink-soft)]">
                  {ed.school} · {ed.period}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-3 font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)]">Skills</h2>
          <div className="space-y-3">
            {profile.skillGroups.map((group) => (
              <div key={group.category}>
                <p className="text-xs font-bold text-[var(--color-rose-dark)]">{group.category}</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1 rounded-full bg-[var(--color-paw)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-ink)]"
                    >
                      <ToolLogo name={item} size={11} className="text-[var(--color-rose-dark)]" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {profile.testimonials.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-3 font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)]">
            What people say
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {profile.testimonials.map((t) => (
              <div key={t.author} className="card-warm bg-[var(--color-paw)]/50 p-4">
                <p className="text-xs italic leading-relaxed text-[var(--color-ink)]">"{t.quote}"</p>
                <p className="mt-2 text-xs font-semibold text-[var(--color-rose-dark)]">{t.author}</p>
                <p className="text-[11px] text-[var(--color-ink-soft)]">{t.role}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mb-10">
        <h2 className="mb-3 font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)]">
          A few fun facts
        </h2>
        <ul className="space-y-2">
          {profile.funFacts.map((fact) => (
            <li key={fact} className="flex items-start gap-2 text-sm text-[var(--color-ink-soft)]">
              <CatAvatar size={20} />
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 font-[var(--font-display)] text-lg font-bold text-[var(--color-ink)]">Get in touch</h2>
        <ContactCard />
      </section>
    </div>
  );
}
