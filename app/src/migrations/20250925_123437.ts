import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "layers_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" varchar NOT NULL,
  	"path" varchar NOT NULL,
  	"indicators_id" varchar
  );
  
  ALTER TABLE "layers" DROP CONSTRAINT "layers_indicator_id_indicators_id_fk";
  
  DROP INDEX "layers_indicator_idx";
  ALTER TABLE "layers_rels" ADD CONSTRAINT "layers_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."layers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "layers_rels" ADD CONSTRAINT "layers_rels_indicators_fk" FOREIGN KEY ("indicators_id") REFERENCES "public"."indicators"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "layers_rels_order_idx" ON "layers_rels" USING btree ("order");
  CREATE INDEX "layers_rels_parent_idx" ON "layers_rels" USING btree ("parent_id");
  CREATE INDEX "layers_rels_path_idx" ON "layers_rels" USING btree ("path");
  CREATE INDEX "layers_rels_indicators_id_idx" ON "layers_rels" USING btree ("indicators_id");
  ALTER TABLE "layers" DROP COLUMN "indicator_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "layers_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "layers_rels" CASCADE;
  ALTER TABLE "layers" ADD COLUMN "indicator_id" varchar;
  ALTER TABLE "layers" ADD CONSTRAINT "layers_indicator_id_indicators_id_fk" FOREIGN KEY ("indicator_id") REFERENCES "public"."indicators"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "layers_indicator_idx" ON "layers" USING btree ("indicator_id");`)
}
