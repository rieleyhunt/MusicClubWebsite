# Lightweight Node image
FROM node:20-alpine

# Workdir inside the container
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install all dependencies (including dev dependencies for building)
RUN npm ci

# Copy the source code
COPY . .

# Build the frontend
RUN npm run build

# Remove dev dependencies to reduce image size
RUN npm prune --production

# Expose the port your app listens on
EXPOSE 3001

# Start the server
CMD ["npm", "start"]
