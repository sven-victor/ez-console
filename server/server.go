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
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-kit/log/level"
	"github.com/go-ldap/ldap/v3"
	"github.com/spf13/cobra"
	"github.com/spf13/pflag"
	"github.com/spf13/viper"
	"github.com/sven-victor/ez-utils/clients/tracing"
	"github.com/sven-victor/ez-utils/log"
	"github.com/sven-victor/ez-utils/log/flag"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"

	"github.com/sven-victor/ez-console/pkg/api"
	clientsldap "github.com/sven-victor/ez-console/pkg/clients/ldap"
	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/db"
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
	serverFlagSet.String("server.geoip_db_path", "", "GeoIP database path")
	rootCmd.Flags().AddFlagSet(serverFlagSet)

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
	service *service.Service
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

	// Cache Service
	CreateCache(ctx context.Context, key, value string, expiredAt time.Time) (*model.TempData, error)
	DeleteCache(ctx context.Context, key string) error
	GetCache(ctx context.Context, key string) (*model.TempData, error)

	// Authorization Service
	ResetPassword(ctx context.Context, userID string, newPassword string) (bool, error)
	RestoreUser(ctx context.Context, userID string) error
	GetLdapUsers(ctx context.Context, skipExisting bool) ([]model.User, error)
	RegisterUserChangeHook(hook service.UserChangeHook)
	RegisterUserRoleChangeHook(hook service.UserRoleChangeHook)

	FilterLDAPEntries(ctx context.Context, baseDN string, filter string, attributes []string) ([]*ldap.Entry, error)
	GetLDAPEntry(ctx context.Context, baseDN string, attributes []string) (*ldap.Entry, error)

	// GeoIP Service
	GetLocation(ctx context.Context, ip string, language string) (string, error)
	MustGetLocation(ctx context.Context, ip string, language string) string
}

func (c *CommandServer) GetService() Service {
	return c.service
}

type ServerOption struct {
	withCommand []withCommandOption
	withEngine  []withEngineOption
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
		Run: func(cmd *cobra.Command, args []string) {
			newServer(cmd.Context(), serviceName, serverOption.withEngine...)
		},
	}
	for _, option := range serverOption.withCommand {
		option(rootCmd)
	}

	// Here you will define your flags and configuration settings.
	// Cobra supports persistent flags, which, if defined here,
	// will be global for your application.
	// initConfig reads in config file and ENV variables if set.
	initConfig := func() {
		viper.BindPFlags(rootCmd.Flags())
		_, err := config.LoadConfig(serviceName, cfgFile)
		if err != nil {
			level.Error(log.New()).Log("msg", "Failed to load configuration", "err", err)
			os.Exit(1)
		}
		viper.Set("service.version", version)
		viper.Set("service.name", serviceName)
	}
	rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is ./config.yaml)")
	cobra.OnInitialize(initConfig)
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

func initSettings(ctx context.Context, cfg *config.Config, svc *service.Service) {
	ctx, span := otel.GetTracerProvider().Tracer(cfg.Tracing.ServiceName).Start(ctx, "Initialize Settings")
	defer span.End()
	traceId := span.SpanContext().TraceID()
	ctx, logger := log.NewContextLogger(ctx, log.WithTraceId(traceId.String()))

	// Initialize default settings
	if err := svc.InitDefaultSettings(ctx); err != nil {
		level.Error(logger).Log("msg", "Init default settings failed", "error", err)
	}

	// Initialize default security settings
	if err := svc.InitDefaultSecuritySettings(ctx); err != nil {
		level.Error(logger).Log("msg", "Init default security settings failed", "error", err)
	}

	// Initialize default OAuth settings
	if err := svc.InitDefaultOAuthSettings(ctx); err != nil {
		level.Error(logger).Log("msg", "Init default oauth settings failed", "error", err)
	}

	// Initialize default SMTP settings
	if err := svc.InitDefaultSMTPSettings(ctx); err != nil {
		level.Error(logger).Log("msg", "Init default smtp settings failed", "error", err)
	}

	// Initialize default LDAP settings
	if err := svc.InitDefaultLDAPSettings(ctx); err != nil {
		level.Error(logger).Log("msg", "Init default ldap settings failed", "error", err)
	}
}

// safeArgs return a safe args for trace
func safeArgs() []string {
	var args []string
	for idx, arg := range os.Args {
		if arg == "--global.encrypt-key" && idx < len(os.Args)-1 {
			args = append(args, "*************")
		} else if strings.HasPrefix(arg, "--global.encrypt-key=") {
			args = append(args, "--global.encrypt-key=*************")
		} else {
			args = append(args, arg)
		}
	}
	return args
}

func newServer(ctx context.Context, serviceName string, options ...withEngineOption) {
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

	// Set Gin mode
	if cfg.Server.Mode == "debug" {
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}
	logger := log.GetContextLogger(ctx)
	gin.DebugPrintRouteFunc = func(httpMethod, absolutePath string, handlerName string, nuHandlers int) {
		level.Debug(logger).Log("msg", "add gin route", log.KeyName("httpMethod"), httpMethod, log.KeyName("absolutePath"), absolutePath, log.KeyName("handlerName"), handlerName, log.KeyName("nuHandlers"), nuHandlers)
	}
	gin.DefaultWriter = middleware.NewKitLogAdapter(logger)
	gin.DefaultErrorWriter = middleware.NewKitLogAdapter(logger)
	// Create Gin engine
	engine := gin.New()

	engine.ContextWithFallback = true
	engine.Use(otelgin.Middleware(serviceName))
	engine.Use(middleware.Log(serviceName))
	engine.Use(gin.Recovery(), middleware.CORSMiddleware(), middleware.DelayMiddleware())
	// Default middleware is provided by gin.Default()
	// No need for additional logger and recovery middleware
	svc := service.NewService(ctx)

	initSettings(ctx, cfg, svc)

	// Setup API routes
	api.RegisterControllers(ctx, engine, svc)
	// Frontend resource directory
	RegisterStaticRoutes(engine)

	engine.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	for _, option := range options {
		option(engine)
	}
	// Start the server
	serverAddr := fmt.Sprintf("%s:%d", cfg.Server.Host, cfg.Server.Port)
	level.Info(logger).Log("msg", "Server starting on", "serverAddr", serverAddr)
	if err := engine.Run(serverAddr); err != nil {
		level.Error(logger).Log("msg", "Failed to start server", "error", err)
	}
}
