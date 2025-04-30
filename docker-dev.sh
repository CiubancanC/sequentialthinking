#!/bin/bash

# Stop any existing container
echo "Stopping any existing fidora container..."
docker stop fidora 2>/dev/null || true

# Build the development image
echo "Building development Docker image..."
docker build -t fidora-dev:latest -f Dockerfile.dev .

# Run the container with volume mounts for hot reloading
echo "Starting development container with hot reloading..."
docker run --name fidora \
  --rm -i \
  -v "$(pwd)/src:/app/src" \
  -v "$(pwd)/dist:/app/dist" \
  -v "$(pwd)/package.json:/app/package.json" \
  -v "$(pwd)/tsconfig.json:/app/tsconfig.json" \
  -v "$(pwd)/nodemon.json:/app/nodemon.json" \
  -v "$(pwd)/nodemon.ts.json:/app/nodemon.ts.json" \
  fidora-dev:latest

echo "Container stopped."
