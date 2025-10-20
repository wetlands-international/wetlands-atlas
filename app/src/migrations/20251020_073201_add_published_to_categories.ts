import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "faqs_locales" ALTER COLUMN "answer" SET NOT NULL;
  ALTER TABLE "categories" ADD COLUMN "published" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "faqs_locales" ALTER COLUMN "answer" DROP NOT NULL;
  ALTER TABLE "categories" DROP COLUMN "published";`)
}
