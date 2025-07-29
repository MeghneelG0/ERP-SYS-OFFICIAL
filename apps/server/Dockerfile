# Use Node.js LTS version
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy all package.json files first for better caching
COPY packages/db/package.json ./packages/db/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/types/package.json ./packages/types/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY apps/server/package.json ./apps/server/package.json

# Install all dependencies
RUN pnpm install

# Copy source code
COPY . .

# Generate Prisma client
RUN pnpm --filter=@repo/db db:generate

# Build the server
RUN pnpm --filter=server build

# Production stage - simplified approach
FROM node:20-alpine AS production
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy everything from build stage first
COPY --from=base /app ./

# Remove non-production files to reduce size
RUN rm -rf apps/web apps/server/src packages/*/src

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

# Set working directory to server
WORKDIR /app/apps/server

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "dist/main.js"]
