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

package taskapi

import (
	"context"
	"errors"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
)

// TaskController API controller for task operations
type TaskController struct {
	service *service.Service
}

// NewTaskController creates a new TaskController
func NewTaskController(service *service.Service) *TaskController {
	return &TaskController{service: service}
}

// RegisterRoutes registers task routes
func (c *TaskController) RegisterRoutes(ctx context.Context, router *gin.RouterGroup) {
	tasks := router.Group("/tasks")
	{
		tasks.GET("", middleware.RequirePermission("task:list"), c.ListTasks)
		tasks.GET("/:id", middleware.RequirePermission("task:view"), c.GetTask)
		tasks.GET("/:id/logs", middleware.RequirePermission("task:view"), c.GetTaskLogs)
		tasks.POST("/:id/cancel", middleware.RequirePermission("task:cancel"), c.CancelTask)
		tasks.POST("/:id/retry", middleware.RequirePermission("task:retry"), c.RetryTask)
		tasks.DELETE("/:id", middleware.RequirePermission("task:delete"), c.DeleteTask)
	}
	userTasks := router.Group("/user-tasks")
	{
		userTasks.GET("", c.ListUserTasks)
	}
	taskSchedules := router.Group("/task-schedules")
	taskSchedules.Use(middleware.RequirePermission("task:schedule:list"))
	{
		taskSchedules.GET("", c.ListTaskSchedules)
		taskSchedules.GET("/:id/history", c.GetTaskScheduleHistory)
		taskSchedules.POST("/:id/toggle", middleware.RequirePermission("task:schedule:update"), c.ToggleTaskSchedule)
		taskSchedules.POST("/:id/trigger", middleware.RequirePermission("task:schedule:update"), c.TriggerTaskSchedule)
	}
}

func init() {
	middleware.RegisterPermission("Task Management", "View, cancel, retry, and delete tasks", []model.Permission{
		{Code: "task:list", Name: "List tasks", Description: "List tasks (admin sees all, others see own)", DefaultRoleNames: []string{"admin", "operator", "viewer"}},
		{Code: "task:view", Name: "View task", Description: "View task details", DefaultRoleNames: []string{"admin", "operator", "viewer"}},
		{Code: "task:cancel", Name: "Cancel task", Description: "Cancel a running or pending task", DefaultRoleNames: []string{"admin", "operator"}},
		{Code: "task:retry", Name: "Retry task", Description: "Retry a failed or cancelled task", DefaultRoleNames: []string{"admin", "operator"}},
		{Code: "task:delete", Name: "Delete task", Description: "Delete a task", DefaultRoleNames: []string{"admin", "operator"}},
	})
	middleware.RegisterPermission("Task Scheduler", "View and manage scheduled (cron) tasks", []model.Permission{
		{Code: "task:schedule:list", Name: "List scheduled tasks", Description: "View defined cron jobs and execution history", DefaultRoleNames: []string{"admin", "operator"}},
		{Code: "task:schedule:update", Name: "Update scheduled tasks", Description: "Enable/disable and trigger scheduled tasks", DefaultRoleNames: []string{"admin", "operator"}},
	})
}

// ListTasks gets a list of tasks with pagination
//
//	@Summary		Get user task list
//	@Description	Get a list of tasks for the current user.
//	@ID             listUserTasks
//	@Tags			Task Management
//	@Accept			json
//	@Produce		json
//	@Success		200			{object}	util.Response[[]model.Task]
//	@Failure		500			{object}	util.ErrorResponse
//	@Router			/api/user-tasks [get]
func (c *TaskController) ListUserTasks(ctx *gin.Context) {
	userID := middleware.GetUserIDFromContext(ctx)
	if userID == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "User ID is required"))
		return
	}
	list, err := c.service.TaskService.ListUserTasks(ctx, userID)
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to list user tasks", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, list)
}

// ListTasks gets a list of tasks with pagination
//
//	@Summary		Get task list
//	@Description	Get a list of tasks. Admin sees all; others see only their own.
//	@ID             listTasks
//	@Tags			Task Management
//	@Accept			json
//	@Produce		json
//	@Param			current		query		int		false	"Current page number"	default(1)
//	@Param			page_size	query		int		false	"Number of items per page"	default(10)
//	@Param			search		query		string	false	"Search keyword"
//	@Success		200			{object}	util.PaginationResponse[model.Task]
//	@Failure		500			{object}	util.ErrorResponse
//	@Router			/api/tasks [get]
func (c *TaskController) ListTasks(ctx *gin.Context) {
	current, _ := strconv.Atoi(ctx.DefaultQuery("current", "1"))
	pageSize, _ := strconv.Atoi(ctx.DefaultQuery("page_size", "10"))
	search := ctx.Query("search")
	if current < 1 {
		current = 1
	}
	if pageSize < 1 || pageSize > 100 {
		pageSize = 10
	}
	list, total, err := c.service.TaskService.ListTasks(ctx, current, pageSize, search)
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to list tasks", err))
		return
	}
	util.RespondWithSuccessList(ctx, http.StatusOK, list, total, current, pageSize)
}

// GetTask gets a task by ID
//
//	@Summary		Get task by ID
//	@Description	Get a task by ID. Admin or creator only.
//	@ID             getTask
//	@Tags			Task Management
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Task ID (UUID)"
//	@Success		200	{object}	util.Response[model.Task]
//	@Failure		404	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/tasks/{id} [get]
func (c *TaskController) GetTask(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Task ID is required"))
		return
	}
	t, err := c.service.TaskService.GetTask(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to get task", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, t)
}

// GetTaskLogs gets stored log entries for a task
//
//	@Summary		Get task logs
//	@Description	Get log entries for a task. Admin or creator only.
//	@ID             getTaskLogs
//	@Tags			Task Management
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Task ID (UUID)"
//	@Success		200	{object}	util.Response[[]model.TaskLog] "data is array of TaskLog"
//	@Failure		404	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/tasks/{id}/logs [get]
func (c *TaskController) GetTaskLogs(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Task ID is required"))
		return
	}
	logs, err := c.service.TaskService.GetTaskLogs(ctx, id)
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to get task logs", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, logs)
}

// CancelTask cancels a task
//
//	@Summary		Cancel task
//	@Description	Cancel a running or pending task
//	@ID             cancelTask
//	@Tags			Task Management
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Task ID (UUID)"
//	@Success		200	{object}	util.Response[util.MessageData]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/tasks/{id}/cancel [post]
func (c *TaskController) CancelTask(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Task ID is required"))
		return
	}
	if err := c.service.TaskService.CancelTask(ctx, id); err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to cancel task", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, util.MessageData{Message: "Task cancelled"})
}

// RetryTask retries a failed or cancelled task
//
//	@Summary		Retry task
//	@Description	Retry a failed or cancelled task
//	@ID             retryTask
//	@Tags			Task Management
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Task ID (UUID)"
//	@Success		200	{object}	util.Response[util.MessageData]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/tasks/{id}/retry [post]
func (c *TaskController) RetryTask(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Task ID is required"))
		return
	}
	if err := c.service.TaskService.RetryTask(ctx, id); err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to retry task", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, util.MessageData{Message: "Task retry requested"})
}

// DeleteTask deletes a task (soft delete)
//
//	@Summary		Delete task
//	@Description	Delete a task. Admin or creator only.
//	@ID             deleteTask
//	@Tags			Task Management
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Task ID (UUID)"
//	@Success		200	{object}	util.Response[util.MessageData]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/tasks/{id} [delete]
func (c *TaskController) DeleteTask(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Task ID is required"))
		return
	}
	if err := c.service.TaskService.DeleteTask(ctx, id); err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to delete task", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, util.MessageData{Message: "Task deleted"})
}

// ListTaskSchedules returns all registered scheduled jobs with runtime state.
//
//	@Summary		List scheduled tasks
//	@Description	Returns defined cron jobs with next/last run and enabled status.
//	@ID             listTaskSchedules
//	@Tags			Task Scheduler
//	@Accept			json
//	@Produce		json
//	@Success		200	{object}	util.Response[[]service.ScheduledJobState]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/task-schedules [get]
func (c *TaskController) ListTaskSchedules(ctx *gin.Context) {
	list := c.service.SchedulerService.ListScheduledJobsWithState()
	util.RespondWithSuccess(ctx, http.StatusOK, list)
}

// GetTaskScheduleHistory returns paginated execution history for a scheduled job.
//
//	@Summary		Get schedule execution history
//	@Description	Returns tasks created by the given cron schedule.
//	@ID             getTaskScheduleHistory
//	@Tags			Task Scheduler
//	@Accept			json
//	@Produce		json
//	@Param			id		path		string	true	"Schedule ID"
//	@Param			current	query		int		false	"Page number"	default(1)
//	@Param			page_size	query	int		false	"Page size"	default(10)
//	@Success		200	{object}	util.PaginationResponse[model.Task]
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/task-schedules/{id}/history [get]
func (c *TaskController) GetTaskScheduleHistory(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Schedule ID is required"))
		return
	}
	current, _ := strconv.Atoi(ctx.DefaultQuery("current", "1"))
	pageSize, _ := strconv.Atoi(ctx.DefaultQuery("page_size", "10"))
	if current < 1 {
		current = 1
	}
	if pageSize < 1 || pageSize > 100 {
		pageSize = 10
	}
	list, total, err := c.service.TaskService.ListTasksByCronScheduleID(ctx, id, current, pageSize)
	if err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to list schedule history", err))
		return
	}
	util.RespondWithSuccessList(ctx, http.StatusOK, list, total, current, pageSize)
}

// ToggleTaskSchedule enables or disables a scheduled job.
//
//	@Summary		Toggle scheduled task
//	@Description	Enable or disable a cron job by ID.
//	@ID             toggleTaskSchedule
//	@Tags			Task Scheduler
//	@Accept			json
//	@Produce		json
//	@Param			id		path		string	true	"Schedule ID"
//	@Param			body	body		object	true	"{\"enabled\": true|false}"
//	@Success		200	{object}	util.Response[util.MessageData]
//	@Failure		404	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/task-schedules/{id}/toggle [post]
func (c *TaskController) ToggleTaskSchedule(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Schedule ID is required"))
		return
	}
	var body struct {
		Enabled bool `json:"enabled"`
	}
	if err := ctx.ShouldBindJSON(&body); err != nil {
		util.RespondWithError(ctx, util.NewErrorMessage("E4002", "Invalid request body", err))
		return
	}
	if err := c.service.SchedulerService.ToggleEnabled(id, body.Enabled); err != nil {
		if errors.Is(err, service.ErrScheduledJobNotFound) {
			util.RespondWithError(ctx, util.NewErrorMessage("E4041", "Scheduled job not found"))
			return
		}
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to toggle schedule", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, util.MessageData{Message: "Schedule updated"})
}

// TriggerTaskSchedule runs the scheduled job once immediately.
//
//	@Summary		Trigger scheduled task
//	@Description	Creates and enqueues one task for the given schedule immediately.
//	@ID             triggerTaskSchedule
//	@Tags			Task Scheduler
//	@Accept			json
//	@Produce		json
//	@Param			id	path		string	true	"Schedule ID"
//	@Success		200	{object}	util.Response[model.Task]
//	@Failure		404	{object}	util.ErrorResponse
//	@Failure		500	{object}	util.ErrorResponse
//	@Router			/api/task-schedules/{id}/trigger [post]
func (c *TaskController) TriggerTaskSchedule(ctx *gin.Context) {
	id := ctx.Param("id")
	if id == "" {
		util.RespondWithError(ctx, util.NewErrorMessage("E4001", "Schedule ID is required"))
		return
	}
	task, err := c.service.SchedulerService.TriggerNow(ctx, id)
	if err != nil {
		if errors.Is(err, service.ErrScheduledJobNotFound) {
			util.RespondWithError(ctx, util.NewErrorMessage("E4041", "Scheduled job not found"))
			return
		}
		util.RespondWithError(ctx, util.NewErrorMessage("E5001", "Failed to trigger schedule", err))
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, task)
}
