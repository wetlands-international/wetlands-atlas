import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- 1. Add labels column to indicators_locales
    ALTER TABLE "indicators_locales" ADD COLUMN "labels" jsonb;

    -- 2. Copy labels from indicator_data_locales into indicators_locales.
    --    Each indicator has the same labels regardless of location, so we take
    --    one row per (indicator, locale) pair using DISTINCT ON.
    INSERT INTO "indicators_locales" ("_locale", "_parent_id", "labels")
    SELECT DISTINCT ON (id.indicator, idl."_locale")
      idl."_locale",
      id.indicator,
      idl.labels
    FROM "indicator_data_locales" idl
    JOIN "indicator_data" id ON id.id = idl."_parent_id"
    WHERE idl.labels IS NOT NULL
    ON CONFLICT ("_locale", "_parent_id")
    DO UPDATE SET labels = EXCLUDED.labels;

    -- 3. Drop indicator_data_locales — labels was its only localized field
    DROP TABLE "indicator_data_locales" CASCADE;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- 1. Recreate indicator_data_locales
    CREATE TABLE "indicator_data_locales" (
      "labels" jsonb NOT NULL DEFAULT '{}',
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    ALTER TABLE "indicator_data_locales"
      ADD CONSTRAINT "indicator_data_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."indicator_data"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE UNIQUE INDEX "indicator_data_locales_locale_parent_id_unique"
      ON "indicator_data_locales" USING btree ("_locale", "_parent_id");

    -- 2. Copy labels back from indicators_locales to every indicator_data row
    --    for the matching indicator + locale
    INSERT INTO "indicator_data_locales" ("_locale", "_parent_id", "labels")
    SELECT il."_locale", id.id, il.labels
    FROM "indicator_data" id
    JOIN "indicators_locales" il ON il."_parent_id" = id.indicator
    WHERE il.labels IS NOT NULL;

    -- 3. Remove labels from indicators_locales
    ALTER TABLE "indicators_locales" DROP COLUMN "labels";
  `)
}
