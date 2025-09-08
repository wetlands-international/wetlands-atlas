import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_stories_steps_type" RENAME TO "enum_landscapes_steps_type";
  ALTER TYPE "public"."enum_stories_embedded_video_type" RENAME TO "enum_landscapes_embedded_video_type";
  ALTER TABLE "stories_steps" RENAME TO "landscapes_steps";
  ALTER TABLE "stories_steps_locales" RENAME TO "landscapes_steps_locales";
  ALTER TABLE "stories" RENAME TO "landscapes";
  ALTER TABLE "stories_locales" RENAME TO "landscapes_locales";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "stories_id" TO "landscapes_id";
  ALTER TABLE "landscapes_steps" DROP CONSTRAINT "stories_steps_parent_id_fk";
  
  ALTER TABLE "landscapes_steps_locales" DROP CONSTRAINT "stories_steps_locales_parent_id_fk";
  
  ALTER TABLE "landscapes" DROP CONSTRAINT "stories_cover_id_media_id_fk";
  
  ALTER TABLE "landscapes" DROP CONSTRAINT "stories_category_id_categories_id_fk";
  
  ALTER TABLE "landscapes_locales" DROP CONSTRAINT "stories_locales_parent_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_stories_fk";
  
  DROP INDEX "stories_steps_order_idx";
  DROP INDEX "stories_steps_parent_id_idx";
  DROP INDEX "stories_steps_locales_locale_parent_id_unique";
  DROP INDEX "stories_cover_idx";
  DROP INDEX "stories_category_idx";
  DROP INDEX "stories_updated_at_idx";
  DROP INDEX "stories_created_at_idx";
  DROP INDEX "stories_name_idx";
  DROP INDEX "stories_locales_locale_parent_id_unique";
  DROP INDEX "payload_locked_documents_rels_stories_id_idx";
  ALTER TABLE "landscapes_steps" ADD CONSTRAINT "landscapes_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landscapes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landscapes_steps_locales" ADD CONSTRAINT "landscapes_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landscapes_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landscapes" ADD CONSTRAINT "landscapes_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landscapes" ADD CONSTRAINT "landscapes_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landscapes_locales" ADD CONSTRAINT "landscapes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."landscapes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_landscapes_fk" FOREIGN KEY ("landscapes_id") REFERENCES "public"."landscapes"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "landscapes_steps_order_idx" ON "landscapes_steps" USING btree ("_order");
  CREATE INDEX "landscapes_steps_parent_id_idx" ON "landscapes_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "landscapes_steps_locales_locale_parent_id_unique" ON "landscapes_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "landscapes_cover_idx" ON "landscapes" USING btree ("cover_id");
  CREATE INDEX "landscapes_category_idx" ON "landscapes" USING btree ("category_id");
  CREATE INDEX "landscapes_updated_at_idx" ON "landscapes" USING btree ("updated_at");
  CREATE INDEX "landscapes_created_at_idx" ON "landscapes" USING btree ("created_at");
  CREATE UNIQUE INDEX "landscapes_name_idx" ON "landscapes_locales" USING btree ("name","_locale");
  CREATE UNIQUE INDEX "landscapes_locales_locale_parent_id_unique" ON "landscapes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "payload_locked_documents_rels_landscapes_id_idx" ON "payload_locked_documents_rels" USING btree ("landscapes_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_stories_steps_type" AS ENUM('map', 'chart');
  CREATE TYPE "public"."enum_stories_embedded_video_type" AS ENUM('youtube');
  CREATE TABLE "stories_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_stories_steps_type" NOT NULL,
  	"map" jsonb,
  	"chart" jsonb
  );
  
  CREATE TABLE "stories_steps_locales" (
  	"sidebar" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "stories" (
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cover_id" integer,
  	"embedded_video_type" "enum_stories_embedded_video_type",
  	"embedded_video_source" varchar,
  	"category_id" varchar NOT NULL,
  	"location" geometry(Point) NOT NULL,
  	"published" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "stories_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"embedded_video_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "landscapes_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "landscapes_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "landscapes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "landscapes_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "landscapes_steps" CASCADE;
  DROP TABLE "landscapes_steps_locales" CASCADE;
  DROP TABLE "landscapes" CASCADE;
  DROP TABLE "landscapes_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_landscapes_fk";
  
  DROP INDEX "payload_locked_documents_rels_landscapes_id_idx";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "stories_id" varchar;
  ALTER TABLE "stories_steps" ADD CONSTRAINT "stories_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_steps_locales" ADD CONSTRAINT "stories_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories_locales" ADD CONSTRAINT "stories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "stories_steps_order_idx" ON "stories_steps" USING btree ("_order");
  CREATE INDEX "stories_steps_parent_id_idx" ON "stories_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "stories_steps_locales_locale_parent_id_unique" ON "stories_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "stories_cover_idx" ON "stories" USING btree ("cover_id");
  CREATE INDEX "stories_category_idx" ON "stories" USING btree ("category_id");
  CREATE INDEX "stories_updated_at_idx" ON "stories" USING btree ("updated_at");
  CREATE INDEX "stories_created_at_idx" ON "stories" USING btree ("created_at");
  CREATE UNIQUE INDEX "stories_name_idx" ON "stories_locales" USING btree ("name","_locale");
  CREATE UNIQUE INDEX "stories_locales_locale_parent_id_unique" ON "stories_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_stories_id_idx" ON "payload_locked_documents_rels" USING btree ("stories_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "landscapes_id";
  DROP TYPE "public"."enum_landscapes_steps_type";
  DROP TYPE "public"."enum_landscapes_embedded_video_type";`)
}
