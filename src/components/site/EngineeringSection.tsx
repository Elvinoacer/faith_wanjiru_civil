"use client";

/* ══════════════════════════════════════════════════════════════════
   ENGINEERING — spec §15–17 · SHT 07/08
   Focus areas + skill matrix (levels, never percentages) + software
   ══════════════════════════════════════════════════════════════════ */

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { focusAreas, skillGroups, softwareGroups, PROFICIENCY_LABEL, type Proficiency } from "@/data/portfolio";
import { SectionHeader } from "@/components/structural/SectionHeader";
import { Stagger, StaggerItem, Reveal } from "@/components/ui/motion-primitives";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/* discrete proficiency meter — 4 filled/unfilled ticks */
const LEVEL_VALUE: Record<Proficiency, number> = {
  strong: 4,
  "working-knowledge": 3,
  "academic-exposure": 2,
  "currently-learning": 1,
};

function LevelTicks({ proficiency }: { proficiency: Proficiency }) {
  const filled = LEVEL_VALUE[proficiency];
  return (
    <span
      className="inline-flex items-center gap-1"
      role="img"
      aria-label={`${PROFICIENCY_LABEL[proficiency]} (${filled} of 4)`}
    >
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          aria-hidden
          className={cn(
            "h-3 w-[5px] border",
            i <= filled
              ? "border-eng bg-eng"
              : "border-line-strong bg-transparent"
          )}
        />
      ))}
    </span>
  );
}

export function EngineeringSection() {
  return (
    <>
      {/* ═══ SHT 07 — CAPABILITIES ═════════════════════════════ */}
      <section id="engineering" aria-label="Technical capability areas" className="border-b border-line">
        <div className="mx-auto max-w-[88rem] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <SectionHeader
            number="07"
            sheet="CAPABILITY AREAS"
            title="Technical Capability Areas"
            description="Five disciplines, one habit of mind: understand the behaviour first, then the numbers. Expand any area to see the topics within."
          />
          <FocusAreaAccordions />
        </div>
      </section>

      {/* ═══ SHT 08 — SKILL MATRIX + SOFTWARE ══════════════════ */}
      <section aria-label="Skills and software" className="border-b border-line bg-surface/40">
        <div className="mx-auto max-w-[88rem] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <SectionHeader
            number="08"
            sheet="SKILL MATRIX"
            title="Skills & Software"
            description="Honest levels instead of percentages: Strong · Working Knowledge · Academic Exposure · Currently Learning. Every claim is anchored to coursework, laboratory or field evidence."
          />

          {/* legend */}
          <Reveal className="mt-8">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border border-line bg-surface px-4 py-3">
              {(Object.keys(PROFICIENCY_LABEL) as Proficiency[]).map((p) => (
                <span key={p} className="flex items-center gap-2.5">
                  <LevelTicks proficiency={p} />
                  <span className="font-tech text-ink-soft">{PROFICIENCY_LABEL[p].toUpperCase()}</span>
                </span>
              ))}
            </div>
          </Reveal>

          {/* skill groups */}
          <Stagger className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((g) => (
              <StaggerItem key={g.title}>
                <div className="flex h-full flex-col border border-line bg-surface p-5 transition-colors duration-500 hover:border-line-strong">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-base font-semibold text-ink">{g.title}</h3>
                    <span className="font-tech text-ink-faint">{String(g.skills.length).padStart(2, "0")}</span>
                  </div>
                  {g.description && (
                    <p className="mt-1.5 text-xs text-ink-faint">{g.description}</p>
                  )}
                  <ul className="mt-4 flex flex-col gap-0">
                    {g.skills.map((s) => (
                      <li
                        key={s.name}
                        className="group flex items-center justify-between gap-3 border-t border-line/60 py-2 first:border-t-0"
                      >
                        <span className="text-[13px] text-ink-soft transition-colors group-hover:text-ink">
                          {s.name}
                          {s.note && (
                            <span className="font-tech ml-1.5 text-[9px] text-amber">[{s.note}]</span>
                          )}
                        </span>
                        <LevelTicks proficiency={s.proficiency} />
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* software register */}
          <Reveal className="mt-14">
            <div className="border border-line bg-surface">
              <div className="flex items-center justify-between border-b border-line bg-surface-2 px-5 py-3">
                <span className="font-tech text-eng">ENGINEERING SOFTWARE REGISTER</span>
                <span className="font-tech text-ink-faint">SPEC §17 · ONLY REAL TOOLS</span>
              </div>
              <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
                {softwareGroups.map((g) => (
                  <div key={g.title} className="bg-surface p-5">
                    <p className="font-tech text-ink-faint">{g.title.toUpperCase()}</p>
                    <ul className="mt-3 flex flex-col gap-2.5">
                      {g.skills.map((s) => (
                        <li key={s.name}>
                          <p className="text-sm font-medium text-ink">{s.name}</p>
                          <p className="font-tech mt-0.5 text-[9px] text-eng">
                            {PROFICIENCY_LABEL[s.proficiency].toUpperCase()}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ── focus area accordions ─────────────────────────────────────── */
function FocusAreaAccordions() {
  const [open, setOpen] = useState<string | null>(focusAreas[0].id);
  const reduce = useReducedMotion();

  return (
    <Stagger className="mt-14 flex flex-col gap-4">
      {focusAreas.map((area, i) => {
        const isOpen = open === area.id;
        return (
          <StaggerItem key={area.id}>
            <div
              className={cn(
                "border transition-colors duration-500",
                isOpen ? "border-eng/60 bg-surface" : "border-line bg-surface/60 hover:border-line-strong"
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : area.id)}
                aria-expanded={isOpen}
                className="group flex w-full items-center gap-5 px-5 py-5 text-left sm:px-6"
              >
                <span className="font-tech w-8 shrink-0 text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span className="font-display block text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-eng sm:text-xl">
                    {area.title}
                  </span>
                  <span className="mt-1 hidden text-sm text-ink-soft sm:block">{area.positioning}</span>
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center border transition-all duration-300",
                    isOpen ? "border-eng bg-eng text-eng-foreground" : "border-line text-ink-soft group-hover:border-ink"
                  )}
                >
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={reduce ? { height: "auto", opacity: 0 } : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? { height: "auto", opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-line px-5 pb-5 pt-4 sm:px-6">
                      <p className="text-sm leading-relaxed text-ink-soft sm:hidden">{area.positioning}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {area.topics.map((t) => (
                          <span
                            key={t}
                            className="font-tech border border-line bg-surface-2 px-3 py-1.5 text-ink-soft transition-colors hover:border-eng hover:text-eng"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
