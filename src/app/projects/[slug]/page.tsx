import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects, getProject } from "@/data/projects";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { BmdSfdDiagram } from "@/components/structural/diagrams";
import { creativeWorkSchema } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.shortTitle,
    description: project.tagline,
    openGraph: {
      title: `${project.shortTitle} | Faith Wanjiru`,
      description: project.tagline,
      images: [{ url: project.cover }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(creativeWorkSchema(project.title, project.tagline, project.year)),
        }}
      />
      <Nav />
      <main id="main" className="pt-16">
        {/* masthead */}
        <header className="border-b border-line">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
            <Link
              href="/#projects"
              className="font-tech inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-eng"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              PROJECT REGISTER
            </Link>
            <p className="font-tech mt-8 text-amber">
              CASE STUDY {project.index}/0{projects.length} · {project.type.toUpperCase()} · {project.year}
            </p>
            <h1 className="display-tight mt-4 max-w-3xl text-3xl font-semibold text-ink sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">{project.tagline}</p>
            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-4">
              {[
                ["ROLE", project.role],
                ["DURATION", project.duration],
                ["TEAM", project.teamSize],
                ["TOOLS", project.software.join(" · ")],
              ].map(([k, v]) => (
                <div key={k} className="bg-surface p-4">
                  <dt className="font-tech text-ink-faint">{k}</dt>
                  <dd className="mt-1.5 text-[13px] leading-snug text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        {/* cover */}
        <figure className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="relative mt-10 aspect-[21/9] overflow-hidden border border-line">
            <Image
              src={project.cover}
              alt={project.coverAlt}
              fill
              priority
              sizes="(min-width: 1024px) 1000px, 100vw"
              className="object-cover"
            />
            <figcaption className="font-tech absolute bottom-3 left-3 bg-paper/90 px-2.5 py-1.5 text-ink-soft backdrop-blur">
              {project.categoryLabel.toUpperCase()} · FIG. {project.index}
            </figcaption>
          </div>
        </figure>

        {/* body */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-x-10 px-4 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Block n="01 /" title="The Brief">
              <p className="text-[15px] leading-relaxed text-ink-soft">{project.brief}</p>
            </Block>
            <Block n="02 /" title="The Problem">
              <p className="text-[15px] leading-relaxed text-ink-soft">{project.problem}</p>
            </Block>
            <Block n="03 /" title="Engineering Approach">
              <ol className="flex flex-col gap-6">
                {project.approach.map((a, i) => (
                  <li key={a.title} className="relative border-l-2 border-line pl-5">
                    <span className="font-tech absolute -left-[7px] top-1 h-3 w-3 rounded-full border border-eng bg-paper" aria-hidden />
                    <h4 className="font-display text-base font-semibold text-ink">
                      <span className="font-tech mr-2 text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                      {a.title}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{a.body}</p>
                  </li>
                ))}
              </ol>
            </Block>
            {project.calculations.length > 0 && (
              <Block n="04 /" title="Selected Calculations">
                <div className="flex flex-col gap-4">
                  {project.calculations.map((c) => (
                    <div key={c.title} className="border border-line bg-surface">
                      <div className="border-b border-line bg-surface-2 px-4 py-2">
                        <span className="font-tech text-eng">{c.title}</span>
                      </div>
                      <pre className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-7 text-ink">
{c.lines.join("\n")}
                      </pre>
                      {c.note && (
                        <p className="border-t border-line bg-amber-tint px-4 py-2.5 text-xs italic text-ink-soft">
                          {c.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </Block>
            )}
            {project.slug === "rc-building-design" && (
              <Block n="05 /" title="Analysis Output — BMD / SFD" wide>
                <div className="border border-line bg-surface p-6">
                  <BmdSfdDiagram />
                  <p className="mt-4 border-t border-line pt-4 text-[13px] leading-relaxed text-ink-soft">
                    The parabolic moment diagram confirms sagging mid-span action; the shear diagram
                    crosses zero at maximum moment. Software accelerated analysis — engineering
                    judgment confirmed the output was physically reasonable.
                  </p>
                </div>
              </Block>
            )}
            <Block n="06 /" title="Results & Outputs">
              <ul className="flex flex-col gap-2.5">
                {project.results.map((r) => (
                  <li key={r} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                    <span className="font-tech mt-1 shrink-0 text-eng" aria-hidden>+</span>
                    {r}
                  </li>
                ))}
              </ul>
            </Block>
            <Block n="07 /" title="Limitations">
              <ul className="flex flex-col gap-2.5">
                {project.limitations.map((l) => (
                  <li key={l} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                    <span className="font-tech mt-0.5 shrink-0 text-amber" aria-hidden>!</span>
                    {l}
                  </li>
                ))}
              </ul>
            </Block>
            <Block n="08 /" title="Lessons Learned">
              <blockquote className="border-l-2 border-eng pl-5 text-[15px] italic leading-relaxed text-ink">
                {project.lessons}
              </blockquote>
            </Block>
            {project.improvements.length > 0 && (
              <Block n="09 /" title="Future Improvements">
                <div className="flex flex-wrap gap-2">
                  {project.improvements.map((im) => (
                    <span key={im} className="font-tech border border-line px-3 py-1.5 text-ink-soft">
                      {im}
                    </span>
                  ))}
                </div>
              </Block>
            )}
          </div>

          <aside className="lg:col-span-5 lg:pt-14">
            <div className="sticky top-24 flex flex-col gap-4">
              <div className="border border-line bg-surface p-5">
                <h4 className="font-tech text-eng">DESIGN CRITERIA</h4>
                <ul className="mt-3 flex flex-col gap-2">
                  {project.designCriteria.map((d) => (
                    <li key={d} className="flex gap-2.5 text-[13px] leading-snug text-ink-soft">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rotate-45 bg-amber" aria-hidden />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-line bg-surface p-5">
                <h4 className="font-tech text-eng">EVIDENCE SET</h4>
                <ul className="mt-3 flex flex-col gap-2">
                  {project.evidence.map((e) => (
                    <li key={e.label} className="flex items-baseline justify-between gap-3 border-b border-line pb-2 text-[13px] last:border-0">
                      <span className="text-ink">{e.label}</span>
                      <span className="font-tech text-right text-ink-faint">{e.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-line bg-surface p-5">
                <h4 className="font-tech text-eng">REFERENCES</h4>
                <p className="mt-3 font-mono text-[12px] leading-6 text-ink-soft">
                  {project.standards.join(" · ")}
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* prev / next */}
        <nav aria-label="Project navigation" className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { p: prev, label: "PREVIOUS", Icon: ArrowLeft },
              { p: next, label: "NEXT", Icon: ArrowRight },
            ].map(({ p, label, Icon }) => (
              <Link
                key={label}
                href={`/projects/${p.slug}`}
                className="group flex items-center gap-4 border border-line bg-surface p-5 transition-colors hover:border-eng"
              >
                <Icon className="h-5 w-5 shrink-0 text-ink-soft transition-colors group-hover:text-eng" aria-hidden />
                <div>
                  <p className="font-tech text-ink-faint">{label} — {p.index}</p>
                  <p className="font-display mt-1 text-base font-semibold text-ink transition-colors group-hover:text-eng">
                    {p.shortTitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </nav>
      </main>
      <Footer />
    </>
  );
}

function Block({
  n,
  title,
  children,
  wide,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <section className={`border-t border-line py-10 ${wide ? "col-span-full" : ""}`}>
      <div className="flex items-baseline gap-4">
        <span className="font-tech text-amber">{n}</span>
        <h2 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          {title}
        </h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
