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
	"compress/gzip"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/andybalholm/brotli"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/require"
	"github.com/sven-victor/ez-console/pkg/config"
)

func defaultCompressionCfg() config.CompressionConfig {
	return config.CompressionConfig{}
}

func setupCompressEngine(cfg config.CompressionConfig, register func(*gin.Engine)) *gin.Engine {
	gin.SetMode(gin.TestMode)
	r := gin.New()
	r.Use(CompressionMiddleware(cfg))
	register(r)
	return r
}

func gzipBytes(t *testing.T, p []byte) []byte {
	t.Helper()
	var buf bytes.Buffer
	w := gzip.NewWriter(&buf)
	_, err := w.Write(p)
	require.NoError(t, err)
	require.NoError(t, w.Close())
	return buf.Bytes()
}

func brBytes(t *testing.T, p []byte) []byte {
	t.Helper()
	var buf bytes.Buffer
	w := brotli.NewWriter(&buf)
	_, err := w.Write(p)
	require.NoError(t, err)
	require.NoError(t, w.Close())
	return buf.Bytes()
}

func gunzipBytes(t *testing.T, p []byte) []byte {
	t.Helper()
	r, err := gzip.NewReader(bytes.NewReader(p))
	require.NoError(t, err)
	defer r.Close()
	out, err := io.ReadAll(r)
	require.NoError(t, err)
	return out
}

func unbrBytes(t *testing.T, p []byte) []byte {
	t.Helper()
	out, err := io.ReadAll(brotli.NewReader(bytes.NewReader(p)))
	require.NoError(t, err)
	return out
}

func largeJSON() string {
	return `{"data":"` + strings.Repeat("abcdefghij", 200) + `"}`
}

func TestDecompressRequestGzip(t *testing.T) {
	plain := []byte(`{"hello":"world"}`)
	r := setupCompressEngine(defaultCompressionCfg(), func(e *gin.Engine) {
		e.POST("/echo", func(c *gin.Context) {
			b, err := io.ReadAll(c.Request.Body)
			require.NoError(t, err)
			require.Empty(t, c.GetHeader("Content-Encoding"))
			c.Data(http.StatusOK, "application/json", b)
		})
	})
	req := httptest.NewRequest(http.MethodPost, "/echo", bytes.NewReader(gzipBytes(t, plain)))
	req.Header.Set("Content-Encoding", "gzip")
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	require.Equal(t, http.StatusOK, w.Code)
	require.Equal(t, plain, w.Body.Bytes())
}

func TestDecompressRequestBrotli(t *testing.T) {
	plain := []byte(`{"hello":"br"}`)
	r := setupCompressEngine(defaultCompressionCfg(), func(e *gin.Engine) {
		e.POST("/echo", func(c *gin.Context) {
			b, err := io.ReadAll(c.Request.Body)
			require.NoError(t, err)
			c.Data(http.StatusOK, "application/json", b)
		})
	})
	req := httptest.NewRequest(http.MethodPost, "/echo", bytes.NewReader(brBytes(t, plain)))
	req.Header.Set("Content-Encoding", "br")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	require.Equal(t, http.StatusOK, w.Code)
	require.Equal(t, plain, w.Body.Bytes())
}

func TestDecompressRequestStacked(t *testing.T) {
	plain := []byte(`{"stacked":true}`)
	// Applied gzip then br → Content-Encoding: gzip, br
	stacked := brBytes(t, gzipBytes(t, plain))
	r := setupCompressEngine(defaultCompressionCfg(), func(e *gin.Engine) {
		e.POST("/echo", func(c *gin.Context) {
			b, err := io.ReadAll(c.Request.Body)
			require.NoError(t, err)
			c.Data(http.StatusOK, "application/json", b)
		})
	})
	req := httptest.NewRequest(http.MethodPost, "/echo", bytes.NewReader(stacked))
	req.Header.Set("Content-Encoding", "gzip, br")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	require.Equal(t, http.StatusOK, w.Code)
	require.Equal(t, plain, w.Body.Bytes())
}

func TestDecompressUnknownEncoding(t *testing.T) {
	r := setupCompressEngine(defaultCompressionCfg(), func(e *gin.Engine) {
		e.POST("/echo", func(c *gin.Context) { c.Status(http.StatusOK) })
	})
	req := httptest.NewRequest(http.MethodPost, "/echo", bytes.NewReader([]byte("x")))
	req.Header.Set("Content-Encoding", "zstd")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	require.Equal(t, http.StatusUnsupportedMediaType, w.Code)
	var body map[string]any
	require.NoError(t, json.Unmarshal(w.Body.Bytes(), &body))
	require.Equal(t, "E4151", body["code"])
}

func TestDecompressInvalidGzip(t *testing.T) {
	r := setupCompressEngine(defaultCompressionCfg(), func(e *gin.Engine) {
		e.POST("/echo", func(c *gin.Context) { c.Status(http.StatusOK) })
	})
	req := httptest.NewRequest(http.MethodPost, "/echo", bytes.NewReader([]byte("not-gzip")))
	req.Header.Set("Content-Encoding", "gzip")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	require.Equal(t, http.StatusBadRequest, w.Code)
	var body map[string]any
	require.NoError(t, json.Unmarshal(w.Body.Bytes(), &body))
	require.Equal(t, "E4002", body["code"])
}

func TestDecompressOversize(t *testing.T) {
	prev := maxDecodeBytes
	maxDecodeBytes = 32
	t.Cleanup(func() { maxDecodeBytes = prev })

	plain := []byte(strings.Repeat("a", 64))
	r := setupCompressEngine(defaultCompressionCfg(), func(e *gin.Engine) {
		e.POST("/echo", func(c *gin.Context) {
			_, err := io.ReadAll(c.Request.Body)
			if err != nil {
				c.Status(http.StatusRequestEntityTooLarge)
				return
			}
			c.Status(http.StatusOK)
		})
	})
	req := httptest.NewRequest(http.MethodPost, "/echo", bytes.NewReader(gzipBytes(t, plain)))
	req.Header.Set("Content-Encoding", "gzip")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	require.Equal(t, http.StatusRequestEntityTooLarge, w.Code)
}

func TestCompressResponsePrefersBrotli(t *testing.T) {
	payload := largeJSON()
	r := setupCompressEngine(defaultCompressionCfg(), func(e *gin.Engine) {
		e.GET("/data", func(c *gin.Context) {
			c.Data(http.StatusOK, "application/json", []byte(payload))
		})
	})
	req := httptest.NewRequest(http.MethodGet, "/data", nil)
	req.Header.Set("Accept-Encoding", "gzip, br")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	require.Equal(t, http.StatusOK, w.Code)
	require.Equal(t, "br", w.Header().Get("Content-Encoding"))
	require.Contains(t, w.Header().Get("Vary"), "Accept-Encoding")
	require.Empty(t, w.Header().Get("Content-Length"))
	require.Equal(t, payload, string(unbrBytes(t, w.Body.Bytes())))
}

func TestCompressResponseQValuePrefersGzip(t *testing.T) {
	payload := largeJSON()
	r := setupCompressEngine(defaultCompressionCfg(), func(e *gin.Engine) {
		e.GET("/data", func(c *gin.Context) {
			c.Data(http.StatusOK, "application/json", []byte(payload))
		})
	})
	req := httptest.NewRequest(http.MethodGet, "/data", nil)
	req.Header.Set("Accept-Encoding", "gzip;q=1.0, br;q=0.8")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	require.Equal(t, http.StatusOK, w.Code)
	require.Equal(t, "gzip", w.Header().Get("Content-Encoding"))
	require.Equal(t, payload, string(gunzipBytes(t, w.Body.Bytes())))
}

func TestCompressResponseAlgorithmsGzipOnly(t *testing.T) {
	payload := largeJSON()
	cfg := config.CompressionConfig{Algorithms: []string{"gzip"}}
	r := setupCompressEngine(cfg, func(e *gin.Engine) {
		e.GET("/data", func(c *gin.Context) {
			c.Data(http.StatusOK, "application/json", []byte(payload))
		})
	})
	req := httptest.NewRequest(http.MethodGet, "/data", nil)
	req.Header.Set("Accept-Encoding", "br, gzip")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	require.Equal(t, "gzip", w.Header().Get("Content-Encoding"))
	require.Equal(t, payload, string(gunzipBytes(t, w.Body.Bytes())))
}

func TestCompressSkipBelowMinLength(t *testing.T) {
	r := setupCompressEngine(defaultCompressionCfg(), func(e *gin.Engine) {
		e.GET("/data", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"ok": true})
		})
	})
	req := httptest.NewRequest(http.MethodGet, "/data", nil)
	req.Header.Set("Accept-Encoding", "gzip, br")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	require.Equal(t, http.StatusOK, w.Code)
	require.Empty(t, w.Header().Get("Content-Encoding"))
	require.Contains(t, w.Header().Get("Vary"), "Accept-Encoding")
	require.Contains(t, w.Body.String(), `"ok":true`)
}

func TestCompressSkipImagePNG(t *testing.T) {
	payload := bytes.Repeat([]byte{0x89, 0x50, 0x4e, 0x47}, 400)
	r := setupCompressEngine(defaultCompressionCfg(), func(e *gin.Engine) {
		e.GET("/logo.png", func(c *gin.Context) {
			c.Data(http.StatusOK, "image/png", payload)
		})
	})
	req := httptest.NewRequest(http.MethodGet, "/logo.png", nil)
	req.Header.Set("Accept-Encoding", "gzip, br")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	require.Empty(t, w.Header().Get("Content-Encoding"))
	require.Equal(t, payload, w.Body.Bytes())
}

func TestCompressSkipWoff2Extension(t *testing.T) {
	payload := bytes.Repeat([]byte("font"), 400)
	r := setupCompressEngine(defaultCompressionCfg(), func(e *gin.Engine) {
		e.GET("/static/font.woff2", func(c *gin.Context) {
			c.Data(http.StatusOK, "application/octet-stream", payload)
		})
	})
	req := httptest.NewRequest(http.MethodGet, "/static/font.woff2", nil)
	req.Header.Set("Accept-Encoding", "gzip, br")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	require.Empty(t, w.Header().Get("Content-Encoding"))
	require.Equal(t, payload, w.Body.Bytes())
}

func TestCompressSkipAlreadyEncoded(t *testing.T) {
	payload := []byte(largeJSON())
	r := setupCompressEngine(defaultCompressionCfg(), func(e *gin.Engine) {
		e.GET("/data", func(c *gin.Context) {
			c.Header("Content-Encoding", "gzip")
			c.Data(http.StatusOK, "application/json", payload)
		})
	})
	req := httptest.NewRequest(http.MethodGet, "/data", nil)
	req.Header.Set("Accept-Encoding", "gzip, br")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	require.Equal(t, "gzip", w.Header().Get("Content-Encoding"))
	require.Equal(t, payload, w.Body.Bytes())
}

func TestCompressSkipSSE(t *testing.T) {
	cfg := config.CompressionConfig{MinLength: 1}
	r := setupCompressEngine(cfg, func(e *gin.Engine) {
		e.GET("/sse", func(c *gin.Context) {
			c.Writer.Header().Set("Content-Type", "text/event-stream")
			c.Writer.WriteHeader(http.StatusOK)
			_, err := c.Writer.Write([]byte("data: hello\n\n"))
			require.NoError(t, err)
			c.Writer.Flush()
		})
	})
	req := httptest.NewRequest(http.MethodGet, "/sse", nil)
	req.Header.Set("Accept-Encoding", "gzip, br")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	require.Equal(t, http.StatusOK, w.Code)
	require.Empty(t, w.Header().Get("Content-Encoding"))
	require.Equal(t, "data: hello\n\n", w.Body.String())
}

func TestCompressSkipNoAcceptEncoding(t *testing.T) {
	r := setupCompressEngine(defaultCompressionCfg(), func(e *gin.Engine) {
		e.GET("/data", func(c *gin.Context) {
			c.Data(http.StatusOK, "application/json", []byte(largeJSON()))
		})
	})
	req := httptest.NewRequest(http.MethodGet, "/data", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	require.Empty(t, w.Header().Get("Content-Encoding"))
}

func TestCompressKnownContentLength(t *testing.T) {
	payload := []byte(largeJSON())
	r := setupCompressEngine(defaultCompressionCfg(), func(e *gin.Engine) {
		e.GET("/data", func(c *gin.Context) {
			c.Header("Content-Length", fmt.Sprintf("%d", len(payload)))
			c.Header("ETag", `"abc"`)
			c.Data(http.StatusOK, "application/json", payload)
		})
	})
	req := httptest.NewRequest(http.MethodGet, "/data", nil)
	req.Header.Set("Accept-Encoding", "gzip")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)
	require.Equal(t, "gzip", w.Header().Get("Content-Encoding"))
	require.Equal(t, `"abc-gzip"`, w.Header().Get("ETag"))
	require.Empty(t, w.Header().Get("Content-Length"))
	require.Equal(t, payload, gunzipBytes(t, w.Body.Bytes()))
}

func TestNegotiateEncoding(t *testing.T) {
	require.Equal(t, "br", negotiateEncoding("gzip, br", []string{"br", "gzip"}))
	require.Equal(t, "gzip", negotiateEncoding("gzip;q=1.0, br;q=0.8", []string{"br", "gzip"}))
	require.Equal(t, "gzip", negotiateEncoding("br, gzip", []string{"gzip"}))
	require.Equal(t, "", negotiateEncoding("", []string{"br", "gzip"}))
	require.Equal(t, "br", negotiateEncoding("*", []string{"br", "gzip"}))
	require.Equal(t, "", negotiateEncoding("gzip;q=0, br;q=0", []string{"br", "gzip"}))
}

func TestIsCompressibleContent(t *testing.T) {
	require.True(t, isCompressibleContent("application/json", "/api/users"))
	require.True(t, isCompressibleContent("text/html; charset=utf-8", "/index.html"))
	require.True(t, isCompressibleContent("image/svg+xml", "/icon.svg"))
	require.True(t, isCompressibleContent("", "/app.js"))
	require.False(t, isCompressibleContent("image/png", "/logo.png"))
	require.False(t, isCompressibleContent("application/octet-stream", "/font.woff2"))
	require.False(t, isCompressibleContent("text/event-stream", "/stream"))
	require.False(t, isCompressibleContent("application/grpc", "/rpc"))
}

func TestCompressionConfigDefaults(t *testing.T) {
	var cfg config.CompressionConfig
	require.True(t, cfg.GetEnabled())
	require.Equal(t, 1024, cfg.GetMinLength())
	require.Equal(t, []string{"br", "gzip"}, cfg.GetAlgorithms())
	enabled := false
	cfg.Enabled = &enabled
	cfg.MinLength = 2048
	cfg.Algorithms = []string{"gzip"}
	require.False(t, cfg.GetEnabled())
	require.Equal(t, 2048, cfg.GetMinLength())
	require.Equal(t, []string{"gzip"}, cfg.GetAlgorithms())
}

func TestSuffixETag(t *testing.T) {
	require.Equal(t, `"abc-br"`, suffixETag(`"abc"`, "br"))
	require.Equal(t, `W/"abc-gzip"`, suffixETag(`W/"abc"`, "gzip"))
	require.Equal(t, "", suffixETag("", "gzip"))
}
