package server

import (
	"context"

	"github.com/sven-victor/ez-console/pkg/db"
	"gorm.io/gorm"
)

func RegisterModels(models ...interface{}) {
	db.RegisterModels(models...)
}

func DBSession(ctx context.Context) *gorm.DB {
	return db.Session(ctx)
}
