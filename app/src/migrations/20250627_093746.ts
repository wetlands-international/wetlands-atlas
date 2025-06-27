import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "categories_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" varchar NOT NULL,
  	"path" varchar NOT NULL,
  	"indicators_id" varchar
  );
  
  DROP TABLE "stories_blocks_location" CASCADE;
  ALTER TABLE "stories" ADD COLUMN "location" geometry(Point) NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "categories_rels" ADD CONSTRAINT "categories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "categories_rels" ADD CONSTRAINT "categories_rels_indicators_fk" FOREIGN KEY ("indicators_id") REFERENCES "public"."indicators"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "categories_rels_order_idx" ON "categories_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "categories_rels_parent_idx" ON "categories_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "categories_rels_path_idx" ON "categories_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "categories_rels_indicators_id_idx" ON "categories_rels" USING btree ("indicators_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "stories_blocks_location" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"latitude" numeric NOT NULL,
  	"longitude" numeric NOT NULL,
  	"block_name" varchar
  );
  
  DROP TABLE "categories_rels" CASCADE;
  DO $$ BEGIN
   ALTER TABLE "stories_blocks_location" ADD CONSTRAINT "stories_blocks_location_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "stories_blocks_location_order_idx" ON "stories_blocks_location" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "stories_blocks_location_parent_id_idx" ON "stories_blocks_location" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "stories_blocks_location_path_idx" ON "stories_blocks_location" USING btree ("_path");
  ALTER TABLE "stories" DROP COLUMN IF EXISTS "location";`)
}
