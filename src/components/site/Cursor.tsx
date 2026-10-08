"use client";

/* ══════════════════════════════════════════════════════════════════
   CURSOR — custom magnetic pointer (fine pointers only).
   · instant dot + lagged spring ring (mix-blend-difference)
   · expands over interactive elements
   · [data-cursor="LABEL"] targets summon an amber label bubble
   ══════════════════════════════════════════════════════════════════ */

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

type Mode = "default" | "hover" | "view";

const POINTER_FINE = "(pointer: fine)";
const subscribePointer = (cb: () => void) => {
  const mq = window.matchMedia(POINTER_FINE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getPointerFine = () => window.matchMedia(POINTER_FINE).matches;
const getPointerFineServer = () => false;

export function Cursor() {
  const reduce = useReducedMotion();
  const fine = useSyncExternalStore(
    subscribePointer,
    getPointerFine,
    getPointerFineServer
  );
  const [mode, setMode] = useState<Mode>("default");
  const [label, setLabel] = useState("VIEW");
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const dotX = useSpring(mx, { stiffness: 900, damping: 55, mass: 0.3 });
  const dotY = useSpring(my, { stiffness: 900, damping: 55, mass: 0.3 });
  const ringX = useSpring(mx, { stiffness: 240, damping: 26, mass: 0.7 });
  const ringY = useSpring(my, { stiffness: 240, damping: 26, mass: 0.7 });

  const enabled = fine && !reduce;

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t || typeof t.closest !== "function") return;
      const viewEl = t.closest<HTMLElement>("[data-cursor]");
      if (viewEl) {
        setLabel(viewEl.dataset.cursor || "VIEW");
        setMode("view");
        return;
      }
      if (
        t.closest(
          'a, button, [role="button"], input, textarea, select, label, [tabindex]:not([tabindex="-1"])'
        )
      ) {
        setMode("hover");
        return;
      }
      setMode("default");
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [enabled, mx, my]);

  if (!enabled) return null;

  const isView = mode === "view";
  const isHover = mode === "hover";

  return (
    <>
      {/* ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200]"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 mix-blend-difference"
          animate={{
            width: isView ? 0 : isHover ? 58 : 34,
            height: isView ? 0 : isHover ? 58 : 34,
            opacity: isView ? 0 : 1,
          }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      {/* dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[201]"
        style={{ x: dotX, y: dotY, opacity: visible && !isView ? 1 : 0 }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
          animate={{
            width: down ? 14 : isHover ? 5 : 7,
            height: down ? 14 : isHover ? 5 : 7,
          }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      {/* view-label bubble */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[199]"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          className="font-tech grid h-[86px] w-[86px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-amber text-center text-amber-foreground shadow-[0_10px_40px_-8px_rgba(0,0,0,0.45)]"
          animate={{
            scale: isView ? (down ? 0.88 : 1) : 0.4,
            opacity: isView ? 1 : 0,
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="px-2 text-[10px] leading-tight">{label}</span>
        </motion.div>
      </motion.div>
    </>
  );
}
