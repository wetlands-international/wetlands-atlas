import { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

// Import env here to validate during build.
import "./src/env";

const nextConfig = {
  output: "standalone",
  // Add the packages in transpilePackages
  transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
} satisfies NextConfig;

export default withPayload(nextConfig, { devBundleServerPackages: false });
