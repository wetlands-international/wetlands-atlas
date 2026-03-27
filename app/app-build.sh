#!/bin/bash

set -e  # Exit on any command failure

echo "Running database migrations..."
yes | npx payload migrate
pnpm build