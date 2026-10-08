"use client";

/* ══════════════════════════════════════════════════════════════════
   FYP WORKFLOW — spec §20–27 · SHT 05
   Design flow · load path · analysis output · verification ·
   serviceability · foundations · lessons
   ══════════════════════════════════════════════════════════════════ */

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/structural/SectionHeader";
import { BmdSfdDiagram, LoadPathDiagram } from "@/components/structural/diagrams";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion-primitives";

const EASE = [0.22, 1, 0.36, 1] as const;

const WORKFLOW = [
  { stage: "Architectural Requirements", col: 0 },
  { stage: "Structural Grid", col: 0 },
  { stage: "Preliminary Member Sizing", col: 0 },
  { stage: "Load Assessment", col: 0 },
  { stage: "Analysis Model", col: 0 },
  { stage: "Analysis Results", col: 0, branch: ["Manual Checks", "Software Checks"] },
  { stage: "Member Design", col: 0, branch: ["Slab", "Beam", "Column"] },
  { stage: "Foundation Design", col: 0 },
  { stage: "Serviceability", col: 0 },
  { stage: "Structural Detailing", col: 0 },
  { stage: "Drawings / Schedules", col: 0 },
];

const SERVICEABILITY = [
  { title: "Deflection", body: "Span/depth checks and calculated deflections compared with limits — comfort and finish integrity." },
  { title: "Crack Control", body: "Bar spacing and minimum steel considerations to keep cracking within acceptable service behaviour." },
  { title: "Durability", body: "Cover and exposure-class awareness so the structure survives its environment, not just its load test." },
  { title: "Reinforcement Detailing", body: "Minimum steel, anchorage and lap rules that make analysis assumptions buildable on site." },
];

const FOUNDATION = [
  "Assumed soil bearing capacity [placeholder — no site investigation]",
  "Column reactions from the global model",
  "Isolated footing sizing for worst-case columns",
  "Punching shear awareness at column-footing interfaces",
  "One-way shear and bending checks",
  "Settlement considerations flagged qualitatively",
];

export function FypWorkflow() {
  const reduce = useReducedMotion();

  return (
    <section id="fyp" aria-label="Structural design workflow deep dive" className="border-b border-line bg-surface/40">
      <div className="mx-auto max-w-[88rem] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <SectionHeader
          number="05"
          sheet="DESIGN WORKFLOW"
          title="How the Scheme Was Developed"
          description="Structural design is a sequence of decisions, each dependent on the last. This is the workflow behind the flagship project — traced from architectural requirements to reinforcement schedules."
        />

        {/* ── workflow flow ────────────────────────────────────── */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <ol className="relative flex flex-col gap-0">
                {WORKFLOW.map((w, i) => (
                  <motion.li
                    key={w.stage}
                    initial={reduce ? false : { opacity: 0, x: -18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.5, ease: EASE }}
                    className="group relative"
                  >
                    <div className="flex items-center gap-4 py-2.5">
                      <span className="font-tech w-7 shrink-0 text-right text-ink-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="relative z-10 grid h-2.5 w-2.5 shrink-0 place-items-center rounded-full border border-eng bg-paper transition-colors duration-300 group-hover:bg-eng" aria-hidden />
                      <span className="text-sm font-medium text-ink transition-colors group-hover:text-eng">
                        {w.stage}
                      </span>
                    </div>
                    {w.branch && (
                      <div className="ml-[46px] flex gap-2 py-1">
                        {w.branch.map((b) => (
                          <span key={b} className="font-tech border border-line bg-surface px-2.5 py-1 text-ink-soft">
                            {b}
                          </span>
                        ))}
                      </div>
                    )}
                    {i < WORKFLOW.length - 1 && (
                      <span aria-hidden className="absolute left-[10px] top-[26px] h-[calc(100%-8px)] w-px bg-line" />
                    )}
                  </motion.li>
                ))}
              </ol>
              <p className="font-tech mt-6 border-t border-line pt-4 text-ink-faint">
                FLOW PER SPEC §20 · ITERATED, NOT LINEAR
              </p>
            </Reveal>
          </div>

          {/* ── load path + analysis ──────────────────────────── */}
          <div className="flex flex-col gap-8 lg:col-span-7">
            <Reveal delay={0.15}>
              <div className="border border-line bg-surface p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-base font-semibold text-ink">Load Path — gravity flow</h3>
                  <span className="font-tech text-ink-faint">SK-02</span>
                </div>
                <div className="mt-4">
                  <LoadPathDiagram />
                </div>
                <p className="mt-4 border-t border-line pt-4 text-[13px] leading-relaxed text-ink-soft">
                  Every load finds its way to soil. Making the path explicit — slab tributaries to
                  beams, beams to columns, columns through footings to ground — is the first
                  structural decision, made before any software is opened.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="border border-line bg-surface p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-base font-semibold text-ink">Analysis Output — envelope behaviour</h3>
                  <span className="font-tech text-ink-faint">FIG. 02</span>
                </div>
                <div className="mt-4">
                  <BmdSfdDiagram />
                </div>
              </div>
            </Reveal>

            {/* verification — spec §23 */}
            <Reveal delay={0.35}>
              <div className="border border-eng/40 bg-eng-tint/50 p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-base font-semibold text-ink">
                    Verification — software vs hand calculation
                  </h3>
                  <span className="font-tech text-eng">CHECK</span>
                </div>
                <div className="mt-4 overflow-hidden border border-line bg-surface">
                  <table className="w-full text-left text-[13px]">
                    <caption className="sr-only">
                      Comparison of hand-calculated estimates against ETABS software output for a
                      selected beam
                    </caption>
                    <thead>
                      <tr className="border-b border-line bg-surface-2">
                        <th scope="col" className="px-4 py-2.5 font-tech text-ink-faint">CHECK ITEM</th>
                        <th scope="col" className="px-4 py-2.5 font-tech text-ink-faint">VALUE</th>
                      </tr>
                    </thead>
                    <tbody className="font-mono">
                      {[
                        ["Tributary load", "[placeholder] kN/m"],
                        ["Effective span", "[placeholder] m"],
                        ["Software bending moment", "[placeholder] kN·m"],
                        ["Hand-calculated estimate", "[placeholder] kN·m"],
                        ["Difference", "[placeholder] %"],
                      ].map(([k, v], i) => (
                        <tr key={k} className={i === 4 ? "border-t-2 border-eng/50 bg-eng-tint/40" : "border-b border-line/60"}>
                          <td className="px-4 py-2.5 text-ink">{k}</td>
                          <td className="px-4 py-2.5 text-eng">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-[13px] leading-relaxed text-ink-soft">
                  Differences arise from continuity, support stiffness and modelling assumptions.
                  The purpose of the check is confirming the model is physically reasonable — not
                  proving either value exact.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── serviceability + foundation row ─────────────────── */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-1">
            {SERVICEABILITY.map((s) => (
              <StaggerItem key={s.title}>
                <div className="h-full border border-line bg-surface p-5 transition-colors duration-500 hover:border-eng/50">
                  <span className="font-tech text-eng">SERVICEABILITY</span>
                  <h4 className="font-display mt-2 text-base font-semibold text-ink">{s.title}</h4>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{s.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col border border-line bg-surface p-6">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-base font-semibold text-ink">Foundation Design — inputs & checks</h3>
                <span className="font-tech text-amber">GROUND</span>
              </div>
              <ul className="mt-4 flex flex-1 flex-col gap-3">
                {FOUNDATION.map((f) => (
                  <li key={f} className="flex gap-3 border-b border-line/60 pb-3 text-sm leading-relaxed text-ink-soft last:border-0">
                    <span className="font-tech mt-0.5 shrink-0 text-eng" aria-hidden>▸</span>
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-line pt-4 text-[11px] italic leading-relaxed text-ink-faint">
                Foundation design used assumed soil parameters as instructed — no site investigation
                was within project scope (spec §25).
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
