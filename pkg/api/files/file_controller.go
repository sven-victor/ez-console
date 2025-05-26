package filesapi

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/service"
	"github.com/sven-victor/ez-console/pkg/util"
)

type FileController struct {
	service *service.Service
}

func NewFileController(service *service.Service) *FileController {
	return &FileController{service: service}
}

func (c *FileController) RegisterRoutes(router *gin.RouterGroup) {
	files := router.Group("/files")
	files.POST("", c.UploadFile)
	files.GET("", c.ListFiles)
	fileRouter := middleware.WithoutAuthentication(files.Group(""))
	fileRouter.GET(":fileKey", c.DownloadFile)
}

// UploadFile Upload file
//
//	@Summary		Upload file
//	@Description	Upload file
//	@ID             uploadFile
//	@Tags			File Management
//	@Accept			multipart/form-data
//	@Param			file	formData	file	true	"File"
//	@Param			access	formData	string	false	"Access type"
//	@Param			type	formData	string	false	"File type"
//	@Success		200		{object}	util.Response{data=[]model.File,code=string}
//	@Failure		400		{object}	util.Response{err=string,code=string}
//	@Router			/api/files [post]
func (c *FileController) UploadFile(ctx *gin.Context) {
	accessType := model.AccessType(ctx.PostForm("access"))
	if accessType == "" {
		accessType = model.AccessTypePrivate
	}
	fileType := model.FileType(ctx.PostForm("type"))
	cfg := config.GetConfig()
	// Limit file size
	ctx.Request.Body = http.MaxBytesReader(ctx.Writer, ctx.Request.Body, cfg.Server.MaxUploadSize)

	multipartForm, err := ctx.MultipartForm()
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      fmt.Errorf("file upload failed: %v", err),
		})
		return
	}

	if multipartForm == nil || len(multipartForm.File) == 0 {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      fmt.Errorf("file upload failed: file is required"),
		})
		return
	}
	var result []*model.File
	for fileName, fhs := range multipartForm.File {
		f, err := fhs[0].Open()
		if err != nil {
			util.RespondWithError(ctx, util.ErrorResponse{
				HTTPCode: http.StatusBadRequest,
				Code:     "E4001",
				Err:      fmt.Errorf("file upload failed: %v", err),
			})
			return
		}
		// Record audit log
		if err := c.service.StartAudit(ctx, "", func(auditLog *model.AuditLog) error {
			auditLog.Action = "file:upload"
			auditLog.ActionName = "File Upload"
			auditLog.Details.NewData = gin.H{
				"filename":      fileName,
				"original_name": fhs[0].Filename,
				"size":          fhs[0].Size,
			}

			file, err := c.service.UploadFile(ctx, fhs[0].Filename, fhs[0].Header.Get("Content-Type"), accessType, fileType, f)
			if err != nil {
				return util.ErrorResponse{
					HTTPCode: http.StatusInternalServerError,
					Code:     "E5001",
					Err:      err,
				}
			}
			result = append(result, file)
			return nil
		}); err != nil {
			util.RespondWithError(ctx, util.ErrorResponse{
				HTTPCode: http.StatusInternalServerError,
				Code:     "E5001",
				Err:      err,
			})
			return
		}
	}
	util.RespondWithSuccess(ctx, http.StatusOK, result)
}

// DownloadFile Download file
//
//	@Summary		Download file
//	@Description	Download file
//	@ID             downloadFile
//	@Tags			File Management
//	@Param			fileKey	path	string	true	"File key"
//	@Success		200
//	@Failure		400	{object}	util.Response
//	@Router			/api/files/{fileKey} [get]
func (c *FileController) DownloadFile(ctx *gin.Context) {
	fileKey := ctx.Param("fileKey")
	if fileKey == "" {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusBadRequest,
			Code:     "E4001",
			Err:      fmt.Errorf("file key is required"),
		})
		return
	}

	err := c.service.DownloadFile(ctx, fileKey)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5001",
			Err:      err,
		})
		return
	}
}

// ListFiles Get file list
//
//	@Summary		Get file list
//	@Description	Get file list
//	@ID             listFiles
//	@Tags			File Management
//	@Param			current		query		int		false	"Current page"
//	@Param			page_size	query		int		false	"Page size"
//	@Param			search		query		string	false	"Search"
//	@Param			file_type	query		string	false	"File type"
//	@Success		200			{object}	util.Response{data=[]model.File,code=string}
//	@Failure		400			{object}	util.Response{err=string,code=string}
//	@Router			/api/files [get]
func (c *FileController) ListFiles(ctx *gin.Context) {
	current, _ := strconv.Atoi(ctx.DefaultQuery("current", "1"))
	pageSize, _ := strconv.Atoi(ctx.DefaultQuery("page_size", "10"))
	search := ctx.Query("search")
	fileType := ctx.Query("file_type")
	accessType := ctx.Query("access")
	files, err := c.service.ListFiles(ctx, current, pageSize, fileType, accessType, search)
	if err != nil {
		util.RespondWithError(ctx, util.ErrorResponse{
			HTTPCode: http.StatusInternalServerError,
			Code:     "E5001",
			Err:      err,
		})
		return
	}
	util.RespondWithSuccess(ctx, http.StatusOK, files)
}

func init() {
	middleware.RegisterPermission("File Management", "Manage file upload and download", []model.Permission{
		{
			Code:        "file:list",
			Name:        "List files",
			Description: "List files from the system",
		},
	})
}
