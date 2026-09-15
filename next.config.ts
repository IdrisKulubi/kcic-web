import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Avoid Turbopack bundling Drizzle/Neon (Windows pnpm store package.json access issues).
  serverExternalPackages: ["drizzle-orm", "@neondatabase/serverless", "bcryptjs"],
}

export default nextConfig
