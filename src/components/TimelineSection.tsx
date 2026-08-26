"use client";

import { motion } from "framer-motion";

const events = [
  {
    year: "2021",
    title: "Started the journey",
    desc: "Dove into programming with Java. Built my first CLI apps and learned OOP fundamentals.",
    tags: ["Java", "OOP"],
  },
  {
    year: "2022",
    title: "Backend development",
    desc: "Built REST APIs with Spring Boot, worked with MySQL and MongoDB, started containerizing with Docker.",
    tags: ["Spring Boot", "REST APIs", "Docker"],
  },
  {
    year: "2023",
    title: "Full Stack transition",
    desc: "Picked up React and Next.js. Combined frontend skills with my backend foundation to ship complete products.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    year: "2024/2025",
    title: "Distributed systems & production tools",
    desc: "Shipped a microservices chat platform (Relay), a live production quoting tool for a construction company, a multi-server Minecraft PvP network (Annihilation), and a DDD-based Factions game core (Kronos).",
    tags: ["Relay", "Quote Generator", "Annihilation", "Kronos"],
  },
];

export default function TimelineSection() {
  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs text-purple-400/70 uppercase tracking-widest mb-3">Journey</p>
        <h2 className="text-3xl font-bold text-white">Experience</h2>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/8" />

        <div className="space-y-8">
          {events.map((event, i) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.09 }}
              className="relative pl-8"
            >
              {/* Dot */}
              <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border border-purple-500/40 bg-primary flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500/70" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-purple-400/60">{event.year}</span>
                  <h3 className="text-sm font-semibold text-white/80">{event.title}</h3>
                </div>
                <p className="text-sm text-white/40 leading-relaxed">{event.desc}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {event.tags.map((tag) => (
                    <span key={tag} className="text-[10px] text-white/25 border border-white/8 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
