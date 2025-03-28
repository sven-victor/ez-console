package service

import (
	"context"
	"runtime"
	"time"

	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
)

// SystemService provides system-related services
type SystemService struct {
	baseService *BaseService
}

func NewSystemService(baseService *BaseService) *SystemService {
	return &SystemService{
		baseService: baseService,
	}
}

// SystemInfo system information structure
type SystemInfo struct {
	UserCount   int64  `json:"user_count"`
	RoleCount   int64  `json:"role_count"`
	Uptime      int64  `json:"uptime"`
	GoVersion   string `json:"go_version"`
	GoRoutines  int    `json:"go_routines"`
	CPUCores    int    `json:"cpu_cores"`
	MemUsage    uint64 `json:"mem_usage"`
	TotalMem    uint64 `json:"total_mem"`
	HeapObjects uint64 `json:"heap_objects"`
}

// GetSystemInfo gets system information
func (s *SystemService) GetSystemInfo(ctx context.Context) (*SystemInfo, error) {
	// Get user count
	var userCount int64
	if err := db.Session(ctx).Model(&model.User{}).Count(&userCount).Error; err != nil {
		return nil, err
	}

	// Get role count
	var roleCount int64
	if err := db.Session(ctx).Model(&model.Role{}).Count(&roleCount).Error; err != nil {
		return nil, err
	}

	// Get Go runtime information
	var memStats runtime.MemStats
	runtime.ReadMemStats(&memStats)

	return &SystemInfo{
		UserCount:   userCount,
		RoleCount:   roleCount,
		Uptime:      time.Now().Unix(),
		GoVersion:   runtime.Version(),
		GoRoutines:  runtime.NumGoroutine(),
		CPUCores:    runtime.NumCPU(),
		MemUsage:    memStats.Alloc,
		TotalMem:    memStats.TotalAlloc,
		HeapObjects: memStats.HeapObjects,
	}, nil
}

// HealthResult health check result
type HealthResult struct {
	Status  string `json:"status"`
	Message string `json:"message"`
	Reason  string `json:"reason,omitempty"`
}

type Navigation struct {
	Name string `json:"name"`
	Path string `json:"path"`
}

var navigation = []Navigation{
	{
		Name: "home",
		Path: "/",
	},
	{
		Name: "console",
		Path: "/console/",
	},
}

func FilterNavigation(f func(nvs []Navigation) []Navigation) {
	navigation = f(navigation)
}

var menu = []MenuConfig{}

func FilterMenu(f func(nvs []MenuConfig) []MenuConfig) {
	menu = f(menu)
}

type MenuConfig struct {
	Name string `json:"name"`
	Path string `json:"path"`
	Icon string `json:"icon"`
	Hide bool   `json:"hide"`
}

type SiteConfig struct {
	model.SystemSettings
	Navigation []Navigation `json:"navigation,omitempty"`
	Menu       []MenuConfig `json:"menu,omitempty"`
}

// GetNavigation gets navigation
func (s *SystemService) GetSite(ctx context.Context) (*SiteConfig, error) {
	user := middleware.GetUserFromContext(ctx)
	systemSettings, err := s.baseService.SettingService.GetSystemSettings(ctx)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return &SiteConfig{
			SystemSettings: *systemSettings,
		}, nil
	}

	return &SiteConfig{
		SystemSettings: *systemSettings,
		Navigation:     navigation,
		Menu:           menu,
	}, nil
}

// HealthCheck system health check
func (s *SystemService) HealthCheck(ctx context.Context) (*HealthResult, error) {
	// Check database connection
	if db.Session(ctx).Error != nil {
		return &HealthResult{
			Status: "error",
			Reason: "Database connection not established",
		}, nil
	}

	// Try to ping the database
	sqlDB, err := db.Session(ctx).DB()
	if err != nil {
		return &HealthResult{
			Status: "error",
			Reason: "Failed to get database connection",
		}, nil
	}

	if err := sqlDB.Ping(); err != nil {
		return &HealthResult{
			Status: "error",
			Reason: "Database ping failed",
		}, nil
	}

	// All checks passed
	return &HealthResult{
		Status:  "ok",
		Message: "System is running normally",
	}, nil
}
