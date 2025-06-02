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
  
  CREATE INDEX IF NOT EXISTS "stories_steps_order_idx" ON "stories_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "stories_steps_parent_id_idx" ON "stories_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "stories_steps_locales_locale_parent_id_unique" ON "stories_steps_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "stories_steps" CASCADE;
  DROP TABLE "stories_steps_locales" CASCADE;
  DROP TYPE "public"."enum_stories_steps_type";`)
}
