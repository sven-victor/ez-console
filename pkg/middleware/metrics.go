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

package middleware

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
)

var (
	// httpRequestsTotal counts the total number of HTTP requests
	httpRequestsTotal = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "http_requests_total",
			Help: "Total number of HTTP requests",
		},
		[]string{"method", "path", "status"},
	)

	// httpRequestDuration records the duration of HTTP requests in seconds
	httpRequestDuration = promauto.NewHistogramVec(
		prometheus.HistogramOpts{
			Name: "http_request_duration_seconds",
			Help: "Duration of HTTP requests in seconds",
			// Buckets: 1ms, 5ms, 10ms, 50ms, 100ms, 500ms, 1s, 5s, 10s, 30s
			Buckets: []float64{0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1, 5, 10, 30},
		},
		[]string{"method", "path"},
	)

	// httpRequestSizeBytes records the size of HTTP requests in bytes
	httpRequestSizeBytes = promauto.NewHistogramVec(
		prometheus.HistogramOpts{
			Name: "http_request_size_bytes",
			Help: "Size of HTTP requests in bytes",
			// Buckets: 100B, 1KB, 10KB, 100KB, 1MB, 10MB, 100MB
			Buckets: []float64{100, 1024, 10240, 102400, 1048576, 10485760, 104857600},
		},
		[]string{"method", "path"},
	)

	// httpResponseSizeBytes records the size of HTTP responses in bytes
	httpResponseSizeBytes = promauto.NewHistogramVec(
		prometheus.HistogramOpts{
			Name: "http_response_size_bytes",
			Help: "Size of HTTP responses in bytes",
			// Buckets: 100B, 1KB, 10KB, 100KB, 1MB, 10MB, 100MB
			Buckets: []float64{100, 1024, 10240, 102400, 1048576, 10485760, 104857600},
		},
		[]string{"method", "path"},
	)

	// httpRequestsInProgress tracks the number of HTTP requests currently being processed
	httpRequestsInProgress = promauto.NewGauge(
		prometheus.GaugeOpts{
			Name: "http_requests_in_progress",
			Help: "Number of HTTP requests currently being processed",
		},
	)
)

// PrometheusMetrics returns a Gin middleware that collects Prometheus metrics for HTTP requests.
// It tracks request count, duration, request/response sizes, and requests in progress.
func PrometheusMetrics() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Increment in-progress requests
		httpRequestsInProgress.Inc()
		defer httpRequestsInProgress.Dec()

		// Record the start time
		start := time.Now()

		// Get request size
		requestSize := computeApproximateRequestSize(c.Request)

		// Process request
		c.Next()

		// Calculate duration
		duration := time.Since(start).Seconds()

		// Get response status and size
		status := c.Writer.Status()
		responseSize := c.Writer.Size()

		// Get method and path
		method := c.Request.Method
		path := c.FullPath()
		if path == "" {
			path = c.Request.URL.Path
		}

		// Record metrics
		httpRequestsTotal.WithLabelValues(method, path, strconv.Itoa(status)).Inc()
		httpRequestDuration.WithLabelValues(method, path).Observe(duration)
		httpRequestSizeBytes.WithLabelValues(method, path).Observe(float64(requestSize))
		if responseSize > 0 {
			httpResponseSizeBytes.WithLabelValues(method, path).Observe(float64(responseSize))
		}
	}
}

// computeApproximateRequestSize computes the approximate size of the request in bytes.
func computeApproximateRequestSize(r *http.Request) int {
	size := 0

	// Request line: METHOD PATH PROTO
	if r.URL != nil {
		size += len(r.Method)
		size += len(r.URL.Path)
		size += len(r.Proto)
	}

	// Headers
	for name, values := range r.Header {
		size += len(name)
		for _, value := range values {
			size += len(value)
		}
	}

	// Content-Length
	if r.ContentLength > 0 {
		size += int(r.ContentLength)
	}

	return size
}
