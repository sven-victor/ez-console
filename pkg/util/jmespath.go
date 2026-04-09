package util

import (
	"fmt"

	"github.com/jmespath/go-jmespath"
)

// JMESPathExtract evaluates a JMESPath expression against data and returns the raw result.
// Returns nil if the expression is empty or the result is nil.
func JMESPathExtract(data interface{}, expression string) (interface{}, error) {
	if expression == "" {
		return nil, nil
	}
	result, err := jmespath.Search(expression, data)
	if err != nil {
		return nil, fmt.Errorf("JMESPath expression %q failed: %w", expression, err)
	}
	return result, nil
}

// JMESPathExtractString evaluates a JMESPath expression and returns the result as a string.
// Returns empty string if the expression is empty, the result is nil, or the result is not a string.
func JMESPathExtractString(data interface{}, expression string) string {
	result, err := JMESPathExtract(data, expression)
	if err != nil || result == nil {
		return ""
	}
	if s, ok := result.(string); ok {
		return s
	}
	return ""
}

// JMESPathExtractStringSlice evaluates a JMESPath expression and returns
// the result as a []string. Handles single string, []interface{}, and
// []string results. Returns nil on empty expression or type mismatch.
func JMESPathExtractStringSlice(data interface{}, expression string) []string {
	result, err := JMESPathExtract(data, expression)
	if err != nil || result == nil {
		return nil
	}
	switch v := result.(type) {
	case string:
		return []string{v}
	case []interface{}:
		out := make([]string, 0, len(v))
		for _, item := range v {
			if s, ok := item.(string); ok {
				out = append(out, s)
			}
		}
		return out
	case []string:
		return v
	default:
		return nil
	}
}
