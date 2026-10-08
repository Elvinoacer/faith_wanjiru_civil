"use client";

/* ══════════════════════════════════════════════════════════════════
   FOOTER — engineering drawing TITLE BLOCK
   Authentic title-block grid + PRELIMINARY ISSUE stamp (honest
   placeholder notice per spec §2 verification policy)
   ══════════════════════════════════════════════════════════════════ */

import Link from "next/link";
import { Mail, MapPin, Download } from "lucide-react";
import { Linkedin } from "@/components/ui/icons";
import { profile, targetRoles } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-line bg-surface">
      {/* ── PRELIMINARY ISSUE stamp ─────────────────────────────── */}
      <div className="pointer-events-none absolute right-6 top-8 hidden rotate-[-6deg] select-none lg:block" aria-hidden>
        <span className="font-tech rounded-sm border-[3px] border-amber/70 px-4 py-2 text-amber/80">
          PRELIMINARY ISSUE
          <span className="mt-1 block text-center text-[9px] tracking-[0.2em]">
            SAMPLE DATA — NOT FOR CONSTRUCTION
          </span>
        </span>
      </div>

      {/* ── title block ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-[88rem] px-4 py-14 sm:px-6 lg:px-10">
        <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-12">
          {/* project cell */}
          <div className="bg-surface p-5 md:col-span-4">
            <p className="font-tech text-ink-faint">PROJECT</p>
            <p className="font-expo mt-2 text-lg font-bold leading-tight text-ink">
              Graduate Engineering Portfolio
            </p>
            <p className="font-tech mt-2 text-amber">
              STRUCTURES · CONSTRUCTION · INFRASTRUCTURE
            </p>
          </div>
          {/* drawn by */}
          <div className="bg-surface p-5 md:col-span-2">
            <p className="font-tech text-ink-faint">DRAWN BY</p>
            <p className="mt-2 text-sm font-medium text-ink">{profile.fullName}</p>
            <p className="font-tech mt-1 text-ink-faint">{profile.professionalTitle}</p>
          </div>
          {/* checked by */}
          <div className="bg-surface p-5 md:col-span-2">
            <p className="font-tech text-ink-faint">CHECKED BY</p>
            <p className="mt-2 text-sm text-ink-soft">[Placeholder]</p>
            <p className="font-tech mt-1 text-ink-faint">SUPERVISING ENGINEER</p>
          </div>
          {/* scale + date */}
          <div className="bg-surface p-5 md:col-span-2">
            <p className="font-tech text-ink-faint">SCALE</p>
            <p className="mt-2 font-mono text-sm text-ink">NTS</p>
            <p className="font-tech mt-3 text-ink-faint">DATE</p>
            <p className="mt-1 font-mono text-sm text-ink">{year}</p>
          </div>
          {/* sheet no */}
          <div className="bg-surface p-5 md:col-span-2">
            <p className="font-tech text-ink-faint">SHEET NO</p>
            <p className="display-expo mt-2 text-3xl font-bold text-amber">14/14</p>
            <p className="font-tech mt-1 text-ink-faint">REV A</p>
          </div>
        </div>

        {/* ── links row ─────────────────────────────────────────── */}
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-tech text-ink-faint">OPPORTUNITES CONSIDERED</p>
            <p className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-sm text-ink-soft">
              {targetRoles.slice(0, 6).map((r, i) => (
                <span key={r}>
                  {r}
                  {i < 5 && <span className="ml-2 text-line-strong" aria-hidden>·</span>}
                </span>
              ))}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center gap-2 font-tech text-ink-soft transition-colors hover:text-eng"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {profile.email}
            </a>
            <a
              href={profile.links[1]?.url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 font-tech text-ink-soft transition-colors hover:text-eng"
            >
              <Linkedin className="h-4 w-4" aria-hidden />
              LinkedIn
            </a>
            <span className="flex items-center gap-2 font-tech text-ink-faint">
              <MapPin className="h-4 w-4" aria-hidden />
              {profile.location}
            </span>
            <a
              href={profile.cvUrl}
              download
              className="flex items-center gap-2 border border-line px-3 py-1.5 font-tech text-ink transition-colors hover:border-eng hover:text-eng"
            >
              <Download className="h-3.5 w-3.5" aria-hidden />
              CV
            </a>
          </nav>
        </div>

        {/* ── bottom strip ──────────────────────────────────────── */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-tech text-ink-faint">
            © {year} {profile.fullName} — All rights reserved
          </p>
          <p className="font-tech text-ink-faint">
            {profile.coordinates}
          </p>
        </div>

        <p className="mt-4 max-w-3xl text-[11px] leading-relaxed text-ink-faint">
          This is a demonstration portfolio built to a detailed specification. Profile facts marked
          [placeholder] require verification before publication — no employers, grades, capacities,
          certifications or approvals are claimed beyond academic exposure. See the publishing
          checklist in the project README.
        </p>
      </div>
    </footer>
  );
}
