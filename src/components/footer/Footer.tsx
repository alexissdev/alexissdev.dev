"use client";

import dynamic from "next/dynamic";
const MotionDiv = dynamic(
  () => import("framer-motion").then((m) => m.motion.div),
  { ssr: false }
);
const MotionA = dynamic(
  () => import("framer-motion").then((m) => m.motion.a),
  { ssr: false }
);

const FaInstagram = dynamic(() => import("react-icons/fa").then(m => m.FaInstagram), { ssr: false });
const FaLinkedin = dynamic(() => import("react-icons/fa").then(m => m.FaLinkedin), { ssr: false });
const FaYoutube = dynamic(() => import("react-icons/fa").then(m => m.FaYoutube), { ssr: false });
const FaGithub = dynamic(() => import("react-icons/fa").then(m => m.FaGithub), { ssr: false });

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15 },
  }),
};

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-purple-500/20 overflow-hidden">
      <MotionDiv
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-12 text-white"
      >
        {/* ✅ BRAND */}
        <MotionDiv variants={item} custom={1}>
          <h2 className="font-bold text-3xl mb-3">Alexis Costa</h2>

          <p className="text-white/60 mb-4">
            Full Stack Developer creating modern, efficient and scalable web applications.
          </p>

          <p className="text-white/50 text-sm">
            Pilar, Buenos Aires, Argentina 🇦🇷
          </p>

          <div className="flex gap-5 mt-5 text-white/70">
            {[FaInstagram, FaLinkedin, FaYoutube, FaGithub].map((Icon, i) => (
              <MotionA
                key={i}
                href="#"
                whileHover={{ scale: 1.15 }}
                className="hover:text-purple-400 transition"
              >
                <Icon size={22} />
              </MotionA>
            ))}
          </div>
        </MotionDiv>

        {/* ✅ REPOS */}
        <MotionDiv variants={item} custom={2}>
          <h3 className="text-xl font-semibold mb-4">Popular Repositories</h3>
          <ul className="space-y-3">
            {[
              ["crud-app", "https://github.com/alexissdev/crud-app"],
              ["alexissdev.me", "https://github.com/alexissdev/alexissdev.me"],
              ["Balder", "https://github.com/alexissdev/balder"],
              ["Isis", "https://github.com/alexissdev/Isis"],
            ].map(([name, link]) => (
              <li key={name}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-purple-400 transition"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </MotionDiv>

        {/* ✅ CONTACT */}
        <MotionDiv variants={item} custom={3}>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>

          <p className="text-white/60 mb-4">
            Want to work with me or have an idea in mind?
          </p>

          <div className="flex flex-col gap-3">
            <MotionA
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              href="/contact"
              className="bg-purple-600 hover:bg-purple-700 transition text-white px-5 py-2 rounded-lg text-center"
            >
              Contact Me
            </MotionA>

            <MotionA
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              href="https://discord.com/invite/BWqqbXbUep"
              target="_blank"
              className="border border-purple-500/40 hover:bg-purple-500/10 transition px-5 py-2 rounded-lg text-center"
            >
              Join Discord
            </MotionA>
          </div>
        </MotionDiv>
      </MotionDiv>

      {/* ✅ BOTTOM BAR */}
      <MotionDiv
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
        className="border-t border-purple-500/20 text-center py-5 text-white/50 text-sm"
      >
        © {new Date().getFullYear()} AlexisDev — All rights reserved.
      </MotionDiv>
    </footer>
  );
}
