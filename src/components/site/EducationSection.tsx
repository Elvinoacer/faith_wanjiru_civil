"use client";

/* ══════════════════════════════════════════════════════════════════
   EDUCATION + LABS & FIELD — spec §18, §33–34 · SHT 09/10
   ══════════════════════════════════════════════════════════════════ */

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap, FlaskConical, Compass } from "lucide-react";
import { education, standards } from "@/data/portfolio";
import { laboratories, fieldwork } from "@/data/experience";
import { SectionHeader } from "@/components/structural/SectionHeader";
import { Stagger, StaggerItem, Reveal } from "@/components/ui/motion-primitives";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function EducationSection() {
  const [activeModule, setActiveModule] = useState(education.modules[0].category);
  const reduce = useReducedMotion();
  const modules = education.modules.find((m) => m.category === activeModule) ?? education.modules[0];

  return (
    <>
      {/* ═══ SHT 09 — EDUCATION ═══════════════════════════════ */}
      <section id="education" aria-label="Education" className="border-b border-line">
        <div className="mx-auto max-w-[88rem] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <SectionHeader
            number="09"
            sheet="ACADEMIC RECORD"
            title="Education"
            description="A five-year engineering degree structured to move from foundations to integrated design — with fieldwork, laboratories and an industrial attachment built into the programme."
          />

          <div className="mt-14 grid gap-10 lg:grid-cols-12">
            {/* institution card */}
            <Reveal className="lg:col-span-5">
              <div className="sticky top-24 border border-line bg-surface">
                <div className="flex items-center gap-4 border-b border-line bg-surface-2 px-6 py-5">
                  <span className="grid h-11 w-11 place-items-center border border-eng/40 text-eng">
                    <GraduationCap className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">{education.institution}</h3>
                    <p className="font-tech mt-0.5 text-ink-faint">{education.school}</p>
                  </div>
                </div>
                <dl className="divide-y divide-line">
                  {[
                    ["DEGREE", education.degree],
                    ["LOCATION", education.location ?? "—"],
                    ["PERIOD", `${education.startYear} – ${education.graduationYear}`],
                    ["CLASSIFICATION", education.classification ?? "[placeholder]"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex items-baseline justify-between gap-6 px-6 py-3.5">
                      <dt className="font-tech shrink-0 text-ink-faint">{k}</dt>
                      <dd className="text-right text-sm text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="border-t border-line bg-amber-tint/50 px-6 py-4">
                  <p className="text-[11px] leading-relaxed text-ink-soft">
                    Classification and final academic results pending verification — presented per
                    spec §2 placeholder policy.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* module browser */}
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <div className="border border-line bg-surface">
                  <div className="flex items-center justify-between border-b border-line bg-surface-2 px-5 py-3">
                    <span className="font-tech text-eng">COURSEWORK REGISTER</span>
                    <span className="font-tech text-ink-faint">
                      {education.modules.reduce((n, m) => n + m.items.length, 0)} UNITS SURVEYED
                    </span>
                  </div>

                  {/* module tabs */}
                  <div className="flex flex-wrap gap-1.5 border-b border-line px-4 py-3" role="tablist" aria-label="Coursework categories">
                    {education.modules.map((m) => (
                      <button
                        key={m.category}
                        role="tab"
                        aria-selected={activeModule === m.category}
                        onClick={() => setActiveModule(m.category)}
                        className={cn(
                          "font-tech border px-3 py-1.5 transition-all duration-300",
                          activeModule === m.category
                            ? "border-eng bg-eng text-eng-foreground"
                            : "border-line text-ink-soft hover:border-ink hover:text-ink"
                        )}
                      >
                        {m.category.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  {/* module items */}
                  <motion.ul
                    key={activeModule}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="grid gap-px bg-line sm:grid-cols-2"
                  >
                    {modules.items.map((item, i) => (
                      <li key={item} className="flex items-baseline gap-3 bg-surface px-4 py-3">
                        <span className="font-tech text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-sm text-ink">{item}</span>
                      </li>
                    ))}
                  </motion.ul>
                </div>
              </Reveal>

              {/* codes & standards — spec §38 */}
              <Reveal delay={0.2} className="mt-6">
                <div className="border border-line bg-surface p-5">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-base font-semibold text-ink">Codes & Standards Encountered</h3>
                    <span className="font-tech text-amber">ACADEMIC EXPOSURE</span>
                  </div>
                  <ul className="mt-4 grid gap-px bg-line sm:grid-cols-2">
                    {standards.map((s) => (
                      <li key={s.code} className="flex items-baseline gap-3 bg-surface px-3 py-2.5">
                        <span className="font-mono w-16 shrink-0 text-xs font-semibold text-eng">{s.code}</span>
                        <span className="text-xs leading-snug text-ink-soft">{s.title}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[11px] italic leading-relaxed text-ink-faint">
                    Listing a code means academic exposure — not professional authorization or
                    mastery (spec §38).
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SHT 10 — LABS & FIELD ════════════════════════════ */}
      <section id="labs" aria-label="Laboratory and fieldwork experience" className="border-b border-line bg-surface/40">
        <div className="mx-auto max-w-[88rem] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <SectionHeader
            number="10"
            sheet="LABORATORY & FIELD"
            title="Where Theory Met Apparatus"
            description="Fresh graduates carry real technical evidence from laboratories and field camps — precise, disciplined work that deserves display alongside any drawing set."
          />

          {/* laboratories */}
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {laboratories.map((lab, i) => (
              <Reveal key={lab.id} delay={i * 0.08}>
                <article className="group grid overflow-hidden border border-line bg-surface sm:grid-cols-2">
                  <div className="relative aspect-[4/3] overflow-hidden border-b border-line sm:border-b-0 sm:border-r">
                    <Image
                      src={lab.image}
                      alt={lab.imageAlt}
                      fill
                      sizes="(min-width: 768px) 25vw, 100vw"
                      className="object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-105"
                    />
                    <span className="font-tech absolute left-3 top-3 bg-paper/90 px-2 py-1 text-eng backdrop-blur-sm">
                      LAB {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-col p-5">
                    <div className="flex items-center gap-2">
                      <FlaskConical className="h-4 w-4 text-eng" aria-hidden />
                      <h3 className="font-display text-sm font-semibold leading-snug text-ink">{lab.title}</h3>
                    </div>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {lab.work.map((w) => (
                        <li key={w} className="font-tech border border-line px-2 py-0.5 text-[9px] text-ink-soft">
                          {w}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-auto pt-4 text-xs italic leading-relaxed text-ink-soft">
                      {lab.insight}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* fieldwork */}
          <Reveal className="mt-12">
            <div className="border border-line bg-surface">
              <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-5 py-3">
                <Compass className="h-4 w-4 text-amber" aria-hidden />
                <span className="font-tech text-eng">FIELDWORK RECORD</span>
                <span className="font-tech ml-auto hidden text-ink-faint sm:inline">TREATED AS TECHNICAL EVIDENCE — SPEC §34</span>
              </div>
              <Stagger className="grid gap-px bg-line md:grid-cols-3">
                {fieldwork.map((f) => (
                  <StaggerItem key={f.id}>
                    <div className="h-full bg-surface p-5">
                      <h4 className="font-display text-sm font-semibold text-ink">{f.title}</h4>
                      <ul className="mt-3 flex flex-col gap-1.5">
                        {f.items.map((item) => (
                          <li key={item} className="flex items-baseline gap-2.5 text-[13px] text-ink-soft">
                            <span className="mt-[7px] h-1 w-1 shrink-0 rotate-45 bg-amber" aria-hidden />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
