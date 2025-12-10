import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import Link from "next/link";
import Repository from "@/lib/github/github.repository";

// ✅ Lazy load de Framer Motion (NO bloquea render)
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);

// ✅ Lazy load de secciones pesadas
const AboutMe = dynamic(() => import("../about/AboutMe"), { ssr: false });
const ProjectCard = dynamic(() => import("../project/ProjectCard"), {
  ssr: false,
});

export default function Home({
  repositories = [],
}: {
  repositories?: Repository[];
}) {
  const [showArrow, setShowArrow] = useState(true);
  const router = useRouter();

  // ✅ Toast SOLO después de interacción real del usuario
  useEffect(() => {
    const clickHandler = () => {
      const audio = new Audio("/sounds/notify.wav");
      audio.play().catch(() => {});

      toast.custom(() => (
        <div
          className="flex items-center gap-4 bg-secondary border border-purple-500/30 
                 px-6 py-4 rounded-2xl shadow-xl"
        >
          <div className="w-10 h-10 rounded-full bg-purple-500/20 
                      flex items-center justify-center text-xl">
            👋
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold">Welcome!</p>
            <p className="text-white/60 text-sm">
              {" I'm Alexis, Full Stack Developer."}
            </p>
          </div>
          <button
            onClick={() => router.push("/contact")}
            className="px-4 py-1.5 rounded-lg 
                   bg-purple-600 hover:bg-purple-700 
                   transition text-sm text-white"
          >
            Contact
          </button>
        </div>
      ));

      window.removeEventListener("click", clickHandler);
    };

    window.addEventListener("click", clickHandler);
    return () => window.removeEventListener("click", clickHandler);
  }, [router]);

  // ✅ Flecha solo visible arriba
  useEffect(() => {
    const handleScroll = () => setShowArrow(window.scrollY < 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const featured = repositories.filter((repo) => repo.featured);

  return (
    <div className="bg-primary text-white">
      {/* ✅ HERO OPTIMIZADO PARA LCP */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-8 pb-24 overflow-hidden">
        <h1 className="text-6xl font-bold mb-3">I&apos;m Alexis</h1>

        <h2 className="text-3xl text-purple-400 font-medium mb-6">
          Full Stack Developer
        </h2>

        <p className="max-w-xl text-white/70 mb-8">
          I build modern web applications, APIs and scalable systems with clean UI
          and solid backend architecture.
        </p>

        <div className="flex gap-4">
          <Link
            href="/projects"
            className="px-6 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition"
            aria-label="View projects"
          >
            View Projects
          </Link>

          <a
            href="/cv.pdf"
            download
            className="px-6 py-3 rounded-xl border border-purple-500 text-purple-300 hover:bg-purple-500/10 transition"
          >
            Download CV
          </a>
        </div>

        {/* ✅ FLECHA OPTIMIZADA */}
        <MotionDiv
          className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer z-20"
          onClick={() =>
            document.getElementById("about")?.scrollIntoView({
              behavior: "smooth",
            })
          }
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: showArrow ? 1 : 0,
            y: showArrow ? 0 : 20,
          }}
          transition={{ duration: 0.4 }}
        >
          <MotionDiv
            animate={{ y: [0, 12, 0], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="text-purple-400 hover:text-purple-300 transition"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 10l5 5 5-5" />
            </svg>
          </MotionDiv>
        </MotionDiv>
      </section>

      {/* ✅ ABOUT EN LAZY LOAD */}
      <AboutMe />

      {/* ✅ FEATURED PROJECTS EN LAZY LOAD */}
      {featured.length > 0 && (
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">
              Featured Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.slice(0, 3).map((repo) => (
                <ProjectCard key={repo.name} repository={repo} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/projects"
                className="text-purple-400 hover:underline"
                aria-label="View all projects"
              >
                View all projects →
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
