package middleware

import (
	"encoding/json"
	"fmt"
	"testing"

	"github.com/golang-jwt/jwt/v5"
)

func TestMapClaims(t *testing.T) {
	claims := jwt.MapClaims{
		"user_id":  "123",
		"username": "test",
		"exp":      1715731200,
		"iat":      1715731200,
	}
	json, _ := json.Marshal(&claims)
	fmt.Println(string(json))
}
