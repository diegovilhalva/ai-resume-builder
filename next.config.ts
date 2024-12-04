import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental:{
    serverActions:{
      bodySizeLimit:"4MB"
    }
  }
};

export default nextConfig;
