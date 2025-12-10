import { GetStaticPaths, GetStaticProps } from "next";
import Header from "@/components/Header";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Repository from "@/lib/github/github.repository";
import {
  getRepositoryOfUser,
  getReadme,
} from "@/lib/github/repository.service";
import Navigation from "@/components/navigation/Navigation";

export default function ProjectDetail({
  repo,
  readme,
}: {
  repo: Repository;
  readme: string;
}) {
  return (
    <div>
      <Navigation />
      <Header
        metaData={{
          title: repo.name,
          description: "Our projects: the projects that we have developed",
          openGraphTitle: "Alexis | Projects",
          url: "projects",
        }}
      />
      <div className="min-h-screen bg-primary py-4">
        <div className="animate-fade-in">
          <div className="text-white px-6 py-16 max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-purple-400 mb-4">
              {repo.name}
            </h1>

            <div className="flex flex-wrap gap-6 items-center text-sm text-white/70 mb-8">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                ⭐ <span className="text-white">{repo.stargazersCount}</span>{" "}
                Stars
              </div>

              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                🍴 <span className="text-white">{repo.forksCount}</span> Forks
              </div>

              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                🛠 {repo.language}
              </div>

              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                🕒 {new Date(repo.updatedAt).toLocaleDateString()}
              </div>
            </div>

            <p className="text-white/70 mb-6">{repo.description}</p>

            <div className="flex flex-wrap gap-3 mb-10">
              {repo.topics?.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm rounded-full 
      bg-purple-500/10 text-purple-300
      border border-purple-500/20
      transition-all duration-300
      hover:scale-105 hover:bg-purple-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div
              className="mt-10 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/5
              border border-purple-500/20 shadow-xl shadow-purple-500/10 shadow-inner shadow-purple-500/10
              p-8 backdrop-blur transition-transform hover:scale-[1.01]"
            >
              {readme && (
                <div
                  className="
      prose prose-invert max-w-3xl
      prose-headings:text-purple-300
      prose-headings:border-b
      prose-headings:border-purple-500/30
      prose-headings:pb-2
      prose-headings:mt-10
      prose-a:text-pink-300
      prose-strong:text-white
      prose-li:marker:text-purple-400
      prose-li:pl-2
    "
                >
                  <ReactMarkdown
                    components={{
                      pre: ({ node, ...props }) => (
                        <pre
                          className="bg-black/40 border border-purple-500/20 rounded-xl p-4 overflow-x-auto"
                          {...props}
                        />
                      ),
                      code: ({ node, ...props }) => (
                        <code className="text-pink-300" {...props} />
                      ),
                      hr: () => (
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent my-10" />
                      ),
                    }}
                  >
                    {readme}
                  </ReactMarkdown>
                </div>
              )}
            </div>

            <div className="mt-10 flex justify-between items-center">
              <a
                href={`https://github.com/${repo.fullName}`}
                target="_blank"
                className="text-purple-400 hover:underline"
              >
                View in GitHub →
              </a>

              <Link href="/projects" className="text-white/60 hover:text-white" rel="noopener noreferrer"
                aria-label="View back page">
                ← Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const repositories = await getRepositoryOfUser("alexissdev");

  const paths = repositories.map((repo: Repository) => ({
    params: { slug: repo.name },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const repositories = await getRepositoryOfUser("alexissdev");
  const repo = repositories.find((r) => r.name === params?.slug);

  if (!repo) {
    return { notFound: true };
  }

  const readme = await getReadme("alexissdev", repo.name);

  return {
    props: {
      repo,
      readme,
    },
  };
};
