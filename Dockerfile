# ============================
# 🛠️ Build Stage for Node.js
# ============================
FROM node:22.23.2-bookworm-slim AS node-build

ARG PAYLOAD_SECRET
ARG PREVIEW_SECRET
ARG DATABASE_URI
ARG NEXT_PUBLIC_MAPBOX_TOKEN
ARG NEXT_PUBLIC_TILER_URL
ARG NEXT_PUBLIC_API_URL=http://localhost
ARG NODE_ENV=production
ARG GCS_PROJECT_ID
ARG GCS_BUCKET_NAME
ARG GCS_SERVICE_ACCOUNT_KEY

ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV PREVIEW_SECRET=$PREVIEW_SECRET
ENV DATABASE_URI=$DATABASE_URI
ENV NEXT_PUBLIC_MAPBOX_TOKEN=$NEXT_PUBLIC_MAPBOX_TOKEN
ENV NEXT_PUBLIC_TILER_URL=$NEXT_PUBLIC_TILER_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NODE_ENV=$NODE_ENV
ENV GCS_PROJECT_ID=$GCS_PROJECT_ID
ENV GCS_BUCKET_NAME=$GCS_BUCKET_NAME
ENV GCS_SERVICE_ACCOUNT_KEY=$GCS_SERVICE_ACCOUNT_KEY

# Install pnpm (keep in sync with "packageManager" in app/package.json)
RUN npm install -g pnpm@10.34.6

# Copy and build Node.js app
WORKDIR /app
COPY app/ ./

# Install dependencies and rebuild native modules
RUN pnpm install --frozen-lockfile
RUN pnpm generate:importmap

COPY app/app-build.sh ./
RUN chmod +x ./app-build.sh
RUN "./app-build.sh"

RUN pnpm heroku-cleanup
RUN pnpm prune --prod --ignore-scripts

# ============================
# 🐍 Build Stage for tiler
# ============================
FROM python:3.13-slim AS python-build

# Install uv (keep in sync with the uv version used locally)
COPY --from=ghcr.io/astral-sh/uv:0.13.5 /uv /bin/uv

# Use the Python of the image, compile the bytecode, keep no cache in the layer
ENV UV_PYTHON_DOWNLOADS=never \
    UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy \
    UV_NO_CACHE=1

# Install the tiler from its lockfile into /tiler/.venv
WORKDIR /tiler
COPY tiler/ ./
RUN uv sync --locked --no-dev

# ============================
# 🧼 Final Production Stage
# ============================
FROM python:3.13-slim AS final

ARG PAYLOAD_SECRET
ARG PREVIEW_SECRET
ARG DATABASE_URI
ARG NEXT_PUBLIC_MAPBOX_TOKEN
ARG NEXT_PUBLIC_TILER_URL
ARG NEXT_PUBLIC_API_URL=http://localhost
ARG NODE_ENV=production
ARG GCS_PROJECT_ID
ARG GCS_BUCKET_NAME
ARG GCS_SERVICE_ACCOUNT_KEY

ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV PREVIEW_SECRET=$PREVIEW_SECRET
ENV DATABASE_URI=$DATABASE_URI
ENV NEXT_PUBLIC_MAPBOX_TOKEN=$NEXT_PUBLIC_MAPBOX_TOKEN
ENV NEXT_PUBLIC_TILER_URL=$NEXT_PUBLIC_TILER_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NODE_ENV=$NODE_ENV
ENV GCS_PROJECT_ID=$GCS_PROJECT_ID
ENV GCS_BUCKET_NAME=$GCS_BUCKET_NAME
ENV GCS_SERVICE_ACCOUNT_KEY=$GCS_SERVICE_ACCOUNT_KEY

# Install only minimal runtime deps
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        nginx supervisor curl gettext && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy the tiler with its virtualenv
COPY --from=python-build /tiler /tiler

# Copy Node & npm from node-runtime
COPY --from=node-build /usr/local/bin/node /usr/local/bin/node

# Copy built Node app
COPY --from=node-build /app /app
COPY --from=node-build /app/.next/static /app/.next/standalone/.next/static
COPY --from=node-build /app/public /app/.next/standalone/public

# Copy config files
COPY nginx/nginx.conf /etc/nginx/nginx.template.conf
COPY supervisord.conf /etc/supervisord.template.conf

COPY app-start.sh ./
RUN chmod +x ./app-start.sh

CMD ["./app-start.sh"]
