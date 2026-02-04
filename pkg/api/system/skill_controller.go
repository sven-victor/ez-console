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

package systemapi

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
)

// SkillController handles skill management and file operations
type SkillController struct {
	service *service.Service
}

// NewSkillController creates a new skill controller
func NewSkillController(svc *service.Service) *SkillController {
	return &SkillController{service: svc}
}

// RegisterRoutes registers skill routes
func (c *SkillController) RegisterRoutes(router *gin.RouterGroup) {
	skills := router.Group("/skills")
	{
		skills.GET("", middleware.RequirePermission("system:skills:view"), c.ListSkills)
		skills.GET("/domains", middleware.RequirePermission("system:skills:view"), c.ListSkillDomains)
		skills.POST("", middleware.RequirePermission("system:skills:create"), c.CreateSkill)
		skills.GET("/:id", middleware.RequirePermission("system:skills:view"), c.GetSkill)
		skills.PUT("/:id", middleware.RequirePermission("system:skills:update"), c.UpdateSkill)
		skills.DELETE("/:id", middleware.RequirePermission("system:skills:delete"), c.DeleteSkill)
		skills.POST("/upload", middleware.RequirePermission("system:skills:create"), c.UploadSkill)
		skills.GET("/:id/preview", middleware.RequirePermission("system:skills:view"), c.PreviewSkill)
		skills.PUT("/:id/move-path", middleware.RequirePermission("system:skills:edit_files"), c.MoveSkillPath)
		skills.GET("/:id/files", middleware.RequirePermission("system:skills:edit_files"), c.ListSkillFilesTree)
		skills.GET("/:id/files/*path", middleware.RequirePermission("system:skills:edit_files"), c.GetSkillFile)
		skills.PUT("/:id/files/*path", middleware.RequirePermission("system:skills:edit_files"), c.PutSkillFile)
		skills.POST("/:id/dirs", middleware.RequirePermission("system:skills:edit_files"), c.CreateSkillDir)
		skills.DELETE("/:id/files/*path", middleware.RequirePermission("system:skills:edit_files"), c.DeleteSkillPath)
	}
}

// CreateSkillRequest for creating a skill
type CreateSkillRequest struct {
	Name        string `json:"name" binding:"required"`
	Description string `json:"description"`
	Category    string `json:"category"`
	Domain      string `json:"domain"`
	Content     string `json:"content"` // optional initial SKILL.md content
}

// UpdateSkillRequest for updating skill metadata
type UpdateSkillRequest struct {
	Name        string `json:"name" binding:"required"`
	Description string `json:"description"`
	Category    string `json:"category"`
	Domain      string `json:"domain"`
}

// CreateSkillDirRequest for creating a subdirectory
type CreateSkillDirRequest struct {
	Path string `json:"path" binding:"required"`
}

// MoveSkillPathRequest for moving or renaming a file or directory
type MoveSkillPathRequest struct {
	FromPath string `json:"from_path" binding:"required"`
	ToPath   string `json:"to_path" binding:"required"`
}

// PreviewSkillResponse for skill preview content
type PreviewSkillResponse struct {
	Content string `json:"content"`
}

// ListSkills lists skills with pagination
//
//	@Summary		List skills
//	@Description	Get a paginated list of skills with optional search and filters
//	@ID             listSkills
//	@Tags			System Settings/Skills
//	@Accept			json
//	@Produce		json
//	@Param			current		query		int		false	"Page number"		default(1)
//	@Param			page_size	query		int		false	"Page size"			default(10)
//	@Param			search		query		string	false	"Search keyword"
//	@Param			category	query		string	false	"Filter by category"
//	@Param			domain		query		string	false	"Filter by domain"
//	@Success		200			{object}	util.PaginationResponse[model.Skill]
//	@Failure		500			{object}	util.ErrorResponse
//	@Router			/api/system/skills [get]
func (c *SkillController) ListSkills(ctx *gin.Context) {
	current, _ := strconv.Atoi(ctx.DefaultQuery("current", "1"))
	pageSize, _ := strconv.Atoi(ctx.DefaultQuery("page_size", "10"))
	search := ctx.Query("search")
	category := ctx.Query("category")
	domain := ctx.Query("domain")

	list, total, err := c.service.SkillService.List(ctx, current, pageSize, search, category, domain)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}
	util.RespondWithSuccessList(ctx, http.StatusOK, list, total, current, pageSize)
}

// ListSkillDomains returns available skill domains
//
//	@Summary		List skill domains
//	@Description	Get the list of registered skill domains
//	@ID             listSkillDomains
//	@Tags			System Settings/Skills
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	util.Response[[]string]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/system/skills/domains [get]
func (c *SkillController) ListSkillDomains(ctx *gin.Context) {
	domains := c.service.SkillService.ListDomains()
	util.RespondWithSuccess(ctx, http.StatusOK, domains)
}

// GetSkill gets a skill by ID
//
//	@Summary		Get skill
//	@Description	Get a skill by ID
//	@ID             getSkill
//	@Tags			System Settings/Skills
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Skill ID"
//	@Success		200	{object}	util.Response[model.Skill]
//	@Failure		400	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/system/skills/{id} [get]
func (c *SkillController) GetSkill(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Skill ID is required"))
		return
	}
	skill, err := c.service.SkillService.GetByID(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, skill)
}

// CreateSkill creates a new skill
//
//	@Summary		Create skill
//	@Description	Create a new skill with optional initial content
//	@ID             createSkill
//	@Tags			System Settings/Skills
//	@Accept			json
//	@Produce		json
//	@Param			request	body		CreateSkillRequest	true	"Skill data"
//	@Success		201	{object}	util.Response[model.Skill]
//	@Failure		400	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/system/skills [post]
func (c *SkillController) CreateSkill(ctx *gin.Context) {
	var req CreateSkillRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}
	skill := &model.Skill{
		Name:        req.Name,
		Description: req.Description,
		Category:    req.Category,
		Domain:      req.Domain,
	}
	created, err := c.service.SkillService.Create(ctx, skill, req.Content)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusCreated, created)
}

// UpdateSkill updates skill metadata
//
//	@Summary		Update skill
//	@Description	Update skill name, description, category, and domain
//	@ID             updateSkill
//	@Tags			System Settings/Skills
//	@Accept			json
//	@Produce		json
//	@Param			id		path		string				true	"Skill ID"
//	@Param			request	body		UpdateSkillRequest	true	"Skill data"
//	@Success		200		{object}	util.Response[model.Skill]
//	@Failure		400		{object}	util.ErrorResponse
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/system/skills/{id} [put]
func (c *SkillController) UpdateSkill(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Skill ID is required"))
		return
	}
	var req UpdateSkillRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}
	skill, err := c.service.SkillService.GetByID(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}
	skill.Name = req.Name
	skill.Description = req.Description
	skill.Category = req.Category
	skill.Domain = req.Domain
	if err := c.service.SkillService.Update(ctx, skill); err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}
	if err := c.service.SkillService.UpdateSkillFrontmatter(ctx, skill); err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, skill)
}

// DeleteSkill deletes a skill
//
//	@Summary		Delete skill
//	@Description	Delete a skill and its files
//	@ID             deleteSkill
//	@Tags			System Settings/Skills
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Skill ID"
//	@Success		200	{object}	util.Response[util.MessageData]
//	@Failure		400	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/system/skills/{id} [delete]
func (c *SkillController) DeleteSkill(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Skill ID is required"))
		return
	}
	if err := c.service.SkillService.Delete(ctx, id); err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, gin.H{"message": "deleted"})
}

// UploadSkill creates a skill from an uploaded .md or .zip file
//
//	@Summary		Upload skill
//	@Description	Create a skill from an uploaded .md or .zip file (parses SKILL.md frontmatter)
//	@ID             uploadSkill
//	@Tags			System Settings/Skills
//	@Accept			multipart/form-data
//	@Produce		json
//	@Param			file		formData	file	true	"Skill file (.md or .zip)"
//	@Param			category	formData	string	false	"Category"
//	@Param			domain		formData	string	false	"Domain"
//	@Success		201			{object}	util.Response[model.Skill]
//	@Failure		400			{object}	util.ErrorResponse
//	@Failure		500			{object}	util.ErrorResponse
//	@Router			/api/system/skills/upload [post]
func (c *SkillController) UploadSkill(ctx *gin.Context) {
	file, err := ctx.FormFile("file")
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "file is required"))
		return
	}
	category := ctx.PostForm("category")
	domain := ctx.PostForm("domain")
	f, err := file.Open()
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}
	defer f.Close()
	created, err := c.service.SkillService.UploadSkill(ctx, f, file.Filename, category, domain)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusCreated, created)
}

// PreviewSkill returns the rendered skill content for preview
//
//	@Summary		Preview skill
//	@Description	Get concatenated skill content (SKILL.md and other .md files) for preview
//	@ID             previewSkill
//	@Tags			System Settings/Skills
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Skill ID"
//	@Success		200	{object}	util.Response[PreviewSkillResponse]
//	@Failure		400	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/system/skills/{id}/preview [get]
func (c *SkillController) PreviewSkill(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Skill ID is required"))
		return
	}
	content, err := c.service.SkillService.GetSkillContent(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, gin.H{"content": content})
}

// ListSkillFilesTree returns the full file tree for a skill
//
//	@Summary		List skill file tree
//	@Description	Get the full file tree (directories and .md/.txt files) for a skill
//	@ID             listSkillFilesTree
//	@Tags			System Settings/Skills
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Skill ID"
//	@Success		200	{object}	util.Response[[]service.SkillTreeNode]
//	@Failure		400	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/system/skills/{id}/files [get]
func (c *SkillController) ListSkillFilesTree(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Skill ID is required"))
		return
	}
	tree, err := c.service.SkillService.ListFilesTree(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, tree)
}

// GetSkillFile returns the raw content of a skill file
//
//	@Summary		Get skill file content
//	@Description	Get the content of a file under the skill (.md or .txt)
//	@ID             getSkillFile
//	@Tags			System Settings/Skills
//	@Accept			json
//	@Produce		text/plain
//	@Param			id		path		string	true	"Skill ID"
//	@Param			path	path		string	true	"File path (e.g. SKILL.md or docs/readme.md)"
//	@Success		200		{string}	string	"File content"
//	@Failure		400		{object}	util.ErrorResponse
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/system/skills/{id}/files/{path} [get]
func (c *SkillController) GetSkillFile(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Skill ID is required"))
		return
	}
	pathParam := ctx.Param("path")
	path := strings.TrimPrefix(pathParam, "/")
	content, err := c.service.SkillService.GetFile(ctx, id, path)
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}
	ctx.Data(http.StatusOK, "text/markdown; charset=utf-8", content)
}

// PutSkillFile creates or overwrites a skill file
//
//	@Summary		Put skill file
//	@Description	Create or update a file under the skill (body: raw file content)
//	@ID             putSkillFile
//	@Tags			System Settings/Skills
//	@Accept			application/octet-stream
//	@Produce		json
//	@Param			id		path		string	true	"Skill ID"
//	@Param			path	path		string	true	"File path"
//	@Param			body	body		string	true	"File content"
//	@Success		200		{object}	util.Response[util.MessageData]
//	@Failure		400		{object}	util.ErrorResponse
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/system/skills/{id}/files/{path} [put]
func (c *SkillController) PutSkillFile(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Skill ID is required"))
		return
	}
	pathParam := ctx.Param("path")
	path := strings.TrimPrefix(pathParam, "/")
	body, err := ctx.GetRawData()
	if err != nil {
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}
	if err := c.service.SkillService.PutFile(ctx, id, path, body); err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, gin.H{"message": "saved"})
}

// CreateSkillDir creates a subdirectory under the skill
//
//	@Summary		Create skill directory
//	@Description	Create a subdirectory at the given path
//	@ID             createSkillDir
//	@Tags			System Settings/Skills
//	@Accept			json
//	@Produce		json
//	@Param			id		path		string					true	"Skill ID"
//	@Param			request	body		CreateSkillDirRequest	true	"Directory path"
//	@Success		201		{object}	util.Response[util.MessageData]
//	@Failure		400		{object}	util.ErrorResponse
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/system/skills/{id}/dirs [post]
func (c *SkillController) CreateSkillDir(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Skill ID is required"))
		return
	}
	var req CreateSkillDirRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}
	if err := c.service.SkillService.CreateDir(ctx, id, req.Path); err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusCreated, gin.H{"message": "created"})
}

// MoveSkillPath moves or renames a file or directory within the skill
//
//	@Summary		Move skill path
//	@Description	Move or rename a file or directory (target must not exist)
//	@ID             moveSkillPath
//	@Tags			System Settings/Skills
//	@Accept			json
//	@Produce		json
//	@Param			id		path		string					true	"Skill ID"
//	@Param			request	body		MoveSkillPathRequest	true	"From and to paths"
//	@Success		200		{object}	util.Response[util.MessageData]
//	@Failure		400		{object}	util.ErrorResponse
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/system/skills/{id}/move-path [put]
func (c *SkillController) MoveSkillPath(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Skill ID is required"))
		return
	}
	var req MoveSkillPathRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		util.RespondWithError(ctx, util.NewError("E4001", err))
		return
	}
	if err := c.service.SkillService.MovePath(ctx, id, req.FromPath, req.ToPath); err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, gin.H{"message": "moved"})
}

// DeleteSkillPath deletes a file or directory (recursive for directories)
//
//	@Summary		Delete skill path
//	@Description	Delete a file or directory; directories are removed recursively
//	@ID             deleteSkillPath
//	@Tags			System Settings/Skills
//	@Accept			json
//	@Produce		json
//	@Param			id		path		string	true	"Skill ID"
//	@Param			path	path		string	true	"File or directory path"
//	@Success		200		{object}	util.Response[util.MessageData]
//	@Failure		400		{object}	util.ErrorResponse
//	@Failure		500		{object}	util.ErrorResponse
//	@Router			/api/system/skills/{id}/files/{path} [delete]
func (c *SkillController) DeleteSkillPath(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Skill ID is required"))
		return
	}
	pathParam := ctx.Param("path")
	path := strings.TrimPrefix(pathParam, "/")
	if err := c.service.SkillService.DeletePath(ctx, id, path); err != nil {
		util.RespondWithError(ctx, util.NewError("E5001", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, gin.H{"message": "deleted"})
}

func init() {
	middleware.RegisterPermission("Skill Management", "Manage AI Agent Skills (create, edit, delete, file editor)", []model.Permission{
		{Code: "system:skills:view", Name: "View skills", Description: "View and preview skills"},
		{Code: "system:skills:create", Name: "Create skill", Description: "Create new skills"},
		{Code: "system:skills:update", Name: "Update skill", Description: "Update skill metadata"},
		{Code: "system:skills:delete", Name: "Delete skill", Description: "Delete skills"},
		{Code: "system:skills:edit_files", Name: "Edit skill files", Description: "Edit skill files and directories"},
	})
}
