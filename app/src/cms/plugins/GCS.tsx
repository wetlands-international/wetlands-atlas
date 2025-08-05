import type { Plugin } from "payload";

import { gcsStorage } from "@payloadcms/storage-gcs";

export type GcsPluginOptions = {
  projectId: string;
  bucketName: string;
  serviceAccountKey: string;
};

export const gcsPrefixPlugin = (options: GcsPluginOptions): Plugin => {
  // Parse credentials once at startup
  let credentials;
  try {
    credentials = JSON.parse(Buffer.from(options.serviceAccountKey, "base64").toString());
  } catch (error) {
    console.error("❌ Failed to parse GCS credentials:", error);
    throw error;
  }

  return gcsStorage({
    collections: {
      media: {
        prefix: "media/", // All media files go to media/ folder
      },
    },
    bucket: options.bucketName,
    options: {
      projectId: options.projectId,
      credentials,
    },
  });
};
