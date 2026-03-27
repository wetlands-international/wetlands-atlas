import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- 1. Add labels column to indicators_locales
    ALTER TABLE "indicators_locales" ADD COLUMN "labels" jsonb;

    -- 2. Copy labels from indicator_data_locales into indicators_locales.
    --    Rows in indicators_locales already exist (one per indicator+locale),
    --    so we UPDATE rather than INSERT to avoid NOT NULL violations on other columns.
    --    Each indicator has the same labels regardless of location, so we take
    --    one row per (indicator, locale) pair using DISTINCT ON.
    UPDATE "indicators_locales" il
    SET labels = source.labels
    FROM (
      SELECT DISTINCT ON (id."indicator_id", idl."_locale")
        idl."_locale",
        id."indicator_id",
        idl.labels
      FROM "indicator_data_locales" idl
      JOIN "indicator_data" id ON id.id = idl."_parent_id"
      WHERE idl.labels IS NOT NULL
      ORDER BY id."indicator_id", idl."_locale"
    ) source
    WHERE il."_parent_id" = source."indicator_id"
      AND il."_locale" = source."_locale";

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
