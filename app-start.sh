#!/bin/bash

export PORT=${PORT:-80}
envsubst '\$PORT' < /etc/nginx/nginx.template.conf > /etc/nginx/nginx.conf

export NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-http://localhost}
envsubst '\$NEXT_PUBLIC_API_URL' < /etc/supervisord.template.conf > /etc/supervisord.conf

cat /etc/nginx/nginx.conf
cat /etc/supervisord.conf
echo "Starting supervisord..."
supervisord -c /etc/supervisord.conf