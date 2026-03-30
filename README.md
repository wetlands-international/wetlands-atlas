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
