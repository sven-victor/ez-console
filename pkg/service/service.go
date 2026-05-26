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

	"github.com/go-kit/log/level"
	"github.com/sven-victor/ez-console/pkg/cache"
	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-utils/log"
	"go.opentelemetry.io/otel"
)

type Service struct {
	UserService
	PermissionService
	RoleService
	SystemService
	SessionService
	AuditLogService
	ServiceAccountService
	FileService
	StatsService
	AIService
	OrganizationService
	TaskSchedulerService
	BaseService
}

type BaseService interface {
	SettingService
	EmailService
	GeoIPService
	ToolSetService
}

type baseService struct {
	EmailService
	SettingService
	GeoIPService
	ToolSetService
}

// NewService builds the application service layer. Pass ServiceOption values to replace
// default constructors, for example:
//
//	service.NewService(ctx, service.WithUserServiceFactory(myNewUserService))
func NewService(ctx context.Context, opts ...ServiceOption) *Service {
	cfg := config.GetConfig()
	ctx, span := otel.GetTracerProvider().Tracer(cfg.Tracing.ServiceName).Start(ctx, "Initialize Service")
	defer span.End()
	traceId := span.SpanContext().TraceID()
	ctx, logger := log.NewContextLogger(ctx, log.WithTraceId(traceId.String()))

	options := &serviceOptions{}
	for _, opt := range opts {
		opt(options)
	}
	applyServiceDefaults(options)

	if err := cache.Init(&cfg.Cache, db.Session); err != nil {
		panic("failed to initialize cache: " + err.Error())
	}

	settingService := options.settingServiceFactory(ctx)
	emailService := options.emailServiceFactory(settingService)

	base := &baseService{
		EmailService:   emailService,
		SettingService: settingService,
		GeoIPService:   options.geoIPServiceFactory(ctx),
		ToolSetService: options.toolSetServiceFactory(),
	}

	s := &Service{
		BaseService:           base,
		AIService:             options.aiServiceFactory(ctx, base),
		AuditLogService:       options.auditLogServiceFactory(ctx, base),
		FileService:           options.fileServiceFactory(ctx, base),
		OrganizationService:   options.organizationServiceFactory(ctx, base),
		PermissionService:     options.permissionServiceFactory(ctx, base),
		RoleService:           options.roleServiceFactory(ctx, base),
		ServiceAccountService: options.serviceAccountServiceFactory(ctx, base),
		SessionService:        options.sessionServiceFactory(ctx, base),
		StatsService:          options.statsServiceFactory(ctx, base),
		SystemService:         options.systemServiceFactory(ctx, base),
		TaskSchedulerService:  options.taskSchedulerServiceFactory(ctx, base),
		UserService:           options.userServiceFactory(ctx, base),
	}

	if err := s.InitDefaultSMTPSettings(ctx); err != nil {
		level.Error(logger).Log("msg", "Init default smtp settings failed", "error", err)
	}
	if err := s.InitDefaultOAuthSettings(ctx); err != nil {
		level.Error(logger).Log("msg", "Init default oauth settings failed", "error", err)
	}
	if err := s.InitDefaultLDAPSettings(ctx); err != nil {
		level.Error(logger).Log("msg", "Init default ldap settings failed", "error", err)
	}
	if err := s.InitDefaultTaskSettings(ctx); err != nil {
		level.Error(logger).Log("msg", "Init default task settings failed", "error", err)
	}
	return s
}
