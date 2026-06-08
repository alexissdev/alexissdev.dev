import type { MetadataRoute } from "next";
import { getRepositories } from "@/lib/github";

const BASE_URL = "https://alexissdev.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const repos = await getRepositories().catch(() => []);

  const projectRoutes = repos.map((repo) => ({
    url: `${BASE_URL}/projects/${repo.name}`,
    lastModified: new Date(repo.updatedAt),
    changeFrequency: "monthly" as const,
    priority: repo.featured ? 0.8 : 0.6,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...projectRoutes,
  ];
}
