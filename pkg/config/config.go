package config

import (
	"context"
	"fmt"
	"os"
	"reflect"
	"strconv"
	"time"

	"github.com/gogo/protobuf/types"
	"github.com/mitchellh/mapstructure"
	"github.com/prometheus/common/model"
	"github.com/spf13/afero"
	"github.com/spf13/viper"
	"github.com/sven-victor/ez-console/pkg/util/jwt"
	"github.com/sven-victor/ez-utils/clients/tracing"

	gorm "github.com/sven-victor/ez-utils/clients/gorm"
	"github.com/sven-victor/ez-utils/safe"
	w "github.com/sven-victor/ez-utils/wrapper"
)

type CacheConfig struct {
	Size int `yaml:"size"`
}

func (c *CacheConfig) GetSize() int {
	if c.Size <= 0 {
		return 1000
	}
	return c.Size
}

// Config application configuration structure
type Config struct {
	Tracing  tracing.TraceOptions `yaml:"tracing" mapstructure:"tracing"`
	Server   ServerConfig         `yaml:"server" mapstructure:"server"`
	Database *gorm.Client         `yaml:"database" mapstructure:"database"`
	JWT      jwt.Config           `yaml:"jwt" mapstructure:"jwt"`
	OAuth    OAuthConfig          `yaml:"oauth" mapstructure:"oauth"`
	Cache    CacheConfig          `yaml:"cache" mapstructure:"cache"`
}

// ServerConfig server configuration
type ServerConfig struct {
	Host            string        `yaml:"host" mapstructure:"host"`
	Port            int           `yaml:"port" mapstructure:"port"`
	Mode            string        `yaml:"mode" mapstructure:"mode"`
	RootURL         string        `yaml:"root_url" mapstructure:"root_url"`
	ReadTimeout     time.Duration `yaml:"read_timeout" mapstructure:"read_timeout"`
	WriteTimeout    time.Duration `yaml:"write_timeout" mapstructure:"write_timeout"`
	ShutdownTimeout time.Duration `yaml:"shutdown_timeout" mapstructure:"shutdown_timeout"`
	MaxUploadSize   int64         `yaml:"max_upload_size" mapstructure:"max_upload_size"`
	FileUploadPath  string        `yaml:"file_upload_path" mapstructure:"file_upload_path"`
	GeoIPDBPath     string        `yaml:"geoip_db_path" mapstructure:"geoip_db_path"`
}

type UploadConfig struct {
	Dir string `yaml:"dir" mapstructure:"dir"`
}

func (c *Config) GetUploadDir() (afero.Fs, error) {
	if c.Server.FileUploadPath == "" {
		return nil, fmt.Errorf("upload dir is not set")
	}
	return afero.NewBasePathFs(afero.NewOsFs(), c.Server.FileUploadPath), nil
}

// JWTConfig JWT configuration
type JWTConfig struct {
	Secret string `yaml:"secret" mapstructure:"secret"`
}

// LogConfig log configuration
type LogConfig struct {
	Level string `yaml:"level" mapstructure:"level"`
	Path  string `yaml:"path" mapstructure:"path"`
}

// OAuthConfig OAuth authentication configuration
type OAuthConfig struct {
	Enabled        *bool            `yaml:"enabled" mapstructure:"enabled"`
	AutoCreateUser bool             `yaml:"auto_create_user" mapstructure:"auto_create_user"`
	Providers      []ProviderConfig `yaml:"providers" mapstructure:"providers"`
}

// GetEnabled gets whether OAuth configuration is enabled
func (c *OAuthConfig) GetEnabled() bool {
	if c.Enabled == nil {
		return true
	}
	return *c.Enabled
}

// ProviderConfig OAuth provider configuration
type ProviderConfig struct {
	Name           string `yaml:"name" mapstructure:"name"`
	DisplayName    string `yaml:"display_name" mapstructure:"display_name"`
	IconURL        string `yaml:"icon_url" mapstructure:"icon_url"`
	ClientID       string `yaml:"client_id" mapstructure:"client_id"`
	ClientSecret   string `yaml:"client_secret" mapstructure:"client_secret"`
	RedirectURL    string `yaml:"redirect_url" mapstructure:"redirect_url"`
	Scopes         string `yaml:"scopes" mapstructure:"scopes"`
	AuthURL        string `yaml:"auth_url" mapstructure:"auth_url"`
	TokenURL       string `yaml:"token_url" mapstructure:"token_url"`
	UserInfoURL    string `yaml:"user_info_url" mapstructure:"user_info_url"`
	Enabled        *bool  `yaml:"enabled" mapstructure:"enabled"`
	EmailField     string `yaml:"email_field" mapstructure:"email_field"`
	UsernameField  string `yaml:"username_field" mapstructure:"username_field"`
	FullNameField  string `yaml:"full_name_field" mapstructure:"full_name_field"`
	AvatarField    string `yaml:"avatar_field" mapstructure:"avatar_field"`
	RoleField      string `yaml:"role_field" mapstructure:"role_field"`
	AutoCreateUser bool   `yaml:"auto_create_user" mapstructure:"auto_create_user"`

	WellknownEndpoint string `yaml:"wellknown_endpoint" mapstructure:"wellknown_endpoint"`
}

func (p *ProviderConfig) GetEnabled() bool {
	if p.Enabled == nil {
		return true
	}
	return *p.Enabled
}

var globalConfig *Config

// GetConfig gets the global configuration
func GetConfig() *Config {
	return globalConfig
}

func setDefaultConfig(appName string) {
	viper.SetDefault("oauth.enabled", false)
	viper.SetDefault("oauth.auto_create_user", false)
	viper.SetDefault("oauth.providers", []ProviderConfig{
		{
			Name:        "github",
			DisplayName: "GitHub",
			AuthURL:     "https://github.com/login/oauth/authorize",
			TokenURL:    "https://github.com/login/oauth/access_token",
			UserInfoURL: "https://api.github.com/user",
			Scopes:      "user:email",
			Enabled:     &[]bool{false}[0],
		},
	})
	viper.SetDefault("tracing.service_name", appName)
}

func StringToBoolHookFunc() mapstructure.DecodeHookFunc {
	return func(
		f reflect.Type,
		t reflect.Type,
		data interface{}) (interface{}, error) {
		if f.Kind() != reflect.String || t.Kind() != reflect.Bool {
			return data, nil
		}
		if data.(string) == "" {
			return false, nil
		}
		return strconv.ParseBool(data.(string))
	}
}

func StringToDurationHookFunc() mapstructure.DecodeHookFunc {
	return func(
		f reflect.Type,
		t reflect.Type,
		data interface{}) (interface{}, error) {
		if f.Kind() != reflect.String {
			return data, nil
		}
		if (t == reflect.TypeOf(w.P(model.Duration(0))) || t == reflect.TypeOf(&types.Duration{}) || t == reflect.TypeOf(w.P(time.Duration(0)))) {
			if data.(string) == "" {
				return reflect.New(t).Elem().Interface(), nil
			}
			switch t.Elem() {
			case reflect.TypeOf(model.Duration(0)):
				d, err := model.ParseDuration(data.(string))
				if err != nil {
					return nil, err
				}
				return &d, nil
			case reflect.TypeOf(types.Duration{}):
				d, err := model.ParseDuration(data.(string))
				if err != nil {
					return nil, err
				}
				return types.DurationProto(time.Duration(d)), nil
			case reflect.TypeOf(time.Duration(0)):
				d, err := model.ParseDuration(data.(string))
				if err != nil {
					return nil, err
				}
				return w.P(time.Duration(d)), nil
			}
		}

		switch t {
		case reflect.TypeOf(model.Duration(0)):
			d, err := model.ParseDuration(data.(string))
			if err != nil {
				return nil, err
			}
			return d, nil
		case reflect.TypeOf(types.Duration{}):
			d, err := model.ParseDuration(data.(string))
			if err != nil {
				return nil, err
			}
			return *types.DurationProto(time.Duration(d)), nil
		case reflect.TypeOf(time.Duration(0)):
			d, err := model.ParseDuration(data.(string))
			if err != nil {
				return nil, err
			}
			return time.Duration(d), nil
		}

		return data, nil
	}
}

func StringToNumberHookFunc() mapstructure.DecodeHookFunc {
	return func(
		f reflect.Type,
		t reflect.Type,
		data interface{}) (interface{}, error) {
		if f.Kind() != reflect.String {
			return data, nil
		}

		if t.Kind() == reflect.Pointer {
			switch t.Elem().Kind() {
			case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64,
				reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
				return reflect.New(t).Elem().Interface(), nil
			}
		}

		switch t.Kind() {
		case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
			newVal := reflect.New(t).Elem()
			if data.(string) == "" {
				return newVal.Interface(), nil
			}
			i, err := strconv.Atoi(data.(string))
			if err != nil {
				return nil, err
			}
			newVal.SetInt(int64(i))
			return newVal.Interface(), nil
		case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
			newVal := reflect.New(t).Elem()
			if data.(string) == "" {
				return newVal.Interface(), nil
			}
			i, err := strconv.ParseUint(data.(string), 10, 64)
			if err != nil {
				return nil, err
			}
			newVal.SetUint(i)
			return newVal.Interface(), nil
		case reflect.Float32, reflect.Float64:
			newVal := reflect.New(t).Elem()
			if data.(string) == "" {
				return newVal.Interface(), nil
			}
			f, err := strconv.ParseFloat(data.(string), 64)
			if err != nil {
				return nil, err
			}
			newVal.SetFloat(f)
			return newVal.Interface(), nil
		}
		return data, nil
	}
}
func gormClientUnmarshallerHookFunc(f reflect.Type, t reflect.Type, data any) (any, error) {
	if t == reflect.TypeOf(gorm.Client{}) {
		if data, ok := data.(map[string]any); ok {
			decoderHook := mapstructure.ComposeDecodeHookFunc(
				StringToDurationHookFunc(),
				mapstructure.StringToSliceHookFunc(","),
				StringToNumberHookFunc(),
				safe.SafeStringHookFunc(),
				StringToBoolHookFunc(),
			)
			switch data["driver"] {
			case "sqlite":
				var o gorm.SQLiteOptions
				decoder, err := mapstructure.NewDecoder(&mapstructure.DecoderConfig{
					Metadata:   nil,
					Result:     &o,
					DecodeHook: decoderHook,
				})
				if err != nil {
					return nil, err
				}
				if err := decoder.Decode(data); err != nil {
					return nil, err
				}
				return gorm.NewGormSQLiteClient(context.Background(), "default", &o)
			case "mysql":
				var o gorm.MySQLOptions
				decoder, err := mapstructure.NewDecoder(&mapstructure.DecoderConfig{
					Metadata:   nil,
					Result:     &o,
					DecodeHook: decoderHook,
				})
				if err != nil {
					return nil, err
				}
				if err := decoder.Decode(data); err != nil {
					return nil, err
				}
				return gorm.NewMySQLClient(context.Background(), "default", o)
			case "clickhouse":
				var o gorm.ClickhouseOptions
				decoder, err := mapstructure.NewDecoder(&mapstructure.DecoderConfig{
					Metadata:   nil,
					Result:     &o,
					DecodeHook: decoderHook,
				})
				if err != nil {
					return nil, err
				}
				if err := decoder.Decode(data); err != nil {
					return nil, err
				}
			default:
				return nil, fmt.Errorf("unsupported database type: %s", data["type"])
			}

		} else {
			return nil, fmt.Errorf("unsupported type: %T", data)
		}
	}
	return data, nil
}

// LoadConfig loads the configuration
func LoadConfig(appName, configPath string) (*Config, error) {
	setDefaultConfig(appName)
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")

	if configPath != "" {
		viper.SetConfigFile(configPath)
	} else {
		viper.AddConfigPath(".")
		viper.AddConfigPath("./config")
		viper.AddConfigPath(fmt.Sprintf("/etc/%s", appName))
	}

	if err := viper.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); ok {
			// When the configuration file does not exist, create the default configuration
			// viper.SafeWriteConfigAs("./config/config.yaml")
			fmt.Println("config file not found, using default config")
		}
	} else {
		fmt.Println("config file found, using config file:", viper.ConfigFileUsed())
	}

	if encKey := viper.GetString("global.encrypt-key"); encKey != "" {
		switch len(encKey) {
		case 0, 8, 16, 24, 32:
			os.Setenv(safe.SecretEnvName, encKey)
		default:
			return nil, fmt.Errorf("invalid encrypt key length: %d, must be 8,16,24 or 32", len(encKey))
		}
	} else if os.Getenv(safe.SecretEnvName) != "" {
		viper.Set("global.encrypt-key", os.Getenv(safe.SecretEnvName))
	} else {
		return nil, fmt.Errorf("encrypt key is not set")
	}

	if err := viper.Unmarshal(&globalConfig, viper.DecodeHook(mapstructure.ComposeDecodeHookFunc(
		StringToDurationHookFunc(),
		gormClientUnmarshallerHookFunc,
		jwtConfigUnmarshallerHookFunc,
		mapstructure.StringToSliceHookFunc(","),
		StringToNumberHookFunc(),
		safe.SafeStringHookFunc(),
		StringToBoolHookFunc(),
	))); err != nil {
		return nil, fmt.Errorf("failed to parse config file: %w", err)
	}
	return globalConfig, nil
}

func jwtConfigUnmarshallerHookFunc(f reflect.Type, t reflect.Type, data any) (any, error) {
	if t == reflect.TypeOf(jwt.Config{}) {
		if data, ok := data.(map[string]any); ok {
			if data["private_key"] == nil || data["private_key"] == "" {
				return jwt.Config{}, nil
			}
			jwtConfig, err := jwt.NewConfig(data["algorithm"].(string), data["private_key"].(string))
			if err != nil {
				return nil, fmt.Errorf("failed to generate new JWT keys: %w", err)
			}
			return *jwtConfig, nil
		}
		return nil, fmt.Errorf("unsupported type: %T", data)
	}
	return data, nil
}
