import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "regions" ADD COLUMN "published" boolean DEFAULT false;

  UPDATE "regions" SET "published" = true WHERE "id" = 'sahel';

  -- Unpublished region for the landscapes outside the other regions. Its landscapes are shown on the global map, but
  -- the region isn't. The seed overwrites it afterwards.
  INSERT INTO "regions" ("id", "color", "order", "published") VALUES ('other', '#7D7D7D', 2, false);
  INSERT INTO "regions_locales" ("name", "intro_title", "intro_description", "_locale", "_parent_id") VALUES ('Other (hidden)', 'Other (hidden)', 'Landscapes outside the published regions.', 'en', 'other');
  INSERT INTO "categories" ("id", "order", "published", "region_id") VALUES ('other-other', 0, false, 'other');
  INSERT INTO "categories_locales" ("name", "_locale", "_parent_id") VALUES ('Other (hidden)', 'en', 'other-other');

  -- Moves the landscapes outside of every region's global location to the new category. Their location is removed, as
  -- it belongs to another region. Skipped if there is no global location yet (e.g. before the first seed), so that
  -- the landscapes aren't all moved.
  UPDATE "landscapes" SET "category_id" = 'other-other', "location_id" = NULL
  WHERE EXISTS (SELECT 1 FROM "locations" WHERE "type" = 'global')
  AND NOT EXISTS (
    SELECT 1 FROM "locations"
    WHERE "locations"."type" = 'global' AND ST_Within("landscapes"."geo_location", "locations"."geometry_4326")
  );`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   -- The landscapes' previous category isn't kept, so they are moved to the Sahel's first category, as
  -- the category can't be null
  UPDATE "landscapes" SET "category_id" = (
    SELECT "id" FROM "categories" WHERE "region_id" = 'sahel' ORDER BY "order" LIMIT 1
  )
  WHERE "category_id" = 'other-other';
  DELETE FROM "categories" WHERE "id" = 'other-other';
  DELETE FROM "regions" WHERE "id" = 'other';
  ALTER TABLE "regions" DROP COLUMN "published";`)
}
