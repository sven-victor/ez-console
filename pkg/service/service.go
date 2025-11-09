package service

import "context"

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
}

type BaseService struct {
	*CacheService
	*SettingService
	*EmailService
	*GeoIPService
}

func NewService(ctx context.Context) *Service {

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
	aiChatService := NewAIChatService(aiModelService, toolSetService)

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
	}
	s.FileService = NewFileService(baseService)
	return s
}
