# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy files of dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build for the web with Expo
RUN npx expo export --platform web

# Production stage
FROM nginx:alpine

# Install wget for healthcheck
RUN apk add --no-cache wget

# Copy configuration nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy builded files (Expo generates in dist/)
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]