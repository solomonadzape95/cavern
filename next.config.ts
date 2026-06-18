import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image uploads POST through a Server Action as FormData; the default body
  // cap is 1MB, so raise it to allow larger cover art / photos.
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  // Pin the workspace root — a stray lockfile in the home dir otherwise
  // makes Next infer the wrong root.
  images: {
    qualities: [25, 75, 100],
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
