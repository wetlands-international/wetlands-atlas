# ============================
# 🛠️ Build Stage for Node.js
# ============================
FROM node:18-slim AS node-build

# Install pnpm
RUN npm install -g pnpm

# Copy and build Node.js app
WORKDIR /app
COPY nodeapp/ ./
RUN pnpm install --frozen-lockfile && pnpm build

# ============================
# 🐍 Build Stage for Titiler
# ============================
FROM python:3.11-slim AS python-build

# Install GDAL and compiler dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        g++ \
        gcc \
        libgdal-dev \
        build-essential \
        && rm -rf /var/lib/apt/lists/*

# Set env vars for rasterio/GDAL
ENV CPLUS_INCLUDE_PATH=/usr/include/gdal
ENV C_INCLUDE_PATH=/usr/include/gdal

# Install Python dependencies
WORKDIR /titiler
COPY titiler/ ./
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# ============================
# 🧼 Final Production Stage
# ============================
FROM python:3.11-slim AS final

# Install only minimal runtime deps
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        nginx supervisor curl nodejs npm && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Add pnpm for running Node app
RUN npm install -g pnpm

# Install only runtime Python deps for Titiler
COPY --from=python-build /usr/local/lib/python3.11 /usr/local/lib/python3.11
COPY --from=python-build /usr/local/bin /usr/local/bin
COPY --from=python-build /titiler /titiler

# Copy built Node app
COPY --from=node-build /app /nodeapp

# Copy config files
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY supervisord.conf /etc/supervisord.conf

# Set env vars
ENV PORT=80
EXPOSE 80

# Start all services
CMD ["supervisord", "-c", "/etc/supervisord.conf"]
