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
	userService := NewUserService(baseService, ldapService)
	// Create OAuth service and initialize it
	oauthService := &OAuthService{
		BaseService: baseService,
		UserService: userService,
	}

	s := &Service{
		UserService:           userService,
		PermissionService:     new(PermissionService),
		RoleService:           new(RoleService),
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
	}
	s.FileService = NewFileService(baseService)
	return s
}
