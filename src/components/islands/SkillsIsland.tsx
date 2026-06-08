"use client";

import { motion } from "framer-motion";
import {
  SiSpring, SiDocker, SiMysql, SiMongodb,
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiGit, SiGithub, SiSwift, SiVite, SiKotlin,
  SiPostgresql, SiRedis, SiApachemaven, SiPostman, SiLinux, SiVercel, SiGradle,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbApi } from "react-icons/tb";

const groups = [
  {
    label: "Backend",
    skills: [
      { icon: FaJava,     name: "Java",       color: "#f89820" },
      { icon: SiSpring,   name: "Spring Boot", color: "#6db33f" },
      { icon: SiDocker,   name: "Docker",      color: "#2496ed" },
      { icon: SiMysql,    name: "MySQL",       color: "#4479a1" },
      { icon: SiMongodb,  name: "MongoDB",     color: "#47a248" },
      { icon: TbApi,      name: "REST APIs",   color: "#a78bfa" },
      { icon: SiPostgresql,   name: "PostgreSQL", color: "#4169e1" },
      { icon: SiRedis,        name: "Redis",      color: "#ff4438" },
      { icon: SiKotlin,       name: "Kotlin",     color: "#7f52ff" },
      { icon: SiSwift,        name: "Swift",      color: "#f05138" },
    ],
  },
  {
    label: "Frontend",
    skills: [
      { icon: SiReact,       name: "React",       color: "#61dafb" },
      { icon: SiNextdotjs,   name: "Next.js",     color: "#ffffff" },
      { icon: SiTypescript,  name: "TypeScript",  color: "#3178c6" },
      { icon: SiTailwindcss, name: "Tailwind CSS",color: "#38bdf8" },
      { icon: SiVite,        name: "Vite",        color: "#646cff" },
    ],
  },
  {
    label: "Tools",
    skills: [
      { icon: SiGit,         name: "Git",    color: "#f05032" },
      { icon: SiGithub,      name: "GitHub", color: "#ffffff" },
      { icon: SiApachemaven, name: "Maven",   color: "#c71a36" },
      { icon: SiPostman,     name: "Postman", color: "#ff6c37" },
      { icon: SiLinux,       name: "Linux",   color: "#fcc624" },
      { icon: SiVercel,      name: "Vercel",  color: "#ffffff" },
      { icon: SiGradle,      name: "Gradle",  color: "#02303a" },
    ],
  },
];

export default function SkillsIsland() {
  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs text-purple-400/70 uppercase tracking-widest mb-3">Stack</p>
        <h2 className="text-3xl font-bold text-white">Technologies</h2>
      </div>

      <div className="space-y-8">
        {groups.map((group, gi) => (
          <div key={group.label}>
            <p className="text-xs text-white/25 uppercase tracking-widest mb-4">{group.label}</p>
            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill, si) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: gi * 0.05 + si * 0.06 }}
                    whileHover={{ y: -3 }}
                    className="flex items-center gap-2.5 px-4 py-2.5 bg-white/[0.04] hover:bg-white/[0.07] border border-white/8 hover:border-white/15 rounded-xl transition-all duration-200 cursor-default"
                  >
                    <Icon size={16} style={{ color: skill.color, opacity: 0.85 }} />
                    <span className="text-sm text-white/60">{skill.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
