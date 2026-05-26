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
	"sync"
)

// AIService groups AI-related services. Implementations embed AIModelService,
// AIChatService, AITraceService, and SkillService so their methods promote to *Service.
type AIService interface {
	AIModelService
	AIChatService
	AITraceService
	SkillService
}

type aiService struct {
	AIModelService
	AIChatService
	AITraceService
	SkillService
}

var (
	aiBundleServiceOnce     sync.Once
	aiBundleServiceInstance AIService
)

// NewAIService creates the AI service bundle (singleton). Skill and model services are
// initialized before chat, which depends on them internally.
func NewAIService(ctx context.Context, base BaseService) AIService {
	aiBundleServiceOnce.Do(func() {
		skillSvc := NewSkillService()
		modelSvc := NewAIModelService()
		traceSvc := NewAITraceService(ctx, base)
		chatSvc := NewAIChatService(ctx, base, modelSvc, traceSvc, skillSvc)
		aiBundleServiceInstance = &aiService{
			SkillService:   skillSvc,
			AIModelService: modelSvc,
			AITraceService: traceSvc,
			AIChatService:  chatSvc,
		}
	})
	return aiBundleServiceInstance
}
