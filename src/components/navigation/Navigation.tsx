"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import imageStyle from "@/styles/image.module.css";

const MotionHeader = dynamic(
  () => import("framer-motion").then((m) => m.motion.header),
  { ssr: false }
);

const MotionDiv = dynamic(
  () => import("framer-motion").then((m) => m.motion.div),
  { ssr: false }
);

const MotionA = dynamic(
  () => import("framer-motion").then((m) => m.motion.a),
  { ssr: false }
);

export default function Navigation() {
  const [isOpen, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) => router.pathname === path;

  return (
    <MotionHeader
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
        ${scrolled
          ? "bg-primary/90 backdrop-blur-md shadow-lg"
          : "bg-transparent"
        }`}
    >
      <nav className="flex items-center justify-between max-w-6xl mx-auto px-6 h-16">

        <Link href="/" aria-label="Home" className="group">
          <Image
            src="/logo.png"
            alt="Alexis Logo"
            width={83}
            height={60}
            priority
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <button
          className="lg:hidden text-white/80 hover:text-purple-400 transition-colors"
          onClick={() => setOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg className="fill-current h-6 w-6" viewBox="0 0 20 20">
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>

        <div
          className={`${isOpen ? "flex" : "hidden"} 
          lg:flex flex-col lg:flex-row items-center gap-8 
          absolute lg:static top-16 left-0 w-full lg:w-auto 
          bg-primary/95 lg:bg-transparent py-6 lg:py-0 
          border-t lg:border-0 border-purple-500/20`}
        >

          <div className="flex flex-col lg:flex-row items-center gap-6">
            {[
              ["/", "Home"],
              ["/projects", "Projects"],
            ].map(([path, label]) => (
              <MotionDiv
                key={label}
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 260 }}
              >
                <Link
                  href={path}
                  onClick={() => setOpen(false)}
                  className={`relative px-1 transition-all duration-300
                    ${isActive(path)
                      ? "text-purple-400 after:w-full after:opacity-100"
                      : "text-white/80 hover:text-purple-400"
                    }
                    after:absolute after:-bottom-1 after:left-0 
                    after:h-[2px] after:bg-purple-400 
                    after:transition-all`}
                >
                  {label}
                </Link>
              </MotionDiv>
            ))}
          </div>

          <div className="flex items-center gap-5 mt-4 lg:mt-0">
            {[
              ["https://github.com/alexissdev", "/github.svg"],
              ["https://discord.com/invite/BWqqbXbUep", "/discord.svg"],
            ].map(([url, icon]) => (
              <MotionA
                key={icon}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 350 }}
                className="hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]"
              >
                <Image
                  src={icon}
                  alt="social"
                  width={28}
                  height={28}
                  loading="lazy"
                  className={`${imageStyle.img} brightness-90 hover:brightness-110 transition`}
                />
              </MotionA>
            ))}
          </div>
        </div>
      </nav>
    </MotionHeader>
  );
}
