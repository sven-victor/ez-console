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
	"os"
	"time"

	"github.com/gin-gonic/gin"
)

func DelayMiddleware() gin.HandlerFunc {
	if delay := os.Getenv("EZ_CONSOLE_DELAY"); delay != "" {
		delayDuration, err := time.ParseDuration(delay)
		if err == nil {
			return func(c *gin.Context) {
				time.Sleep(delayDuration)
				c.Next()
			}
		}
	}
	return func(c *gin.Context) {
		c.Next()
	}
}
