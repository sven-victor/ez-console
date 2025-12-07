# Troubleshooting Guide

This guide helps you resolve common issues when working with EZ-Console.

## Server Issues

### Server Won't Start

**Symptom**: Server fails to start or exits immediately

**Common Causes**:

1. **Port already in use**
```bash
# Check if port is in use
lsof -i :8080

# Solution: Use different port
./server --server.port=9090
```

2. **Invalid encryption key**
```bash
# Error: encryption key must be 8, 16, 24, or 32 bytes
# Solution: Use correct length
./server --global.encrypt-key=12345678  # 8 bytes
./server --global.encrypt-key=1234567890123456  # 16 bytes
```

3. **Database connection failed**
```bash
# Check database connectivity
mysql -h localhost -u root -p

# Verify connection settings in config.yml
database:
  driver: "mysql"
  host: "localhost"
  username: "root"
  password: "correct-password"
```

4. **Missing configuration file**
```bash
# Ensure config file exists
ls -l config.yml

# Or specify full path
./server --config=/etc/myapp/config.yml
```

### Server Crashes Randomly

**Symptom**: Server stops unexpectedly

**Solutions**:

1. Check logs for panic messages:
```bash
journalctl -u myapp -n 100
```

2. Check system resources:
```bash
# Memory usage
free -h

# CPU usage
top

# Disk space
df -h
```

3. Enable debug mode:
```bash
./server --server.mode=debug --log.level=debug
```

## Database Issues

### Connection Timeout

**Symptom**: Database queries timeout

**Solutions**:

1. Increase timeout:
```yaml
database:
  read_timeout: "30s"
  max_connection_life_time: "5m"
```

2. Check network:
```bash
ping db-host
telnet db-host 3306
```

3. Increase connection pool:
```yaml
database:
  max_open_connections: 200
  max_idle_connections: 20
```

### Slow Queries

**Symptom**: API responses are slow

**Solutions**:

1. Enable slow query logging:
```yaml
database:
  slow_threshold: "1s"
```

2. Add database indexes:
```go
type Product struct {
	Name     string `gorm:"size:100;index"`  // Add index
	Category string `gorm:"size:50;index"`   // Add index
}
```

3. Use preloading:
```go
// Bad: N+1 queries
products, _ := db.Find(&products)
for _, p := range products {
	category, _ := db.Find(&category, p.CategoryID)
}

// Good: Single query
db.Preload("Category").Find(&products)
```

### Migration Errors

**Symptom**: Database migration fails

**Solutions**:

1. Check database permissions:
```sql
GRANT ALL PRIVILEGES ON database.* TO 'user'@'%';
```

2. Manually run migration:
```bash
# Backup first
mysqldump database > backup.sql

# Check logs
tail -f /var/log/myapp.log
```

## Authentication Issues

### Token Expired

**Symptom**: "E4011: Token expired" error

**Solutions**:

1. Re-authenticate:
```typescript
// Client-side
const refreshToken = async () => {
  const response = await apiPost('/auth/refresh');
  localStorage.setItem('token', response.token);
};
```

2. Extend token lifetime:
```yaml
jwt:
  expiration: "24h"  # Increase from default
```

### Session Expired

**Symptom**: "E4011: Session expired, please login again"

**Solutions**:

1. Adjust session settings through UI:
- System Settings → Security Settings
- Increase "Session Idle Timeout"

2. Or via configuration:
```yaml
# Through system settings table
UPDATE t_setting 
SET value = '120' 
WHERE key = 'session_idle_timeout_minutes';
```

### Permission Denied

**Symptom**: "E4031: No permission to perform this operation"

**Solutions**:

1. Check user roles:
```sql
SELECT r.name FROM t_user_role ur
JOIN t_role r ON ur.role_id = r.resource_id
WHERE ur.user_id = 'user-uuid';
```

2. Check permission assignment:
```sql
SELECT p.code, p.name FROM t_role_permission rp
JOIN t_permission p ON rp.permission_id = p.resource_id
WHERE rp.role_id = 'role-uuid';
```

3. Verify permission code:
```go
// Ensure permission is registered
middleware.RegisterPermission("Module", "Description", []model.Permission{
	{Code: "resource:action", Name: "Action Name", ...},
})
```

## Frontend Issues

### White Screen / Blank Page

**Symptom**: Frontend shows blank page

**Solutions**:

1. Check browser console for errors:
```javascript
// Press F12, check Console tab
```

2. Verify API endpoint:
```typescript
// Check vite.config.ts proxy settings
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },
}
```

3. Clear browser cache and rebuild:
```bash
# Clear cache
rm -rf node_modules/.vite

# Rebuild
pnpm build
```

### API Calls Failing

**Symptom**: API requests return errors

**Solutions**:

1. Check CORS settings:
```go
// Ensure CORS middleware is enabled
engine.Use(middleware.CORSMiddleware())
```

2. Verify authentication token:
```typescript
// Check token in localStorage
console.log(localStorage.getItem('token'));
```

3. Check network tab in browser:
```
F12 → Network tab → Check failed requests
```

### Build Errors

**Symptom**: Frontend build fails

**Solutions**:

1. Clear dependencies and reinstall:
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

2. Check TypeScript errors:
```bash
pnpm run type-check
```

3. Update dependencies:
```bash
pnpm update
```

## Performance Issues

### High Memory Usage

**Solutions**:

1. Check for memory leaks:
```bash
# Monitor memory
watch -n 1 'ps aux | grep server'
```

2. Adjust garbage collection:
```bash
GOGC=50 ./server  # More aggressive GC
```

3. Profile application:
```go
import _ "net/http/pprof"

router.GET("/debug/pprof/*any", gin.WrapH(http.DefaultServeMux))
```

### High CPU Usage

**Solutions**:

1. Check slow queries:
```yaml
database:
  slow_threshold: "0s"  # Log all queries
```

2. Add caching:
```go
// Cache frequent queries
cache.Set(key, value, 5*time.Minute)
```

3. Optimize queries:
```go
// Use Select to limit fields
db.Select("id", "name").Find(&products)

// Use pagination
db.Offset(offset).Limit(limit).Find(&products)
```

### Slow API Responses

**Solutions**:

1. Add indexes:
```go
type Model struct {
	Field string `gorm:"index"`  // Add index
}
```

2. Use eager loading:
```go
db.Preload("Relations").Find(&models)
```

3. Implement caching:
```go
if cached, ok := cache.Get(key); ok {
	return cached
}
```

## Configuration Issues

### Environment Variables Not Working

**Solutions**:

1. Check variable naming:
```bash
# Must be uppercase with underscores
export DATABASE_HOST=localhost  # ✓ Correct
export database-host=localhost  # ✗ Wrong
```

2. Verify loading:
```bash
# Print environment
printenv | grep DATABASE
```

3. Check precedence:
```
Command-line args > Environment variables > Config file
```

### Configuration Not Applied

**Solutions**:

1. Verify config file path:
```bash
./server --config=/path/to/config.yml
```

2. Check YAML syntax:
```bash
# Validate YAML
yamllint config.yml
```

3. Check logs for parsing errors:
```bash
./server --log.level=debug
```

## Docker Issues

### Container Won't Start

**Solutions**:

1. Check container logs:
```bash
docker logs container-name
```

2. Verify environment variables:
```bash
docker inspect container-name
```

3. Check volume mounts:
```bash
docker run -v /host/path:/container/path ...
```

### Cannot Connect to Database

**Solutions**:

1. Use Docker network:
```bash
docker network create myapp-network
docker run --network myapp-network ...
```

2. Use service names:
```yaml
# docker-compose.yml
database:
  host: "db"  # Use service name, not localhost
```

## Common Error Codes

| Code | Meaning | Solution |
|------|---------|----------|
| E4001 | Bad Request | Check request parameters |
| E4011 | Unauthorized | Re-authenticate or check token |
| E4012 | Invalid User | User not found or disabled |
| E4031 | Forbidden | Check user permissions |
| E4041 | Not Found | Resource doesn't exist |
| E5001 | Server Error | Check server logs |
| E5031 | Service Unavailable | Check service status |

## Debug Mode

Enable debug mode for more information:

```bash
./server \
  --server.mode=debug \
  --log.level=debug \
  --log.format=logfmt
```

## Getting Help

1. **Check Logs**:
```bash
# Application logs
journalctl -u myapp -n 100 -f

# Database logs
tail -f /var/log/mysql/error.log
```

2. **Enable Debug Mode**:
```bash
./server --log.level=debug
```

3. **Check Examples**:
- Review `/examples` directory
- Compare with working examples

4. **Review Documentation**:
- Check relevant guide sections
- Review API documentation at `/swagger`

5. **Search Issues**:
- Check GitHub issues
- Search similar problems

## Useful Commands

```bash
# Check server status
systemctl status myapp

# View logs
journalctl -u myapp -f

# Check port
lsof -i :8080

# Check processes
ps aux | grep server

# Check disk space
df -h

# Check memory
free -h

# Test database connection
mysql -h host -u user -p database

# Test API endpoint
curl http://localhost:8080/api/health

# Check configuration
cat /etc/myapp/config.yml

# Restart service
systemctl restart myapp
```

## Prevention Tips

1. **Regular Backups**: Backup database and files regularly
2. **Monitoring**: Set up monitoring and alerting
3. **Logging**: Keep debug logs enabled in development
4. **Testing**: Test changes in staging first
5. **Updates**: Keep dependencies updated
6. **Documentation**: Document custom configurations
7. **Security**: Regular security audits
8. **Performance**: Regular performance testing
9. **Code Review**: Review code changes
10. **Staging Environment**: Test in staging before production

## Next Steps

- Review [Deployment Guide](./12-deployment.md)
- Check [Configuration Guide](./05-configuration.md)
- Explore [Advanced Topics](./13-advanced-topics.md)


