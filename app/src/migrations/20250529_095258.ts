import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_stories_steps_type" AS ENUM('map', 'chart');
  CREATE TABLE IF NOT EXISTS "stories_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_stories_steps_type" NOT NULL,
  	"map" jsonb,
  	"chart" jsonb
  );
  
  CREATE TABLE IF NOT EXISTS "stories_steps_locales" (
  	"sidebar" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "stories" (
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cover_id" integer,
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
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "stories_id" varchar;
  DO $$ BEGIN
   ALTER TABLE "stories_steps" ADD CONSTRAINT "stories_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "stories_steps_locales" ADD CONSTRAINT "stories_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_steps"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "stories" ADD CONSTRAINT "stories_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "stories_locales" ADD CONSTRAINT "stories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "stories_steps_order_idx" ON "stories_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "stories_steps_parent_id_idx" ON "stories_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "stories_steps_locales_locale_parent_id_unique" ON "stories_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "stories_cover_idx" ON "stories" USING btree ("cover_id");
  CREATE INDEX IF NOT EXISTS "stories_updated_at_idx" ON "stories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "stories_created_at_idx" ON "stories" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "stories_name_idx" ON "stories_locales" USING btree ("name","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "stories_locales_locale_parent_id_unique" ON "stories_locales" USING btree ("_locale","_parent_id");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_stories_id_idx" ON "payload_locked_documents_rels" USING btree ("stories_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "stories_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stories_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "stories_steps" CASCADE;
  DROP TABLE "stories_steps_locales" CASCADE;
  DROP TABLE "stories" CASCADE;
  DROP TABLE "stories_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_stories_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_stories_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "stories_id";
  DROP TYPE "public"."enum_stories_steps_type";`)
}
