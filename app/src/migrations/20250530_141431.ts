import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_layers_type" AS ENUM('INDICATOR', 'CONTEXTUAL');
  CREATE TYPE "public"."enum_locations_type" AS ENUM('ADMIN_REGION', 'HYDRO_BASIN');
  CREATE TABLE IF NOT EXISTS "indicator_data" (
  	"id" varchar PRIMARY KEY NOT NULL,
  	"indicator_id" varchar NOT NULL,
  	"location_id" varchar NOT NULL,
  	"data" jsonb DEFAULT '{}'::jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "locations" (
  	"id" varchar PRIMARY KEY NOT NULL,
  	"geometry" jsonb NOT NULL,
  	"type" "enum_locations_type" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "locations_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "stories_blocks_location" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"latitude" numeric NOT NULL,
  	"longitude" numeric NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "stories" (
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cover_id" integer,
  	"category_id" varchar NOT NULL,
  	"published" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "stories_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "layers" ADD COLUMN "type" "enum_layers_type" DEFAULT 'CONTEXTUAL' NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "indicator_data_id" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "locations_id" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "stories_id" varchar;
  DO $$ BEGIN
   ALTER TABLE "indicator_data" ADD CONSTRAINT "indicator_data_indicator_id_indicators_id_fk" FOREIGN KEY ("indicator_id") REFERENCES "public"."indicators"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "indicator_data" ADD CONSTRAINT "indicator_data_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "locations_locales" ADD CONSTRAINT "locations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "stories_blocks_location" ADD CONSTRAINT "stories_blocks_location_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "stories" ADD CONSTRAINT "stories_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "stories" ADD CONSTRAINT "stories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "stories_locales" ADD CONSTRAINT "stories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "indicator_data_indicator_idx" ON "indicator_data" USING btree ("indicator_id");
  CREATE INDEX IF NOT EXISTS "indicator_data_location_idx" ON "indicator_data" USING btree ("location_id");
  CREATE INDEX IF NOT EXISTS "indicator_data_updated_at_idx" ON "indicator_data" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "indicator_data_created_at_idx" ON "indicator_data" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "locations_updated_at_idx" ON "locations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "locations_created_at_idx" ON "locations" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "locations_name_idx" ON "locations_locales" USING btree ("name","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "locations_locales_locale_parent_id_unique" ON "locations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "stories_blocks_location_order_idx" ON "stories_blocks_location" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "stories_blocks_location_parent_id_idx" ON "stories_blocks_location" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "stories_blocks_location_path_idx" ON "stories_blocks_location" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "stories_cover_idx" ON "stories" USING btree ("cover_id");
  CREATE INDEX IF NOT EXISTS "stories_category_idx" ON "stories" USING btree ("category_id");
  CREATE INDEX IF NOT EXISTS "stories_updated_at_idx" ON "stories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "stories_created_at_idx" ON "stories" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "stories_name_idx" ON "stories_locales" USING btree ("name","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "stories_locales_locale_parent_id_unique" ON "stories_locales" USING btree ("_locale","_parent_id");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_indicator_data_fk" FOREIGN KEY ("indicator_data_id") REFERENCES "public"."indicator_data"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_indicator_data_id_idx" ON "payload_locked_documents_rels" USING btree ("indicator_data_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_locations_id_idx" ON "payload_locked_documents_rels" USING btree ("locations_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_stories_id_idx" ON "payload_locked_documents_rels" USING btree ("stories_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "indicator_data" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories_blocks_location" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "indicator_data" CASCADE;
  DROP TABLE "locations" CASCADE;
  DROP TABLE "locations_locales" CASCADE;
  DROP TABLE "stories_blocks_location" CASCADE;
  DROP TABLE "stories" CASCADE;
  DROP TABLE "stories_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_indicator_data_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_locations_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_stories_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_indicator_data_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_locations_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_stories_id_idx";
  ALTER TABLE "layers" DROP COLUMN IF EXISTS "type";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "indicator_data_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "locations_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "stories_id";
  DROP TYPE "public"."enum_layers_type";
  DROP TYPE "public"."enum_locations_type";`)
}
