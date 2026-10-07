import type { Plugin } from "payload";

import { cloudStoragePlugin } from "@payloadcms/plugin-cloud-storage";
import { gcsStorage } from "@payloadcms/storage-gcs";

// All media files go to media/ folder
const MEDIA_PREFIX = "media/";

/**
 * Adds the fields of the storage plugin (prefix, _objectKey, …) without enabling it, so that the
 * schema, and the migrations generated locally, are the same as in production.
 * gcsStorage() can't be used for that: when disabled, it ignores `alwaysInsertFields`.
 */
export const storageFieldsPlugin = (): Plugin =>
  cloudStoragePlugin({
    enabled: false,
    alwaysInsertFields: true,
    collections: {
      media: {
        adapter: null,
        prefix: MEDIA_PREFIX,
      },
    },
  });

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
        prefix: MEDIA_PREFIX,
      },
    },
    bucket: options.bucketName,
    options: {
      projectId: options.projectId,
      credentials,
    },
  });
};
