#!/bin/bash

set -e  # Exit on any command failure
trap 'on_error' ERR

function on_error {
    echo "Docker build failed. Rolling back database..."
    npx payload migrate:down
    exit 1
}

echo "Running database migrations..."
yes | npx payload migrate
pnpm build