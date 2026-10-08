"use client";

/* ══════════════════════════════════════════════════════════════════
   SECTION HEADER — drawing-sheet header system
   "SHT 04 · 04 / PROJECTS · REV A" with crosshairs + hairline rule
   ══════════════════════════════════════════════════════════════════ */

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { RevealLine } from "@/components/ui/motion-primitives";

export function SectionHeader({
  sheet,
  number,
  title,
  description,
  align = "left",
  className,
  children,
}: {
  sheet: string;           // e.g. "PROJECT REGISTER"
  number: string;          // e.g. "04"
  title: string;           // e.g. "Selected Engineering Work"
  description?: string;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <header className={cn("relative", align === "center" && "text-center", className)}>
      {/* corner crosshairs */}
      <span
        aria-hidden
        className="absolute -left-3 -top-3 hidden h-[15px] w-[15px] md:block"
        style={{
          backgroundImage:
            "linear-gradient(var(--line-strong), var(--line-strong)), linear-gradient(var(--line-strong), var(--line-strong))",
          backgroundSize: "15px 1px, 1px 15px",
          backgroundPosition: "center, center",
          backgroundRepeat: "no-repeat, no-repeat",
        }}
      />
      <span
        aria-hidden
        className="absolute -right-3 -top-3 hidden h-[15px] w-[15px] md:block"
        style={{
          backgroundImage:
            "linear-gradient(var(--line-strong), var(--line-strong)), linear-gradient(var(--line-strong), var(--line-strong))",
          backgroundSize: "15px 1px, 1px 15px",
          backgroundPosition: "center, center",
          backgroundRepeat: "no-repeat, no-repeat",
        }}
      />

      {/* sheet meta row */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={cn(
          "flex flex-wrap items-center gap-x-3 gap-y-1 font-tech text-ink-faint",
          align === "center" && "justify-center"
        )}
      >
        <span className="bg-amber px-2 py-0.5 text-amber-foreground">SHT {number}</span>
        <span>{sheet}</span>
        <span aria-hidden>·</span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rotate-45 bg-amber" />
          REV A
        </span>
      </motion.div>

      {/* animated hairline */}
      <motion.div
        aria-hidden
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "mt-3 h-px w-full origin-left bg-gradient-to-r from-line-strong via-line to-transparent",
          align === "center" && "origin-center"
        )}
      />

      {/* title */}
      <h2 className="display-expo mt-6 text-[clamp(2rem,5.2vw,3.75rem)] font-bold uppercase text-ink">
        <RevealLine delay={0.08}>{title}</RevealLine>
      </h2>

      {description ? (
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.22, duration: 0.7 }}
          className={cn(
            "mt-4 max-w-2xl text-base leading-relaxed text-ink-soft",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </motion.p>
      ) : null}

      {children}
    </header>
  );
}
