package cache

import (
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
)

var (
	cacheHitTotal = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "cache_hit_total",
			Help: "Total number of cache hits.",
		},
		[]string{"cache", "layer"},
	)

	cacheMissTotal = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "cache_miss_total",
			Help: "Total number of cache misses.",
		},
		[]string{"cache", "layer"},
	)

	cacheLoadSeconds = promauto.NewHistogramVec(
		prometheus.HistogramOpts{
			Name:    "cache_load_seconds",
			Help:    "Duration of cache loader executions.",
			Buckets: prometheus.DefBuckets,
		},
		[]string{"cache"},
	)

	cacheEntries = promauto.NewGaugeVec(
		prometheus.GaugeOpts{
			Name: "cache_entries",
			Help: "Current number of entries in cache.",
		},
		[]string{"cache"},
	)
)
