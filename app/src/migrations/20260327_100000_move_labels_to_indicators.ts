import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- 1. Add labels column to indicators_locales
    ALTER TABLE "indicators_locales" ADD COLUMN "labels" jsonb;

    -- 2. Copy labels from indicator_data_locales into indicators_locales.
    --    Each indicator has the same labels regardless of location, so we take
    --    one row per (indicator, locale) pair using DISTINCT ON.
    INSERT INTO "indicators_locales" ("_locale", "_parent_id", "labels")
    SELECT DISTINCT ON (id."indicator_id", idl."_locale")
      idl."_locale",
      id."indicator_id",
      idl.labels
    FROM "indicator_data_locales" idl
    JOIN "indicator_data" id ON id.id = idl."_parent_id"
    WHERE idl.labels IS NOT NULL
    ON CONFLICT ("_locale", "_parent_id")
    DO UPDATE SET labels = EXCLUDED.labels;

    -- indicator_data_locales is intentionally kept here (expand phase).
    -- It will be dropped in the next deploy once the new code is confirmed live.
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Remove labels from indicators_locales
    ALTER TABLE "indicators_locales" DROP COLUMN "labels";
  `)
}
