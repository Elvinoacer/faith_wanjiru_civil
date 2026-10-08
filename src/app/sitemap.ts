import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://faith-wanjiru.engineer";
  const routes = ["", "/projects", "/recruiter", "/cv"].map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.8,
  }));
  const projectRoutes = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));
  return [...routes, ...projectRoutes];
}
