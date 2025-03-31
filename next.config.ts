import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  // experimental: {
  //   esmExternals: "loose", // Allows ESM packages to work with CommonJS
  // },
  // transpilePackages: [
  //   "shiki",
  //   "@blocknote/core",
  //   "@blocknote/mantine",
  //   "@blocknote/react",
  // ], // Transpile problematic ESM packages
};

export default nextConfig;
