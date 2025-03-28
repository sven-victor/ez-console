package middleware

import (
	"context"

	"github.com/sven-victor/ez-console/pkg/model"
)

type SettingService interface {
	GetIntSetting(ctx context.Context, key model.SettingKey, defaultValue int) (int, error)
	GetBoolSetting(ctx context.Context, key model.SettingKey, defaultValue bool) (bool, error)
	GetStringSetting(ctx context.Context, key model.SettingKey, defaultValue string) (string, error)
}

var settingService SettingService

func RegisterSettingService(service SettingService) {
	settingService = service
}

func GetSettingService() SettingService {
	return settingService
}
