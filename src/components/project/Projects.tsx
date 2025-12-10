import { useMemo } from "react";
import Repository from "@/lib/github/github.repository";
import ProjectCard from "./ProjectCard";

export default function Projects({
  repositories,
}: {
  repositories: Repository[];
}) {
  const { featured, normal } = useMemo(() => {
    const featured = [];
    const normal = [];

    for (const repo of repositories) {
      if (repo.featured) featured.push(repo);
      else normal.push(repo);
    }

    return { featured, normal };
  }, [repositories]);

  return (
    <div className="bg-primary pt-5 pb-5 md:pt-8 md:pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-12 px-10">
          {featured.length > 0 && (
            <section className="pt-32 pb-24">
              <h2 className="text-2xl font-bold text-white mb-6">
                Featured Projects
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featured.map((repo) => (
                  <ProjectCard
                    key={repo.name}
                    repository={repo}
                    featured
                  />
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-2xl font-bold text-white mb-6">
              All Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {normal.map((repo) => (
                <ProjectCard
                  key={repo.name}
                  repository={repo}
                />
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
