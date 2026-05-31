/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — frontend only, no backend runtime required (yet).
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
};

export default nextConfig;
