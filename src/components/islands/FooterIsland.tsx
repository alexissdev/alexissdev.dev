"use client";

import Link from "next/link";
import { FaGithub, FaDiscord, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function FooterIsland() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 mt-8">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <p className="text-white font-semibold">Alexis Costa</p>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs">
              Full Stack Developer building modern, efficient and scalable web applications.
            </p>
            <p className="text-white/25 text-xs">Pilar, Buenos Aires, Argentina 🇦🇷</p>
            <div className="flex items-center gap-3 pt-1">
              {[
                { href: "https://www.instagram.com/alexissdev", icon: FaInstagram, label: "Instagram" },
                { href: "https://www.linkedin.com/in/alexissdev", icon: FaLinkedin, label: "LinkedIn" },
                { href: "https://github.com/alexissdev", icon: FaGithub, label: "GitHub" },
                { href: "https://discord.com/invite/BWqqbXbUep", icon: FaDiscord, label: "Discord" },
              ].map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="text-white/25 hover:text-white/60 transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Repos */}
          <div className="space-y-4">
            <p className="text-white/40 text-xs uppercase tracking-widest">Repositories</p>
            <ul className="space-y-2.5">
              {["crud-app", "alexissdev.me", "Balder", "Isis"].map((repo) => (
                <li key={repo}>
                  <a href={`https://github.com/alexissdev/${repo}`} target="_blank"
                    rel="noopener noreferrer" aria-label={repo}
                    className="text-white/35 hover:text-white/70 text-sm transition-colors">
                    {repo}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <p className="text-white/40 text-xs uppercase tracking-widest">Connect</p>
            <div className="flex flex-col gap-3">
              <Link href="/contact" aria-label="Contact"
                className="text-sm text-white/35 hover:text-white/70 transition-colors">
                Send a message
              </Link>
              <a href="https://discord.com/invite/BWqqbXbUep" target="_blank"
                rel="noopener noreferrer" aria-label="Discord"
                className="text-sm text-white/35 hover:text-white/70 transition-colors">
                Join Discord
              </a>
              <a href="mailto:alesideveloper@gmail.com"
                className="text-sm text-white/35 hover:text-white/70 transition-colors">
                alesideveloper@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6">
          <p className="text-white/20 text-xs text-center">
            © {year} Alexis Costa — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
