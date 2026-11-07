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
	"errors"
	"testing"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/testutil"
	dto "github.com/prometheus/client_model/go"
	"github.com/sven-victor/ez-agent/event"
	aimodel "github.com/sven-victor/ez-agent/model"
	"github.com/sven-victor/ez-agent/run"
	"github.com/sven-victor/ez-console/pkg/util"
)

func TestObservedProviderRecordsModelCall(t *testing.T) {
	provider := "metrics-stub"
	inner := &metricsStubProvider{
		name:   provider,
		result: aimodel.Result{Usage: run.NewUsage(100, 20, 80, 0)},
	}
	client := newObservedClient(t, inner)

	before := snapshotAIMetrics(t, provider)
	if _, err := client.Complete(context.Background(), aimodel.Request{}); err != nil {
		t.Fatal(err)
	}
	after := snapshotAIMetrics(t, provider)

	if got := after.requests["success"] - before.requests["success"]; got != 1 {
		t.Fatalf("success requests delta=%v", got)
	}
	if got := after.requests["error"] - before.requests["error"]; got != 0 {
		t.Fatalf("error requests delta=%v", got)
	}
	if got := after.duration - before.duration; got != 1 {
		t.Fatalf("duration samples delta=%d", got)
	}
	if got := after.tokens["prompt"] - before.tokens["prompt"]; got != 100 {
		t.Fatalf("prompt tokens delta=%v", got)
	}
	if got := after.tokens["completion"] - before.tokens["completion"]; got != 20 {
		t.Fatalf("completion tokens delta=%v", got)
	}
	if got := after.cache["read"] - before.cache["read"]; got != 80 {
		t.Fatalf("cache read delta=%v", got)
	}
	if got := after.cache["write"] - before.cache["write"]; got != 0 {
		t.Fatalf("cache write delta=%v", got)
	}
	if inner.completes != 1 {
		t.Fatalf("completes=%d", inner.completes)
	}
}

func TestObservedProviderRecordsCacheWriteAndStream(t *testing.T) {
	provider := "metrics-cache-write"
	inner := &metricsStubProvider{
		name:   provider,
		result: aimodel.Result{Usage: run.NewUsage(60, 15, 30, 20)},
	}
	client := newObservedClient(t, inner)

	before := snapshotAIMetrics(t, provider)
	if _, err := client.Stream(context.Background(), aimodel.Request{}, nil); err != nil {
		t.Fatal(err)
	}
	after := snapshotAIMetrics(t, provider)

	if got := after.requests["success"] - before.requests["success"]; got != 1 {
		t.Fatalf("success requests delta=%v", got)
	}
	if got := after.tokens["prompt"] - before.tokens["prompt"]; got != 60 {
		t.Fatalf("prompt tokens delta=%v", got)
	}
	if got := after.tokens["completion"] - before.tokens["completion"]; got != 15 {
		t.Fatalf("completion tokens delta=%v", got)
	}
	if got := after.cache["read"] - before.cache["read"]; got != 30 {
		t.Fatalf("cache read delta=%v", got)
	}
	if got := after.cache["write"] - before.cache["write"]; got != 20 {
		t.Fatalf("cache write delta=%v", got)
	}
	if inner.streams != 1 {
		t.Fatalf("streams=%d", inner.streams)
	}
}

func TestObservedProviderSkipsTokensOnError(t *testing.T) {
	provider := "metrics-error"
	inner := &metricsStubProvider{
		name:   provider,
		result: aimodel.Result{Usage: run.NewUsage(10, 4, 3, 2)},
		err:    errors.New("provider down"),
	}
	client := newObservedClient(t, inner)

	before := snapshotAIMetrics(t, provider)
	_, err := client.Complete(context.Background(), aimodel.Request{})
	if err == nil {
		t.Fatal("expected error")
	}
	after := snapshotAIMetrics(t, provider)

	if got := after.requests["error"] - before.requests["error"]; got != 1 {
		t.Fatalf("error requests delta=%v", got)
	}
	if got := after.requests["success"] - before.requests["success"]; got != 0 {
		t.Fatalf("success requests delta=%v", got)
	}
	if got := after.duration - before.duration; got != 1 {
		t.Fatalf("duration samples delta=%d", got)
	}
	if got := after.tokens["prompt"] - before.tokens["prompt"]; got != 0 {
		t.Fatalf("prompt tokens delta=%v", got)
	}
	if got := after.cache["read"] - before.cache["read"]; got != 0 {
		t.Fatalf("cache read delta=%v", got)
	}
	if got := after.cache["write"] - before.cache["write"]; got != 0 {
		t.Fatalf("cache write delta=%v", got)
	}
}

func TestObservedProviderForwardsCustomExchange(t *testing.T) {
	provider := "metrics-custom"
	inner := &metricsCustomChat{metricsStubProvider: metricsStubProvider{name: provider}}
	client := newObservedClient(t, inner)

	before := snapshotAIMetrics(t, provider)
	msgs, err := client.Exchange(context.Background(), nil)
	if err != nil {
		t.Fatal(err)
	}
	after := snapshotAIMetrics(t, provider)

	if !inner.exchanged {
		t.Fatal("custom Exchange was not called")
	}
	if len(msgs) != 1 || msgs[0].Content != "from-custom" {
		t.Fatalf("messages=%+v", msgs)
	}
	if got := after.requests["success"] - before.requests["success"]; got != 0 {
		t.Fatalf("success requests delta=%v", got)
	}
	if _, err := client.ExchangeStream(context.Background(), nil); err == nil {
		t.Fatal("expected custom stream error")
	}
	if !inner.streamed {
		t.Fatal("custom ExchangeStream was not called")
	}
}

type aiMetricSnapshot struct {
	requests map[string]float64
	tokens   map[string]float64
	cache    map[string]float64
	duration uint64
}

func newObservedClient(t *testing.T, provider aimodel.Provider) ClassicChatClient {
	t.Helper()
	factory := NewClassicChatClientFactory(metricsStubFactory{provider: provider})
	client, err := factory.CreateClient(context.Background(), "org", nil)
	if err != nil {
		t.Fatal(err)
	}
	return client
}

func snapshotAIMetrics(t *testing.T, provider string) aiMetricSnapshot {
	t.Helper()
	return aiMetricSnapshot{
		requests: map[string]float64{
			"success": testutil.ToFloat64(aiModelRequestsTotal.WithLabelValues(provider, "success")),
			"error":   testutil.ToFloat64(aiModelRequestsTotal.WithLabelValues(provider, "error")),
		},
		tokens: map[string]float64{
			"prompt":     testutil.ToFloat64(aiTokensTotal.WithLabelValues(provider, "prompt")),
			"completion": testutil.ToFloat64(aiTokensTotal.WithLabelValues(provider, "completion")),
		},
		cache: map[string]float64{
			"read":  testutil.ToFloat64(aiCacheTokensTotal.WithLabelValues(provider, "read")),
			"write": testutil.ToFloat64(aiCacheTokensTotal.WithLabelValues(provider, "write")),
		},
		duration: histogramSampleCount(t, aiModelRequestDuration, provider),
	}
}

func histogramSampleCount(t *testing.T, h *prometheus.HistogramVec, provider string) uint64 {
	t.Helper()
	metric, ok := h.WithLabelValues(provider).(prometheus.Metric)
	if !ok {
		t.Fatal("histogram observer is not a metric")
	}
	var dtoMetric dto.Metric
	if err := metric.Write(&dtoMetric); err != nil {
		t.Fatal(err)
	}
	if dtoMetric.Histogram == nil {
		t.Fatal("missing histogram")
	}
	return dtoMetric.Histogram.GetSampleCount()
}

type metricsStubFactory struct {
	provider aimodel.Provider
}

func (f metricsStubFactory) CreateClient(context.Context, string, map[string]interface{}) (aimodel.Provider, error) {
	return f.provider, nil
}

func (f metricsStubFactory) GetConfigFields() []util.ConfigField { return nil }
func (f metricsStubFactory) GetName() string                     { return "stub" }
func (f metricsStubFactory) GetDescription() string              { return "stub" }

type metricsStubProvider struct {
	name      string
	result    aimodel.Result
	err       error
	completes int
	streams   int
}

func (s *metricsStubProvider) Name() string { return s.name }
func (s *metricsStubProvider) Caps() aimodel.Capabilities {
	return aimodel.Capabilities{}
}
func (s *metricsStubProvider) Complete(context.Context, aimodel.Request) (aimodel.Result, error) {
	s.completes++
	return s.result, s.err
}
func (s *metricsStubProvider) Stream(context.Context, aimodel.Request, func(event.Event) error) (aimodel.Result, error) {
	s.streams++
	return s.result, s.err
}

type metricsCustomChat struct {
	metricsStubProvider
	exchanged bool
	streamed  bool
}

func (c *metricsCustomChat) Exchange(context.Context, []ChatMessage, ...WithChatOptions) ([]ChatMessage, error) {
	c.exchanged = true
	return []ChatMessage{{Content: "from-custom"}}, nil
}

func (c *metricsCustomChat) ExchangeStream(context.Context, []ChatMessage, ...WithChatOptions) (ChatStream, error) {
	c.streamed = true
	return nil, errors.New("custom stream")
}
