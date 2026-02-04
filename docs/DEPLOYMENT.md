# EverythingBeer Deployment Guide

## Overview

EverythingBeer is deployed using Docker containers on an IONOS VPS with nginx as a reverse proxy and GitHub Actions for CI/CD.

## Infrastructure

- **Hosting**: IONOS VPS
- **Server IP**: 74.208.129.33
- **Container Port**: 8096 (internal: 3000)
- **Reverse Proxy**: nginx
- **CI/CD**: GitHub Actions

## Local Development

### Prerequisites
- Node.js 20+
- npm

### Running Locally
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Access at http://localhost:3001
```

### Building Locally
```bash
# Create production build
npm run build

# Start production server
npm start
```

## Docker Deployment

### Building Docker Image
```bash
# Build the image
docker build -t everythingbeer .

# Or use docker-compose
docker-compose build
```

### Running with Docker Compose
```bash
# Start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

### Docker Configuration

**Dockerfile** (Multi-stage build):
```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package*.json ./
RUN npm ci
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache libc6-compat curl
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
RUN chown -R nextjs:nodejs /app
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

**docker-compose.yml**:
```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: everythingbeer-app
    ports:
      - "8096:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

## CI/CD Pipeline

### GitHub Actions Workflow

The pipeline runs on push to `main` or `master` branches:

1. **Code Quality** - Runs ESLint and TypeScript checks
2. **Build Check** - Verifies the application builds successfully
3. **Deploy** - SSH to server and deploy using Docker

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `SERVER_HOST` | VPS IP address (74.208.129.33) |
| `SERVER_USER` | SSH username (root or deploy) |
| `SSH_PRIVATE_KEY` | Private SSH key for authentication |

### Setting Up Secrets

1. Go to GitHub repository settings
2. Navigate to Secrets and Variables > Actions
3. Add each required secret

### Deployment Script

The CI/CD pipeline executes:
```bash
cd /home/deploy/apps/EverythingBeer
/home/deploy/scripts/cicd/deploy-static.sh /home/deploy/apps/EverythingBeer
```

## nginx Configuration

### Current Setup (IP-based path routing)

Access via: `http://74.208.129.33/everythingbeer/`

```nginx
server {
    listen 80 default_server;
    server_name _;

    location /everythingbeer/ {
        rewrite ^/everythingbeer/(.*)$ /$1 break;
        proxy_pass http://127.0.0.1:8096;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /_next/ {
        proxy_pass http://127.0.0.1:8096;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

### Future Setup (Domain-based)

When domain is configured:

```nginx
server {
    listen 80;
    server_name www.everythingbeer.com everythingbeer.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name www.everythingbeer.com everythingbeer.com;

    ssl_certificate /etc/letsencrypt/live/everythingbeer.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/everythingbeer.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:8096;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Server Management

### SSH Access
```bash
ssh root@74.208.129.33
```

### Docker Commands on Server
```bash
# View running containers
docker ps

# View container logs
docker logs everythingbeer-app

# Restart container
docker restart everythingbeer-app

# Rebuild and restart
cd /home/deploy/apps/EverythingBeer
docker-compose down
docker-compose up -d --build
```

### nginx Commands
```bash
# Test configuration
nginx -t

# Reload configuration
systemctl reload nginx

# View error logs
tail -f /var/log/nginx/error.log
```

## Troubleshooting

### Container not starting
```bash
docker logs everythingbeer-app
```

### Port already in use
```bash
# Check what's using the port
lsof -i :8096

# Kill the process if needed
kill -9 <PID>
```

### nginx 502 Bad Gateway
- Check if container is running: `docker ps`
- Check container logs: `docker logs everythingbeer-app`
- Verify port mapping in docker-compose.yml

### Build failures
- Check Node.js version (requires 20+)
- Clear .next cache: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && npm ci`
