// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]),
    DATABASE_URI: z.string().url(),
    PAYLOAD_SECRET: z.string().min(1),
    // Google Cloud Storage configuration
    GCS_PROJECT_ID: z.string().min(1, "GCS Project ID is required"),
    GCS_BUCKET_NAME: z.string().min(1, "GCS Bucket name is required"),
    GCS_SERVICE_ACCOUNT_KEY: z
      .string()
      .min(1, "GCS service account key (base64 encoded JSON) is required"),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_MAPBOX_TOKEN: z.string().min(1),
    NEXT_PUBLIC_TILER_URL: z.string().min(1),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URI: process.env.DATABASE_URI,
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
    NEXT_PUBLIC_TILER_URL: process.env.NEXT_PUBLIC_TILER_URL,
    // Google Cloud Storage configuration
    GCS_PROJECT_ID: process.env.GCS_PROJECT_ID,
    GCS_BUCKET_NAME: process.env.GCS_BUCKET_NAME,
    GCS_SERVICE_ACCOUNT_KEY: process.env.GCS_SERVICE_ACCOUNT_KEY,
  },
});
