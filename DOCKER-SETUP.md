# Docker Development Setup

This document explains how to use Docker for development with hot reloading.

## Quick Start

The easiest way to start the development environment is to use the provided shell script:

```bash
./docker-dev.sh
```

This script will:
1. Stop any existing fidora container
2. Build the development Docker image
3. Run the container with volume mounts for hot reloading

## Manual Docker Commands

If you prefer to run the commands manually:

### Build the development image

```bash
npm run docker:dev:build
```

or directly:

```bash
docker build -t fidora-dev:latest -f Dockerfile.dev .
```

### Run the development container

```bash
npm run docker:dev:run
```

or directly:

```bash
docker run --name fidora --rm -i \
  -v "$(pwd)/src:/app/src" \
  -v "$(pwd)/dist:/app/dist" \
  fidora-dev:latest
```

### Stop the container

```bash
npm run docker:dev:stop
```

or directly:

```bash
docker stop fidora
```

## How Hot Reloading Works

The development setup uses nodemon to watch for changes in your source files. When you modify a file in the `src` directory:

1. nodemon detects the change
2. It executes the TypeScript files directly using ts-node
3. Your changes are immediately reflected without needing to rebuild

## Troubleshooting

If you encounter issues with hot reloading:

1. Check the container logs: `docker logs -f fidora`
2. Ensure your volume mounts are correct
3. Try rebuilding the image: `npm run docker:dev:build`
4. Restart the container: `npm run docker:dev`
