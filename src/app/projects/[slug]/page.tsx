import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getRepository, getReadme } from "@/lib/github";
import { FiStar, FiGitBranch, FiArrowLeft, FiExternalLink } from "react-icons/fi";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug, description: `Details and README for ${slug}.` };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const [repo, readme] = await Promise.all([
    getRepository(slug).catch(() => null),
    getReadme(slug).catch(() => null),
  ]);

  if (!repo) notFound();

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <Link href="/projects" aria-label="Back to projects"
          className="inline-flex items-center gap-1.5 text-white/30 hover:text-white/60 transition-colors text-sm mb-10">
          <FiArrowLeft size={14} /> Back
        </Link>

        {/* Header */}
        <div className="mb-8">
          {repo.featured && (
            <span className="inline-block text-xs text-purple-400/70 bg-purple-500/8 border border-purple-500/20 px-2.5 py-1 rounded-full mb-4">
              Featured
            </span>
          )}
          <h1 className="text-4xl font-bold text-white mb-3">{repo.name}</h1>
          <p className="text-white/45 leading-relaxed">{repo.description}</p>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { icon: FiStar, label: `${repo.stargazersCount} stars` },
            { icon: FiGitBranch, label: `${repo.forksCount} forks` },
            ...(repo.language ? [{ icon: null, label: repo.language }] : []),
            { icon: null, label: formatDate(repo.updatedAt) },
          ].map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/3 border border-white/8 text-white/35 text-xs">
              {Icon && <Icon size={11} />}
              {label}
            </span>
          ))}
        </div>

        {/* Topics */}
        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-10">
            {repo.topics.map((t) => (
              <span key={t} className="text-xs text-white/30 border border-white/8 px-2.5 py-0.5 rounded-full">{t}</span>
            ))}
          </div>
        )}

        {/* README */}
        {readme && (
          <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-6 md:p-8 mb-10">
            <p className="text-xs text-white/25 uppercase tracking-widest mb-6">README</p>
            <div className="prose-portfolio max-w-none">
              <ReactMarkdown>{readme}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4">
          <a
            href={`https://github.com/alexissdev/${repo.name}`}
            target="_blank" rel="noopener noreferrer" aria-label="View on GitHub"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
          >
            <FiExternalLink size={14} /> View on GitHub
          </a>
          <Link href="/projects" aria-label="Back" className="text-white/30 hover:text-white/60 text-sm transition-colors">
            ← Back
          </Link>
        </div>
      </div>
    </div>
  );
}
