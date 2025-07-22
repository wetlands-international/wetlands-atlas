import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ADD COLUMN "sizes_avatar_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_avatar_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_avatar_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_avatar_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_avatar_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_avatar_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_filename" varchar;
  CREATE INDEX IF NOT EXISTS "media_sizes_avatar_sizes_avatar_filename_idx" ON "media" USING btree ("sizes_avatar_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "media_sizes_avatar_sizes_avatar_filename_idx";
  DROP INDEX IF EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_avatar_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_avatar_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_avatar_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_avatar_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_avatar_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_avatar_filename";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_filename";`)
}
