# Use the official Node.js 20 Alpine image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /frontend

# Install curl (if needed)
RUN apk --no-cache add curl

# Copy package.json and package-lock.json to the working directory
COPY package.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
