package server

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/go-kit/log/level"
	"github.com/go-ldap/ldap/v3"
	"github.com/spf13/cobra"
	"github.com/spf13/pflag"
	"github.com/spf13/viper"
	"github.com/sven-victor/ez-utils/log"
	"github.com/sven-victor/ez-utils/log/flag"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	"github.com/sven-victor/ez-console/pkg/api"
	clientsldap "github.com/sven-victor/ez-console/pkg/clients/ldap"
	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/db"
	_ "github.com/sven-victor/ez-console/pkg/logs"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
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
	databaseFlagSet.String("database.schema", "ez_console", "database schema (only used for mysql or clickhouse)")
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

	// Cache Service
	CreateCache(ctx context.Context, key, value string, expiredAt time.Time) (*model.TempData, error)
	DeleteCache(ctx context.Context, key string) error
	GetCache(ctx context.Context, key string) (*model.TempData, error)

	// Authorization Service
	ResetPassword(ctx context.Context, userID string, newPassword string) (bool, error)
	RestoreUser(ctx context.Context, userID string) error
	GetLdapUsers(ctx context.Context, skipExisting bool) ([]model.User, error)

	FilterLDAPEntries(ctx context.Context, baseDN string, filter string, attributes []string) ([]*ldap.Entry, error)
	GetLDAPEntry(ctx context.Context, baseDN string, attributes []string) (*ldap.Entry, error)
}

func (c *CommandServer) GetService() Service {
	return c.service
}

func NewCommandServer(serviceName string, description string, WithOptions ...func(*cobra.Command)) *CommandServer {
	var cfgFile string
	rootCmd := &cobra.Command{
		Use:   serviceName,
		Short: description,
		Run:   func(cmd *cobra.Command, args []string) { newServer(cmd.Context(), serviceName) },
	}
	for _, option := range WithOptions {
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
	}
	rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is ./config.yaml)")
	cobra.OnInitialize(initConfig)
	initFlags(rootCmd)
	rootCmd.Flags().SortFlags = false
	return &CommandServer{Command: rootCmd}
}

func newServer(ctx context.Context, serviceName string) {

	cfg := config.GetConfig()
	{
		ctx, logger := log.NewContextLogger(ctx)
		// Initialize database
		if err := db.InitDB(ctx, cfg); err != nil {
			level.Error(logger).Log("msg", "Failed to initialize database", "err", err)
			os.Exit(1)
		}
		defer db.CloseDB()

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
	engine.Use(middleware.Log(serviceName))
	engine.Use(gin.Recovery(), middleware.CORSMiddleware())
	// Default middleware is provided by gin.Default()
	// No need for additional logger and recovery middleware
	svc := service.NewService(ctx)

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

	// Setup API routes
	api.RegisterControllers(engine, svc)
	// Frontend resource directory
	engine.GET("/console/*filepath", CacheControl, static.Serve("/console", staticHandler), IndexHandler)
	engine.HEAD("/console/*filepath", CacheControl, static.Serve("/console", staticHandler), IndexHandler)

	engine.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// Start the server
	serverAddr := fmt.Sprintf("%s:%d", cfg.Server.Host, cfg.Server.Port)
	level.Info(logger).Log("msg", "Server starting on", "serverAddr", serverAddr)
	if err := engine.Run(serverAddr); err != nil {
		level.Error(logger).Log("msg", "Failed to start server", "error", err)
	}
}
