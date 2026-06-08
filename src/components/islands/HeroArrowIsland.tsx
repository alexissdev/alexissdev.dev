"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

export default function HeroArrowIsland() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY < 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToAbout}
      aria-label="Scroll to about section"
      animate={{
        y: [0, 12, 0],
        scale: [1, 1.1, 1],
        opacity: visible ? 1 : 0,
      }}
      transition={{
        y: { repeat: Infinity, duration: 1.6, ease: "easeInOut" },
        scale: { repeat: Infinity, duration: 1.6, ease: "easeInOut" },
        opacity: { duration: 0.3 },
      }}
      className="text-purple-400 cursor-pointer hover:text-purple-300 transition-colors"
      style={{ willChange: "transform" }}
    >
      <FiChevronDown size={36} />
    </motion.button>
  );
}
