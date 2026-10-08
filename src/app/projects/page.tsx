import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Six engineering case studies: structural design, highway geometry, geotechnics, stormwater drainage, construction planning and surveying.",
};

export default function ProjectsIndex() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-16">
        <header className="border-b border-line">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
            <p className="font-tech text-eng">SHT 04 · PROJECT REGISTER — FULL LISTING</p>
            <h1 className="display-tight mt-4 text-4xl font-semibold text-ink sm:text-5xl">
              Selected Engineering Work
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">
              Case studies presented as evidence, not decoration — each with brief, criteria,
              approach, calculations, results, limitations and lessons.
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <ol className="divide-y divide-line border border-line bg-surface">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-6 gap-y-2 px-5 py-6 transition-colors hover:bg-eng-tint/40 sm:grid-cols-[auto_1fr_auto_auto]"
                >
                  <span className="font-tech text-ink-faint">{p.index}</span>
                  <span>
                    <span className="font-display block text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-eng">
                      {p.shortTitle}
                    </span>
                    <span className="font-tech mt-1 block text-ink-faint">
                      {p.categoryLabel.toUpperCase()} · {p.type.toUpperCase()}
                    </span>
                  </span>
                  <span className="font-tech hidden text-ink-soft sm:inline">{p.software.join(" · ")}</span>
                  <ArrowUpRight className="h-5 w-5 text-ink-soft transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-eng" aria-hidden />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </main>
      <Footer />
    </>
  );
}
