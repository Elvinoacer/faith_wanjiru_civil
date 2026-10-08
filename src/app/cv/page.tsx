import type { Metadata } from "next";
import Link from "next/link";
import { profile, skillGroups, softwareGroups, PROFICIENCY_LABEL, education, currentlyLearning } from "@/data/portfolio";
import { projects } from "@/data/projects";
import { attachment } from "@/data/experience";

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  description:
    "Curriculum Vitae of Faith Wanjiru, Graduate Civil & Structural Engineer — Moi University, Kenya. Print-optimized summary of education, skills, experience and projects.",
};

/* ══════════════════════════════════════════════════════════════════
   CV — spec §45: the CV summarizes, the website proves.
   Print-optimized (A4, two pages max).
   ══════════════════════════════════════════════════════════════════ */

export default function CvPage() {
  const cvProjects = projects.slice(0, 4);

  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-10 sm:px-6 print:py-0">
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className="font-tech text-ink-soft transition-colors hover:text-eng">
          ← FULL PORTFOLIO
        </Link>
        <p className="font-tech text-ink-faint">PRINT-OPTIMIZED — CTRL / CMD + P TO SAVE AS PDF</p>
      </div>

      <article className="print-block">
        {/* header */}
        <header className="border-b-2 border-ink pb-5">
          <h1 className="display-tight text-3xl font-bold text-ink">{profile.fullName}</h1>
          <p className="mt-1 text-sm font-medium text-ink">{profile.professionalTitle}</p>
          <p className="font-tech mt-3 flex flex-wrap gap-x-4 gap-y-1 text-ink-soft">
            <span>{profile.email}</span>
            <span>linkedin.com/in/faith-wanjiru</span>
            <span>{profile.location}</span>
          </p>
          <p className="mt-3 max-w-xl text-[13px] leading-snug text-ink-soft">
            Civil &amp; Structural Engineering graduate focused on structural design, construction
            and sustainable infrastructure — with academic and practical exposure to analysis,
            RC design, geotechnics, surveying and construction technology.
          </p>
        </header>

        {/* education */}
        <section className="mt-6 break-inside-avoid">
          <h2 className="font-tech border-b border-ink pb-1 text-eng">EDUCATION</h2>
          <div className="mt-2 flex items-baseline justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-ink">{education.degree}</p>
              <p className="text-[13px] text-ink-soft">
                {education.institution} · {education.school} · {education.location}
              </p>
            </div>
            <p className="font-tech shrink-0 text-ink-soft">
              {education.startYear} – {education.graduationYear}
            </p>
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">
            Key coursework: structural analysis, reinforced concrete design, steel structures,
            soil mechanics, foundation engineering, highway &amp; transportation engineering,
            hydraulics &amp; hydrology, construction technology &amp; management, engineering
            surveying, engineering economics.
          </p>
        </section>

        {/* attachment */}
        <section className="mt-6 break-inside-avoid">
          <h2 className="font-tech border-b border-ink pb-1 text-eng">INDUSTRIAL ATTACHMENT</h2>
          <div className="mt-2 flex items-baseline justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-ink">{attachment.role}</p>
              <p className="text-[13px] text-ink-soft">{attachment.organization}</p>
            </div>
            <p className="font-tech shrink-0 text-ink-soft">{attachment.period}</p>
          </div>
          <ul className="mt-2 grid gap-1 text-[12px] leading-snug text-ink-soft sm:grid-cols-2">
            {attachment.responsibilities.slice(0, 10).map((r) => (
              <li key={r} className="flex gap-2">
                <span aria-hidden>·</span>
                {r}
              </li>
            ))}
          </ul>
        </section>

        {/* projects */}
        <section className="mt-6 break-inside-avoid">
          <h2 className="font-tech border-b border-ink pb-1 text-eng">KEY PROJECTS</h2>
          <ul className="mt-2 flex flex-col gap-3">
            {cvProjects.map((p) => (
              <li key={p.slug} className="text-[12px] leading-snug">
                <p className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-semibold text-ink">{p.shortTitle}</span>
                  <span className="font-tech text-ink-faint">
                    {p.type.toUpperCase()} · {p.year}
                  </span>
                </p>
                <p className="mt-0.5 text-ink-soft">
                  {p.tagline} Tools: {p.software.join(", ")}.
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* skills */}
        <section className="mt-6 break-inside-avoid">
          <h2 className="font-tech border-b border-ink pb-1 text-eng">TECHNICAL SKILLS</h2>
          <div className="mt-2 grid gap-x-8 gap-y-1.5 text-[12px] text-ink-soft sm:grid-cols-2">
            {skillGroups.map((g) => (
              <p key={g.title}>
                <span className="font-tech text-ink">{g.title.toUpperCase()}:</span>{" "}
                {g.skills
                  .filter((s) => s.proficiency === "strong" || s.proficiency === "working-knowledge")
                  .map((s) => s.name)
                  .join("; ")}
              </p>
            ))}
          </div>
        </section>

        {/* software */}
        <section className="mt-6 break-inside-avoid">
          <h2 className="font-tech border-b border-ink pb-1 text-eng">SOFTWARE</h2>
          <p className="mt-2 text-[12px] text-ink-soft">
            {softwareGroups
              .map((g) => `${g.title}: ${g.skills.map((s) => `${s.name} (${PROFICIENCY_LABEL[s.proficiency]})`).join(", ")}`)
              .join(" — ")}
          </p>
        </section>

        {/* professional development */}
        <section className="mt-6 break-inside-avoid">
          <h2 className="font-tech border-b border-ink pb-1 text-eng">PROFESSIONAL DEVELOPMENT</h2>
          <p className="mt-2 text-[12px] text-ink-soft">
            {currentlyLearning.slice(0, 6).map((c) => c.item).join(" · ")}
          </p>
        </section>

        {/* references */}
        <section className="mt-6 break-inside-avoid">
          <h2 className="font-tech border-b border-ink pb-1 text-eng">REFERENCES</h2>
          <p className="mt-2 text-[12px] italic text-ink-soft">
            Available on request — including project supervisor and industrial attachment
            supervisor contacts. [Placeholders pending verification.]
          </p>
        </section>

        <footer className="mt-8 border-t border-line pt-4">
          <p className="font-tech text-[9px] leading-relaxed text-ink-faint">
            Demonstration CV built to specification — items marked [placeholder] require
            verification. Full evidence for every claim is on the portfolio site.
          </p>
        </footer>
      </article>
    </main>
  );
}
