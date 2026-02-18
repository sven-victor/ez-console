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

package task

import (
	"context"
	"errors"
	"fmt"
	"sync"

	"github.com/sven-victor/ez-console/pkg/model"
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

// TaskRunnerFactory creates a TaskRunner for a given task type.
type TaskRunnerFactory interface {
	CreateRunner() (TaskRunner, error)
}

var (
	registry   = make(map[string]TaskRunnerFactory)
	registryMu sync.RWMutex
)

// RegisterTaskType registers a task type and its factory. Panics if the type is already registered.
func RegisterTaskType(taskType string, factory TaskRunnerFactory) {
	registryMu.Lock()
	defer registryMu.Unlock()
	if _, ok := registry[taskType]; ok {
		panic(fmt.Errorf("task type %s already registered", taskType))
	}
	registry[taskType] = factory
}

// GetTaskRunner returns a runner for the given task type, or (nil, false) if not registered.
func GetTaskRunner(taskType string) (TaskRunner, bool) {
	registryMu.RLock()
	factory, ok := registry[taskType]
	registryMu.RUnlock()
	if !ok {
		return nil, false
	}
	runner, err := factory.CreateRunner()
	if err != nil {
		return nil, false
	}
	return runner, true
}

// GetRegisteredTaskTypes returns all registered task type names.
func GetRegisteredTaskTypes() []string {
	registryMu.RLock()
	defer registryMu.RUnlock()
	types := make([]string, 0, len(registry))
	for t := range registry {
		types = append(types, t)
	}
	return types
}
