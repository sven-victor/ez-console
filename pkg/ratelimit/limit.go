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

package ratelimit

import (
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/sven-victor/ez-console/pkg/model"
)

const (
	KindRate  = "rate"
	KindQuota = "quota"

	BucketShared = "shared"
	BucketRoute  = "route"

	DefaultPeriod      = time.Minute
	DefaultQuotaPeriod = 24 * time.Hour
)

// Limit is a token-bucket rate plus an optional calendar-day quota.
type Limit struct {
	Rate        int
	Period      time.Duration
	Burst       int
	Quota       int
	QuotaPeriod time.Duration
}

// Result is the outcome of a single Store.Allow call.
type Result struct {
	Allowed    bool
	Remaining  int
	Limit      int
	ResetAt    time.Time
	RetryAfter time.Duration
	Kind       string
}

func (l Limit) Normalized() Limit {
	out := l
	if out.Period <= 0 {
		out.Period = DefaultPeriod
	}
	if out.Burst <= 0 {
		out.Burst = out.Rate
		if out.Burst <= 0 {
			out.Burst = 1
		}
	}
	if out.QuotaPeriod <= 0 {
		out.QuotaPeriod = DefaultQuotaPeriod
	}
	return out
}

func (l Limit) HasRate() bool {
	return l.Rate > 0
}

func (l Limit) HasQuota() bool {
	return l.Quota > 0
}

func (l Limit) ToBucket(source string, enabled bool) model.RateLimitBucket {
	n := l.Normalized()
	return model.RateLimitBucket{
		Rate:        n.Rate,
		Period:      FormatPeriod(n.Period),
		Burst:       n.Burst,
		Quota:       n.Quota,
		QuotaPeriod: FormatPeriod(n.QuotaPeriod),
		Source:      source,
		Enabled:     enabled,
	}
}

// ParsePeriod accepts Go durations plus a trailing "d" for days.
func ParsePeriod(s string) (time.Duration, error) {
	s = strings.TrimSpace(s)
	if s == "" {
		return 0, nil
	}
	if strings.HasSuffix(s, "d") {
		n, err := strconv.Atoi(strings.TrimSuffix(s, "d"))
		if err != nil {
			return 0, fmt.Errorf("invalid period %q: %w", s, err)
		}
		if n <= 0 {
			return 0, fmt.Errorf("invalid period %q", s)
		}
		return time.Duration(n) * 24 * time.Hour, nil
	}
	d, err := time.ParseDuration(s)
	if err != nil {
		return 0, fmt.Errorf("invalid period %q: %w", s, err)
	}
	if d <= 0 {
		return 0, fmt.Errorf("invalid period %q", s)
	}
	return d, nil
}

func FormatPeriod(d time.Duration) string {
	if d <= 0 {
		return ""
	}
	if d%(24*time.Hour) == 0 {
		return fmt.Sprintf("%dd", int(d/(24*time.Hour)))
	}
	if d%time.Hour == 0 {
		return fmt.Sprintf("%dh", int(d/time.Hour))
	}
	if d%time.Minute == 0 {
		return fmt.Sprintf("%dm", int(d/time.Minute))
	}
	if d%time.Second == 0 {
		return fmt.Sprintf("%ds", int(d/time.Second))
	}
	return d.String()
}

func LimitFromRule(rate int, period string, burst, quota int, quotaPeriod string) (Limit, error) {
	p, err := ParsePeriod(period)
	if err != nil {
		return Limit{}, err
	}
	qp, err := ParsePeriod(quotaPeriod)
	if err != nil {
		return Limit{}, err
	}
	return Limit{
		Rate:        rate,
		Period:      p,
		Burst:       burst,
		Quota:       quota,
		QuotaPeriod: qp,
	}.Normalized(), nil
}

func LimitFromModel(r model.RateLimitRule) (Limit, error) {
	return LimitFromRule(r.Rate, r.Period, r.Burst, r.Quota, r.QuotaPeriod)
}
