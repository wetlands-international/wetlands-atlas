import { NextConfig } from "next";

import { withPayload } from "@payloadcms/next/withPayload";

import createNextIntlPlugin from "next-intl/plugin";
// Import env here to validate during build.
import "./src/env";

const nextConfig = {
  output: "standalone",
  // Add the packages in transpilePackages
  transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core", "three"],
} satisfies NextConfig;

const withNextIntl = createNextIntlPlugin();

export default withPayload(withNextIntl(nextConfig), { devBundleServerPackages: false });
