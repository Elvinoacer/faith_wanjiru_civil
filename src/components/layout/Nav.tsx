"use client";

/* ══════════════════════════════════════════════════════════════════
   NAV — MONUMENT top bar
   · hides on scroll-down, glides back on scroll-up
   · chainage readout CH 0+000 → 0+850 + live EAT clock
   · amber scroll progress hairline · full-screen mobile menu
   ══════════════════════════════════════════════════════════════════ */

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/data/portfolio";
import { EASE, EASE_DRAMA } from "@/lib/motion";
import { lockScroll } from "@/lib/smooth-scroll";

const NAV_LINKS = [
  { href: "/#projects", label: "Projects", sheet: "SHT 04" },
  { href: "/#experience", label: "Experience", sheet: "SHT 06" },
  { href: "/#engineering", label: "Engineering", sheet: "SHT 07" },
  { href: "/#education", label: "Education", sheet: "SHT 09" },
  { href: "/#about", label: "About", sheet: "SHT 13" },
  { href: "/#contact", label: "Contact", sheet: "SHT 14" },
];

const emptySubscribe = () => () => {};

/** hydration-safe mounted flag (server: false, client: true) */
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function Chainage({ progress }: { progress: number }) {
  const metres = Math.round(progress * 850);
  const ch = `CH ${Math.floor(metres / 1000)}+${String(metres % 1000).padStart(3, "0")}`;
  return (
    <span className="font-tech hidden items-center gap-2 text-ink-faint xl:flex" aria-hidden>
      <span className="inline-block h-1.5 w-1.5 animate-tick rounded-full bg-amber" />
      {ch}
    </span>
  );
}

function EatClock() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Africa/Nairobi",
        }).format(new Date())
      );
    fmt();
    const id = window.setInterval(fmt, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="font-tech hidden items-center gap-2 text-ink-faint lg:flex" aria-hidden>
      ELD<span className="text-line-strong">/</span>{time} EAT
    </span>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4,
  });
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();
  const reduce = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    if (reduce) return;
    setHidden(y > prev && y > 360 && !open);
  });

  useEffect(() => {
    lockScroll(open);
    return () => lockScroll(false);
  }, [open]);

  const isDark = resolvedTheme === "dark";

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[210] focus:rounded-sm focus:bg-amber focus:px-4 focus:py-2 focus:text-amber-foreground"
      >
        Skip to content
      </a>

      <motion.header
        animate={{ y: hidden ? "-105%" : "0%" }}
        transition={{ duration: 0.55, ease: EASE }}
        className={cn(
          "fixed inset-x-0 top-0 z-[90] transition-colors duration-500",
          scrolled
            ? "border-b border-line bg-paper/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        {/* amber progress hairline */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[2px] origin-left bg-amber"
          style={{ scaleX: progress }}
        />

        <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          {/* ── brand ─────────────────────────────────────────── */}
          <Link href="/" className="group flex items-center gap-3" aria-label="Faith Wanjiru — home">
            <span
              aria-hidden
              className="font-expo grid h-9 w-9 place-items-center border border-ink/80 text-[11px] font-bold tracking-tight text-ink transition-colors duration-300 group-hover:border-amber group-hover:bg-amber group-hover:text-amber-foreground"
            >
              FW
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-expo text-[15px] font-bold tracking-tight text-ink">
                Faith Wanjiru
              </span>
              <span className="font-tech mt-1 text-ink-faint">
                Civil &amp; Structural Engineer
              </span>
            </span>
          </Link>

          {/* ── desktop links ─────────────────────────────────── */}
          <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-tech text-ink-soft transition-colors duration-300 hover:text-ink"
              >
                <span className="link-fill">{l.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <EatClock />
            <ChainageSlot progress={progress} />
            <a
              href={profile.cvUrl}
              download
              className="btn-plate hidden items-center gap-2 border border-ink/80 bg-paper px-3.5 py-2 font-tech text-ink sm:inline-flex"
            >
              <Download className="h-3.5 w-3.5" aria-hidden />
              CV
            </a>
            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
                className="grid h-9 w-9 place-items-center border border-line text-ink-soft transition-colors duration-300 hover:border-amber hover:text-amber"
              >
                {isDark ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
              </button>
            )}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-9 w-9 place-items-center border border-line text-ink md:hidden"
            >
              {open ? <X className="h-4 w-4" aria-hidden /> : <Menu className="h-4 w-4" aria-hidden />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── mobile overlay menu ─────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE_DRAMA }}
            className="bg-blueprint-fine fixed inset-0 z-[85] flex flex-col bg-paper md:hidden"
          >
            <div className="flex-1 overflow-y-auto px-6 pb-10 pt-24" data-lenis-prevent>
              <nav aria-label="Mobile" className="flex flex-col">
                {NAV_LINKS.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={reduce ? false : { opacity: 0, y: 34 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22 + i * 0.07, duration: 0.7, ease: EASE }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline justify-between border-b border-line py-4"
                    >
                      <span className="font-expo text-4xl font-bold tracking-tight text-ink transition-colors group-hover:text-amber">
                        {l.label}
                      </span>
                      <span className="font-tech text-ink-faint">{l.sheet}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-8 flex flex-col gap-3"
              >
                <a
                  href={`mailto:${profile.email}`}
                  className="btn-plate border border-ink/80 bg-paper px-4 py-3 text-center font-tech text-ink"
                >
                  Email Faith
                </a>
                <a
                  href={profile.cvUrl}
                  download
                  className="btn-plate bg-amber px-4 py-3 text-center font-tech text-amber-foreground"
                >
                  Download CV
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* chainage slot — needs motionvalue → component */
function ChainageSlot({ progress }: { progress: ReturnType<typeof useSpring> }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const unsub = progress.on("change", (v) => setVal(v));
    return unsub;
  }, [progress]);
  return <Chainage progress={val} />;
}
