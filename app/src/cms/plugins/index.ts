import { Plugin } from "payload";

import { payloadCloudPlugin } from "@payloadcms/payload-cloud";

import { gcsPrefixPlugin } from "@/cms/plugins/GCS";
import { env } from "@/env";

export const plugins: Plugin[] = [payloadCloudPlugin()];

if (env.NODE_ENV === "production") {
  plugins.push(
    gcsPrefixPlugin({
      projectId: env.GCS_PROJECT_ID,
      bucketName: env.GCS_BUCKET_NAME,
      serviceAccountKey: env.GCS_SERVICE_ACCOUNT_KEY,
    }),
  );
}
