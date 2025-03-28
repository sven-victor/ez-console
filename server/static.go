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
