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
	"crypto/hmac"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"fmt"
	"io"
	"net/http"
	"os"
	"path"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/spf13/afero"
	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/db"
	"github.com/sven-victor/ez-console/pkg/middleware"
	"github.com/sven-victor/ez-console/pkg/model"
	"github.com/sven-victor/ez-console/pkg/util"
)

const (
	uploadDir   = "uploads"
	maxFileSize = 10 << 20 // 10MB
)

// FileService handles file-related business logic
type FileService struct {
	baseService     *BaseService
	signatureSecret string
}

// NewFileService creates a file service instance
func NewFileService(s *BaseService) *FileService {
	// Ensure upload directory exists
	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		panic(fmt.Sprintf("Failed to create upload directory: %v", err))
	}
	priv := make([]byte, 32)
	_, err := rand.Read(priv)
	if err != nil {
		panic(fmt.Sprintf("Failed to generate signature secret: %v", err))
	}
	return &FileService{baseService: s, signatureSecret: base64.StdEncoding.EncodeToString(priv)}
}

// UploadFile handles file uploads
func (s *FileService) UploadFile(ctx context.Context, filename, contentType string, accessType model.AccessType, fileType model.FileType, f io.Reader) (*model.File, error) {
	user := middleware.GetUserFromContext(ctx)
	if user == nil {
		return nil, util.ErrorResponse{
			HTTPCode: http.StatusForbidden,
			Code:     "E4031",
			Err:      fmt.Errorf("Access denied"),
		}
	}
	return s.UploadFileWithOwner(ctx, user.ResourceID, filename, contentType, accessType, fileType, f)
}

// UploadFileWithOwner uploads a file with the given owner ID (e.g. for task artifact).
func (s *FileService) UploadFileWithOwner(ctx context.Context, ownerID, filename, contentType string, accessType model.AccessType, fileType model.FileType, f io.Reader) (*model.File, error) {
	if ownerID == "" {
		ownerID = "system"
	}
	cfg := config.GetConfig()
	uploadDir, err := cfg.GetUploadDir()
	if err != nil {
		return nil, fmt.Errorf("failed to get upload dir: %v", err)
	}
	nowTime := time.Now().UTC()
	dirName := nowTime.Format("2006-01")
	if _, err = uploadDir.Stat(dirName); os.IsNotExist(err) {
		if err = uploadDir.MkdirAll(dirName, 0o755); err != nil {
			return nil, fmt.Errorf("failed to create directory: %v", err)
		}
	} else if err != nil {
		return nil, fmt.Errorf("failed to get directory status: %v", err)
	}
	filePath := fmt.Sprintf("%s/%d%s", dirName, nowTime.UnixNano(), path.Ext(filename))

	var out io.ReadWriteCloser
	if out, err = uploadDir.OpenFile(filePath, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0o644); err != nil {
		return nil, fmt.Errorf("failed to open file: %v", err)
	}
	defer out.Close()

	// Copy file content
	size, err := io.Copy(out, f)
	if err != nil {
		return nil, fmt.Errorf("failed to save file: %v", err)
	}
	var file = model.File{
		Name:     filename,
		Size:     size,
		MimiType: contentType,
		Path:     filePath,
		Access:   accessType,
		Owner:    ownerID,
		Type:     fileType,
	}
	if err = db.Session(ctx).Create(&file).Error; err != nil {
		return nil, fmt.Errorf("failed to create file: %v", err)
	}
	return &file, nil
}

func (s *FileService) SignDownloadURL(fileKey string) (string, int64, error) {
	expires := time.Now().Add(10 * time.Minute).Unix()

	data := fileKey + ":" + strconv.FormatInt(expires, 10)
	h := hmac.New(sha256.New, []byte(s.signatureSecret))
	h.Write([]byte(data))
	signature := hex.EncodeToString(h.Sum(nil))
	return signature, expires, nil
}

func (s *FileService) VerifyDownloadURL(fileKey string, signature string, expires int64) bool {
	data := fileKey + ":" + strconv.FormatInt(expires, 10)
	h := hmac.New(sha256.New, []byte(s.signatureSecret))
	h.Write([]byte(data))
	expected := hex.EncodeToString(h.Sum(nil))
	return hmac.Equal([]byte(expected), []byte(signature))
}

// DownloadFile handles file downloads
func (s *FileService) GetFileInfo(c *gin.Context, fileKey string) (*model.File, error) {
	var file model.File
	if err := db.Session(c).Where("resource_id = ?", fileKey).First(&file).Error; err != nil {
		return nil, fmt.Errorf("failed to get file: %v", err)
	}
	return &file, nil
}

// DownloadFile handles file downloads
func (s *FileService) DownloadFile(c *gin.Context, path string) error {
	uploadDir, err := config.GetConfig().GetUploadDir()
	if err != nil {
		return fmt.Errorf("failed to get upload dir: %v", err)
	}
	c.FileFromFS(path, afero.NewHttpFs(uploadDir))
	return nil
}

func (s *FileService) ListFiles(ctx context.Context, current int, pageSize int, fileType, accessType, search string) ([]model.File, error) {
	roles := middleware.GetRolesFromContext(ctx)
	var hasPermission bool
	for _, role := range roles {
		if role.HasPermission("file:list") {
			hasPermission = true
			break
		}
	}
	query := db.Session(ctx).Model(&model.File{})
	if search != "" {
		query = query.Where("`name` LIKE ?", "%"+search+"%")
	}
	if accessType != "" {
		if accessType == "public" {
			query = query.Where("access = ?", model.AccessTypePublic)
		} else if accessType == "private" {
			query = query.Where("access = ?", model.AccessTypePrivate)
		} else if accessType == "owner" {
			query = query.Where("access = ?", model.AccessTypeOwner)
		}
	}
	if !hasPermission {
		query = query.Where("owner = ?", middleware.GetUserIDFromContext(ctx))
	}
	if fileType != "" {
		query = query.Where("`type` = ?", fileType)
	}
	var files []model.File
	var total int64
	if err := query.Offset((current - 1) * pageSize).Limit(pageSize).Count(&total).Find(&files).Error; err != nil {
		return nil, fmt.Errorf("failed to get files: %v", err)
	}
	return files, nil
}
