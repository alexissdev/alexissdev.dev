import type { Metadata } from "next";
import Link from "next/link";
import { getRepositories, getContributions, featuredOrder } from "@/lib/github";
import HeroArrowIsland from "@/components/islands/HeroArrowIsland";
import TypewriterIsland from "@/components/islands/TypewriterIsland";
import AboutMeIsland from "@/components/islands/AboutMeIsland";
import SkillsIsland from "@/components/islands/SkillsIsland";
import TimelineSection from "@/components/TimelineSection";
import ActivityGraphIsland from "@/components/islands/ActivityGraphIsland";
import ProjectCardIsland from "@/components/islands/ProjectCardIsland";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Alexis Costa — Full Stack Developer building modern web applications, APIs and scalable systems.",
};

const stats = [
  { value: "3+",  label: "Years of experience" },
  { value: "10+", label: "Projects shipped" },
  { value: "5+",  label: "Technologies" },
  { value: "∞",   label: "Lines of code" },
];

export default async function HomePage() {
  const [repos, contributions] = await Promise.all([
    getRepositories().catch(() => []),
    getContributions().catch(() => null),
  ]);
  const featuredRepos = repos
    .filter((r) => r.featured)
    .sort((a, b) => featuredOrder.indexOf(a.name) - featuredOrder.indexOf(b.name));
  const latestActiveRepo = [...repos].sort(
    (a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime()
  )[0];

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

        {/* Dot grid */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          }}
        />

        {/* Grain / noise overlay */}
        <svg aria-hidden className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035]">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        {/* Purple glow */}
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(109,40,217,0.15) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-4xl">
          {/* Available badge */}
          <span className="animate-fade-up inline-flex items-center gap-2 text-xs font-medium text-emerald-400/80 border border-emerald-500/20 rounded-full px-4 py-1.5 bg-emerald-500/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for opportunities
          </span>

          <span className="animate-fade-up animate-delay-100 inline-flex items-center gap-2 text-xs font-medium text-purple-400/80 tracking-widest uppercase border border-purple-500/20 rounded-full px-4 py-1.5 bg-purple-500/5">
            Full Stack Developer · Buenos Aires 🇦🇷
          </span>

          <h1 className="animate-fade-up animate-delay-200 text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[1.05]">
            <span className="text-white">Hi, I&apos;m </span>
            <span
              style={{
                background: "linear-gradient(135deg, #e9d5ff 0%, #a855f7 40%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Alexis
            </span>
          </h1>

          <div className="animate-fade-up animate-delay-300">
            <TypewriterIsland />
          </div>

          <p className="animate-fade-up animate-delay-400 text-base sm:text-lg text-white/40 max-w-md leading-relaxed font-light">
            I build modern web applications, APIs and scalable systems with
            clean UI and solid backend architecture.
          </p>

          <div className="animate-fade-up animate-delay-400 flex items-center gap-3 flex-wrap justify-center pt-2">
            <Link
              href="/projects"
              aria-label="View Projects"
              className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-full transition-colors duration-200"
            >
              View Projects
            </Link>
            <a
              href="/cv.pdf"
              download
              aria-label="Download CV"
              className="px-6 py-2.5 border border-white/12 text-white/55 hover:text-white hover:border-white/25 text-sm font-medium rounded-full transition-all duration-200"
            >
              Download CV
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 animate-fade-up animate-delay-500">
          <HeroArrowIsland />
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="py-12 px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={s.label} className={`text-center ${i < 3 ? "md:border-r border-white/5" : ""}`}>
              <p
                className="text-3xl font-bold mb-1"
                style={{
                  background: "linear-gradient(135deg, #e9d5ff 0%, #a855f7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.value}
              </p>
              <p className="text-xs text-white/30 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <AboutMeIsland />
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6"><div className="h-px bg-white/5" /></div>

      {/* ── NOW ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-8 flex flex-col sm:flex-row gap-8 items-start">
            <div className="shrink-0">
              <span className="inline-flex items-center gap-2 text-xs text-emerald-400/70 border border-emerald-500/20 bg-emerald-500/5 rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Now
              </span>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 flex-1">
              <div>
                <p className="text-xs text-white/25 uppercase tracking-wider mb-1.5">Building</p>
                {latestActiveRepo ? (
                  <Link
                    href={`/projects/${latestActiveRepo.name}`}
                    className="text-sm text-white/60 hover:text-purple-400 leading-relaxed transition-colors"
                  >
                    {latestActiveRepo.name}
                  </Link>
                ) : (
                  <p className="text-sm text-white/60 leading-relaxed">alexissdev.dev v2 — this portfolio</p>
                )}
              </div>
              {[
                { label: "Learning", value: "System design & distributed architectures" },
                { label: "Listening", value: "Lo-fi & focus playlists" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-white/25 uppercase tracking-wider mb-1.5">{label}</p>
                  <p className="text-sm text-white/60 leading-relaxed">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6"><div className="h-px bg-white/5" /></div>

      {/* ── SKILLS ── */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <SkillsIsland />
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6"><div className="h-px bg-white/5" /></div>

      {/* ── TIMELINE ── */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <TimelineSection />
        </div>
      </section>

      {contributions && (
        <>
          <div className="max-w-5xl mx-auto px-6"><div className="h-px bg-white/5" /></div>

          {/* ── ACTIVITY GRAPH ── */}
          <section className="py-28 px-6">
            <div className="max-w-5xl mx-auto">
              <p className="text-xs text-purple-400/70 uppercase tracking-widest mb-3">Activity</p>
              <h2 className="text-3xl font-bold text-white mb-10">GitHub Contributions</h2>
              <ActivityGraphIsland data={contributions} />
            </div>
          </section>
        </>
      )}

      <div className="max-w-5xl mx-auto px-6"><div className="h-px bg-white/5" /></div>

      {/* ── FEATURED PROJECTS ── */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs text-purple-400/70 uppercase tracking-widest mb-2">Work</p>
              <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
            </div>
            <Link href="/projects" aria-label="View all projects" className="text-sm text-white/35 hover:text-white/60 transition-colors">
              View all →
            </Link>
          </div>

          {featuredRepos.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredRepos.map((repo, i) => (
                <ProjectCardIsland key={repo.name} repo={repo} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-white/25 text-sm">No featured projects found.</p>
          )}
        </div>
      </section>
    </>
  );
}
