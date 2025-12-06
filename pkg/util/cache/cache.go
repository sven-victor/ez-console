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

package cache

import (
	"errors"
	"time"

	"k8s.io/apimachinery/pkg/util/cache"
)

var (
	NotExistError = errors.New("not exist")
	localCache    = cache.NewLRUExpireCache(1000)
)

func Get[T any](key string) (*T, error) {
	value, ok := localCache.Get(key)
	if !ok {
		return nil, NotExistError
	}
	switch v := value.(type) {
	case *T:
		return v, nil
	case T:
		return &v, nil
	default:
		return nil, NotExistError
	}
}

func Handle[T any](key string, fn func() (*T, error), ttl time.Duration) (*T, error) {
	value, err := Get[T](key)
	if err != nil {
		value, err = fn()
		if err != nil {
			return nil, err
		}
		localCache.Add(key, value, ttl)
		return value, nil
	}
	return value, nil
}

func Set(key string, value any, ttl time.Duration) {
	localCache.Add(key, value, ttl)
}

func Delete(key string) {
	localCache.Remove(key)
}
