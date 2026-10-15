import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "regions" (
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cover_id" integer,
  	"color" varchar NOT NULL,
  	"order" numeric NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "regions_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"intro_title" varchar NOT NULL,
  	"intro_description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  DROP INDEX "categories_name_idx";
  DROP INDEX "type_code_idx";
  DROP INDEX "locations_name_idx";
  ALTER TABLE "categories" ADD COLUMN "region_id" varchar;
  ALTER TABLE "layers" ADD COLUMN "region_id" varchar;
  ALTER TABLE "locations" ADD COLUMN "region_id" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "regions_id" varchar;

  -- The existing records all belong to the Sahel. The seed overwrites this region afterwards.
  INSERT INTO "regions" ("id", "color", "order") VALUES ('sahel', '#ADBC3D', 0);
  INSERT INTO "regions_locales" ("name", "intro_title", "intro_description", "_locale", "_parent_id") VALUES ('Sahel', 'Discover Sahel wetlands', 'Dive into different topics that define these unique ecosystems and uncover their significant impact on our environment.', 'en', 'sahel');
  UPDATE "categories" SET "region_id" = 'sahel';
  UPDATE "locations" SET "region_id" = 'sahel';
  UPDATE "layers" SET "region_id" = 'sahel' WHERE "type" = 'contextual';
  ALTER TABLE "categories" ALTER COLUMN "region_id" SET NOT NULL;
  ALTER TABLE "locations" ALTER COLUMN "region_id" SET NOT NULL;

  ALTER TABLE "regions" ADD CONSTRAINT "regions_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "regions_locales" ADD CONSTRAINT "regions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."regions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "regions_cover_idx" ON "regions" USING btree ("cover_id");
  CREATE INDEX "regions_updated_at_idx" ON "regions" USING btree ("updated_at");
  CREATE INDEX "regions_created_at_idx" ON "regions" USING btree ("created_at");
  CREATE UNIQUE INDEX "regions_locales_locale_parent_id_unique" ON "regions_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "categories" ADD CONSTRAINT "categories_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "layers" ADD CONSTRAINT "layers_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations" ADD CONSTRAINT "locations_region_id_regions_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_regions_fk" FOREIGN KEY ("regions_id") REFERENCES "public"."regions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "categories_region_idx" ON "categories" USING btree ("region_id");
  CREATE INDEX "layers_region_idx" ON "layers" USING btree ("region_id");
  CREATE INDEX "locations_region_idx" ON "locations" USING btree ("region_id");
  CREATE UNIQUE INDEX "region_type_code_idx" ON "locations" USING btree ("region_id","type","code");
  CREATE INDEX "payload_locked_documents_rels_regions_id_idx" ON "payload_locked_documents_rels" USING btree ("regions_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories" DROP CONSTRAINT "categories_region_id_regions_id_fk";
  
  ALTER TABLE "layers" DROP CONSTRAINT "layers_region_id_regions_id_fk";
  
  ALTER TABLE "locations" DROP CONSTRAINT "locations_region_id_regions_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_regions_fk";
  
  DROP INDEX "categories_region_idx";
  DROP INDEX "layers_region_idx";
  DROP INDEX "locations_region_idx";
  DROP INDEX "region_type_code_idx";
  DROP INDEX "payload_locked_documents_rels_regions_id_idx";
  CREATE UNIQUE INDEX "categories_name_idx" ON "categories_locales" USING btree ("name","_locale");
  CREATE UNIQUE INDEX "type_code_idx" ON "locations" USING btree ("type","code");
  CREATE UNIQUE INDEX "locations_name_idx" ON "locations_locales" USING btree ("name","_locale");
  ALTER TABLE "categories" DROP COLUMN "region_id";
  ALTER TABLE "layers" DROP COLUMN "region_id";
  ALTER TABLE "locations" DROP COLUMN "region_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "regions_id";

  -- Dropped last because their CASCADE would remove the foreign keys dropped above, failing the migration
  ALTER TABLE "regions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "regions_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "regions" CASCADE;
  DROP TABLE "regions_locales" CASCADE;`)
}
