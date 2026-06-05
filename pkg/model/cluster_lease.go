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

package model

import "time"

// ClusterLease represents a named distributed lease used for leader election
// and migration serialization.  The holder_id is the node's EventBus NodeID.
// This model is mirrored by cluster.ClusterLease to avoid import cycles
// but both refer to the same t_cluster_lease table.
type ClusterLease struct {
	Name      string    `gorm:"column:name;primaryKey;size:64"`
	HolderID  string    `gorm:"column:holder_id;size:64;not null;default:''"`
	ExpiresAt time.Time `gorm:"column:expires_at;not null"`
}

func (ClusterLease) TableName() string { return "t_cluster_lease" }
