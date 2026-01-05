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

package middleware

import (
	"bytes"
	"crypto/sha256"
	"encoding/json"
	"fmt"
	"net/http"
	"runtime"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	kitlog "github.com/go-kit/log"
	"github.com/go-kit/log/level"
	"github.com/sven-victor/ez-console/pkg/logs"
	"github.com/sven-victor/ez-console/pkg/util"
	"github.com/sven-victor/ez-utils/log"
	"github.com/sven-victor/ez-utils/safe"
	w "github.com/sven-victor/ez-utils/wrapper"

	"go.opentelemetry.io/otel/codes"
	"go.opentelemetry.io/otel/trace"
)

type SafeHeader map[string]w.OneOrMore[string]

func NewSafeHeader(header http.Header) SafeHeader {
	safeHeader := make(SafeHeader)
	for k, v := range header {
		safeHeader[k] = v
	}
	return safeHeader
}

func (h SafeHeader) MarshalJSON() ([]byte, error) {
	var header = make(map[string]interface{})
	for k, v := range h {
		switch k {
		case "Authorization":
			if len(v) > 0 {
				header[k] = "[sha256]" + safe.NewHash(sha256.New, []byte(v[0])).HexString(32)
			}
		default:
			header[k] = v
		}
	}
	return json.Marshal(header)
}

func (h SafeHeader) String() string {
	bs, _ := json.Marshal(h)
	return string(bs)
}

func Log(serviceName string) gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		span := trace.SpanFromContext(c)
		traceId := span.SpanContext().TraceID()
		traceIdStr := traceId.String()
		if !traceId.IsValid() {
			traceIdStr = log.NewTraceId()
		}
		c.Writer.Header().Set("Trace-Id", traceIdStr)
		ctx, logger := log.NewContextLogger(c.Request.Context(), log.WithTraceId(traceIdStr))
		c.Request = c.Request.WithContext(ctx)

		level.Info(logger).Log("msg", "HTTP request received.",
			logs.TopicKey, "request",
			log.WrapKeyName("httpURI"), c.Request.RequestURI,
			log.WrapKeyName("httpMethod"), c.Request.Method,
			log.WrapKeyName("clientIP"), c.ClientIP(),
			log.WrapKeyName("header"), NewSafeHeader(c.Request.Header),
			log.WrapKeyName("handlerName"), c.HandlerName(),
		)

		defer func() {
			if r := recover(); r != nil {
				span.SetStatus(codes.Error, fmt.Sprintf("%+v", r))
				util.RespondWithErrorMessage(c, http.StatusInternalServerError, "E5000", "Server exception")
				buf := bytes.NewBufferString(fmt.Sprintf("%+v\n", r))
				for i := 2; ; i++ {
					_, file, line, ok := runtime.Caller(i)
					if !ok {
						break
					}
					buf.WriteString(fmt.Sprintf("    %s:%d\n", file, line))
				}
				level.Error(logger).Log("msg", fmt.Sprintf("recover from panic situation: - %+v", r), logs.RawKeyName, buf.String())
			}
			level.Info(logger).Log("msg", "HTTP response send.",
				logs.TopicKey, "response",
				log.WrapKeyName("httpURI"), c.Request.RequestURI,
				log.WrapKeyName("status"), c.Writer.Status(),
				log.WrapKeyName("contentType"), c.Writer.Header().Get("Content-Type"),
				log.WrapKeyName("contentLength"), c.Writer.Size(),
				log.WrapKeyName("duration"), time.Since(start).String(),
				log.WrapKeyName("header"), NewSafeHeader(c.Writer.Header()),
			)
		}()

		c.Next()

	}
}

type KitLogAdapter struct {
	logger kitlog.Logger
}

func (l *KitLogAdapter) Write(p []byte) (n int, err error) {
	msg := string(p)
	if strings.HasPrefix(msg, "[GIN-debug]") {
		msg = strings.TrimSpace(strings.TrimPrefix(msg, "[GIN-debug]"))
		if strings.HasPrefix(msg, "[WARNING]") {
			level.Warn(l.logger).Log("msg", strings.TrimSpace(strings.TrimPrefix(msg, "[WARNING]")))
			return len(p), nil
		} else if strings.HasPrefix(msg, "[ERROR]") {
			level.Error(l.logger).Log("msg", strings.TrimSpace(strings.TrimPrefix(msg, "[ERROR]")))
			return len(p), nil
		} else if strings.HasPrefix(msg, "[FATAL]") {
			level.Error(l.logger).Log("msg", strings.TrimSpace(strings.TrimPrefix(msg, "[FATAL]")))
			return len(p), nil
		} else if strings.HasPrefix(msg, "[INFO]") {
			level.Info(l.logger).Log("msg", strings.TrimSpace(strings.TrimPrefix(msg, "[INFO]")))
			return len(p), nil
		}
		level.Debug(l.logger).Log("msg", msg)
	} else {
		level.Info(l.logger).Log("msg", strings.TrimSpace(strings.TrimPrefix(msg, "[GIN]")))
	}
	return len(p), nil
}

func NewKitLogAdapter(logger kitlog.Logger) *KitLogAdapter {
	return &KitLogAdapter{logger: log.WithCaller(6)(logger)}
}
