"use client";

/* ══════════════════════════════════════════════════════════════════
   MOTION LIB — shared easings, springs, helpers for the MONUMENT
   system. Single source of truth so every section moves as one.
   ══════════════════════════════════════════════════════════════════ */

import type { Transition } from "framer-motion";

/* ── Signature easings ──────────────────────────────────────────── */
/** Primary reveal ease — fast start, long luxurious settle */
export const EASE = [0.22, 1, 0.36, 1] as const;
/** Curtain / exit ease — symmetric drama */
export const EASE_DRAMA = [0.76, 0, 0.24, 1] as const;
/** Snappy micro-interaction ease */
export const EASE_SNAP = [0.16, 1, 0.3, 1] as const;

/* ── Springs ────────────────────────────────────────────────────── */
export const SPRING_SOFT = { stiffness: 110, damping: 22, mass: 0.9 } as const;
export const SPRING_SNAP = { stiffness: 320, damping: 30, mass: 0.6 } as const;
export const SPRING_MAGNET = { stiffness: 180, damping: 16, mass: 0.4 } as const;

/* ── Shared transitions ─────────────────────────────────────────── */
export const tReveal = (delay = 0, duration = 0.9): Transition => ({
  delay,
  duration,
  ease: EASE,
});

export const tCurtain = (delay = 0, duration = 0.9): Transition => ({
  delay,
  duration,
  ease: EASE_DRAMA,
});
