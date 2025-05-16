# ============================
# 🛠️ Build Stage for Node.js
# ============================
FROM node:22-bookworm-slim AS node-build

ARG PAYLOAD_SECRET
ARG DATABASE_URI
ARG NEXT_PUBLIC_MAPBOX_TOKEN
ARG NEXT_PUBLIC_API_URL=http://localhost
ARG NODE_ENV=production

ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV DATABASE_URI=$DATABASE_URI
ENV NEXT_PUBLIC_MAPBOX_TOKEN=$NEXT_PUBLIC_MAPBOX_TOKEN
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NODE_ENV=$NODE_ENV

# Install pnpm
RUN npm install -g pnpm

# Copy and build Node.js app
WORKDIR /app
COPY app/ ./

# Install dependencies and rebuild native modules
RUN pnpm install --frozen-lockfile

COPY app/app-build.sh ./
RUN chmod +x ./app-build.sh
RUN "./app-build.sh"

RUN pnpm heroku-cleanup
RUN pnpm prune --prod --ignore-scripts

# ============================
# 🐍 Build Stage for tiler
# ============================
FROM python:3.11-slim AS python-build

# Install Python dependencies
WORKDIR /tiler
COPY tiler/ ./
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# ============================
# 🧼 Final Production Stage
# ============================
FROM python:3.11-slim AS final

ARG PAYLOAD_SECRET
ARG DATABASE_URI
ARG NEXT_PUBLIC_MAPBOX_TOKEN
ARG NEXT_PUBLIC_API_URL=http://localhost
ARG NODE_ENV=production

ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV DATABASE_URI=$DATABASE_URI
ENV NEXT_PUBLIC_MAPBOX_TOKEN=$NEXT_PUBLIC_MAPBOX_TOKEN
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NODE_ENV=$NODE_ENV


# Install only minimal runtime deps
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        nginx supervisor curl gettext && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install only runtime Python deps for tiler
COPY --from=python-build /usr/local/lib/python3.11 /usr/local/lib/python3.11
COPY --from=python-build /usr/local/bin /usr/local/bin
COPY --from=python-build /tiler /tiler

# Copy Node & npm from node-runtime
COPY --from=node-build /usr/local/bin/node /usr/local/bin/node

# Copy built Node app
COPY --from=node-build /app /app
COPY --from=node-build /app/.next/static /app/.next/standalone/.next/static

# Copy config files
COPY nginx/nginx.conf /etc/nginx/nginx.template.conf
COPY supervisord.conf /etc/supervisord.template.conf

COPY app-start.sh ./
RUN chmod +x ./app-start.sh

CMD ["./app-start.sh"]