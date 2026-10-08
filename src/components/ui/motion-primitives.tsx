"use client";

/* ══════════════════════════════════════════════════════════════════
   MOTION PRIMITIVES — scroll reveals, counters, staggered text
   All respect prefers-reduced-motion via globals.css + framer config
   ══════════════════════════════════════════════════════════════════ */

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useScroll,
  useTransform,
  useVelocity,
  animate,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Reveal — masked rise on scroll ─────────────────────────────── */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px -8% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ── RevealLine — single line of text sliding up through a mask ── */
export function RevealLine({
  children,
  className,
  delay = 0,
  as: Tag = "span",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "span" | "div";
}) {
  const reduce = useReducedMotion();
  const MotionTag = Tag === "div" ? motion.div : motion.span;
  return (
    <span className={cn("block overflow-hidden", className)}>
      <MotionTag
        className="block will-change-transform"
        initial={reduce ? false : { y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.85, delay, ease: EASE }}
      >
        {children}
      </MotionTag>
    </span>
  );
}

/* ── Stagger container / item ───────────────────────────────────── */
const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export function Stagger({
  children,
  className,
  amount = 0.18,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

/* ── Counter — animated numeral with mono styling ───────────────── */
export function Counter({
  value,
  suffix = "",
  prefix = "",
  className,
  duration = 1.6,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 42, damping: 18 });

  useEffect(() => {
    if (inView) mv.set(reduce ? value : value);
  }, [inView, value, reduce, mv]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(v).toLocaleString()}${suffix}`;
      }
    });
    return unsub;
  }, [spring, prefix, suffix]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}0{suffix}
    </span>
  );
}

/* ── DrawSVG — stroke-draws a path when scrolled into view ──────── */
export function DrawSVG({ d, ...props }: React.SVGProps<SVGPathElement>) {
  const ref = useRef<SVGPathElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const len = el.getTotalLength();
    el.style.strokeDasharray = `${len}`;
    if (reduce || inView) {
      el.style.transition = "stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)";
      el.style.strokeDashoffset = "0";
    } else {
      el.style.strokeDashoffset = `${len}`;
    }
  }, [inView, reduce]);

  return (
    <path
      ref={ref}
      d={d}
      fill="none"
      {...props}
    />
  );
}

/* ── Magnetic — subtle pointer-follow for CTAs ──────────────────── */
export function Magnetic({
  children,
  className,
  strength = 14,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16 });
  const sy = useSpring(y, { stiffness: 180, damping: 16 });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width - 0.5) * strength * 2);
        y.set(((e.clientY - r.top) / r.height - 0.5) * strength * 2);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Crosshair — drawing registration mark ──────────────────────── */
export function Crosshair({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute z-[6] block h-4 w-4", className)}
      style={{
        backgroundImage:
          "linear-gradient(var(--line-strong), var(--line-strong)), linear-gradient(var(--line-strong), var(--line-strong))",
        backgroundSize: "16px 1px, 1px 16px",
        backgroundPosition: "center, center",
        backgroundRepeat: "no-repeat, no-repeat",
      }}
    />
  );
}

/* ══════════════════════════════════════════════════════════════════
   V2 PRIMITIVES — MONUMENT scroll toolkit
   ══════════════════════════════════════════════════════════════════ */

/* ── WordReveal — scroll-scrubbed word-by-word illumination ─────── */
export function WordReveal({
  text,
  className,
  accentWords = [],
}: {
  text: string;
  className?: string;
  accentWords?: string[];
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = text.split(" ");

  return (
    <p ref={ref} className={cn("relative", className)}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          accent={
            accentWords.some((a) =>
              word.toLowerCase().includes(a.toLowerCase())
            )
          }
          reduce={!!reduce}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  accent,
  reduce,
}: {
  children: ReactNode;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  accent: boolean;
  reduce: boolean;
}) {
  const opacity = useTransform(progress, range, reduce ? [1, 1] : [0.13, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={cn("inline-block", accent && "text-amber")}
    >
      {children}&nbsp;
    </motion.span>
  );
}

/* ── ParallaxImage — clip reveal + drift + hover zoom ───────────── */
export function ParallaxImage({
  src,
  alt,
  sizes,
  className,
  imgClassName,
  drift = 9,
  priority = false,
  dark = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  drift?: number;
  priority?: boolean;
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : [`-${drift}%`, `${drift}%`]
  );

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { clipPath: "inset(12% 8% 12% 8%)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.1, ease: EASE }}
      className={cn("relative overflow-hidden", className)}
    >
      <motion.div style={{ y }} className="absolute -inset-y-[12%] inset-x-0">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "img-cine object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            dark && "brightness-[0.92]",
            imgClassName
          )}
        />
      </motion.div>
    </motion.div>
  );
}

/* ── TickerRow — velocity-aware marquee (skews with scroll) ─────── */
export function TickerRow({
  items,
  className,
  itemClassName,
  fast = false,
}: {
  items: string[];
  className?: string;
  itemClassName?: string;
  fast?: boolean;
}) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const skew = useTransform(
    smoothVelocity,
    [-2400, 0, 2400],
    reduce ? [0, 0, 0] : [-3.2, 0, 3.2],
    { clamp: true }
  );

  return (
    <motion.div style={{ skewX: skew }} className={cn("overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max items-center",
          fast ? "animate-marquee-fast" : "animate-marquee"
        )}
      >
        {[...items, ...items].map((t, i) => (
          <span key={`${t}-${i}`} className="flex items-center">
            <span className={cn("font-tech whitespace-nowrap", itemClassName)}>{t}</span>
            <span aria-hidden className="mx-7 block h-1.5 w-1.5 rotate-45 bg-amber" />
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ── ScrollCount — count-up bound to a numeric target on view ───── */
export function ScrollCount({
  value,
  suffix = "",
  className,
  duration = 1.8,
}: {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const controls = animate(0, value, {
      duration: reduce ? 0 : duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = `${Math.round(v).toLocaleString()}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [value, suffix, duration, reduce]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      0{suffix}
    </span>
  );
}
