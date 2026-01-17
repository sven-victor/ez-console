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

package service

import (
	"context"
	"io"
	"net/http"
)

type TestService struct {
}

func NewTestService() *TestService {
	return &TestService{}
}

type TestResponse struct {
	Body    string              `json:"body"`
	Headers map[string][]string `json:"headers"`
}

func (s *TestService) Test(ctx context.Context, req *http.Request) (*TestResponse, error) {
	body, err := io.ReadAll(io.LimitReader(req.Body, 10240))
	if err != nil {
		return nil, err
	}
	return &TestResponse{
		Body:    string(body),
		Headers: map[string][]string(req.Header),
	}, nil
}
