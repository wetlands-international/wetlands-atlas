import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "landscapes" RENAME COLUMN "location" TO "geo_location";
  ALTER TABLE "landscapes" ADD COLUMN "location_id" varchar;
  ALTER TABLE "landscapes" ADD CONSTRAINT "landscapes_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "landscapes_location_idx" ON "landscapes" USING btree ("location_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "landscapes" RENAME COLUMN "geo_location" TO "location";
  ALTER TABLE "landscapes" DROP CONSTRAINT "landscapes_location_id_locations_id_fk";
  
  DROP INDEX "landscapes_location_idx";
  ALTER TABLE "landscapes" DROP COLUMN "location_id";`)
}
