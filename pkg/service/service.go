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

package service

import (
	"context"

	"github.com/sven-victor/ez-console/pkg/cache"
	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-utils/log"
	"go.opentelemetry.io/otel"
)

type Service struct {
	*UserService
	*PermissionService
	*RoleService
	*SystemService
	*OAuthService
	*SessionService
	*AuditLogService
	*SettingService
	*ServiceAccountService
	*LDAPService
	*FileService
	*StatsService
	*BaseService
	*GeoIPService
	*AIModelService
	*ToolSetService
	*AIChatService
	*OrganizationService
	*SkillService
	*TaskService
	*SchedulerService
	*AITraceService
}

type BaseService struct {
	*SettingService
	*EmailService
	*GeoIPService
}

func NewService(ctx context.Context) *Service {
	cfg := config.GetConfig()
	ctx, span := otel.GetTracerProvider().Tracer(cfg.Tracing.ServiceName).Start(ctx, "Initialize Service")
	defer span.End()
	traceId := span.SpanContext().TraceID()
	ctx, _ = log.NewContextLogger(ctx, log.WithTraceId(traceId.String()))

	if err := cache.Init(&cfg.Cache, db.Session); err != nil {
		panic("failed to initialize cache: " + err.Error())
	}

	settingService := NewSettingService()
	geoipService := NewGeoIPService(ctx)

	baseService := &BaseService{
		SettingService: settingService,
		EmailService:   &EmailService{settingService: settingService},
		GeoIPService:   geoipService,
	}
	ldapService := NewLDAPService(ctx, baseService)
	userService := NewUserService(ctx, baseService, ldapService)

	// Create AI services
	aiModelService := NewAIModelService()
	toolSetService := NewToolSetService()
	roleService := NewRoleService(toolSetService)
	aiChatService := NewAIChatService()

	// Create OAuth service and initialize it
	oauthService := &OAuthService{
		BaseService: baseService,
		UserService: userService,
	}
	s := &Service{
		UserService:           userService,
		PermissionService:     new(PermissionService),
		RoleService:           roleService,
		SystemService:         NewSystemService(baseService),
		OAuthService:          oauthService,
		SessionService:        &SessionService{geoipService: geoipService},
		AuditLogService:       new(AuditLogService),
		SettingService:        settingService,
		ServiceAccountService: NewServiceAccountService(),
		LDAPService:           ldapService,
		StatsService:          NewStatsService(),
		BaseService:           baseService,
		AIModelService:        aiModelService,
		ToolSetService:        toolSetService,
		AIChatService:         aiChatService,
		OrganizationService:   NewOrganizationService(),
		SkillService:          NewSkillService(),
	}
	s.TaskService = NewTaskService()
	s.SchedulerService = NewSchedulerService(s.TaskService)
	s.FileService = NewFileService(baseService)
	s.AITraceService = NewAITraceService(settingService)
	return s
}
