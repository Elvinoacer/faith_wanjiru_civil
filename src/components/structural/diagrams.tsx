"use client";

/* ══════════════════════════════════════════════════════════════════
   STRUCTURAL DIAGRAMS — animated engineering linework
   Spec §52: structural grid draws on load; hover reveals member
   metadata; section markers animate into view.
   ══════════════════════════════════════════════════════════════════ */

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const DRAW = { duration: 1.4, ease: [0.65, 0, 0.35, 1] as const };
const INK = "var(--ink)";
const ENG = "var(--eng)";
const AMBER = "var(--amber)";
const LINE = "var(--line-strong)";
const SOFT = "var(--ink-soft)";

/* ──────────────────────────────────────────────────────────────────
   HERO FRAME — 2-bay, 2-storey RC moment frame elevation
   Self-draws on load · hover members for metadata · dimensioned
   ────────────────────────────────────────────────────────────────── */
interface Member {
  id: string;
  label: string;
  detail: string;
}

const MEMBERS: Record<string, Member> = {
  B1: { id: "B1", label: "B1 — BEAM 225×450", detail: "RC beam · fck 25 [ph]" },
  B2: { id: "B2", label: "B2 — BEAM 225×400", detail: "RC beam · fck 25 [ph]" },
  C1: { id: "C1", label: "C1 — COL 300×300", detail: "RC column · fck 25 [ph]" },
  F1: { id: "F1", label: "F1 — PAD FOOTING", detail: "Isolated · 1.5m sq [ph]" },
};

export function HeroFrame({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<Member | null>(null);

  const memberProps = (m: Member) => ({
    onMouseEnter: () => setHover(m),
    onMouseLeave: () => setHover(null),
    onFocus: () => setHover(m),
    onBlur: () => setHover(null),
    tabIndex: 0,
    className: "cursor-crosshair outline-none",
    style: { transition: "opacity .25s, stroke .25s" },
  });

  const pathAnim = (i: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { ...DRAW, delay: 0.35 + i * 0.12 },
        };

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 640 500"
        className="h-auto w-full"
        role="img"
        aria-label="Animated elevation of a two-bay, two-storey reinforced concrete moment frame with dimensions and load arrows"
      >
        {/* ── structural grid lines (dashed, faint) ─────────────── */}
        {[120, 320, 520].map((x, i) => (
          <motion.line
            key={x}
            x1={x} y1={70} x2={x} y2={440}
            stroke={SOFT} strokeWidth={1} strokeDasharray="6 8" opacity={0.4}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.8 }}
          />
        ))}

        {/* ── grid bubbles A B C ───────────────────────────────── */}
        {[
          { x: 120, l: "A" },
          { x: 320, l: "B" },
          { x: 520, l: "C" },
        ].map((g, i) => (
          <motion.g
            key={g.l}
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + i * 0.15, duration: 0.6 }}
          >
            <circle cx={g.x} cy={48} r={16} fill="none" stroke={ENG} strokeWidth={1.4} />
            <text
              x={g.x} y={53}
              textAnchor="middle"
              fontSize={13}
              fontFamily="var(--font-plex-mono), monospace"
              fill={ENG}
            >
              {g.l}
            </text>
          </motion.g>
        ))}

        {/* ── load arrows on roof (UDL) ────────────────────────── */}
        {[160, 210, 260, 310, 360, 410, 460].map((x, i) => (
          <motion.g
            key={x}
            initial={reduce ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 + i * 0.07, duration: 0.5 }}
          >
            <line x1={x} y1={118} x2={x} y2={146} stroke={AMBER} strokeWidth={1.4} />
            <path d={`M ${x - 3.5} 141 L ${x} 148 L ${x + 3.5} 141 Z`} fill={AMBER} />
          </motion.g>
        ))}
        <motion.text
          x={475} y={112} fontSize={10}
          fontFamily="var(--font-plex-mono), monospace" fill={AMBER}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9 }}
          textAnchor="end"
        >
          w = 12.5 kN/m [ph]
        </motion.text>

        {/* ── frame members (draw on load) ─────────────────────── */}
        {/* roof beam */}
        <motion.line
          {...pathAnim(0)} {...memberProps(MEMBERS.B2)}
          x1={120} y1={150} x2={520} y2={150}
          stroke={hover?.id === "B2" ? ENG : INK}
          strokeWidth={hover?.id === "B2" ? 7 : 5}
        />
        {/* level 1 beam */}
        <motion.line
          {...pathAnim(1)} {...memberProps(MEMBERS.B1)}
          x1={120} y1={290} x2={520} y2={290}
          stroke={hover?.id === "B1" ? ENG : INK}
          strokeWidth={hover?.id === "B1" ? 7 : 5}
        />
        {/* columns */}
        {[120, 320, 520].map((x, i) => (
          <motion.line
            key={x}
            {...pathAnim(2 + i * 0.5)} {...memberProps(MEMBERS.C1)}
            x1={x} y1={150} x2={x} y2={410}
            stroke={hover?.id === "C1" ? ENG : INK}
            strokeWidth={hover?.id === "C1" ? 7 : 5}
          />
        ))}

        {/* ── foundations with hatching ────────────────────────── */}
        {[120, 320, 520].map((x, i) => (
          <motion.g key={x} {...pathAnim(4)}>
            <motion.path
              d={`M ${x - 26} 410 L ${x + 26} 410 L ${x + 34} 438 L ${x - 34} 438 Z`}
              {...memberProps(MEMBERS.F1)}
              fill="none"
              stroke={hover?.id === "F1" ? ENG : INK}
              strokeWidth={1.6}
            />
            {/* soil hatch */}
            <motion.g
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 0.55 }}
              transition={{ delay: 2.2 + i * 0.1 }}
            >
              {[-24, -14, -4, 6, 16, 26].map((dx) => (
                <line
                  key={dx}
                  x1={x + dx - 3} y1={438} x2={x + dx + 3} y2={450}
                  stroke={SOFT} strokeWidth={1}
                />
              ))}
            </motion.g>
          </motion.g>
        ))}

        {/* ── ground line ─────────────────────────────────────── */}
        <motion.line
          {...pathAnim(5)}
          x1={30} y1={438} x2={610} y2={438}
          stroke={INK} strokeWidth={2}
        />
        <motion.text
          x={34} y={430} fontSize={10}
          fontFamily="var(--font-plex-mono), monospace" fill={SOFT}
          initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 0.9 }}
          transition={{ delay: 2.4 }}
        >
          GL
        </motion.text>

        {/* ── storey level markers ────────────────────────────── */}
        {[
          { y: 150, l: "+6.800" },
          { y: 290, l: "+3.400" },
        ].map((s, i) => (
          <motion.g
            key={s.l}
            initial={reduce ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.0 + i * 0.15 }}
          >
            <path d={`M 74 ${s.y} L 84 ${s.y} L 84 ${s.y + 2} L 90 ${s.y - 2} L 96 ${s.y + 2} L 102 ${s.y - 2} L 108 ${s.y}`} fill="none" stroke={ENG} strokeWidth={1.2} />
            <text x={40} y={s.y - 6} fontSize={9.5} fontFamily="var(--font-plex-mono), monospace" fill={ENG}>
              {s.l}
            </text>
          </motion.g>
        ))}
        <motion.g
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3 }}
        >
          <path d="M 74 438 L 84 438 L 84 440 L 90 436 L 96 440 L 102 436 L 108 438" fill="none" stroke={ENG} strokeWidth={1.2} />
          <text x={40} y={434} fontSize={9.5} fontFamily="var(--font-plex-mono), monospace" fill={ENG}>±0.000</text>
        </motion.g>

        {/* ── dimension line (bottom) ─────────────────────────── */}
        <motion.g
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.7 }}
        >
          <line x1={120} y1={466} x2={520} y2={466} stroke={SOFT} strokeWidth={1} />
          {[120, 320, 520].map((x) => (
            <path key={x} d={`M ${x} 460 L ${x} 472`} stroke={SOFT} strokeWidth={1} />
          ))}
          {/* extension ticks at 45° (engineering style) */}
          <path d="M 315 471 L 325 461" stroke={SOFT} strokeWidth={1} />
          <text x={220} y={484} textAnchor="middle" fontSize={10} fontFamily="var(--font-plex-mono), monospace" fill={SOFT}>
            6000
          </text>
          <text x={420} y={484} textAnchor="middle" fontSize={10} fontFamily="var(--font-plex-mono), monospace" fill={SOFT}>
            6000
          </text>
        </motion.g>

        {/* ── section marker ──────────────────────────────────── */}
        <motion.g
          initial={reduce ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2.7, type: "spring", stiffness: 260, damping: 18 }}
          style={{ transformOrigin: "560px 200px" }}
        >
          <circle cx={560} cy={200} r={17} fill="var(--paper)" stroke={INK} strokeWidth={1.4} />
          <line x1={540} y1={200} x2={543} y2={200} stroke={INK} strokeWidth={1.4} />
          <text x={560} y={197} textAnchor="middle" fontSize={9} fontFamily="var(--font-plex-mono), monospace" fill={INK}>A</text>
          <path d="M 560 207 L 560 214 L 556 210 M 560 214 L 564 210" fill="none" stroke={INK} strokeWidth={1.2} />
        </motion.g>
      </svg>

      {/* ── hover metadata readout ─────────────────────────────── */}
      <div className="pointer-events-none absolute -bottom-2 left-0 right-0 flex justify-center">
        <div
          aria-live="polite"
          className={cn(
            "font-tech rounded-sm border border-line bg-surface/95 px-3 py-1.5 text-ink-soft shadow-sm backdrop-blur transition-all duration-300",
            hover ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          )}
        >
          {hover ? `${hover.label} · ${hover.detail}` : "hover members — cursor as inspection tool"}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   BMD / SFD — bending moment & shear diagrams for a UDL span
   Draws on scroll into view · used in FYP case study
   ────────────────────────────────────────────────────────────────── */
export function BmdSfdDiagram({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const anim = (d: number) =>
    reduce ? {} : { initial: { pathLength: 0 }, whileInView: { pathLength: 1 }, viewport: { once: true, margin: "-10%" }, transition: { ...DRAW, delay: d } };
  const fade = (d: number) =>
    reduce ? {} : { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { delay: d, duration: 0.6 } };

  return (
    <svg viewBox="0 0 560 300" className={cn("h-auto w-full", className)} role="img" aria-label="Bending moment and shear force diagrams for a uniformly loaded beam span">
      {/* BMD */}
      <motion.text x={20} y={26} fontSize={11} fontFamily="var(--font-plex-mono), monospace" fill={ENG} {...fade(0.1)}>
        BMD — wL²/8 [ph]
      </motion.text>
      <motion.line {...anim(0.1)} x1={40} y1={60} x2={480} y2={60} stroke={SOFT} strokeWidth={1} strokeDasharray="4 5" />
      {/* parabola */}
      <motion.path
        {...anim(0.25)}
        d="M 40 60 Q 260 210 480 60"
        stroke={ENG} strokeWidth={2.2}
      />
      <motion.path
        {...fade(0.7)}
        d="M 40 60 Q 260 210 480 60 L 480 60 L 40 60 Z"
        fill="var(--eng)" opacity={0.1}
      />
      <motion.text x={260} y={200} textAnchor="middle" fontSize={10} fontFamily="var(--font-plex-mono), monospace" fill={ENG} {...fade(0.8)}>
        M_max = 156 kN·m
      </motion.text>
      <motion.text x={40} y={48} fontSize={9.5} fontFamily="var(--font-plex-mono), monospace" fill={SOFT} {...fade(0.8)}>supp</motion.text>
      <motion.text x={448} y={48} fontSize={9.5} fontFamily="var(--font-plex-mono), monospace" fill={SOFT} {...fade(0.8)}>supp</motion.text>

      {/* divider */}
      <motion.line {...anim(0.4)} x1={40} y1={150} x2={480} y2={150} stroke={LINE} strokeWidth={1} />

      {/* SFD */}
      <motion.text x={20} y={186} fontSize={11} fontFamily="var(--font-plex-mono), monospace" fill={AMBER} {...fade(0.5)}>
        SFD — wL/2 [ph]
      </motion.text>
      <motion.line {...anim(0.5)} x1={40} y1={240} x2={480} y2={240} stroke={SOFT} strokeWidth={1} strokeDasharray="4 5" />
      <motion.path {...anim(0.65)} d="M 40 200 L 260 240 L 260 240 L 480 280" stroke={AMBER} strokeWidth={2.2} />
      <motion.path {...fade(0.95)} d="M 40 200 L 260 240 L 480 280 L 480 240 L 40 240 L 40 200 Z" fill="var(--amber)" opacity={0.1} />
      <motion.text x={44} y={196} fontSize={10} fontFamily="var(--font-plex-mono), monospace" fill={AMBER} {...fade(1)}>
        +wL/2
      </motion.text>
      <motion.text x={432} y={296} fontSize={10} fontFamily="var(--font-plex-mono), monospace" fill={AMBER} {...fade(1)}>
        −wL/2
      </motion.text>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────
   LOAD PATH — vertical flow slab → beam → column → footing → soil
   Staggered arrow flow on scroll
   ────────────────────────────────────────────────────────────────── */
export function LoadPathDiagram({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const stages = [
    { label: "SLAB", sub: "collects area load", y: 0 },
    { label: "BEAM", sub: "carries tributary strip", y: 1 },
    { label: "COLUMN", sub: "transfers axial + moment", y: 2 },
    { label: "FOOTING", sub: "spreads to soil", y: 3 },
    { label: "SOIL", sub: "ultimate support", y: 4 },
  ];
  return (
    <div className={cn("flex flex-col items-stretch gap-0", className)}>
      {stages.map((s, i) => (
        <div key={s.label} className="relative">
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.16, duration: 0.55 }}
            className="flex items-center justify-between border-l-2 border-line-strong py-3 pl-4 pr-2"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-tech text-eng">{s.label}</span>
              <span className="hidden text-xs text-ink-soft sm:inline">{s.sub}</span>
            </div>
            <span className="font-tech text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
          </motion.div>
          {i < stages.length - 1 && (
            <motion.div
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.16 + 0.1, duration: 0.4 }}
              className="absolute -bottom-1 left-[2px] h-2 w-0.5 origin-top bg-eng"
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   DIMENSION RULE — horizontal divider styled as a dimension line
   ────────────────────────────────────────────────────────────────── */
export function DimensionRule({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div className={cn("relative flex items-center gap-3 py-1", className)} aria-hidden>
      <span className="h-2.5 w-px bg-line-strong" />
      <span className="h-px flex-1 bg-gradient-to-r from-line-strong via-line to-transparent" />
      {label ? (
        <span className="font-tech whitespace-nowrap text-ink-faint">{label}</span>
      ) : null}
    </div>
  );
}
