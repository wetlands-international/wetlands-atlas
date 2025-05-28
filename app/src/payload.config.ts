// storage-adapter-import-placeholder

import path from "path";
import { fileURLToPath } from "url";

import { buildConfig } from "payload";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import {
  lexicalEditor,
  BlocksFeature,
  BoldFeature,
  LinkFeature,
  UnorderedListFeature,
  OrderedListFeature,
  FixedToolbarFeature,
} from "@payloadcms/richtext-lexical";

import { openapi } from "payload-oapi";
import sharp from "sharp";

import { BLOCK_LOCATION_COORDINATES } from "@/cms/blocks/location";
import { NumberBlock } from "@/cms/blocks/number";
import { BLOCK_PERCENTAGE } from "@/cms/blocks/percentage";
import { BLOCK_VALUE } from "@/cms/blocks/value";
import { Indicators } from "@/cms/collections/Indicators";
import { Layers } from "@/cms/collections/Layers";
import { Stories } from "@/cms/collections/Stories";

import { Categories } from "./cms/collections/Categories";
import { Media } from "./cms/collections/Media";
import { Users } from "./cms/collections/Users";
import { IndicatorWidgets } from "@/cms/collections/IndicatorWidgets";
import { Locations } from "@/cms/collections/Location";
import { Stories } from "@/cms/collections/Stories";
import { StorySteps } from "@/cms/collections/StorySteps";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Categories,
    Indicators,
    Layers,
    IndicatorWidgets,
    Locations,
    Stories,
  ],
  editor: lexicalEditor({
    features: () => [
      FixedToolbarFeature(),
      BoldFeature(),
      LinkFeature(),
      UnorderedListFeature(),
      OrderedListFeature(),
      BlocksFeature({
        inlineBlocks: [BLOCK_VALUE, BLOCK_PERCENTAGE, BLOCK_LOCATION_COORDINATES, NumberBlock],
      }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || "",
  localization: {
    locales: ["en", "es"], // required
    defaultLocale: "en", // required
  },
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
    },
    extensions: ["postgis", "uuid-ossp"],
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    openapi({ openapiVersion: "3.0", metadata: { title: "Dev API", version: "0.0.1" } }),
    // storage-adapter-placeholder
  ],
});
