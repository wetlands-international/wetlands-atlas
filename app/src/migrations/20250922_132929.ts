import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_layers_type" ADD VALUE 'landscape';
  ALTER TABLE "landscapes_steps" ADD COLUMN "chart_title" varchar;
  ALTER TABLE "landscapes_steps" ADD COLUMN "chart_indicator_id" varchar;
  ALTER TABLE "landscapes_steps" ADD COLUMN "chart_location_id" varchar;
  ALTER TABLE "landscapes_steps" ADD CONSTRAINT "landscapes_steps_chart_indicator_id_indicators_id_fk" FOREIGN KEY ("chart_indicator_id") REFERENCES "public"."indicators"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landscapes_steps" ADD CONSTRAINT "landscapes_steps_chart_location_id_locations_id_fk" FOREIGN KEY ("chart_location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "landscapes_steps_chart_chart_indicator_idx" ON "landscapes_steps" USING btree ("chart_indicator_id");
  CREATE INDEX "landscapes_steps_chart_chart_location_idx" ON "landscapes_steps" USING btree ("chart_location_id");
  ALTER TABLE "landscapes_steps" DROP COLUMN "chart";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "landscapes_steps" DROP CONSTRAINT "landscapes_steps_chart_indicator_id_indicators_id_fk";
  
  ALTER TABLE "landscapes_steps" DROP CONSTRAINT "landscapes_steps_chart_location_id_locations_id_fk";
  
  ALTER TABLE "layers" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "layers" ALTER COLUMN "type" SET DEFAULT 'contextual'::text;
  DROP TYPE "public"."enum_layers_type";
  CREATE TYPE "public"."enum_layers_type" AS ENUM('indicator', 'contextual');
  ALTER TABLE "layers" ALTER COLUMN "type" SET DEFAULT 'contextual'::"public"."enum_layers_type";
  ALTER TABLE "layers" ALTER COLUMN "type" SET DATA TYPE "public"."enum_layers_type" USING "type"::"public"."enum_layers_type";
  DROP INDEX "landscapes_steps_chart_chart_indicator_idx";
  DROP INDEX "landscapes_steps_chart_chart_location_idx";
  ALTER TABLE "landscapes_steps" ADD COLUMN "chart" jsonb;
  ALTER TABLE "landscapes_steps" DROP COLUMN "chart_title";
  ALTER TABLE "landscapes_steps" DROP COLUMN "chart_indicator_id";
  ALTER TABLE "landscapes_steps" DROP COLUMN "chart_location_id";`)
}
