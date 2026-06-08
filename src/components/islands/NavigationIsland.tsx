"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaDiscord } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function NavigationIsland() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-16">
        {/* Logo */}
        <Link href="/" aria-label="Home" className="z-10">
          <Image
            src="/logo.png"
            alt="Alexis Dev"
            width={83}
            height={60}
            className="h-9 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
            priority
          />
        </Link>

        {/* Center pill — desktop */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full border transition-all duration-300 ${
            scrolled
              ? "bg-white/5 border-white/10 backdrop-blur-xl shadow-lg"
              : "bg-transparent border-transparent"
          }`}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-label={link.label}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </motion.div>

        {/* Social icons — desktop */}
        <div className="hidden md:flex items-center gap-3 z-10">
          <motion.a
            href="https://github.com/alexissdev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            whileHover={{ scale: 1.15 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="text-white/40 hover:text-white/80 transition-colors"
          >
            <FaGithub size={20} />
          </motion.a>
          <motion.a
            href="https://discord.com/invite/BWqqbXbUep"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
            whileHover={{ scale: 1.15 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="text-white/40 hover:text-white/80 transition-colors"
          >
            <FaDiscord size={20} />
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/50 hover:text-white transition-colors z-10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-4 right-4 z-40 bg-secondary/95 backdrop-blur-xl border border-white/8 rounded-2xl px-6 py-5 flex flex-col gap-4 shadow-2xl"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-label={link.label}
                  className={`text-sm font-medium transition-colors ${
                    isActive ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="flex items-center gap-4 pt-3 border-t border-white/8">
              <a href="https://github.com/alexissdev" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-white/40 hover:text-white transition-colors">
                <FaGithub size={18} />
              </a>
              <a href="https://discord.com/invite/BWqqbXbUep" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="text-white/40 hover:text-white transition-colors">
                <FaDiscord size={18} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
