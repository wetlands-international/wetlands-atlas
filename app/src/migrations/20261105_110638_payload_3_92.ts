import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE INDEX "regions_locales_parent_id_idx" ON "regions_locales" USING btree ("_parent_id");
  CREATE INDEX "categories_locales_parent_id_idx" ON "categories_locales" USING btree ("_parent_id");
  CREATE INDEX "indicators_locales_parent_id_idx" ON "indicators_locales" USING btree ("_parent_id");
  CREATE INDEX "layers_locales_parent_id_idx" ON "layers_locales" USING btree ("_parent_id");
  CREATE INDEX "locations_locales_parent_id_idx" ON "locations_locales" USING btree ("_parent_id");
  CREATE INDEX "landscapes_steps_locales_parent_id_idx" ON "landscapes_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "landscapes_locales_parent_id_idx" ON "landscapes_locales" USING btree ("_parent_id");
  CREATE INDEX "faqs_locales_parent_id_idx" ON "faqs_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "regions_locales_parent_id_idx";
  DROP INDEX "categories_locales_parent_id_idx";
  DROP INDEX "indicators_locales_parent_id_idx";
  DROP INDEX "layers_locales_parent_id_idx";
  DROP INDEX "locations_locales_parent_id_idx";
  DROP INDEX "landscapes_steps_locales_parent_id_idx";
  DROP INDEX "landscapes_locales_parent_id_idx";
  DROP INDEX "faqs_locales_parent_id_idx";`)
}
