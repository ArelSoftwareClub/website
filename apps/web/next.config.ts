import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production' || !!process.env.GITHUB_ACTIONS;

const nextConfig: NextConfig = {
  
  // Strict React mode
  reactStrictMode: true,

  // GitHub Pages hosting paths (always /website for this repo)
  basePath: '/website',
  assetPrefix: '/website/',
  trailingSlash: true,

  // Static export for GitHub Pages
  output: 'export',
  // Disable App Router lint errors for static export if any
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // Image optimization
  images: {
    unoptimized: true, // Required for Next.js static export
  },

  // Note: headers() and redirects() have been removed because they are not supported
  // with 'output: export' (they require a Node.js server to run).
  // GitHub Pages is a static host.
};

export default nextConfig;
