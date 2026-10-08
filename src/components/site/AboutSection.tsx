"use client";

/* ══════════════════════════════════════════════════════════════════
   ABOUT + PHILOSOPHY — spec §14, §36, §40 · SHT 13
   Portrait · narrative · sustainability · philosophy mantra
   ══════════════════════════════════════════════════════════════════ */

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { about, philosophy, sustainability, documentationSkills } from "@/data/portfolio";
import { SectionHeader } from "@/components/structural/SectionHeader";
import { Reveal, RevealLine, WordReveal, ParallaxImage } from "@/components/ui/motion-primitives";

export function AboutSection() {
  const reduce = useReducedMotion();
  const quoteRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: quoteRef, offset: ["start end", "end start"] });
  const yWords = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 40, reduce ? 0 : -40]);

  return (
    <>
      {/* ═══ SHT 13 — ABOUT ═══════════════════════════════════ */}
      <section id="about" aria-label="About Faith Wanjiru" className="border-b border-line">
        <div className="mx-auto max-w-[88rem] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <SectionHeader
            number="13"
            sheet="ABOUT THE ENGINEER"
            title="Who Is Faith Wanjiru?"
            description="A graduate engineer interested in the seam between design intent and site execution — and in infrastructure that lasts."
          />

          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            {/* portrait column */}
            <div className="lg:col-span-4">
              <Reveal>
                <figure className="crosshair lg:sticky lg:top-24">
                  <div className="border border-line bg-surface p-2">
                    <ParallaxImage
                      src="/images/about-faith.png"
                      alt="Faith Wanjiru working at a drafting desk with structural drawings"
                      sizes="(min-width: 1024px) 32vw, 100vw"
                      className="aspect-[3/4] w-full"
                      drift={7}
                    />
                    <figcaption className="flex items-center justify-between border-t border-line px-3 py-2">
                      <span className="font-tech text-ink-soft">{about.imageCaption}</span>
                      <span className="font-tech text-ink-faint">FIG. 13</span>
                    </figcaption>
                  </div>
                </figure>
              </Reveal>
            </div>

            {/* narrative column */}
            <div className="lg:col-span-8">
              <div className="flex max-w-2xl flex-col gap-5">
                {about.paragraphs.map((p, i) => (
                  <Reveal key={i} delay={i * 0.07}>
                    <p className="text-[15px] leading-[1.85] text-ink-soft">
                      {i === 2 ? (
                        <>
                          I am particularly interested in{" "}
                          <span className="font-medium text-ink">the connection between design intent and site execution</span>{" "}
                          — how calculations, drawings, material behaviour, workmanship, cost, safety
                          and constructability come together in a successful project.
                        </>
                      ) : (
                        p
                      )}
                    </p>
                  </Reveal>
                ))}
              </div>

              {/* sustainability — spec §40 */}
              <Reveal delay={0.2} className="mt-10">
                <div className="border border-eng/40 bg-eng-tint/40 p-6">
                  <h3 className="font-display text-base font-semibold text-ink">
                    Sustainability Interests
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
                    {sustainability.copy}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {sustainability.interests.map((s) => (
                      <span key={s} className="font-tech border border-eng/30 bg-surface px-3 py-1.5 text-eng">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* documentation skills — spec §39 */}
              <Reveal delay={0.25} className="mt-6">
                <div className="border border-line bg-surface p-6">
                  <h3 className="font-display text-base font-semibold text-ink">
                    Construction Documentation Fluency
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    {documentationSkills.map((d) => (
                      <li key={d} className="flex items-baseline gap-2 text-[13px] text-ink-soft">
                        <span className="mt-[6px] h-1 w-1 shrink-0 rotate-45 bg-eng" aria-hidden />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PHILOSOPHY — scroll-illuminated manifesto ═════════ */}
      <section ref={quoteRef} aria-label="Engineering philosophy" className="bg-grain relative overflow-hidden border-b border-line">
        <div aria-hidden className="bg-blueprint absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,black,transparent)]" />
        <div className="relative mx-auto max-w-[88rem] px-4 py-24 sm:px-6 lg:px-10 lg:py-36">
          <motion.p style={{ y: yWords }} className="font-tech text-center text-amber">
            ENGINEERING PHILOSOPHY
          </motion.p>
          <blockquote className="mt-8 text-center">
            {philosophy.mantra.map((line, i) => (
              <h3
                key={line}
                className={
                  i === 1
                    ? "display-expo text-outline-amber text-[clamp(2.2rem,6.5vw,5.5rem)] font-bold uppercase"
                    : "display-expo text-[clamp(2.2rem,6.5vw,5.5rem)] font-bold uppercase text-ink"
                }
              >
                <RevealLine delay={i * 0.12}>{line}</RevealLine>
              </h3>
            ))}
          </blockquote>
          <WordReveal
            text={philosophy.expanded}
            accentWords={["assumptions", "physical reality", "considered together"]}
            className="mx-auto mt-12 max-w-3xl text-center text-lg leading-[1.9] text-ink"
          />
          <Reveal delay={0.3}>
            <p className="font-tech mt-10 text-center text-ink-faint">
              DESIGN FOR CONSTRUCTION, SAFETY AND LONG-TERM PERFORMANCE
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
