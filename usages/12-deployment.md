# Deployment Guide

This guide covers deploying EZ-Console applications to production.

## Build Process

### Backend Build

```bash
cd backend
go build -o server main.go
```

With optimizations:

```bash
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build \
  -ldflags="-w -s" \
  -o server main.go
```

### Frontend Build

```bash
cd web
pnpm build
```

This creates a `dist` directory with optimized static files.

## Deployment Methods

### 1. Standalone Binary

Deploy as a single executable:

```bash
# Copy binary
cp backend/server /opt/myapp/server

# Copy config
cp config.yml /etc/myapp/config.yml

# Copy frontend build (if serving from Go)
cp -r web/dist /opt/myapp/static

# Run
/opt/myapp/server \
  --global.encrypt-key=your-encrypt-key \
  --config=/etc/myapp/config.yml
```

### 2. Docker

Create `Dockerfile`:

```dockerfile
# Backend
FROM golang:1.20-alpine AS backend-builder
WORKDIR /app
COPY backend/go.* ./
RUN go mod download
COPY backend/ ./
RUN CGO_ENABLED=0 go build -ldflags="-w -s" -o server main.go

# Frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app
COPY web/package*.json ./
RUN npm install -g pnpm && pnpm install
COPY web/ ./
RUN pnpm build

# Final image
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /app
COPY --from=backend-builder /app/server ./
COPY --from=frontend-builder /app/dist ./static
EXPOSE 8080
CMD ["./server", "--global.encrypt-key=${ENCRYPT_KEY}"]
```

Build and run:

```bash
docker build -t myapp:latest .
docker run -d \
  -p 8080:8080 \
  -e ENCRYPT_KEY=your-encrypt-key \
  -v /path/to/config.yml:/app/config.yml \
  -v /path/to/data:/app/data \
  myapp:latest
```

### 3. Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - GLOBAL_ENCRYPT_KEY=${ENCRYPT_KEY}
      - DATABASE_DRIVER=mysql
      - DATABASE_HOST=db
      - DATABASE_USERNAME=root
      - DATABASE_PASSWORD=${DB_PASSWORD}
      - DATABASE_SCHEMA=myapp
    depends_on:
      - db
    volumes:
      - ./config.yml:/app/config.yml
      - ./uploads:/app/uploads
    restart: unless-stopped

  db:
    image: mysql:8
    environment:
      - MYSQL_ROOT_PASSWORD=${DB_PASSWORD}
      - MYSQL_DATABASE=myapp
    volumes:
      - db-data:/var/lib/mysql
    restart: unless-stopped

volumes:
  db-data:
```

Run:

```bash
ENCRYPT_KEY=your-key DB_PASSWORD=secure-password docker-compose up -d
```

### 4. Kubernetes

Create Kubernetes manifests:

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:latest
        ports:
        - containerPort: 8080
        env:
        - name: GLOBAL_ENCRYPT_KEY
          valueFrom:
            secretKeyRef:
              name: myapp-secrets
              key: encrypt-key
        - name: DATABASE_PASSWORD
          valueFrom:
            secretKeyRef:
              name: myapp-secrets
              key: db-password
        volumeMounts:
        - name: config
          mountPath: /app/config.yml
          subPath: config.yml
      volumes:
      - name: config
        configMap:
          name: myapp-config
---
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp
spec:
  selector:
    app: myapp
  ports:
  - port: 80
    targetPort: 8080
  type: LoadBalancer
```

## Reverse Proxy Setup

### Nginx

```nginx
server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Frontend
    location / {
        root /var/www/myapp;
        try_files $uri $uri/ /index.html;
    }

    # API
    location /api {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # WebSocket support (if needed)
    location /ws {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

### Traefik

```yaml
# docker-compose.yml with Traefik
version: '3.8'

services:
  traefik:
    image: traefik:v2.9
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443"
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock

  app:
    build: .
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.app.rule=Host(`example.com`)"
      - "traefik.http.routers.app.entrypoints=websecure"
      - "traefik.http.routers.app.tls=true"
```

## Database Setup

### MySQL Production Setup

```sql
-- Create database
CREATE DATABASE myapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user
CREATE USER 'myapp'@'%' IDENTIFIED BY 'secure-password';
GRANT ALL PRIVILEGES ON myapp.* TO 'myapp'@'%';
FLUSH PRIVILEGES;
```

Configuration:

```yaml
database:
  driver: "mysql"
  host: "db.example.com"
  port: 3306
  username: "myapp"
  password: "${DATABASE_PASSWORD}"
  schema: "myapp"
  max_open_connections: 100
  max_idle_connections: 10
```

### PostgreSQL Production Setup

```sql
-- Create database
CREATE DATABASE myapp WITH ENCODING 'UTF8';

-- Create user
CREATE USER myapp WITH PASSWORD 'secure-password';
GRANT ALL PRIVILEGES ON DATABASE myapp TO myapp;
```

## Environment Variables

Create `.env` file:

```bash
# Global
GLOBAL_ENCRYPT_KEY=your-32-byte-encryption-key-here

# Server
SERVER_HOST=0.0.0.0
SERVER_PORT=8080
SERVER_MODE=release

# Database
DATABASE_DRIVER=mysql
DATABASE_HOST=db.example.com
DATABASE_PORT=3306
DATABASE_USERNAME=myapp
DATABASE_PASSWORD=secure-db-password
DATABASE_SCHEMA=myapp

# Logging
LOG_LEVEL=info
LOG_FORMAT=json
```

## Systemd Service

Create `/etc/systemd/system/myapp.service`:

```ini
[Unit]
Description=My Console Application
After=network.target mysql.service

[Service]
Type=simple
User=myapp
Group=myapp
WorkingDirectory=/opt/myapp
EnvironmentFile=/etc/myapp/environment
ExecStart=/opt/myapp/server --config=/etc/myapp/config.yml
Restart=on-failure
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl enable myapp
sudo systemctl start myapp
sudo systemctl status myapp
```

## Monitoring

### Health Check Endpoint

```go
func (c *SystemController) Health(ctx *gin.Context) {
	util.RespondWithSuccess(ctx, http.StatusOK, map[string]string{
		"status": "ok",
	})
}

// Register
router.GET("/health", c.Health)
```

### Prometheus Metrics

Use built-in Prometheus support:

```go
import "github.com/prometheus/client_golang/prometheus/promhttp"

router.GET("/metrics", gin.WrapH(promhttp.Handler()))
```

## Backup

### Database Backup

MySQL:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -h db.example.com -u myapp -p myapp > backup_$DATE.sql
gzip backup_$DATE.sql
```

PostgreSQL:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -h db.example.com -U myapp myapp > backup_$DATE.sql
gzip backup_$DATE.sql
```

### File Backup

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf uploads_backup_$DATE.tar.gz /opt/myapp/uploads
```

## Security Checklist

- [ ] Use HTTPS in production
- [ ] Set strong encryption key (32 bytes)
- [ ] Use strong database passwords
- [ ] Enable firewall
- [ ] Set proper file permissions
- [ ] Keep dependencies updated
- [ ] Enable audit logging
- [ ] Configure rate limiting
- [ ] Use secure session settings
- [ ] Enable MFA for admin accounts
- [ ] Regular security updates
- [ ] Regular backups

## Performance Optimization

### Database

- Add indexes on frequently queried fields
- Use connection pooling
- Enable query caching
- Regular VACUUM (PostgreSQL)

### Application

- Enable gzip compression
- Use CDN for static files
- Enable HTTP/2
- Optimize database queries
- Use caching where appropriate

### Monitoring

- Set up application monitoring (Prometheus, Grafana)
- Set up log aggregation (ELK stack)
- Set up alerting (PagerDuty, Slack)

## Troubleshooting

### Application Won't Start

- Check logs: `journalctl -u myapp -n 50`
- Verify config file
- Check database connectivity
- Verify port availability

### Database Connection Issues

- Verify credentials
- Check network connectivity
- Verify firewall rules
- Check database server status

### Performance Issues

- Check database slow query log
- Monitor resource usage
- Review application logs
- Check for N+1 queries

## Next Steps

- Review [Configuration Guide](./05-configuration.md)
- Explore [Advanced Topics](./13-advanced-topics.md)
- Check [Troubleshooting](./14-troubleshooting.md)



