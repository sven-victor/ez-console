// Copyright 2025 Sven Victor
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package server

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-kit/log/level"
	"github.com/go-ldap/ldap/v3"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"github.com/spf13/cobra"
	"github.com/spf13/pflag"
	"github.com/spf13/viper"
	"github.com/sven-victor/ez-utils/clients/tracing"
	"github.com/sven-victor/ez-utils/log"
	"github.com/sven-victor/ez-utils/log/flag"
	"github.com/sven-victor/ez-utils/safe"
	"github.com/sven-victor/ez-utils/signals"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"

	"github.com/sven-victor/ez-console/pkg/api"
	authorizationapi "github.com/sven-victor/ez-console/pkg/api/authorization"
	"github.com/sven-victor/ez-console/pkg/cache"
	clientsldap "github.com/sven-victor/ez-console/pkg/clients/ldap"
	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/eventbus"
	_ "github.com/sven-victor/ez-console/pkg/logs"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
	"go.opentelemetry.io/contrib/instrumentation/github.com/gin-gonic/gin/otelgin"
)

func initFlags(rootCmd *cobra.Command) {

	rootCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")

	flag.AddFlags(rootCmd.PersistentFlags(), nil)

	rootCmd.PersistentFlags().String("global.encrypt-key", "", "global encrypt key (The encryption key length must be 0, 8, 16, 24, or 32)")

	serverFlagSet := pflag.NewFlagSet("server", pflag.ExitOnError)
	serverFlagSet.String("server.port", "8080", "server port")
	serverFlagSet.String("server.host", "0.0.0.0", "server host")
	serverFlagSet.String("server.mode", "release", "server mode")
	serverFlagSet.String("server.root_url", "", "server root url")
	serverFlagSet.String("server.read_timeout", "10s", "server read timeout")
	serverFlagSet.String("server.write_timeout", "10s", "server write timeout")
	serverFlagSet.String("server.shutdown_timeout", "10s", "server shutdown timeout")
	serverFlagSet.String("server.file_upload_path", "./uploads", "server file upload path")
	serverFlagSet.String("server.skills_path", "./skills", "server skills storage path")
	serverFlagSet.String("server.geoip_db_path", "", "GeoIP database path")
	rootCmd.Flags().AddFlagSet(serverFlagSet)

	clusterFlagSet := pflag.NewFlagSet("cluster", pflag.ExitOnError)
	clusterFlagSet.Bool("cluster.enabled", false, "cluster enabled")
	clusterFlagSet.String("cluster.name", "", "cluster name")
	clusterFlagSet.String("cluster.gossip.bind_addr", "", "cluster gossip bind address")
	clusterFlagSet.String("cluster.gossip.advertise_addr", "", "cluster gossip advertise address")
	clusterFlagSet.StringSlice("cluster.gossip.join", []string{}, "cluster gossip join addresses")
	rootCmd.Flags().AddFlagSet(clusterFlagSet)

	databaseFlagSet := pflag.NewFlagSet("database", pflag.ExitOnError)
	databaseFlagSet.String("database.driver", "sqlite", "database driver")
	databaseFlagSet.String("database.username", "root", "database username (only used for mysql or clickhouse)")
	databaseFlagSet.String("database.password", "", "database password (only used for mysql or clickhouse)")
	databaseFlagSet.String("database.host", "localhost", "database host (only used for mysql or clickhouse)")
	databaseFlagSet.String("database.max_connection_life_time", "30s", "database max connection life time (only used for mysql or clickhouse)")
	databaseFlagSet.String("database.enable_compression", "true", "database enable compression (only used for mysql or clickhouse)")
	databaseFlagSet.String("database.max_idle_connections", "2", "database max idle connections (only used for mysql or clickhouse)")
	databaseFlagSet.String("database.max_open_connections", "100", "database max open connections (only used for mysql or clickhouse)")
	databaseFlagSet.String("database.schema", util.ToSnakeCase(rootCmd.Use), "database schema (only used for mysql or clickhouse)")
	databaseFlagSet.String("database.charset", "utf8mb4", "database charset (only used for mysql)")
	databaseFlagSet.String("database.collation", "utf8mb4_unicode_ci", "database collation (only used for mysql)")
	databaseFlagSet.String("database.read_timeout", "10s", "database read timeout (only used for clickhouse)")
	databaseFlagSet.String("database.dial_timeout", "10s", "database dial timeout (only used for clickhouse)")
	databaseFlagSet.String("database.max_execution_time", "60s", "database max execution time (only used for clickhouse)")
	databaseFlagSet.String("database.path", rootCmd.Use+".db", "database path (only used for sqlite)")
	databaseFlagSet.String("database.slow_threshold", "3s", "database slow threshold")
	databaseFlagSet.String("database.table_prefix", "t_", "database table prefix")
	rootCmd.Flags().AddFlagSet(databaseFlagSet)
}

type CommandServer struct {
	*cobra.Command
}

type Service interface {
	// LDAP Service
	GetLDAPSession(ctx context.Context) (clientsldap.Conn, error)
	GetLDAPSettings(ctx context.Context) (clientsldap.Options, error)
	TestLDAPConnection(ctx context.Context, ldapSettings clientsldap.Options, username, password string) (*model.LDAPTestResponse, error)

	// Audit Service
	StartAudit(ctx *gin.Context, resourceID string, handleFunc func(auditLog *model.AuditLog) error, withOptions ...service.WithStartAuditOptions) error
	// Setting Service
	GetSettingsMap(ctx context.Context) (map[string]string, error)
	GetStringSetting(ctx context.Context, key model.SettingKey, defaultValue string) (string, error)
	GetBoolSetting(ctx context.Context, key model.SettingKey, defaultValue bool) (bool, error)
	GetIntSetting(ctx context.Context, key model.SettingKey, defaultValue int) (int, error)
	GetSettingByStringKey(ctx context.Context, key string) (*model.Setting, error)
	GetAllSettings(ctx context.Context) ([]model.Setting, error)
	UpdateSetting(ctx context.Context, key model.SettingKey, value, comment string) (*model.Setting, error)
	UpdateSettings(ctx context.Context, settings map[string]string) error
	DeleteSetting(ctx context.Context, key model.SettingKey) error
	GetSMTPSettings(ctx context.Context) (*model.SMTPSettings, error)

	// Authorization Service
	ResetPassword(ctx context.Context, userID string, newPassword string) (bool, error)
	RestoreUser(ctx context.Context, userID string) error
	GetLdapUsers(ctx context.Context, skipExisting bool) ([]model.User, error)
	RegisterUserChangeHook(hook service.UserChangeHook)
	RegisterUserRoleChangeHook(hook service.UserRoleChangeHook)
	CreateServiceAccount(ctx context.Context, serviceAccount *model.ServiceAccount) error
	GetServiceAccountByID(ctx context.Context, id string) (*model.ServiceAccount, error)

	// Service Account Management
	UpdateServiceAccount(ctx context.Context, id string, serviceAccount *model.ServiceAccount) error
	DeleteServiceAccount(ctx context.Context, id string) error
	UpdateServiceAccountStatus(ctx context.Context, id, status string) error
	GetServiceAccountList(ctx context.Context, page, pageSize int, search string, organizationID *string) ([]model.ServiceAccount, int64, error)
	GetServiceAccountAccessKeys(ctx context.Context, serviceAccountID string) ([]model.ServiceAccountAccessKey, error)
	CreateServiceAccountAccessKey(ctx context.Context, serviceAccountID, name, description string, expiresAt *time.Time) (*model.ServiceAccountAccessKey, string, error)
	DeleteServiceAccountAccessKey(ctx context.Context, serviceAccountID, keyID string) error
	GetServiceAccountRoles(ctx context.Context, serviceAccountID string) ([]model.Role, error)
	AssignServiceAccountRoles(ctx context.Context, serviceAccountID string, roleIDs []string) error
	GetServiceAccountPolicy(ctx context.Context, serviceAccountID string) (model.PolicyDocument, error)
	SetServiceAccountPolicy(ctx context.Context, serviceAccountID string, policyDoc model.PolicyDocument) error

	FilterLDAPEntries(ctx context.Context, baseDN string, filter string, attributes []string) ([]*ldap.Entry, error)
	GetLDAPEntry(ctx context.Context, baseDN string, attributes []string) (*ldap.Entry, error)

	SendEmail(ctx context.Context, smtpSettings *model.SMTPSettings, to []string, subject, body string) error
	SendEmailToAdmins(ctx context.Context, subject, body string) error

	// GeoIP Service
	GetLocation(ctx context.Context, ip string, language string) (string, error)
	MustGetLocation(ctx context.Context, ip string, language string) string

	CreateTask(ctx context.Context, taskType model.TaskType, opts ...service.CreateTaskOption) (*model.Task, error)
}

type ServerOption struct {
	withCommand []withCommandOption
	withEngine  []withEngineOption
	withService []service.ServiceOption
}

type withEngineOption func(*gin.Engine)
type withCommandOption func(*cobra.Command)

type WithServerOption func(*ServerOption)

func WithCommandOptions(options ...withCommandOption) WithServerOption {
	return func(option *ServerOption) {
		option.withCommand = append(option.withCommand, options...)
	}
}

func WithEngineOptions(options ...withEngineOption) WithServerOption {
	return func(option *ServerOption) {
		option.withEngine = append(option.withEngine, options...)
	}
}

func WithServiceOptions(options ...service.ServiceOption) WithServerOption {
	return func(option *ServerOption) {
		option.withService = append(option.withService, options...)
	}
}

func bindTracingEnv() {
	viper.BindEnv("tracing.http.endpoint", "TRACING_HTTP_ENDPOINT")
	viper.BindEnv("tracing.http.insecure", "TRACING_HTTP_INSECURE")
	viper.BindEnv("tracing.http.timeout", "TRACING_HTTP_TIMEOUT")
	viper.BindEnv("tracing.http.retry", "TRACING_HTTP_RETRY")
	viper.BindEnv("tracing.http.compression", "TRACING_HTTP_COMPRESSION")
	viper.BindEnv("tracing.http.retry", "TRACING_HTTP_RETRY")
	viper.BindEnv("tracing.http.url_path", "TRACING_HTTP_URL_PATH")
	viper.BindEnv("tracing.grpc.endpoint", "TRACING_GRPC_ENDPOINT")
	viper.BindEnv("tracing.grpc.insecure", "TRACING_GRPC_INSECURE")
	viper.BindEnv("tracing.grpc.timeout", "TRACING_GRPC_TIMEOUT")
	viper.BindEnv("tracing.grpc.retry", "TRACING_GRPC_RETRY")
	viper.BindEnv("tracing.grpc.compression", "TRACING_GRPC_COMPRESSION")
	viper.BindEnv("tracing.grpc.reconnection_period", "TRACING_GRPC_RECONNECTION_PERIOD")
	viper.BindEnv("tracing.grpc.service_config", "TRACING_GRPC_SERVICE_CONFIG")
	viper.BindEnv("tracing.file.path", "TRACING_FILE_PATH")
	viper.BindEnv("tracing.zipkin.endpoint", "TRACING_ZIPKIN_ENDPOINT")
	viper.BindEnv("server.host", "SERVER_HOST")
	// Kubernetes pod IP injection via Downward API.
	// Set MY_POD_IP in the pod spec and GOSSIP_ADVERTISE_ADDR picks it up:
	//   env:
	//   - name: MY_POD_IP
	//     valueFrom:
	//       fieldRef:
	//         fieldPath: status.podIP
	//   - name: GOSSIP_ADVERTISE_ADDR
	//     value: "$(MY_POD_IP):7946"
	viper.BindEnv("cluster.gossip.advertise_addr", "GOSSIP_ADVERTISE_ADDR")
}

func NewCommandServer(serviceName string, version string, description string, options ...WithServerOption) *CommandServer {
	serverOption := &ServerOption{}
	for _, option := range options {
		option(serverOption)
	}

	var cfgFile string
	rootCmd := &cobra.Command{
		Use:     serviceName,
		Short:   description,
		Version: version,
	}
	initConfig := func() {
		viper.BindPFlags(rootCmd.Flags())
		bindTracingEnv()
		_, err := config.LoadConfig(serviceName, cfgFile)
		if err != nil {
			level.Error(log.New()).Log("msg", "Failed to load configuration", "err", err)
			os.Exit(1)
		}
		viper.Set("service.version", version)
		viper.Set("service.name", serviceName)
	}
	rootCmd.Run = func(cmd *cobra.Command, args []string) {
		initConfig()
		newServer(cmd.Context(), serviceName, serverOption.withEngine, serverOption.withService)
	}
	for _, option := range serverOption.withCommand {
		option(rootCmd)
	}

	rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is ./config.yaml)")
	initFlags(rootCmd)
	rootCmd.Flags().SortFlags = false
	return &CommandServer{Command: rootCmd}
}

func initDB(ctx context.Context, cfg *config.Config) {
	db.InitDB(ctx, cfg)
	ctx, span := otel.GetTracerProvider().Tracer(cfg.Tracing.ServiceName).Start(ctx, "Initialize Database")
	defer span.End()
	traceId := span.SpanContext().TraceID()
	ctx, logger := log.NewContextLogger(ctx, log.WithTraceId(traceId.String()))
	// Database migration and data initialization
	if err := db.MigrateDB(ctx); err != nil {
		level.Error(logger).Log("msg", "Failed to migrate database", "err", err)
		os.Exit(1)
	}
	if err := db.SeedDB(ctx, middleware.GetPermissions()); err != nil {
		level.Error(logger).Log("msg", "Failed to initialize data", "err", err)
		os.Exit(1)
	}
}

// safeArgs return a safe args for trace
func safeArgs() []string {
	var args []string
	for idx := 0; idx < len(os.Args); idx++ {
		arg := os.Args[idx]
		if arg == "--global.encrypt-key" && idx < len(os.Args)-1 {
			args = append(args, "--global.encrypt-key", "*************")
			idx++
		} else if strings.HasPrefix(arg, "--global.encrypt-key=") {
			args = append(args, "--global.encrypt-key=*************")
		} else {
			args = append(args, arg)
		}
	}
	return args
}

func newServer(ctx context.Context, serviceName string, engineOptions []withEngineOption, serviceOptions []service.ServiceOption) {
	cfg := config.GetConfig()
	{
		traceProvider, err := tracing.NewTraceProvider(ctx, &cfg.Tracing, tracing.WithAttributes(attribute.KeyValue{
			Key:   "process.command_args",
			Value: attribute.StringSliceValue(safeArgs()),
		}))
		if err != nil {
			level.Error(log.New()).Log("msg", "Failed to create trace provider", "err", err)
			os.Exit(1)
		}
		defer func() {
			timeoutCtx, closeCh := context.WithTimeout(context.Background(), time.Second*3)
			defer closeCh()

			ctx, logger := log.NewContextLogger(timeoutCtx)
			if err := traceProvider.ForceFlush(ctx); err != nil {
				level.Debug(logger).Log("msg", "failed to force flush trace", "err", err)
			}
			if err := traceProvider.Shutdown(ctx); err != nil {
				level.Debug(logger).Log("msg", "failed to close trace", "err", err)
			}
		}()
		otel.SetTracerProvider(traceProvider)
	}
	{
		defer db.CloseDB()
		initDB(ctx, cfg)
	}

	// Validate the encrypt-key against DB-stored encrypted values.
	// This prevents a misconfigured key from silently corrupting data at runtime.
	validateEncryptKey(ctx)

	// Set Gin mode
	if cfg.Server.Mode == "debug" {
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}
	logger := log.GetContextLogger(ctx)

	// Initialise cluster EventBus (serf for multi-node, noop for single-node).
	bus, busErr := eventbus.New(&cfg.Cluster)
	if busErr != nil {
		level.Error(logger).Log("msg", "Failed to start eventbus", "err", busErr)
		os.Exit(1)
	}
	defer bus.Close()
	eventbus.SetGlobalEventBus(bus)

	// Wire EventBus → cache invalidation so all L1 caches are flushed when
	// another node publishes a cache.invalidate event.
	bus.Subscribe(func(event string, payload []byte) {
		if event == eventbus.EventCacheInvalidate {
			cache.HandleCacheInvalidateEvent(payload)
		}
	})

	// Wire cache invalidation publish hook so that local cache deletions are
	// automatically broadcast to all cluster nodes via the EventBus.
	cache.SetInvalidatePublishHook(func(ctx context.Context, cacheName, key string) {
		p, _ := json.Marshal(eventbus.CacheInvalidatePayload{CacheName: cacheName, Key: key})
		_ = bus.Publish(ctx, eventbus.EventCacheInvalidate, p)
	})

	gin.DebugPrintRouteFunc = func(httpMethod, absolutePath string, handlerName string, nuHandlers int) {
		level.Debug(logger).Log("msg", "add gin route", log.KeyName("httpMethod"), httpMethod, log.KeyName("absolutePath"), absolutePath, log.KeyName("handlerName"), handlerName, log.KeyName("nuHandlers"), nuHandlers)
	}
	gin.DefaultWriter = middleware.NewKitLogAdapter(logger)
	gin.DefaultErrorWriter = middleware.NewKitLogAdapter(logger)
	// Create Gin engine
	engine := gin.New()

	engine.ContextWithFallback = true
	engine.GET("/metrics", gin.WrapH(promhttp.Handler())) // Prometheus metrics
	engine.Use(gin.CustomRecovery(middleware.Recovery()), otelgin.Middleware(serviceName))
	engine.Use(middleware.PrometheusMetrics(), middleware.Log(serviceName))
	engine.Use(middleware.CORSMiddleware(), middleware.DelayMiddleware())

	// Apply custom engine options, example Middleware, Routes, etc.
	for _, option := range engineOptions {
		option(engine)
	}

	svc := service.NewService(ctx, serviceOptions...)

	if err := svc.SyncPresetResources(ctx); err != nil {
		level.Error(logger).Log("msg", "Failed to sync preset skills and toolsets", "err", err)
		os.Exit(1)
	}

	authorizationapi.RegisterUserExportTask(svc)

	// Setup API routes
	api.RegisterControllers(ctx, engine, svc)
	// Frontend resource directory
	RegisterStaticRoutes(engine)

	engine.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// Start the server with graceful shutdown on SIGTERM/SIGINT.
	serverAddr := fmt.Sprintf("%s:%d", cfg.Server.Host, cfg.Server.Port)
	level.Info(logger).Log("msg", "Server starting on", "serverAddr", serverAddr)

	srv := &http.Server{
		Addr:         serverAddr,
		Handler:      engine,
		ReadTimeout:  cfg.Server.ReadTimeout,
		WriteTimeout: cfg.Server.WriteTimeout,
	}

	// Run HTTP server in background goroutine.
	errCh := make(chan error, 1)
	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			errCh <- err
		}
	}()

	// Wait for termination signal or fatal server error.
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	select {
	case sig := <-quit:
		level.Info(logger).Log("msg", "Received signal, shutting down", "signal", sig)
	case err := <-errCh:
		level.Error(logger).Log("msg", "Server error", "error", err)
	}

	shutdownTimeout := cfg.Server.ShutdownTimeout
	if shutdownTimeout == 0 {
		shutdownTimeout = 10 * time.Second
	}
	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), shutdownTimeout)
	defer shutdownCancel()

	if err := srv.Shutdown(shutdownCtx); err != nil {
		level.Error(logger).Log("msg", "Server forced to shutdown", "error", err)
	}

	stopCh := signals.SetupSignalHandler(logger)
	stopCh.Wait()
	level.Info(logger).Log("msg", "Server exited gracefully")
}

// validateEncryptKey probes the encrypt-key by attempting to decrypt a
// DB-stored encrypted value (SMTP password or OAuth client secret).
// If an encrypted value exists and cannot be decrypted, the process exits
// immediately to prevent the node from operating with a mismatched key.
// On first start (no encrypted values stored yet), the probe is skipped.
func validateEncryptKey(ctx context.Context) {
	logger := log.GetContextLogger(ctx)
	encKey := os.Getenv(safe.SecretEnvName)
	if encKey == "" {
		// No encrypt key configured — nothing to validate.
		return
	}

	// Look for any encrypted setting value (SMTP password is a reliable probe).
	probeSMTPPassword := db.Session(ctx).
		Where("`key` = ? AND value != ''", model.SettingSMTPPassword).
		First(&model.Setting{})

	if probeSMTPPassword.RowsAffected == 0 {
		// No encrypted values stored yet; skip validation on first start.
		return
	}

	var setting model.Setting
	if err := db.Session(ctx).Where("`key` = ? AND value != ''", model.SettingSMTPPassword).
		First(&setting).Error; err != nil {
		// Setting not found or read error; skip.
		return
	}

	// Try to decrypt: if the value is an encrypted string, UnsafeString should succeed.
	es := safe.NewEncryptedString(setting.Value, encKey)
	if _, err := es.UnsafeString(); err != nil {
		level.Error(logger).Log("msg",
			"encrypt-key validation failed: cannot decrypt stored SMTP password — "+
				"wrong encrypt-key or corrupted data",
			"err", err)
		os.Exit(1)
	}

	level.Info(logger).Log("msg", "encrypt-key validated successfully")
}
