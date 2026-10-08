"use client";

/* ══════════════════════════════════════════════════════════════════
   LENIS SINGLETON — module-level access to the smooth-scroll
   instance so overlays / preloader / nav can stop & resume it.
   Includes a ref-counted scroll lock that covers both Lenis and
   the native body overflow.
   ══════════════════════════════════════════════════════════════════ */

import type Lenis from "lenis";

let instance: Lenis | null = null;
let lockCount = 0;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

/** Smooth-scroll to a CSS selector / element (no-op without Lenis) */
export function scrollToTarget(target: string | HTMLElement, offset = -72) {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;
  if (instance) {
    instance.scrollTo(el as HTMLElement, { offset, duration: 1.4 });
  } else {
    (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/** Ref-counted scroll lock — safe to call from multiple components */
export function lockScroll(lock: boolean) {
  if (typeof document === "undefined") return;
  lockCount = Math.max(0, lockCount + (lock ? 1 : -1));
  const locked = lockCount > 0;
  if (instance) {
    if (locked) instance.stop();
    else instance.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
