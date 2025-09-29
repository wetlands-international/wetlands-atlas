// storage-adapter-import-placeholder

import path from "path";
import { fileURLToPath } from "url";

import { buildConfig } from "payload";

import { postgresAdapter } from "@payloadcms/db-postgres";
import {
  lexicalEditor,
  BoldFeature,
  LinkFeature,
  UnorderedListFeature,
  OrderedListFeature,
  FixedToolbarFeature,
} from "@payloadcms/richtext-lexical";

import { Categories } from "@/cms/collections/Categories";
import { IndicatorDatas } from "@/cms/collections/IndicatorDatas";
import { Indicators } from "@/cms/collections/Indicators";
import { Landscapes } from "@/cms/collections/Landscapes";
import { Layers } from "@/cms/collections/Layers";
import { Locations } from "@/cms/collections/Location";
import { Media } from "@/cms/collections/Media";
import { Users } from "@/cms/collections/Users";
import { plugins } from "@/cms/plugins";
import { env } from "@/env";
import { routing } from "@/i18n/routing";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  graphQL: { disable: true },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  upload: {
    useTempFiles: false,
  },
  collections: [
    Users,
    Media,
    Categories,
    Indicators,
    Layers,
    IndicatorDatas,
    Locations,
    Landscapes,
  ],
  editor: lexicalEditor({
    features: () => [
      FixedToolbarFeature(),
      BoldFeature(),
      LinkFeature(),
      UnorderedListFeature(),
      OrderedListFeature(),
    ],
  }),
  secret: env.PAYLOAD_SECRET,
  localization: {
    locales: [...routing.locales], // required
    defaultLocale: routing.defaultLocale, // required
  },
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: env.DATABASE_URI,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
    },
    extensions: ["postgis", "uuid-ossp"],
    migrationDir: path.resolve(dirname, "migrations"),
    afterSchemaInit: [
      async ({ schema, extendTable }) => {
        const { customType } = await import("drizzle-orm/pg-core");
        // Hack to make the geometry(multiPolygon) column work with Postgres
        const multiPolygonGeometryColumn = (name: string) =>
          customType<{ data: string }>({
            dataType() {
              return "geometry(MultiPolygon,4326)";
            },
          })(name);

        extendTable({
          table: schema.tables.locations,
          columns: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            geometry_4326: multiPolygonGeometryColumn("geometry_4326") as any,
          },
        });
        return schema;
      },
    ],
  }),
  plugins,
});
