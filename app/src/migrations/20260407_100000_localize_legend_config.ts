import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- 1. Add legend_config column to layers_locales
    ALTER TABLE "layers_locales" ADD COLUMN "legend_config" jsonb DEFAULT '{"type":"basic","items":[{"color":"#000000","value":"value"}]}'::jsonb NOT NULL;

    -- 2. Copy existing legend_config from layers into all locale rows.
    --    layers_locales already has one row per (layer, locale) because
    --    the "name" field is already localized.
    UPDATE "layers_locales" ll
    SET "legend_config" = l."legend_config"
    FROM "layers" l
    WHERE ll."_parent_id" = l."id"::varchar;

    -- 3. Drop legend_config from the main layers table.
    --    Payload now reads from layers_locales for localized fields.
    ALTER TABLE "layers" DROP COLUMN "legend_config";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- 1. Re-add legend_config to layers table
    ALTER TABLE "layers" ADD COLUMN "legend_config" jsonb DEFAULT '{"type":"basic","items":[{"color":"#000000","value":"value"}]}'::jsonb NOT NULL;

    -- 2. Copy legend_config from the "en" locale rows back to layers
    UPDATE "layers" l
    SET "legend_config" = ll."legend_config"
    FROM "layers_locales" ll
    WHERE ll."_parent_id" = l."id"::varchar
      AND ll."_locale" = 'en';

    -- 3. Drop legend_config from layers_locales
    ALTER TABLE "layers_locales" DROP COLUMN "legend_config";
  `)
}
