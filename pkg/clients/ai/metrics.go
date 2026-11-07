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
	"time"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
	"github.com/sven-victor/ez-agent/event"
	aimodel "github.com/sven-victor/ez-agent/model"
	"github.com/sven-victor/ez-agent/run"
)

var (
	aiModelRequestsTotal = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "ai_model_requests_total",
			Help: "Total number of model Complete and Stream calls",
		},
		[]string{"provider", "status"},
	)
	aiModelRequestDuration = promauto.NewHistogramVec(
		prometheus.HistogramOpts{
			Name:    "ai_model_request_duration_seconds",
			Help:    "Duration of model Complete and Stream calls in seconds",
			Buckets: []float64{0.5, 1, 2, 5, 10, 30, 60, 120, 300},
		},
		[]string{"provider"},
	)
	aiTokensTotal = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "ai_tokens_total",
			Help: "Total model tokens. Cache tokens are already included in prompt.",
		},
		[]string{"provider", "type"},
	)
	aiCacheTokensTotal = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "ai_cache_tokens_total",
			Help: "Prompt-cache tokens. read and write are subsets of prompt tokens.",
		},
		[]string{"provider", "type"},
	)
)

// observeProvider records Prometheus metrics for one provider's model calls.
// Exchange is forwarded when the inner provider implements ClassicChatClient.
func observeProvider(p aimodel.Provider) aimodel.Provider {
	if p == nil {
		return nil
	}
	if _, ok := p.(*observedProvider); ok {
		return p
	}
	return &observedProvider{inner: p}
}

type observedProvider struct {
	inner aimodel.Provider
}

var _ ClassicChatClient = (*observedProvider)(nil)

func (p *observedProvider) Name() string { return p.inner.Name() }

func (p *observedProvider) Caps() aimodel.Capabilities { return p.inner.Caps() }

func (p *observedProvider) Complete(ctx context.Context, req aimodel.Request) (aimodel.Result, error) {
	start := time.Now()
	res, err := p.inner.Complete(ctx, req)
	observeAICall(p.inner.Name(), time.Since(start), err, res.Usage)
	return res, err
}

func (p *observedProvider) Stream(ctx context.Context, req aimodel.Request, yield func(event.Event) error) (aimodel.Result, error) {
	start := time.Now()
	res, err := p.inner.Stream(ctx, req, yield)
	observeAICall(p.inner.Name(), time.Since(start), err, res.Usage)
	return res, err
}

func (p *observedProvider) Exchange(ctx context.Context, messages []ChatMessage, options ...WithChatOptions) ([]ChatMessage, error) {
	if client, ok := p.inner.(ClassicChatClient); ok {
		return client.Exchange(ctx, messages, options...)
	}
	return exchangeViaAgent(ctx, p, messages, options...)
}

func (p *observedProvider) ExchangeStream(ctx context.Context, messages []ChatMessage, options ...WithChatOptions) (ChatStream, error) {
	if client, ok := p.inner.(ClassicChatClient); ok {
		return client.ExchangeStream(ctx, messages, options...)
	}
	return exchangeStreamViaAgent(ctx, p, messages, options...)
}

func observeAICall(provider string, elapsed time.Duration, callErr error, usage run.Usage) {
	status := "success"
	if callErr != nil {
		status = "error"
	}
	aiModelRequestsTotal.WithLabelValues(provider, status).Inc()
	aiModelRequestDuration.WithLabelValues(provider).Observe(elapsed.Seconds())
	if callErr != nil {
		return
	}
	if usage.InputTokens > 0 {
		aiTokensTotal.WithLabelValues(provider, "prompt").Add(float64(usage.InputTokens))
	}
	if usage.OutputTokens > 0 {
		aiTokensTotal.WithLabelValues(provider, "completion").Add(float64(usage.OutputTokens))
	}
	if usage.CacheReadTokens > 0 {
		aiCacheTokensTotal.WithLabelValues(provider, "read").Add(float64(usage.CacheReadTokens))
	}
	if usage.CacheWriteTokens > 0 {
		aiCacheTokensTotal.WithLabelValues(provider, "write").Add(float64(usage.CacheWriteTokens))
	}
}
