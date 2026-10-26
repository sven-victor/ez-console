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

package service

import (
	"context"
	"encoding/json"
	"errors"

	"github.com/sven-victor/ez-console/pkg/clients/ai"
	"github.com/sven-victor/ez-console/pkg/model"
)

const (
	errPendingHITLCardsRequireDecisions = "pending HITL cards require hitl_decisions"
	errClientToolResultsApproval        = "client_tool_results cannot satisfy an approval-gated tool"
	errHITLDecisionsIncomplete          = "hitl_decisions must include every pending card"
	errHITLDecisionUnknown              = "hitl_decisions contains an unknown tool_call_id"
	errHITLDecisionOption               = "hitl_decisions option_id does not match the card"
	errHITLDecisionDuplicate            = "hitl_decisions contains a duplicate tool_call_id"

	hitlRejectToolContent    = `{"error":"user rejected the tool call"}`
	hitlRejectChoiceContent  = `{"error":"user rejected the choice"}`
	hitlAbandonedToolContent = `{"error":"user continued the conversation without answering the confirmation"}`
)

// ClientToolResult is one browser-executed tool result supplied with this turn.
type ClientToolResult struct {
	ToolCallID string
	Content    string
}

// ChatTurnInput is the new user turn to merge with session history.
type ChatTurnInput struct {
	Content           string
	ClientToolResults []ClientToolResult
	HITLDecisions     []ai.HITLDecision
}

// ToolExecutor runs an approved server tool with stored name and arguments.
type ToolExecutor func(ctx context.Context, name, arguments string) (string, error)

type pendingHITLCard struct {
	msgIdx  int
	cardIdx int
	card    ai.HITLCard
}

// PrepareTurn builds incoming messages for one chat turn and returns a copy of
// existing with hitl_cards status and selected_option_id updated in memory.
// It does not persist metadata.
func PrepareTurn(ctx context.Context, existing []model.AIChatMessage, in ChatTurnInput, exec ToolExecutor) ([]ai.ChatMessage, []model.AIChatMessage, error) {
	updated := cloneTurnMessages(existing)
	pending := pendingCards(updated)
	if len(in.HITLDecisions) == 0 && len(pending) > 0 && len(in.ClientToolResults) > 0 {
		return nil, nil, errors.New(errPendingHITLCardsRequireDecisions)
	}
	if len(in.HITLDecisions) > 0 {
		if err := validateHITLDecisions(pending, in.HITLDecisions); err != nil {
			return nil, nil, err
		}
	}
	if err := rejectForgedApprovalResults(pending, in.ClientToolResults); err != nil {
		return nil, nil, err
	}
	if len(in.HITLDecisions) == 0 && len(in.ClientToolResults) == 0 {
		return abandonOrphans(existing, updated, pending, in.Content), updated, nil
	}

	var incoming []ai.ChatMessage
	byID := make(map[string]ai.HITLDecision, len(in.HITLDecisions))
	for _, d := range in.HITLDecisions {
		byID[d.ToolCallID] = d
	}
	for _, p := range pending {
		d := byID[p.card.ToolCallID]
		incoming = append(incoming, ai.ChatMessage{
			Role:       model.AIChatMessageRoleTool,
			Content:    decisionContent(ctx, existing, p.card, d, exec),
			ToolCallID: p.card.ToolCallID,
		})
		setCardStatus(updated, p, ai.HITLStatusDecided, d.OptionID)
	}
	for _, result := range in.ClientToolResults {
		incoming = append(incoming, ai.ChatMessage{
			Role:       model.AIChatMessageRoleTool,
			Content:    result.Content,
			ToolCallID: result.ToolCallID,
		})
	}
	if in.Content != "" {
		incoming = append(incoming, ai.ChatMessage{
			Role:    model.AIChatMessageRoleUser,
			Content: in.Content,
		})
	}
	return incoming, updated, nil
}

func cloneTurnMessages(existing []model.AIChatMessage) []model.AIChatMessage {
	out := make([]model.AIChatMessage, len(existing))
	for i, msg := range existing {
		out[i] = msg
		cards := HITLCardsFromMetadata(msg.Metadata)
		if len(cards) == 0 {
			continue
		}
		copied := make([]ai.HITLCard, len(cards))
		for j, card := range cards {
			copied[j] = card
			if len(card.Options) > 0 {
				copied[j].Options = append([]ai.HITLOption(nil), card.Options...)
			}
		}
		out[i].Metadata = MetadataWithHITLCards(msg.Metadata, copied)
	}
	return out
}

func pendingCards(messages []model.AIChatMessage) []pendingHITLCard {
	var pending []pendingHITLCard
	for i := range messages {
		cards := HITLCardsFromMetadata(messages[i].Metadata)
		for j, card := range cards {
			if card.Status != ai.HITLStatusPending {
				continue
			}
			pending = append(pending, pendingHITLCard{msgIdx: i, cardIdx: j, card: card})
		}
	}
	return pending
}

func validateHITLDecisions(pending []pendingHITLCard, decisions []ai.HITLDecision) error {
	pendingByID := make(map[string]ai.HITLCard, len(pending))
	for _, p := range pending {
		pendingByID[p.card.ToolCallID] = p.card
	}
	seen := make(map[string]struct{}, len(decisions))
	for _, d := range decisions {
		if _, dup := seen[d.ToolCallID]; dup {
			return errors.New(errHITLDecisionDuplicate)
		}
		seen[d.ToolCallID] = struct{}{}
		card, ok := pendingByID[d.ToolCallID]
		if !ok {
			return errors.New(errHITLDecisionUnknown)
		}
		if !optionOnCard(card, d.OptionID) {
			return errors.New(errHITLDecisionOption)
		}
	}
	if len(seen) != len(pendingByID) {
		return errors.New(errHITLDecisionsIncomplete)
	}
	return nil
}

func optionOnCard(card ai.HITLCard, optionID string) bool {
	for _, opt := range card.Options {
		if opt.ID == optionID {
			return true
		}
	}
	return false
}

func rejectForgedApprovalResults(pending []pendingHITLCard, results []ClientToolResult) error {
	approval := make(map[string]struct{})
	for _, p := range pending {
		if p.card.Kind == ai.HITLCardApproval && p.card.ToolCallID != "" {
			approval[p.card.ToolCallID] = struct{}{}
		}
	}
	for _, result := range results {
		if _, ok := approval[result.ToolCallID]; ok {
			return errors.New(errClientToolResultsApproval)
		}
	}
	return nil
}

func decisionContent(ctx context.Context, existing []model.AIChatMessage, card ai.HITLCard, d ai.HITLDecision, exec ToolExecutor) string {
	if card.Kind == ai.HITLCardApproval {
		if d.OptionID != ai.HITLOptionApprove {
			return hitlRejectToolContent
		}
		name, args := toolCallFromExisting(existing, card.ToolCallID)
		if exec == nil {
			return hitlErrorContent("tool executor is nil")
		}
		out, err := exec(ctx, name, args)
		if err != nil {
			return hitlErrorContent(err.Error())
		}
		return out
	}
	if d.OptionID == ai.HITLOptionReject {
		return hitlRejectChoiceContent
	}
	return hitlSelectedContent(d.OptionID, optionLabel(card, d.OptionID))
}

func optionLabel(card ai.HITLCard, optionID string) string {
	for _, opt := range card.Options {
		if opt.ID == optionID {
			return opt.Label
		}
	}
	return ""
}

func toolCallFromExisting(existing []model.AIChatMessage, id string) (string, string) {
	for _, msg := range existing {
		for _, tc := range msg.ToolCalls {
			if tc.ID == id {
				return tc.Function.Name, tc.Function.Arguments
			}
		}
	}
	return "", ""
}

func abandonOrphans(existing, updated []model.AIChatMessage, pending []pendingHITLCard, content string) []ai.ChatMessage {
	abandoned := make(map[string]struct{}, len(pending))
	for _, p := range pending {
		abandoned[p.card.ToolCallID] = struct{}{}
		setCardStatus(updated, p, ai.HITLStatusAbandoned, "")
	}
	var incoming []ai.ChatMessage
	for _, tc := range FindUnpairedToolCalls(existing) {
		body := OrphanToolResultContent
		if _, ok := abandoned[tc.ID]; ok {
			body = hitlAbandonedToolContent
		}
		incoming = append(incoming, ai.ChatMessage{
			Role:       model.AIChatMessageRoleTool,
			Content:    body,
			ToolCallID: tc.ID,
		})
	}
	if content != "" {
		incoming = append(incoming, ai.ChatMessage{
			Role:    model.AIChatMessageRoleUser,
			Content: content,
		})
	}
	return incoming
}

func setCardStatus(messages []model.AIChatMessage, p pendingHITLCard, status ai.HITLCardStatus, optionID string) {
	cards := append([]ai.HITLCard(nil), HITLCardsFromMetadata(messages[p.msgIdx].Metadata)...)
	if p.cardIdx < 0 || p.cardIdx >= len(cards) {
		return
	}
	cards[p.cardIdx].Status = status
	if optionID != "" {
		cards[p.cardIdx].SelectedOptionID = optionID
	}
	messages[p.msgIdx].Metadata = MetadataWithHITLCards(messages[p.msgIdx].Metadata, cards)
}

func hitlErrorContent(msg string) string {
	b, err := json.Marshal(struct {
		Error string `json:"error"`
	}{Error: msg})
	if err != nil {
		return `{"error":"failed to encode tool error"}`
	}
	return string(b)
}

func hitlSelectedContent(id, label string) string {
	b, err := json.Marshal(struct {
		Selected string `json:"selected"`
		Label    string `json:"label"`
	}{Selected: id, Label: label})
	if err != nil {
		return hitlErrorContent("failed to encode choice")
	}
	return string(b)
}
