import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "landscapes_locales" ALTER COLUMN "name" SET DATA TYPE jsonb USING "name"::jsonb;`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "landscapes_locales" ALTER COLUMN "name" SET DATA TYPE varchar USING "name"::text;`);
}
