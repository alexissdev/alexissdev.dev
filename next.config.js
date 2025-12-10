/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // ✅ Recomendado en producción

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "http.cat",
      },
    ],
  },

  async redirects() {
    return require("./redirects.json");
  },
};

module.exports = nextConfig;
