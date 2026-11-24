import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  outputFileTracingIncludes: {
    "/*": ["./prisma/**/*"],
    "/api/**/*": ["./prisma/**/*"],
  },
};

export default nextConfig;
