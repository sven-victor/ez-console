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
	"bufio"
	"bytes"
	"compress/gzip"
	"io"
	"net"
	"net/http"
	"strconv"
	"strings"
	"sync"

	"github.com/andybalholm/brotli"
	"github.com/gin-gonic/gin"
)

var gzipWriterPool = sync.Pool{
	New: func() any {
		w, _ := gzip.NewWriterLevel(io.Discard, gzip.DefaultCompression)
		return w
	},
}

var brotliWriterPool = sync.Pool{
	New: func() any {
		return brotli.NewWriterLevel(io.Discard, brotliQuality)
	},
}

type compressWriter struct {
	gin.ResponseWriter
	algo      string
	minLength int
	path      string
	status    int
	buf       bytes.Buffer
	comp      io.WriteCloser
	gzipW     *gzip.Writer
	brW       *brotli.Writer
	decided   bool
	skipped   bool
	closed    bool
}

func newCompressWriter(w gin.ResponseWriter, algo string, minLength int, requestPath string) *compressWriter {
	return &compressWriter{
		ResponseWriter: w,
		algo:           algo,
		minLength:      minLength,
		path:           requestPath,
	}
}

func (w *compressWriter) WriteHeader(code int) {
	if w.decided && w.ResponseWriter.Written() {
		return
	}
	if code > 0 {
		w.status = code
	}
}

func (w *compressWriter) WriteHeaderNow() {
	if !w.decided {
		_ = w.finishUncompressed()
		return
	}
	w.ResponseWriter.WriteHeaderNow()
}

func (w *compressWriter) Write(p []byte) (int, error) {
	if len(p) == 0 {
		return 0, nil
	}
	if !w.decided {
		if w.shouldSkip() {
			if err := w.finishUncompressed(); err != nil {
				return 0, err
			}
			return w.ResponseWriter.Write(p)
		}
		if cl := w.contentLength(); cl >= w.minLength {
			if err := w.startCompress(); err != nil {
				return 0, err
			}
			return w.comp.Write(p)
		}
		w.buf.Write(p)
		if w.buf.Len() >= w.minLength {
			if err := w.startCompress(); err != nil {
				return 0, err
			}
		}
		return len(p), nil
	}
	if w.skipped {
		return w.ResponseWriter.Write(p)
	}
	return w.comp.Write(p)
}

func (w *compressWriter) WriteString(s string) (int, error) {
	return w.Write([]byte(s))
}

func (w *compressWriter) shouldSkip() bool {
	status := w.status
	if status == 0 {
		status = http.StatusOK
	}
	if (status >= 100 && status < 200) || status == http.StatusNoContent || status == http.StatusNotModified {
		return true
	}
	enc := w.Header().Get("Content-Encoding")
	if enc != "" && !strings.EqualFold(enc, encodingIdentity) {
		return true
	}
	if strings.Contains(strings.ToLower(w.Header().Get("Cache-Control")), "no-transform") {
		return true
	}
	if !isCompressibleContent(w.Header().Get("Content-Type"), w.path) {
		return true
	}
	if cl := w.contentLength(); cl >= 0 && cl < w.minLength {
		return true
	}
	return false
}

func (w *compressWriter) contentLength() int {
	cl := w.Header().Get("Content-Length")
	if cl == "" {
		return -1
	}
	n, err := strconv.Atoi(cl)
	if err != nil {
		return -1
	}
	return n
}

func (w *compressWriter) startCompress() error {
	w.decided = true
	w.skipped = false
	if w.status == 0 {
		w.status = http.StatusOK
	}
	h := w.Header()
	h.Del("Content-Length")
	h.Set("Content-Encoding", w.algo)
	if etag := h.Get("ETag"); etag != "" {
		h.Set("ETag", suffixETag(etag, w.algo))
	}
	w.ResponseWriter.WriteHeader(w.status)

	switch w.algo {
	case encodingGzip:
		gw := gzipWriterPool.Get().(*gzip.Writer)
		gw.Reset(w.ResponseWriter)
		w.gzipW = gw
		w.comp = gw
	case encodingBrotli:
		bw := brotliWriterPool.Get().(*brotli.Writer)
		bw.Reset(w.ResponseWriter)
		w.brW = bw
		w.comp = bw
	default:
		return w.finishUncompressed()
	}
	if w.buf.Len() > 0 {
		_, err := w.comp.Write(w.buf.Bytes())
		w.buf.Reset()
		return err
	}
	return nil
}

func (w *compressWriter) finishUncompressed() error {
	if w.decided && w.skipped {
		return nil
	}
	w.decided = true
	w.skipped = true
	if w.status == 0 && w.buf.Len() == 0 && !w.headerWasSet() {
		return nil
	}
	if w.status == 0 {
		w.status = http.StatusOK
	}
	if !w.ResponseWriter.Written() {
		w.ResponseWriter.WriteHeader(w.status)
	}
	if w.buf.Len() > 0 {
		_, err := w.ResponseWriter.Write(w.buf.Bytes())
		w.buf.Reset()
		return err
	}
	return nil
}

func (w *compressWriter) headerWasSet() bool {
	return w.status != 0
}

func (w *compressWriter) Hijack() (net.Conn, *bufio.ReadWriter, error) {
	if !w.decided {
		_ = w.finishUncompressed()
	}
	return w.ResponseWriter.Hijack()
}

func (w *compressWriter) Flush() {
	if !w.decided {
		_ = w.finishUncompressed()
	}
	if w.comp != nil {
		switch c := w.comp.(type) {
		case *gzip.Writer:
			_ = c.Flush()
		case *brotli.Writer:
			_ = c.Flush()
		}
	}
	w.ResponseWriter.Flush()
}

func (w *compressWriter) Close() error {
	if w.closed {
		return nil
	}
	w.closed = true
	if !w.decided {
		return w.finishUncompressed()
	}
	if w.skipped || w.comp == nil {
		return nil
	}
	err := w.comp.Close()
	w.release()
	return err
}

func (w *compressWriter) release() {
	if w.gzipW != nil {
		gzipWriterPool.Put(w.gzipW)
		w.gzipW = nil
	}
	if w.brW != nil {
		brotliWriterPool.Put(w.brW)
		w.brW = nil
	}
	w.comp = nil
}

func (w *compressWriter) Status() int {
	if w.status != 0 {
		return w.status
	}
	return w.ResponseWriter.Status()
}

func (w *compressWriter) Written() bool {
	return w.ResponseWriter.Written() || w.buf.Len() > 0 || w.decided
}

func (w *compressWriter) Unwrap() http.ResponseWriter {
	return w.ResponseWriter
}
