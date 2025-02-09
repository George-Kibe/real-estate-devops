# Use the official Node.js 20 Alpine image
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the app and build Next.js
COPY . .
RUN npm run build

# Start a new stage to keep the final image small
FROM node:20-alpine

WORKDIR /app

# Copy only the built files from the previous stage
COPY --from=builder /app ./

# Expose the Next.js port
EXPOSE 3000

# Start the Next.js production server
CMD ["npm", "run", "start"]
