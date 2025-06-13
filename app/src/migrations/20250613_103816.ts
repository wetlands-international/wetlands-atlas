import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "locations" ADD COLUMN "code" varchar NOT NULL;
  ALTER TABLE "locations" ADD COLUMN "bbox" jsonb NOT NULL;
  CREATE UNIQUE INDEX IF NOT EXISTS "type_code_idx" ON "locations" USING btree ("type","code");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "type_code_idx";
  ALTER TABLE "locations" DROP COLUMN IF EXISTS "code";
  ALTER TABLE "locations" DROP COLUMN IF EXISTS "bbox";`)
}
