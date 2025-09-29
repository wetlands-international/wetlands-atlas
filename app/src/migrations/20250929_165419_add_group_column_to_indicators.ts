import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_indicators_group" AS ENUM('others');
  ALTER TYPE "public"."_locales" ADD VALUE 'fr';
  ALTER TABLE "indicators" ADD COLUMN "group" "enum_indicators_group";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "indicators_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "layers_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "indicator_data_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "locations_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "landscapes_steps_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  ALTER TABLE "landscapes_locales" ALTER COLUMN "_locale" SET DATA TYPE text;
  DROP TYPE "public"."_locales";
  CREATE TYPE "public"."_locales" AS ENUM('en', 'es');
  ALTER TABLE "categories_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "indicators_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "layers_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "indicator_data_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "locations_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "landscapes_steps_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "landscapes_locales" ALTER COLUMN "_locale" SET DATA TYPE "public"."_locales" USING "_locale"::"public"."_locales";
  ALTER TABLE "indicators" DROP COLUMN "group";
  DROP TYPE "public"."enum_indicators_group";`)
}
