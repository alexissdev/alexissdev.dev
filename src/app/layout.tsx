import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavigationIsland from "@/components/islands/NavigationIsland";
import FooterIsland from "@/components/islands/FooterIsland";
import BackToTop from "@/components/BackToTop";
import CursorIsland from "@/components/islands/CursorIsland";
import ScrollProgressIsland from "@/components/islands/ScrollProgressIsland";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    template: "Alexis | %s",
    default: "Alexis | Full Stack Developer",
  },
  description: "Alexis is a software engineer and a web developer.",
  openGraph: {
    title: "Alexis | Full Stack Developer",
    description: "Alexis is a software engineer and a web developer.",
    url: "https://alexissdev.dev",
    siteName: "alexissdev.dev",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon/favicon.ico" },
      { url: "/icon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/icon/apple-touch-icon.png",
    other: [{ rel: "manifest", url: "/icon/site.webmanifest" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen flex flex-col cursor-none">
        <CursorIsland />
        <ScrollProgressIsland />
        <NavigationIsland />
        <main className="flex-1">{children}</main>
        <FooterIsland />
        <BackToTop />
      </body>
    </html>
  );
}
