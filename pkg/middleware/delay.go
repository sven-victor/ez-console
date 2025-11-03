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
