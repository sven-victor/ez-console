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

package util

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/go-kit/log/level"
	"github.com/sven-victor/ez-utils/log"
)

type ErrorResponse struct {
	HTTPCode int    `json:"-"`
	Code     string `json:"code"`
	Err      error  `json:"err"`
	Message  string `json:"message,omitempty"`
	TraceID  string `json:"trace_id,omitempty"`
}

// MarshalJSON implements json.Marshaler.
func (e ErrorResponse) MarshalJSON() ([]byte, error) {
	var buf bytes.Buffer
	enc := json.NewEncoder(&buf)
	buf.WriteString(`{"code": `)
	if err := enc.Encode(e.Code); err != nil {
		return nil, err
	}
	buf.WriteString(`,"err":`)
	if err := enc.Encode(e.Err.Error()); err != nil {
		return nil, err
	}
	if e.Message != "" {
		buf.WriteString(`,"message":`)
		if err := enc.Encode(e.Message); err != nil {
			return nil, err
		}
	}
	if e.TraceID != "" {
		buf.WriteString(`,"trace_id":`)
		if err := enc.Encode(e.TraceID); err != nil {
			return nil, err
		}
	}
	buf.WriteString(`}`)
	return buf.Bytes(), nil
}

var _ json.Marshaler = &ErrorResponse{}

func (e ErrorResponse) Error() string {
	if e.Message != "" {
		return e.Message
	}
	return e.Err.Error()
}

func (e ErrorResponse) String() string {
	buf := bytes.NewBuffer(nil)
	buf.WriteString(fmt.Sprintf("[%s] ", e.Code))
	if e.Message != "" {
		buf.WriteString(e.Message)
	}
	if e.Err != nil {
		buf.WriteString(": " + e.Err.Error())
	}
	return buf.String()
}

type Response[T any] struct {
	Code    string `json:"code"`
	Data    T      `json:"data,omitempty"`
	Err     string `json:"err,omitempty"`
	TraceID string `json:"trace_id,omitempty"`
}

type PaginationResponse[T any] struct {
	Code     string `json:"code"`
	Data     []T    `json:"data"`
	Total    int64  `json:"total"`
	Current  int    `json:"current"`
	PageSize int    `json:"page_size"`
	TraceID  string `json:"trace_id,omitempty"`
}

// RespondWithErrorMessage returns an error response
func RespondWithErrorMessage(c *gin.Context, httpCode int, errorCode string, message string) {
	c.JSON(httpCode, ErrorResponse{
		Code:    errorCode,
		Err:     errors.New(message),
		Message: message,
		TraceID: log.GetTraceId(c),
	})
}

func unwrapErrorResponse(err ErrorResponse) ErrorResponse {
	if err.Err != nil {
		var unwrappedError ErrorResponse
		if errors.As(err.Err, &unwrappedError) {
			return unwrapErrorResponse(unwrappedError)
		}
		return ErrorResponse{
			HTTPCode: err.HTTPCode,
			Code:     err.Code,
			Err:      err.Err,
			Message:  err.Message,
			TraceID:  err.TraceID,
		}
	}
	return err
}

func RespondWithError(c *gin.Context, err error) {
	traceID := log.GetTraceId(c)
	logger := log.GetContextLogger(c)
	var errorResponse ErrorResponse
	if errors.As(err, &errorResponse) {
		errorResponse = unwrapErrorResponse(errorResponse)
		level.Error(logger).Log("msg", "RespondWithError", "error", errorResponse.String())
		if errorResponse.HTTPCode == 0 {
			errorResponse.HTTPCode = http.StatusInternalServerError
		}
		if errorResponse.Message == "" {
			errorResponse.Message = errorResponse.Err.Error()
		}
		c.AbortWithStatusJSON(errorResponse.HTTPCode, ErrorResponse{
			Code:    errorResponse.Code,
			Err:     errors.New(errorResponse.Message),
			TraceID: traceID,
		})
		return
	}
	level.Error(logger).Log("msg", "RespondWithError", "error", err.Error())
	c.AbortWithStatusJSON(http.StatusInternalServerError, ErrorResponse{
		Code:    "E5000",
		Err:     err,
		TraceID: traceID,
	})
}

// RespondWithSuccess returns a successful response
func RespondWithSuccess[T any](c *gin.Context, httpCode int, data T) {
	c.JSON(httpCode, Response[T]{
		Code:    "0",
		TraceID: log.GetTraceId(c),
		Data:    data,
	})
}

func RespondWithMessage(c *gin.Context, message string) {
	c.JSON(http.StatusOK, Response[MessageData]{
		Code:    "0",
		TraceID: log.GetTraceId(c),
		Data:    MessageData{Message: message},
	})
}

// RespondWithSuccessList returns a list response with pagination
func RespondWithSuccessList[T any](c *gin.Context, httpCode int, data []T, total int64, current int, pageSize int) {
	c.JSON(httpCode, PaginationResponse[T]{
		Code:     "0",
		Data:     data,
		Total:    total,
		Current:  current,
		PageSize: pageSize,
		TraceID:  log.GetTraceId(c),
	})
}

func NewError(code string, err error) error {
	httpCode := http.StatusInternalServerError
	if len(code) >= 4 && (strings.HasPrefix(code, "E4") || strings.HasPrefix(code, "E5")) {
		if c, err := strconv.Atoi(code[1:4]); err == nil {
			httpCode = c
		}
	}
	return ErrorResponse{
		HTTPCode: httpCode,
		Code:     code,
		Err:      err,
		Message:  err.Error(),
	}
}

func NewErrorMessage(code string, msg string, err ...error) error {
	httpCode := http.StatusInternalServerError
	if len(code) >= 4 && (strings.HasPrefix(code, "E4") || strings.HasPrefix(code, "E5")) {
		if c, err := strconv.Atoi(code[1:4]); err == nil {
			httpCode = c
		}
	}
	if len(err) > 0 {
		return ErrorResponse{
			HTTPCode: httpCode,
			Code:     code,
			Message:  msg,
			Err:      err[0],
		}
	}
	return ErrorResponse{
		HTTPCode: httpCode,
		Code:     code,
		Message:  msg,
		Err:      errors.New(msg),
	}
}

type MessageData struct {
	Message string `json:"message"`
}
