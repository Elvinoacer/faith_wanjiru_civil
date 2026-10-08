import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { Snapshot } from "@/components/site/Snapshot";
import { ProjectsShowcase } from "@/components/projects/ProjectsShowcase";
import { FypWorkflow } from "@/components/structural/FypWorkflow";
import { ExperienceSection } from "@/components/site/ExperienceSection";
import { EngineeringSection } from "@/components/site/EngineeringSection";
import { EducationSection } from "@/components/site/EducationSection";
import { TimelineSection } from "@/components/site/TimelineSection";
import { AboutSection } from "@/components/site/AboutSection";
import { ContactSection } from "@/components/site/ContactSection";
import { personSchema } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
      />
      <Nav />
      <main id="main" className="min-h-screen">
        {/* SHT 01 — Hero */}
        <Hero />
        {/* SHT 02 — Candidate snapshot */}
        <Snapshot />
        {/* SHT 03 + 04 — Featured project & project register */}
        <ProjectsShowcase />
        {/* SHT 05 — FYP design workflow */}
        <FypWorkflow />
        {/* SHT 06 — Industrial attachment */}
        <ExperienceSection />
        {/* SHT 07 + 08 — Capabilities, skills & software */}
        <EngineeringSection />
        {/* SHT 09 + 10 — Education, labs & field */}
        <EducationSection />
        {/* SHT 11 + 12 — Timeline & currently learning */}
        <TimelineSection />
        {/* SHT 13 + philosophy — About */}
        <AboutSection />
        {/* SHT 14 — Contact */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
