# Configuration Guide

This guide covers all configuration options for EZ-Console applications.

## Configuration Methods

EZ-Console supports three configuration methods (in order of precedence):

1. **Command-line Arguments** (highest priority)
2. **Environment Variables**
3. **Configuration File** (lowest priority)

## Configuration File

### Basic Configuration File

Create `config.yaml` (or `config.yml`) in your project root:

```yaml
# Server configuration
server:
  host: "0.0.0.0"
  port: 8080
  mode: "debug"  # debug or release
  read_timeout: 10s
  write_timeout: 10s
  shutdown_timeout: 10s
  # file_upload_path / skills_path accept a plain string (local directory),
  # a storage driver config map, or a compact CLI string
  # (driver=s3,bucket=ez,prefix="a,b"). Built-in drivers: local, db; the s3
  # driver is a separate module registered via blank import.
  # See usages/19-distributed-deployment.md ("Shared File Storage") for details.
  file_upload_path: "./uploads"
  # file_upload_path:
  #   driver: db          # store files in the database (multi-node without shared volume)
  #   namespace: uploads
  # file_upload_path:
  #   driver: s3          # requires: import _ "github.com/sven-victor/ez-console/pkg/storage/s3"
  #   endpoint: http://minio.internal:9000
  #   region: us-east-1
  #   bucket: ez-console
  #   access_key_id: "..."
  #   secret_access_key: "..."
  #   force_path_style: true
  skills_path: "./skills"  # Optional: path for skill files (defaults to file_upload_path + "/skills")
  skills_cache_path: "./skills-cache"  # Local cache for skill materialization (used only when skills_path is a remote driver)
  max_upload_size: 10485760  # 10MB in bytes
  geoip_db_path: "./dist/GeoLite2-City.mmdb"  # Optional
  # When rate limiting is on, set the reverse-proxy CIDRs so gin.ClientIP()
  # uses X-Forwarded-For. Empty means proxies are not trusted (warning logged).
  # trusted_proxies:
  #   - "10.0.0.0/8"
  #   - "192.168.0.0/16"
  compression:
    enabled: true          # HTTP request decompression + response compression (br/gzip)
    min_length: 1024       # skip compressing responses smaller than this (bytes)
    algorithms: [br, gzip] # preference order; intersected with Accept-Encoding

# HTTP rate limiting (infra). Runtime on/off is t_setting rate_limit_enabled.
# Policies here are compiled at startup (YAML layer); they are never upserted to DB.
rate_limit:
  enabled: true          # YAML master switch; UI can still disable via settings
  store: memory          # memory (default) or redis
  fail_open: true        # allow requests if the store errors (Redis down)
  # redis:               # optional; omitted uses cache.redis
  #   addr: "127.0.0.1:6379"
  #   # or host + port (same as --rate_limit.redis.host / --rate_limit.redis.port)
  #   # host: "127.0.0.1"
  #   # port: 6379
  #   password: ""
  #   db: 0
  #   prefix: "ez:"
  # policies:            # GitOps overlay on builtin defaults
  #   - subject_type: user
  #     rate: 60
  #     period: 1m
  #     burst: 20
  #     quota: 10000
  #     quota_period: 1d

# To move existing files onto another driver, use `storage migrate`
# (see usages/19-distributed-deployment.md, "Migrating between storage backends").

# Database configuration
# Supported drivers today: sqlite | mysql
database:
  driver: "sqlite"  # sqlite | mysql
  path: "ez-console.db"  # For SQLite only
  table_prefix: "t_"
  slow_threshold: "3s"

# Cluster (required when database.driver is not sqlite — see usages/19-distributed-deployment.md)
cluster:
  enabled: false

# JWT configuration (optional — auto-generated if not provided)
jwt:
  algorithm: "ES256"                    # Signing algorithm (e.g. ES256, RS256)
  private_key: "your-private-key-pem"   # PEM-encoded private key

# Cache configuration (optional; mostly unused by cache.Init today)
# Live path is in-process L1 + EventBus invalidation — see usages/20-caching.md
cache:
  driver: memory   # ignored by Init (historical: memory|db|redis)
  size: 1000       # ignored by Init (no max-entry cap on TypedCache)
  # redis:
  #   addr: "127.0.0.1:6379"
  #   # or host + port (same as --cache.redis.host / --cache.redis.port)
  #   # host: "127.0.0.1"
  #   # port: 6379
  #   password: ""
  #   db: 0
  #   prefix: "ez:"

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

Use MySQL for multi-node / production. You **must** set `cluster.enabled` explicitly when `driver` is not `sqlite` (see [Distributed Deployment](./19-distributed-deployment.md)).

> Drivers: only **`sqlite`** and **`mysql`** are wired in `pkg/config`. ClickHouse / PostgreSQL are not supported app DB drivers today.

### Cluster Configuration

```yaml
cluster:
  enabled: false          # required explicit value when database.driver != sqlite
  # gossip:
  #   bind_addr: "0.0.0.0"
  #   bind_port: 7946
  #   advertise_addr: "10.0.0.1"
  #   advertise_port: 7946
  #   join: ["10.0.0.2:7946"]
```

Full gossip / lease options: [Distributed Deployment](./19-distributed-deployment.md).

### OAuth Configuration

```yaml
oauth:
  enabled: true
  auto_create_user: false  # Automatically create users on first OAuth login
  providers:
    - name: "google"
      display_name: "Google"
      enabled: true
      client_id: "your-client-id"
      client_secret: "your-client-secret"
      icon_url: "https://example.com/google-icon.png"
      scopes: "openid,email,profile"
      token_url: "https://oauth2.googleapis.com/token"
      auth_url: "https://accounts.google.com/o/oauth2/v2/auth"
      user_info_url: "https://www.googleapis.com/oauth2/v2/userinfo"
      redirect_url: "http://localhost:5173/login?provider=google"
      email_field: "email"           # Field in user info for email
      username_field: "email"        # Field in user info for username
      full_name_field: "name"        # Field in user info for full name
      avatar_field: "picture"        # Field in user info for avatar URL
      role_field: "role"             # Field in user info for role
      role_mapping_mode: ""          # Role mapping mode (optional)
      wellknown_endpoint: ""         # OpenID Connect well-known endpoint (optional, auto-configures URLs)
      auto_create_user: false        # Per-provider override
      
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
--server.file_upload_path=PATH # File upload path (default: "./uploads"; or compact driver map: driver=s3,bucket=ez,prefix="a,b")
--server.skills_path=PATH      # Skills file path (default: "./skills"; same string-or-driver forms as file_upload_path)
--server.skills_cache_path=PATH # Local skill materialization cache (default: "./skills-cache")
--server.geoip_db_path=PATH    # GeoIP database path
--server.compression.enabled=BOOL # HTTP body compress/decompress (default: true)
--server.compression.min_length=INT # Min uncompressed response size to compress (default: 1024)
--server.compression.algorithms=STRINGS # Preference order, e.g. br,gzip (default: br,gzip)
```

#### Database Options

```bash
--database.driver=STRING           # Database driver: sqlite|mysql (default: "sqlite")
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

#### Rate Limit Options

```bash
--rate_limit.enabled=BOOL          # YAML master switch (default: true; UI can still disable via settings)
--rate_limit.store=STRING          # Store: memory|redis (default: "memory")
--rate_limit.fail_open=BOOL        # Allow requests if the store errors (default: true)
--rate_limit.redis.addr=HOST:PORT  # Redis address (overrides host/port; falls back to cache.redis)
--rate_limit.redis.host=STRING     # Redis host (only used when store=redis)
--rate_limit.redis.port=INT        # Redis port (default: 6379)
--rate_limit.redis.password=STRING # Redis password
--rate_limit.redis.db=INT          # Redis DB index (default: 0)
--rate_limit.redis.prefix=STRING   # Redis key prefix (default: "ez:")
```

GitOps `rate_limit.policies` stay in YAML only.

#### Cache Options

```bash
--cache.driver=STRING          # Cache driver: memory|db|redis (default: "memory")
--cache.size=INT               # Memory backend size (default: 1000)
--cache.redis.addr=HOST:PORT   # Redis address (overrides host/port)
--cache.redis.host=STRING      # Redis host
--cache.redis.port=INT         # Redis port (default: 6379)
--cache.redis.password=STRING  # Redis password
--cache.redis.db=INT           # Redis DB index (default: 0)
--cache.redis.prefix=STRING    # Redis key prefix (default: "ez:")
```

`cache.redis` is also the fallback when `rate_limit.store=redis` and `--rate_limit.redis.*` is unset. `cache.driver` / `cache.size` are unused by `cache.Init` today (see [Caching](./20-caching.md)).

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

**Important:** Do not change `global.encrypt-key` in config or env until ciphertext has been re-encrypted. Use the stop-the-world procedure below.

### Rotating the encryption key

Runtime still uses a single key. All nodes must be stopped so nothing writes ciphertext with the old key while you rotate.

```bash
# 1. Stop every node. Backup the database (and config.yaml if it contains {CRYPT} values).

# 2. Re-encrypt DB rows and YAML {CRYPT} scalars. Config must still hold the OLD key.
ez-console encrypt rotate --config ./config.yaml --new-key "$NEW_KEY"
# Preview:
ez-console encrypt rotate --config ./config.yaml --new-key "$NEW_KEY" --dry-run

# Optional: also write global.encrypt-key in that YAML (skip if the key lives only in env / K8s Secret)
ez-console encrypt rotate --config ./config.yaml --new-key "$NEW_KEY" --write-encrypt-key

# 3. Point GLOBAL_ENCRYPT_KEY / --global.encrypt-key at $NEW_KEY.
#    Re-encrypt CLI / env / Secret ciphertexts:
ez-console encrypt reencrypt --old-key "$OLD_KEY" --new-key "$NEW_KEY" --value '{CRYPT}$...'

# 4. Start the nodes. Discard the old key.
```

Downstream apps that use `server.NewCommandServer` expose the same commands as `myapp encrypt rotate` / `myapp encrypt reencrypt`.

The rotator walks `db.RegisterModels` (the same list as AutoMigrate):

- Default: `safe.String` / `*safe.String` fields (for example `User.MFASecret`)
- `encrypt:"inline"` — string columns whose value starts with `{CRYPT}`
- `encrypt:"json"` — JSON/map fields; only `{CRYPT}` string leaves are rewritten
- `encrypt:"-"` — skip
- Implement `util.EncryptRotator` on the model to replace the default scan (empty method = skip the table)

Do not convert existing `string` columns to `*safe.String` just to rotate. Tag them instead. User passwords (`Password` / `Salt`) are hashes and are not rotated.

`--rewrite-config` (default when a config file was loaded) re-encrypts YAML scalars that start with `{CRYPT}` (for example `database.password`, S3 `secret_access_key`). `--global.encrypt-key` is the key itself, not ciphertext. After rewriting YAML ciphertext you **must** start with the new key, or `database.password` will not decrypt.

`cache.redis.password` is a plain string today and cannot hold `{CRYPT}`.

### JWT Configuration

JWT tokens are used for authentication:

```yaml
jwt:
  algorithm: "ES256"                    # Signing algorithm (e.g. ES256, RS256)
  private_key: "your-private-key-pem"   # PEM-encoded private key; auto-generated if omitted
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

### HTTP Rate Limiting

- Runtime enable/disable (`rate_limit_enabled` in system settings; no restart)
- Default shared buckets for anonymous (IP), users, and service accounts
- Per-route extra buckets and per-user / per-service-account overrides

YAML `rate_limit.*` (store, fail_open, GitOps `policies`) requires a restart. The same infra keys can be set with `--rate_limit.*` flags (they override the file). Set `server.trusted_proxies` when the app sits behind a reverse proxy so anonymous limits key off the real client IP. `cluster.enabled` with `rate_limit.store=memory` is per-node; use `store=redis` for cluster-wide counters.

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
  trusted_proxies:
    - "10.0.0.0/8"
  compression:
    enabled: true
    min_length: 1024
    algorithms: [br, gzip]

rate_limit:
  enabled: true
  store: redis
  fail_open: true

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
  driver: memory
  size: 10000  # ignored by cache.Init; see usages/20-caching.md

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



