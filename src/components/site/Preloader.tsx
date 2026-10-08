"use client";

/* ══════════════════════════════════════════════════════════════════
   PRELOADER — once-per-session cinematic opening.
   Counter 0→100 (eased, ref-driven at 60fps, zero re-renders)
   → hold → double-curtain lift with amber blade edge.
   Skips instantly for reduced motion / repeat visits.
   ══════════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_DRAMA } from "@/lib/motion";
import { lockScroll } from "@/lib/smooth-scroll";

const SESSION_KEY = "fw-seen-intro";
const CROSSES = 14;
const STATUS = [
  "CALIBRATING GRID",
  "PLOTTING MEMBERS",
  "CHECKING LOAD PATHS",
  "ESTABLISHING BASELINE",
  "READY",
];

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"run" | "exit" | "done">("run");
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const crossesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const completedRef = useRef(false);

  useEffect(() => {
    const seen = (() => {
      try {
        return sessionStorage.getItem(SESSION_KEY) === "1";
      } catch {
        return false;
      }
    })();

    /* ── skip conditions ─────────────────────────────────────────── */
    if (seen || reduce) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* private mode */
      }
      lockScroll(false);
      const t = window.setTimeout(() => {
        onComplete();
        setPhase("done");
      }, 0);
      return () => window.clearTimeout(t);
    }

    lockScroll(true);

    /* ── eased counter, driven by refs (no re-renders) ────────────── */
    const DURATION = 1500;
    const start = performance.now();
    let rafId = 0;
    let finished = false;

    const easeInOutQuart = (t: number) =>
      t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      const eased = easeInOutQuart(p);
      const count = Math.round(eased * 100);

      if (countRef.current)
        countRef.current.textContent = String(count).padStart(2, "0");
      if (barRef.current)
        barRef.current.style.transform = `scaleX(${eased})`;
      if (statusRef.current)
        statusRef.current.textContent =
          STATUS[Math.min(STATUS.length - 1, Math.floor(p * STATUS.length))];
      crossesRef.current.forEach((c, i) => {
        if (c) c.style.opacity = eased >= (i + 1) / (CROSSES + 2) ? "1" : "0.15";
      });

      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      } else if (!finished) {
        finished = true;
        window.setTimeout(() => {
          try {
            sessionStorage.setItem(SESSION_KEY, "1");
          } catch {
            /* private mode */
          }
          onComplete();
          setPhase("exit");
        }, 260);
      }
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      if (!finished) lockScroll(false);
    };
  }, [onComplete, reduce]);

  /* unlock + unmount after the second curtain clears */
  useEffect(() => {
    if (phase === "exit") {
      const t = window.setTimeout(() => {
        lockScroll(false);
        setPhase("done");
      }, 1500);
      return () => window.clearTimeout(t);
    }
  }, [phase]);

  if (phase === "done") return null;

  const lift = phase === "exit";

  return (
    <div
      id="fw-preloader"
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100]"
    >
      <noscript>
        <style>{`#fw-preloader{display:none!important}`}</style>
      </noscript>

      {/* ── back curtain (depth layer) ─────────────────────────────── */}
      <motion.div
        className="absolute inset-0 bg-surface"
        initial={{ y: 0 }}
        animate={lift ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 1, delay: 0.24, ease: EASE_DRAMA }}
      />

      {/* ── front curtain + content ────────────────────────────────── */}
      <motion.div
        className="bg-blueprint-fine bg-grain absolute inset-0 flex flex-col bg-paper"
        initial={{ y: 0 }}
        animate={lift ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 1, delay: 0.1, ease: EASE_DRAMA }}
      >
        {/* amber blade on the lifting edge */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-amber"
        />

        {/* content wrapper — fades as the curtain lifts */}
        <motion.div
          className="flex h-full flex-col justify-between px-5 py-5 sm:px-8 sm:py-7"
          animate={lift ? { opacity: 0, y: -18 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: "easeIn" }}
        >
          {/* top meta row */}
          <div className="flex items-center justify-between font-tech text-ink-faint">
            <span className="text-ink">FW · ENGINEERING PORTFOLIO</span>
            <span className="hidden sm:block">ELDORET · KENYA</span>
            <span>© 2026</span>
          </div>

          {/* counter */}
          <div className="flex flex-col items-center">
            <p className="display-expo font-wide select-none text-[clamp(5rem,22vw,17rem)] font-bold leading-none tracking-tight text-ink tabular-nums">
              <span ref={countRef}>00</span>
              <span className="text-[0.22em] text-amber">%</span>
            </p>
            {/* progress hairline */}
            <div className="mt-6 h-px w-52 overflow-hidden bg-line sm:w-72">
              <span
                ref={barRef}
                className="block h-full w-full origin-left bg-amber"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
            <p className="font-tech mt-4 text-ink-soft">
              <span ref={statusRef}>{STATUS[0]}</span>
              <span className="ml-2 inline-block h-1.5 w-1.5 animate-tick rounded-full bg-amber align-middle" />
            </p>
          </div>

          {/* bottom cross register */}
          <div className="flex items-end justify-between gap-4">
            <div className="flex items-center gap-[9px]" aria-hidden>
              {Array.from({ length: CROSSES }).map((_, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    crossesRef.current[i] = el;
                  }}
                  className="block h-[11px] w-[11px] opacity-[0.15] transition-opacity duration-300"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--ink-faint),var(--ink-faint)),linear-gradient(var(--ink-faint),var(--ink-faint))",
                    backgroundSize: "11px 1px, 1px 11px",
                    backgroundPosition: "center, center",
                    backgroundRepeat: "no-repeat, no-repeat",
                  }}
                />
              ))}
            </div>
            <p className="font-tech hidden text-right leading-5 text-ink-faint sm:block">
              CIVIL &amp; STRUCTURAL
              <br />
              DRAWING NO. 001 — REV A
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
