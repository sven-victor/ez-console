//go:build !ignore_console_static

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

package server

import (
	"embed"
	"net/http"
	"time"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	w "github.com/sven-victor/ez-utils/wrapper"
)

//go:embed static
var staticFs embed.FS

//go:embed static/index.html
var indexHtml []byte

var embedFs = w.M(static.EmbedFolder(staticFs, "static"))

var upTime = time.Now().UTC().Truncate(time.Second)

var staticHandler = static.ServeFileSystem(embedFs)

func IndexHandler(c *gin.Context) {
	c.Writer.Header().Del("Last-Modified")
	c.Writer.Header().Del("Cache-Control")
	c.Data(http.StatusOK, "text/html", indexHtml)
	c.Abort()
}

func CacheControl(c *gin.Context) {
	c.Writer.Header().Set("Last-Modified", upTime.Format(http.TimeFormat))
	c.Writer.Header().Set("Cache-Control", "max-age=3600")
	c.Next()
}

var RegisterStaticRoutes = func(engine *gin.Engine) {
	engine.GET("/console/*filepath", CacheControl, static.Serve("/console", staticHandler), IndexHandler)
	engine.HEAD("/console/*filepath", CacheControl, static.Serve("/console", staticHandler), IndexHandler)
}
