"use client";

/* ══════════════════════════════════════════════════════════════════
   CONTACT — spec §46 · SHT 14 · MONUMENT finale
   Kinetic headline · giant email link · magnetic CTAs ·
   role-target register · coordinates sign-off
   ══════════════════════════════════════════════════════════════════ */

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Mail, ArrowUpRight, Download, MapPin } from "lucide-react";
import { Linkedin } from "@/components/ui/icons";
import { profile, targetRoles } from "@/data/portfolio";
import { Magnetic, RevealLine, WordReveal } from "@/components/ui/motion-primitives";

export function ContactSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const ghostX = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["4%", "-6%"]);

  return (
    <section
      ref={ref}
      id="contact"
      aria-label="Contact"
      className="bg-grain relative overflow-hidden border-t border-line"
    >
      {/* backdrop grid + ghost coordinates */}
      <div aria-hidden className="bg-blueprint absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
      <motion.span
        aria-hidden
        style={{ x: ghostX }}
        className="text-outline pointer-events-none absolute -right-10 top-8 select-none font-expo text-[clamp(5rem,17vw,15rem)] font-bold leading-none opacity-50"
      >
        35.18°E
      </motion.span>
      <motion.span
        aria-hidden
        style={{ x: ghostX }}
        className="text-outline pointer-events-none absolute -left-10 bottom-24 select-none font-expo text-[clamp(5rem,17vw,15rem)] font-bold leading-none opacity-50"
      >
        0.52°N
      </motion.span>

      <div className="relative mx-auto max-w-[88rem] px-4 py-24 sm:px-6 lg:px-10 lg:py-36">
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-tech flex items-center gap-3 text-ink-faint"
        >
          <span className="bg-amber px-2 py-0.5 text-amber-foreground">SHT 14</span>
          CONTACT — GRADUATE OPPORTUNITIES
        </motion.p>

        {/* kinetic headline */}
        <h2 className="display-expo mt-8 text-[clamp(2.6rem,8vw,7rem)] font-bold uppercase">
          <RevealLine>Let&apos;s build</RevealLine>
          <RevealLine delay={0.1}>
            <span className="text-outline">something</span>
          </RevealLine>
          <RevealLine delay={0.2}>
            that <span className="text-amber">lasts.</span>
          </RevealLine>
        </h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          {/* left: copy + giant email */}
          <div className="lg:col-span-7">
            <WordReveal
              text="I am open to graduate civil and structural engineering roles, trainee programs, site-based opportunities, design-office roles, infrastructure projects and technical collaborations."
              accentWords={["graduate", "site-based", "design-office", "infrastructure"]}
              className="max-w-xl text-lg leading-[1.85] text-ink-soft"
            />

            {/* giant email */}
            <RevealLine delay={0.15} className="mt-10">
              <Magnetic strength={8}>
                <a
                  href={`mailto:${profile.email}?subject=Graduate Engineering Opportunity`}
                  data-cursor="EMAIL"
                  className="group inline-flex flex-wrap items-center gap-x-4 gap-y-2"
                >
                  <span className="font-expo text-[clamp(1.35rem,3.4vw,2.6rem)] font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-amber">
                    {profile.email}
                  </span>
                  <span className="grid h-11 w-11 place-items-center border border-ink/70 transition-all duration-300 group-hover:border-amber group-hover:bg-amber group-hover:text-amber-foreground">
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </a>
              </Magnetic>
            </RevealLine>

            {/* secondary CTAs */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Magnetic strength={10}>
                <a
                  href={`mailto:${profile.email}?subject=Graduate Engineering Opportunity`}
                  className="btn-plate group inline-flex items-center gap-3 bg-amber px-7 py-4 font-tech text-amber-foreground"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  Email Faith
                </a>
              </Magnetic>
              <a
                href={profile.cvUrl}
                download
                className="btn-plate inline-flex items-center gap-2.5 border border-ink/80 bg-paper px-6 py-4 font-tech text-ink transition-colors hover:text-amber"
              >
                <Download className="h-4 w-4" aria-hidden />
                Download CV
              </a>
              <a
                href={profile.links[1]?.url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-tech text-ink-soft transition-colors hover:text-amber"
              >
                <Linkedin className="h-4 w-4" aria-hidden />
                <span className="link-fill">LinkedIn</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </a>
            </motion.div>
          </div>

          {/* right: role register */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="border border-line bg-surface">
              <div className="border-b border-line bg-surface-2 px-5 py-2.5">
                <span className="font-tech text-eng">ROLES I AM TARGETING</span>
              </div>
              <ul className="px-5 py-4">
                {targetRoles.map((r, i) => (
                  <li
                    key={r}
                    className="group flex items-baseline justify-between gap-4 border-b border-line/60 py-2.5 last:border-0"
                  >
                    <span className="text-sm text-ink transition-colors duration-300 group-hover:text-amber">
                      {r}
                    </span>
                    <span className="font-tech text-ink-faint">
                      R{String(i + 1).padStart(2, "0")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
              className="font-tech mt-6 flex items-center gap-2 text-ink-faint"
            >
              <MapPin className="h-3.5 w-3.5 text-amber" aria-hidden />
              {profile.location} · {profile.coordinates}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
