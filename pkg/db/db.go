package db

import (
	"context"

	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-utils/clients/gorm"
	gogorm "gorm.io/gorm"
)

// DB global database client
var dbClient *gorm.Client

func Session(ctx context.Context) *gogorm.DB {
	return dbClient.Session(ctx)
}

// InitDB initializes the database connection
func InitDB(ctx context.Context, cfg *config.Config) error {
	// Configure GORM
	dbClient = config.GetConfig().Database
	return nil
}

// CloseDB closes the database connection
func CloseDB() error {
	return dbClient.Close()
}
