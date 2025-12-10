"use client";
import dynamic from "next/dynamic";
import useContact from "@/lib/hooks/useContact";

const MotionDiv = dynamic(
  () => import("framer-motion").then(m => m.motion.div),
  { ssr: false }
);
const MotionButton = dynamic(
  () => import("framer-motion").then(m => m.motion.button),
  { ssr: false }
);

const FaUser = dynamic(() => import("react-icons/fa").then(m => m.FaUser), { ssr: false });
const FaEnvelope = dynamic(() => import("react-icons/fa").then(m => m.FaEnvelope), { ssr: false });
const FaMapMarkerAlt = dynamic(() => import("react-icons/fa").then(m => m.FaMapMarkerAlt), { ssr: false });

export default function Contact() {
  const { contact, handleChange, handleSubmit } = useContact();

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-6 text-white">
      <MotionDiv
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 
                   bg-secondary/80 backdrop-blur-xl 
                   rounded-2xl shadow-2xl overflow-hidden 
                   border border-purple-500/20"
      >

        <div className="p-10 flex flex-col justify-between bg-gradient-to-br 
                        from-purple-600/10 to-transparent">
          <div>
            <h2 className="text-3xl font-bold mb-4">Contact Info</h2>
            <p className="text-white/60 mb-10 text-sm leading-relaxed">
              Feel free to contact me for projects, collaborations or ideas.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <FaUser className="text-purple-400" />
                <div>
                  <p className="text-sm text-white/60">Name</p>
                  <p className="font-medium">Alexis Costa</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaEnvelope className="text-purple-400" />
                <div>
                  <p className="text-sm text-white/60">Email</p>
                  <p className="font-medium">alesideveloper@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-purple-400" />
                <div>
                  <p className="text-sm text-white/60">Location</p>
                  <p className="font-medium">Buenos Aires, Argentina</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-white/40 mt-12">
            I usually reply within 24 hours.
          </p>
        </div>

        <div className="p-10 bg-secondary">
          <h2 className="text-3xl font-bold mb-8">Send a message</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              value={contact.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full bg-primary/60 border border-purple-500/20 
                         px-4 py-3 rounded-lg text-sm text-white
                         outline-none focus:border-purple-400 transition"
            />

            <input
              type="email"
              placeholder="Your email"
              value={contact.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full bg-primary/60 border border-purple-500/20 
                         px-4 py-3 rounded-lg text-sm text-white
                         outline-none focus:border-purple-400 transition"
            />

            <input
              type="text"
              placeholder="Subject"
              value={contact.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              className="w-full bg-primary/60 border border-purple-500/20 
                         px-4 py-3 rounded-lg text-sm text-white
                         outline-none focus:border-purple-400 transition"
            />

            <textarea
              placeholder="Your message"
              value={contact.message}
              onChange={(e) => handleChange("message", e.target.value)}
              rows={5}
              className="w-full bg-primary/60 border border-purple-500/20 
                         px-4 py-3 rounded-lg text-sm text-white resize-none
                         outline-none focus:border-purple-400 transition"
            />

            <MotionButton
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}
              className="w-full bg-purple-600 hover:bg-purple-700 
                         transition rounded-xl py-3 mt-2
                         font-semibold text-white shadow-lg"
            >
              Send Message 🚀
            </MotionButton>
          </div>
        </div>
      </MotionDiv>
    </div>
  );
}
