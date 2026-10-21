#!/bin/bash

set -e  # Exit on any command failure

echo "Running database migrations..."
yes | npx payload migrate 2>&1 | tee /tmp/migrate.log

# `payload migrate` can exit successfully without running at all, so the build also fails if it didn't report that
# it's done
if [ "${PIPESTATUS[1]}" -ne 0 ] || ! grep -q "Done\." /tmp/migrate.log; then
  echo "The database migrations didn't run."
  exit 1
fi

pnpm build
