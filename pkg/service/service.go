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

	"github.com/sven-victor/ez-console/pkg/config"
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
	*CacheService
	*FileService
	*StatsService
	*BaseService
	*GeoIPService
	*AIModelService
	*ToolSetService
	*AIChatService
	*OrganizationService
	*SkillService
}

type BaseService struct {
	*CacheService
	*SettingService
	*EmailService
	*GeoIPService
}

func NewService(ctx context.Context) *Service {
	ctx, span := otel.GetTracerProvider().Tracer(config.GetConfig().Tracing.ServiceName).Start(ctx, "Initialize Service")
	defer span.End()
	traceId := span.SpanContext().TraceID()
	ctx, _ = log.NewContextLogger(ctx, log.WithTraceId(traceId.String()))
	// Create settings service first, as user service depends on it
	settingService := NewSettingService()
	geoipService := NewGeoIPService(ctx)

	baseService := &BaseService{
		CacheService:   new(CacheService),
		SettingService: settingService,
		EmailService:   &EmailService{settingService: settingService},
		GeoIPService:   geoipService,
	}
	ldapService := NewLDAPService(ctx, baseService)
	userService := NewUserService(ctx, baseService, ldapService)
	// Create OAuth service and initialize it
	oauthService := &OAuthService{
		BaseService: baseService,
		UserService: userService,
	}

	// Create AI services
	aiModelService := NewAIModelService()
	toolSetService := NewToolSetService()
	aiChatService := NewAIChatService()

	s := &Service{
		UserService:           userService,
		PermissionService:     new(PermissionService),
		RoleService:           NewRoleService(toolSetService),
		SystemService:         NewSystemService(baseService),
		OAuthService:          oauthService,
		SessionService:        &SessionService{geoipService: geoipService},
		CacheService:          new(CacheService),
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
	s.FileService = NewFileService(baseService)
	return s
}
