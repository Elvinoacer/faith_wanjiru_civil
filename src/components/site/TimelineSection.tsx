"use client";

/* ══════════════════════════════════════════════════════════════════
   TIMELINE + CURRENTLY LEARNING — spec §35, §37 · SHT 11/12
   Scroll-drawn spine with alternating year blocks
   ══════════════════════════════════════════════════════════════════ */

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { timeline, currentlyLearning } from "@/data/portfolio";
import { SectionHeader } from "@/components/structural/SectionHeader";
import { Reveal } from "@/components/ui/motion-primitives";
import { cn } from "@/lib/utils";

export function TimelineSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const spine = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <section id="timeline" aria-label="Engineering timeline" className="border-b border-line">
      <div className="mx-auto max-w-[88rem] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <SectionHeader
          number="11"
          sheet="ENGINEERING TIMELINE"
          title="Five Years, One Direction"
          description="The academic journey from engineering mathematics to a completed final-year structural design — each year building on the last (dates per spec are placeholders)."
        />

        <div ref={ref} className="relative mt-16">
          {/* spine — drawn by scroll */}
          <div aria-hidden className="absolute bottom-0 left-[7px] top-0 w-px bg-line md:left-1/2" />
          <motion.div
            aria-hidden
            style={{ scaleY: reduce ? 1 : spine }}
            className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-eng md:left-1/2"
          />
          {/* chainage ticks */}
          <div aria-hidden className="absolute -left-9 top-0 hidden h-full flex-col justify-between lg:flex">
            {timeline.map((t) => (
              <span key={t.year} className="font-tech text-ink-faint">{t.year}</span>
            ))}
          </div>

          <ol className="flex flex-col gap-12 md:gap-16">
            {timeline.map((t, i) => {
              const left = i % 2 === 0;
              return (
                <li key={t.year} className="relative">
                  {/* node */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-2 z-10 grid h-[15px] w-[15px] place-items-center rounded-full border border-eng bg-paper md:left-1/2 md:-translate-x-1/2"
                  >
                    <span className="h-[5px] w-[5px] rounded-full bg-eng" />
                  </span>
                  <div
                    className={cn(
                      "pl-10 md:w-1/2 md:pl-0",
                      left ? "md:pr-14" : "md:ml-auto md:pl-14"
                    )}
                  >
                    <Reveal y={20}>
                      <div className="group border border-line bg-surface p-5 transition-all duration-500 hover:border-line-strong hover:shadow-[6px_6px_0_0_var(--surface-2)] sm:p-6">
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="font-display text-3xl font-bold tracking-tight text-ink transition-colors group-hover:text-eng sm:text-4xl">
                            {t.year}
                          </span>
                          <span className="font-tech border border-amber/50 bg-amber-tint px-2 py-1 text-amber">
                            {t.tag}
                          </span>
                        </div>
                        <h3 className="font-display mt-2 text-base font-semibold text-ink">{t.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.body}</p>
                      </div>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* ═══ SHT 12 — CURRENTLY LEARNING ═══════════════════ */}
        <div className="mt-24">
          <SectionHeader
            number="12"
            sheet="PROFESSIONAL DEVELOPMENT"
            title="Currently Learning"
            description="Deliberate skill acquisition between graduation and the first role — every item chosen to close a gap identified during the degree."
          />
          <div className="mt-10 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
            {currentlyLearning.map((c, i) => (
              <Reveal key={c.item} delay={i * 0.04} y={16}>
                <div className="group flex h-full flex-col justify-between gap-3 border border-line bg-surface p-4 transition-colors duration-500 hover:border-eng/50">
                  <p className="text-sm font-medium leading-snug text-ink">{c.item}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-tech text-ink-faint">{c.status.toUpperCase()}</span>
                    <span
                      aria-hidden
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        c.status === "In progress" ? "animate-tick bg-eng" : c.status === "Early" ? "bg-amber" : "border border-line-strong"
                      )}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
