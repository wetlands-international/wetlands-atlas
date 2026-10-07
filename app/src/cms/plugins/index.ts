import { Plugin } from "payload";

import { gcsPrefixPlugin, storageFieldsPlugin } from "@/cms/plugins/GCS";
import { env } from "@/env";

export const plugins: Plugin[] = [];

if (env.NODE_ENV === "production") {
  plugins.push(
    gcsPrefixPlugin({
      projectId: env.GCS_PROJECT_ID,
      bucketName: env.GCS_BUCKET_NAME,
      serviceAccountKey: env.GCS_SERVICE_ACCOUNT_KEY,
    }),
  );
} else {
  plugins.push(storageFieldsPlugin());
}
