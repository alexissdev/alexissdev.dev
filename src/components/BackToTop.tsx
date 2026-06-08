"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.button
      animate={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
      transition={{ duration: 0.2 }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 w-9 h-9 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 text-white/40 hover:text-white/70 rounded-full transition-colors"
    >
      <FiArrowUp size={15} />
    </motion.button>
  );
}
