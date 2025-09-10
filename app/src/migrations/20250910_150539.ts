import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_locations_type" ADD VALUE 'ECO_REGION' BEFORE 'HYDRO_BASIN';
  ALTER TYPE "public"."enum_locations_type" ADD VALUE 'LANDSCAPES' BEFORE 'WDPA';
  ALTER TABLE "landscapes_locales" ALTER COLUMN "description" SET DATA TYPE jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "locations" ALTER COLUMN "type" SET DATA TYPE text;
  DROP TYPE "public"."enum_locations_type";
  CREATE TYPE "public"."enum_locations_type" AS ENUM('ADMIN_REGION', 'HYDRO_BASIN', 'GLOBAL', 'WDPA');
  ALTER TABLE "locations" ALTER COLUMN "type" SET DATA TYPE "public"."enum_locations_type" USING "type"::"public"."enum_locations_type";
  ALTER TABLE "landscapes_locales" ALTER COLUMN "description" SET DATA TYPE varchar;`)
}
