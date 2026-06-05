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

package eventbus

import (
	"context"
	"crypto/sha256"
	"fmt"
	"net"
	"os"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/go-kit/log/level"
	"github.com/hashicorp/memberlist"
	"github.com/hashicorp/serf/serf"
	"github.com/sven-victor/ez-console/pkg/config"
	"github.com/sven-victor/ez-utils/log"
	"github.com/sven-victor/ez-utils/safe"
)

// SerfEventBus implements EventBus using hashicorp/serf gossip.
// Serf user events are capped at 512 bytes by default; for larger payloads
// consider storing the data in DB and only broadcasting a wakeup signal.
type SerfEventBus struct {
	serfObj  *serf.Serf
	eventCh  chan serf.Event
	mu       sync.RWMutex
	handlers []Handler
	nodeID   string
	stopCh   chan struct{}
	wg       sync.WaitGroup

	rawJoin    []string // original join addresses (may be DNS names / K8s service names)
	gossipPort int      // default port used when expanding DNS names without an explicit port
}

// NewSerfEventBus creates a SerfEventBus.  The keyring is derived from the
// global encrypt-key so that all nodes share a consistent gossip encryption
// key without separate configuration.
func NewSerfEventBus(cfg *config.ClusterConfig) (*SerfEventBus, error) {
	logger := log.New()

	encKey := os.Getenv(safe.SecretEnvName)
	if encKey == "" {
		return nil, fmt.Errorf("eventbus: global encrypt-key must be set for serf gossip encryption")
	}

	// Derive a 32-byte gossip encryption key from the encrypt-key via SHA-256.
	// Serf/memberlist requires keys to be exactly 16, 24, or 32 bytes.
	raw := sha256.Sum256([]byte(encKey))
	primaryKey := raw[:]

	keyring, err := memberlist.NewKeyring(nil, primaryKey)
	if err != nil {
		return nil, fmt.Errorf("eventbus: failed to create serf keyring: %w", err)
	}

	eventCh := make(chan serf.Event, 64)
	serfCfg := serf.DefaultConfig()
	serfCfg.EventCh = eventCh
	serfCfg.MemberlistConfig.Keyring = keyring

	// Determine the default gossip port from bind_addr for node ID and DNS expansion.
	gossipPort := 7946 // memberlist default
	if cfg.Gossip.BindAddr != "" {
		if _, portStr, err := net.SplitHostPort(cfg.Gossip.BindAddr); err == nil {
			if p, err := strconv.Atoi(portStr); err == nil && p > 0 {
				gossipPort = p
			}
		}
	}

	// Node name must be globally unique.  Keep the full host:port so that
	// multiple local instances on the same IP (different bind ports) do not
	// collide.  In K8s each pod has a distinct IP so host:port remains unique.
	nodeID := resolveNodeID(cfg.Gossip, gossipPort)
	serfCfg.NodeName = nodeID

	if cfg.Gossip.BindAddr != "" {
		host, portStr, err := net.SplitHostPort(cfg.Gossip.BindAddr)
		if err != nil {
			return nil, fmt.Errorf("eventbus: invalid gossip.bind_addr %q: %w", cfg.Gossip.BindAddr, err)
		}
		var port int
		fmt.Sscanf(portStr, "%d", &port)
		serfCfg.MemberlistConfig.BindAddr = host
		serfCfg.MemberlistConfig.BindPort = port
	}

	if cfg.Gossip.AdvertiseAddr != "" {
		host, portStr, err := net.SplitHostPort(cfg.Gossip.AdvertiseAddr)
		if err == nil {
			var port int
			fmt.Sscanf(portStr, "%d", &port)
			serfCfg.MemberlistConfig.AdvertiseAddr = host
			serfCfg.MemberlistConfig.AdvertisePort = port
		}
	}

	// Bridge serf/memberlist logs into the application logfmt logger.
	serfLogger := newSerfStdLogger()
	serfCfg.Logger = serfLogger
	serfCfg.MemberlistConfig.Logger = serfLogger

	s, err := serf.Create(serfCfg)
	if err != nil {
		return nil, fmt.Errorf("eventbus: failed to create serf: %w", err)
	}

	bus := &SerfEventBus{
		serfObj:    s,
		eventCh:    eventCh,
		nodeID:     nodeID,
		stopCh:     make(chan struct{}),
		rawJoin:    cfg.Gossip.Join,
		gossipPort: gossipPort,
	}

	if len(cfg.Gossip.Join) > 0 {
		peers := resolveGossipPeers(cfg.Gossip.Join, gossipPort)
		joined, err := s.Join(peers, true)
		if err != nil {
			level.Warn(logger).Log("msg", "serf join failed (will retry via discover loop)", "err", err, "joined", joined)
		} else {
			level.Info(logger).Log("msg", "serf joined cluster", "peers", strings.Join(peers, ","), "joined", joined)
		}
		// Periodically re-resolve DNS names so that newly started pods
		// (K8s headless service) are detected without a restart.
		bus.wg.Add(1)
		go bus.discoverLoop(cfg.Gossip.GetDiscoverInterval())

	}

	bus.wg.Add(1)
	go bus.loop()
	return bus, nil
}

// resolveNodeID returns a stable, globally unique node identifier used as
// the serf NodeName and EventBus.NodeID (worker_id / lease holder_id).
// The full host:port form is kept so that multiple processes on the same
// machine (e.g. local dev on 127.0.0.1:7946 vs 127.0.0.1:7947) get distinct IDs.
func resolveNodeID(cfg config.GossipConfig, defaultPort int) string {
	if cfg.AdvertiseAddr != "" {
		if _, _, err := net.SplitHostPort(cfg.AdvertiseAddr); err == nil {
			return cfg.AdvertiseAddr
		}
		return net.JoinHostPort(cfg.AdvertiseAddr, strconv.Itoa(defaultPort))
	}
	hostname, _ := os.Hostname()
	return net.JoinHostPort(hostname, strconv.Itoa(defaultPort))
}

// resolveGossipPeers expands each address in addrs by performing a DNS
// A-record lookup when the host portion is not a numeric IP.  This enables
// Kubernetes headless service discovery: a headless service DNS name resolves
// to one A record per ready pod, so a single service name in join[] reaches
// all current replicas.  Multiple service names are natively supported because
// join is already a slice — each entry is resolved independently.
//
// If a DNS lookup fails the original address is kept so that serf can log the
// error; if lookup succeeds all returned IPs are added (deduped).  The port
// embedded in addr is preserved; defaultPort is used when addr has no port.
func resolveGossipPeers(addrs []string, defaultPort int) []string {
	seen := make(map[string]struct{})
	var result []string

	add := func(peer string) {
		if _, dup := seen[peer]; !dup {
			seen[peer] = struct{}{}
			result = append(result, peer)
		}
	}

	for _, addr := range addrs {
		host, portStr, err := net.SplitHostPort(addr)
		port := defaultPort
		if err != nil {
			// No port in the address — treat the whole string as host.
			host = addr
		} else {
			if p, err := strconv.Atoi(portStr); err == nil && p > 0 {
				port = p
			}
		}

		// Already a numeric IP — no DNS needed.
		if net.ParseIP(host) != nil {
			add(net.JoinHostPort(host, strconv.Itoa(port)))
			continue
		}

		// Hostname: do an A/AAAA record lookup.
		// For K8s headless services this returns one record per pod IP.
		ips, err := net.LookupHost(host)
		if err != nil || len(ips) == 0 {
			// Keep original so serf can surface the DNS error in its logs.
			add(addr)
			continue
		}
		for _, ip := range ips {
			add(net.JoinHostPort(ip, strconv.Itoa(port)))
		}
	}
	return result
}

// discoverLoop periodically re-resolves rawJoin DNS names and calls
// serf.Join so that newly started pods are detected automatically.
// It runs until stopCh is closed.
func (b *SerfEventBus) discoverLoop(interval time.Duration) {
	defer b.wg.Done()
	logger := log.New()

	ticker := time.NewTicker(interval)
	defer ticker.Stop()
	for {
		select {
		case <-b.stopCh:
			return
		case <-ticker.C:
			peers := resolveGossipPeers(b.rawJoin, b.gossipPort)
			if len(peers) == 0 {
				continue
			}
			if joined, err := b.serfObj.Join(peers, true); err != nil {
				level.Warn(logger).Log("msg", "serf periodic rejoin failed", "err", err, "joined", joined)
			}
		}
	}
}

func (b *SerfEventBus) loop() {
	defer b.wg.Done()
	for {
		select {
		case <-b.stopCh:
			return
		case e, ok := <-b.eventCh:
			if !ok {
				return
			}
			if ue, ok := e.(serf.UserEvent); ok {
				b.dispatch(ue.Name, ue.Payload)
			}
		}
	}
}

func (b *SerfEventBus) dispatch(event string, payload []byte) {
	b.mu.RLock()
	handlers := make([]Handler, len(b.handlers))
	copy(handlers, b.handlers)
	b.mu.RUnlock()
	for _, h := range handlers {
		h(event, payload)
	}
}

// Publish broadcasts a serf user event to the cluster.
// Serf user events have a hard limit (512 bytes by default); keep payloads
// small (IDs only, not full objects).
func (b *SerfEventBus) Publish(_ context.Context, event string, payload []byte) error {
	// coalesce=true so rapid duplicate events are deduplicated by serf.
	return b.serfObj.UserEvent(event, payload, true)
}

func (b *SerfEventBus) Subscribe(h Handler) {
	b.mu.Lock()
	b.handlers = append(b.handlers, h)
	b.mu.Unlock()
}

func (b *SerfEventBus) NodeID() string { return b.nodeID }

func (b *SerfEventBus) Close() error {
	close(b.stopCh)
	b.wg.Wait()
	return b.serfObj.Leave()
}
