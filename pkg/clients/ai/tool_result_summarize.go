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
	"fmt"
	"strings"

	"github.com/sven-victor/ez-console/pkg/model"
)

const (
	toolSummaryChunkBytes      = 20 * 1024
	toolSummaryMaxUserCtxBytes = 4000
	toolSummaryLargeHeuristic  = 64 * 1024
	// toolSummaryMaxChunks caps chunked summarization to limit latency and model calls on extremely long tool output.
	toolSummaryMaxChunks = 20
)

// lastUserMessageForToolSummary returns the latest non-empty user message text,
// optionally trimmed for embedding in a summarization prompt.
func lastUserMessageForToolSummary(msgs []ChatMessage) string {
	for i := len(msgs) - 1; i >= 0; i-- {
		if msgs[i].Role != model.AIChatMessageRoleUser {
			continue
		}
		s := strings.TrimSpace(msgs[i].Content)
		if s == "" {
			continue
		}
		if len(s) > toolSummaryMaxUserCtxBytes {
			return truncateUTF8ByBytes(s, toolSummaryMaxUserCtxBytes) + "\n...[truncated for tool-summary context]"
		}
		return s
	}
	return ""
}

func truncateUTF8ByBytes(s string, maxBytes int) string {
	if maxBytes <= 0 || len(s) <= maxBytes {
		return s
	}
	cut := maxBytes
	for cut > 0 && s[cut]&0xc0 == 0x80 {
		cut--
	}
	if cut == 0 {
		return s[:maxBytes]
	}
	return s[:cut]
}

// truncateToolResultWithNotice shortens payload deterministically when LLM summarization is unavailable.
func truncateToolResultWithNotice(original string, maxBytes int) string {
	if maxBytes <= 0 || len(original) <= maxBytes {
		return original
	}
	const notice = "[Tool output truncated by the server: summarization failed or was skipped. Beginning of the original payload follows.]\n\n"
	if len(notice) >= maxBytes {
		return truncateUTF8ByBytes(original, maxBytes)
	}
	bodyBudget := maxBytes - len(notice)
	return notice + truncateUTF8ByBytes(original, bodyBudget)
}

func splitUTF8Chunks(s string, maxBytes int, maxTokens int) []string {
	if maxBytes <= 0 {
		return []string{s}
	}
	segmentTokens := maxBytes

	if maxTokens > 0 {
		if maxTokens < maxBytes {
			segmentTokens = maxTokens * 4 / 5
		} else {
			segmentTokens = maxTokens / 2
		}
	}

	var out []string
	for len(s) > 0 {
		if len(s) <= segmentTokens {
			return append(out, s)
		}
		cut := segmentTokens
		for cut > 0 && s[cut]&0xc0 == 0x80 {
			cut--
		}
		if cut == 0 {
			cut = segmentTokens
		}
		out = append(out, s[:cut])
		s = s[cut:]
	}
	return out
}

func isContextLikeChatError(err error) bool {
	if err == nil {
		return false
	}
	if _, ok := IsChatError(err, ChatErrorTypeMaxTokensExceeded); ok {
		return true
	}
	msg := strings.ToLower(err.Error())
	return strings.Contains(msg, "maximum context length") ||
		strings.Contains(msg, "context_length_exceeded") ||
		strings.Contains(msg, "reduce the length of the messages") ||
		strings.Contains(msg, "prompt is too long") ||
		strings.Contains(msg, "this model's maximum context") ||
		(strings.Contains(msg, "token") && strings.Contains(msg, "context"))
}

func buildToolResultSummaryMessages(toolName, originalResult, userContext string) []ChatMessage {
	var b strings.Builder
	b.WriteString(fmt.Sprintf("The tool '%s' returned a very large result. Extract the key information. Prefer facts, decisions, errors, and identifiers over boilerplate.\n", toolName))
	if userContext != "" {
		b.WriteString("\n**Context (latest user message, for relevance):**\n")
		b.WriteString(userContext)
		b.WriteString("\n")
	}
	b.WriteString("\n**Tool output:**\n")
	b.WriteString(originalResult)
	return []ChatMessage{{Role: model.AIChatMessageRoleUser, Content: b.String()}}
}

func tryChunkedSummarizeToolResult(ctx context.Context, client AIClient, toolName, original, userContext string, maxTokens int, onUsage func(*ChatMessage, int)) (string, error) {
	chunks := splitUTF8Chunks(original, toolSummaryChunkBytes, maxTokens)
	totalSplitParts := len(chunks)
	truncated := totalSplitParts > toolSummaryMaxChunks
	if truncated {
		chunks = chunks[:toolSummaryMaxChunks]
	}
	var parts []string
	for i, ch := range chunks {
		var sb strings.Builder
		if truncated && i == 0 {
			sb.WriteString(fmt.Sprintf(
				"The full output was split into %d parts; only the first %d are summarized below. Summaries may be incomplete for the overall result.\n\n",
				totalSplitParts, toolSummaryMaxChunks,
			))
		}
		sb.WriteString(fmt.Sprintf("This is part %d/%d of the tool '%s' output. Summarize this part concisely (bullets or short prose).\n\n", i+1, len(chunks), toolName))
		sb.WriteString(ch)
		msgs := []ChatMessage{{Role: model.AIChatMessageRoleUser, Content: sb.String()}}
		if userContext != "" {
			msgs = []ChatMessage{
				{
					Role:    model.AIChatMessageRoleSystem,
					Content: "User context for relevance (may be empty): " + truncateUTF8ByBytes(userContext, 2000),
				},
				{Role: model.AIChatMessageRoleUser, Content: sb.String()},
			}
		}
		est := EstimateTokens(msgs)
		resp, err := client.Chat(ctx, msgs, nil)
		if onUsage != nil && resp != nil {
			onUsage(resp, est)
		}
		if err != nil || resp == nil || strings.TrimSpace(resp.Content) == "" {
			parts = append(parts, truncateUTF8ByBytes(ch, 1800)+"\n...[part not summarized due to error or empty model output]")
			continue
		}
		parts = append(parts, strings.TrimSpace(resp.Content))
	}
	merged := strings.Join(parts, "\n\n--- part ---\n\n")
	notice := ""
	if truncated {
		omitted := totalSplitParts - toolSummaryMaxChunks
		notice = fmt.Sprintf(
			"\n\n[Note: The full tool output was split into %d parts; only the first %d were summarized. %d later part(s) were omitted by the server.]",
			totalSplitParts, toolSummaryMaxChunks, omitted,
		)
	}
	if len(merged) <= toolSummaryChunkBytes {
		return merged + notice, nil
	}
	mergeMsgs := []ChatMessage{{
		Role:    model.AIChatMessageRoleUser,
		Content: fmt.Sprintf("Merge these partial summaries of tool '%s' into one concise summary. Remove redundancy.\n\n%s", toolName, merged),
	}}
	est := EstimateTokens(mergeMsgs)
	resp, err := client.Chat(ctx, mergeMsgs, nil)
	if onUsage != nil && resp != nil {
		onUsage(resp, est)
	}
	if err == nil && resp != nil && strings.TrimSpace(resp.Content) != "" {
		return strings.TrimSpace(resp.Content) + notice, nil
	}
	return merged + notice, nil
}

// summarizeToolResultWithFallback summarizes oversized tool output: one-shot LLM summary, optional chunked
// summarization on context/token errors, then deterministic truncation. onUsage is called after each successful Chat.
func summarizeToolResultWithFallback(ctx context.Context, client AIClient, toolName, originalResult, userContext string, maxResultBytes int, maxTokens int, onUsage func(*ChatMessage, int)) (string, error) {
	msgs := buildToolResultSummaryMessages(toolName, originalResult, userContext)
	est := EstimateTokens(msgs)
	shouldChunk := false
	var err error
	var resp *ChatMessage
	if est > maxTokens {
		resp, err = client.Chat(ctx, msgs, nil)
		if onUsage != nil && resp != nil {
			onUsage(resp, est)
		}
		if err == nil && resp != nil && strings.TrimSpace(resp.Content) != "" {
			out := strings.TrimSpace(resp.Content)
			if maxResultBytes > 0 && len(out) > maxResultBytes {
				out = truncateUTF8ByBytes(out, maxResultBytes) + "\n...[summary truncated to configured tool result budget]"
			}
			return out, nil
		}

		if err != nil {
			if _, ok := IsChatError(err, ChatErrorTypeMaxTokensExceeded); ok {
				shouldChunk = true
			} else if isContextLikeChatError(err) {
				shouldChunk = true
			} else if _, rl := IsChatError(err, ChatErrorTypeRateLimitExceeded); !rl && len(originalResult) > toolSummaryLargeHeuristic {
				shouldChunk = true
			}
		} else {
			shouldChunk = len(originalResult) > toolSummaryLargeHeuristic
		}
	} else {
		shouldChunk = true
	}

	if shouldChunk {
		chunked, cerr := tryChunkedSummarizeToolResult(ctx, client, toolName, originalResult, userContext, maxTokens, onUsage)
		if cerr == nil && strings.TrimSpace(chunked) != "" {
			out := strings.TrimSpace(chunked)
			if maxResultBytes > 0 && len(out) > maxResultBytes {
				out = truncateUTF8ByBytes(out, maxResultBytes) + "\n...[summary truncated to configured tool result budget]"
			}
			return out, nil
		}
	}

	if maxResultBytes > 0 {
		return truncateToolResultWithNotice(originalResult, maxResultBytes), nil
	}
	if err != nil {
		return "", fmt.Errorf("failed to summarize tool result: %w", err)
	}
	if resp == nil {
		return "", fmt.Errorf("no response from summarizer")
	}
	return "", fmt.Errorf("empty summarizer response")
}
