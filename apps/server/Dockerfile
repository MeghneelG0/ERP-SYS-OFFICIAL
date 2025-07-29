# Use Node.js LTS version
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy root package configuration files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# Copy package.json files for dependency installation (only existing packages)
COPY packages/db/package.json ./packages/db/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/types/package.json ./packages/types/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY apps/server/package.json ./apps/server/package.json

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Generate Prisma client
RUN pnpm --filter=@repo/db db:generate

# Build the server
RUN pnpm --filter=server build

# Production stage
FROM node:20-alpine AS production
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy workspace configuration files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy ALL package.json files needed for workspace resolution
COPY packages/db/package.json ./packages/db/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/types/package.json ./packages/types/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY apps/server/package.json ./apps/server/package.json

# Install production dependencies
RUN pnpm install --prod --frozen-lockfile

# Copy built application and Prisma client
COPY --from=base /app/apps/server/dist ./apps/server/dist
COPY --from=base /app/packages/db ./packages/db
COPY --from=base /app/node_modules/.prisma ./node_modules/.prisma

# Set working directory to server
WORKDIR /app/apps/server

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "dist/main.js"]
