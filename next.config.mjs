// Static export so the site can be hosted on GitHub Pages.
// For a project page (user.github.io/repo) build with NEXT_PUBLIC_BASE_PATH=/repo.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
