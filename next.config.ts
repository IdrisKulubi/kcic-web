import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Avoid Turbopack bundling Drizzle/Neon (Windows pnpm store package.json access issues).
  serverExternalPackages: ["drizzle-orm", "@neondatabase/serverless", "bcryptjs"],
  async redirects() {
    return [
      {
        source: "/newsroom/news/:slug",
        destination: "/news/:slug",
        permanent: true,
      },
      {
        source: "/our-work/partners",
        destination: "/our-work#partners",
        permanent: true,
      },
      {
        source: "/our-work/sectors",
        destination: "/our-work#sectors",
        permanent: true,
      },
      {
        source: "/our-work/cross-cutting-issues",
        destination: "/our-work#cross-cutting",
        permanent: true,
      },
      {
        source: "/impact/reports",
        destination: "/impact#reports",
        permanent: true,
      },
      {
        source: "/impact/targets",
        destination: "/impact#targets",
        permanent: true,
      },
      {
        source: "/impact/theory-of-change",
        destination: "/impact#theory-of-change",
        permanent: true,
      },
      {
        source: "/programmes/special-projects",
        destination: "/programmes#special",
        permanent: true,
      },
      {
        source: "/programmes/past-projects",
        destination: "/programmes#past",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
