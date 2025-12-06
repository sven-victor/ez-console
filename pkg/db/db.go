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
