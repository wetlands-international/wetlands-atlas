import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "locations" ALTER COLUMN "geometry_4326" SET DATA TYPE geometry(MultiPolygon,4326);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "locations" ALTER COLUMN "geometry_4326" SET DATA TYPE geometry(Polygon,4326);`)
}
