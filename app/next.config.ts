import path from "path";

import { NextConfig } from "next";

import { withPayload } from "@payloadcms/next/withPayload";

import createNextIntlPlugin from "next-intl/plugin";

// Import env here to validate during build.
import "./src/env";

const nextConfig = {
  output: "standalone",
  // Add the packages in transpilePackages
  transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core", "three"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.mapbox.com",
      },
    ],
  },

  turbopack: {
    rules: {
      "*.glsl": {
        loaders: [path.resolve(__dirname, "src/lib/glsl-loader.js")],
        as: "*.js",
      },
    },
  },
  webpack: (config) => {
    config.module.rules?.push({
      test: /\.(glsl|vs|fs)$/,
      loader: path.resolve(__dirname, "src/lib/glsl-loader.js"),
    });

    return config;
  },
} satisfies NextConfig;

const withNextIntl = createNextIntlPlugin();

export default withPayload(withNextIntl(nextConfig), { devBundleServerPackages: false });
