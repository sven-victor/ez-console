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

package ai

import (
	"sync"

	"github.com/sven-victor/ez-console/pkg/model"
)

// GlobalPromptCategory determines when a global prompt is injected.
type GlobalPromptCategory string

const (
	GlobalPromptCategoryAll       GlobalPromptCategory = "all"
	GlobalPromptCategoryStream    GlobalPromptCategory = "stream"
	GlobalPromptCategoryNonStream GlobalPromptCategory = "non_stream"
)

// GlobalPrompt represents a globally registered AI prompt that is prepended
// to every chat request matching the specified category.
type GlobalPrompt struct {
	Content  string
	Role     model.AIChatMessageRole
	Category GlobalPromptCategory
}

var (
	globalPrompts   []GlobalPrompt
	globalPromptsMu sync.RWMutex
)

// RegisterGlobalPrompt registers a global AI prompt. Registered prompts are
// prepended to chat messages for every AI conversation that matches the
// given category. This follows the same registration pattern as
// middleware.RegisterPermission.
func RegisterGlobalPrompt(content string, category GlobalPromptCategory) {
	RegisterGlobalPromptWithRole(content, model.AIChatMessageRoleSystem, category)
}

// RegisterGlobalPromptWithRole registers a global AI prompt with a specific role.
func RegisterGlobalPromptWithRole(content string, role model.AIChatMessageRole, category GlobalPromptCategory) {
	globalPromptsMu.Lock()
	defer globalPromptsMu.Unlock()
	globalPrompts = append(globalPrompts, GlobalPrompt{
		Content:  content,
		Role:     role,
		Category: category,
	})
}

// GetGlobalPrompts returns all registered global prompts that match the given
// category. Prompts registered with GlobalPromptCategoryAll match any category.
func GetGlobalPrompts(category GlobalPromptCategory) []GlobalPrompt {
	globalPromptsMu.RLock()
	defer globalPromptsMu.RUnlock()
	var result []GlobalPrompt
	for _, p := range globalPrompts {
		if p.Category == GlobalPromptCategoryAll || p.Category == category {
			result = append(result, p)
		}
	}
	return result
}

// GetGlobalPromptMessages returns the global prompts as ChatMessage slice,
// ready to be prepended to a conversation.
func GetGlobalPromptMessages(category GlobalPromptCategory) []ChatMessage {
	prompts := GetGlobalPrompts(category)
	if len(prompts) == 0 {
		return nil
	}
	messages := make([]ChatMessage, 0, len(prompts))
	for _, p := range prompts {
		messages = append(messages, ChatMessage{
			Role:    p.Role,
			Content: p.Content,
		})
	}
	return messages
}
