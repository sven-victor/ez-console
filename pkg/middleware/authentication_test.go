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
