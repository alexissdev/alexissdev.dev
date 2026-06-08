"use client";

import { useState, useEffect } from "react";

const WORDS = [
  "Full Stack Developer",
  "Backend Engineer",
  "Java Developer",
  "Open Source Builder",
  "API Architect",
];

const TYPING_SPEED   = 65;
const DELETING_SPEED = 35;
const PAUSE_AFTER    = 1800;
const PAUSE_BEFORE   = 400;

export default function TypewriterIsland() {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "waiting">("typing");

  useEffect(() => {
    const current = WORDS[wordIndex];

    if (phase === "typing") {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), TYPING_SPEED);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("deleting"), PAUSE_AFTER);
        return () => clearTimeout(t);
      }
    }

    if (phase === "deleting") {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed((d) => d.slice(0, -1)), DELETING_SPEED);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setWordIndex((i) => (i + 1) % WORDS.length);
          setPhase("typing");
        }, PAUSE_BEFORE);
        return () => clearTimeout(t);
      }
    }
  }, [displayed, phase, wordIndex]);

  return (
    <h2 className="text-2xl sm:text-3xl font-semibold text-purple-400/80 h-9 flex items-center justify-center">
      {displayed}
      <span className="ml-0.5 inline-block w-[2px] h-7 bg-purple-400/70 animate-pulse" />
    </h2>
  );
}
