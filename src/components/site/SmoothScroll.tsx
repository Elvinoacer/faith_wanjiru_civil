"use client";

/* ══════════════════════════════════════════════════════════════════
   SMOOTH SCROLL — Lenis inertia scrolling, wired to:
   · a single rAF loop (60fps, zero layout thrash)
   · anchor interception (offset for the fixed nav)
   · prefers-reduced-motion → native scrolling
   ══════════════════════════════════════════════════════════════════ */

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import { setLenis } from "@/lib/smooth-scroll";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setLenis(null);
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
    });
    setLenis(lenis);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    /* ── intercept same-page anchors → lenis.scrollTo ─────────────── */
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a) return;
      const url = new URL(a.href, window.location.href);
      const samePath =
        url.pathname.replace(/\/+$/, "") ===
        window.location.pathname.replace(/\/+$/, "");
      if (!samePath || !url.hash) return;
      const el = document.querySelector(url.hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -64, duration: 1.5 });
      history.pushState(null, "", url.hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
      setLenis(null);
      lenis.destroy();
    };
  }, [reduce]);

  return <>{children}</>;
}
