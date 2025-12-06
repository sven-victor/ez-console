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

package util

type ConfigFieldOptions struct {
	Label string `json:"label"`
	Value string `json:"value"`
}

type FieldType string

const (
	FieldTypeText     FieldType = "text"
	FieldTypeString   FieldType = "string"
	FieldTypePassword FieldType = "password"
	FieldTypeNumber   FieldType = "number"
	FieldTypeBoolean  FieldType = "boolean"
	FieldTypeArray    FieldType = "array"
	FieldTypeObject   FieldType = "object"
	FieldTypeSelect   FieldType = "select" // select dropdown
)

// DataSourceType defines the type of data source for dynamic options
type DataSourceType string

const (
	// DataSourceTypeStatic uses the static Options field
	DataSourceTypeStatic DataSourceType = "static"
	// DataSourceTypeAPI fetches options from an external API
	DataSourceTypeAPI DataSourceType = "api"
	// DataSourceTypeToolsets filters options from registered toolsets
	DataSourceTypeToolsets DataSourceType = "toolsets"
	// DataSourceTypeInternal fetches options from internal system data
	DataSourceTypeInternal DataSourceType = "internal"
)

// DataSource defines how to dynamically load options for a config field
type DataSource struct {
	// Type specifies the data source type
	Type DataSourceType `json:"type"`

	// API-specific fields (when Type = "api")
	URL    string `json:"url,omitempty"`    // API endpoint URL
	Method string `json:"method,omitempty"` // HTTP method (GET, POST, etc.)

	// Response mapping fields (for API and other sources)
	LabelKey string `json:"label_key,omitempty"` // JSON key for option label
	ValueKey string `json:"value_key,omitempty"` // JSON key for option value

	// Cache control
	Cache    bool `json:"cache,omitempty"`     // Whether to cache the results
	CacheTTL int  `json:"cache_ttl,omitempty"` // Cache TTL in seconds (0 = no expiration)

	// Filter conditions (flexible filtering for different source types)
	// For toolsets: {"type": "webhook"} to filter by toolset type
	// For internal: {"status": "active"} to filter by status, etc.
	Filter map[string]interface{} `json:"filter,omitempty"`

	// Parameters for API requests (query params or request body)
	Params map[string]interface{} `json:"params,omitempty"`

	// DependsOn specifies field dependencies (field names that this field depends on)
	// When dependent fields change, this field's options should be reloaded
	DependsOn []string `json:"depends_on,omitempty"`
}

// VisibleConditionOperator defines operators for visibility conditions
type VisibleConditionOperator string

const (
	// OperatorEq checks if field value equals the specified value
	OperatorEq VisibleConditionOperator = "eq"
	// OperatorNe checks if field value does not equal the specified value
	OperatorNe VisibleConditionOperator = "ne"
	// OperatorIn checks if field value is in the specified array
	OperatorIn VisibleConditionOperator = "in"
	// OperatorNotIn checks if field value is not in the specified array
	OperatorNotIn VisibleConditionOperator = "not_in"
	// OperatorContains checks if field value contains the specified substring (for string fields)
	OperatorContains VisibleConditionOperator = "contains"
)

// VisibleCondition defines when a field should be visible
type VisibleCondition struct {
	// Field is the name of the field to check
	Field string `json:"field"`
	// Operator is the comparison operator (eq, ne, in, not_in, contains)
	Operator VisibleConditionOperator `json:"operator"`
	// Value is the value to compare against (can be a single value or array for in/not_in)
	Value interface{} `json:"value"`
}

type ConfigField struct {
	Name        string               `json:"name"`
	DisplayName string               `json:"display_name"`
	Description string               `json:"description"`
	Type        FieldType            `json:"type"`
	Required    bool                 `json:"required"`
	Default     string               `json:"default"`
	Options     []ConfigFieldOptions `json:"options,omitempty"`      // Static options (used when DataSource is nil or type=static)
	DataSource  *DataSource          `json:"data_source,omitempty"`  // Dynamic data source configuration
	VisibleWhen *VisibleCondition    `json:"visible_when,omitempty"` // Condition for field visibility
	Placeholder string               `json:"placeholder"`
}
