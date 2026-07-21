"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

const skills = [
  { label: "Java", group: "backend" },
  { label: "Spring Boot", group: "backend" },
  { label: "Docker", group: "backend" },
  { label: "MySQL", group: "backend" },
  { label: "MongoDB", group: "backend" },
  { label: "REST APIs", group: "backend" },
  { label: "React", group: "frontend" },
  { label: "Next.js", group: "frontend" },
  { label: "TypeScript", group: "frontend" },
  { label: "Tailwind CSS", group: "frontend" },
  { label: "Git", group: "tools" },
];

export default function AboutMeIsland() {
  return (
    <div className="grid md:grid-cols-[1fr_1.6fr] gap-16 items-start">
      {/* Photo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center md:items-start gap-6"
      >
        <div className="relative w-44 h-44 md:w-52 md:h-52">
          <Image
            src="/me.jpg"
            alt="Alexis Costa"
            fill
            sizes="(min-width: 768px) 208px, 176px"
            loading="lazy"
            quality={80}
            className="rounded-2xl object-cover"
            style={{ boxShadow: "0 0 60px rgba(109,40,217,0.25)" }}
          />
        </div>

        <div className="text-center md:text-left space-y-1">
          <p className="text-white font-semibold">Alexis Costa</p>
          <p className="text-white/40 text-sm">@alexissdev</p>
          <p className="text-white/30 text-xs mt-2">Pilar, Buenos Aires 🇦🇷</p>
        </div>

        <div className="flex gap-3">
          <a
            href="https://github.com/alexissdev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            <FaGithub size={16} />
            GitHub
          </a>
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="space-y-8"
      >
        <div>
          <p className="text-xs text-purple-400/70 uppercase tracking-widest mb-3">About</p>
          <h2 className="text-3xl font-bold text-white mb-5">
            Building things that matter
          </h2>
          <div className="space-y-4 text-white/55 text-sm leading-relaxed">
            <p>
              I&apos;m a 20-year-old Full Stack Developer from Buenos Aires with 3–4
              years of experience. I specialize in Java and Spring Boot for backend
              systems, and React, Next.js, and TypeScript for modern frontends.
            </p>
            <p>
              I care about clean architecture, performance, and interfaces that
              feel natural to use. Whether it&apos;s a REST API, a full stack app, or
              a scalable microservice — I enjoy building it right.
            </p>
          </div>
        </div>

        {/* Skills */}
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-3">Stack</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s.label}
                className="px-3 py-1 rounded-full text-xs text-white/60 border border-white/8 bg-white/3 hover:border-purple-500/30 hover:text-white/80 transition-all"
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-3 flex-wrap pt-1">
          <Link
            href="/contact"
            aria-label="Contact page"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
          >
            Get in touch
            <HiArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
