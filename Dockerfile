# ---- Builder Stage ----
FROM node:22.12-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json ./
# If package-lock.json exists, copy it too
# COPY package-lock.json ./

# Install all dependencies (including devDependencies for build)
# Using --mount for caching
RUN --mount=type=cache,target=/root/.npm npm install

# Copy source code
COPY tsconfig.json ./
COPY src ./src

# Build the project
RUN npm run build

# ---- Release Stage ----
FROM node:22-alpine AS release

WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy package.json for installing production dependencies
COPY package.json ./
# If package-lock.json exists, copy it too
# COPY package-lock.json ./

# Install only production dependencies
# Using --mount for caching
RUN --mount=type=cache,target=/root/.npm npm install --production --omit=dev

# Copy built artifacts from builder stage
COPY --from=builder /app/dist ./dist

# Expose port if needed (though MCP server uses stdio)
# EXPOSE 3000 

# Run the compiled JavaScript application
ENTRYPOINT ["node", "dist/index.js"]
