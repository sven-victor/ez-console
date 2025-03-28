package util

import (
	"fmt"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/sven-victor/ez-console/pkg/config"
)

func GetRootURL(c *gin.Context) string {
	rootURL := config.GetConfig().Server.RootURL
	if rootURL != "" {
		return strings.TrimSuffix(rootURL, "/")
	}

	scheme := "http"
	if c.Request.TLS != nil {
		scheme = "https"
	} else if proto := c.GetHeader("X-Forwarded-Proto"); proto != "" {
		scheme = proto
	}

	host := c.Request.Host
	if forwardedHost := c.GetHeader("X-Forwarded-Host"); forwardedHost != "" {
		host = forwardedHost
	}

	return strings.TrimSuffix(fmt.Sprintf("%s://%s%s", scheme, host, c.Request.RequestURI), "/")
}
