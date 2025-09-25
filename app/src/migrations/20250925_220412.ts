import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories" ADD COLUMN "order" numeric NOT NULL;
  ALTER TABLE "indicators" ADD COLUMN "order" numeric NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories" DROP COLUMN "order";
  ALTER TABLE "indicators" DROP COLUMN "order";`)
}
