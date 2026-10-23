### Test docker build

First, make sure you first excecute `docker-compose up -d` to start a local postgres db engine.

Make sure you have `DATABASE_URI=postgres://wetlands-db:wetlands-db@host.docker.internal:5432/wetlands-db` inside the `.env` file.

Then, use the following command to test the docker build locally:

```sh
docker buildx build --platform=linux/amd64 -t wetlands . && docker rm -f wetlands-container && docker run -d --name wetlands-container -p 80:80 wetlands
```

### Titiler

Start titiler:

```sh
cd titiler
source .venv/bin/activate
uvicorn main:app
```

Run `pdm install` inside titiler folder after the activate command f you need to install the python dependencies

### Git LFS

This project uses git LFS for the `app-initial-data` seeding files.
In case you cannot see the contents of a data file, use `git lfs pull`.
[https://git-lfs.com](https://git-lfs.com)

## Database migrations

The database schema is managed with Payload migrations (`app/src/migrations`), applied at deployment with `payload migrate`. Each migration comes with a JSON snapshot of the whole schema, and `pnpm payload migrate:create <name>` generates the next migration by comparing the Payload config with the latest snapshot.

- Any change to the schema needs a migration, including the less obvious ones: the locales of `app/src/i18n/routing.ts` (stored as a Postgres enum), a field becoming `required`, or a field added by a plugin.
- Always create migrations with `migrate:create`, even if you then edit the SQL, so that the snapshot keeps matching the config. A hand-written migration without its snapshot makes every following migration include its changes again.
- The schema must be the same in every environment, since migrations are generated locally but run in production. A plugin only enabled in production must still add its fields elsewhere: the GCS storage plugin is replaced outside production by `storageFieldsPlugin()` (`app/src/cms/plugins/GCS.ts`), which adds the same fields (`prefix`, `_objectKey`, …) without enabling storage. Keep `@payloadcms/plugin-cloud-storage` on the same version as `payload`.
- `pnpm payload migrate:create check --skip-empty` must not create any file; if it does, a migration is missing.
- In development, Payload pushes the schema to the database on start (`pnpm dev`, seed script), which hides missing migrations. To test migrations, start from an empty database, run `pnpm payload migrate`, then seed it with `PAYLOAD_MIGRATING=true pnpm data:seed:dev`.

## Seeding

The read-only collections (regions, locations, categories, indicators, indicator data) are seeded from the files of `app-initial-data`, which are their only source of truth:

- `pnpm data:seed:<env>` validates the five files first (every reference resolves, the IDs carry their region, one global location per published region, the covers are uploaded in the CMS and referenced by filename), then upserts every record with every locale it carries. The run prints the target database before writing.
- The rows and translations found in the database but not in the files make the run fail with their list. `--delete-orphans` deletes them, unless a layer or a landscape still references them. `--dry-run` rolls everything back at the end.
- Media, layers, landscapes and FAQs are edited in the CMS and never seeded. For local work, restore a staging backup.
- `pnpm data:export:<env>` regenerates the files from a database, translations included.

## Deployment

### Architecture

The app runs as a single Heroku Docker container managed by **supervisord** with three services:

- **nginx** (port `$PORT`) — reverse proxy, redirects `*.herokuapp.com` to the canonical domain
- **Next.js app** (port 3000) — frontend + Payload CMS backend
- **Tiler** (port 8000) — Python uvicorn tile server, proxied under `/tiler`

### Environments

| | Staging | Production |
|---|---|---|
| Branch | `staging` | `main` |
| Heroku app | `wetlands-gap-map-staging` | `wetland-gap-map-prod` |
| Canonical URL | `https://gaps-staging.wetlands.org` | `https://www.wetlandatlas.org` |

### How deployment works

Pushes to `main` or `staging` trigger the GitHub Actions workflow (`.github/workflows/deploy.yml`), which:

1. **Fetches config vars from Heroku** via the Heroku API — these are the source of truth for all environment variables
2. **Builds the Docker image** passing the Heroku config vars as `--build-arg` values (this bakes `NEXT_PUBLIC_*` vars into the Next.js bundle)
3. **Pushes the image** to the Heroku Container Registry
4. **Releases** the new image on Heroku

At container startup (`app-start.sh`), `envsubst` templates the nginx and supervisord configs with runtime values (`$PORT`, `$NEXT_PUBLIC_API_URL`).

### GitHub secrets and variables

Only **two** GitHub-level values are used by the deploy workflow:

| Name | Type | Purpose |
|---|---|---|
| `HEROKU_API_KEY` | Secret | Authenticates with the Heroku API to fetch config vars and deploy |
| `HEROKU_APP_NAME` | Variable | Identifies which Heroku app to fetch config from and deploy to |

**All other environment variables** (database URI, API keys, public URLs, etc.) are stored as **Heroku config vars** and fetched at build time. Any other GitHub variables you see are unused by the deploy workflow.

### Heroku config vars

These are configured on each Heroku app and serve as the single source of truth:

| Variable | Purpose | Build-time | Runtime |
|---|---|---|---|
| `DATABASE_URI` | PostgreSQL connection string | Yes (migrations) | Yes |
| `PAYLOAD_SECRET` | Payload CMS secret | Yes | Yes |
| `PREVIEW_SECRET` | Draft preview secret | Yes | Yes |
| `NEXT_PUBLIC_API_URL` | Canonical app URL (e.g. `https://www.wetlandatlas.org`) | Yes (baked into JS) | Yes (nginx redirect target, supervisord) |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Mapbox GL token | Yes (baked into JS) | No |
| `NEXT_PUBLIC_TILER_URL` | Tiler endpoint URL | Yes (baked into JS) | No |
| `GCS_PROJECT_ID` | Google Cloud Storage project | Yes | Yes |
| `GCS_BUCKET_NAME` | GCS bucket name | Yes | Yes |
| `GCS_SERVICE_ACCOUNT_KEY` | GCS service account credentials | Yes | Yes |

> **Important:** `NEXT_PUBLIC_*` variables are embedded in the JavaScript bundle at build time. Changing them on Heroku requires a **redeploy** to take effect.

### Rolling out the region model (WM-99)

One-time procedure for the region model: the prefixed IDs, the schema and the front end ship together, because the old IDs break the map. Staging first, then production once the QA on staging has passed.

1. **Back up the database** with the `DATABASE_URI` of the Heroku app: `pg_dump -Fc "$DATABASE_URI" > <env>-$(date +%F).dump`. The dump holds the users' password hashes, keep it private.
2. **Deploy**: push `staging` (`main` for production). The migrations run during the build. From here until step 4 is done, the map shows nothing for the old IDs.
3. **Upload the Sahel region cover** in the CMS, put its filename in the `cover` of `app-initial-data/regions.json` and commit it. The seed resolves covers by filename and clears every cover missing from the files, so an upload without the commit is undone by the next seed.
4. **Rename, then seed**, from `app/` with a `.env.<env>` file holding the `DATABASE_URI` of the app, each script with `--dry-run` first:

   ```bash
   pnpm data:migrate-region-ids:<env> --dry-run   # WM-98: renames every Sahel ID in place, idempotent
   pnpm data:migrate-region-ids:<env>
   pnpm data:seed:<env> --dry-run
   pnpm data:seed:<env>
   ```

   On the staging backup of 21 October 2026 the rename changes 17090 rows and the seed writes 6348 rows with no orphan. An orphan listed by the seed is content of the database that the files don't have: find out where it comes from before running with `--delete-orphans`.

5. **Smoke test**: the map with `?region=sahel`, every category, the indicator charts, in English and French; the landscapes list and one landscape with its steps and map layers; the CMS still refuses to edit the seeded collections. There is no cache to revalidate: the pages read the collections through the API on every request.

Then WM-116, the QA on staging, before repeating on production.
