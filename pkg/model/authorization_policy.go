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

package model

import (
	"encoding/json"
	"strings"
)

// PolicyDocument represents an IAM-style policy document
type PolicyDocument struct {
	Statement []StatementEntry `json:"Statement"`
}

// IsValid checks if the PolicyDocument is valid
func (p *PolicyDocument) IsValid() bool {
	if p == nil || len(p.Statement) == 0 {
		return true
	}
	for _, stmt := range p.Statement {
		if stmt.Effect != "Allow" && stmt.Effect != "Deny" {
			return false
		}
		if len(stmt.Condition) == 0 && len(stmt.Action) == 0 && len(stmt.Resource) == 0 {
			return false
		}
		for _, condition := range stmt.Condition {
			for _, value := range condition {
				if value == nil {
					return false
				}
			}
		}
	}
	return true
}

// StatementEntry represents a single policy statement
type StatementEntry struct {
	Effect    string               `json:"Effect"`              // "Allow" or "Deny"
	Action    []string             `json:"Action"`              // List of actions, can contain wildcards "*"
	Resource  []string             `json:"Resource,omitempty"`  // List of resources, can contain wildcards "*"
	Condition map[string]Condition `json:"Condition,omitempty"` // Conditions
}

// Condition represents a policy condition
type Condition map[string]interface{}

// ParsePolicyDocument parses a policy document from a JSON string
func ParsePolicyDocument(jsonData string) (*PolicyDocument, error) {
	if jsonData == "" {
		return &PolicyDocument{}, nil
	}

	var doc PolicyDocument
	err := json.Unmarshal([]byte(jsonData), &doc)
	return &doc, err
}

// CheckPermission determines if the policy document allows the specified action
func (p *PolicyDocument) CheckPermission(action string, resource string, context map[string]interface{}) (isMatch bool, isAllow bool) {
	if p == nil || len(p.Statement) == 0 {
		return false, false
	}

	// Check policy statements one by one
	for _, stmt := range p.Statement {
		// Check if the action matches
		if !matchesAction(stmt.Action, action) {
			continue
		}

		// If resources are specified, check if the resource matches
		if len(stmt.Resource) > 0 && !matchesResource(stmt.Resource, resource) {
			continue
		}

		// Check if conditions are met
		if len(stmt.Condition) > 0 && !matchesCondition(stmt.Condition, context) {
			continue
		}

		// Statement matches, set effect
		return true, stmt.Effect == "Allow"
	}

	return false, false
}

// matchesAction checks if the action matches
func matchesAction(patterns []string, action string) bool {
	for _, pattern := range patterns {
		if pattern == "*" {
			return true
		}
		if pattern == action {
			return true
		}
		if strings.HasSuffix(pattern, "*") {
			prefix := strings.TrimSuffix(pattern, "*")
			if strings.HasPrefix(action, prefix) {
				return true
			}
		}
	}
	return false
}

// matchesResource checks if the resource matches
func matchesResource(patterns []string, resource string) bool {
	for _, pattern := range patterns {
		if pattern == "*" {
			return true
		}
		if pattern == resource {
			return true
		}
		if strings.HasSuffix(pattern, "*") {
			prefix := strings.TrimSuffix(pattern, "*")
			if strings.HasPrefix(resource, prefix) {
				return true
			}
		}
	}
	return false
}

// matchesCondition checks if conditions are met
func matchesCondition(conditions map[string]Condition, context map[string]interface{}) bool {
	for operator, condition := range conditions {
		switch operator {
		case "StringEquals":
			for key, value := range condition {
				contextVal, ok := getValueFromContext(context, key)
				if !ok || contextVal != value {
					return false
				}
			}
		case "StringNotEquals":
			for key, value := range condition {
				contextVal, ok := getValueFromContext(context, key)
				if !ok || contextVal == value {
					return false
				}
			}
		case "NumericEquals":
			for key, value := range condition {
				contextVal, ok := getNumericValueFromContext(context, key)
				expectedVal, ok2 := value.(float64)
				if !ok || !ok2 || contextVal != expectedVal {
					return false
				}
			}
		case "NumericGreaterThan":
			for key, value := range condition {
				contextVal, ok := getNumericValueFromContext(context, key)
				expectedVal, ok2 := value.(float64)
				if !ok || !ok2 || contextVal <= expectedVal {
					return false
				}
			}
		case "NumericLessThan":
			for key, value := range condition {
				contextVal, ok := getNumericValueFromContext(context, key)
				expectedVal, ok2 := value.(float64)
				if !ok || !ok2 || contextVal >= expectedVal {
					return false
				}
			}
		// More condition types can be added as needed
		default:
			return false // Unsupported operator
		}
	}
	return true
}

// getValueFromContext gets a value from the context
func getValueFromContext(context map[string]interface{}, key string) (string, bool) {
	if val, ok := context[key]; ok {
		strVal, ok := val.(string)
		return strVal, ok
	}
	return "", false
}

// getNumericValueFromContext gets a numeric value from the context
func getNumericValueFromContext(context map[string]interface{}, key string) (float64, bool) {
	if val, ok := context[key]; ok {
		switch v := val.(type) {
		case int:
			return float64(v), true
		case int64:
			return float64(v), true
		case float64:
			return v, true
		case float32:
			return float64(v), true
		}
	}
	return 0, false
}
