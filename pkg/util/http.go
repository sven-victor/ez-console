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
