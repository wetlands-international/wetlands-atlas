#!/bin/bash
# Local docker build + run helper. Never hardcode secrets here: this repo is public.
# Expects PAYLOAD_SECRET, DATABASE_URI and NEXT_PUBLIC_MAPBOX_TOKEN in the environment,
# e.g.  set -a; source app/.env; set +a; ./test.sh
set -euo pipefail

: "${PAYLOAD_SECRET:?set PAYLOAD_SECRET}"
: "${DATABASE_URI:?set DATABASE_URI}"
: "${NEXT_PUBLIC_MAPBOX_TOKEN:?set NEXT_PUBLIC_MAPBOX_TOKEN}"

docker buildx build --platform=linux/amd64 \
    --build-arg PAYLOAD_SECRET="$PAYLOAD_SECRET" \
    --build-arg DATABASE_URI="$DATABASE_URI" \
    --build-arg NEXT_PUBLIC_MAPBOX_TOKEN="$NEXT_PUBLIC_MAPBOX_TOKEN" \
    --build-arg NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_API_URL:-http://localhost}" \
    -t wetlands . && docker rm -f wetlands-container && docker run -d --name wetlands-container -p 80:80 wetlands
