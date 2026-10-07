import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Brings the database back in line with the Payload config and refreshes the schema snapshot
// (the JSON file next to this one), which was stale since the hand-written migrations of
// 2026-03-27 and 2026-04-07. The generated SQL was replaced with the changes that no migration
// ever applied:
// - the "es" locale removal (316dba4)
// - the removal of the landscapes' embedded_video field (f9d0511)
// - the NOT NULL constraint of the required "order" field of categories and indicators (12c7e58)
// media.prefix is only recorded in the snapshot: the column already exists in every database.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- 1. Remove the "es" locale. Rows in that locale are unreachable from the app since 316dba4
    --    and would make the cast to the new enum fail.
    DELETE FROM "categories_locales" WHERE "_locale" = 'es';
    DELETE FROM "indicators_locales" WHERE "_locale" = 'es';
    DELETE FROM "layers_locales" WHERE "_locale" = 'es';
    DELETE FROM "locations_locales" WHERE "_locale" = 'es';
    DELETE FROM "landscapes_steps_locales" WHERE "_locale" = 'es';
    DELETE FROM "landscapes_locales" WHERE "_locale" = 'es';
    DELETE FROM "faqs_locales" WHERE "_locale" = 'es';

    ALTER TABLE "categories_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
    ALTER TABLE "indicators_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
    ALTER TABLE "layers_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
    ALTER TABLE "locations_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
    ALTER TABLE "landscapes_steps_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
    ALTER TABLE "landscapes_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
    ALTER TABLE "faqs_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
    DROP TYPE "public"."_locales";
    CREATE TYPE "public"."_locales" AS ENUM('en', 'fr');
    ALTER TABLE "categories_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
    ALTER TABLE "indicators_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
    ALTER TABLE "layers_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
    ALTER TABLE "locations_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
    ALTER TABLE "landscapes_steps_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
    ALTER TABLE "landscapes_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
    ALTER TABLE "faqs_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";

    -- 2. Drop the columns of the removed embedded_video field (replaced by the videoEmbed block).
    ALTER TABLE "landscapes" DROP COLUMN "embedded_video_type";
    ALTER TABLE "landscapes" DROP COLUMN "embedded_video_source";
    ALTER TABLE "landscapes_locales" DROP COLUMN "embedded_video_title";
    DROP TYPE "public"."enum_landscapes_embedded_video_type";

    -- 3. Make "order" NOT NULL. Rows without an order are placed after the existing ones.
    UPDATE "categories" c
    SET "order" = n."order"
    FROM (
      SELECT "id", (SELECT COALESCE(MAX("order"), 0) FROM "categories") + ROW_NUMBER() OVER (ORDER BY "id") AS "order"
      FROM "categories"
      WHERE "order" IS NULL
    ) n
    WHERE c."id" = n."id";
    ALTER TABLE "categories" ALTER COLUMN "order" SET NOT NULL;

    UPDATE "indicators" i
    SET "order" = n."order"
    FROM (
      SELECT "id", (SELECT COALESCE(MAX("order"), 0) FROM "indicators") + ROW_NUMBER() OVER (ORDER BY "id") AS "order"
      FROM "indicators"
      WHERE "order" IS NULL
    ) n
    WHERE i."id" = n."id";
    ALTER TABLE "indicators" ALTER COLUMN "order" SET NOT NULL;
  `)
}

// The deleted "es" rows, the embedded_video values and the backfilled orders are not restored.
export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "indicators" ALTER COLUMN "order" DROP NOT NULL;
    ALTER TABLE "categories" ALTER COLUMN "order" DROP NOT NULL;

    CREATE TYPE "public"."enum_landscapes_embedded_video_type" AS ENUM('youtube');
    ALTER TABLE "landscapes" ADD COLUMN "embedded_video_type" "enum_landscapes_embedded_video_type";
    ALTER TABLE "landscapes" ADD COLUMN "embedded_video_source" varchar;
    ALTER TABLE "landscapes_locales" ADD COLUMN "embedded_video_title" varchar;

    ALTER TYPE "public"."_locales" ADD VALUE 'es' BEFORE 'fr';
  `)
}
