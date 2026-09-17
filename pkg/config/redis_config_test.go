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

package config

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestRedisConfigGetAddr(t *testing.T) {
	require.Equal(t, "127.0.0.1:6379", RedisConfig{Addr: "127.0.0.1:6379", Host: "ignored", Port: 1}.GetAddr())
	require.Equal(t, "localhost:6380", RedisConfig{Host: "localhost", Port: 6380}.GetAddr())
	require.Equal(t, "localhost:6379", RedisConfig{Host: "localhost"}.GetAddr())
	require.Equal(t, "[::1]:6379", RedisConfig{Host: "::1"}.GetAddr())
	require.Empty(t, RedisConfig{}.GetAddr())
}

func TestRateLimitRedisConfigFallback(t *testing.T) {
	fallback := RedisConfig{Addr: "cache:6379", Password: "c", DB: 1, Prefix: "c:"}
	got := RateLimitConfig{}.RedisConfig(fallback)
	require.Equal(t, "cache:6379", got.GetAddr())

	got = RateLimitConfig{Redis: RedisConfig{Host: "rl", Port: 6380, DB: 33}}.RedisConfig(fallback)
	require.Equal(t, "rl:6380", got.GetAddr())
	require.Equal(t, 33, got.DB)
}
