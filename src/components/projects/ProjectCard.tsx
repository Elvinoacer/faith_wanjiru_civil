"use client";

/* ══════════════════════════════════════════════════════════════════
   PROJECT CARD — spec §48: drawing title block composition
   Hover: image zooms behind grid · amber section marker activates
   ══════════════════════════════════════════════════════════════════ */

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  onOpen,
  className,
}: {
  project: Project;
  onOpen?: (slug: string) => void;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      layout
      whileHover="hover"
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex cursor-pointer flex-col border border-line bg-surface transition-[border-color,box-shadow] duration-500 hover:border-line-strong hover:shadow-[10px_10px_0_0_var(--surface-2)]",
        className
      )}
      onClick={() => onOpen?.(project.slug)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen?.(project.slug);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open case study: ${project.title}`}
    >
      {/* ── image plate ──────────────────────────────────────── */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
        <motion.div
          variants={{ hover: { scale: reduce ? 1 : 1.06 } }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={project.cover}
            alt={project.coverAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>
        {/* blueprint overlay on hover */}
        <motion.div
          aria-hidden
          variants={{ hover: { opacity: 0.5 } }}
          initial={{ opacity: 0 }}
          className="bg-blueprint-fine absolute inset-0 mix-blend-multiply transition-opacity duration-500 dark:mix-blend-screen"
        />
        {/* top-left: index */}
        <span className="font-tech absolute left-3 top-3 bg-paper/90 px-2 py-1 text-eng backdrop-blur-sm">
          {project.index}
        </span>
        {/* top-right: year */}
        <span className="font-tech absolute right-3 top-3 bg-paper/90 px-2 py-1 text-ink-soft backdrop-blur-sm">
          {project.year}
        </span>
        {/* bottom strip over image */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/70 to-transparent px-3 pb-2.5 pt-8">
          <span className="font-tech text-paper">{project.categoryLabel.toUpperCase()}</span>
          <motion.span
            variants={{ hover: { x: 3, y: -3 } }}
            className="grid h-8 w-8 place-items-center border border-paper/60 text-paper"
            aria-hidden
          >
            <ArrowUpRight className="h-4 w-4" />
          </motion.span>
        </div>
      </div>

      {/* ── title block ──────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-ink transition-colors duration-300 group-hover:text-eng">
          {project.shortTitle}
        </h3>

        {/* meta rows */}
        <dl className="mt-4 flex flex-col gap-2 border-t border-line pt-4 font-tech text-ink-soft">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-ink-faint">TYPE</dt>
            <dd className="text-right">{project.type}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-ink-faint">TOOLS</dt>
            <dd className="text-right">{project.software.join(" · ")}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-ink-faint">ROLE</dt>
            <dd className="text-right">{project.role}</dd>
          </div>
        </dl>

        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink-soft">{project.tagline}</p>

        <div className="mt-auto pt-5">
          <span className="font-tech inline-flex items-center gap-2 text-eng">
            <span className="inline-block h-px w-6 bg-eng transition-all duration-500 group-hover:w-10" aria-hidden />
            Explore case study
          </span>
        </div>
      </div>
    </motion.article>
  );
}
