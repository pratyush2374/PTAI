# Stage 1: Install dependencies and build the app
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Install dependencies first (for caching)
COPY package.json package-lock.json ./  
RUN npm ci --include=dev

# Copy the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create the production image
FROM node:20-alpine AS runner

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=3000

# Set the working directory
WORKDIR /app

# Copy only the necessary files from standalone build
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose the port
EXPOSE 3000

# Run the standalone server directly
CMD ["node", "server.js"]