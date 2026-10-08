"use client";

/* ══════════════════════════════════════════════════════════════════
   CASE STUDY VIEWER — full-screen overlay per spec §65 wireframe
   01 Brief · 02 Criteria · 03 Approach · 04 Calculations ·
   05 Evidence · 06 Results · 07 Limitations · 08 Lessons · Next
   ══════════════════════════════════════════════════════════════════ */

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { X, ArrowRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { BmdSfdDiagram } from "@/components/structural/diagrams";
import { lockScroll } from "@/lib/smooth-scroll";

const EASE = [0.22, 1, 0.36, 1] as const;

function Block({
  n,
  title,
  children,
  wide,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.75, ease: EASE }}
      className={`print-block border-t border-line py-10 ${wide ? "col-span-full" : ""}`}
    >
      <div className="flex items-baseline gap-4">
        <span className="font-tech text-amber">{n}</span>
        <h3 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          {title}
        </h3>
      </div>
      <div className="mt-5">{children}</div>
    </motion.section>
  );
}

export function CaseStudyOverlay({
  slug,
  onClose,
  onNavigate,
}: {
  slug: string | null;
  onClose: () => void;
  onNavigate: (slug: string) => void;
}) {
  const project = slug ? projects.find((p) => p.slug === slug) : null;

  useEffect(() => {
    if (!project) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  const idx = project ? projects.findIndex((p) => p.slug === project.slug) : -1;
  const next = idx >= 0 ? projects[(idx + 1) % projects.length] : null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="case-study"
          role="dialog"
          aria-modal="true"
          aria-label={`Case study: ${project.title}`}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.65, ease: EASE }}
          className="fixed inset-0 z-[70] overflow-y-auto bg-paper"
        >
          {/* ── sticky overlay header ─────────────────────────── */}
          <div className="no-print sticky top-0 z-10 border-b border-line bg-paper/95 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
              <span className="font-tech text-eng">
                CASE STUDY {project.index}/0{projects.length}
              </span>
              <span className="font-tech hidden text-ink-faint sm:inline">
                {project.categoryLabel.toUpperCase()} · {project.year}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="grid h-9 w-9 place-items-center border border-line text-ink transition-colors hover:border-eng hover:text-eng"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>

          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            {/* ── masthead ──────────────────────────────────── */}
            <header className="border-b border-line py-12">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="font-tech text-amber"
              >
                {project.type.toUpperCase()} · {project.year}
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7, ease: EASE }}
                className="display-tight mt-4 max-w-3xl text-3xl font-semibold text-ink sm:text-5xl"
              >
                {project.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft"
              >
                {project.tagline}
              </motion.p>

              {/* meta grid */}
              <motion.dl
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-4"
              >
                {[
                  ["ROLE", project.role],
                  ["DURATION", project.duration],
                  ["TEAM", project.teamSize],
                  ["TOOLS", project.software.join(" · ")],
                ].map(([k, v]) => (
                  <div key={k} className="bg-surface p-4">
                    <dt className="font-tech text-ink-faint">{k}</dt>
                    <dd className="mt-1.5 text-[13px] leading-snug text-ink">{v}</dd>
                  </div>
                ))}
              </motion.dl>
            </header>

            {/* ── hero image ────────────────────────────────── */}
            <motion.figure
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
              className="print-block relative mt-10 aspect-[21/9] overflow-hidden border border-line"
            >
              <Image
                src={project.cover}
                alt={project.coverAlt}
                fill
                sizes="(min-width: 1024px) 1000px, 100vw"
                className="object-cover"
              />
              <figcaption className="font-tech absolute bottom-3 left-3 bg-paper/90 px-2.5 py-1.5 text-ink-soft backdrop-blur">
                {project.categoryLabel.toUpperCase()} · FIG. {project.index}
              </figcaption>
            </motion.figure>

            {/* ── content blocks ────────────────────────────── */}
            <div className="grid grid-cols-1 gap-x-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Block n="01 /" title="The Brief">
                  <p className="text-[15px] leading-relaxed text-ink-soft">{project.brief}</p>
                </Block>

                <Block n="02 /" title="The Problem">
                  <p className="text-[15px] leading-relaxed text-ink-soft">{project.problem}</p>
                </Block>

                <Block n="03 /" title="Engineering Approach">
                  <ol className="flex flex-col gap-6">
                    {project.approach.map((a, i) => (
                      <li key={a.title} className="relative border-l-2 border-line pl-5">
                        <span className="font-tech absolute -left-[7px] top-1 grid h-3 w-3 place-items-center rounded-full border border-eng bg-paper" aria-hidden />
                        <h4 className="font-display text-base font-semibold text-ink">
                          <span className="font-tech mr-2 text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                          {a.title}
                        </h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{a.body}</p>
                      </li>
                    ))}
                  </ol>
                </Block>

                {project.calculations.length > 0 && (
                  <Block n="04 /" title="Selected Calculations">
                    <div className="flex flex-col gap-4">
                      {project.calculations.map((c) => (
                        <div key={c.title} className="border border-line bg-surface">
                          <div className="border-b border-line bg-surface-2 px-4 py-2">
                            <span className="font-tech text-eng">{c.title}</span>
                          </div>
                          <pre className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-7 text-ink">
{c.lines.join("\n")}
                          </pre>
                          {c.note && (
                            <p className="border-t border-line bg-amber-tint px-4 py-2.5 text-xs italic text-ink-soft">
                              {c.note}
                            </p>
                          )}
                        </div>
                      ))}
                      <p className="text-xs text-ink-faint">
                        Values shown are worked academic examples — verify against the project
                        report before publication (spec §2).
                      </p>
                    </div>
                  </Block>
                )}
              </div>

              {/* ── side column ─────────────────────────────── */}
              <aside className="lg:col-span-5 lg:pt-10">
                <div className="sticky top-24 flex flex-col gap-4">
                  {project.designCriteria.length > 0 && (
                    <div className="border border-line bg-surface p-5">
                      <h4 className="font-tech text-eng">DESIGN CRITERIA</h4>
                      <ul className="mt-3 flex flex-col gap-2">
                        {project.designCriteria.map((d) => (
                          <li key={d} className="flex gap-2.5 text-[13px] leading-snug text-ink-soft">
                            <span className="mt-[7px] h-1 w-1 shrink-0 rotate-45 bg-amber" aria-hidden />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {project.constraints.length > 0 && (
                    <div className="border border-line bg-surface p-5">
                      <h4 className="font-tech text-eng">CONSTRAINTS</h4>
                      <ul className="mt-3 flex flex-col gap-2">
                        {project.constraints.map((d) => (
                          <li key={d} className="flex gap-2.5 text-[13px] leading-snug text-ink-soft">
                            <span className="mt-[7px] h-1 w-1 shrink-0 bg-line-strong" aria-hidden />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="border border-line bg-surface p-5">
                    <h4 className="font-tech text-eng">EVIDENCE SET</h4>
                    <ul className="mt-3 flex flex-col gap-2">
                      {project.evidence.map((e) => (
                        <li key={e.label} className="flex items-baseline justify-between gap-3 border-b border-line pb-2 text-[13px] last:border-0">
                          <span className="text-ink">{e.label}</span>
                          <span className="font-tech text-right text-ink-faint">{e.detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border border-line bg-surface p-5">
                    <h4 className="font-tech text-eng">REFERENCES</h4>
                    <p className="mt-3 font-mono text-[12px] leading-6 text-ink-soft">
                      {project.standards.join(" · ")}
                    </p>
                    <p className="mt-3 text-[11px] leading-relaxed text-ink-faint">
                      Academic exposure only — listing a standard does not imply professional
                      authorization.
                    </p>
                  </div>
                </div>
              </aside>

              {/* ── structural diagrams for flagship ────────── */}
              {project.slug === "rc-building-design" && (
                <Block n="05 /" title="Analysis Output — BMD / SFD" wide>
                  <div className="border border-line bg-surface p-6">
                    <BmdSfdDiagram />
                    <p className="mt-4 border-t border-line pt-4 text-[13px] leading-relaxed text-ink-soft">
                      What this result means: the parabolic moment diagram confirms sagging action
                      mid-span with hogging expected over continuous supports; the shear diagram
                      crosses zero at maximum moment, as it must. Software accelerated analysis —
                      engineering judgment confirmed the output was physically reasonable before
                      member design proceeded.
                    </p>
                  </div>
                </Block>
              )}

              <div className="lg:col-span-7">
                <Block n={project.slug === "rc-building-design" ? "06 /" : "05 /"} title="Results & Outputs">
                  <ul className="flex flex-col gap-2.5">
                    {project.results.map((r) => (
                      <li key={r} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                        <span className="font-tech mt-1 shrink-0 text-eng" aria-hidden>+</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </Block>

                <Block n={project.slug === "rc-building-design" ? "07 /" : "06 /"} title="Limitations">
                  <ul className="flex flex-col gap-2.5">
                    {project.limitations.map((l) => (
                      <li key={l} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                        <span className="font-tech mt-0.5 shrink-0 text-amber" aria-hidden>!</span>
                        {l}
                      </li>
                    ))}
                  </ul>
                </Block>

                <Block n={project.slug === "rc-building-design" ? "08 /" : "07 /"} title="Lessons Learned">
                  <blockquote className="border-l-2 border-eng pl-5 text-[15px] italic leading-relaxed text-ink">
                    {project.lessons}
                  </blockquote>
                </Block>

                {project.improvements.length > 0 && (
                  <Block n={project.slug === "rc-building-design" ? "09 /" : "08 /"} title="Future Improvements">
                    <div className="flex flex-wrap gap-2">
                      {project.improvements.map((im) => (
                        <span key={im} className="font-tech border border-line px-3 py-1.5 text-ink-soft">
                          {im}
                        </span>
                      ))}
                    </div>
                  </Block>
                )}
              </div>
            </div>

            {/* ── next project ────────────────────────────────── */}
            {next && (
              <button
                type="button"
                onClick={() => {
                  onNavigate(next.slug);
                  requestAnimationFrame(() => {
                    document.querySelector('[role="dialog"]')?.scrollTo({ top: 0 });
                  });
                }}
                className="group mt-6 flex w-full items-center justify-between gap-6 border border-line bg-surface p-6 text-left transition-colors hover:border-eng sm:p-8"
              >
                <div>
                  <p className="font-tech text-ink-faint">NEXT CASE STUDY — {next.index}</p>
                  <p className="font-display mt-2 text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-eng sm:text-2xl">
                    {next.shortTitle}
                  </p>
                </div>
                <ArrowRight className="h-6 w-6 shrink-0 text-ink-soft transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-eng" aria-hidden />
              </button>
            )}
          </div>

          <div className="h-16" aria-hidden />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
