# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy files of dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build for the web with Expo
RUN npm run build:web

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production --legacy-peer-deps && npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]