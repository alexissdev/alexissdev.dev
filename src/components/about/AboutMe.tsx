"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

// ✅ Framer Motion SOLO en cliente (no bloquea performance)
const MotionDiv = dynamic(
  () => import("framer-motion").then((m) => m.motion.div),
  { ssr: false }
);

export default function AboutMe() {
  return (
    <section id="about" className="bg-primary py-24">
      <div className="max-w-6xl mx-auto px-8">
        <div
          className="bg-secondary rounded-2xl p-12 shadow-xl 
          flex flex-col md:flex-row items-center gap-12 overflow-hidden"
        >
          {/* ✅ FOTO OPTIMIZADA (NO afecta LCP) */}
          <MotionDiv
            initial={{ opacity: 0, scale: 0.9, x: -30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="shrink-0"
          >
            <div
              className="
              w-56 h-56 md:w-64 md:h-64 
              rounded-3xl overflow-hidden 
              border border-purple-500/40
              shadow-[0_0_45px_rgba(168,85,247,0.45)]
            "
            >
              <Image
                src="/me.jpg"
                alt="Alexis"
                width={256}
                height={256}
                loading="lazy"
                quality={80}
                className="object-cover w-full h-full"
              />
            </div>
          </MotionDiv>

          {/* ✅ TEXTO */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex-1 text-center md:text-left"
          >
            <h2 className="text-3xl font-bold text-white mb-4">About Me</h2>

            <p className="text-white/80 leading-relaxed text-lg mb-4">
              I’m Alexis, a{" "}
              <span className="text-purple-400 font-medium">
                Full Stack Developer
              </span>{" "}
              focused on building modern web applications and backend systems.
            </p>

            <p className="text-white/70 leading-relaxed mb-8">
              I’m 20 years old with 3–4 years of experience developing applications in Java.
              I specialize in{" "}
              <strong>
                Java, Spring Boot, and scalable backend architectures
              </strong>
              , with strong experience in{" "}
              <strong>React, Next.js, Tailwind CSS, and modern frontend</strong>.
            </p>

            {/* ✅ SKILLS */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-10">
              {[
                "NextJS",
                "TypeScript",
                "Docker",
                "MongoDB",
                "MySQL",
                "REST APIs",
                "Java",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-sm rounded-full 
                  bg-purple-500/10 text-purple-300
                  border border-purple-500/20"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* ✅ BOTONES */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Link
                href="https://github.com/alexissdev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View github"
                className="px-6 py-3 rounded-xl bg-gradient-to-r 
                from-purple-600 to-fuchsia-600
                text-white font-medium hover:opacity-90 transition"
              >
                GitHub
              </Link>

              <Link
                href="mailto:alesideveloper@gmail.com"
                className="px-6 py-3 rounded-xl border 
                border-white/20 text-white/80 
                hover:bg-white/10 transition"
                rel="noopener noreferrer"
                aria-label="Send email"
              >
                Email
              </Link>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
