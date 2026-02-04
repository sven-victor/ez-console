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
	"archive/zip"
	"bytes"
	"context"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"sync"

	"github.com/spf13/afero"
	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/model"
	"gopkg.in/yaml.v3"
	"gorm.io/gorm"
)

const (
	skillMainFile    = "SKILL.md"
	skillMainFileAlt = "SKILLS.md"
)

// defaultSkillDomains is the initial list of skill domains (returned by ListDomains).
var defaultSkillDomains = []string{"core"}

var (
	registeredSkillDomains   []string
	registeredSkillDomainsMu sync.RWMutex
)

// RegisterSkillsDomain registers a domain for skills. It is idempotent.
// Developers can call this from main or init to add custom domains.
func RegisterSkillsDomain(domain string) {
	if domain == "" {
		return
	}
	registeredSkillDomainsMu.Lock()
	defer registeredSkillDomainsMu.Unlock()
	for _, d := range registeredSkillDomains {
		if d == domain {
			return
		}
	}
	registeredSkillDomains = append(registeredSkillDomains, domain)
}

// allowedFileExtensions for safe file operations (read/write)
var allowedFileExtensions = map[string]bool{".md": true, ".txt": true}

// validateSkillPath ensures path is safe: no "..", not absolute, and optionally file extension allowed.
// If requireAllowedExt is true, the path must end with an allowed extension (.md, .txt).
// Returns cleaned path or error.
func validateSkillPath(relativePath string, requireAllowedExt bool) (string, error) {
	cleaned := filepath.Clean(relativePath)
	if filepath.IsAbs(cleaned) || strings.Contains(cleaned, "..") {
		return "", fmt.Errorf("invalid path: path must be relative and cannot contain ..")
	}
	// Normalize to forward slashes for afero
	cleaned = filepath.ToSlash(cleaned)
	if requireAllowedExt && cleaned != "" {
		ext := strings.ToLower(filepath.Ext(cleaned))
		if !allowedFileExtensions[ext] {
			return "", fmt.Errorf("invalid path: only .md and .txt files are allowed")
		}
	}
	return cleaned, nil
}

// skillFrontmatter for parsing SKILL.md YAML frontmatter
type skillFrontmatter struct {
	Name        string `yaml:"name"`
	Description string `yaml:"description"`
	Category    string `yaml:"category"`
}

// parseSkillFrontmatter extracts name, description, and category from markdown frontmatter (--- ... ---)
func parseSkillFrontmatter(content []byte) (name, description, category string, err error) {
	raw := string(content)
	if !strings.HasPrefix(raw, "---") {
		return "", "", "", fmt.Errorf("no frontmatter found")
	}
	parts := strings.SplitN(raw, "---", 3)
	if len(parts) < 2 {
		return "", "", "", fmt.Errorf("invalid frontmatter")
	}
	var fm skillFrontmatter
	if err := yaml.Unmarshal([]byte(strings.TrimSpace(parts[1])), &fm); err != nil {
		return "", "", "", err
	}
	if fm.Name == "" {
		return "", "", "", fmt.Errorf("frontmatter name is required")
	}
	return fm.Name, fm.Description, fm.Category, nil
}

// extractSkillBody returns the markdown content after the first frontmatter block (--- ... ---). Used when syncing metadata back to file.
func extractSkillBody(content []byte) string {
	raw := string(content)
	if !strings.HasPrefix(raw, "---") {
		return raw
	}
	parts := strings.SplitN(raw, "---", 3)
	if len(parts) < 3 {
		return ""
	}
	return strings.TrimPrefix(parts[2], "\n")
}

// UploadSkill creates a skill from an uploaded file (single .md or .zip). Parses SKILL.md/SKILLS.md frontmatter for name/description.
func (s *SkillService) UploadSkill(ctx context.Context, file io.Reader, filename string, category, domain string) (*model.Skill, error) {
	ext := strings.ToLower(filepath.Ext(filename))
	if ext == ".zip" {
		return s.uploadSkillZip(ctx, file, category, domain)
	}
	if ext != ".md" {
		return nil, fmt.Errorf("upload must be .md or .zip file")
	}
	content, err := io.ReadAll(file)
	if err != nil {
		return nil, fmt.Errorf("failed to read file: %w", err)
	}
	name, description, categoryFromFile, err := parseSkillFrontmatter(content)
	if err != nil {
		return nil, fmt.Errorf("failed to parse frontmatter: %w", err)
	}
	if category == "" {
		category = categoryFromFile
	}
	skill := &model.Skill{Name: name, Description: description, Category: category, Domain: domain}
	created, err := s.Create(ctx, skill, string(content))
	if err != nil {
		return nil, err
	}
	return created, nil
}

// uploadSkillZip extracts zip, finds SKILL.md/SKILLS.md in root, parses frontmatter, creates skill, copies files safely
func (s *SkillService) uploadSkillZip(ctx context.Context, r io.Reader, category, domain string) (*model.Skill, error) {
	body, err := io.ReadAll(r)
	if err != nil {
		return nil, fmt.Errorf("failed to read zip: %w", err)
	}
	zr, err := zip.NewReader(bytes.NewReader(body), int64(len(body)))
	if err != nil {
		return nil, fmt.Errorf("invalid zip: %w", err)
	}
	var mainName, mainContent string
	var filesToCopy []struct {
		path    string
		content []byte
	}
	for _, f := range zr.File {
		if f.FileInfo().IsDir() {
			continue
		}
		// Safe path: no .., no absolute
		clean := filepath.Clean(f.Name)
		if strings.Contains(clean, "..") || filepath.IsAbs(clean) {
			continue
		}
		clean = filepath.ToSlash(clean)
		ext := strings.ToLower(filepath.Ext(clean))
		if ext != ".md" && ext != ".txt" {
			continue
		}
		rc, err := f.Open()
		if err != nil {
			continue
		}
		content, _ := io.ReadAll(rc)
		_ = rc.Close()
		base := filepath.Base(clean)
		if base == skillMainFile || base == skillMainFileAlt {
			if mainName == "" {
				mainName = base
				mainContent = string(content)
			}
		} else {
			filesToCopy = append(filesToCopy, struct {
				path    string
				content []byte
			}{clean, content})
		}
	}
	if mainContent == "" {
		return nil, fmt.Errorf("zip must contain SKILL.md or SKILLS.md in root")
	}
	name, description, categoryFromFile, err := parseSkillFrontmatter([]byte(mainContent))
	if err != nil {
		return nil, fmt.Errorf("failed to parse frontmatter from %s: %w", mainName, err)
	}
	if category == "" {
		category = categoryFromFile
	}
	skill := &model.Skill{Name: name, Description: description, Category: category, Domain: domain}
	created, err := s.Create(ctx, skill, mainContent)
	if err != nil {
		return nil, err
	}
	_, skillFs, err := s.getSkillFs(ctx, created.ResourceID)
	if err != nil {
		return nil, err
	}
	for _, f := range filesToCopy {
		path, err := validateSkillPath(f.path, true)
		if err != nil {
			continue
		}
		dir := filepath.Dir(path)
		if dir != "." {
			_ = skillFs.MkdirAll(filepath.ToSlash(dir), 0o755)
		}
		_ = afero.WriteFile(skillFs, path, f.content, 0o644)
	}
	return created, nil
}

// SkillService handles skill CRUD and file operations
type SkillService struct{}

// NewSkillService creates a new SkillService
func NewSkillService() *SkillService {
	return &SkillService{}
}

// ListDomains returns the list of skill domains: default (core) plus any registered via RegisterSkillsDomain.
func (s *SkillService) ListDomains() []string {
	registeredSkillDomainsMu.RLock()
	reg := make([]string, len(registeredSkillDomains))
	copy(reg, registeredSkillDomains)
	registeredSkillDomainsMu.RUnlock()
	seen := make(map[string]bool)
	var out []string
	for _, d := range defaultSkillDomains {
		if !seen[d] {
			seen[d] = true
			out = append(out, d)
		}
	}
	for _, d := range reg {
		if !seen[d] {
			seen[d] = true
			out = append(out, d)
		}
	}
	return out
}

// List returns skills with pagination and optional filters
func (s *SkillService) List(ctx context.Context, current, pageSize int, search, category, domain string) ([]model.Skill, int64, error) {
	query := db.Session(ctx).Model(&model.Skill{})
	if search != "" {
		term := "%" + search + "%"
		query = query.Where("name LIKE ? OR description LIKE ?", term, term)
	}
	if category != "" {
		query = query.Where("category = ?", category)
	}
	if domain != "" {
		query = query.Where("domain = ?", domain)
	}

	var total int64
	if err := query.Count(&total).Error; err != nil {
		return nil, 0, fmt.Errorf("failed to count skills: %w", err)
	}

	offset := (current - 1) * pageSize
	var list []model.Skill
	if err := query.Offset(offset).Limit(pageSize).Order("created_at DESC").Find(&list).Error; err != nil {
		return nil, 0, fmt.Errorf("failed to list skills: %w", err)
	}
	return list, total, nil
}

// GetByID returns a skill by ResourceID
func (s *SkillService) GetByID(ctx context.Context, id string) (*model.Skill, error) {
	var skill model.Skill
	if err := db.Session(ctx).Where("resource_id = ?", id).First(&skill).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, fmt.Errorf("skill not found")
		}
		return nil, fmt.Errorf("failed to get skill: %w", err)
	}
	return &skill, nil
}

// defaultSkillMDContent builds SKILL.md content from skill metadata (YAML frontmatter + empty body).
func defaultSkillMDContent(skill *model.Skill) string {
	var b strings.Builder
	b.WriteString("---\n")
	b.WriteString("name: ")
	b.WriteString(skill.Name)
	b.WriteString("\n")
	if skill.Description != "" {
		b.WriteString("description: ")
		b.WriteString(skill.Description)
		b.WriteString("\n")
	}
	if skill.Category != "" {
		b.WriteString("category: ")
		b.WriteString(skill.Category)
		b.WriteString("\n")
	}
	if skill.Domain != "" {
		b.WriteString("domain: ")
		b.WriteString(skill.Domain)
		b.WriteString("\n")
	}
	b.WriteString("---\n\n")
	return b.String()
}

// mergeSkillFrontmatter reads existing frontmatter, updates only name/description/category/domain from skill,
// preserves all other keys (e.g. license), and returns new file content (frontmatter + body).
func mergeSkillFrontmatter(existingContent []byte, skill *model.Skill) (string, error) {
	raw := string(existingContent)
	if !strings.HasPrefix(raw, "---") {
		return raw, nil
	}
	parts := strings.SplitN(raw, "---", 3)
	if len(parts) < 2 {
		return raw, nil
	}
	var fm map[string]interface{}
	if err := yaml.Unmarshal([]byte(strings.TrimSpace(parts[1])), &fm); err != nil {
		return "", err
	}
	if fm == nil {
		fm = make(map[string]interface{})
	}
	fm["name"] = skill.Name
	if skill.Description != "" {
		fm["description"] = skill.Description
	}
	if skill.Category != "" {
		fm["category"] = skill.Category
	}
	if skill.Domain != "" {
		fm["domain"] = skill.Domain
	}
	updatedYaml, err := yaml.Marshal(fm)
	if err != nil {
		return "", err
	}
	body := ""
	if len(parts) >= 3 {
		body = strings.TrimPrefix(parts[2], "\n")
	}
	return "---\n" + strings.TrimSpace(string(updatedYaml)) + "\n---\n\n" + body, nil
}

// Create creates a new skill and its directory; always creates SKILL.md (from initialContent or auto-generated metadata).
func (s *SkillService) Create(ctx context.Context, skill *model.Skill, initialContent string) (*model.Skill, error) {
	err := db.Session(ctx).Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(skill).Error; err != nil {
			return fmt.Errorf("failed to create skill: %w", err)
		}
		return nil
	})
	if err != nil {
		return nil, err
	}

	fs, err := getSkillsRootFs()
	if err != nil {
		return nil, fmt.Errorf("failed to get skills dir: %w", err)
	}
	if err := fs.MkdirAll(skill.ResourceID, 0o755); err != nil {
		_ = db.Session(ctx).Delete(skill)
		return nil, fmt.Errorf("failed to create skill directory: %w", err)
	}

	content := initialContent
	if content == "" {
		content = defaultSkillMDContent(skill)
	}
	skillFs := afero.NewBasePathFs(fs, skill.ResourceID)
	if err := afero.WriteFile(skillFs, skillMainFile, []byte(content), 0o644); err != nil {
		_ = fs.RemoveAll(skill.ResourceID)
		_ = db.Session(ctx).Delete(skill)
		return nil, fmt.Errorf("failed to write SKILL.md: %w", err)
	}

	return skill, nil
}

func (s *SkillService) UpdateSkillFrontmatter(ctx context.Context, skill *model.Skill) error {
	_, skillFs, err := s.getSkillFs(ctx, skill.ResourceID)
	if err != nil {
		return err
	}
	for _, name := range []string{skillMainFile, skillMainFileAlt} {
		b, err := afero.ReadFile(skillFs, name)
		if err != nil {
			continue
		}
		newContent, err := mergeSkillFrontmatter(b, skill)
		if err != nil {
			return fmt.Errorf("failed to merge frontmatter: %w", err)
		}
		if err := afero.WriteFile(skillFs, name, []byte(newContent), 0o644); err != nil {
			return fmt.Errorf("failed to sync SKILL.md with metadata: %w", err)
		}
		return nil
	}
	return fmt.Errorf("failed to update skill frontmatter")
}

// Update updates skill metadata (name, description, category, domain) and syncs them to SKILL.md/SKILLS.md.
// Only these four fields are updated in the file; other frontmatter keys (e.g. license) are preserved.
func (s *SkillService) Update(ctx context.Context, skill *model.Skill) error {
	if err := db.Session(ctx).Model(skill).Updates(map[string]interface{}{
		"name":        skill.Name,
		"description": skill.Description,
		"category":    skill.Category,
		"domain":      skill.Domain,
	}).Error; err != nil {
		return err
	}
	return nil
}

// Delete deletes the skill record and removes its directory
func (s *SkillService) Delete(ctx context.Context, id string) error {
	skill, err := s.GetByID(ctx, id)
	if err != nil {
		return err
	}
	fs, err := getSkillsRootFs()
	if err != nil {
		return fmt.Errorf("failed to get skills dir: %w", err)
	}
	if err := fs.RemoveAll(skill.ResourceID); err != nil {
		return fmt.Errorf("failed to remove skill directory: %w", err)
	}
	if err := db.Session(ctx).Delete(skill).Error; err != nil {
		return fmt.Errorf("failed to delete skill: %w", err)
	}
	return nil
}

// getSkillFs returns afero.Fs scoped to the skill's directory and the skill record
func (s *SkillService) getSkillFs(ctx context.Context, skillID string) (*model.Skill, afero.Fs, error) {
	skill, err := s.GetByID(ctx, skillID)
	if err != nil {
		return nil, nil, err
	}
	fs, err := getSkillsRootFs()
	if err != nil {
		return nil, nil, err
	}
	return skill, afero.NewBasePathFs(fs, skill.ResourceID), nil
}

// getSkillsRootFs returns the root afero.Fs for skills storage (from config or default under file_upload_path)
func getSkillsRootFs() (afero.Fs, error) {
	cfg := config.GetConfig()
	root := cfg.Server.SkillsPath
	if root == "" && cfg.Server.FileUploadPath != "" {
		root = cfg.Server.FileUploadPath + "/skills"
	}
	if root == "" {
		return nil, fmt.Errorf("skills dir is not set (set server.skills_path or server.file_upload_path)")
	}
	return afero.NewBasePathFs(afero.NewOsFs(), root), nil
}

// GetSkillContent reads SKILL.md (or SKILLS.md) and optionally other .md files, returns combined markdown
func (s *SkillService) GetSkillContent(ctx context.Context, skillID string) (string, error) {
	skill, skillFs, err := s.getSkillFs(ctx, skillID)
	if err != nil {
		return "", err
	}

	var parts []string
	// Main file first: SKILL.md or SKILLS.md
	for _, name := range []string{skillMainFile, skillMainFileAlt} {
		if b, err := afero.ReadFile(skillFs, name); err == nil {
			parts = append(parts, string(b))
			break
		}
	}

	// Collect other .md files (excluding main) in deterministic order
	var otherMd []string
	_ = afero.Walk(skillFs, "", func(path string, info os.FileInfo, err error) error {
		if err != nil || info == nil || info.IsDir() || path == "" {
			return nil
		}
		base := filepath.Base(path)
		if base == skillMainFile || base == skillMainFileAlt {
			return nil
		}
		if strings.HasSuffix(strings.ToLower(path), ".md") {
			otherMd = append(otherMd, path)
		}
		return nil
	})
	sort.Strings(otherMd)
	for _, p := range otherMd {
		b, err := afero.ReadFile(skillFs, p)
		if err != nil {
			continue
		}
		parts = append(parts, "\n\n## "+p+"\n\n"+string(b))
	}

	if len(parts) == 0 {
		return "", nil
	}
	out := "## Skill: " + skill.Name + "\n\n"
	out += strings.Join(parts, "\n\n")
	return out, nil
}

// SkillFileEntry represents a file or directory entry in a skill
type SkillFileEntry struct {
	Name  string `json:"name"`
	IsDir bool   `json:"is_dir"`
}

// SkillTreeNode represents a node in the skill file tree (for tree API).
type SkillTreeNode struct {
	Name     string          `json:"name"`
	Path     string          `json:"path"`
	IsDir    bool            `json:"is_dir"`
	Children []SkillTreeNode `json:"children,omitempty"`
}

// ListFilesTree returns the full file tree for a skill (one shot). Only .md and .txt files are included.
func (s *SkillService) ListFilesTree(ctx context.Context, skillID string) ([]SkillTreeNode, error) {
	_, skillFs, err := s.getSkillFs(ctx, skillID)
	if err != nil {
		return nil, err
	}
	var paths []string
	_ = afero.Walk(skillFs, "", func(path string, info os.FileInfo, err error) error {
		if err != nil || info == nil {
			return nil
		}
		path = filepath.ToSlash(path)
		if path == "" {
			return nil
		}
		if info.IsDir() {
			paths = append(paths, path+"/")
			return nil
		}
		ext := strings.ToLower(filepath.Ext(path))
		if allowedFileExtensions[ext] {
			paths = append(paths, path)
		}
		return nil
	})
	sort.Strings(paths)
	return buildSkillTree(paths, ""), nil
}

func buildSkillTree(paths []string, prefix string) []SkillTreeNode {
	var nodes []SkillTreeNode
	seen := make(map[string]bool)
	for _, p := range paths {
		if prefix != "" && !strings.HasPrefix(p, prefix) {
			continue
		}
		rel := strings.TrimPrefix(p, prefix)
		if rel == "" {
			continue
		}
		rel = strings.TrimSuffix(rel, "/")
		parts := strings.SplitN(rel, "/", 2)
		name := parts[0]
		fullPath := prefix + name
		if seen[fullPath] {
			continue
		}
		seen[fullPath] = true
		isDir := strings.HasSuffix(p, "/") || len(parts) > 1
		node := SkillTreeNode{Name: name, Path: fullPath, IsDir: isDir}
		if isDir {
			subPrefix := fullPath + "/"
			node.Children = buildSkillTree(paths, subPrefix)
		}
		nodes = append(nodes, node)
	}
	return nodes
}

// ListFiles lists entries under skillID/relativePath (relativePath "" = root). Returns name and isDir.
func (s *SkillService) ListFiles(ctx context.Context, skillID, relativePath string) ([]SkillFileEntry, error) {
	_, skillFs, err := s.getSkillFs(ctx, skillID)
	if err != nil {
		return nil, err
	}
	path, err := validateSkillPath(relativePath, false)
	if err != nil {
		return nil, err
	}
	infos, err := afero.ReadDir(skillFs, path)
	if err != nil {
		return nil, fmt.Errorf("failed to list files: %w", err)
	}
	out := make([]SkillFileEntry, 0, len(infos))
	for _, info := range infos {
		out = append(out, SkillFileEntry{Name: info.Name(), IsDir: info.IsDir()})
	}
	return out, nil
}

// GetFile returns the content of a file under the skill. Path must be relative; only .md and .txt allowed.
func (s *SkillService) GetFile(ctx context.Context, skillID, relativePath string) ([]byte, error) {
	_, skillFs, err := s.getSkillFs(ctx, skillID)
	if err != nil {
		return nil, err
	}
	path, err := validateSkillPath(relativePath, true)
	if err != nil {
		return nil, err
	}
	return afero.ReadFile(skillFs, path)
}

// PutFile writes content to a file under the skill. Creates parent dirs if needed. Only .md and .txt allowed.
// If the file is SKILL.md or SKILLS.md, parses frontmatter and updates the skill DB record (name, description, category).
func (s *SkillService) PutFile(ctx context.Context, skillID, relativePath string, content []byte) error {
	skill, skillFs, err := s.getSkillFs(ctx, skillID)
	if err != nil {
		return err
	}
	path, err := validateSkillPath(relativePath, true)
	if err != nil {
		return err
	}
	dir := filepath.Dir(path)
	if dir != "." {
		if err := skillFs.MkdirAll(filepath.ToSlash(dir), 0o755); err != nil {
			return fmt.Errorf("failed to create parent dir: %w", err)
		}
	}
	if err := afero.WriteFile(skillFs, path, content, 0o644); err != nil {
		return err
	}
	base := filepath.Base(path)
	if base == skillMainFile || base == skillMainFileAlt {
		name, description, category, parseErr := parseSkillFrontmatter(content)
		if parseErr == nil {
			skill.Name = name
			skill.Description = description
			skill.Category = category
			if err := s.Update(ctx, skill); err != nil {
				return fmt.Errorf("failed to sync skill metadata from file: %w", err)
			}
		}
	}
	return nil
}

// CreateDir creates a subdirectory under the skill. Path must be relative and must not escape.
func (s *SkillService) CreateDir(ctx context.Context, skillID, relativePath string) error {
	_, skillFs, err := s.getSkillFs(ctx, skillID)
	if err != nil {
		return err
	}
	path, err := validateSkillPath(relativePath, false)
	if err != nil {
		return err
	}
	if path == "" || path == "." {
		return fmt.Errorf("invalid path: cannot create root")
	}
	return skillFs.MkdirAll(path, 0o755)
}

// removeDirRecursive removes a directory and all its contents (files and subdirs).
func removeDirRecursive(fs afero.Fs, path string) error {
	path = filepath.ToSlash(path)
	entries, err := afero.ReadDir(fs, path)
	if err != nil {
		return err
	}
	for _, e := range entries {
		child := path + "/" + e.Name()
		if e.IsDir() {
			if err := removeDirRecursive(fs, child); err != nil {
				return err
			}
		}
		if err := fs.Remove(child); err != nil {
			return err
		}
	}
	return fs.Remove(path)
}

// DeletePath deletes a file or directory. For directories, removes recursively. Root and ".." are forbidden.
func (s *SkillService) DeletePath(ctx context.Context, skillID, relativePath string) error {
	_, skillFs, err := s.getSkillFs(ctx, skillID)
	if err != nil {
		return err
	}
	path, err := validateSkillPath(relativePath, false)
	if err != nil {
		return err
	}
	if path == "" || path == "." {
		return fmt.Errorf("invalid path: cannot delete root")
	}
	info, err := skillFs.Stat(path)
	if err != nil {
		return fmt.Errorf("failed to stat path: %w", err)
	}
	if info.IsDir() {
		return removeDirRecursive(skillFs, path)
	}
	return skillFs.Remove(path)
}

// MovePath moves a file or directory from fromPath to toPath within the same skill. Rename is supported (same parent, new name).
// Rejects if toPath is under fromPath or if target already exists.
func (s *SkillService) MovePath(ctx context.Context, skillID, fromPath, toPath string) error {
	_, skillFs, err := s.getSkillFs(ctx, skillID)
	if err != nil {
		return err
	}
	from, err := validateSkillPath(fromPath, false)
	if err != nil {
		return err
	}
	if from == "" || from == "." {
		return fmt.Errorf("invalid path: cannot move root")
	}
	to, err := validateSkillPath(toPath, false)
	if err != nil {
		return err
	}
	if to == "" || to == "." {
		return fmt.Errorf("invalid path: invalid destination")
	}
	if from == to {
		return fmt.Errorf("invalid path: source and destination are the same")
	}
	// Reject moving a directory into itself or a descendant
	if strings.HasPrefix(to+"/", from+"/") {
		return fmt.Errorf("invalid path: cannot move a directory into itself")
	}
	info, err := skillFs.Stat(from)
	if err != nil {
		return fmt.Errorf("failed to stat source: %w", err)
	}
	if _, err := skillFs.Stat(to); err == nil {
		return fmt.Errorf("target already exists")
	}
	if info.IsDir() {
		// Validate destination for dir: no file extension required
		if err := s.moveDir(skillFs, from, to); err != nil {
			return err
		}
		return removeDirRecursive(skillFs, from)
	}
	// File: validate destination has allowed extension
	if _, err := validateSkillPath(toPath, true); err != nil {
		return fmt.Errorf("destination path for file must end with .md or .txt: %w", err)
	}
	content, err := afero.ReadFile(skillFs, from)
	if err != nil {
		return fmt.Errorf("failed to read source file: %w", err)
	}
	toDir := filepath.Dir(to)
	if toDir != "." {
		if err := skillFs.MkdirAll(filepath.ToSlash(toDir), 0o755); err != nil {
			return fmt.Errorf("failed to create parent dir: %w", err)
		}
	}
	if err := afero.WriteFile(skillFs, to, content, 0o644); err != nil {
		return fmt.Errorf("failed to write destination: %w", err)
	}
	return skillFs.Remove(from)
}

// moveDir copies a directory tree from src to dst (dst must not exist). Does not remove src.
func (s *SkillService) moveDir(fs afero.Fs, src, dst string) error {
	src = filepath.ToSlash(src)
	dst = filepath.ToSlash(dst)
	if err := fs.MkdirAll(dst, 0o755); err != nil {
		return err
	}
	entries, err := afero.ReadDir(fs, src)
	if err != nil {
		return err
	}
	for _, e := range entries {
		srcChild := src + "/" + e.Name()
		dstChild := dst + "/" + e.Name()
		if e.IsDir() {
			if err := s.moveDir(fs, srcChild, dstChild); err != nil {
				return err
			}
		} else {
			ext := strings.ToLower(filepath.Ext(e.Name()))
			if !allowedFileExtensions[ext] {
				continue // skip non-.md/.txt files to match ListFilesTree behavior
			}
			content, err := afero.ReadFile(fs, srcChild)
			if err != nil {
				return fmt.Errorf("failed to read %s: %w", srcChild, err)
			}
			if err := afero.WriteFile(fs, dstChild, content, 0o644); err != nil {
				return fmt.Errorf("failed to write %s: %w", dstChild, err)
			}
		}
	}
	return nil
}

// LoadSkillsForDomains loads all skills where domain is in domains OR domain = 'core', concatenates their content
func (s *SkillService) LoadSkillsForDomains(ctx context.Context, domains []string) (string, error) {
	query := db.Session(ctx).Model(&model.Skill{})
	if len(domains) == 0 {
		query = query.Where("domain = ?", "core")
	} else {
		// core is always included
		query = query.Where("domain = ? OR domain IN ?", "core", domains)
	}
	var skills []model.Skill
	if err := query.Order("name").Find(&skills).Error; err != nil {
		return "", fmt.Errorf("failed to load skills: %w", err)
	}
	var parts []string
	for _, sk := range skills {
		content, err := s.GetSkillContent(ctx, sk.ResourceID)
		if err != nil {
			continue
		}
		if content != "" {
			parts = append(parts, content)
		}
	}
	return strings.Join(parts, "\n\n---\n\n"), nil
}

// LoadSkillsByIDs loads skills by resource_id (id), concatenates their content. Dedupes by id.
func (s *SkillService) LoadSkillsByIDs(ctx context.Context, ids []string) (string, error) {
	if len(ids) == 0 {
		return "", nil
	}
	seen := make(map[string]bool)
	var unique []string
	for _, id := range ids {
		if id == "" || seen[id] {
			continue
		}
		seen[id] = true
		unique = append(unique, id)
	}
	if len(unique) == 0 {
		return "", nil
	}
	var skills []model.Skill
	if err := db.Session(ctx).Model(&model.Skill{}).Where("resource_id IN ?", unique).Find(&skills).Error; err != nil {
		return "", fmt.Errorf("failed to load skills by ids: %w", err)
	}
	// Preserve order of requested ids where possible
	byID := make(map[string]*model.Skill)
	for i := range skills {
		byID[skills[i].ResourceID] = &skills[i]
	}
	var parts []string
	for _, id := range unique {
		sk, ok := byID[id]
		if !ok {
			continue
		}
		content, err := s.GetSkillContent(ctx, sk.ResourceID)
		if err != nil {
			continue
		}
		if content != "" {
			parts = append(parts, content)
		}
	}
	return strings.Join(parts, "\n\n---\n\n"), nil
}

// LoadSkillsMetadataForChat returns a text summary of available skills (id, name, description, domain) for use as system context. No file bodies. Instructs the model to use get_skill_content and list_skill_files tools to load content on demand.
func (s *SkillService) LoadSkillsMetadataForChat(ctx context.Context, domains []string, skillIDs []string) (string, []string, error) {
	seen := make(map[string]bool)
	var ordered []*model.Skill

	for _, id := range skillIDs {
		if id == "" || seen[id] {
			continue
		}
		sk, err := s.GetByID(ctx, id)
		if err != nil {
			continue
		}
		seen[sk.ResourceID] = true
		ordered = append(ordered, sk)
	}

	query := db.Session(ctx).Model(&model.Skill{})
	if len(domains) == 0 {
		query = query.Where("domain = ?", "core")
	} else {
		query = query.Where("domain = ? OR domain IN ?", "core", domains)
	}
	var domainSkills []model.Skill
	if err := query.Order("name").Find(&domainSkills).Error; err != nil {
		return "", nil, fmt.Errorf("failed to load skills by domains: %w", err)
	}
	for i := range domainSkills {
		sk := &domainSkills[i]
		if seen[sk.ResourceID] {
			continue
		}
		seen[sk.ResourceID] = true
		ordered = append(ordered, sk)
	}

	if len(ordered) == 0 {
		return "", nil, nil
	}
	orderedIDs := make([]string, len(ordered))
	for i, sk := range ordered {
		orderedIDs[i] = sk.ResourceID
	}
	var b strings.Builder
	b.WriteString("Available skills (use get_skill_content or list_skill_files to load content on demand):\n\n")
	for _, sk := range ordered {
		b.WriteString(fmt.Sprintf("- id: %s | name: %s | domain: %s\n", sk.ResourceID, sk.Name, sk.Domain))
		if sk.Description != "" {
			b.WriteString(fmt.Sprintf("  description: %s\n", sk.Description))
		}
		b.WriteString("\n")
	}
	b.WriteString("Use the tool get_skill_content(skill_id, path) to load full SKILL.md or a specific file (e.g. REFERENCE/foo.md). Use list_skill_files(skill_id, path) to list files under a path.\n")
	return b.String(), orderedIDs, nil
}

// LoadSkillsForChat loads skills by domains and/or skill IDs, merges and dedupes by skill id, returns concatenated content.
func (s *SkillService) LoadSkillsForChat(ctx context.Context, domains []string, skillIDs []string) (string, error) {
	seen := make(map[string]bool)
	var ordered []string

	// Collect skill IDs first (order preserved)
	for _, id := range skillIDs {
		if id == "" || seen[id] {
			continue
		}
		seen[id] = true
		ordered = append(ordered, id)
	}

	// Query skills by domain (same logic as LoadSkillsForDomains: core only when domains empty, else core + domains)
	query := db.Session(ctx).Model(&model.Skill{})
	if len(domains) == 0 {
		query = query.Where("domain = ?", "core")
	} else {
		query = query.Where("domain = ? OR domain IN ?", "core", domains)
	}
	var domainSkills []model.Skill
	if err := query.Order("name").Find(&domainSkills).Error; err != nil {
		return "", fmt.Errorf("failed to load skills by domains: %w", err)
	}
	for _, sk := range domainSkills {
		if seen[sk.ResourceID] {
			continue
		}
		seen[sk.ResourceID] = true
		ordered = append(ordered, sk.ResourceID)
	}

	if len(ordered) == 0 {
		return "", nil
	}
	var parts []string
	for _, id := range ordered {
		content, err := s.GetSkillContent(ctx, id)
		if err != nil {
			continue
		}
		if content != "" {
			parts = append(parts, content)
		}
	}
	return strings.Join(parts, "\n\n---\n\n"), nil
}
