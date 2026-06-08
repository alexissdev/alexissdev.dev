"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl backdrop-blur-sm bg-black/40"
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 6 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="flex flex-col items-center gap-5 bg-secondary border border-white/10 rounded-2xl px-10 py-10 shadow-2xl shadow-black/40 text-center max-w-xs mx-4"
      >
        {/* Animated checkmark */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          {/* Pulsing ring */}
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-emerald-500/20"
          />
          {/* Circle bg */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.05 }}
            className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center"
          >
            {/* SVG checkmark path animation */}
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <motion.path
                d="M6 14.5L11.5 20L22 9"
                stroke="#34d399"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
              />
            </svg>
          </motion.div>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-white font-semibold text-lg">Message sent!</h3>
          <p className="text-white/45 text-sm leading-relaxed">
            Thanks for reaching out. I&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Close"
          className="w-full bg-white/6 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
        >
          Close
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default function ContactFormIsland() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-white/4 border border-white/8 focus:border-white/20 rounded-xl px-4 py-3 text-white/80 placeholder-white/20 outline-none transition-all text-sm";

  return (
    <div className="relative">
      <AnimatePresence>
        {status === "sent" && (
          <SuccessModal onClose={() => setStatus("idle")} />
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <input id="name" name="name" type="text" required placeholder="Name"
            value={form.name} onChange={handleChange} className={inputClass} aria-label="Name" />
          <input id="email" name="email" type="email" required placeholder="Email"
            value={form.email} onChange={handleChange} className={inputClass} aria-label="Email" />
        </div>
        <input id="subject" name="subject" type="text" required placeholder="Subject"
          value={form.subject} onChange={handleChange} className={inputClass} aria-label="Subject" />
        <textarea id="message" name="message" required rows={5} placeholder="Your message..."
          value={form.message} onChange={handleChange}
          className={`${inputClass} resize-none`} aria-label="Message" />

        <motion.button
          type="submit"
          disabled={status === "sending"}
          whileTap={{ scale: 0.98 }}
          aria-label="Send message"
          className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
        >
          {status === "sending" ? (
            <span className="flex items-center justify-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
              Sending...
            </span>
          ) : (
            "Send message"
          )}
        </motion.button>

        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400/70 text-xs text-center"
          >
            Something went wrong. Please try again.
          </motion.p>
        )}
        <p className="text-white/20 text-xs text-center">I usually reply within 24 hours.</p>
      </form>
    </div>
  );
}
