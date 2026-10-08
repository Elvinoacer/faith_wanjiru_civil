"use client";

/* ══════════════════════════════════════════════════════════════════
   EXPERIENCE — spec §30–32, §51 · SHT 06
   Industrial attachment with design-intent / site-reality storytelling
   ══════════════════════════════════════════════════════════════════ */

import Image from "next/image";
import { SectionHeader } from "@/components/structural/SectionHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion-primitives";
import { attachment, teamwork } from "@/data/experience";

const STORY = [
  {
    step: "Design Intent",
    body: "What the drawing required — dimensions verified against the structural model before any concrete arrived on site.",
  },
  {
    step: "Site Reality",
    body: "What was observed — reinforcement fixed, formwork checked, and each activity inspected before the next proceeded.",
  },
  {
    step: "Engineering Check",
    body: "What had to be verified — cover, spacing, levels and material records compared against specification.",
  },
  {
    step: "Outcome",
    body: "What was learned — execution quality shapes structural performance as much as calculation does.",
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" aria-label="Industrial attachment and site experience" className="border-b border-line">
      <div className="mx-auto max-w-[88rem] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <SectionHeader
          number="06"
          sheet="INDUSTRIAL EXPERIENCE"
          title="From Drawings to Site Reality"
          description="Twelve weeks of industrial attachment [placeholder period] observing how engineering decisions survive contact with construction — under professional supervision, as part of a live site team."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          {/* ── attachment summary ─────────────────────────────── */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="sticky top-24">
                <div className="crosshair relative">
                  <div className="border border-line bg-surface">
                    <div className="relative aspect-[4/3] overflow-hidden border-b border-line">
                      <Image
                        src={attachment.image}
                        alt={attachment.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover"
                      />
                      <span className="font-tech absolute left-3 top-3 bg-paper/90 px-2 py-1 text-eng backdrop-blur-sm">
                        SITE RECORD · 2025 [PH]
                      </span>
                    </div>
                    <div className="p-5">
                      <p className="font-tech text-amber">INDUSTRIAL ATTACHMENT</p>
                      <h3 className="font-display mt-2 text-xl font-semibold text-ink">{attachment.role}</h3>
                      <p className="mt-1 text-sm text-ink-soft">{attachment.organization}</p>
                      <dl className="mt-4 grid grid-cols-2 gap-px border border-line bg-line">
                        <div className="bg-surface-2 p-3">
                          <dt className="font-tech text-ink-faint">PERIOD</dt>
                          <dd className="mt-1 font-mono text-xs text-ink">{attachment.period}</dd>
                        </div>
                        <div className="bg-surface-2 p-3">
                          <dt className="font-tech text-ink-faint">DEPARTMENT</dt>
                          <dd className="mt-1 font-mono text-xs text-ink">{attachment.department}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>

                {/* equipment observed */}
                <div className="mt-6 border border-line bg-surface p-5">
                  <p className="font-tech text-eng">SITE EXPOSURE — EQUIPMENT & WORKS</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {attachment.equipmentObserved.map((e) => (
                      <span key={e} className="font-tech border border-line px-2 py-1 text-ink-soft">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── responsibilities + story ───────────────────────── */}
          <div className="flex flex-col gap-10 lg:col-span-7">
            <Reveal delay={0.1}>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">
                  Responsibilities — assisted, observed, supported
                </h3>
                <Stagger className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {attachment.responsibilities.map((r) => (
                    <StaggerItem key={r}>
                      <div className="flex h-full items-start gap-3 border-b border-line/60 pb-2.5">
                        <span className="font-tech mt-0.5 shrink-0 text-eng" aria-hidden>+</span>
                        <p className="text-sm leading-snug text-ink-soft">{r}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
                <p className="mt-4 text-[11px] italic text-ink-faint">
                  No independently approved works are claimed — all activity was carried out under
                  supervision (spec §30).
                </p>
              </div>
            </Reveal>

            {/* before/during/after — spec §51 */}
            <Reveal delay={0.15}>
              <div className="border border-line bg-surface">
                <div className="border-b border-line bg-surface-2 px-5 py-2.5">
                  <span className="font-tech text-eng">HOW A SITE ACTIVITY ACTUALLY WORKS</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4">
                  {STORY.map((s, i) => (
                    <div key={s.step} className="relative border-b border-line p-5 last:border-b-0 sm:border-b sm:border-r sm:last:border-r-0 lg:border-b-0 lg:border-r">
                      <span className="font-tech text-amber">STEP {i + 1}</span>
                      <h4 className="font-display mt-2 text-sm font-semibold text-ink">{s.step}</h4>
                      <p className="mt-2 text-xs leading-relaxed text-ink-soft">{s.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* lesson quote — spec §32 */}
            <Reveal delay={0.2}>
              <blockquote className="relative border-l-2 border-amber bg-amber-tint/60 p-6">
                <p className="text-[15px] italic leading-relaxed text-ink">
                  &ldquo;{attachment.summary}&rdquo;
                </p>
                <footer className="font-tech mt-4 text-ink-faint">
                  — FAITH WANJIRU · ATTACHMENT REFLECTION
                </footer>
              </blockquote>
            </Reveal>

            {/* teamwork — spec §41 */}
            <Reveal delay={0.25}>
              <div className="grid gap-4 sm:grid-cols-2">
                {teamwork.map((t) => (
                  <div key={t.context} className="border border-line bg-surface p-5">
                    <span className="font-tech text-eng">{t.context.toUpperCase()}</span>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-ink-soft">{t.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
