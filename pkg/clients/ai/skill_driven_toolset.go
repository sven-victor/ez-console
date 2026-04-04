package ai

import (
	"context"
	"encoding/json"
	"fmt"
	"slices"
	"strings"
	"sync"

	"github.com/sashabaranov/go-openai"
	"github.com/sashabaranov/go-openai/jsonschema"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/toolset"
)

// SkillLoaderToolSetKey is the tool map key for the runtime get_skill_content toolset.
const SkillLoaderToolSetKey = "skill_loader"

// SkillLoader loads skill file content on demand and tracks which skills have been loaded for tool binding.
type SkillLoader struct {
	skills          []*model.Skill
	loadContent     func(ctx context.Context, skillID string, path string) (string, error)
	OnContentLoaded func(ctx context.Context, skillID string)
	loadedSkills    []string
	mu              sync.Mutex
}

// LoadContent loads skill content via the configured callback and records skillID as loaded on success.
func (s *SkillLoader) LoadContent(ctx context.Context, skillID, path string) (string, error) {
	if s == nil {
		return "", fmt.Errorf("skill loader is not configured")
	}
	if s.loadContent == nil {
		return "", fmt.Errorf("skill content loader is not configured")
	}
	body, err := s.loadContent(ctx, skillID, path)
	if err != nil {
		return "", err
	}
	var newly bool
	s.mu.Lock()
	newly = true
	for _, id := range s.loadedSkills {
		if id == skillID {
			newly = false
			break
		}
	}
	if newly {
		s.loadedSkills = append(s.loadedSkills, skillID)
	}
	cb := s.OnContentLoaded
	s.mu.Unlock()
	if newly && cb != nil {
		cb(ctx, skillID)
	}
	return body, nil
}

// Clear resets loaded skill IDs (e.g. after conversation summarization).
func (s *SkillLoader) Clear() {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.loadedSkills = nil
}

// HasSkills reports whether this loader was constructed with at least one skill for the chat.
func (s *SkillLoader) HasSkills() bool {
	return s != nil && len(s.skills) > 0
}

func (s *SkillLoader) GetMetadata() (string, error) {
	if s == nil {
		return "", fmt.Errorf("skill loader is not configured")
	}
	var b strings.Builder
	b.WriteString("Available skills (use get_skill_content to load content on demand):\n\n")
	for _, sk := range s.skills {
		b.WriteString(fmt.Sprintf("- id: %s | name: %s | domain: %s\n", sk.ResourceID, sk.Name, sk.Domain))
		if sk.Description != "" {
			b.WriteString(fmt.Sprintf("  description: %s\n", sk.Description))
		}
		b.WriteString("\n")
	}
	b.WriteString("Use the tool get_skill_content(skill_id, path) to load full SKILL.md or a specific file (e.g. REFERENCE/foo.md).\n")
	return b.String(), nil
}

// NewSkillLoader creates a skill loader for the given skills and content callback.
func NewSkillLoader(skills []*model.Skill, loadContent func(ctx context.Context, skillID string, path string) (string, error)) *SkillLoader {
	return &SkillLoader{skills: skills, loadContent: loadContent}
}

func (s *SkillLoader) loadedSkillIDSet() map[string]struct{} {
	s.mu.Lock()
	defer s.mu.Unlock()
	out := make(map[string]struct{}, len(s.loadedSkills))
	for _, id := range s.loadedSkills {
		if id != "" {
			out[id] = struct{}{}
		}
	}
	return out
}

func (s *SkillLoader) allowedSkillIDs() []string {
	if s == nil {
		return nil
	}
	ids := make([]string, 0, len(s.skills))
	for _, sk := range s.skills {
		if sk.ResourceID != "" {
			ids = append(ids, sk.ResourceID)
		}
	}
	return ids
}

// SkillDrivenToolset merges organization toolsets from a base provider with progressive skill–tool exposure.
type SkillDrivenToolset struct {
	toolSetProvider toolset.ToolSetsProvider
	skillLoader     *SkillLoader
}

// NewSkillDrivenToolset creates a new skill-driven toolset.
func NewSkillDrivenToolset(skillLoader *SkillLoader, toolSetProvider toolset.ToolSetsProvider) *SkillDrivenToolset {
	return &SkillDrivenToolset{skillLoader: skillLoader, toolSetProvider: toolSetProvider}
}

// ListTools returns tool sets for the next LLM iteration: before any skill content is loaded, only the skill loader
// tool is exposed (plus any non–binding-aware entries). After LoadContent succeeds for a skill, organization tools
// allowed by that skill's bindings are merged in; with no bindings on loaded skills, full authorized toolsets are used.
func (s *SkillDrivenToolset) ListTools(ctx context.Context) (toolset.ToolSets, error) {
	if s.toolSetProvider == nil {
		return toolset.ToolSets{}, nil
	}
	base, err := s.toolSetProvider(ctx)
	if err != nil {
		return nil, err
	}
	if s.skillLoader == nil || !s.skillLoader.HasSkills() {
		return base, nil
	}
	loaded := s.skillLoader.loadedSkillIDSet()
	if len(loaded) == 0 {
		return stripOrgToolSetsForAwaitingActivation(base), nil
	}
	bindings := unionBindingsForLoadedSkills(s.skillLoader.skills, loaded)
	if len(bindings) == 0 {
		return base, nil
	}
	out := make(toolset.ToolSets, len(base))
	for key, ts := range base {
		if key == SkillLoaderToolSetKey || !isBindingAwareToolSet(ts) {
			out[key] = ts
			continue
		}
		aw := ts.(*toolset.BindingAwareToolSet)
		tools, err := aw.Inner.ListTools(ctx)
		if err != nil {
			return nil, err
		}
		allowed := make(map[string]struct{})
		for _, tool := range tools {
			if tool.Function == nil {
				continue
			}
			name := tool.Function.Name
			for _, b := range bindings {
				if b.MatchesTarget(aw.ResourceID, aw.ImplType, name) {
					allowed[name] = struct{}{}
					break
				}
			}
		}
		if len(allowed) == 0 {
			continue
		}
		out[key] = toolset.NewAllowedToolNamesToolSet(aw.Inner, allowed)
	}
	return out, nil
}

// listToolsBySkillID returns prefixed tool names from toolSetProvider that match this skill's bindings (or all
// authorized tools when the skill has no bindings), mirroring ListTools matching rules regardless of load state.
func (s *SkillDrivenToolset) listToolsBySkillID(ctx context.Context, skillID string) ([]string, error) {
	if s.skillLoader == nil {
		return nil, fmt.Errorf("skill loader is not configured")
	}
	if skillID == "" {
		return nil, fmt.Errorf("skill id is required")
	}
	if s.toolSetProvider == nil {
		return nil, nil
	}
	var sk *model.Skill
	for _, x := range s.skillLoader.skills {
		if x != nil && x.ResourceID == skillID {
			sk = x
			break
		}
	}
	if sk == nil {
		return nil, fmt.Errorf("skill %s not found", skillID)
	}
	base, err := s.toolSetProvider(ctx)
	if err != nil {
		return nil, err
	}
	bindings := bindingsForSkill(sk)
	if len(bindings) == 0 {
		return nil, nil
	}
	seen := make(map[string]struct{})
	for key, ts := range base {
		if ts == nil {
			continue
		}
		if !isBindingAwareToolSet(ts) {
			continue
		}
		aw := ts.(*toolset.BindingAwareToolSet)
		innerTools, err := aw.Inner.ListTools(ctx)
		if err != nil {
			return nil, err
		}
		for _, tool := range innerTools {
			if tool.Function == nil {
				continue
			}
			name := tool.Function.Name
			for _, b := range bindings {
				if b.MatchesTarget(aw.ResourceID, aw.ImplType, name) {
					seen[fmt.Sprintf("%s_%s", key, name)] = struct{}{}
					break
				}
			}
		}
	}
	out := make([]string, 0, len(seen))
	for n := range seen {
		out = append(out, n)
	}
	slices.Sort(out)
	return out, nil
}

func addPrefixedToolNames(ctx context.Context, key string, ts toolset.ToolSet, seen map[string]struct{}) error {
	tools, err := ts.ListTools(ctx)
	if err != nil {
		return err
	}
	for _, tool := range tools {
		if tool.Function == nil {
			continue
		}
		seen[fmt.Sprintf("%s_%s", key, tool.Function.Name)] = struct{}{}
	}
	return nil
}

func bindingsForSkill(sk *model.Skill) []model.SkillAIToolBinding {
	if sk == nil || len(sk.Tools) == 0 {
		return nil
	}
	out := make([]model.SkillAIToolBinding, 0, len(sk.Tools))
	for _, t := range sk.Tools {
		out = append(out, model.SkillAIToolBinding{
			SkillID:   sk.ResourceID,
			ToolSetID: t.ToolSetID,
			ToolName:  t.ToolName,
		})
	}
	return out
}

func (s *SkillDrivenToolset) GetMetadata(ctx context.Context) (string, error) {
	if s.skillLoader == nil {
		return "", fmt.Errorf("skill loader is not configured")
	}
	var b strings.Builder
	b.WriteString("Available skills (use get_skill_content to load content on demand):\n\n")
	for _, sk := range s.skillLoader.skills {
		b.WriteString(fmt.Sprintf("- id: %s | name: %s | domain: %s\n", sk.ResourceID, sk.Name, sk.Domain))
		if sk.Description != "" {
			b.WriteString(fmt.Sprintf("  description: %s\n", sk.Description))
			tools, err := s.listToolsBySkillID(ctx, sk.ResourceID)
			if err != nil {
				return "", err
			}
			b.WriteString(fmt.Sprintf("  tools: %s\n", strings.Join(tools, ", ")))
		}
		b.WriteString("\n")
	}
	b.WriteString("Use the tool get_skill_content(skill_id, path) to load full SKILL.md or a specific file (e.g. REFERENCE/foo.md).\n")
	return b.String(), nil
}

func isBindingAwareToolSet(ts toolset.ToolSet) bool {
	if ts == nil {
		return false
	}
	_, ok := ts.(*toolset.BindingAwareToolSet)
	return ok
}

func stripOrgToolSetsForAwaitingActivation(base toolset.ToolSets) toolset.ToolSets {
	if len(base) == 0 {
		return toolset.ToolSets{}
	}
	out := make(toolset.ToolSets)
	for k, v := range base {
		if k == SkillLoaderToolSetKey || !isBindingAwareToolSet(v) {
			out[k] = v
		}
	}
	return out
}

func unionBindingsForLoadedSkills(skills []*model.Skill, loaded map[string]struct{}) []model.SkillAIToolBinding {
	var out []model.SkillAIToolBinding
	for i := range skills {
		sk := skills[i]
		if sk == nil || sk.ResourceID == "" {
			continue
		}
		if _, ok := loaded[sk.ResourceID]; !ok {
			continue
		}
		out = append(out, bindingsForSkill(sk)...)
	}
	return out
}

// skillLoaderChatToolSet exposes get_skill_content using SkillLoader.LoadContent (tracks loaded skills).
type skillLoaderChatToolSet struct {
	loader *SkillLoader
}

// NewSkillLoaderChatToolSet returns a toolset that loads skill files through loader (allowed skills only).
func NewSkillLoaderChatToolSet(loader *SkillLoader) toolset.ToolSet {
	return &skillLoaderChatToolSet{loader: loader}
}

func (t *skillLoaderChatToolSet) GetName() string { return "skill_loader" }
func (t *skillLoaderChatToolSet) GetDescription() string {
	return "Load skill file content on demand"
}
func (t *skillLoaderChatToolSet) Validate() error                { return nil }
func (t *skillLoaderChatToolSet) Test(ctx context.Context) error { return nil }

func (t *skillLoaderChatToolSet) ListTools(_ context.Context) ([]openai.Tool, error) {
	ids := t.loader.allowedSkillIDs()
	return []openai.Tool{
		{
			Type: openai.ToolTypeFunction,
			Function: &openai.FunctionDefinition{
				Name:        "get_skill_content",
				Description: "Load the full content of a skill (SKILL.md and related .md files) or a specific file under the skill. Use skill_id from the available skills list; path is optional (e.g. SKILL.md or REFERENCE/foo.md). Omit path to get the full combined skill content.",
				Parameters: jsonschema.Definition{
					Type: jsonschema.Object,
					Properties: map[string]jsonschema.Definition{
						"skill_id": {
							Type:        jsonschema.String,
							Description: "Skill ID (resource_id from the available skills list)",
							Enum:        ids,
						},
						"path": {Type: jsonschema.String, Description: "Optional: path to a specific file (e.g. SKILL.md, REFERENCE/foo.md). Omit to load full skill content."},
					},
					Required: []string{"skill_id"},
				},
			},
		},
	}, nil
}

func (t *skillLoaderChatToolSet) Call(ctx context.Context, name string, parameters string) (string, error) {
	switch name {
	case "get_skill_content":
		var params struct {
			SkillID string `json:"skill_id"`
			Path    string `json:"path"`
		}
		if err := json.Unmarshal([]byte(parameters), &params); err != nil {
			return "", fmt.Errorf("failed to unmarshal parameters: %w", err)
		}
		if params.SkillID == "" {
			return "", fmt.Errorf("skill_id is required")
		}
		allowed := false
		for _, id := range t.loader.allowedSkillIDs() {
			if id == params.SkillID {
				allowed = true
				break
			}
		}
		if !allowed {
			return "", fmt.Errorf("skill %s is not in the allowed list for this chat", params.SkillID)
		}
		return t.loader.LoadContent(ctx, params.SkillID, strings.TrimSpace(params.Path))
	default:
		return "", fmt.Errorf("tool %s not found", name)
	}
}
