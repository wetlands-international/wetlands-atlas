import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "layers" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "layers" ALTER COLUMN "type" SET DEFAULT 'contextual'::text;
  DROP TYPE "public"."enum_layers_type";
  CREATE TYPE "public"."enum_layers_type" AS ENUM('indicator', 'contextual');
  ALTER TABLE "layers" ALTER COLUMN "type" SET DEFAULT 'contextual'::"public"."enum_layers_type";
  ALTER TABLE "layers" ALTER COLUMN "type" SET DATA TYPE "public"."enum_layers_type" USING "type"::"public"."enum_layers_type";
  ALTER TABLE "locations" ALTER COLUMN "type" SET DATA TYPE text;
  DROP TYPE "public"."enum_locations_type";
  CREATE TYPE "public"."enum_locations_type" AS ENUM('admin_region', 'eco_region', 'hydro_basin', 'global', 'landscapes', 'wdpa');
  ALTER TABLE "locations" ALTER COLUMN "type" SET DATA TYPE "public"."enum_locations_type" USING "type"::"public"."enum_locations_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "layers" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "layers" ALTER COLUMN "type" SET DEFAULT 'CONTEXTUAL'::text;
  DROP TYPE "public"."enum_layers_type";
  CREATE TYPE "public"."enum_layers_type" AS ENUM('INDICATOR', 'CONTEXTUAL');
  ALTER TABLE "layers" ALTER COLUMN "type" SET DEFAULT 'CONTEXTUAL'::"public"."enum_layers_type";
  ALTER TABLE "layers" ALTER COLUMN "type" SET DATA TYPE "public"."enum_layers_type" USING "type"::"public"."enum_layers_type";
  ALTER TABLE "locations" ALTER COLUMN "type" SET DATA TYPE text;
  DROP TYPE "public"."enum_locations_type";
  CREATE TYPE "public"."enum_locations_type" AS ENUM('ADMIN_REGION', 'ECO_REGION', 'HYDRO_BASIN', 'GLOBAL', 'LANDSCAPES', 'WDPA');
  ALTER TABLE "locations" ALTER COLUMN "type" SET DATA TYPE "public"."enum_locations_type" USING "type"::"public"."enum_locations_type";`)
}
