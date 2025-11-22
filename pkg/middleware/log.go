package middleware

import (
	"crypto/sha256"
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	kitlog "github.com/go-kit/log"
	"github.com/go-kit/log/level"
	"github.com/sven-victor/ez-console/pkg/logs"
	"github.com/sven-victor/ez-utils/log"
	"github.com/sven-victor/ez-utils/safe"
	w "github.com/sven-victor/ez-utils/wrapper"

	"go.opentelemetry.io/otel"
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
		var logger kitlog.Logger

		start := time.Now()
		spanName := c.Request.RequestURI
		var spanOptions []trace.SpanStartOption
		if handlerName := c.HandlerName(); handlerName != "" {
			spanName = handlerName
		}
		ctx, span := otel.GetTracerProvider().Tracer(serviceName).Start(c.Request.Context(), spanName, spanOptions...)
		traceId := span.SpanContext().TraceID()
		traceIdStr := traceId.String()
		if !traceId.IsValid() {
			traceIdStr = log.NewTraceId()
		}
		ctx, logger = log.NewContextLogger(ctx, log.WithTraceId(traceIdStr))
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
