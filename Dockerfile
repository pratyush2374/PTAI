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

# Copy the built application from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Expose the port
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]
