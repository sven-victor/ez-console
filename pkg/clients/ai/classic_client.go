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

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
	"github.com/sven-victor/ez-agent/event"
	aimodel "github.com/sven-victor/ez-agent/model"
	"github.com/sven-victor/ez-console/pkg/util"
)

var (
	// aiTokensTotal tracks the total number of tokens used in AI interactions
	aiTokensTotal = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "ai_tokens_total",
			Help: "Total number of tokens used in AI interactions",
		},
		[]string{"type"}, // type can be "prompt" or "completion"
	)
)

var _ ClassicChatClient = (*classicChatClient)(nil)

func NewClassicChatClientFactory(factory AIClientFactory) *ClassicChatClientFactory {
	return &ClassicChatClientFactory{factory: factory}
}

type ClassicChatClientFactory struct {
	factory AIClientFactory
}

// CreateClient implements AIClientFactory.
func (c *ClassicChatClientFactory) CreateClient(ctx context.Context, organizationID string, config map[string]interface{}) (ClassicChatClient, error) {
	client, err := c.factory.CreateClient(ctx, organizationID, config)
	if err != nil {
		return nil, err
	}
	return &classicChatClient{aiClient: client}, nil
}

// GetConfigFields implements AIClientFactory.
func (c *ClassicChatClientFactory) GetConfigFields() []util.ConfigField {
	return c.factory.GetConfigFields()
}

// GetDescription implements AIClientFactory.
func (c *ClassicChatClientFactory) GetDescription() string {
	return c.factory.GetDescription()
}

// GetName implements AIClientFactory.
func (c *ClassicChatClientFactory) GetName() string {
	return c.factory.GetName()
}

type ClassicChatClient interface {
	aimodel.Provider
	Exchange(ctx context.Context, messages []ChatMessage, options ...WithChatOptions) ([]ChatMessage, error)
	ExchangeStream(ctx context.Context, messages []ChatMessage, options ...WithChatOptions) (ChatStream, error)
}

type classicChatClient struct {
	aiClient aimodel.Provider
}

// Exchange implements ClassicChatClient using ez-agent Agent.Run.
func (c *classicChatClient) Exchange(ctx context.Context, messages []ChatMessage, options ...WithChatOptions) ([]ChatMessage, error) {
	if client, ok := c.aiClient.(ClassicChatClient); ok {
		return client.Exchange(ctx, messages, options...)
	}

	opts := ChatCompletionOptions{
		MaxIterations:     10,
		ToolResultMaxSize: 32 * 1024,
	}
	for _, option := range options {
		option(&opts)
	}

	var err error
	messages, err = PrepareChatCompletionSkillLoader(ctx, &opts, messages)
	if err != nil {
		return nil, err
	}

	return runEZAgent(ctx, c.aiClient, messages, opts)
}

// ExchangeStream implements ClassicChatClient using ez-agent RunStream.
func (c *classicChatClient) ExchangeStream(ctx context.Context, messages []ChatMessage, options ...WithChatOptions) (ChatStream, error) {
	if client, ok := c.aiClient.(ClassicChatClient); ok {
		return client.ExchangeStream(ctx, messages, options...)
	}
	opts := ChatCompletionOptions{
		MaxIterations:     10,
		ToolResultMaxSize: 32 * 1024,
	}
	for _, option := range options {
		option(&opts)
	}

	var err error
	messages, err = PrepareChatCompletionSkillLoader(ctx, &opts, messages)
	if err != nil {
		return nil, err
	}

	return newEZAgentStream(ctx, c.aiClient, messages, opts, false)
}

// Caps implements ClassicChatClient.
func (c *classicChatClient) Caps() aimodel.Capabilities {
	return c.aiClient.Caps()
}

// Complete implements ClassicChatClient.
func (c *classicChatClient) Complete(ctx context.Context, req aimodel.Request) (aimodel.Result, error) {
	return c.aiClient.Complete(ctx, req)
}

// Name implements ClassicChatClient.
func (c *classicChatClient) Name() string {
	return c.aiClient.Name()
}

// Stream implements ClassicChatClient.
func (c *classicChatClient) Stream(ctx context.Context, req aimodel.Request, yield func(event.Event) error) (aimodel.Result, error) {
	return c.aiClient.Stream(ctx, req, yield)
}
