import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        nodeMiddleware: true, // Enable Node.js runtime in Middleware
},
  eslint : {
    ignoreDuringBuilds : true
  }
};

export default nextConfig;
