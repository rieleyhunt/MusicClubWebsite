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

# Remove dev dependencies to reduce image size
RUN npm prune --omit=dev

# Expose the port the app listens on
EXPOSE 3001

# Start the server
CMD ["npm", "start"]
