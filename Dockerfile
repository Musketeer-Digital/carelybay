# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Set environment variable for MongoDB connection (for build stage)
ARG MONGODB_URL
ENV MONGODB_URL=$MONGODB_URL

# Generate Prisma Client
RUN pnpm prisma generate

# Build the Next.js application
RUN pnpm build

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Stage 2: Run the application (Only copy required files)
FROM node:18-alpine

WORKDIR /app

# Install pnpm globally again for runtime
RUN npm install -g pnpm

# Copy only the necessary runtime files from the builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# COPY --from=builder /app/prisma ./prisma # Prisma schema required for migrations

# Set environment variable for MongoDB connection (for runtime)
ENV MONGODB_URL=$MONGODB_URL

EXPOSE 3000

# Start the Next.js application
CMD ["pnpm", "start"]