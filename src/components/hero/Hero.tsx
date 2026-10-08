"use client";

/* ══════════════════════════════════════════════════════════════════
   HERO — MONUMENT opening frame (spec §11–12)
   Colossal expanded type · living structural field canvas ·
   parallax drawing-frame portrait · velocity-skew ticker.
   Entrance is orchestrated by the preloader's loaded context.
   ══════════════════════════════════════════════════════════════════ */

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { useRef } from "react";
import { profile } from "@/data/portfolio";
import { HeroFrame } from "@/components/structural/diagrams";
import { Magnetic } from "@/components/ui/motion-primitives";
import { TickerRow } from "@/components/ui/motion-primitives";
import { NetworkCanvas } from "@/components/hero/NetworkCanvas";
import { useLoaded } from "@/components/site/SiteProviders";
import { EASE } from "@/lib/motion";

const TICKER = [
  "Structural Analysis",
  "Reinforced Concrete",
  "Steel Design",
  "Geotechnics",
  "Highway Geometry",
  "Surveying",
  "Construction",
  "Hydrology",
  "Materials",
  "Setting Out",
];

const heroParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const heroChild: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

/* preloader-gated mask line (slides up through an overflow mask) */
function MaskLine({
  children,
  delay,
  className,
  loaded,
  reduce,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
  loaded: boolean;
  reduce: boolean | null;
}) {
  return (
    <span className={`block overflow-hidden ${className ?? ""}`}>
      <motion.span
        className="block will-change-transform"
        initial={reduce ? false : { y: "112%" }}
        animate={loaded || reduce ? { y: "0%" } : { y: "112%" }}
        transition={{ duration: 1.05, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const loaded = useLoaded();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 110]);
  const yType = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 56]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Introduction"
      className="bg-grain relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* ── backdrop: living structural field ─────────────────────── */}
      <motion.div aria-hidden style={{ y: gridY }} className="absolute inset-0">
        <div className="absolute inset-0 opacity-90 [mask-image:radial-gradient(ellipse_95%_85%_at_55%_30%,black_35%,transparent_78%)]">
          <NetworkCanvas />
        </div>
        <div className="bg-grid-major absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_75%_12%,black,transparent)]" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative mx-auto flex w-full max-w-[88rem] flex-1 flex-col justify-center px-4 pb-14 pt-28 sm:px-6 lg:px-10 lg:pt-32"
      >
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
          {/* ══ TYPE BLOCK ════════════════════════════════════ */}
          <motion.div
            variants={heroParent}
            initial="hidden"
            animate={loaded ? "show" : "hidden"}
            style={{ y: yType }}
            className="relative z-10 lg:col-span-8"
          >
            {/* eyebrow */}
            <motion.div variants={heroChild} className="flex flex-wrap items-center gap-3">
              <span className="inline-block h-px w-12 bg-amber" aria-hidden />
              <span className="font-tech text-ink-soft">
                {profile.eyebrow}
              </span>
              <span className="font-tech hidden text-ink-faint sm:inline">
                · GRADUATE CLASS OF {profile.graduationYear}
              </span>
            </motion.div>

            {/* colossal name */}
            <h1 className="display-expo mt-7 select-none text-[clamp(3.6rem,12.5vw,11.5rem)] font-bold uppercase">
              <span className="sr-only">Faith Wanjiru — Civil and Structural Engineer</span>
              <MaskLine delay={0.1} loaded={loaded} reduce={reduce} aria-hidden>
                <span className="block text-ink">
                  Faith
                  <span className="text-amber">.</span>
                </span>
              </MaskLine>
              <MaskLine delay={0.22} loaded={loaded} reduce={reduce} aria-hidden>
                <span className="text-outline block pl-[6%]">Wanjiru</span>
              </MaskLine>
            </h1>

            {/* headline */}
            <motion.div variants={heroChild} className="mt-8 max-w-2xl">
              <p className="text-lg font-medium leading-snug text-ink sm:text-xl">
                Civil &amp; Structural Engineering Graduate focused on{" "}
                <span className="text-amber">Structural Design</span>,{" "}
                <span className="text-amber">Construction</span> and{" "}
                <span className="text-amber">Sustainable Infrastructure</span>.
              </p>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft">
                {profile.summary}
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={heroChild} className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link
                  href="#projects"
                  data-cursor="EXPLORE"
                  className="btn-plate group inline-flex items-center gap-3 bg-amber px-7 py-4 font-tech text-amber-foreground"
                >
                  Explore Engineering Projects
                  <ArrowDown
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1"
                    aria-hidden
                  />
                </Link>
              </Magnetic>
              <a
                href={profile.cvUrl}
                download
                className="btn-plate group inline-flex items-center gap-2.5 border border-ink/80 bg-paper px-6 py-4 font-tech text-ink hover:text-amber"
              >
                <Download className="h-4 w-4" aria-hidden />
                Download CV
              </a>
              <Link
                href="#contact"
                className="group inline-flex items-center gap-1.5 font-tech text-ink-soft transition-colors hover:text-amber"
              >
                <span className="link-fill">Contact Faith</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </motion.div>

            {/* meta strip */}
            <motion.div
              variants={heroChild}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-2 font-tech text-ink-faint"
            >
              <a href={`mailto:${profile.email}`} className="link-fill transition-colors hover:text-amber">
                {profile.email}
              </a>
              <a
                href={profile.links[1]?.url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="link-fill transition-colors hover:text-amber"
              >
                LINKEDIN
              </a>
              <span>{profile.coordinates}</span>
            </motion.div>
          </motion.div>

          {/* ══ VISUAL BLOCK ══════════════════════════════════ */}
          <motion.div
            style={{ y: yVisual }}
            initial={reduce ? false : { opacity: 0, y: 60 }}
            animate={loaded || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
            className="relative mx-auto w-full max-w-sm lg:col-span-4 lg:max-w-none"
          >
            {/* availability chip */}
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.92 }}
              animate={loaded || reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
              transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
              className="animate-drift absolute -left-4 -top-5 z-20 sm:-left-8"
            >
              <span className="font-tech inline-flex items-center gap-2.5 border border-amber/50 bg-paper/90 px-3.5 py-2.5 text-ink shadow-[0_8px_30px_-10px_rgba(0,0,0,0.4)] backdrop-blur-md">
                <span className="animate-pulse-ring inline-block h-2 w-2 rounded-full bg-amber" aria-hidden />
                OPEN TO GRADUATE ROLES
              </span>
            </motion.div>

            {/* drawing frame around portrait */}
            <div className="crosshair relative">
              <span aria-hidden className="font-tech absolute -left-1.5 top-1/2 -translate-y-1/2 -rotate-90 text-ink-faint">A</span>
              <span aria-hidden className="font-tech absolute -right-1.5 top-1/2 -translate-y-1/2 rotate-90 text-ink-faint">B</span>

              <div className="relative border border-line-strong bg-surface shadow-[0_40px_80px_-40px_rgba(0,0,0,0.5)]">
                {/* sheet header strip */}
                <div className="flex items-center justify-between border-b border-line px-3 py-2">
                  <span className="font-tech text-eng">F. WANJIRU — ELEVATION</span>
                  <span className="font-tech text-ink-faint">SHT 01 · REV A</span>
                </div>

                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={profile.portrait}
                    alt="Portrait of Faith Wanjiru, graduate civil and structural engineer"
                    width={864}
                    height={1152}
                    priority
                    className="img-cine h-full w-full select-none object-cover"
                    sizes="(min-width: 1024px) 32vw, 90vw"
                  />
                  {/* engineering overlay marks */}
                  <div aria-hidden className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-4 border border-paper/20" />
                    <div className="absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-paper/80" />
                    <div className="absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-paper/80" />
                    <div className="absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-paper/80" />
                    <div className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-paper/80" />
                    <span className="font-tech absolute bottom-4 left-1/2 -translate-x-1/2 bg-amber/90 px-2.5 py-1 text-[9px] text-amber-foreground backdrop-blur">
                      N 0°31′ E 35°18′
                    </span>
                    {/* gradient leg for depth */}
                    <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink/35 to-transparent" />
                  </div>
                </div>

                {/* title strip */}
                <div className="flex items-center justify-between border-t border-line px-3 py-2">
                  <span className="font-tech text-ink-soft">SCALE 1:20</span>
                  <span className="font-tech text-ink-soft">MOI UNIVERSITY · {profile.graduationYear}</span>
                </div>
              </div>
            </div>

            {/* floating frame diagram card */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 26, rotate: 2 }}
              animate={loaded || reduce ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0, y: 26, rotate: 2 }}
              transition={{ delay: 1.05, duration: 0.9, ease: EASE }}
              className="relative z-10 -mt-16 ml-auto w-[112%] max-w-md border border-line bg-paper/95 p-4 shadow-[0_28px_60px_-24px_rgba(0,0,0,0.55)] backdrop-blur sm:-mt-20 lg:-mr-10"
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="font-tech text-eng">TYPICAL RC FRAME</span>
                <span className="font-tech text-ink-faint">ANALYSIS SK-01</span>
              </div>
              <HeroFrame />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── bottom band: scroll cue + velocity ticker ─────────────── */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={loaded || reduce ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-10 border-t border-line bg-paper/70 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-[88rem] items-stretch">
          {/* scroll cue */}
          <div className="flex items-center gap-3 border-r border-line px-4 py-3.5 sm:px-6" aria-hidden>
            <span className="animate-scrollcue block h-5 w-px bg-amber" />
            <span className="font-tech text-ink-faint">SCROLL</span>
          </div>
          {/* discipline ticker */}
          <div className="marquee-mask flex-1 py-3.5" aria-hidden>
            <TickerRow items={TICKER} itemClassName="text-ink-soft" />
          </div>
          {/* sheet ref */}
          <div className="hidden items-center border-l border-line px-6 py-3.5 md:flex" aria-hidden>
            <span className="font-tech text-ink-faint">SHT 01 / 14</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
