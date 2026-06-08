import type { Metadata } from "next";
import { getRepositories } from "@/lib/github";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects",
  description: "All projects by Alexis Costa — Full Stack Developer from Buenos Aires.",
};

export default async function ProjectsPage() {
  const repos = await getRepositories().catch(() => []);
  const featured = repos.filter((r) => r.featured);
  const others = repos.filter((r) => !r.featured);

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs text-purple-400/70 uppercase tracking-widest mb-3">Work</p>
        <h1 className="text-4xl font-bold text-white mb-2">Projects</h1>
        <p className="text-white/35 text-sm mb-16">
          Things I&apos;ve built and worked on.
        </p>
        <ProjectsClient featured={featured} others={others} />
      </div>
    </div>
  );
}
