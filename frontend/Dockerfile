FROM node:20-alpine 

WORKDIR /frontend

ENV NODE_ENV production

# Install curl
RUN apk --no-cache add curl

# Copy package.json and package-lock.json
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application using the standalone server
CMD ["npm", "run", "start"]