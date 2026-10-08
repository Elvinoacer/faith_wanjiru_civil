"use client";

/* ══════════════════════════════════════════════════════════════════
   NETWORK CANVAS — the hero's living structural field.
   Survey-marker nodes on a jittered grid, connected like truss
   members, springing home and repelled by the pointer.
   Perf: DPR-capped, pauses offscreen / tab-hidden / reduced-motion.
   ══════════════════════════════════════════════════════════════════ */

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Node {
  hx: number; hy: number; // home
  x: number; y: number; // current
  vx: number; vy: number;
  amber: boolean;
}

export function NetworkCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let nodes: Node[] = [];
    let width = 0;
    let height = 0;
    let rafId = 0;
    let running = false;
    let visible = true;
    const pointer = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    /* colors — refreshed on theme change */
    const colors = { line: "rgba(120,140,160,0.28)", amber: "#f2a93b", node: "rgba(150,165,180,0.8)" };
    const readColors = () => {
      const cs = getComputedStyle(canvas);
      const eng = cs.getPropertyValue("--eng").trim() || "#6fa8ff";
      const amber = cs.getPropertyValue("--amber").trim() || "#f2a93b";
      const inkSoft = cs.getPropertyValue("--ink-soft").trim() || "#9aa2aa";
      colors.node = inkSoft;
      colors.amber = amber;
      colors.line = eng;
    };
    readColors();
    const themeObserver = new MutationObserver(readColors);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const hexAlpha = (hex: string, a: number) => {
      const h = hex.replace("#", "");
      if (h.length !== 6) return `rgba(120,140,160,${a})`;
      const n = parseInt(h, 16);
      return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
    };

    /* ── build node field ────────────────────────────────────────── */
    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const spacing = width < 640 ? 74 : 92;
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;
      nodes = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const hx = c * spacing + (Math.random() - 0.5) * 26;
          const hy = r * spacing + (Math.random() - 0.5) * 26;
          nodes.push({
            hx, hy, x: hx, y: hy, vx: 0, vy: 0,
            amber: Math.random() < 0.055,
          });
        }
      }
    };

    /* ── draw one frame ──────────────────────────────────────────── */
    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const LINK = width < 640 ? 96 : 118;
      const n = nodes.length;

      /* physics */
      if (!reduce) {
        for (let i = 0; i < n; i++) {
          const nd = nodes[i];
          // spring home
          nd.vx += (nd.hx - nd.x) * 0.028;
          nd.vy += (nd.hy - nd.y) * 0.028;
          // pointer repulsion
          const dx = nd.x - pointer.x;
          const dy = nd.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 150 * 150 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = ((150 - d) / 150) * 0.9;
            nd.vx += (dx / d) * f;
            nd.vy += (dy / d) * f;
          }
          nd.vx *= 0.86;
          nd.vy *= 0.86;
          nd.x += nd.vx;
          nd.y += nd.vy;
        }
      }

      /* links */
      ctx.lineWidth = 1;
      for (let i = 0; i < n; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < n; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const d = Math.sqrt(d2);
            const alpha = (1 - d / LINK) * 0.34;
            ctx.strokeStyle = hexAlpha(colors.line, alpha);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      /* nodes — survey crosses / amber diamonds */
      for (let i = 0; i < n; i++) {
        const nd = nodes[i];
        if (nd.amber) {
          ctx.save();
          ctx.translate(nd.x, nd.y);
          ctx.rotate(Math.PI / 4 + (reduce ? 0 : Math.sin(t / 2400 + i) * 0.35));
          ctx.fillStyle = colors.amber;
          ctx.fillRect(-3, -3, 6, 6);
          ctx.restore();
        } else {
          ctx.strokeStyle = hexAlpha(colors.node, 0.75);
          ctx.beginPath();
          ctx.moveTo(nd.x - 3.5, nd.y);
          ctx.lineTo(nd.x + 3.5, nd.y);
          ctx.moveTo(nd.x, nd.y - 3.5);
          ctx.lineTo(nd.x, nd.y + 3.5);
          ctx.stroke();
        }
      }
    };

    const loop = (t: number) => {
      if (running) draw(t);
      rafId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      if (reduce) {
        draw(0); // single static frame
        running = false;
        return;
      }
      rafId = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    build();
    start();

    const ro = new ResizeObserver(() => {
      build();
      if (reduce) draw(0);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVis = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener("visibilitychange", onVis);

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onPointerOut = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerout", onPointerOut);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerout", onPointerOut);
    };
  }, [reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none h-full w-full", className)}
    />
  );
}
