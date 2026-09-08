// Copyright 2026 Sven Victor
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
	"fmt"

	"gopkg.in/yaml.v3"
)

// YAMLReencryptResult is the outcome of rewriting {CRYPT} scalars in a YAML document.
type YAMLReencryptResult struct {
	Output           []byte
	Ciphertexts      int
	EncryptKeyWrites int
}

// ReencryptYAMLDocument walks a YAML document as a node tree and re-encrypts
// every scalar that starts with {CRYPT}. When writeEncryptKey is true, mapping
// values whose key is "encrypt-key" are replaced with newEncryptKey (the key
// itself is never treated as ciphertext).
func ReencryptYAMLDocument(doc []byte, oldKey, newKey string, writeEncryptKey bool, newEncryptKey string) (*YAMLReencryptResult, error) {
	if len(doc) == 0 {
		return &YAMLReencryptResult{Output: doc}, nil
	}
	var root yaml.Node
	if err := yaml.Unmarshal(doc, &root); err != nil {
		return nil, fmt.Errorf("failed to parse YAML: %w", err)
	}
	result := &YAMLReencryptResult{}
	if err := walkYAMLNode(&root, "", oldKey, newKey, writeEncryptKey, newEncryptKey, result); err != nil {
		return nil, err
	}
	out, err := yaml.Marshal(&root)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal YAML: %w", err)
	}
	result.Output = out
	return result, nil
}

func walkYAMLNode(n *yaml.Node, parentKey, oldKey, newKey string, writeEncryptKey bool, newEncryptKey string, result *YAMLReencryptResult) error {
	if n == nil {
		return nil
	}
	switch n.Kind {
	case yaml.DocumentNode, yaml.SequenceNode:
		for i := range n.Content {
			if err := walkYAMLNode(n.Content[i], parentKey, oldKey, newKey, writeEncryptKey, newEncryptKey, result); err != nil {
				return err
			}
		}
	case yaml.MappingNode:
		for i := 0; i+1 < len(n.Content); i += 2 {
			keyNode := n.Content[i]
			valNode := n.Content[i+1]
			key := keyNode.Value
			if writeEncryptKey && key == "encrypt-key" && valNode.Kind == yaml.ScalarNode {
				if valNode.Value != newEncryptKey {
					valNode.Value = newEncryptKey
					valNode.Tag = "!!str"
					result.EncryptKeyWrites++
				}
				continue
			}
			if err := walkYAMLNode(valNode, key, oldKey, newKey, writeEncryptKey, newEncryptKey, result); err != nil {
				return err
			}
		}
	case yaml.ScalarNode:
		if parentKey == "encrypt-key" {
			return nil
		}
		if !IsEncrypted(n.Value) {
			return nil
		}
		ns, err := ReencryptCiphertext(n.Value, oldKey, newKey)
		if err != nil {
			return fmt.Errorf("YAML key %q: %w", parentKey, err)
		}
		n.Value = ns
		n.Tag = "!!str"
		result.Ciphertexts++
	}
	return nil
}
