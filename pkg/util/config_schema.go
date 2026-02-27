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

import (
	"encoding/json"

	"github.com/invopop/jsonschema"
	orderedmap "github.com/wk8/go-ordered-map/v2"
)

// ConfigFieldsToJSONSchema converts ConfigField slice to a JSON Schema object.
// Used as fallback when a factory does not implement GetConfigSchema.
func ConfigFieldsToJSONSchema(fields []ConfigField) *jsonschema.Schema {
	if len(fields) == 0 {
		return &jsonschema.Schema{
			Type:       "object",
			Properties: orderedmap.New[string, *jsonschema.Schema](),
		}
	}
	props := orderedmap.New[string, *jsonschema.Schema]()
	var required []string
	for _, f := range fields {
		prop := configFieldToPropertySchema(f)
		props.Set(f.Name, prop)
		if f.Required {
			required = append(required, f.Name)
		}
	}
	return &jsonschema.Schema{
		Type:       "object",
		Properties: props,
		Required:   required,
	}
}

func configFieldToPropertySchema(f ConfigField) *jsonschema.Schema {
	s := &jsonschema.Schema{
		Title:       f.DisplayName,
		Description: f.Description,
		Default:     defaultValueForSchema(f.Default, f.Type),
		Extras:      map[string]any{},
	}
	if f.Placeholder != "" {
		s.Extras["x-ui-placeholder"] = f.Placeholder
	}
	switch f.Type {
	case FieldTypeText, FieldTypeString, FieldTypePassword:
		s.Type = "string"
		if f.Type == FieldTypePassword {
			s.Format = "password"
		}
	case FieldTypeNumber:
		s.Type = "number"
	case FieldTypeBoolean:
		s.Type = "boolean"
	case FieldTypeArray:
		s.Type = "array"
		s.Items = &jsonschema.Schema{Type: "string"}
	case FieldTypeObject:
		s.Type = "object"
		s.Extras["x-ui-widget"] = "objectEditor"
	case FieldTypeSelect:
		s.Type = "string"
		if len(f.Options) > 0 {
			enum := make([]any, 0, len(f.Options))
			for _, o := range f.Options {
				enum = append(enum, o.Value)
			}
			s.Enum = enum
		} else if f.DataSource != nil {
			s.Extras = make(map[string]any)
			switch f.DataSource.Type {
			case DataSourceTypeToolsets:
				s.Extras["x-ui-widget"] = "toolsetsSelect"
			case DataSourceTypeAPI:
				s.Extras["x-ui-widget"] = "remoteSelect"
			}
			s.Extras["x-data-source"] = f.DataSource
		}
	default:
		s.Type = "string"
	}
	return s
}

func defaultValueForSchema(defaultStr string, ft FieldType) any {
	if defaultStr == "" {
		return nil
	}
	switch ft {
	case FieldTypeBoolean:
		return defaultStr == "true"
	case FieldTypeNumber:
		var n float64
		_ = json.Unmarshal([]byte(defaultStr), &n)
		return n
	case FieldTypeArray, FieldTypeObject:
		var v any
		_ = json.Unmarshal([]byte(defaultStr), &v)
		return v
	default:
		return defaultStr
	}
}
