import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Download } from "lucide-react";
import { profile, snapshot, focusAreas, softwareGroups, PROFICIENCY_LABEL, targetRoles } from "@/data/portfolio";
import { projects } from "@/data/projects";
import { attachment, laboratories, fieldwork } from "@/data/experience";

export const metadata: Metadata = {
  title: "Recruiter Summary",
  description:
    "One-page recruiter summary of Faith Wanjiru — Civil & Structural Engineering graduate: evidence, tools and availability. Prints cleanly to one sheet.",
};

/* ══════════════════════════════════════════════════════════════════
   RECRUITER MODE — spec §44 · compact, print-clean
   ══════════════════════════════════════════════════════════════════ */

export default function RecruiterPage() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-10 sm:px-6 print:py-0">
      {/* print header strip */}
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className="font-tech text-ink-soft transition-colors hover:text-eng">
          ← FULL PORTFOLIO
        </Link>
        <p className="font-tech text-ink-faint">PRINTS TO ONE A4 SHEET — CTRL / CMD + P</p>
      </div>

      {/* ── identity ───────────────────────────────────────────── */}
      <header className="print-block border-2 border-ink p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="display-tight text-3xl font-bold text-ink">{profile.fullName}</h1>
            <p className="mt-1 text-sm font-medium text-ink">
              {profile.professionalTitle} · {profile.location}
            </p>
            <p className="mt-2 max-w-md text-[13px] leading-snug text-ink-soft">
              Moi University B.Eng. Civil &amp; Structural Engineering — focused on structural
              design, construction and sustainable infrastructure.
            </p>
          </div>
          <div className="font-tech shrink-0 text-right text-ink-soft">
            <p>{profile.email}</p>
            <p className="mt-1">linkedin.com/in/faith-wanjiru</p>
            <p className="mt-1">{profile.graduationYear} GRADUATE</p>
          </div>
        </div>
        <p className="font-tech mt-4 border-t border-line pt-3 text-eng">
          AVAILABILITY — OPEN TO GRADUATE ENGINEERING OPPORTUNITIES
        </p>
      </header>

      {/* ── core focus ─────────────────────────────────────────── */}
      <section className="print-block mt-6">
        <h2 className="font-tech border-b border-ink pb-1.5 text-eng">CORE FOCUS</h2>
        <p className="mt-2 text-sm text-ink">
          Structural Design · Construction · Infrastructure
        </p>
        <div className="mt-3 grid grid-cols-3 gap-3 text-[11px] leading-snug text-ink-soft">
          {focusAreas.slice(0, 3).map((f) => (
            <div key={f.id}>
              <p className="font-tech text-ink">{f.title.toUpperCase()}</p>
              <p className="mt-1">{f.positioning}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── strongest evidence ─────────────────────────────────── */}
      <section className="print-block mt-6">
        <h2 className="font-tech border-b border-ink pb-1.5 text-eng">STRONGEST EVIDENCE</h2>
        <ul className="mt-2 grid grid-cols-2 gap-x-6 text-[13px] text-ink">
          {projects.map((p) => (
            <li key={p.slug} className="flex gap-2 border-b border-line/60 py-1">
              <span className="font-tech text-ink-faint">{p.index}</span>
              <span>
                {p.shortTitle}
                <span className="font-tech ml-1.5 text-ink-faint">· {p.year}</span>
              </span>
            </li>
          ))}
          <li className="flex gap-2 border-b border-line/60 py-1">
            <span className="font-tech text-ink-faint">07</span>
            <span>
              Industrial attachment — 12 weeks [ph]
              <span className="font-tech ml-1.5 text-ink-faint">· 2025</span>
            </span>
          </li>
        </ul>
        <p className="mt-3 text-[11px] leading-relaxed text-ink-soft">
          Full case studies — including calculations, evidence sets, limitations and lessons —
          available at /projects on the portfolio site.
        </p>
      </section>

      {/* ── tools ──────────────────────────────────────────────── */}
      <section className="print-block mt-6">
        <h2 className="font-tech border-b border-ink pb-1.5 text-eng">TOOLS</h2>
        <div className="mt-2 grid grid-cols-2 gap-x-8 gap-y-1.5 text-[12px] text-ink-soft">
          {softwareGroups.map((g) => (
            <p key={g.title}>
              <span className="font-tech text-ink">{g.title.toUpperCase()}:</span>{" "}
              {g.skills.map((s) => `${s.name} (${PROFICIENCY_LABEL[s.proficiency]})`).join("; ")}
            </p>
          ))}
        </div>
      </section>

      {/* ── labs & field ───────────────────────────────────────── */}
      <section className="print-block mt-6">
        <h2 className="font-tech border-b border-ink pb-1.5 text-eng">LABORATORY & FIELD EXPOSURE</h2>
        <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">
          {[...laboratories.map((l) => l.title), ...fieldwork.map((f) => f.title)].join(" · ")}
        </p>
      </section>

      {/* ── snapshot table ─────────────────────────────────────── */}
      <section className="print-block mt-6">
        <h2 className="font-tech border-b border-ink pb-1.5 text-eng">PROFILE SNAPSHOT</h2>
        <table className="mt-2 w-full text-left text-[12px]">
          <tbody>
            {snapshot.map((s) => (
              <tr key={s.label} className="border-b border-line/60">
                <th scope="row" className="font-tech w-44 py-1.5 pr-4 align-top font-normal text-ink-faint">
                  {s.label.toUpperCase()}
                </th>
                <td className="py-1.5 text-ink">
                  {s.value} <span className="text-ink-faint">— {s.note}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ── target roles + actions ─────────────────────────────── */}
      <section className="print-block mt-6">
        <h2 className="font-tech border-b border-ink pb-1.5 text-eng">TARGET ROLES</h2>
        <p className="mt-2 text-[12px] text-ink-soft">{targetRoles.join(" · ")}</p>
      </section>

      <footer className="print-block mt-8 border-t-2 border-ink pt-4">
        <div className="no-print flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}?subject=Graduate Engineering Opportunity`}
            className="inline-flex items-center gap-2 bg-eng px-4 py-2.5 font-tech text-eng-foreground"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden />
            EMAIL FAITH
          </a>
          <a
            href={profile.cvUrl}
            download
            className="inline-flex items-center gap-2 border border-ink px-4 py-2.5 font-tech text-ink"
          >
            <Download className="h-3.5 w-3.5" aria-hidden />
            DOWNLOAD CV
          </a>
          <Link
            href="/projects/rc-building-design"
            className="inline-flex items-center gap-2 border border-line px-4 py-2.5 font-tech text-ink-soft transition-colors hover:border-eng hover:text-eng"
          >
            VIEW FLAGSHIP PROJECT
          </Link>
        </div>
        <p className="font-tech mt-4 text-[9px] leading-relaxed text-ink-faint">
          DEMONSTRATION PORTFOLIO — PROFILE FACTS MARKED [PH] REQUIRE VERIFICATION BEFORE PUBLICATION.
          NO EMPLOYERS, GRADES, CAPACITIES OR APPROVALS ARE CLAIMED BEYOND ACADEMIC EXPOSURE.
        </p>
      </footer>
    </main>
  );
}
