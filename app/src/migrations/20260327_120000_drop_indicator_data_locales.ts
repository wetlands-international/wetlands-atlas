import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE "indicator_data_locales" CASCADE;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "indicator_data_locales" (
      "labels" jsonb NOT NULL DEFAULT '{}',
      "id" serial PRIMARY KEY NOT NULL,
      "_locale" "_locales" NOT NULL,
      "_parent_id" varchar NOT NULL
    );

    ALTER TABLE "indicator_data_locales"
      ADD CONSTRAINT "indicator_data_locales_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."indicator_data"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE UNIQUE INDEX "indicator_data_locales_locale_parent_id_unique"
      ON "indicator_data_locales" USING btree ("_locale", "_parent_id");
  `)
}
