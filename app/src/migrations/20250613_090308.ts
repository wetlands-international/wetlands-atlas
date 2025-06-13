import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "indicators_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" varchar NOT NULL,
  	"path" varchar NOT NULL,
  	"layers_id" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "layers_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" varchar NOT NULL,
  	"path" varchar NOT NULL,
  	"indicators_id" varchar
  );
  
  ALTER TABLE "layers" DROP CONSTRAINT "layers_indicator_id_indicators_id_fk";
  
  DROP INDEX IF EXISTS "layers_indicator_idx";
  ALTER TABLE "locations" ADD COLUMN "code" varchar NOT NULL;
  ALTER TABLE "locations" ADD COLUMN "bbox" jsonb NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "indicators_rels" ADD CONSTRAINT "indicators_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."indicators"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "indicators_rels" ADD CONSTRAINT "indicators_rels_layers_fk" FOREIGN KEY ("layers_id") REFERENCES "public"."layers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "layers_rels" ADD CONSTRAINT "layers_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."layers"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "layers_rels" ADD CONSTRAINT "layers_rels_indicators_fk" FOREIGN KEY ("indicators_id") REFERENCES "public"."indicators"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "indicators_rels_order_idx" ON "indicators_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "indicators_rels_parent_idx" ON "indicators_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "indicators_rels_path_idx" ON "indicators_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "indicators_rels_layers_id_idx" ON "indicators_rels" USING btree ("layers_id");
  CREATE INDEX IF NOT EXISTS "layers_rels_order_idx" ON "layers_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "layers_rels_parent_idx" ON "layers_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "layers_rels_path_idx" ON "layers_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "layers_rels_indicators_id_idx" ON "layers_rels" USING btree ("indicators_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "type_code_idx" ON "locations" USING btree ("type","code");
  ALTER TABLE "layers" DROP COLUMN IF EXISTS "indicator_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "indicators_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "layers_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "indicators_rels" CASCADE;
  DROP TABLE "layers_rels" CASCADE;
  DROP INDEX IF EXISTS "type_code_idx";
  ALTER TABLE "layers" ADD COLUMN "indicator_id" varchar;
  DO $$ BEGIN
   ALTER TABLE "layers" ADD CONSTRAINT "layers_indicator_id_indicators_id_fk" FOREIGN KEY ("indicator_id") REFERENCES "public"."indicators"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "layers_indicator_idx" ON "layers" USING btree ("indicator_id");
  ALTER TABLE "locations" DROP COLUMN IF EXISTS "code";
  ALTER TABLE "locations" DROP COLUMN IF EXISTS "bbox";`)
}
