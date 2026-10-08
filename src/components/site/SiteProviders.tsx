"use client";

/* ══════════════════════════════════════════════════════════════════
   SITE PROVIDERS — the elite experience shell:
   · LoadedContext  → orchestrates hero entrance after preloader
   · SmoothScroll   → Lenis buttery inertia scrolling
   · Cursor         → custom magnetic pointer (fine pointers only)
   · Preloader      → once-per-session cinematic counter
   ══════════════════════════════════════════════════════════════════ */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Cursor } from "@/components/site/Cursor";
import { Preloader } from "@/components/site/Preloader";

const LoadedContext = createContext(false);

/** true once the preloader curtain has lifted (SSR: false) */
export function useLoaded() {
  return useContext(LoadedContext);
}

export function SiteProviders({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const value = useMemo(() => loaded, [loaded]);

  /* spotlight cards — delegated cursor tracking for --mx/--my */
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest?.(".spotlight") as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <LoadedContext.Provider value={value}>
      <SmoothScroll>
        {children}
        <Cursor />
        <Preloader onComplete={() => setLoaded(true)} />
      </SmoothScroll>
    </LoadedContext.Provider>
  );
}
