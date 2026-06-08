"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function ScrollProgressIsland() {
  const [progress, setProgress] = useState(0);
  const spring = useSpring(0, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const handler = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const current = total > 0 ? window.scrollY / total : 0;
      setProgress(current);
      spring.set(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [spring]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-white/5">
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX: spring,
          background: "linear-gradient(90deg, #7c3aed, #a855f7, #c084fc)",
        }}
      />
    </div>
  );
}
