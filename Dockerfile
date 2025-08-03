# Lightweight Node image
FROM node:20-alpine

# Workdir inside the container
WORKDIR /app

# Install only production deps
COPY package*.json ./
RUN npm ci --only=production

# Copy the rest of the code
COPY . .

# Expose the port your app listens on
EXPOSE 3001

# Start the server
CMD ["npm", "start"]
