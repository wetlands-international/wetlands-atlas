import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_locations_type" ADD VALUE 'GLOBAL';
  ALTER TYPE "public"."enum_locations_type" ADD VALUE 'WDPA';
  ALTER TABLE "locations" ADD COLUMN "parent_id" varchar;
  ALTER TABLE "locations" ADD COLUMN "geometry_4326" geometry(Polygon,4326);
  DO $$ BEGIN
   ALTER TABLE "locations" ADD CONSTRAINT "locations_parent_id_locations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "locations_parent_idx" ON "locations" USING btree ("parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "locations" DROP CONSTRAINT "locations_parent_id_locations_id_fk";
  
  DROP INDEX IF EXISTS "locations_parent_idx";
  ALTER TABLE "locations" DROP COLUMN IF EXISTS "parent_id";
  ALTER TABLE "locations" DROP COLUMN IF EXISTS "geometry_4326";
  ALTER TABLE "public"."locations" ALTER COLUMN "type" SET DATA TYPE text;
  DROP TYPE "public"."enum_locations_type";
  CREATE TYPE "public"."enum_locations_type" AS ENUM('ADMIN_REGION', 'HYDRO_BASIN');
  ALTER TABLE "public"."locations" ALTER COLUMN "type" SET DATA TYPE "public"."enum_locations_type" USING "type"::"public"."enum_locations_type";`)
}
