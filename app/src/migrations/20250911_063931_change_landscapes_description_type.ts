import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "landscapes_locales"
    ALTER COLUMN "description" TYPE jsonb
    USING "description"::jsonb;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "landscapes_locales"
    ALTER COLUMN "description" TYPE varchar
    USING "description"::text;
  `);
}
