# Configuration Guide

This guide covers all configuration options for EZ-Console applications.

## Configuration Methods

EZ-Console supports three configuration methods (in order of precedence):

1. **Command-line Arguments** (highest priority)
2. **Environment Variables**
3. **Configuration File** (lowest priority)

## Configuration File

### Basic Configuration File

Create `config.yml` in your project root:

```yaml
# Server configuration
server:
  host: "0.0.0.0"
  port: 8080
  mode: "debug"  # debug or release
  read_timeout: 10s
  write_timeout: 10s
  shutdown_timeout: 10s
  file_upload_path: "./uploads"
  max_upload_size: 10485760  # 10MB in bytes
  geoip_db_path: "./dist/GeoLite2-City.mmdb"  # Optional

# Database configuration
database:
  driver: "sqlite"  # sqlite, mysql, or postgresql
  path: "ez-console.db"  # For SQLite only
  table_prefix: "t_"
  slow_threshold: "3s"

# JWT configuration
jwt:
  secret: "your-jwt-secret-key"  # Auto-generated if not provided
  expiration: "24h"

# Cache configuration
cache:
  size: 1000  # Number of entries

# Tracing configuration (optional)
tracing:
  enabled: false
  service_name: "ez-console"
  exporter: "stdout"  # stdout, jaeger, zipkin, otlp
```

### Database Configurations

#### SQLite (Default)

```yaml
database:
  driver: "sqlite"
  path: "ez-console.db"
  table_prefix: "t_"
  slow_threshold: "3s"
```

#### MySQL

```yaml
database:
  driver: "mysql"
  host: "localhost"
  port: 3306
  username: "root"
  password: "your-password"
  schema: "ez_console"
  charset: "utf8mb4"
  collation: "utf8mb4_unicode_ci"
  max_open_connections: 100
  max_idle_connections: 10
  max_connection_life_time: "30s"
  table_prefix: "t_"
  slow_threshold: "3s"
```

#### PostgreSQL

```yaml
database:
  driver: "postgres"
  host: "localhost"
  port: 5432
  username: "postgres"
  password: "your-password"
  schema: "ez_console"
  max_open_connections: 100
  max_idle_connections: 10
  max_connection_life_time: "30s"
  table_prefix: "t_"
  slow_threshold: "3s"
```

### OAuth Configuration

```yaml
oauth:
  enabled: true
  providers:
    - name: "google"
      display_name: "Google"
      client_id: "your-client-id"
      client_secret: "your-client-secret"
      icon_url: "https://example.com/google-icon.png"
      token_url: "https://oauth2.googleapis.com/token"
      auth_url: "https://accounts.google.com/o/oauth2/v2/auth"
      user_info_url: "https://www.googleapis.com/oauth2/v2/userinfo"
      redirect_url: "http://localhost:5173/login?provider=google"
      role_field: "role"  # Field in user info that contains role
      
    - name: "azure_ad"
      display_name: "Azure AD"
      client_id: "your-client-id"
      client_secret: "your-client-secret"
      icon_url: "https://example.com/azure-icon.png"
      token_url: "https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token"
      auth_url: "https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize"
      user_info_url: "https://graph.microsoft.com/v1.0/me"
      redirect_url: "http://localhost:5173/login?provider=azure_ad"
      role_field: "role"
```

### Tracing Configuration

```yaml
tracing:
  enabled: true
  service_name: "my-console-app"
  exporter: "otlp"  # stdout, jaeger, zipkin, otlp
  
  # For OTLP exporter
  otlp:
    endpoint: "http://localhost:4318"
    headers:
      api-key: "your-api-key"
  
  # For Jaeger exporter
  jaeger:
    endpoint: "http://localhost:14268/api/traces"
  
  # For Zipkin exporter
  zipkin:
    endpoint: "http://localhost:9411/api/v2/spans"
```

## Command-Line Arguments

### Running with Arguments

```bash
./server \
  --global.encrypt-key=your-encrypt-key \
  --server.port=9090 \
  --server.mode=release \
  --database.driver=mysql \
  --database.host=localhost \
  --database.username=root \
  --database.password=password \
  --log.level=info \
  --config=config.yml
```

### Available Arguments

#### Global Options

```bash
--global.encrypt-key=STRING    # Encryption key (8, 16, 24, or 32 bytes) [REQUIRED]
--config=PATH                  # Path to config file (default: ./config.yaml)
```

#### Server Options

```bash
--server.host=STRING           # Server host (default: "0.0.0.0")
--server.port=INT              # Server port (default: 8080)
--server.mode=STRING           # Server mode: debug|release (default: "release")
--server.root_url=STRING       # Server root URL
--server.read_timeout=DURATION # Read timeout (default: "10s")
--server.write_timeout=DURATION # Write timeout (default: "10s")
--server.shutdown_timeout=DURATION # Shutdown timeout (default: "10s")
--server.file_upload_path=PATH # File upload path (default: "./uploads")
--server.geoip_db_path=PATH    # GeoIP database path
```

#### Database Options

```bash
--database.driver=STRING           # Database driver: sqlite|mysql|postgres (default: "sqlite")
--database.path=PATH               # Database path (SQLite only, default: "ez-console.db")
--database.host=STRING             # Database host (default: "localhost")
--database.port=INT                # Database port
--database.username=STRING         # Database username (default: "root")
--database.password=STRING         # Database password
--database.schema=STRING           # Database schema/name
--database.charset=STRING          # Database charset (MySQL, default: "utf8mb4")
--database.collation=STRING        # Database collation (MySQL, default: "utf8mb4_unicode_ci")
--database.max_open_connections=INT # Max open connections (default: 100)
--database.max_idle_connections=INT # Max idle connections (default: 10)
--database.max_connection_life_time=DURATION # Max connection lifetime (default: "30s")
--database.table_prefix=STRING     # Table prefix (default: "t_")
--database.slow_threshold=DURATION # Slow query threshold (default: "3s")
```

#### Log Options

```bash
--log.level=STRING    # Log level: debug|info|warn|error (default: "info")
--log.format=STRING   # Log format: json|logfmt|lucy (default: "json")
--log.output=STRING   # Log output: stdout|file (default: "stdout")
--log.file=PATH       # Log file path (when output=file)
```

## Environment Variables

Environment variables follow the pattern `PREFIX_SECTION_KEY` in uppercase.

### Examples

```bash
# Server configuration
export SERVER_HOST="0.0.0.0"
export SERVER_PORT="8080"
export SERVER_MODE="release"

# Database configuration
export DATABASE_DRIVER="mysql"
export DATABASE_HOST="localhost"
export DATABASE_USERNAME="root"
export DATABASE_PASSWORD="password"
export DATABASE_SCHEMA="ez_console"

# Log configuration
export LOG_LEVEL="info"
export LOG_FORMAT="json"

# Global configuration
export GLOBAL_ENCRYPT_KEY="your-encrypt-key"
```

### Using .env File

Create a `.env` file in your project root:

```bash
# .env
SERVER_PORT=8080
SERVER_MODE=release
DATABASE_DRIVER=mysql
DATABASE_HOST=localhost
DATABASE_USERNAME=root
DATABASE_PASSWORD=password
LOG_LEVEL=info
GLOBAL_ENCRYPT_KEY=your-encrypt-key
```

Load environment variables before running:

```bash
export $(cat .env | xargs) && ./server
```

## Configuration Priority

When the same setting is defined in multiple places, the priority is:

1. Command-line arguments (highest)
2. Environment variables
3. Configuration file (lowest)

### Example

Given:
- Config file: `server.port: 8080`
- Environment: `SERVER_PORT=9090`
- Command-line: `--server.port=7070`

Result: Server runs on port `7070` (command-line wins)

## Security Configuration

### Encryption Key

The encryption key is used for encrypting sensitive data in the database:

```bash
# Must be 8, 16, 24, or 32 bytes
--global.encrypt-key=12345678        # 8 bytes
--global.encrypt-key=1234567890123456 # 16 bytes
```

**Important**: Do not change the encryption key after deployment, as existing encrypted data cannot be decrypted.

### JWT Configuration

JWT tokens are used for authentication:

```yaml
jwt:
  secret: "your-secret-key"  # Use a strong random string
  expiration: "24h"          # Token lifetime
```

### HTTPS Configuration

For production, run behind a reverse proxy (nginx, Apache) with HTTPS:

```yaml
server:
  root_url: "https://your-domain.com"
```

## System Settings

Some settings can be configured through the UI after deployment:

### Password Policies

- Minimum password length
- Password complexity requirements
- Password expiration days
- Password history (prevent reuse)

### MFA Settings

- MFA enforcement (global or per-user)
- TOTP configuration
- Email-based MFA

### Session Settings

- Session timeout
- Session idle timeout
- Maximum concurrent sessions

### Account Policies

- Account lockout threshold
- Account lockout duration
- Inactive account auto-disable

## Production Configuration Example

### Configuration File

```yaml
# config.production.yml
server:
  host: "0.0.0.0"
  port: 8080
  mode: "release"
  root_url: "https://console.example.com"
  read_timeout: 30s
  write_timeout: 30s
  shutdown_timeout: 30s
  file_upload_path: "/var/lib/ez-console/uploads"
  max_upload_size: 52428800  # 50MB
  geoip_db_path: "/var/lib/ez-console/GeoLite2-City.mmdb"

database:
  driver: "mysql"
  host: "db.example.com"
  port: 3306
  username: "ez_console"
  schema: "ez_console_prod"
  charset: "utf8mb4"
  collation: "utf8mb4_unicode_ci"
  max_open_connections: 200
  max_idle_connections: 20
  max_connection_life_time: "1m"
  table_prefix: "t_"
  slow_threshold: "5s"

cache:
  size: 10000

tracing:
  enabled: true
  service_name: "ez-console-prod"
  exporter: "otlp"
  otlp:
    endpoint: "https://otel-collector.example.com:4318"

oauth:
  enabled: true
  providers:
    - name: "company_sso"
      display_name: "Company SSO"
      client_id: "${OAUTH_CLIENT_ID}"
      client_secret: "${OAUTH_CLIENT_SECRET}"
      token_url: "https://sso.company.com/oauth/token"
      auth_url: "https://sso.company.com/oauth/authorize"
      user_info_url: "https://sso.company.com/oauth/userinfo"
      redirect_url: "https://console.example.com/login?provider=company_sso"
```

### Environment Variables

```bash
# /etc/ez-console/environment
DATABASE_PASSWORD=secure-database-password
OAUTH_CLIENT_SECRET=secure-oauth-secret
GLOBAL_ENCRYPT_KEY=very-secure-32-byte-encryption-key!!
```

### Systemd Service

```ini
# /etc/systemd/system/ez-console.service
[Unit]
Description=EZ Console Application
After=network.target mysql.service

[Service]
Type=simple
User=ez-console
Group=ez-console
WorkingDirectory=/opt/ez-console
EnvironmentFile=/etc/ez-console/environment
ExecStart=/opt/ez-console/server --config=/etc/ez-console/config.yml
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

## Debugging Configuration

### Enable Debug Mode

```bash
./server \
  --global.encrypt-key=12345678 \
  --server.mode=debug \
  --log.level=debug \
  --log.format=logfmt
```

### Database Query Logging

Set `slow_threshold` to `0` to log all queries:

```yaml
database:
  slow_threshold: "0s"  # Log all queries
```

### Check Configuration

The application logs the effective configuration on startup. Review logs to verify settings.

## Best Practices

1. **Never Commit Secrets**: Use environment variables for sensitive data
2. **Use Strong Encryption Keys**: Generate random 32-byte keys
3. **Rotate JWT Secrets**: Change JWT secrets periodically
4. **Enable Tracing**: Use tracing in production for observability
5. **Set Appropriate Timeouts**: Adjust based on your workload
6. **Configure Connection Pools**: Tune database connections for your traffic
7. **Use HTTPS**: Always use HTTPS in production
8. **Backup Configuration**: Keep backups of your configuration files
9. **Document Custom Settings**: Document any non-standard configuration
10. **Test Configuration**: Test configuration changes in staging first

## Troubleshooting

### Server Won't Start

- Check if port is already in use: `lsof -i :8080`
- Verify encryption key length (must be 8, 16, 24, or 32 bytes)
- Check database connectivity
- Review log files for error messages

### Database Connection Failed

- Verify database credentials
- Check network connectivity: `telnet db-host db-port`
- Ensure database exists and user has permissions
- Check firewall rules

### Configuration Not Applied

- Verify configuration file syntax (use YAML validator)
- Check configuration precedence (CLI > ENV > File)
- Review logs for configuration parsing errors
- Ensure correct paths for file-based settings

## Next Steps

- Learn about [Database & Models](./06-database-models.md)
- Explore [Authentication & Authorization](./07-auth-system.md)
- Review [Deployment Guide](./12-deployment.md)

