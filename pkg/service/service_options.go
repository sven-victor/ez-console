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

import "context"

// Base service factories (BaseService components use dedicated signatures, not BaseService).

type SettingServiceFactory func(ctx context.Context) SettingService
type EmailServiceFactory func(settingService SettingService) EmailService
type GeoIPServiceFactory func(ctx context.Context) GeoIPService
type ToolSetServiceFactory func() ToolSetService

// Service factories receive ctx and BaseService for construction and wiring.

type UserServiceFactory func(ctx context.Context, base BaseService) UserService
type RoleServiceFactory func(ctx context.Context, base BaseService) RoleService
type PermissionServiceFactory func(ctx context.Context, base BaseService) PermissionService
type SystemServiceFactory func(ctx context.Context, base BaseService) SystemService
type SessionServiceFactory func(ctx context.Context, base BaseService) SessionService
type AuditLogServiceFactory func(ctx context.Context, base BaseService) AuditLogService
type ServiceAccountServiceFactory func(ctx context.Context, base BaseService) ServiceAccountService
type FileServiceFactory func(ctx context.Context, base BaseService) FileService
type StatsServiceFactory func(ctx context.Context, base BaseService) StatsService
type OrganizationServiceFactory func(ctx context.Context, base BaseService) OrganizationService
type AIServiceFactory func(ctx context.Context, base BaseService) AIService
type TaskSchedulerServiceFactory func(ctx context.Context, base BaseService) TaskSchedulerService

type serviceOptions struct {
	settingServiceFactory        SettingServiceFactory
	emailServiceFactory          EmailServiceFactory
	geoIPServiceFactory          GeoIPServiceFactory
	toolSetServiceFactory        ToolSetServiceFactory
	userServiceFactory           UserServiceFactory
	roleServiceFactory           RoleServiceFactory
	permissionServiceFactory     PermissionServiceFactory
	systemServiceFactory         SystemServiceFactory
	sessionServiceFactory        SessionServiceFactory
	auditLogServiceFactory       AuditLogServiceFactory
	serviceAccountServiceFactory ServiceAccountServiceFactory
	fileServiceFactory           FileServiceFactory
	statsServiceFactory          StatsServiceFactory
	organizationServiceFactory   OrganizationServiceFactory
	aiServiceFactory             AIServiceFactory
	taskSchedulerServiceFactory  TaskSchedulerServiceFactory
}

// ServiceOption configures service construction in NewService.
type ServiceOption func(*serviceOptions)

func WithSettingServiceFactory(f SettingServiceFactory) ServiceOption {
	return func(o *serviceOptions) { o.settingServiceFactory = f }
}

func WithEmailServiceFactory(f EmailServiceFactory) ServiceOption {
	return func(o *serviceOptions) { o.emailServiceFactory = f }
}

func WithGeoIPServiceFactory(f GeoIPServiceFactory) ServiceOption {
	return func(o *serviceOptions) { o.geoIPServiceFactory = f }
}

func WithToolSetServiceFactory(f ToolSetServiceFactory) ServiceOption {
	return func(o *serviceOptions) { o.toolSetServiceFactory = f }
}

func WithUserServiceFactory(f UserServiceFactory) ServiceOption {
	return func(o *serviceOptions) { o.userServiceFactory = f }
}

func WithRoleServiceFactory(f RoleServiceFactory) ServiceOption {
	return func(o *serviceOptions) { o.roleServiceFactory = f }
}

func WithPermissionServiceFactory(f PermissionServiceFactory) ServiceOption {
	return func(o *serviceOptions) { o.permissionServiceFactory = f }
}

func WithSystemServiceFactory(f SystemServiceFactory) ServiceOption {
	return func(o *serviceOptions) { o.systemServiceFactory = f }
}

func WithSessionServiceFactory(f SessionServiceFactory) ServiceOption {
	return func(o *serviceOptions) { o.sessionServiceFactory = f }
}

func WithAuditLogServiceFactory(f AuditLogServiceFactory) ServiceOption {
	return func(o *serviceOptions) { o.auditLogServiceFactory = f }
}

func WithServiceAccountServiceFactory(f ServiceAccountServiceFactory) ServiceOption {
	return func(o *serviceOptions) { o.serviceAccountServiceFactory = f }
}

func WithFileServiceFactory(f FileServiceFactory) ServiceOption {
	return func(o *serviceOptions) { o.fileServiceFactory = f }
}

func WithStatsServiceFactory(f StatsServiceFactory) ServiceOption {
	return func(o *serviceOptions) { o.statsServiceFactory = f }
}

func WithOrganizationServiceFactory(f OrganizationServiceFactory) ServiceOption {
	return func(o *serviceOptions) { o.organizationServiceFactory = f }
}

func WithAIServiceFactory(f AIServiceFactory) ServiceOption {
	return func(o *serviceOptions) { o.aiServiceFactory = f }
}

func WithTaskSchedulerServiceFactory(f TaskSchedulerServiceFactory) ServiceOption {
	return func(o *serviceOptions) { o.taskSchedulerServiceFactory = f }
}

func applyServiceDefaults(o *serviceOptions) {
	if o.settingServiceFactory == nil {
		o.settingServiceFactory = NewSettingService
	}
	if o.emailServiceFactory == nil {
		o.emailServiceFactory = NewEmailService
	}
	if o.geoIPServiceFactory == nil {
		o.geoIPServiceFactory = NewGeoIPService
	}
	if o.toolSetServiceFactory == nil {
		o.toolSetServiceFactory = NewToolSetService
	}
	if o.userServiceFactory == nil {
		o.userServiceFactory = NewUserService
	}
	if o.roleServiceFactory == nil {
		o.roleServiceFactory = NewRoleService
	}
	if o.permissionServiceFactory == nil {
		o.permissionServiceFactory = NewPermissionService
	}
	if o.systemServiceFactory == nil {
		o.systemServiceFactory = NewSystemService
	}
	if o.sessionServiceFactory == nil {
		o.sessionServiceFactory = NewSessionService
	}
	if o.auditLogServiceFactory == nil {
		o.auditLogServiceFactory = NewAuditLogService
	}
	if o.serviceAccountServiceFactory == nil {
		o.serviceAccountServiceFactory = NewServiceAccountService
	}
	if o.fileServiceFactory == nil {
		o.fileServiceFactory = NewFileService
	}
	if o.statsServiceFactory == nil {
		o.statsServiceFactory = NewStatsService
	}
	if o.organizationServiceFactory == nil {
		o.organizationServiceFactory = NewOrganizationService
	}
	if o.aiServiceFactory == nil {
		o.aiServiceFactory = NewAIService
	}
	if o.taskSchedulerServiceFactory == nil {
		o.taskSchedulerServiceFactory = NewSchedulerService
	}
}
