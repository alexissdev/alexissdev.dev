import type { Metadata } from "next";
import { FiMail, FiMapPin } from "react-icons/fi";
import { FaGithub, FaDiscord } from "react-icons/fa";
import ContactFormIsland from "@/components/islands/ContactFormIsland";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Alexis Costa — Full Stack Developer.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs text-purple-400/70 uppercase tracking-widest mb-3">Contact</p>
        <h1 className="text-4xl font-bold text-white mb-2">Let&apos;s talk</h1>
        <p className="text-white/35 text-sm mb-16">
          Have a project in mind or just want to say hi?
        </p>

        <div className="grid md:grid-cols-[1fr_1.6fr] gap-12 items-start">
          {/* Info */}
          <div className="space-y-8">
            <div className="space-y-5">
              {[
                { icon: FiMail, label: "Email", value: "alesideveloper@gmail.com", href: "mailto:alesideveloper@gmail.com" },
                { icon: FiMapPin, label: "Location", value: "Buenos Aires, Argentina" },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/4 border border-white/8 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={14} className="text-white/40" />
                  </div>
                  <div>
                    <p className="text-white/25 text-xs uppercase tracking-wider mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-white/60 hover:text-white text-sm transition-colors">{value}</a>
                    ) : (
                      <p className="text-white/60 text-sm">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/5 space-y-3">
              <p className="text-white/25 text-xs uppercase tracking-wider mb-4">Socials</p>
              <div className="flex flex-col gap-3">
                <a href="https://github.com/alexissdev" target="_blank" rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex items-center gap-2.5 text-sm text-white/40 hover:text-white/70 transition-colors">
                  <FaGithub size={15} /> github.com/alexissdev
                </a>
                <a href="https://discord.com/invite/BWqqbXbUep" target="_blank" rel="noopener noreferrer"
                  aria-label="Discord"
                  className="flex items-center gap-2.5 text-sm text-white/40 hover:text-white/70 transition-colors">
                  <FaDiscord size={15} /> Join Discord
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-8">
            <ContactFormIsland />
          </div>
        </div>
      </div>
    </div>
  );
}
