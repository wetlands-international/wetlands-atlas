// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./cms/collections/Users";
import { Media } from "./cms/collections/Media";
import { Categories } from "./cms/collections/Categories";
import { Layers } from "@/cms/collections/Layers";
import { Indicators } from "@/cms/collections/Indicators";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Categories, Indicators, Layers],
  editor: lexicalEditor(),
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
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
});
