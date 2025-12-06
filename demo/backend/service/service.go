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
