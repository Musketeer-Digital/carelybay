# Stage 1: Build the application
FROM node:23-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

RUN npm install -g pnpm
# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Stage 2: Run the application
FROM node:23-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy built files from the builder stage
COPY --from=builder /app ./

RUN npm install -g pnpm
# Expose the port on which the app will run
EXPOSE 3000

# Start the application
CMD ["pnpm", "dev"]

