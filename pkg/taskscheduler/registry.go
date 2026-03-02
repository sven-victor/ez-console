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

package taskscheduler

import (
	"context"
	"errors"
	"fmt"
	"sync"

	"github.com/go-kit/log/level"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-utils/log"
)

// ErrCancelled is returned by a TaskRunner when the task was cancelled via cancelCh.
var ErrCancelled = errors.New("task cancelled")

// ProgressCallback is called to report task progress (0-100).
type ProgressCallback func(progress int)

// TaskRunner runs a single task. Run should respect cancelCh: when it is closed, the runner should stop and return.
// progressCallback can be called to update progress during execution.
type TaskRunner interface {
	Run(ctx context.Context, t *model.Task, progressCallback ProgressCallback, cancelCh <-chan struct{}) (result interface{}, err error)
}

var (
	registry   = make(map[model.TaskType]TaskRunner)
	registryMu sync.RWMutex
)

// RegisterTaskType registers a task type and its factory. Panics if the type is already registered.
func RegisterTaskType(taskType model.TaskType, factory TaskRunner) {
	registryMu.Lock()
	defer registryMu.Unlock()
	if _, ok := registry[taskType]; ok {
		panic(fmt.Errorf("task type %s already registered", taskType))
	}
	registry[taskType] = factory
}

type funcTaskRunner struct {
	factory func(ctx context.Context, t *model.Task, progressCallback ProgressCallback, cancelCh <-chan struct{}) (result interface{}, err error)
}

func (f *funcTaskRunner) Run(ctx context.Context, t *model.Task, progressCallback ProgressCallback, cancelCh <-chan struct{}) (result interface{}, err error) {
	return f.factory(ctx, t, progressCallback, cancelCh)
}

func NewFuncTaskRunner(factory func(ctx context.Context, t *model.Task, progressCallback ProgressCallback, cancelCh <-chan struct{}) (result interface{}, err error)) TaskRunner {
	return &funcTaskRunner{factory: factory}
}

// RegisterTaskType registers a task type and its factory. Panics if the type is already registered.
func RegisterFuncTaskType(taskType model.TaskType, factory func(ctx context.Context, t *model.Task, progressCallback ProgressCallback, cancelCh <-chan struct{}) (result interface{}, err error)) {
	registryMu.Lock()
	defer registryMu.Unlock()
	if _, ok := registry[taskType]; ok {
		panic(fmt.Errorf("task type %s already registered", taskType))
	}
	registry[taskType] = NewFuncTaskRunner(factory)
}

var unknownRunnerOnce sync.Once

// GetTaskRunner returns a runner for the given task type, or (nil, false) if not registered.
func GetTaskRunner(ctx context.Context, taskType model.TaskType) (TaskRunner, bool) {
	registryMu.RLock()
	runner, ok := registry[taskType]
	registryMu.RUnlock()
	if !ok {
		unknownRunnerOnce.Do(func() {
			level.Error(log.GetContextLogger(ctx)).Log("msg", "unknown task type", "task_type", taskType)
		})
		return nil, false
	}
	return runner, true
}

// GetRegisteredTaskTypes returns all registered task type names.
func GetRegisteredTaskTypes() []model.TaskType {
	registryMu.RLock()
	defer registryMu.RUnlock()
	types := make([]model.TaskType, 0, len(registry))
	for t := range registry {
		types = append(types, t)
	}
	return types
}
