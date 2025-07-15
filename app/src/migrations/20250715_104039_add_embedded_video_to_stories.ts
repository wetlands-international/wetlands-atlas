import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_stories_embedded_video_type" AS ENUM('youtube');
  ALTER TABLE "stories" ADD COLUMN "embedded_video_type" "enum_stories_embedded_video_type" DEFAULT 'youtube';
  ALTER TABLE "stories" ADD COLUMN "embedded_video_source" varchar;
  ALTER TABLE "stories_locales" ADD COLUMN "embedded_video_title" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "stories" DROP COLUMN IF EXISTS "embedded_video_type";
  ALTER TABLE "stories" DROP COLUMN IF EXISTS "embedded_video_source";
  ALTER TABLE "stories_locales" DROP COLUMN IF EXISTS "embedded_video_title";
  DROP TYPE "public"."enum_stories_embedded_video_type";`)
}
