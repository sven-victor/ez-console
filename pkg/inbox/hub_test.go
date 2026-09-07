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

package inbox

import (
	"testing"
	"time"

	"github.com/stretchr/testify/require"
)

func TestHubFanOutToTwoConnections(t *testing.T) {
	h := NewHub()
	defer h.Close()

	c1 := h.Add("user-1")
	c2 := h.Add("user-1")
	c3 := h.Add("user-2")
	defer h.Remove(c1)
	defer h.Remove(c2)
	defer h.Remove(c3)

	h.Wake("user-1")

	require.True(t, waitNotify(t, c1.Notify()), "conn1 should be woken")
	require.True(t, waitNotify(t, c2.Notify()), "conn2 should be woken")
	require.False(t, waitNotifyTimeout(c3.Notify(), 50*time.Millisecond), "other user must not be woken")
}

func TestHubCoalesceWakeups(t *testing.T) {
	h := NewHub()
	defer h.Close()
	c := h.Add("user-1")
	defer h.Remove(c)

	h.Wake("user-1")
	h.Wake("user-1")
	h.Wake("user-1")
	require.True(t, waitNotify(t, c.Notify()))
}

func waitNotify(t *testing.T, ch <-chan struct{}) bool {
	t.Helper()
	select {
	case <-ch:
		return true
	case <-time.After(time.Second):
		return false
	}
}

func waitNotifyTimeout(ch <-chan struct{}, d time.Duration) bool {
	select {
	case <-ch:
		return true
	case <-time.After(d):
		return false
	}
}
