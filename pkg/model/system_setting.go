package model

import (
	"database/sql/driver"
	"fmt"
	"reflect"
	"slices"
	"strings"
)

// SettingKey System setting key enumeration
type SettingKey string

// System setting key constants
const (
	// System general settings
	SettingSystemName     SettingKey = "system_name"      // System name
	SettingSystemNameI18n SettingKey = "system_name_i18n" // System name i18n
	SettingSystemLogo     SettingKey = "system_logo"      // System Logo URL
	SettingSystemHomePage SettingKey = "system_home_page" // System Home Page
)

var SystemSettingKeys = []SettingKey{
	SettingSystemName,
	SettingSystemNameI18n,
	SettingSystemLogo,
	SettingSystemHomePage,
}

var SettingKeys = []SettingKey{}

type SystemSettings struct {
	Name     string            `json:"name"`
	NameI18n map[string]string `json:"name_i18n"`
	Logo     string            `json:"logo"`
	HomePage string            `json:"home_page"`
}

func init() {
	SettingKeys = append(SettingKeys, SystemSettingKeys...)

	RegisterSettingKeys("system", SystemSettings{}, SystemSettingKeys...)
}

func RegisterSettingKeys(prefix string, obj any, keys ...SettingKey) {
	validateSettingKeys(prefix, obj, keys)
	SettingKeys = append(SettingKeys, keys...)
}

// Value implements the driver.Valuer interface
func (s SettingKey) Value() (driver.Value, error) {
	return string(s), nil
}

// Setting System setting data model
type Setting struct {
	Base
	Key     SettingKey `gorm:"size:50;uniqueIndex;not null" json:"key"` // Setting key
	Value   string     `gorm:"type:text" json:"value"`                  // Setting value
	Comment string     `gorm:"size:255" json:"comment"`                 // Setting description
}

// NewSetting creates a new system setting
func NewSetting(key SettingKey, value string, comment string) *Setting {
	return &Setting{
		Key:     key,
		Value:   value,
		Comment: comment,
	}
}

func validateSettingKeys(prefix string, s any, actualKeys []SettingKey) {
	var keys []SettingKey
	typeOf := reflect.TypeOf(s)
	for i := 0; i < typeOf.NumField(); i++ {
		field := typeOf.Field(i)
		tag := field.Tag.Get("json")
		jsonName, _, _ := strings.Cut(tag, ",")
		if jsonName == "" {
			continue
		}
		if prefix != "" {
			jsonName = prefix + "_" + jsonName
		}
		keys = append(keys, SettingKey(jsonName))
	}
	slices.Sort(keys)
	slices.Sort(actualKeys)
	if !reflect.DeepEqual(keys, actualKeys) {
		panic(fmt.Sprintf("validateSettingKeys: %s keys not match, \nexpected: %v, \n  actual: %v", prefix, actualKeys, keys))
	}

}
