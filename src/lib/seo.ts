/* ── Structured data builders — spec §57 ────────────────────────── */
import { profile, targetRoles } from "@/data/portfolio";

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: profile.fullName,
      jobTitle: "Graduate Civil & Structural Engineer",
      description:
        "Moi University Civil & Structural Engineering graduate focused on structural design, construction and sustainable infrastructure.",
      email: `mailto:${profile.email}`,
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Moi University",
      },
      knowsAbout: [
        "Civil Engineering",
        "Structural Engineering",
        "Reinforced Concrete Design",
        "Construction Engineering",
        "Infrastructure",
        "Geotechnical Engineering",
        "Engineering Surveying",
      ],
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: "Bachelor of Engineering in Civil & Structural Engineering",
      },
      knowsLanguage: "en",
      nationality: { "@type": "Country", name: "Kenya" },
    },
  };
}

export function creativeWorkSchema(title: string, about: string, year: number) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    about,
    dateCreated: String(year),
    creator: {
      "@type": "Person",
      name: profile.fullName,
      jobTitle: "Graduate Civil & Structural Engineer",
    },
    keywords: targetRoles.slice(0, 4).join(", "),
  };
}
