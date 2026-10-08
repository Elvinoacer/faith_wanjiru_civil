"use client";

/* ══════════════════════════════════════════════════════════════════
   SNAPSHOT — spec §13 · MONUMENT stat band
   Oversized counting numerals + technical meta ledger.
   ══════════════════════════════════════════════════════════════════ */

import { snapshot } from "@/data/portfolio";
import { Stagger, StaggerItem, ScrollCount } from "@/components/ui/motion-primitives";

const NUMERIC: Record<string, number> = {
  "2026": 2026,
  "4+": 4,
  "12 wks": 12,
};

export function Snapshot() {
  return (
    <section aria-label="Profile snapshot" className="border-b border-line bg-surface/40">
      <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-10">
        <Stagger className="grid grid-cols-2 gap-px bg-line md:grid-cols-4">
          {snapshot.map((s) => {
            const numeric = NUMERIC[s.value];
            return (
              <StaggerItem
                key={s.label}
                className="spotlight group relative bg-paper px-5 py-8 sm:px-7 sm:py-10"
              >
                <p className="font-tech text-ink-faint">{s.label.toUpperCase()}</p>
                <p className="display-expo mt-4 text-[clamp(1.7rem,3.4vw,2.9rem)] font-bold tracking-tight text-ink">
                  {numeric !== undefined ? (
                    <ScrollCount
                      value={numeric}
                      suffix={
                        s.value.includes("+") ? "+" : s.value.includes("wks") ? " wks" : ""
                      }
                    />
                  ) : (
                    s.value
                  )}
                </p>
                <p className="font-tech mt-2.5 text-ink-soft">{s.note}</p>
                {/* amber corner tick on hover */}
                <span
                  aria-hidden
                  className="absolute right-3.5 top-3.5 h-1.5 w-1.5 rotate-45 bg-amber opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                {/* baseline hairline draw */}
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-amber transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                />
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
