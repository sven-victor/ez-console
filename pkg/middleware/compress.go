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
	"io"
	"net/http"
	"path"
	"strconv"
	"strings"

	"github.com/andybalholm/brotli"
	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-console/pkg/util"
)

const (
	encodingGzip     = "gzip"
	encodingBrotli   = "br"
	encodingIdentity = "identity"

	brotliQuality = 4
)

// maxDecodeBytes caps decompressed request bodies to limit compression bombs.
// Overridable in tests.
var maxDecodeBytes int64 = 32 << 20

var skipExt = map[string]struct{}{
	".gz": {}, ".br": {}, ".zip": {}, ".7z": {},
	".png": {}, ".jpg": {}, ".jpeg": {}, ".gif": {}, ".webp": {}, ".avif": {}, ".ico": {},
	".mp3": {}, ".mp4": {}, ".webm": {},
	".woff": {}, ".woff2": {},
	".wasm": {}, ".pdf": {},
}

var compressibleExt = map[string]struct{}{
	".js": {}, ".css": {}, ".html": {}, ".htm": {}, ".json": {}, ".xml": {},
	".txt": {}, ".svg": {}, ".map": {}, ".csv": {}, ".md": {}, ".yaml": {}, ".yml": {},
}

// CompressionMiddleware decompresses gzip/br request bodies and compresses
// responses when the client advertises support and the payload looks compressible.
func CompressionMiddleware(cfg config.CompressionConfig) gin.HandlerFunc {
	minLength := cfg.GetMinLength()
	algorithms := cfg.GetAlgorithms()
	return func(c *gin.Context) {
		if err := decompressRequest(c); err != nil {
			util.RespondWithError(c, err)
			return
		}

		algo := negotiateEncoding(c.GetHeader("Accept-Encoding"), algorithms)
		if algo == "" || skipResponseCompression(c) {
			c.Next()
			return
		}

		appendVary(c.Writer.Header(), "Accept-Encoding")
		cw := newCompressWriter(c.Writer, algo, minLength, c.Request.URL.Path)
		c.Writer = cw
		defer cw.Close()
		c.Next()
	}
}

func decompressRequest(c *gin.Context) error {
	encodings := parseEncodingList(c.GetHeader("Content-Encoding"))
	if len(encodings) == 0 {
		return nil
	}

	original := c.Request.Body
	body := io.Reader(original)
	var closers []io.Closer
	if original != nil {
		closers = append(closers, original)
	}
	for i := len(encodings) - 1; i >= 0; i-- {
		switch encodings[i] {
		case encodingIdentity:
			continue
		case encodingGzip:
			gr, err := gzip.NewReader(body)
			if err != nil {
				return util.NewErrorMessage("E4002", "Invalid compressed request body", err)
			}
			closers = append(closers, gr)
			body = gr
		case encodingBrotli:
			brBody, err := peekBrotliReader(body)
			if err != nil {
				return util.NewErrorMessage("E4002", "Invalid compressed request body", err)
			}
			body = brBody
		default:
			return util.NewErrorMessage("E4151", "Unsupported Content-Encoding")
		}
	}

	c.Request.Body = http.MaxBytesReader(c.Writer, &closersReader{Reader: body, closers: closers}, maxDecodeBytes)
	c.Request.ContentLength = -1
	c.Request.Header.Del("Content-Encoding")
	c.Request.Header.Del("Content-Length")
	return nil
}

func peekBrotliReader(r io.Reader) (io.Reader, error) {
	br := brotli.NewReader(r)
	buf := make([]byte, 1)
	n, err := br.Read(buf)
	if err != nil && err != io.EOF {
		return nil, err
	}
	return io.MultiReader(bytes.NewReader(buf[:n]), br), nil
}

type closersReader struct {
	io.Reader
	closers []io.Closer
}

func (r *closersReader) Close() error {
	var first error
	for i := len(r.closers) - 1; i >= 0; i-- {
		if err := r.closers[i].Close(); err != nil && first == nil {
			first = err
		}
	}
	return first
}

func skipResponseCompression(c *gin.Context) bool {
	switch c.Request.Method {
	case http.MethodHead, http.MethodOptions:
		return true
	}
	if strings.EqualFold(c.Request.Header.Get("Upgrade"), "websocket") {
		return true
	}
	if c.Request.Header.Get("Range") != "" {
		return true
	}
	return false
}

func negotiateEncoding(header string, algorithms []string) string {
	accepted := parseAcceptEncoding(header)
	if len(accepted) == 0 {
		return ""
	}
	starQ, hasStar := accepted["*"]

	best := ""
	bestQ := -1.0
	for _, algo := range algorithms {
		algo = strings.ToLower(strings.TrimSpace(algo))
		if algo != encodingGzip && algo != encodingBrotli {
			continue
		}
		q, ok := accepted[algo]
		if !ok && hasStar {
			q, ok = starQ, true
		}
		if !ok || q <= 0 {
			continue
		}
		if q > bestQ {
			bestQ = q
			best = algo
		}
	}
	return best
}

func parseEncodingList(header string) []string {
	if header == "" {
		return nil
	}
	parts := strings.Split(header, ",")
	out := make([]string, 0, len(parts))
	for _, p := range parts {
		p = strings.TrimSpace(p)
		if p == "" {
			continue
		}
		if i := strings.IndexByte(p, ';'); i >= 0 {
			p = strings.TrimSpace(p[:i])
		}
		out = append(out, strings.ToLower(p))
	}
	return out
}

func parseAcceptEncoding(header string) map[string]float64 {
	result := make(map[string]float64)
	if header == "" {
		return result
	}
	for _, part := range strings.Split(header, ",") {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		name := part
		q := 1.0
		if i := strings.IndexByte(part, ';'); i >= 0 {
			name = strings.TrimSpace(part[:i])
			for _, param := range strings.Split(part[i+1:], ";") {
				param = strings.TrimSpace(param)
				if len(param) >= 2 && (param[0] == 'q' || param[0] == 'Q') && param[1] == '=' {
					if v, err := strconv.ParseFloat(strings.TrimSpace(param[2:]), 64); err == nil {
						q = v
					}
				}
			}
		}
		if name != "" {
			result[strings.ToLower(name)] = q
		}
	}
	return result
}

func appendVary(h http.Header, value string) {
	for _, existing := range h.Values("Vary") {
		for _, part := range strings.Split(existing, ",") {
			if strings.EqualFold(strings.TrimSpace(part), value) {
				return
			}
		}
	}
	h.Add("Vary", value)
}

func isCompressibleContent(contentType, requestPath string) bool {
	ext := strings.ToLower(path.Ext(requestPath))
	if _, skip := skipExt[ext]; skip {
		return false
	}

	ct := contentType
	if i := strings.IndexByte(ct, ';'); i >= 0 {
		ct = ct[:i]
	}
	ct = strings.ToLower(strings.TrimSpace(ct))

	if ct == "text/event-stream" || strings.HasPrefix(ct, "application/grpc") {
		return false
	}
	if strings.HasPrefix(ct, "image/") && ct != "image/svg+xml" {
		return false
	}
	if strings.HasPrefix(ct, "audio/") || strings.HasPrefix(ct, "video/") {
		return false
	}
	if strings.HasPrefix(ct, "font/woff") {
		return false
	}
	switch ct {
	case "application/zip", "application/wasm", "application/pdf",
		"application/gzip", "application/x-gzip", "application/brotli":
		return false
	}

	if ct == "" || ct == "application/octet-stream" {
		_, ok := compressibleExt[ext]
		return ok
	}
	if strings.HasPrefix(ct, "text/") {
		return true
	}
	switch ct {
	case "application/json", "application/javascript", "application/x-javascript",
		"application/xml", "application/xhtml+xml", "application/rss+xml",
		"application/atom+xml", "application/ld+json", "image/svg+xml":
		return true
	}
	if strings.HasSuffix(ct, "+json") || strings.HasSuffix(ct, "+xml") {
		return true
	}
	return false
}

func suffixETag(etag, encoding string) string {
	if etag == "" {
		return ""
	}
	weak := false
	rest := etag
	if strings.HasPrefix(rest, "W/") || strings.HasPrefix(rest, "w/") {
		weak = true
		rest = rest[2:]
	}
	rest = strings.TrimSpace(rest)
	rest = strings.Trim(rest, `"`)
	out := `"` + rest + `-` + encoding + `"`
	if weak {
		return "W/" + out
	}
	return out
}
