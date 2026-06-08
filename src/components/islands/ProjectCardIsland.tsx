"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiStar, FiExternalLink } from "react-icons/fi";
import { Repository } from "@/types";

interface Props {
  repo: Repository;
  index?: number;
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return "today";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export default function ProjectCardIsland({ repo, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="relative group"
    >
      <div className="relative h-full bg-white/[0.03] hover:bg-white/[0.06] border border-white/8 hover:border-white/15 rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300">
        {/* Overlay link for card navigation */}
        <Link
          href={`/projects/${repo.name}`}
          aria-label={`View ${repo.name}`}
          className="absolute inset-0 z-0 rounded-2xl"
        />

        {/* Header */}
        <div className="relative z-10 flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              {repo.featured && (
                <span className="text-[10px] font-medium text-purple-400/80 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
                  Featured
                </span>
              )}
              {repo.language && (
                <span className="text-[10px] text-white/30">{repo.language}</span>
              )}
            </div>
            <h3 className="text-sm font-semibold text-white/80 truncate">{repo.name}</h3>
          </div>
          <div className="flex items-center gap-1 text-white/30 text-xs shrink-0">
            <FiStar size={11} />
            {repo.stargazersCount}
          </div>
        </div>

        {/* Description */}
        <p className="relative z-10 text-xs text-white/45 leading-relaxed line-clamp-2 flex-1">
          {repo.description}
        </p>

        {/* Topics */}
        {repo.topics.length > 0 && (
          <div className="relative z-10 flex flex-wrap gap-1.5">
            {repo.topics.slice(0, 3).map((t) => (
              <span key={t} className="text-[10px] text-white/30 border border-white/8 px-2 py-0.5 rounded-full">
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/5">
          <span className="text-[10px] text-white/25">{timeAgo(repo.updatedAt)}</span>
          <a
            href={`https://github.com/alexissdev/${repo.name}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${repo.name} on GitHub`}
            className="flex items-center gap-1 text-[11px] text-white/35 hover:text-purple-400 transition-colors"
          >
            <FiExternalLink size={11} />
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
}
