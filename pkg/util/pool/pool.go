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

package pool

import (
	"context"
	"errors"
	"reflect"
	"sync"
	"time"
)

type Conn interface {
	Close() error
	Ping() error // Liveness check
}

type Config[T Conn] struct {
	MinConns        int
	MaxConns        int
	MaxIdleTime     time.Duration
	ConnFactory     func(ctx context.Context) (T, error)
	PingInterval    time.Duration
	CleanupInterval time.Duration
}

type pooledConn[T Conn] struct {
	conn     T
	lastUsed time.Time
	inUse    bool
}

type Pool[T Conn] struct {
	mu       sync.Mutex
	conns    []*pooledConn[T]
	cfg      Config[T]
	ticker   *time.Ticker
	quitChan chan struct{}
}

func NewPool[T Conn](ctx context.Context, cfg Config[T]) (*Pool[T], error) {
	pool := &Pool[T]{
		cfg:      cfg,
		quitChan: make(chan struct{}),
	}

	// Initialize minimum number of connections
	for i := 0; i < cfg.MinConns; i++ {
		conn, err := cfg.ConnFactory(ctx)
		if err != nil {
			return nil, err
		}
		pool.conns = append(pool.conns, &pooledConn[T]{conn: conn, lastUsed: time.Now()})
	}

	go pool.cleanupLoop()
	return pool, nil
}

func (p *Pool[T]) Get(ctx context.Context) (T, error) {
	p.mu.Lock()
	defer p.mu.Unlock()

	now := time.Now()

	// Find an idle connection
	for _, pc := range p.conns {
		if !pc.inUse {
			if p.cfg.PingInterval > 0 && now.Sub(pc.lastUsed) > p.cfg.PingInterval {
				if err := pc.conn.Ping(); err != nil {
					pc.conn.Close()
					continue
				}
			}
			pc.inUse = true
			pc.lastUsed = now
			return pc.conn, nil
		}
	}

	// If the maximum number of connections has not been reached, create a new connection
	if len(p.conns) < p.cfg.MaxConns {
		conn, err := p.cfg.ConnFactory(ctx)
		if err != nil {
			var zero T
			return zero, err
		}
		pc := &pooledConn[T]{conn: conn, inUse: true, lastUsed: now}
		p.conns = append(p.conns, pc)
		return pc.conn, nil
	}

	var zero T
	return zero, errors.New("connection pool exhausted")
}

func (p *Pool[T]) Put(conn T) {
	p.mu.Lock()
	defer p.mu.Unlock()
	for _, pc := range p.conns {
		if reflect.ValueOf(pc.conn).Pointer() == reflect.ValueOf(conn).Pointer() {
			pc.inUse = false
			pc.lastUsed = time.Now()
			return
		}
	}
	conn.Close() // Close non-pooled connections directly
}

func (p *Pool[T]) cleanupLoop() {
	cleanupInterval := p.cfg.CleanupInterval
	if cleanupInterval <= 0 {
		cleanupInterval = time.Minute * 10
	}
	ticker := time.NewTicker(cleanupInterval)
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			p.cleanupIdle()
		case <-p.quitChan:
			return
		}
	}
}

func (p *Pool[T]) cleanupIdle() {
	p.mu.Lock()
	defer p.mu.Unlock()

	now := time.Now()
	newConns := make([]*pooledConn[T], 0, len(p.conns))

	for _, pc := range p.conns {
		if !pc.inUse && now.Sub(pc.lastUsed) > p.cfg.MaxIdleTime && len(p.conns) > p.cfg.MinConns {
			pc.conn.Close()
		} else {
			newConns = append(newConns, pc)
		}
	}

	p.conns = newConns
}

func (p *Pool[T]) Close() {
	close(p.quitChan)
	p.mu.Lock()
	defer p.mu.Unlock()

	for _, pc := range p.conns {
		pc.conn.Close()
	}
	p.conns = nil
}

func (p *Pool[T]) Len() int {
	p.mu.Lock()
	defer p.mu.Unlock()
	return len(p.conns)
}

func (p *Pool[T]) Call(ctx context.Context, f func(T) error) error {
	conn, err := p.Get(ctx)
	if err != nil {
		return err
	}
	defer p.Put(conn)
	return f(conn)
}
