"use client";

/* ══════════════════════════════════════════════════════════════════
   PROJECTS SHOWCASE — MONUMENT edition (spec §10 order 3–4)
   SHT 03 · Featured FYP as a sticky cinematic poster that
           zooms and dims as you scroll through it
   SHT 04 · Project register as a pinned horizontal gallery
           (desktop) with live sheet counter; vertical on mobile
   ══════════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, MousePointerClick } from "lucide-react";
import { projects, featuredProject } from "@/data/projects";
import { SectionHeader } from "@/components/structural/SectionHeader";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { CaseStudyOverlay } from "@/components/projects/CaseStudyOverlay";
import { Reveal, RevealLine } from "@/components/ui/motion-primitives";
import { EASE } from "@/lib/motion";

const OBJECTIVES = [
  "Structural layout",
  "Design loads",
  "Analysis model",
  "Slab design",
  "Beam design",
  "Column design",
  "Foundations",
  "Serviceability",
  "Detailing",
  "Drawings",
  "Manual checks",
  "Constructability",
];

export function ProjectsShowcase() {
  const [active, setActive] = useState<string | null>(null);
  const open = (slug: string) => setActive(slug);
  const others = projects.filter((p) => !p.featured);

  return (
    <>
      <FeaturedPoster onOpen={() => open(featuredProject.slug)} />
      <RegisterGallery others={others} onOpen={open} />

      {/* ═══ case study overlay ═══════════════════════════════ */}
      <CaseStudyOverlay
        slug={active}
        onClose={() => setActive(null)}
        onNavigate={(slug) => setActive(slug)}
      />
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SHT 03 — FEATURED FYP · sticky cinematic poster
   ══════════════════════════════════════════════════════════════════ */
function FeaturedPoster({ onOpen }: { onOpen: () => void }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.16]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "6%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="featured"
      ref={ref}
      aria-label="Featured final-year project"
      className="relative h-[170vh] border-b border-line"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-ink">
        {/* poster image — zooms as you scroll */}
        <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
          <Image
            src={featuredProject.cover}
            alt={featuredProject.coverAlt}
            fill
            priority
            sizes="100vw"
            className="img-cine object-cover"
          />
        </motion.div>

        {/* cinematic treatment: gradient leg + grain + vignette */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-paper via-paper/25 to-transparent dark:from-paper dark:via-paper/10" />
        <div aria-hidden className="grain-overlay vignette absolute inset-0" />

        {/* giant ghost numeral */}
        <motion.span
          aria-hidden
          style={{ opacity: fade }}
          className="text-outline pointer-events-none absolute -right-4 top-14 select-none font-expo text-[clamp(9rem,26vw,24rem)] font-bold leading-none text-ink/0"
        >
          01
        </motion.span>

        {/* poster content */}
        <motion.div
          style={{ y: contentY, opacity: fade }}
          className="absolute inset-x-0 bottom-0"
        >
          <div className="mx-auto max-w-[88rem] px-4 pb-10 sm:px-6 lg:px-10 lg:pb-14">
            <div className="flex flex-wrap items-center gap-3 font-tech text-ink-faint">
              <span className="bg-amber px-2.5 py-1 text-amber-foreground">SHT 03</span>
              <span>FEATURED PROJECT · FINAL-YEAR DESIGN</span>
              <span className="hidden sm:inline">· ETABS MODEL · FIG. 01</span>
            </div>

            <h2 className="display-expo mt-5 max-w-5xl text-[clamp(2.1rem,6vw,5.2rem)] font-bold uppercase text-ink">
              <RevealLine>Multi-Storey</RevealLine>
              <RevealLine delay={0.1}>
                <span className="text-outline">Reinforced Concrete</span>
              </RevealLine>
              <RevealLine delay={0.2}>Design</RevealLine>
            </h2>

            <div className="mt-7 flex flex-wrap items-end justify-between gap-6">
              <p className="max-w-xl text-[15px] leading-relaxed text-ink-soft">
                The flagship final-year project: a complete structural scheme taken from grid
                layout and load assessment through analysis, member design, foundation sizing
                and reinforcement detailing.
              </p>
              <button
                type="button"
                onClick={onOpen}
                data-cursor="OPEN"
                className="btn-plate group inline-flex items-center gap-3 bg-amber px-6 py-3.5 font-tech text-amber-foreground"
              >
                Explore the Design Case Study
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </button>
            </div>

            {/* meta strip */}
            <div className="mt-8 grid grid-cols-3 gap-px border border-line bg-line">
              {[
                ["STOREYS", "5–8 [ph]"],
                ["SYSTEM", "RC MOMENT FRAME"],
                ["ANALYSIS", "ETABS + HAND CHECKS"],
              ].map(([k, v]) => (
                <div key={k} className="bg-paper/90 px-4 py-3 backdrop-blur-sm">
                  <p className="font-tech text-ink-faint">{k}</p>
                  <p className="font-tech mt-1 text-amber">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── details band below the poster ─────────────────────────── */}
      <div className="relative bg-paper">
        <div className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5" y={36}>
              <p className="font-tech text-amber">FINAL-YEAR ENGINEERING PROJECT</p>
              <p className="mt-4 text-[15px] leading-[1.85] text-ink-soft">
                {featuredProject.brief}
              </p>
              <div className="mt-6 border-l-2 border-amber pl-4">
                <p className="font-tech text-ink-faint">DESIGN SEQUENCE</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  Loads → analysis → member design → foundations → detailing → drawings, with
                  manual checks at every stage.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="lg:col-span-7" y={36}>
              <div className="border border-line bg-surface">
                <div className="border-b border-line bg-surface-2 px-5 py-2.5">
                  <span className="font-tech text-eng">PROJECT OBJECTIVES</span>
                </div>
                <ol className="grid grid-cols-1 gap-x-6 px-5 py-4 sm:grid-cols-2 lg:grid-cols-3">
                  {OBJECTIVES.map((o, i) => (
                    <li
                      key={o}
                      className="group flex items-baseline gap-2.5 border-b border-line/60 py-1.5 text-[13px] text-ink last:border-0"
                    >
                      <span className="font-tech text-ink-faint transition-colors group-hover:text-amber">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {o}
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SHT 04 — PROJECT REGISTER · pinned horizontal gallery
   ══════════════════════════════════════════════════════════════════ */
const DESKTOP = "(min-width: 768px)";
const subscribeDesktop = (cb: () => void) => {
  const mq = window.matchMedia(DESKTOP);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getDesktop = () => window.matchMedia(DESKTOP).matches;
const getDesktopServer = () => false;

function RegisterGallery({
  others,
  onOpen,
}: {
  others: typeof projects;
  onOpen: (slug: string) => void;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState(0);
  const [sheet, setSheet] = useState(1);
  const reduce = useReducedMotion();
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktop,
    getDesktopServer
  );

  /* target only once the desktop track is actually mounted —
     framer-motion throws if a defined ref never hydrates */
  const { scrollYProgress } = useScroll({
    target: isDesktop ? sectionRef : undefined,
  });
  const x = useTransform(scrollYProgress, [0.02, 0.98], [0, -range]);
  const progressScale = useTransform(scrollYProgress, [0.02, 0.98], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.min(
      others.length,
      Math.max(1, Math.round(p * others.length))
    );
    setSheet(idx);
  });

  /* measure the horizontal travel distance (re-run when the
     desktop track mounts after the matchMedia flip) */
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const pad = typeof window !== "undefined" ? window.innerWidth * 0.04 : 0;
      setRange(
        Math.max(0, trackRef.current.scrollWidth - window.innerWidth + pad)
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [isDesktop]);

  return (
    <section id="projects" aria-label="Selected engineering work" className="border-b border-line">
      {/* header (shared by both layouts) */}
      <div className="mx-auto max-w-[88rem] px-4 pb-12 pt-20 sm:px-6 lg:px-10 lg:pt-28">
        <SectionHeader
          number="04"
          sheet="PROJECT REGISTER"
          title="Selected Engineering Work"
          description="Six case studies spanning structures, transportation, geotechnics, water, construction management and surveying — each presented as evidence, not decoration. Select any sheet to open the full case study."
        />
      </div>

      {/* ── desktop: pinned horizontal track ──────────────────────── */}
      {isDesktop && (
      <div ref={sectionRef} className="relative h-[380vh]">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          {/* gallery chrome row */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10">
            <div className="mx-auto flex max-w-[88rem] items-center justify-between px-4 pt-24 sm:px-6 lg:px-10">
              <span className="font-tech flex items-center gap-2 text-ink-faint">
                <MousePointerClick className="h-3.5 w-3.5" aria-hidden />
                SCROLL TO TRAVERSE THE REGISTER
              </span>
              <span className="font-tech text-ink-soft tabular-nums">
                {String(sheet).padStart(2, "0")} / {String(others.length).padStart(2, "0")}
              </span>
            </div>
            <div className="mx-auto mt-3 h-px max-w-[88rem] px-4 sm:px-6 lg:px-10">
              <motion.span
                className="block h-full origin-left bg-amber"
                style={{ scaleX: progressScale }}
              />
            </div>
          </div>

          {/* the track */}
          <motion.div
            ref={trackRef}
            style={reduce ? undefined : { x }}
            className="flex w-max items-stretch gap-8 pl-[6vw] pr-[10vw] lg:gap-12"
          >
            {others.map((p) => (
              <GalleryCard key={p.slug} project={p} onOpen={onOpen} />
            ))}

            {/* register summary plate */}
            <div className="flex w-[30vw] min-w-[320px] flex-col justify-between border border-dashed border-line-strong bg-surface/60 p-7">
              <div>
                <p className="font-tech text-ink-faint">REGISTER SUMMARY</p>
                <p className="display-expo mt-5 text-6xl font-bold text-ink">
                  6
                </p>
                <p className="mt-2 text-sm text-ink-soft">
                  documented engineering exercises across the civil &amp; structural
                  curriculum
                </p>
                <p className="font-tech mt-6 leading-6 text-ink-faint">
                  STRUCTURES · TRANSPORT
                  <br />
                  GEOTECH · WATER
                  <br />
                  CONSTRUCTION · SURVEY
                </p>
              </div>
              <p className="mt-8 border-t border-line pt-4 text-[11px] leading-relaxed text-ink-faint">
                All academic works presented with stated assumptions. No regulatory
                approval is claimed for any design shown here.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      )}

      {/* ── mobile: vertical register ────────────────────────────── */}
      <div className="grid gap-6 px-4 pb-20 sm:grid-cols-2 md:hidden">
        {others.map((p) => (
          <ProjectCard key={p.slug} project={p} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

/* ── horizontal gallery card ─────────────────────────────────────── */
function GalleryCard({
  project,
  onOpen,
}: {
  project: (typeof projects)[number];
  onOpen: (slug: string) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.9, ease: EASE }}
      onClick={() => onOpen(project.slug)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(project.slug);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open case study: ${project.title}`}
      data-cursor="OPEN"
      className="group relative w-[64vw] shrink-0 cursor-pointer outline-none sm:w-[52vw] lg:w-[42vw] xl:w-[36vw]"
    >
      <div className="relative h-[54vh] overflow-hidden border border-line bg-surface transition-[border-color,box-shadow] duration-500 group-hover:border-amber/60 group-hover:shadow-[0_40px_80px_-40px_rgba(0,0,0,0.5)] group-focus-visible:border-amber/60">
        <Image
          src={project.cover}
          alt={project.coverAlt}
          fill
          sizes="(min-width: 1280px) 36vw, 55vw"
          className="img-cine object-cover transition-transform duration-[1300ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        {/* overlays */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
        <span className="font-tech absolute left-4 top-4 bg-paper/90 px-2 py-1 text-eng backdrop-blur-sm">
          {project.index}
        </span>
        <span className="font-tech absolute right-4 top-4 bg-paper/90 px-2 py-1 text-ink-soft backdrop-blur-sm">
          {project.year}
        </span>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
          <div>
            <p className="font-tech text-amber">{project.categoryLabel.toUpperCase()}</p>
            <h3 className="font-expo mt-2 max-w-[26ch] text-2xl font-bold leading-tight text-paper">
              {project.shortTitle}
            </h3>
          </div>
          <span className="grid h-10 w-10 shrink-0 place-items-center border border-paper/50 text-paper transition-all duration-500 group-hover:border-amber group-hover:bg-amber group-hover:text-amber-foreground">
            <ArrowUpRight className="h-[18px] w-[18px]" aria-hidden />
          </span>
        </div>
      </div>

      {/* meta ledger under the plate */}
      <dl className="mt-4 flex flex-col gap-1.5 border-t border-line pt-3 font-tech text-ink-soft">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-ink-faint">TYPE</dt>
          <dd className="text-right">{project.type}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-ink-faint">TOOLS</dt>
          <dd className="text-right">{project.software.join(" · ")}</dd>
        </div>
      </dl>
    </motion.article>
  );
}
