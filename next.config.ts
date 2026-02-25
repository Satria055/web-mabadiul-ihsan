import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TAMBAHAN PENTING UNTUK CPANEL
  output: "standalone",

  // 1. limit upload Server Action (misal 10MB atau 20mb)
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', 
    },
  },

  // 2. Konfigurasi Gambar
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;