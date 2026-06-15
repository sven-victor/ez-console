package cache

import (
	"context"

	"github.com/sven-victor/ez-console/pkg/model"
)

// CachedServiceAccount holds the minimal service account data needed for
// authentication hot-path. Full Role objects are loaded separately via the
// Roles cache to avoid duplicating large permission trees per service account.
type CachedServiceAccount struct {
	ResourceID     string
	Status         string
	PolicyDocument model.PolicyDocument
	RoleIDs        []string
}

// InvalidateServiceAccount evicts a single service account entry from the
// ServiceAccounts cache and broadcasts the invalidation to all cluster nodes.
func InvalidateServiceAccount(ctx context.Context, serviceAccountID string) {
	PublishInvalidate(ctx, CacheNameServiceAccounts, serviceAccountID)
}
