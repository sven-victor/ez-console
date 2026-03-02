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
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
)

var (
	taskCreatedTotal = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "task_created_total",
			Help: "Total number of tasks created",
		},
		[]string{"category", "type"},
	)
	taskStartedTotal = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "task_started_total",
			Help: "Total number of tasks started (claimed for execution)",
		},
		[]string{"category", "type"},
	)
	taskCompletedTotal = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "task_completed_total",
			Help: "Total number of tasks completed by final status",
		},
		[]string{"category", "type", "status"},
	)
	taskQueueOverflowTotal = promauto.NewCounterVec(
		prometheus.CounterOpts{
			Name: "task_queue_overflow_total",
			Help: "Number of times a task was not enqueued because the in-memory queue was full",
		},
		[]string{"category"},
	)
	taskQueueLength = promauto.NewGauge(
		prometheus.GaugeOpts{
			Name: "task_queue_length",
			Help: "Current number of tasks in the in-memory queue",
		},
	)
	taskRunningGauge = promauto.NewGaugeVec(
		prometheus.GaugeOpts{
			Name: "task_running_gauge",
			Help: "Number of tasks currently running",
		},
		[]string{"type"},
	)
	taskRunDurationSeconds = promauto.NewHistogramVec(
		prometheus.HistogramOpts{
			Name:    "task_run_duration_seconds",
			Help:    "Task run duration in seconds from start to finish",
			Buckets: []float64{0.1, 0.5, 1, 2, 5, 10, 30, 60, 120, 300},
		},
		[]string{"type"},
	)
)
