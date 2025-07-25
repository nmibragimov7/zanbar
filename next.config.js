const {i18n} = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/:path*",
      },
    ];
  },
  i18n: {
    ...i18n,
  },
}

module.exports = nextConfig
