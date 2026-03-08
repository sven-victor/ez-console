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
	"context"
	"encoding/json"
	"fmt"
	"io"
	"strings"

	"github.com/gofrs/uuid"
	"github.com/sashabaranov/go-openai"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/toolset"
)

var _ toolset.ToolSet = (*summaryToolSet)(nil)

// ChatMessageWithSummary extends ChatMessage with an auto-generated ID and
// content length, used during segmented summarization so the AI model can
// address individual messages and read them in slices.
type ChatMessageWithSummary struct {
	ChatMessage
	ID     string `json:"id"`
	Length int    `json:"length"` // len(Content) only; tool-call-only messages may have Length 0
}

// summaryToolSet provides tools for the AI to perform segmented summarization
// of a conversation that has exceeded the model's context window.
type summaryToolSet struct {
	messages           []ChatMessageWithSummary
	summarizedMessages []ChatMessage
	errorDetail        string
	finished           bool
}

func newSummaryToolSet(messages []ChatMessage, errorDetail string) *summaryToolSet {
	msgs := make([]ChatMessageWithSummary, len(messages))
	for i, msg := range messages {
		msgs[i] = ChatMessageWithSummary{
			ChatMessage: msg,
			ID:          uuid.Must(uuid.NewV4()).String()[:8],
			Length:      len(msg.Content),
		}
	}
	return &summaryToolSet{
		messages:    msgs,
		errorDetail: errorDetail,
	}
}

func (s *summaryToolSet) messageByID(id string) (*ChatMessageWithSummary, bool) {
	for i := range s.messages {
		if s.messages[i].ID == id {
			return &s.messages[i], true
		}
	}
	return nil, false
}

// ---------------------------------------------------------------------------
// toolset.ToolSet implementation
// ---------------------------------------------------------------------------

func (s *summaryToolSet) GetName() string { return "Conversation Summary" }
func (s *summaryToolSet) GetDescription() string {
	return "Tools for segmented conversation summarization"
}
func (s *summaryToolSet) Validate() error              { return nil }
func (s *summaryToolSet) Test(_ context.Context) error { return nil }

func (s *summaryToolSet) ListTools(_ context.Context) ([]openai.Tool, error) {
	return []openai.Tool{
		{
			Type: openai.ToolTypeFunction,
			Function: &openai.FunctionDefinition{
				Name: "get_messages",
				Description: "Read content from one or more messages by ID. " +
					"Each entry supports optional `start`/`end` byte offsets for partial reads " +
					"(like file positions). Omit `start` to read from the beginning; omit `end` " +
					"to read to the end. This is useful for very long messages that should be " +
					"read in chunks.",
				Parameters: map[string]interface{}{
					"type": "object",
					"properties": map[string]interface{}{
						"message_ids": map[string]interface{}{
							"type": "array",
							"items": map[string]interface{}{
								"type": "object",
								"properties": map[string]interface{}{
									"id": map[string]interface{}{
										"type":        "string",
										"description": "The message ID from the overview table.",
									},
									"start": map[string]interface{}{
										"type":        "integer",
										"description": "Start position (inclusive, 0-based). Defaults to 0.",
									},
									"end": map[string]interface{}{
										"type":        "integer",
										"description": "End position (exclusive, 0-based). Defaults to the end of content.",
									},
								},
								"required": []string{"id"},
							},
							"description": "List of message read requests.",
						},
					},
					"required": []string{"message_ids"},
				},
			},
		},
		{
			Type: openai.ToolTypeFunction,
			Function: &openai.FunctionDefinition{
				Name:        "save_summary",
				Description: "Finalize and persist the summarized conversation history, replacing the original messages. Call this once all segments have been processed and merged.",
				Parameters: map[string]interface{}{
					"type": "object",
					"properties": map[string]interface{}{
						"messages": map[string]interface{}{
							"type": "array",
							"items": map[string]interface{}{
								"type": "object",
								"properties": map[string]interface{}{
									"role":    map[string]interface{}{"type": "string", "enum": []string{"system", "user", "assistant"}},
									"content": map[string]interface{}{"type": "string"},
								},
								"required": []string{"role", "content"},
							},
							"description": "The condensed conversation messages to replace the original history.",
						},
					},
					"required": []string{"messages"},
				},
			},
		},
	}, nil
}

func (s *summaryToolSet) Call(ctx context.Context, name string, parameters string) (string, error) {
	switch name {
	case "get_messages":
		return s.getMessages(parameters)
	case "save_summary":
		return s.saveSummary(parameters)
	default:
		return "", fmt.Errorf("unknown tool: %s", name)
	}
}

// ---------------------------------------------------------------------------
// get_messages
// ---------------------------------------------------------------------------

type toolCallBrief struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	Arguments string `json:"arguments"`
}

type messageReadResult struct {
	ID         string          `json:"id"`
	Role       string          `json:"role"`
	Content    string          `json:"content"`
	Start      int             `json:"start"`
	End        int             `json:"end"`
	Total      int             `json:"total"`
	ToolCalls  []toolCallBrief `json:"tool_calls,omitempty"`
	ToolCallID string          `json:"tool_call_id,omitempty"`
}

func (s *summaryToolSet) getMessages(parameters string) (string, error) {
	var params struct {
		MessageIDs []struct {
			ID    string `json:"id"`
			Start *int   `json:"start"`
			End   *int   `json:"end"`
		} `json:"message_ids"`
	}
	if err := json.Unmarshal([]byte(parameters), &params); err != nil {
		return "", fmt.Errorf("failed to unmarshal parameters: %w", err)
	}
	if len(params.MessageIDs) == 0 {
		return "", fmt.Errorf("message_ids must not be empty")
	}

	results := make([]messageReadResult, 0, len(params.MessageIDs))
	for _, req := range params.MessageIDs {
		msg, ok := s.messageByID(req.ID)
		if !ok {
			return "", fmt.Errorf("message ID %q not found", req.ID)
		}

		start := 0
		if req.Start != nil {
			start = *req.Start
		}
		end := msg.Length
		if req.End != nil {
			end = *req.End
		}

		if start < 0 {
			start = 0
		}
		if end > msg.Length {
			end = msg.Length
		}
		if start > end {
			start = end
		}

		content := ""
		if msg.Length > 0 {
			content = msg.Content[start:end]
		}

		result := messageReadResult{
			ID:         msg.ID,
			Role:       string(msg.Role),
			Content:    content,
			Start:      start,
			End:        end,
			Total:      msg.Length,
			ToolCallID: msg.ToolCallID,
		}
		for _, tc := range msg.ToolCalls {
			result.ToolCalls = append(result.ToolCalls, toolCallBrief{
				ID:        tc.ID,
				Name:      tc.Function.Name,
				Arguments: tc.Function.Arguments,
			})
		}
		results = append(results, result)
	}

	data, err := json.Marshal(results)
	if err != nil {
		return "", fmt.Errorf("failed to marshal results: %w", err)
	}
	return string(data), nil
}

// ---------------------------------------------------------------------------
// save_summary
// ---------------------------------------------------------------------------

func (s *summaryToolSet) saveSummary(parameters string) (string, error) {
	var params struct {
		Messages []struct {
			Role    string `json:"role"`
			Content string `json:"content"`
		} `json:"messages"`
	}
	if err := json.Unmarshal([]byte(parameters), &params); err != nil {
		return "", fmt.Errorf("failed to unmarshal parameters: %w", err)
	}

	if len(params.Messages) == 0 {
		return "", fmt.Errorf("messages array must not be empty")
	}

	summarizedMessages := make([]ChatMessage, len(params.Messages))
	for i, msg := range params.Messages {
		summarizedMessages[i] = ChatMessage{
			Role:    model.AIChatMessageRole(msg.Role),
			Content: msg.Content,
		}
	}

	s.summarizedMessages = summarizedMessages

	s.finished = true
	return "Summary saved successfully. The conversation history has been condensed.", NewChatError(io.EOF, ChatErrorTypeEndOfChat, "")
}

// ---------------------------------------------------------------------------
// system prompt
// ---------------------------------------------------------------------------

func (s *summaryToolSet) buildSystemPrompt() string {
	var sb strings.Builder
	sb.WriteString("You are a conversation summarizer. The conversation has exceeded the maximum token limit and must be condensed through segmented summarization.\n\n")

	if s.errorDetail != "" {
		sb.WriteString(fmt.Sprintf("**Error:** %s\n\n", s.errorDetail))
	}

	sb.WriteString("## Message Overview\n\n")
	sb.WriteString("| # | ID | Role | Length | Type |\n")
	sb.WriteString("|---|-----|------|--------|------|\n")
	totalLen := 0
	for i, msg := range s.messages {
		msgType := "text"
		if len(msg.ToolCalls) > 0 {
			msgType = "tool_call"
		} else if msg.ToolCallID != "" {
			msgType = "tool_result"
		}
		sb.WriteString(fmt.Sprintf("| %d | %s | %s | %d | %s |\n", i, msg.ID, string(msg.Role), msg.Length, msgType))
		totalLen += msg.Length
	}
	sb.WriteString(fmt.Sprintf("\n**Total messages:** %d | **Total content length:** %d chars\n\n", len(s.messages), totalLen))

	sb.WriteString("## Instructions\n\n")
	sb.WriteString("This is a **segmented summarization** task. Process the conversation in segments:\n\n")
	sb.WriteString("1. Use `get_messages` with message IDs from the table above to read content. You may request multiple IDs in one call.\n")
	sb.WriteString("2. For **very long messages** (large Length), read them in chunks by specifying `start`/`end` positions — similar to seeking in a file.\n")
	sb.WriteString("3. After reading each batch, produce a running summary. Each segment summary should only cover that batch, but incorporate context from previous summaries.\n")
	sb.WriteString("4. **System messages** must be preserved verbatim — they contain critical configuration.\n")
	sb.WriteString("5. For user/assistant exchanges, keep key decisions, facts, code snippets, and important context. Discard verbose or repetitive content.\n")
	sb.WriteString("6. Tool-call / tool-result pairs (Length may be 0 for tool_call type) should be condensed into a brief description of what was done and the outcome.\n")
	sb.WriteString("7. Once all messages are processed, call `save_summary` with the final condensed message array.\n")
	sb.WriteString("8. The result must be significantly shorter than the original to fit within the model's context window.\n")

	return sb.String()
}
