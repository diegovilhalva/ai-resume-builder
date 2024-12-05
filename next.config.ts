import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental:{
    serverActions:{
      bodySizeLimit:"4MB"
    }
  }, 
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'vhr8h4bbqhfcgan5.public.blob.vercel-storage.com'
      }
    ]
  }
};

export default nextConfig;
