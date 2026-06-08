"use client";

import { useState } from "react";
import { Repository } from "@/types";
import ProjectCardIsland from "@/components/islands/ProjectCardIsland";

interface Props {
  featured: Repository[];
  others: Repository[];
}

export default function ProjectsClient({ featured, others }: Props) {
  const [search, setSearch] = useState("");
  const [filterLang, setFilterLang] = useState("All");

  const allRepos = [...featured, ...others];
  const languages = [
    "All",
    ...Array.from(new Set(allRepos.map((r) => r.language).filter(Boolean))),
  ];

  const filtered = others.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    const matchLang = filterLang === "All" || r.language === filterLang;
    return matchSearch && matchLang;
  });

  return (
    <>
      {/* Featured */}
      {featured.length > 0 && (
        <section className="mb-20">
          <p className="text-xs text-purple-400/70 uppercase tracking-widest mb-3">Featured</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {featured.map((repo, i) => (
              <ProjectCardIsland key={repo.name} repo={repo} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="h-px bg-white/5 mb-16" />

      {/* Search & filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search projects"
          className="flex-1 bg-white/3 border border-white/8 focus:border-white/20 rounded-xl px-4 py-2.5 text-white/70 placeholder-white/20 outline-none transition-colors text-sm"
        />
        <div className="flex gap-2 flex-wrap">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setFilterLang(lang)}
              aria-label={`Filter by ${lang}`}
              className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                filterLang === lang
                  ? "bg-violet-600 border-violet-600 text-white"
                  : "border-white/8 text-white/35 hover:text-white/60 hover:border-white/15"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* All projects */}
      <section>
        <p className="text-xs text-white/30 uppercase tracking-widest mb-6">All Projects</p>
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((repo, i) => (
              <ProjectCardIsland key={repo.name} repo={repo} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-white/25 text-sm">No projects match your search.</p>
        )}
      </section>
    </>
  );
}
