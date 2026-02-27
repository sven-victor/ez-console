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
	"testing"
)

func TestConfigFieldsToJSONSchema_Empty(t *testing.T) {
	schema := ConfigFieldsToJSONSchema(nil)
	if schema == nil {
		t.Fatal("expected non-nil schema")
	}
	if schema.Type != "object" {
		t.Errorf("expected type object, got %q", schema.Type)
	}
	if schema.Properties == nil {
		t.Error("expected non-nil Properties")
	}
}

func TestConfigFieldsToJSONSchema_StringNumberBooleanSelect(t *testing.T) {
	fields := []ConfigField{
		{Name: "name", DisplayName: "Name", Type: FieldTypeString, Required: true},
		{Name: "count", DisplayName: "Count", Type: FieldTypeNumber, Required: false},
		{Name: "enabled", DisplayName: "Enabled", Type: FieldTypeBoolean, Default: "true"},
		{
			Name: "protocol", DisplayName: "Protocol", Type: FieldTypeSelect, Required: true,
			Options: []ConfigFieldOptions{{Label: "HTTP", Value: "http"}, {Label: "WS", Value: "websocket"}},
		},
	}
	schema := ConfigFieldsToJSONSchema(fields)
	if schema == nil {
		t.Fatal("expected non-nil schema")
	}
	if schema.Type != "object" {
		t.Errorf("expected type object, got %q", schema.Type)
	}
	if len(schema.Required) != 2 {
		t.Errorf("expected 2 required (name, protocol), got %v", schema.Required)
	}
	// Marshal to JSON and check structure
	data, err := json.Marshal(schema)
	if err != nil {
		t.Fatal(err)
	}
	var m map[string]interface{}
	if err := json.Unmarshal(data, &m); err != nil {
		t.Fatal(err)
	}
	props, ok := m["properties"].(map[string]interface{})
	if !ok {
		t.Fatalf("expected properties object, got %T", m["properties"])
	}
	if _, ok := props["name"]; !ok {
		t.Error("missing property name")
	}
	if _, ok := props["protocol"]; !ok {
		t.Error("missing property protocol")
	}
}
